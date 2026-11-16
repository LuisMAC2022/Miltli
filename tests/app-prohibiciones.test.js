// Prohibiciones de la app, verificadas como lint (ficha/especificacion-cambios-app.md §10, P-24).
// Si una falla, se corrige la app o el diccionario; nunca la prueba.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const DOCS = path.join(__dirname, "..", "docs");
const leer = (nombre) => fs.readFileSync(path.join(DOCS, nombre), "utf8");
const archivos = fs.readdirSync(DOCS).filter((n) => /\.(js|html|json|css|webmanifest)$/.test(n));
const D = require("../docs/datos.js");
const V = require("../docs/vocabulario.json");
const L = require("../docs/logica.js");
const { generar } = require("../tools/generar-datos.js");

test("1 · docs/ no pide nombres, correos ni teléfonos, ni las dos variables retiradas", () => {
  for (const nombre of archivos) {
    assert.doesNotMatch(leer(nombre), /responsable|tipo_residuo|tipo de residuo|autocomplete="name"|type="email"|type="tel"/i, nombre);
  }
});

test("2 · ningún campo de captura trae valor por omisión ni opción preseleccionada", () => {
  for (const nombre of ["index.html", "app.js"]) {
    assert.doesNotMatch(leer(nombre), /<(input|option|select|textarea)\b[^>]*\s(value|selected|checked)\b/i, nombre);
  }
});

test("3 · app.js, logica.js, logica-caf.js e index.html no escriben a mano ninguna categoría del vocabulario", () => {
  const categorias = new Set();
  for (const lista of [...Object.values(V), ...Object.values(require("../docs/vocabulario-caf.json"))]) for (const item of lista) if (/^[A-Z]+\d+$/.test(item.valor)) categorias.add(item.valor);
  assert.ok(categorias.size > 20);
  for (const nombre of ["app.js", "logica.js", "logica-caf.js", "index.html"]) {
    const texto = leer(nombre);
    for (const c of categorias) assert.doesNotMatch(texto, new RegExp(`["'\`>]${c}["'\`<]`), `${c} en ${nombre}`);
  }
});

test("4 · datos.js y vocabulario.json son exactamente lo que genera el diccionario v0.3", () => {
  const { datos, vocabulario } = generar();
  assert.deepEqual(JSON.parse(JSON.stringify(D)), JSON.parse(JSON.stringify(datos)), "docs/datos.js está desactualizado: npm run datos");
  assert.deepEqual(V, JSON.parse(JSON.stringify(vocabulario)), "docs/vocabulario.json está desactualizado: npm run datos");
  // Cobertura: todos los códigos F-HOG y RT del diccionario, y ninguno más.
  const md = fs.readFileSync(path.join(__dirname, "..", "ficha", "diccionario-de-datos-v0.3-borrador.md"), "utf8");
  const esperados = new Set();
  for (const linea of md.split("\n")) {
    const celdas = linea.split("|").map((c) => c.trim());
    if (celdas.length < 6 || !celdas.some((c) => /^(F-HOG|RT)(\s·\s(F-HOG|RT|CONC))*$/.test(c))) continue;
    for (const m of celdas[1].matchAll(/`([A-Z][A-Z0-9_]*)`/g)) esperados.add(m[1]);
  }
  assert.deepEqual(D.campos.map((c) => c.codigo).sort(), [...esperados].sort());
});

test("5 · vocabulario.json sólo crece por adición", () => {
  const base = JSON.parse(fs.readFileSync(path.join(__dirname, "vocabulario-base.json"), "utf8"));
  for (const [codigo, lista] of Object.entries(base)) {
    assert.ok(V[codigo], `se perdió la lista ${codigo}`);
    const actuales = new Set(V[codigo].map((x) => x.valor));
    for (const item of lista) assert.ok(actuales.has(item.valor), `${codigo} perdió el valor ${item.valor}`);
  }
});

test("6 · los encabezados de los CSV no traen columnas prohibidas", () => {
  const estado = L.estadoInicial(D);
  estado.hogares[D.hogares[0]].semanal = { 1: { PERS_S: "2" } };
  const prohibidas = /responsable|tipo|nombre|correo|email|telefono|domicilio|direccion|municipio/i;
  for (const texto of [L.csvLargo(estado, D, V, { interno: true }), L.csvAncho(estado, D, V)]) {
    for (const columna of texto.replace(/^﻿/, "").split("\r\n")[0].split(",")) assert.doesNotMatch(columna, prohibidas, columna);
  }
});

test("el service worker guarda en caché todos los archivos que la página carga", () => {
  const sw = leer("sw.js");
  for (const nombre of ["index.html", "estilo.css", "datos.js", "datos-caf.js", "logica.js", "logica-caf.js", "app.js", "vocabulario.json", "vocabulario-caf.json", "manifest.webmanifest"]) {
    assert.ok(sw.includes(`"./${nombre}"`), nombre);
    assert.ok(fs.existsSync(path.join(DOCS, nombre)), nombre);
  }
  assert.doesNotMatch(sw, /miltli-pages-v1/);
});

test("la página carga cada script que usa, y los datos antes que la lógica", () => {
  const scripts = [...leer("index.html").matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(scripts, ["datos.js", "datos-caf.js", "logica.js", "logica-caf.js", "app.js"]);
});
