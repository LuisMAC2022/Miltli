// Lógica de la captura de cafeterías (F-CAF rev. 01; acta-02, CAF-05 y CAF-08). Modelo aparte del
// doméstico, dentro de la misma app. Sin DOM. No escribe ninguna categoría a mano: campos, corrientes,
// reglas y códigos internos salen de datos-caf.js y vocabulario-caf.json, generados del diccionario
// de cafeterías.
(function (global) {
  "use strict";

  const B = typeof module !== "undefined" && module.exports ? require("./logica.js") : global.MiltliLogica;
  const { vacio, esAusencia, todoVacio, esMarcable, marcado, cantidad, numero, fecha, dias, redondo, columnas, columnaDe, csv } = B;

  const CLAVE = "miltli-captura-caf-v1";
  const IMPRESOS = new Set(["ID", "FICHA_REV", "DIA", "SEM", "SAL_N", "FASE"]);
  const DIAS_BASE = Array.from({ length: 7 }, (_, i) => i + 1);
  const DIAS = Array.from({ length: 28 }, (_, i) => i + 1);
  const SALIDAS = Array.from({ length: 16 }, (_, i) => i + 1);
  const SEMANAS = [1, 2, 3, 4];
  const PARTES = ["antes", "arranque", "base", "diario", "salidas", "semanal", "cierre", "transcripcion"];

  const capturables = (datos, pantalla) => datos.campos.filter((c) => !IMPRESOS.has(c.codigo) && c.pantalla === pantalla);
  const lista = (v) => (Array.isArray(v) ? v : []);
  const conDatos = (o) => Object.values(o || {}).some((v) => (v && typeof v === "object" && !Array.isArray(v) ? conDatos(v) : !vacio(v)));

  function cafeteriaVacia(datos) {
    const c = { FICHA_REV: datos.ficha_rev };
    for (const parte of PARTES) c[parte] = {};
    return c;
  }

  const estadoInicial = () => ({ version: 1, cafeterias: {} });
  const ids = (estado) => Object.keys(estado.cafeterias).sort((a, b) => Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, "")));

  // Las claves K# las asigna la coordinación, en orden. Qué negocio es cada una vive fuera de la app.
  function agregar(estado, datos) {
    const usados = ids(estado).map((id) => Number(id.replace(/\D/g, "")));
    const id = datos.prefijo + (Math.max(0, ...usados) + 1);
    estado.cafeterias[id] = cafeteriaVacia(datos);
    return id;
  }

  function normalizar(candidato, datos) {
    const base = estadoInicial();
    if (!candidato || typeof candidato !== "object" || candidato.version !== 1) return base;
    const objeto = (x) => (x && typeof x === "object" && !Array.isArray(x) ? x : {});
    const clave = new RegExp(`^${datos.prefijo}[1-9]\\d{0,2}$`);
    for (const [id, cruda] of Object.entries(objeto(candidato.cafeterias))) {
      if (!clave.test(id)) continue;
      const c = cafeteriaVacia(datos);
      for (const parte of PARTES) c[parte] = objeto(objeto(cruda)[parte]);
      base.cafeterias[id] = c;
    }
    return base;
  }

  // ---------- lectura del papel ----------

  const R = (datos, regla, i) => datos.reglas[regla].fichas[i];
  // Sin CORR_ACEPTA capturada no se sabe qué columnas se tacharon: no se da ninguna por tachada.
  const aceptada = (c, corriente) => !lista(c.antes.CORR_ACEPTA).length || lista(c.antes.CORR_ACEPTA).includes(corriente);
  const enRecipientes = (c, datos) => marcado(c.arranque, "UNIDAD", R(datos, "IC-5", 1));
  const enOtraUnidad = (c, datos) => lista(c.arranque.UNIDAD).length > 0 && !enRecipientes(c, datos);
  // Casillas que siguen la unidad de la Hoja 3 (recipientes o kilos): lo separado y la fuga.
  const sigueUnidad = (campo) => Boolean(campo.corriente) && (campo.pantalla === "c3" || campo.pantalla === "c5");
  const esCantidad = (campo) => Boolean(campo.medios) || sigueUnidad(campo);

  // Enteros y medios (IC-5). Los decimales sólo valen donde la cafetería cuenta en kilos.
  function medida(campo, bruto, c, datos) {
    const q = cantidad(bruto);
    if (!q.error || !sigueUnidad(campo) || enRecipientes(c, datos)) return q;
    const n = numero(bruto);
    return n === null ? q : { valor: n };
  }
  const valor = (campo, registro, c, datos) => (vacio((registro || {})[campo.codigo]) ? null : medida(campo, registro[campo.codigo], c, datos).valor);
  const cero = (campo, registro, c, datos) => valor(campo, registro, c, datos) === 0;

  // Secciones de una cafetería, en el orden del papel.
  function secciones(c, datos) {
    const s = [{ hoja: "1", registro: c.antes, campos: capturables(datos, "c1") }, { hoja: "2", registro: c.arranque, campos: capturables(datos, "c2") }];
    // Dos hojas 3: la de la semana de medición previa (7 días) y la del piloto (28 días).
    for (const [fase, rango, origen] of [[datos.fases[0], DIAS_BASE, c.base], [datos.fases[1], DIAS, c.diario]]) {
      for (const dia of rango) s.push({ hoja: "3", fase, dia, registro: origen[dia] || {}, campos: capturables(datos, "c3"), renglon: true });
    }
    for (const n of SALIDAS) if (conDatos(c.salidas[n])) s.push({ hoja: "4", sal_n: n, registro: c.salidas[n], campos: capturables(datos, "c4") });
    for (const sem of SEMANAS) s.push({ hoja: "5", sem, registro: c.semanal[sem] || {}, campos: capturables(datos, "c5"), renglon: true });
    s.push({ hoja: "6", registro: c.cierre, campos: capturables(datos, "c6"), renglon: true });
    return s;
  }

  const fugas = (datos) => capturables(datos, "c5").filter((x) => x.corriente);
  const sinFuga = (registro, c, datos) => fugas(datos).filter((f) => aceptada(c, f.corriente)).every((f) => cero(f, registro, c, datos));

  // Valor de ausencia de una casilla vacía (diccionario de cafeterías §1.1 y columna «Si falta»).
  function ausenciaPorOmision(campo, s, c, datos) {
    const r = s.registro;
    if (campo.corriente && !aceptada(c, campo.corriente)) return "NA";
    if (s.renglon && todoVacio(r, s.campos)) return "NR";
    if (s.hoja === "3" && campo.corriente && lista(r.CERRADO).length) return "NA";
    if (campo.vacioValido) return "";
    if (/_CAP$/.test(campo.codigo) && campo.corriente && enOtraUnidad(c, datos)) return "NA";
    if (campo.codigo === "ALM_CAP" && lista(r.ALM_CAP_ND).length) return "ND";
    const condicional = campo.ausencias.includes("NA") && campo.ausencias.some((a) => a !== "NA" && a !== "NR");
    if (condicional && campo.codigo === R(datos, "IC-8", 0)) return sinFuga(r, c, datos) ? "NA" : "NC";
    if (condicional && campo.codigo === R(datos, "IC-8", 2)) return numero(r[R(datos, "IC-8", 3)]) === 0 ? "NA" : "NC";
    const candidatas = campo.ausencias.filter((a) => a !== "NR" && !(condicional && a === "NA"));
    if (candidatas.length) return candidatas[0];
    if (esMarcable(campo) && campo.tipo === "bool") return "no_marcada";
    return { 2: "NC", 4: "ND", 5: "NC", 6: "NC" }[s.hoja] || "";
  }

  function resolver(campo, s, c, datos, vocabulario) {
    const bruto = s.registro[campo.codigo];
    if (vacio(bruto)) return [{ codigo: campo.codigo, valor: ausenciaPorOmision(campo, s, c, datos) }];
    if (esAusencia(bruto)) return [{ codigo: campo.codigo, valor: bruto.trim().toUpperCase() }];
    if (esMarcable(campo)) {
      const puestas = lista(bruto);
      if (campo.tipo !== "multi") return [{ codigo: campo.codigo, valor: puestas.join("|") }];
      return vocabulario[campo.vocabulario].map((item) => ({ codigo: `${campo.codigo}_${item.valor}`, base: campo.codigo, valor: puestas.includes(item.valor) ? 1 : 0 }));
    }
    if (esCantidad(campo)) {
      const q = medida(campo, bruto, c, datos);
      return [{ codigo: campo.codigo, valor: q.valor, original: q.original || "" }];
    }
    return [{ codigo: campo.codigo, valor: String(bruto).trim() }];
  }

  // ---------- fechas, semanas y tiempo de guardado ----------

  const inicio = (c) => fecha(c.arranque.FINI);
  function semanaDe(c, texto) {
    const d = dias(fecha(texto, inicio(c)), inicio(c));
    return d === null || d < 0 || d >= 28 ? null : Math.floor(d / 7) + 1;
  }

  // GUARD_DIAS: días desde la última salida en que se llevó todo (o desde FINI) hasta cada salida.
  function guardado(c, vocabulario) {
    const todo = vocabulario.SAL_TODO[0].valor;
    let desde = inicio(c);
    const salida = {};
    for (const n of SALIDAS) {
      const r = c.salidas[n];
      if (!conDatos(r)) continue;
      const f = fecha(r.SAL_FECHA, inicio(c));
      if (f === null) continue;
      salida[n] = dias(f, desde);
      if (lista(r.SAL_TODO)[0] === todo) desde = f;
    }
    return salida;
  }

  // ---------- reglas IC-1 … IC-17 (diccionario de cafeterías §8) ----------

  function marcas(c, datos, vocabulario) {
    const salida = [];
    const marcar = (regla, codigo, donde = {}) => salida.push({ regla, codigo, ...donde });
    const tmax = numero(c.antes.ALM_TMAX);
    const nada = R(datos, "IC-7", 0);
    const excluyentes = new Set(datos.reglas["IC-7"].fichas.slice(1));
    const exigen = new Set(datos.reglas["IC-10"].fichas);
    const guard = guardado(c, vocabulario);
    const fechasBase = DIAS_BASE.map((d) => fecha((c.base[d] || {}).FECHA, inicio(c))).filter((f) => f !== null);

    if (!vacio(c.arranque.FINI) && lista(c.antes.PRE).length < vocabulario.PRE.length) marcar("IC-1", "PRE", { hoja: "1" });
    const frecuencia = numero(c.antes.REC_FREC);
    if (frecuencia !== null && tmax !== null && frecuencia > tmax) marcar("IC-2", "REC_FREC", { hoja: "1" });

    for (const s of secciones(c, datos)) {
      const donde = { hoja: s.hoja, fase: s.fase, sem: s.sem, dia: s.dia, sal_n: s.sal_n };
      const r = s.registro;
      for (const campo of s.campos) {
        const bruto = r[campo.codigo];
        if (vacio(bruto) || esAusencia(bruto)) continue;
        if (esMarcable(campo)) {
          const m = lista(bruto);
          if (excluyentes.has(campo.codigo) && m.includes(nada) && m.length > 1) marcar("IC-7", campo.codigo, donde);
          if (campo.tipo !== "multi" && m.length > 1) marcar(campo.codigo === "REG" ? "IC-6" : "IC-17", campo.codigo, donde);
          for (const item of vocabulario[campo.vocabulario]) {
            if (item.exige && exigen.has(item.valor) && m.includes(item.valor) && vacio(r[item.exige])) marcar("IC-10", campo.codigo, donde);
          }
          continue;
        }
        if (!esCantidad(campo)) continue;
        if (campo.corriente && !aceptada(c, campo.corriente)) marcar("IC-3", campo.codigo, donde);
        if (medida(campo, bruto, c, datos).error) marcar("IC-5", campo.codigo, donde);
      }
      if (s.hoja === "3" && lista(r.CERRADO).length) {
        for (const campo of s.campos) if (campo.corriente && valor(campo, r, c, datos) > 0) marcar("IC-4", campo.codigo, donde);
      }
      if (s.hoja === "4") {
        const f = fecha(r.SAL_FECHA, inicio(c));
        const sem = semanaDe(c, r.SAL_FECHA);
        if (lista(r.SAL_PLANB).length && marcado(c.antes, "PLANB", R(datos, "IC-9", 2)) && sem && conDatos(c.semanal[sem]) && sinFuga(c.semanal[sem], c, datos)) marcar("IC-9", "SAL_PLANB", donde);
        if (tmax !== null && guard[s.sal_n] > tmax) marcar("IC-12", "SAL_FECHA", donde);
        if (f !== null && fechasBase.length && f >= Math.min(...fechasBase) && f <= Math.max(...fechasBase)) marcar("IC-13", "SAL_FECHA", donde);
        const contado = valor({ codigo: "SAL_RECIBE_CONT", medios: true }, r, c, datos);
        const partes = s.campos.filter((x) => x.corriente).map((x) => valor(x, r, c, datos)).filter((v) => typeof v === "number");
        if (typeof contado === "number" && partes.length && contado !== partes.reduce((a, b) => a + b, 0)) marcar("IC-14", "SAL_RECIBE_CONT", donde);
      }
      if (s.hoja === "5" && conDatos(r)) {
        if (lista(r[R(datos, "IC-8", 0)]).length && sinFuga(r, c, datos)) marcar("IC-8", R(datos, "IC-8", 0), donde);
        if (lista(r[R(datos, "IC-8", 2)]).length && numero(r[R(datos, "IC-8", 3)]) === 0) marcar("IC-8", R(datos, "IC-8", 2), donde);
        const abiertos = DIAS.slice((s.sem - 1) * 7, s.sem * 7).filter((d) => conDatos(c.diario[d]) && !lista(c.diario[d].CERRADO).length).length;
        if (numero(r.DIAS_OP) !== null && numero(r.DIAS_OP) !== abiertos) marcar("IC-11", "DIAS_OP", donde);
        if (tmax !== null && numero(r.ALM_DIAS) > tmax) marcar("IC-12", "ALM_DIAS", donde);
      }
      for (const codigo of [R(datos, "IC-16", 0), R(datos, "IC-16", 1)]) {
        const llenos = s.campos.some((x) => x.codigo === codigo) ? valor({ codigo, medios: true }, r, c, datos) : null;
        if (typeof llenos === "number" && numero(c.arranque.ALM_N) !== null && llenos > numero(c.arranque.ALM_N)) marcar("IC-16", codigo, donde);
      }
    }

    const motivo = R(datos, "IC-8", 0);
    const semanas = SEMANAS.map((n) => c.semanal[n] || {});
    const porFuera = semanas.filter((r) => marcado(r, motivo, R(datos, "IC-15", 2))).length;
    const dice = (v) => marcado(c.arranque, R(datos, "IC-15", 0), v);
    if ((dice(R(datos, "IC-15", 1)) && porFuera) || (dice(R(datos, "IC-15", 3)) && semanas.every(conDatos) && !porFuera)) marcar("IC-15", R(datos, "IC-15", 0), { hoja: "2" });
    return salida;
  }

  const REGLAS_EVALUADAS = Array.from({ length: 17 }, (_, i) => `IC-${i + 1}`);

  // ---------- exportación ----------

  const COLUMNAS_LARGO = ["id", "ficha_rev", "hoja", "fase", "sem", "dia", "sal_n", "codigo", "valor", "valor_original", "marcas"];
  // Sin `interno` no salen los códigos que describen la rutina del negocio (diccionario §10.3).
  const visible = (campo, datos, opciones) => Boolean(opciones.interno) || !datos.internos.includes(campo.codigo);

  function filasLargas(estado, datos, vocabulario, opciones = {}) {
    const filas = [];
    for (const id of ids(estado)) {
      const c = estado.cafeterias[id];
      if (!conDatos({ ...c, FICHA_REV: "" })) continue;
      const avisos = marcas(c, datos, vocabulario);
      for (const s of secciones(c, datos)) {
        for (const campo of s.campos.filter((x) => visible(x, datos, opciones))) {
          const reglas = avisos.filter((a) => a.codigo === campo.codigo && a.hoja === s.hoja && a.fase === s.fase && a.sem === s.sem && a.dia === s.dia && a.sal_n === s.sal_n).map((a) => a.regla);
          for (const r of resolver(campo, s, c, datos, vocabulario)) {
            filas.push({ id, ficha_rev: c.FICHA_REV, hoja: s.hoja, fase: s.fase || "", sem: s.sem || "", dia: s.dia || "", sal_n: s.sal_n || "", codigo: r.codigo, base: r.base, valor: r.valor, valor_original: r.original || "", marcas: [...new Set(reglas)].join(" ") });
          }
        }
      }
    }
    return filas;
  }

  const der = (corriente, nombre) => `${nombre}_${corriente}_der`;
  const POR_CORRIENTE = ["sep_sem", "sep_l", "sep_dia", "fuga_l"];
  const DERIVADAS_SEMANA = ["sal_l_der", "dest_l_der", "guard_dias_max_der", "gen_est_caf_der"];

  function columnasAncho(datos, vocabulario, opciones = {}) {
    const c5 = capturables(datos, "c5").filter((x) => visible(x, datos, opciones));
    return ["id", "ficha_rev", "fase", "sem", ...c5.flatMap((x) => columnas(x, vocabulario, "", datos)), ...(opciones.interno ? ["dias_abiertos_der"] : []),
      ...datos.corrientes.flatMap((k) => POR_CORRIENTE.map((n) => der(k, n))), ...DERIVADAS_SEMANA, "marcas"];
  }

  const campoDe = (datos, pantalla, corriente, patron) => datos.campos.find((x) => x.pantalla === pantalla && x.corriente === corriente && patron.test(x.codigo));
  const n2 = (v) => (v === null || v === undefined || !Number.isFinite(v) ? "" : redondo(v));

  // Litros que salieron en cada salida (SAL_L) y si cuentan como entrada al destino (DEST_L).
  function salidasEnLitros(c, datos) {
    const cap = numero(c.arranque.ALM_CAP);
    const aBasura = marcado(c.antes, "PLANB", R(datos, "IC-9", 2));
    return SALIDAS.filter((n) => conDatos(c.salidas[n])).map((n) => {
      const r = c.salidas[n];
      const cont = capturables(datos, "c4").filter((x) => x.corriente).map((x) => valor(x, r, c, datos)).filter((v) => typeof v === "number");
      const litros = cap !== null && cont.length ? cont.reduce((a, b) => a + b, 0) * cap : null;
      return { n, sem: semanaDe(c, r.SAL_FECHA), litros, alDestino: !(lista(r.SAL_PLANB).length && aBasura) };
    });
  }

  // CSV ancho: una fila por cafetería y semana (la semana de medición previa y S1–S4).
  function filasAnchas(estado, datos, vocabulario, opciones = {}) {
    const largas = filasLargas(estado, datos, vocabulario, opciones);
    const filas = [];
    for (const id of ids(estado)) {
      const propias = largas.filter((f) => f.id === id);
      if (!propias.length) continue;
      const c = estado.cafeterias[id];
      const guard = guardado(c, vocabulario);
      const salidas = salidasEnLitros(c, datos);
      const litros = !enOtraUnidad(c, datos);
      const periodos = [{ fase: datos.fases[0], sem: "", origen: c.base, rango: DIAS_BASE }, ...SEMANAS.map((sem) => ({ fase: datos.fases[1], sem, origen: c.diario, rango: DIAS.slice((sem - 1) * 7, sem * 7) }))];
      for (const p of periodos) {
        const fila = { id, ficha_rev: c.FICHA_REV, fase: p.fase, sem: p.sem };
        const semanal = p.sem ? c.semanal[p.sem] || {} : {};
        if (p.sem) for (const f of propias.filter((x) => x.hoja === "5" && x.sem === p.sem)) fila[columnaDe(f, datos, vocabulario)] = f.valor;
        const abiertos = p.rango.filter((d) => conDatos(p.origen[d]) && !lista(p.origen[d].CERRADO).length).length;
        if (opciones.interno) fila.dias_abiertos_der = abiertos;
        let separado = 0;
        let fugado = 0;
        for (const k of datos.corrientes) {
          const [sep, cap, fuga] = [campoDe(datos, "c3", k, /./), campoDe(datos, "c2", k, /_CAP$/), campoDe(datos, "c5", k, /./)];
          const total = p.rango.map((d) => valor(sep, p.origen[d], c, datos)).filter((v) => typeof v === "number").reduce((a, b) => a + b, 0);
          const factor = litros ? numero(c.arranque[cap.codigo]) : null;
          const enL = aceptada(c, k) && factor !== null ? total * factor : null;
          const fugaSem = valor(fuga, semanal, c, datos);
          const fugaL = factor !== null && typeof fugaSem === "number" ? fugaSem * factor : null;
          fila[der(k, "sep_sem")] = aceptada(c, k) ? total : "";
          fila[der(k, "sep_l")] = n2(enL);
          fila[der(k, "sep_dia")] = n2(enL !== null && abiertos ? enL / abiertos : null);
          fila[der(k, "fuga_l")] = n2(fugaL);
          separado += enL || 0;
          fugado += fugaL || 0;
        }
        const suyas = salidas.filter((s) => p.sem && s.sem === p.sem);
        const suma = (xs) => (xs.some((s) => s.litros !== null) ? xs.reduce((a, s) => a + (s.litros || 0), 0) : null);
        fila.sal_l_der = n2(suma(suyas));
        fila.dest_l_der = n2(suma(suyas.filter((s) => s.alDestino)));
        fila.guard_dias_max_der = suyas.length ? Math.max(...suyas.map((s) => guard[s.n]).filter((v) => v != null), 0) : "";
        fila.gen_est_caf_der = litros && (separado || fugado) ? redondo(separado + fugado) : "";
        const enPeriodo = (f) => (p.sem ? f.sem === p.sem || (f.hoja === "3" && f.fase === p.fase && p.rango.includes(f.dia)) || suyas.some((s) => s.n === f.sal_n) : f.fase === p.fase);
        fila.marcas = [...new Set(propias.filter((f) => f.marcas && enPeriodo(f)).flatMap((f) => f.marcas.split(" ")))].join(" ");
        filas.push(fila);
      }
    }
    return filas;
  }

  // Lo que se anota una sola vez (Hojas 1, 2 y 6): una fila por cafetería, con el balance del mes.
  const DERIVADAS_CAFETERIA = ["sep_total_l_der", "sal_total_l_der", "dest_total_l_der", "fuga_total_l_der", "guardado_final_l_der", "balance_caf_der", "guard_dias_max_der"];
  const unicas = (datos, opciones) => [["1", "c1"], ["2", "c2"], ["6", "c6"]].map(([hoja, pantalla]) => [hoja, capturables(datos, pantalla).filter((x) => visible(x, datos, opciones))]);

  function columnasCafeteria(datos, vocabulario, opciones = {}) {
    return ["id", "ficha_rev", ...unicas(datos, opciones).flatMap(([, campos]) => campos.flatMap((x) => columnas(x, vocabulario, "", datos))), ...DERIVADAS_CAFETERIA, "marcas"];
  }

  function filasCafeteria(estado, datos, vocabulario, opciones = {}) {
    const largas = filasLargas(estado, datos, vocabulario, opciones);
    const anchas = filasAnchas(estado, datos, vocabulario, opciones);
    const filas = [];
    for (const id of ids(estado)) {
      const propias = largas.filter((f) => f.id === id);
      if (!propias.length) continue;
      const c = estado.cafeterias[id];
      const fila = { id, ficha_rev: c.FICHA_REV };
      for (const [hoja, campos] of unicas(datos, opciones)) {
        const codigos = new Set(campos.map((x) => x.codigo));
        for (const f of propias.filter((x) => x.hoja === hoja && codigos.has(x.base || x.codigo))) fila[columnaDe(f, datos, vocabulario)] = f.valor;
      }
      const piloto = anchas.filter((f) => f.id === id && f.sem);
      const total = (columna) => (piloto.some((f) => f[columna] !== "") ? piloto.reduce((a, f) => a + (Number(f[columna]) || 0), 0) : null);
      const porCorriente = (nombre) => { const xs = datos.corrientes.map((k) => total(der(k, nombre))); return xs.some((v) => v !== null) ? xs.reduce((a, v) => a + (v || 0), 0) : null; };
      const [sep, sal, dest, fuga] = [porCorriente("sep_l"), total("sal_l_der"), total("dest_l_der"), porCorriente("fuga_l")];
      const llenos = valor({ codigo: "ALM_LLENOS_F", medios: true }, c.cierre, c, datos);
      const final = typeof llenos === "number" && numero(c.arranque.ALM_CAP) !== null ? llenos * numero(c.arranque.ALM_CAP) : null;
      const guard = Object.values(guardado(c, vocabulario)).filter((v) => v != null);
      Object.assign(fila, {
        sep_total_l_der: n2(sep), sal_total_l_der: n2(sal), dest_total_l_der: n2(dest), fuga_total_l_der: n2(fuga), guardado_final_l_der: n2(final),
        balance_caf_der: n2([sep, sal, fuga, final].every((v) => v !== null) ? sep - sal - fuga - final : null),
        guard_dias_max_der: guard.length ? Math.max(...guard) : ""
      });
      fila.marcas = [...new Set(propias.filter((f) => f.marcas).flatMap((f) => f.marcas.split(" ")))].join(" ");
      filas.push(fila);
    }
    return filas;
  }

  const csvLargo = (estado, datos, vocabulario, opciones) => csv(filasLargas(estado, datos, vocabulario, opciones), COLUMNAS_LARGO);
  const csvAncho = (estado, datos, vocabulario, opciones) => csv(filasAnchas(estado, datos, vocabulario, opciones), columnasAncho(datos, vocabulario, opciones));
  const csvCafeteria = (estado, datos, vocabulario, opciones) => csv(filasCafeteria(estado, datos, vocabulario, opciones), columnasCafeteria(datos, vocabulario, opciones));

  const api = {
    CLAVE, DIAS, DIAS_BASE, SALIDAS, SEMANAS, REGLAS_EVALUADAS, COLUMNAS_LARGO,
    capturables, estadoInicial, normalizar, agregar, ids, aceptada, medida, guardado, semanaDe, marcas,
    filasLargas, filasAnchas, filasCafeteria, columnasAncho, columnasCafeteria, csvLargo, csvAncho, csvCafeteria
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.MiltliLogicaCaf = api;
}(typeof window !== "undefined" ? window : globalThis));
