// Genera docs/datos.js y docs/vocabulario.json a partir del diccionario v0.3
// (ficha/especificacion-cambios-app.md §3.1–§3.2, P-24). El diccionario es la fuente; estos dos
// archivos nunca se editan a mano. Uso: `npm run datos`.
const fs = require("node:fs");
const path = require("node:path");

const RAIZ = path.join(__dirname, "..");
const DICCIONARIO = path.join(RAIZ, "ficha", "diccionario-de-datos-v0.3-borrador.md");
const AUSENCIA = new Set(["0", "NR", "NC", "ND", "NA"]);

// Sección del diccionario → pantalla de captura. Lo que no está aquí no se captura en la app
// (concordancia, bitácora, derivadas, capa restringida, propuestas no impresas).
const PANTALLAS = [
  [/^## 2\. /, "h1"], [/^## 3\. /, "h2"], [/^## 4\. /, "h3"], [/^## 5\. /, "h4"],
  [/^### 7\.0 /, "vis"], [/^### 7\.1 /, "t1"], [/^### 7\.2 /, "t28"], [/^### 7\.6 /, "ver"],
  [/^### 7\.[345] /, null], [/^## (6|8|9|1[0-3])\. /, null]
];

const celdas = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
const esSeparador = (l) => /^\|\s*:?-{3,}/.test(l.trim());
const fichas = (t) => [...t.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
const limpiar = (t) => t.replace(/\*\*→[^*]*\*\*/g, "").replace(/·?\s*\*\*PROPUESTA[^*]*\*\*/g, "")
  .replace(/\([^)]*\)/g, "").replace(/[*`]/g, "").replace(/\s+/g, " ").replace(/^[\s·:,—-]+|[\s·:,]+$/g, "").trim();

function leerFilas(md) {
  const filas = [];
  const exclusiones = {};
  const lineas = md.split("\n");
  let pantalla = null;
  for (let i = 0; i < lineas.length; i += 1) {
    for (const [patron, valor] of PANTALLAS) if (patron.test(lineas[i])) pantalla = valor;
    if (!lineas[i].trim().startsWith("|") || !lineas[i + 1] || !esSeparador(lineas[i + 1])) continue;
    const cabeza = celdas(lineas[i]);
    let j = i + 2;
    for (; j < lineas.length && lineas[j].trim().startsWith("|"); j += 1) {
      const fila = {};
      celdas(lineas[j]).forEach((c, k) => { fila[cabeza[k]] = c; });
      if ("Variable" in fila && "Exclusión" in fila) {
        const [codigo] = fichas(fila.Variable);
        const [excluyente] = fichas(fila["Exclusión"]);
        if (codigo && excluyente) exclusiones[codigo] = excluyente;
      }
      if (pantalla && "Código" in fila && "Instr." in fila) filas.push({ ...fila, pantalla });
    }
    i = j - 1;
  }
  return { filas, exclusiones };
}

function valores(texto, codigos) {
  const abierta = /`…/.test(texto) && !/`([A-Za-z]+)\d+`\s*[…–]\s*`\1\d+`/.test(texto);
  const lista = [];
  let referencia = null;
  for (const segmento of texto.split(/\s·\s/)) {
    const rango = segmento.match(/`([A-Za-z]+)(\d+)`\s*[…–]\s*`\1(\d+)`/);
    if (rango) {
      for (let n = Number(rango[2]); n <= Number(rango[3]); n += 1) lista.push({ valor: rango[1] + String(n).padStart(rango[2].length, "0"), etiqueta: "" });
      continue;
    }
    const tokens = fichas(segmento);
    const valor = tokens.find((t) => !AUSENCIA.has(t) && !codigos.has(t));
    if (!valor) { referencia = referencia || tokens.find((t) => codigos.has(t)) || null; continue; }
    const item = { valor, etiqueta: limpiar(segmento.replace("`" + valor + "`", "")) };
    const exige = segmento.match(/→ exige `([A-Z_]+)`/);
    if (exige) item.exige = exige[1];
    lista.push(item);
  }
  return { lista, abierta, referencia };
}

function generar() {
  const md = fs.readFileSync(DICCIONARIO, "utf8");
  const { filas, exclusiones } = leerFilas(md);
  const codigos = new Set();
  for (const f of filas) fichas(f["Código"]).forEach((c) => codigos.add(c));
  const vocabulario = {};
  const campos = [];
  for (const f of filas) {
    const instr = f["Instr."].split(/[·,]/).map((s) => s.trim());
    if (!instr.includes("F-HOG") && !instr.includes("RT")) continue;
    for (const codigo of fichas(f["Código"]).filter((c) => /^[A-Z][A-Z0-9_]*$/.test(c))) {
      if (campos.some((c) => c.codigo === codigo)) continue;
      const tipo = (f.Tipo || "").split(/\s/)[0];
      const marcable = /^(opción|multi|bool)$/.test(tipo);
      const v = valores(f.Valores || "", codigos);
      const falta = f["Si falta"] || "";
      const campo = {
        codigo, pantalla: f.pantalla, instr,
        etiqueta: limpiar(f["Casilla en la ficha"] || f.Casilla || f.Campo || codigo),
        quien: f["Quién"] || "", cuando: f["Cuándo"] || "", tipo
      };
      if (/ord/.test(f.D4 || f.Tipo || "")) campo.escala = "ord";
      else if (tipo === "multi") campo.escala = "nom";
      if (marcable) {
        if (v.abierta) campo.abierta = true;
        else if (v.referencia && !v.lista.length) campo.vocabulario = v.referencia;
        else {
          campo.vocabulario = codigo;
          vocabulario[codigo] = v.lista.length ? v.lista : [{ valor: "marcada", etiqueta: "" }];
        }
      } else if (v.lista.length && !v.abierta) {
        campo.especiales = codigo;
        vocabulario[codigo] = v.lista;
      }
      if (/enteros y medios/.test(f.Valores || "")) campo.medios = true;
      if (exclusiones[codigo]) campo.excluyente = exclusiones[codigo];
      campo.ausencias = fichas(falta).filter((t) => AUSENCIA.has(t) && t !== "0");
      if (/vacío válido/.test(falta)) campo.vacioValido = true;
      if (/obligatorio/.test(falta)) campo.obligatorio = true;
      campos.push(campo);
    }
  }
  const rev = (md.match(/\*\*F-HOG rev\. (\d+)\*\*/) || [])[1];
  const datos = { diccionario: "v0.3", ficha_rev: rev, hogares: vocabulario.ID.map((x) => x.valor), campos };
  delete vocabulario.ID;
  datos.campos.find((c) => c.codigo === "ID").vocabulario = undefined;
  return { datos, vocabulario };
}

if (require.main === module) {
  const { datos, vocabulario } = generar();
  const cabecera = "// GENERADO por tools/generar-datos.js a partir de ficha/diccionario-de-datos-v0.3-borrador.md.\n// No editar a mano: cambia el diccionario y ejecuta `npm run datos`.\n";
  fs.writeFileSync(path.join(RAIZ, "docs", "datos.js"),
    `${cabecera}(function (global) {\n  "use strict";\n  const DATOS = ${JSON.stringify(datos, null, 1).replace(/\n/g, "\n  ")};\n  if (typeof module !== "undefined" && module.exports) module.exports = DATOS;\n  else global.MiltliDatos = DATOS;\n}(typeof window !== "undefined" ? window : globalThis));\n`);
  fs.writeFileSync(path.join(RAIZ, "docs", "vocabulario.json"), JSON.stringify(vocabulario, null, 1) + "\n");
  console.log(`datos.js: ${datos.campos.length} campos · vocabulario.json: ${Object.keys(vocabulario).length} listas`);
}

module.exports = { generar };
