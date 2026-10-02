// Cobertura casilla ↔ código entre el diccionario v0.3 y los instrumentos (acta-01, RE-14).
// Lee los atributos data-codigo / data-valor del HTML y las tablas del diccionario; no ejecuta
// JavaScript de las páginas. Si una prueba falla, el diccionario y el instrumento ya no dicen lo
// mismo: se corrige uno de los dos, nunca la prueba.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const FICHA = path.join(__dirname, "..", "ficha");
const leer = (nombre) => fs.readFileSync(path.join(FICHA, nombre), "utf8");

const AUSENCIA = new Set(["0", "NR", "NC", "ND", "NA"]);
// Casillas que se escriben a mano o que vienen impresas: no tienen data-valor que comprobar.
const SIN_VALORES = new Set(["ID", "FICHA_REV", "DIA", "SEM", "CONC_OBS", "CONC_ITEM", "CONC_FECHA"]);
const RETIRADOS = ["TEMP_P", "VIS_SEM", "HUM_REF"];

function celdas(linea) {
  return linea.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function esSeparador(linea) {
  return /^\|\s*:?-{3,}/.test(linea.trim());
}

// Expande `X1`…`X5` y `X1`–`X5` y devuelve los tokens entre comillas invertidas.
function tokens(texto) {
  const crudos = [...texto.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  const salida = new Set(crudos);
  const rango = /`([A-Za-z]+)(\d+)`\s*[…–]\s*`\1(\d+)`/g;
  for (const m of texto.matchAll(rango)) {
    const ancho = m[2].length;
    for (let i = Number(m[2]); i <= Number(m[3]); i += 1) salida.add(m[1] + String(i).padStart(ancho, "0"));
  }
  return salida;
}

function codigosDeCelda(texto) {
  return [...tokens(texto)].filter((t) => /^[A-Z][A-Z0-9_]*$/.test(t));
}

// Recorre todas las tablas Markdown con columna «Código» y, si la tienen, «Instr.».
function tablas(md) {
  const filas = [];
  const lineas = md.split("\n");
  for (let i = 0; i < lineas.length; i += 1) {
    if (!lineas[i].trim().startsWith("|") || !lineas[i + 1] || !esSeparador(lineas[i + 1])) continue;
    const cabeza = celdas(lineas[i]);
    let j = i + 2;
    while (j < lineas.length && lineas[j].trim().startsWith("|")) {
      const c = celdas(lineas[j]);
      const fila = {};
      cabeza.forEach((h, k) => { fila[h] = c[k] || ""; });
      filas.push(fila);
      j += 1;
    }
    i = j - 1;
  }
  return filas;
}

function diccionario() {
  const md = leer("diccionario-de-datos-v0.3-borrador.md");
  const porInstr = new Map();
  const filas = new Map();
  for (const fila of tablas(md)) {
    if (!("Código" in fila) || !("Instr." in fila)) continue;
    for (const codigo of codigosDeCelda(fila["Código"])) {
      filas.set(codigo, fila);
      for (const instr of fila["Instr."].split(/[·,]/).map((s) => s.trim()).filter(Boolean)) {
        if (!porInstr.has(instr)) porInstr.set(instr, new Set());
        porInstr.get(instr).add(codigo);
      }
    }
  }
  return { md, porInstr, filas };
}

function casillas(html) {
  const salida = [];
  for (const m of html.matchAll(/<[a-zA-Z][^>]*\sdata-codigo="([^"]+)"[^>]*>/g)) {
    const etiqueta = m[0];
    const attr = (nombre) => (etiqueta.match(new RegExp(`\\s${nombre}="([^"]*)"`)) || [])[1];
    salida.push({ codigo: m[1], valor: attr("data-valor"), sem: attr("data-sem"), dia: attr("data-dia"), copia: attr("data-copia") });
  }
  return salida;
}

function codigosMarkdown(nombre) {
  const codigos = new Set();
  for (const fila of tablas(leer(nombre))) {
    if ("Código" in fila) codigosDeCelda(fila["Código"]).forEach((c) => codigos.add(c));
  }
  return codigos;
}

const dic = diccionario();
const todosLosCodigos = new Set(dic.filas.keys());

function valoresEsperados(codigo) {
  const fila = dic.filas.get(codigo);
  return new Set([...tokens(fila["Valores"] || "")].filter((t) => !AUSENCIA.has(t) && !todosLosCodigos.has(t)));
}

function comprobarCobertura(instr, archivo) {
  const esperados = dic.porInstr.get(instr) || new Set();
  const encontrados = new Set(casillas(leer(archivo)).map((c) => c.codigo));
  const sinCasilla = [...esperados].filter((c) => !encontrados.has(c)).sort();
  const sinCodigo = [...encontrados].filter((c) => !esperados.has(c)).sort();
  assert.deepEqual(sinCasilla, [], `códigos ${instr} del diccionario sin casilla en ${archivo}`);
  assert.deepEqual(sinCodigo, [], `casillas de ${archivo} sin código ${instr} en el diccionario`);
}

function comprobarValores(instr, archivo) {
  const porCodigo = new Map();
  for (const c of casillas(leer(archivo))) {
    if (!c.valor) continue;
    if (!porCodigo.has(c.codigo)) porCodigo.set(c.codigo, new Set());
    porCodigo.get(c.codigo).add(c.valor);
  }
  for (const codigo of dic.porInstr.get(instr)) {
    if (SIN_VALORES.has(codigo)) continue;
    const fila = dic.filas.get(codigo);
    const tipo = fila["Tipo"] || "";
    const marcable = /^(opción|multi|bool)/.test(tipo) || porCodigo.has(codigo);
    if (!marcable) continue;
    const esperados = valoresEsperados(codigo);
    if (esperados.size === 0) continue;
    const impresos = porCodigo.get(codigo) || new Set();
    assert.deepEqual([...impresos].sort(), [...esperados].sort(), `valores de ${codigo} en ${archivo}`);
  }
}

test("F-HOG rev. 03: todo código del diccionario tiene casilla y toda casilla tiene código", () => {
  comprobarCobertura("F-HOG", "miltli-ficha-hogares.html");
});

test("F-HOG rev. 03: las opciones impresas son exactamente las del diccionario", () => {
  comprobarValores("F-HOG", "miltli-ficha-hogares.html");
});

test("F-HOG rev. 03: el renglón semanal cubre S1–S4 y el diario los 28 días", () => {
  const lista = casillas(leer("miltli-ficha-hogares.html"));
  for (const codigo of dic.porInstr.get("F-HOG")) {
    const cuando = dic.filas.get(codigo)["Cuándo"];
    if (cuando === "semanal") {
      const semanas = new Set(lista.filter((c) => c.codigo === codigo).map((c) => c.sem));
      assert.deepEqual([...semanas].sort(), ["1", "2", "3", "4"], `${codigo} por semana`);
    }
    if (cuando === "diario") {
      const dias = new Set(lista.filter((c) => c.codigo === codigo).map((c) => Number(c.dia)));
      assert.equal(dias.size, 28, `${codigo} por día`);
      assert.ok([...dias].every((d) => d >= 1 && d <= 28), `${codigo} días 1–28`);
    }
  }
  const diasImpresos = lista.filter((c) => c.codigo === "DIA").map((c) => Number(c.valor));
  assert.deepEqual(diasImpresos, Array.from({ length: 28 }, (_, i) => i + 1));
});

test("F-HOG rev. 03: las cuatro hojas llevan el sello rev. 03", () => {
  const html = leer("miltli-ficha-hogares.html");
  const sellos = casillas(html).filter((c) => c.codigo === "FICHA_REV");
  assert.equal(sellos.length, 4);
  assert.ok(sellos.every((c) => c.valor === "03"));
  for (let n = 1; n <= 4; n += 1) assert.match(html, new RegExp(`F-HOG rev\\.&nbsp;03 · Hoja ${n} de 4`));
  assert.doesNotMatch(html, /F-HOG rev\.(&nbsp;|\s)02/);
});

test("Hoja de concordancia: cobertura y valores contra el diccionario", () => {
  comprobarCobertura("CONC", "hoja-concordancia.html");
  comprobarValores("CONC", "hoja-concordancia.html");
});

test("Hoja guía: se consulta, no se llena (sin casillas)", () => {
  assert.equal(casillas(leer("hoja-guia.html")).length, 0);
});

test("Registro técnico: cobertura de códigos en ambos sentidos", () => {
  const esperados = dic.porInstr.get("RT");
  const encontrados = codigosMarkdown("registro-tecnico-equipo.md");
  assert.deepEqual([...esperados].filter((c) => !encontrados.has(c)).sort(), [], "códigos RT sin campo en el registro");
  assert.deepEqual([...encontrados].filter((c) => !esperados.has(c)).sort(), [], "campos del registro sin código RT");
});

test("Bitácora: la plantilla trae los campos del diccionario", () => {
  const esperados = dic.porInstr.get("BIT");
  const encontrados = codigosMarkdown("plantilla-bitacora-programa.md");
  assert.deepEqual([...encontrados].sort(), [...esperados].sort());
});

test("Ningún código retirado vuelve a un instrumento ni al diccionario vigente", () => {
  const enUso = new Set([
    ...casillas(leer("miltli-ficha-hogares.html")).map((c) => c.codigo),
    ...casillas(leer("hoja-concordancia.html")).map((c) => c.codigo),
    ...codigosMarkdown("registro-tecnico-equipo.md"),
    ...todosLosCodigos
  ]);
  for (const codigo of RETIRADOS) assert.ok(!enUso.has(codigo), codigo);
});

test("Privacidad: los instrumentos no piden responsable ni tipo de residuo", () => {
  for (const archivo of ["miltli-ficha-hogares.html", "hoja-concordancia.html", "hoja-guia.html", "registro-tecnico-equipo.md", "plantilla-bitacora-programa.md"]) {
    const texto = leer(archivo);
    assert.doesNotMatch(texto, /responsable|tipo_residuo|tipo de residuo/i, archivo);
    assert.doesNotMatch(texto, /data-codigo="(NOMBRE|DOMICILIO|DIRECCION|TELEFONO|CORREO|MUNICIPIO)/i, archivo);
  }
});

test("El conteo del §12 del diccionario coincide con las tablas", () => {
  const capturados = new Set();
  for (const instr of ["F-HOG", "RT", "CONC", "BIT"]) dic.porInstr.get(instr).forEach((c) => capturados.add(c));
  const m = dic.md.match(/\*\*Códigos que se capturan, únicos\*\* \| \*\*\d+\*\* \| \*\*(\d+)\*\*/);
  assert.ok(m, "no se encontró la fila de conteo del §12");
  assert.equal(capturados.size, Number(m[1]));
  const fhog = dic.md.match(/Se capturan en la ficha del hogar \(`F-HOG`\) \| \d+ \| (\d+)/);
  assert.equal(dic.porInstr.get("F-HOG").size, Number(fhog[1]));
  const rt = dic.md.match(/Se capturan en el registro técnico \(`RT`\) \| \d+ \| (\d+)/);
  assert.equal(dic.porInstr.get("RT").size, Number(rt[1]));
});
