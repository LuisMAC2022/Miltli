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

  // Reglas de consistencia del diccionario v0.3 §8 que la app evalúa. Se marcan, no se corrigen.
  function marcas(h, datos, vocabulario) {
    const salida = [];
    const marcar = (regla, codigo, donde = {}) => salida.push({ regla, codigo, ...donde });
    const lista = (v) => (Array.isArray(v) ? v : []);
    const parada = numero(h.unico.PARADA_DIA);
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
        const sinSeco = datos.campos.find((c) => c.codigo === "SECO_USO").excluyente;
        const secoSemana = DIAS.slice((s.sem - 1) * 7, s.sem * 7).some((d) => cantidad((h.diario[d] || {}).SEC).valor > 0);
        if (lista(s.registro.SECO_USO).includes(sinSeco) && secoSemana) marcar("I-13", "SECO_USO", donde);
      }
      if (s.hoja === "2" && parada !== null && s.dia > parada && cantidad(s.registro.ORG).valor > 0) marcar("I-11", "ORG", donde);
    }
    const [tara, agua, cap] = [numero(h.tecnico.dia1.BOTE_TARA), numero(h.tecnico.dia1.BOTE_AGUA), numero(h.alta.BOTE_CAP)];
    if (tara !== null && agua !== null && cap !== null && Math.abs(cap - (agua - tara) / 1000) > 0.01) marcar("I-15", "BOTE_CAP", { hoja: "1" });
    const [ref, alto] = [numero(h.tecnico.cierre.LLEN_REF), numero(h.tecnico.dia1.CONT_ALTO)];
    if (ref !== null && alto !== null && ref > alto) marcar("I-17", "LLEN_REF", { hoja: "T28" });
    return salida;
  }

  const REGLAS_EVALUADAS = ["I-1", "I-2", "I-3", "I-4", "I-5", "I-6", "I-7", "I-8", "I-9", "I-11", "I-13", "I-15", "I-17"];

  // CSV largo: una fila por dato. `interno` incluye DREV, que no sale del equipo (diccionario §10.3).
  function filasLargas(estado, datos, vocabulario, opciones = {}) {
    const filas = [];
    for (const id of datos.hogares) {
      const h = estado.hogares[id];
      if (!hogarConDatos(h)) continue;
      const avisos = marcas(h, datos, vocabulario);
      for (const s of secciones(h, datos)) {
        for (const campo of s.campos) {
          if (campo.codigo === "DREV" && !opciones.interno) continue;
          const reglas = avisos.filter((a) => a.codigo === campo.codigo && a.hoja === s.hoja && a.sem === s.sem && a.dia === s.dia).map((a) => a.regla);
          for (const r of resolver(campo, s.registro[campo.codigo], s, s.registro, vocabulario)) {
            filas.push({ id, ficha_rev: h.FICHA_REV, hoja: s.hoja, sem: s.sem || "", dia: s.dia || "", codigo: r.codigo, valor: r.valor, valor_original: r.original || "", marcas: [...new Set(reglas)].join(" ") });
          }
        }
      }
    }
    const ver = capturables(datos, ["ver"]);
    estado.verificacion.forEach((registro, i) => {
      const s = { hoja: "V", dia: i + 1, registro, campos: ver, renglon: true };
      for (const campo of ver) for (const r of resolver(campo, registro[campo.codigo], s, registro, vocabulario)) {
        filas.push({ id: "", ficha_rev: "", hoja: "V", sem: "", dia: i + 1, codigo: r.codigo, valor: r.valor, valor_original: "", marcas: "" });
      }
    });
    return filas;
  }

  // CSV ancho: una fila por hogar y semana. Las columnas que terminan en _der son derivadas.
  function filasAnchas(estado, datos, vocabulario) {
    const largas = filasLargas(estado, datos, vocabulario);
    const filas = [];
    for (const id of datos.hogares) {
      const propias = largas.filter((f) => f.id === id);
      if (!propias.length) continue;
      const cap = numero(estado.hogares[id].alta.BOTE_CAP);
      for (const sem of SEMANAS) {
        const fila = { id, ficha_rev: datos.ficha_rev, sem };
        const dias = propias.filter((f) => f.hoja === "2" && f.dia > (sem - 1) * 7 && f.dia <= sem * 7);
        const suma = (codigo) => dias.filter((f) => f.codigo === codigo && typeof f.valor === "number").reduce((a, f) => a + f.valor, 0);
        fila.dias_anotados = dias.filter((f) => f.codigo === "ORG" && typeof f.valor === "number").length;
        fila.org = suma("ORG");
        fila.sec = suma("SEC");
        for (const f of propias.filter((x) => x.hoja === "3" && x.sem === sem)) fila[f.codigo.toLowerCase()] = f.valor;
        const litros = (botes) => (cap !== null && typeof botes === "number" ? Math.round(botes * cap * 100) / 100 : "");
        const personas = numero(fila.pers_s);
        fila.org_l_der = litros(fila.org);
        fila.sec_l_der = litros(fila.sec);
        fila.fuga_l_der = litros(fila.fuga);
        fila.ent_lps_der = fila.org_l_der !== "" && personas ? Math.round((fila.org_l_der / personas) * 100) / 100 : "";
        fila.gen_est_der = fila.ent_lps_der !== "" && fila.fuga_l_der !== "" ? Math.round(((fila.org_l_der + fila.fuga_l_der) / personas) * 100) / 100 : "";
        fila.marcas = [...new Set(propias.filter((f) => f.marcas && (f.sem === sem || dias.includes(f))).flatMap((f) => f.marcas.split(" ")))].join(" ");
        filas.push(fila);
      }
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
  const csvAncho = (estado, datos, vocabulario) => csv(filasAnchas(estado, datos, vocabulario));

  // Serie anterior (estado version 1, registro del hogar): no se convierte al esquema nuevo. Sólo se
  // rescatan, por lista blanca, las cantidades diarias; ningún otro campo sale del dispositivo.
  function serieAnterior(viejo) {
    const o = viejo && typeof viejo === "object" ? viejo : {};
    const config = o.config && typeof o.config === "object" ? o.config : {};
    const entradas = Array.isArray(o.entradas) ? o.entradas : [];
    return entradas.map((e) => ({ serie: "anterior_v1", id: /^H[1-5]$/.test(String(config.clave)) ? config.clave : "", fecha: e.fecha || "", humedo_l: e.humedoL == null ? "" : e.humedoL, seco_l: e.secoL == null ? "" : e.secoL }));
  }

  const api = {
    CLAVE, CLAVE_ANTERIOR, AUSENCIAS, DIAS, SEMANAS, REGLAS_EVALUADAS, COLUMNAS_LARGO,
    esAusencia, vacio, esMarcable, capturables, cantidad, numero, estadoInicial, normalizar, hogarConDatos, marcas,
    filasLargas, filasAnchas, csvEscape, csv, csvLargo, csvAncho, serieAnterior
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.MiltliLogica = api;
}(typeof window !== "undefined" ? window : globalThis));
