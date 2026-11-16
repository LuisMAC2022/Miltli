// Genera docs/datos.js y docs/vocabulario.json a partir del diccionario v0.3, y docs/datos-caf.js y
// docs/vocabulario-caf.json a partir del diccionario de cafeterías (especificacion-cambios-app.md
// §3.1–§3.2, P-24; acta-02, CAF-08). Los diccionarios son la fuente; estos archivos nunca se editan
// a mano. Uso: `npm run datos`.
const fs = require("node:fs");
const path = require("node:path");

const RAIZ = path.join(__dirname, "..");
const AUSENCIA = new Set(["0", "NR", "NC", "ND", "NA"]);

// Sección del diccionario → pantalla de captura. Lo que no está aquí no se captura en la app
// (concordancia, bitácora, derivadas, capa restringida, propuestas no impresas).
const FICHAS = {
  hog: {
    diccionario: "diccionario-de-datos-v0.3-borrador.md", version: "v0.3", instr: ["F-HOG", "RT"],
    salida: ["datos.js", "vocabulario.json", "MiltliDatos"],
    pantallas: [
      [/^## 2\. /, "h1"], [/^## 3\. /, "h2"], [/^## 4\. /, "h3"], [/^## 5\. /, "h4"],
      [/^### 7\.0 /, "vis"], [/^### 7\.1 /, "t1"], [/^### 7\.2 /, "t28"], [/^### 7\.6 /, "ver"],
      [/^### 7\.[345] /, null], [/^## (6|8|9|1[0-3])\. /, null]
    ]
  },
  caf: {
    diccionario: "diccionario-de-datos-cafeterias-v0.1-borrador.md", version: "caf-v0.1", instr: ["F-CAF"],
    salida: ["datos-caf.js", "vocabulario-caf.json", "MiltliDatosCaf"],
    pantallas: [
      [/^## 2\. /, "c1"], [/^## 3\. /, "c2"], [/^## 4\. /, "c3"], [/^## 5\. /, "c4"], [/^## 6\. /, "c5"], [/^## 7\. /, "c6"],
      [/^## ([01]|[89]|1[0-3])\. /, null]
    ]
  }
};

const celdas = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
const esSeparador = (l) => /^\|\s*:?-{3,}/.test(l.trim());
const fichas = (t) => [...t.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
const limpiar = (t) => t.replace(/\*\*→[^*]*\*\*/g, "").replace(/·?\s*\*\*PROPUESTA[^*]*\*\*/g, "")
  .replace(/\([^)]*\)/g, "").replace(/[*`]/g, "").replace(/\s+/g, " ").replace(/^[\s·:,—-]+|[\s·:,]+$/g, "").trim();

function leerFilas(md, PANTALLAS) {
  const filas = [];
  const reglas = {};
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
      // Reglas de consistencia (§8): los códigos y valores que nombra cada una, en el orden del texto.
      if ("#" in fila && "Regla" in fila) reglas[fila["#"]] = { tipo: (fila.Tipo || "").split(/[\s:]/)[0], fichas: fichas(fila.Regla) };
      if (pantalla && "Código" in fila && "Instr." in fila) filas.push({ ...fila, pantalla });
    }
    i = j - 1;
  }
  return { filas, exclusiones, reglas };
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

function generar(clave = "hog") {
  const F = FICHAS[clave];
  const md = fs.readFileSync(path.join(RAIZ, "ficha", F.diccionario), "utf8");
  const { filas, exclusiones, reglas } = leerFilas(md, F.pantallas);
  const codigos = new Set();
  for (const f of filas) fichas(f["Código"]).forEach((c) => codigos.add(c));
  const vocabulario = {};
  const campos = [];
  for (const f of filas) {
    const instr = f["Instr."].split(/[·,]/).map((s) => s.trim());
    if (!instr.some((x) => F.instr.includes(x))) continue;
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
        if (v.abierta) { campo.abierta = true; if (clave === "caf" && v.lista.length) campo.muestra = v.lista[0].valor; }
        else if (v.referencia && !v.lista.length && tipo !== "bool") campo.vocabulario = v.referencia;
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
  if (clave === "caf") return { datos: datosCaf(md, campos, vocabulario, reglas, F), vocabulario };
  const rev = (md.match(/\*\*F-HOG rev\. (\d+)\*\*/) || [])[1];
  const datos = { diccionario: F.version, ficha_rev: rev, hogares: vocabulario.ID.map((x) => x.valor), campos, reglas };
  delete vocabulario.ID;
  datos.campos.find((c) => c.codigo === "ID").vocabulario = undefined;
  return { datos, vocabulario };
}

// Cafeterías: las claves K# son abiertas, cada corriente tiene sus propias casillas, y el §10.3
// nombra los códigos que describen la rutina del negocio y no salen del equipo junto con el ID.
function datosCaf(md, campos, vocabulario, reglas, F) {
  const corrientes = vocabulario.CORR_ACEPTA.map((x) => x.valor);
  for (const campo of campos) {
    const corriente = corrientes.find((c) => campo.codigo.split("_").includes(c.toUpperCase()));
    if (corriente) campo.corriente = corriente;
  }
  const codigos = new Set(campos.map((c) => c.codigo));
  const rutina = (md.match(/\n3\. \*\*Nada que exponga el negocio\.\*\*[^]*?\n4\. /) || [""])[0];
  const internos = [...new Set(fichas(rutina))].filter((t) => codigos.has(t) && t !== "ID");
  const prefijo = campos.find((c) => c.codigo === "ID").muestra.replace(/\d+$/, "");
  return { diccionario: F.version, ficha_rev: vocabulario.FICHA_REV[0].valor, prefijo, corrientes, fases: vocabulario.FASE.map((x) => x.valor), internos, campos, reglas };
}

function escribir(clave) {
  const F = FICHAS[clave];
  const { datos, vocabulario } = generar(clave);
  const cabecera = `// GENERADO por tools/generar-datos.js a partir de ficha/${F.diccionario}.\n// No editar a mano: cambia el diccionario y ejecuta \`npm run datos\`.\n`;
  fs.writeFileSync(path.join(RAIZ, "docs", F.salida[0]),
    `${cabecera}(function (global) {\n  "use strict";\n  const DATOS = ${JSON.stringify(datos, null, 1).replace(/\n/g, "\n  ")};\n  if (typeof module !== "undefined" && module.exports) module.exports = DATOS;\n  else global.${F.salida[2]} = DATOS;\n}(typeof window !== "undefined" ? window : globalThis));\n`);
  fs.writeFileSync(path.join(RAIZ, "docs", F.salida[1]), JSON.stringify(vocabulario, null, 1) + "\n");
  console.log(`${F.salida[0]}: ${datos.campos.length} campos, ${Object.keys(datos.reglas).length} reglas · ${F.salida[1]}: ${Object.keys(vocabulario).length} listas`);
}

if (require.main === module) for (const clave of Object.keys(FICHAS)) escribir(clave);

module.exports = { generar };
