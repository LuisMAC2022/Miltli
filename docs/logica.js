// Lógica de la captura del coordinador (ficha/especificacion-cambios-app.md). Sin DOM: la usan
// app.js en el navegador y tests/ en Node. No escribe ninguna categoría a mano: todo sale de
// datos.js y vocabulario.json, que se generan del diccionario v0.3.
(function (global) {
  "use strict";

  const CLAVE = "miltli-captura-v2";
  const CLAVE_ANTERIOR = "miltli-pages-v1";
  const AUSENCIAS = ["NR", "NC", "ND", "NA"];
  const IMPRESOS = new Set(["ID", "FICHA_REV", "DIA", "SEM"]);
  const DIAS = Array.from({ length: 28 }, (_, i) => i + 1);
  const SEMANAS = [1, 2, 3, 4];
  // Número de regla del diccionario v0.3 §8 para cada variable con exclusión.
  const REGLA_EXCLUSION = { FAU: "I-1", ACT: "I-2", SECO_USO: "I-3" };
  // Ventana de la visita de cierre: días 26 a 28 (P-01, resuelta en el acta-02).
  const VENTANA_CIERRE = [26, 28];

  const esAusencia = (v) => typeof v === "string" && AUSENCIAS.includes(v.trim().toUpperCase());
  const vacio = (v) => v == null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0);
  const todoVacio = (registro, campos) => campos.every((c) => vacio((registro || {})[c.codigo]));
  const esMarcable = (campo) => Boolean(campo.vocabulario) && /^(opción|multi|bool)$/.test(campo.tipo);
  const capturables = (datos, pantallas) => datos.campos.filter((c) => !IMPRESOS.has(c.codigo) && pantallas.includes(c.pantalla));

  // Cantidades en botes: 0, enteros, ½, 1½, 1.5 (D-5). Lo demás es ND y conserva el texto original.
  function cantidad(texto) {
    const t = String(texto == null ? "" : texto).trim();
    if (t === "") return { valor: "" };
    if (esAusencia(t)) return { valor: t.toUpperCase() };
    const m = /^(\d+)?\s*(½|1\/2|[.,]5|[.,]0)?$/.exec(t);
    if (!m || (m[1] === undefined && m[2] === undefined)) return { valor: "ND", original: t, error: true };
    const medio = m[2] && !/0$/.test(m[2]) ? 0.5 : 0;
    return { valor: Number(m[1] || 0) + medio };
  }

  const numero = (texto) => {
    const n = Number(String(texto == null ? "" : texto).trim().replace(",", "."));
    return String(texto == null ? "" : texto).trim() !== "" && Number.isFinite(n) ? n : null;
  };

  // Fechas como las escribe el papel: dd/mm, dd/mm/aaaa o aaaa-mm-dd. Sin año, toma el de `ref` (o
  // 2026, el impreso en la ficha) y pasa al siguiente si la fecha quedaría más de medio año atrás.
  function fecha(texto, ref) {
    const t = String(texto == null ? "" : texto).trim();
    let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
    if (m) return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    m = /^(\d{1,2})[/.-](\d{1,2})(?:[/.-](\d{2}|\d{4}))?$/.exec(t);
    if (!m || Number(m[2]) > 12 || Number(m[1]) > 31) return null;
    if (m[3]) return Date.UTC(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]));
    const base = ref == null ? 2026 : new Date(ref).getUTCFullYear();
    const d = Date.UTC(base, Number(m[2]) - 1, Number(m[1]));
    return ref != null && ref - d > 183 * 864e5 ? Date.UTC(base + 1, Number(m[2]) - 1, Number(m[1])) : d;
  }
  const dias = (a, b) => (a == null || b == null ? null : Math.round((a - b) / 864e5));
  const decimales = (texto) => (String(texto).trim().replace(",", ".").split(".")[1] || "").length;
  const redondo = (n) => Math.round(n * 100) / 100;
  const marcado = (registro, codigo, valor) => Array.isArray((registro || {})[codigo]) && registro[codigo].includes(valor);

  // Volumen interior geométrico hasta la altura `alto`, en litros (medidas en cm; diccionario §9).
  function volumen(t, alto) {
    const forma = Array.isArray(t.CONT_FORMA) ? t.CONT_FORMA[0] : "";
    const [largo, ancho, sup, inf, total] = ["CONT_LARGO", "CONT_ANCHO", "CONT_DIAM_SUP", "CONT_DIAM_INF", "CONT_ALTO"].map((c) => numero(t[c]));
    if (alto === null || alto < 0) return null;
    if (/^rect/.test(forma) && largo !== null && ancho !== null) return largo * ancho * alto / 1000;
    if (/^cil/.test(forma) && sup !== null) return Math.PI * (sup / 2) ** 2 * alto / 1000;
    if (/^cubeta/.test(forma) && sup !== null && inf !== null && total) {
      const d = inf + (sup - inf) * alto / total;
      return Math.PI * alto * (inf * inf + inf * d + d * d) / 12000;
    }
    return null;
  }

  function hogarVacio(datos) {
    return { FICHA_REV: datos.ficha_rev, alta: {}, diario: {}, semanal: {}, unico: {}, dia28: {}, tecnico: { dia1: {}, cierre: {} }, transcripcion: {} };
  }

  function estadoInicial(datos) {
    const hogares = {};
    for (const id of datos.hogares) hogares[id] = hogarVacio(datos);
    return { version: 2, hogares, verificacion: [] };
  }

  // Un respaldo incompleto o de otra versión nunca rompe la app: lo que no encaja se descarta.
  function normalizar(candidato, datos) {
    const base = estadoInicial(datos);
    if (!candidato || typeof candidato !== "object" || candidato.version !== 2) return base;
    const objeto = (x) => (x && typeof x === "object" && !Array.isArray(x) ? x : {});
    for (const id of datos.hogares) {
      const h = objeto(objeto(candidato.hogares)[id]);
      const t = objeto(h.tecnico);
      base.hogares[id] = {
        FICHA_REV: datos.ficha_rev, alta: objeto(h.alta), diario: objeto(h.diario), semanal: objeto(h.semanal), unico: objeto(h.unico),
        dia28: objeto(h.dia28), tecnico: { dia1: objeto(t.dia1), cierre: objeto(t.cierre) }, transcripcion: objeto(h.transcripcion)
      };
    }
    base.verificacion = Array.isArray(candidato.verificacion) ? candidato.verificacion.filter((v) => v && typeof v === "object") : [];
    return base;
  }

  function hogarConDatos(h) {
    const hay = (o) => Object.values(o || {}).some((v) => (v && typeof v === "object" && !Array.isArray(v) ? hay(v) : !vacio(v)));
    return hay({ ...h, FICHA_REV: "" });
  }

  // Secciones de un hogar, en el orden del papel: cada una con su registro y sus campos.
  function secciones(h, datos) {
    const lista = [{ hoja: "1", registro: h.alta, campos: capturables(datos, ["h1"]) }];
    for (const dia of DIAS) lista.push({ hoja: "2", dia, registro: h.diario[dia] || {}, campos: capturables(datos, ["h2"]), renglon: true });
    const h3 = capturables(datos, ["h3"]);
    for (const sem of SEMANAS) lista.push({ hoja: "3", sem, registro: h.semanal[sem] || {}, campos: h3.filter((c) => c.cuando !== "una vez"), renglon: true });
    lista.push({ hoja: "3", registro: h.unico, campos: h3.filter((c) => c.cuando === "una vez") });
    lista.push({ hoja: "4", registro: h.dia28, campos: capturables(datos, ["h4"]), renglon: true });
    lista.push({ hoja: "T1", registro: h.tecnico.dia1, campos: capturables(datos, ["vis", "t1"]), renglon: true });
    lista.push({ hoja: "T28", registro: h.tecnico.cierre, campos: capturables(datos, ["vis", "t28"]), renglon: true });
    return lista;
  }

  // Valor de ausencia de una casilla vacía (diccionario v0.3 §1). «No existe el vacío»: al exportar,
  // toda casilla sin dato sale con su ausencia, salvo las notas, donde el vacío es válido.
  function ausenciaPorOmision(campo, seccion, registro) {
    if (seccion.renglon && todoVacio(registro, seccion.campos)) return "NR";
    if (campo.codigo === "FUGA_MOT" && cantidad(registro.FUGA).valor === 0) return "NA";
    if (campo.vacioValido) return "";
    const candidatas = campo.ausencias.filter((a) => a !== "NR");
    if (campo.codigo === "FUGA_MOT") return "NC";
    if (candidatas.length) return candidatas[0];
    if (esMarcable(campo) && campo.tipo === "bool") return "no_marcada";
    return seccion.hoja === "2" || seccion.hoja === "3" ? "NC" : "";
  }

  function resolver(campo, bruto, seccion, registro, vocabulario) {
    if (vacio(bruto)) return [{ codigo: campo.codigo, valor: ausenciaPorOmision(campo, seccion, registro) }];
    if (esAusencia(bruto)) return [{ codigo: campo.codigo, valor: bruto.trim().toUpperCase() }];
    if (esMarcable(campo)) {
      const marcados = Array.isArray(bruto) ? bruto : [bruto];
      if (campo.tipo !== "multi") return [{ codigo: campo.codigo, valor: marcados.join("|") }];
      return vocabulario[campo.vocabulario].map((item) => ({ codigo: `${campo.codigo}_${item.valor}`, base: campo.codigo, valor: marcados.includes(item.valor) ? 1 : 0 }));
    }
    if (campo.medios) {
      const c = cantidad(bruto);
      return [{ codigo: campo.codigo, valor: c.valor, original: c.original || "" }];
    }
    return [{ codigo: campo.codigo, valor: String(bruto).trim() }];
  }

  // Reglas de consistencia del diccionario v0.3 §8. Se marcan, no se corrigen. Los códigos y valores
  // que nombra cada regla salen de datos.reglas (generado del §8), en el orden en que el texto los cita.
  function marcas(h, datos, vocabulario, verificacion = []) {
    const salida = [];
    const marcar = (regla, codigo, donde = {}) => salida.push({ regla, codigo, ...donde });
    const lista = (v) => (Array.isArray(v) ? v : []);
    const R = (regla, i) => datos.reglas[regla].fichas[i];
    const parada = numero(h.unico.PARADA_DIA);
    const [d1, cierre] = [h.tecnico.dia1, h.tecnico.cierre];
    for (const s of secciones(h, datos)) {
      const donde = { hoja: s.hoja, sem: s.sem, dia: s.dia };
      for (const campo of s.campos) {
        const bruto = s.registro[campo.codigo];
        if (vacio(bruto) || esAusencia(bruto)) continue;
        if (esMarcable(campo)) {
          const m = lista(bruto);
          if (campo.excluyente && m.includes(campo.excluyente) && m.length > 1) marcar(REGLA_EXCLUSION[campo.codigo] || "exclusión", campo.codigo, donde);
          if (campo.tipo !== "multi" && m.length > 1) marcar(campo.codigo === "REG" ? "I-4" : "I-5", campo.codigo, donde);
          for (const item of vocabulario[campo.vocabulario]) {
            if (item.exige && m.includes(item.valor) && vacio(s.registro[item.exige])) marcar(item.exige === "NOTA_S" ? "I-7" : "I-8", campo.codigo, donde);
          }
        } else if (campo.medios && cantidad(bruto).error) marcar("I-6", campo.codigo, donde);
      }
      if (s.hoja === "3" && s.sem) {
        if (cantidad(s.registro.FUGA).valor === 0 && lista(s.registro.FUGA_MOT).length) marcar("I-9", "FUGA_MOT", donde);
        if (parada !== null && s.sem * 7 < parada && marcado(s.registro, "FUGA_MOT", R("I-10", 0))) marcar("I-10", "FUGA_MOT", donde);
        if (parada !== null && Math.ceil(parada / 7) === s.sem && [R("I-12", 2), R("I-12", 3)].some((v) => marcado(s.registro, "LLEN_S", v))) marcar("I-12", "LLEN_S", donde);
        const sinSeco = datos.campos.find((c) => c.codigo === "SECO_USO").excluyente;
        const secoSemana = DIAS.slice((s.sem - 1) * 7, s.sem * 7).some((d) => cantidad((h.diario[d] || {}).SEC).valor > 0);
        if (lista(s.registro.SECO_USO).includes(sinSeco) && secoSemana) marcar("I-13", "SECO_USO", donde);
      }
      if (s.hoja === "2" && parada !== null && s.dia > parada && cantidad(s.registro.ORG).valor > 0) marcar("I-11", "ORG", donde);
    }
    // I-14: lo declarado el día 1 sobre los animales de la casa frente a las fugas de las semanas.
    const semanas = SEMANAS.map((n) => h.semanal[n] || {});
    const conAnimales = semanas.filter((r) => marcado(r, "FUGA_MOT", R("I-14", 2))).length;
    const completas = semanas.every((r) => Object.values(r).some((v) => !vacio(v)));
    if ((marcado(h.alta, "MASC", R("I-14", 1)) && completas && !conAnimales) || (marcado(h.alta, "MASC", R("I-14", 4)) && conAnimales)) marcar("I-14", "MASC", { hoja: "1" });
    const [tara, agua, cap] = [numero(d1.BOTE_TARA), numero(d1.BOTE_AGUA), numero(h.alta.BOTE_CAP)];
    if (tara !== null && agua !== null && cap !== null && Math.abs(cap - (agua - tara) / 1000) > 0.01) marcar("I-15", "BOTE_CAP", { hoja: "1" });
    const T28 = { hoja: "T28" };
    const densV = numero(cierre.DENS_V);
    if (densV !== null && cap && Math.abs(densV - cap) / cap > 0.05) marcar("I-16", "DENS_V", T28);
    const [ref, alto] = [numero(cierre.LLEN_REF), numero(d1.CONT_ALTO)];
    if (ref !== null && alto !== null && ref > alto) marcar("I-17", "LLEN_REF", T28);
    const [bruto, taraCont] = [numero(cierre.PESO_BRUTO), numero(d1.CONT_TARA)];
    if (bruto !== null && taraCont !== null) {
      const ocupado = volumen(d1, ref);
      if (bruto - taraCont <= 0 || (ocupado && ((bruto - taraCont) / ocupado < 0.1 || (bruto - taraCont) / ocupado > 1.2))) marcar("I-18", "PESO_BRUTO", T28);
    }
    const metodo = lista(cierre.PESO_MET);
    if (marcado(d1, "CONT_TARA_MET", R("I-19", 1)) && metodo.length && !metodo.includes(R("I-19", 3))) marcar("I-19", "PESO_MET", T28);
    if (marcado(h.alta, "UBIC_TP", R("I-20", 1)) && metodo.includes(R("I-20", 3))) marcar("I-20", "PESO_MET", T28);
    // I-21: con material previo, todo balance que parta del registro arranca como si estuviera vacío.
    if (marcado(h.alta, "D0_VACIO", R("I-21", 1))) marcar("I-21", "D0_VACIO", { hoja: "1" });
    // I-22: más decimales que las lecturas con que se verificó el termómetro.
    const termometro = (vocabulario.VER_INSTR || []).map((x) => x.valor).find((v) => /^term/.test(v));
    const lecturas = verificacion.filter((v) => marcado(v, "VER_INSTR", termometro) && numero(v.VER_LECT) !== null);
    if (lecturas.length) {
      const tope = Math.max(...lecturas.map((v) => decimales(v.VER_LECT)));
      for (const c of [R("I-22", 0), R("I-22", 1)]) if (numero(cierre[c]) !== null && decimales(cierre[c]) > tope) marcar("I-22", c, T28);
    }
    const inicio = fecha(h.alta.FINI);
    const diaVisita = dias(fecha(cierre.VIS_FECHA, inicio), inicio);
    if (diaVisita !== null && marcado(cierre, "VIS_OK", R("I-23", 2)) && (diaVisita + 1 < VENTANA_CIERRE[0] || diaVisita + 1 > VENTANA_CIERRE[1])) marcar("I-23", "VIS_FECHA", T28);
    if (lista(cierre.RES_GUARDADO).length && !marcado(cierre, "RES_GUARDADO", R("I-24", 1))) {
      for (const c of [R("I-24", 2), R("I-24", 3)]) if (numero(cierre[c]) !== null) marcar("I-24", c, T28);
    }
    if (marcado(cierre, "SUELO_TIPO", R("I-25", 1))) {
      for (const c of capturables(datos, ["t28"])) if (/^(MUE_)?SUELO_/.test(c.codigo) && numero(cierre[c.codigo]) !== null) marcar("I-25", c.codigo, T28);
    }
    // I-26: una verificación fuera de tolerancia alcanza a las visitas de ese mismo día.
    const malas = verificacion.filter((v) => marcado(v, "VER_OK", R("I-26", 1))).map((v) => fecha(v.VER_FECHA, inicio)).filter((f) => f !== null);
    for (const [registro, hoja] of [[d1, "T1"], [cierre, "T28"]]) {
      if (malas.includes(fecha(registro.VIS_FECHA, inicio))) marcar("I-26", "VIS_FECHA", { hoja });
    }
    return salida;
  }

  // I-27 habla de la hoja de concordancia, que no se captura en la app.
  const REGLAS_EVALUADAS = Array.from({ length: 26 }, (_, i) => `I-${i + 1}`);

  // CSV largo: una fila por dato. `interno` incluye DREV, que no sale del equipo (diccionario §10.3).
  function filasLargas(estado, datos, vocabulario, opciones = {}) {
    const filas = [];
    for (const id of datos.hogares) {
      const h = estado.hogares[id];
      if (!hogarConDatos(h)) continue;
      const avisos = marcas(h, datos, vocabulario, estado.verificacion);
      for (const s of secciones(h, datos)) {
        for (const campo of s.campos) {
          if (campo.codigo === "DREV" && !opciones.interno) continue;
          const reglas = avisos.filter((a) => a.codigo === campo.codigo && a.hoja === s.hoja && a.sem === s.sem && a.dia === s.dia).map((a) => a.regla);
          for (const r of resolver(campo, s.registro[campo.codigo], s, s.registro, vocabulario)) {
            filas.push({ id, ficha_rev: h.FICHA_REV, hoja: s.hoja, sem: s.sem || "", dia: s.dia || "", codigo: r.codigo, base: r.base, valor: r.valor, valor_original: r.original || "", marcas: [...new Set(reglas)].join(" ") });
          }
        }
      }
    }
    const ver = capturables(datos, ["ver"]);
    estado.verificacion.forEach((registro, i) => {
      const s = { hoja: "V", dia: i + 1, registro, campos: ver, renglon: true };
      for (const campo of ver) for (const r of resolver(campo, registro[campo.codigo], s, registro, vocabulario)) {
        const mala = campo.codigo === "VER_OK" && marcado(registro, "VER_OK", datos.reglas["I-26"].fichas[1]);
        filas.push({ id: "", ficha_rev: "", hoja: "V", sem: "", dia: i + 1, codigo: r.codigo, valor: r.valor, valor_original: "", marcas: mala ? "I-26" : "" });
      }
    });
    return filas;
  }

  // Encabezados del CSV ancho de un campo, como los nombra la tabla de correspondencia: el código en
  // minúsculas; una columna 0/1 por opción en las multimarca; mínimo y máximo en las ordinales.
  // Si el código de una casilla de texto coincide con la columna de una opción («Otro: ___» frente a la
  // opción `otro`), la de texto lleva _texto: en minúsculas las dos se llamarían igual.
  function columnas(campo, vocabulario, sufijo = "", datos = null) {
    const base = campo.codigo.toLowerCase();
    const opciones = (c) => (esMarcable(c) && c.tipo === "multi" ? vocabulario[c.vocabulario].map((item) => `${c.codigo}_${item.valor}`.toLowerCase()) : []);
    if (!(esMarcable(campo) && campo.tipo === "multi")) return [base + (datos && datos.campos.some((c) => opciones(c).includes(base)) ? "_texto" : "") + sufijo];
    const lista = vocabulario[campo.vocabulario].map((item) => `${base}_${item.valor.toLowerCase()}${sufijo}`);
    return campo.escala === "ord" ? [...lista, `${base}_min${sufijo}`, `${base}_max${sufijo}`] : lista;
  }

  // Columna del CSV ancho que le toca a una fila del CSV largo.
  const columnaDe = (f, datos, vocabulario, sufijo = "") => (f.base ? f.codigo.toLowerCase() + sufijo : columnas(datos.campos.find((c) => c.codigo === f.codigo), vocabulario, sufijo, datos)[0]);

  const DERIVADAS_SEMANA = ["dias_anotados_der", "org_sem_der", "sec_sem_der", "org_l_der", "sec_l_der", "fuga_l_der", "razon_der", "ent_lps_der", "gen_est_der"];
  const DERIVADAS_HOGAR = ["cont_vol_der", "alt_80_der", "vol_ocup_der", "llen_frac_der", "peso_neto_der", "dens_ent_der", "dens_seco_der", "dens_pila_der", "masa_geom_der", "dia_vis_der"];

  function columnasAncho(datos, vocabulario) {
    const h3 = capturables(datos, ["h3"]).filter((c) => c.cuando !== "una vez");
    return ["id", "ficha_rev", "sem", ...h3.flatMap((c) => columnas(c, vocabulario, "", datos)), ...DERIVADAS_SEMANA, "marcas"];
  }

  // CSV ancho: una fila por hogar y semana, con las columnas de la Hoja 3 y las derivadas (_der).
  function filasAnchas(estado, datos, vocabulario) {
    const largas = filasLargas(estado, datos, vocabulario);
    const filas = [];
    for (const id of datos.hogares) {
      const propias = largas.filter((f) => f.id === id);
      if (!propias.length) continue;
      const alta = estado.hogares[id].alta;
      const cap = numero(alta.BOTE_CAP);
      const capSeco = numero(alta.BOTE_SEC_CAP) === null ? cap : numero(alta.BOTE_SEC_CAP);
      for (const sem of SEMANAS) {
        const fila = { id, ficha_rev: datos.ficha_rev, sem };
        const diarias = propias.filter((f) => f.hoja === "2" && f.dia > (sem - 1) * 7 && f.dia <= sem * 7);
        const suma = (codigo) => diarias.filter((f) => f.codigo === codigo && typeof f.valor === "number").reduce((a, f) => a + f.valor, 0);
        for (const f of propias.filter((x) => x.hoja === "3" && x.sem === sem)) fila[columnaDe(f, datos, vocabulario)] = f.valor;
        fila.dias_anotados_der = diarias.filter((f) => f.codigo === "ORG" && typeof f.valor === "number").length;
        fila.org_sem_der = suma("ORG");
        fila.sec_sem_der = suma("SEC");
        const litros = (botes, c) => (c !== null && typeof botes === "number" ? redondo(botes * c) : "");
        const personas = numero(fila.pers_s);
        fila.org_l_der = litros(fila.org_sem_der, cap);
        fila.sec_l_der = litros(fila.sec_sem_der, capSeco);
        fila.fuga_l_der = litros(fila.fuga, cap);
        fila.razon_der = fila.org_l_der && fila.sec_l_der !== "" ? redondo(fila.sec_l_der / fila.org_l_der) : "";
        fila.ent_lps_der = fila.org_l_der !== "" && personas ? redondo(fila.org_l_der / personas) : "";
        fila.gen_est_der = fila.ent_lps_der !== "" && fila.fuga_l_der !== "" ? redondo((fila.org_l_der + fila.fuga_l_der) / personas) : "";
        fila.marcas = [...new Set(propias.filter((f) => f.marcas && (f.sem === sem || diarias.includes(f))).flatMap((f) => f.marcas.split(" ")))].join(" ");
        filas.push(fila);
      }
    }
    return filas;
  }

  // Lo que se anota una sola vez (Hojas 1 y 4, día de llenado y registro técnico): una fila por hogar.
  // Las dos visitas comparten códigos VIS_*, así que sus columnas llevan _d1 y _d28.
  function seccionesHogar(datos, opciones = {}) {
    const visita = capturables(datos, ["vis"]);
    return [
      ["1", capturables(datos, ["h1"]).filter((c) => c.codigo !== "DREV" || opciones.interno), ""],
      ["3", capturables(datos, ["h3"]).filter((c) => c.cuando === "una vez"), ""],
      ["4", capturables(datos, ["h4"]), ""],
      ["T1", visita, "_d1"], ["T1", capturables(datos, ["t1"]), ""],
      ["T28", visita, "_d28"], ["T28", capturables(datos, ["t28"]), ""]
    ];
  }

  function columnasHogar(datos, vocabulario, opciones) {
    return ["id", "ficha_rev", ...seccionesHogar(datos, opciones).flatMap(([, campos, sufijo]) => campos.flatMap((c) => columnas(c, vocabulario, sufijo, datos))), ...DERIVADAS_HOGAR, "marcas"];
  }

  function filasHogar(estado, datos, vocabulario, opciones = {}) {
    const largas = filasLargas(estado, datos, vocabulario, opciones);
    const filas = [];
    for (const id of datos.hogares) {
      const propias = largas.filter((f) => f.id === id);
      if (!propias.length) continue;
      const h = estado.hogares[id];
      const fila = { id, ficha_rev: datos.ficha_rev };
      for (const [hoja, campos, sufijo] of seccionesHogar(datos, opciones)) {
        const codigos = new Set(campos.map((c) => c.codigo));
        for (const f of propias.filter((x) => x.hoja === hoja && !x.sem && !x.dia && codigos.has(x.base || x.codigo))) fila[columnaDe(f, datos, vocabulario, sufijo)] = f.valor;
        for (const c of campos.filter((x) => x.escala === "ord")) {
          const orden = vocabulario[c.vocabulario].map((x) => x.valor);
          const puestas = orden.filter((v) => marcado(h.dia28, c.codigo, v));
          fila[`${c.codigo.toLowerCase()}_min${sufijo}`] = puestas[0] || "";
          fila[`${c.codigo.toLowerCase()}_max${sufijo}`] = puestas[puestas.length - 1] || "";
        }
      }
      const [d1, cierre] = [h.tecnico.dia1, h.tecnico.cierre];
      const n = (v) => (v === null || v === undefined || !Number.isFinite(v) ? "" : redondo(v));
      const alto = numero(d1.CONT_ALTO);
      const [total, ocupado] = [volumen(d1, alto), volumen(d1, numero(cierre.LLEN_REF))];
      const par = (m, v) => (numero(cierre[m]) !== null && numero(cierre[v]) ? numero(cierre[m]) / (1000 * numero(cierre[v])) : null);
      const pila = par("DENS_PILA_M", "DENS_PILA_V");
      const inicio = fecha(h.alta.FINI);
      const visita = dias(fecha(cierre.VIS_FECHA, inicio), inicio);
      Object.assign(fila, {
        cont_vol_der: n(total), alt_80_der: n(alto === null ? null : 0.8 * alto), vol_ocup_der: n(ocupado),
        llen_frac_der: n(total && ocupado !== null ? ocupado / total : null),
        peso_neto_der: n(numero(cierre.PESO_BRUTO) !== null && numero(d1.CONT_TARA) !== null ? numero(cierre.PESO_BRUTO) - numero(d1.CONT_TARA) : null),
        dens_ent_der: n(par("DENS_M", "DENS_V")), dens_seco_der: n(par("DENS_SECO_M", "DENS_SECO_V")), dens_pila_der: n(pila),
        masa_geom_der: n(ocupado !== null && pila !== null ? ocupado * pila : null), dia_vis_der: visita === null ? "" : visita + 1
      });
      fila.marcas = [...new Set(propias.filter((f) => f.marcas).flatMap((f) => f.marcas.split(" ")))].join(" ");
      filas.push(fila);
    }
    return filas;
  }

  // Se conserva tal cual de la versión anterior: evita la inyección de fórmulas en hojas de cálculo.
  function csvEscape(value) {
    let text = value == null ? "" : String(value);
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function csv(filas, columnas) {
    const cabeza = columnas || [...filas.reduce((s, f) => { Object.keys(f).forEach((k) => s.add(k)); return s; }, new Set())];
    return `﻿${[cabeza, ...filas.map((f) => cabeza.map((c) => f[c]))].map((r) => r.map(csvEscape).join(",")).join("\r\n")}\r\n`;
  }

  const COLUMNAS_LARGO = ["id", "ficha_rev", "hoja", "sem", "dia", "codigo", "valor", "valor_original", "marcas"];
  const csvLargo = (estado, datos, vocabulario, opciones) => csv(filasLargas(estado, datos, vocabulario, opciones), COLUMNAS_LARGO);
  const csvAncho = (estado, datos, vocabulario) => csv(filasAnchas(estado, datos, vocabulario), columnasAncho(datos, vocabulario));
  const csvHogar = (estado, datos, vocabulario, opciones) => csv(filasHogar(estado, datos, vocabulario, opciones), columnasHogar(datos, vocabulario, opciones));

  // Serie anterior (estado version 1, registro del hogar): no se convierte al esquema nuevo. Sólo se
  // rescatan, por lista blanca, las cantidades diarias; ningún otro campo sale del dispositivo.
  function serieAnterior(viejo) {
    const o = viejo && typeof viejo === "object" ? viejo : {};
    const config = o.config && typeof o.config === "object" ? o.config : {};
    const entradas = Array.isArray(o.entradas) ? o.entradas : [];
    return entradas.map((e) => ({ serie: "anterior_v1", id: /^H[1-5]$/.test(String(config.clave)) ? config.clave : "", fecha: e.fecha || "", humedo_l: e.humedoL == null ? "" : e.humedoL, seco_l: e.secoL == null ? "" : e.secoL }));
  }

  const api = {
    CLAVE, CLAVE_ANTERIOR, AUSENCIAS, DIAS, SEMANAS, REGLAS_EVALUADAS, COLUMNAS_LARGO, VENTANA_CIERRE,
    esAusencia, vacio, todoVacio, esMarcable, marcado, capturables, cantidad, numero, fecha, dias, redondo, volumen, columnas, columnaDe,
    estadoInicial, normalizar, hogarConDatos, marcas,
    filasLargas, filasAnchas, filasHogar, columnasAncho, columnasHogar, csvEscape, csv, csvLargo, csvAncho, csvHogar, serieAnterior
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.MiltliLogica = api;
}(typeof window !== "undefined" ? window : globalThis));
