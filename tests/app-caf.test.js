// Lógica de la captura de cafeterías (diccionario de cafeterías v0.1; acta-02, CAF-05 y CAF-08).
// Los datos de estas pruebas son inventados y no describen a ningún negocio.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const L = require("../docs/logica-caf.js");
const D = require("../docs/datos-caf.js");
const V = require("../docs/vocabulario-caf.json");
const { generar } = require("../tools/generar-datos.js");

const campo = (codigo) => D.campos.find((c) => c.codigo === codigo);
const valores = (codigo) => V[campo(codigo).vocabulario].map((x) => x.valor);
const fila = (filas, filtro) => filas.find((f) => Object.entries(filtro).every(([k, v]) => f[k] === v));
const reglas = (c) => L.marcas(c, D, V).map((m) => `${m.regla}:${m.codigo}`);
const [POSOS, PREP, PLATO] = D.corrientes;
const [BASE, PILOTO] = D.fases;

// Una cafetería que acepta dos corrientes, cuenta en recipientes y tuvo una salida.
function fichaDePrueba() {
  const estado = L.estadoInicial();
  const id = L.agregar(estado, D);
  const c = estado.cafeterias[id];
  c.antes = { DEST_TIPO: [valores("DEST_TIPO")[0]], DEST_ID: "D1", CORR_ACEPTA: [POSOS, PREP], ALM_TMAX: "3", PLANB: [valores("PLANB")[0]], REC_FREC: "2", PRE: valores("PRE") };
  c.arranque = { FINI: "02/11/2026", UNIDAD: [valores("UNIDAD")[0]], MED_POSOS_CAP: "4", MED_PREP_CAP: "10", ALM_N: "3", ALM_CAP: "20", LLEVA_FUERA: [valores("LLEVA_FUERA")[0]] };
  c.base = { 1: { FECHA: "26/10", SEP_POSOS: "2", SEP_PREP: "1" } };
  c.diario = { 1: { FECHA: "02/11", SEP_POSOS: "3", SEP_PREP: "1½" }, 2: { FECHA: "03/11", CERRADO: ["marcada"] }, 3: { FECHA: "04/11", SEP_POSOS: "1", SEP_PREP: "0" } };
  c.salidas = { 1: { SAL_FECHA: "04/11", SAL_POSOS: "1", SAL_PREP: "½", SAL_TODO: [valores("SAL_TODO")[0]], SAL_RECIBE_CONT: "1½" } };
  c.semanal = { 1: { SFECHA: "08/11", DIAS_OP: "2", FUGA_POSOS: "0", FUGA_PREP: "1", PAUSA_DIAS: "0" } };
  return { estado, id, c };
}

test("datos-caf.js y vocabulario-caf.json son exactamente lo que genera el diccionario de cafeterías", () => {
  const { datos, vocabulario } = generar("caf");
  assert.deepEqual(JSON.parse(JSON.stringify(D)), JSON.parse(JSON.stringify(datos)), "docs/datos-caf.js está desactualizado: npm run datos");
  assert.deepEqual(V, JSON.parse(JSON.stringify(vocabulario)), "docs/vocabulario-caf.json está desactualizado: npm run datos");
  const md = fs.readFileSync(path.join(__dirname, "..", "ficha", "diccionario-de-datos-cafeterias-v0.1-borrador.md"), "utf8");
  assert.equal(D.campos.length, Number(md.match(/\(`F-CAF`\)\*\* \| \*\*(\d+)\*\*/)[1]), "los campos son los del §11");
  assert.deepEqual(Object.keys(D.reglas), L.REGLAS_EVALUADAS, "la app evalúa todas las reglas del §8");
  assert.deepEqual(D.corrientes, valores("CORR_ACEPTA"));
});

test("las claves K# se asignan en orden y un respaldo ajeno no rompe la app", () => {
  const estado = L.estadoInicial();
  assert.deepEqual([L.agregar(estado, D), L.agregar(estado, D)], [`${D.prefijo}1`, `${D.prefijo}2`]);
  const limpio = L.normalizar({ version: 1, cafeterias: { [`${D.prefijo}7`]: { antes: { ALM_TMAX: "2" }, diario: "roto" }, "Café inventado": {} } }, D);
  assert.deepEqual(L.ids(limpio), [`${D.prefijo}7`]);
  assert.equal(limpio.cafeterias[`${D.prefijo}7`].antes.ALM_TMAX, "2");
  assert.deepEqual(limpio.cafeterias[`${D.prefijo}7`].diario, {});
  assert.deepEqual(L.normalizar({ version: 2 }, D), L.estadoInicial());
});

test("Hoja 3: 0 ≠ vacío ≠ cerrado, y la corriente no aceptada es NA", () => {
  const { estado, id } = fichaDePrueba();
  const filas = L.filasLargas(estado, D, V, { interno: true });
  const dia = (n, codigo, fase = PILOTO) => fila(filas, { id, hoja: "3", fase, dia: n, codigo }).valor;
  assert.equal(dia(1, "SEP_PREP"), 1.5);
  assert.equal(dia(3, "SEP_PREP"), 0, "abrió y no separó");
  assert.equal(dia(2, "SEP_POSOS"), "NA", "cerrado");
  assert.equal(dia(2, "CERRADO"), "marcada");
  assert.equal(dia(4, "SEP_POSOS"), "NR", "renglón vacío");
  assert.equal(dia(4, "CERRADO"), "NR");
  assert.equal(dia(1, "SEP_PLATO"), "NA", "corriente no aceptada");
  assert.equal(dia(1, "SEP_POSOS", BASE), 2, "la semana previa va en su propia hoja");
  assert.equal(dia(1, "NOTA_D"), "");
});

test("Hoja 4: sólo salen las salidas llenadas; dentro de una, lo vacío es ND", () => {
  const { estado, id } = fichaDePrueba();
  const filas = L.filasLargas(estado, D, V, { interno: true });
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 2 }), undefined);
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 1, codigo: "SAL_PREP" }).valor, 0.5);
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 1, codigo: "SAL_ENTREGA_ROL" }).valor, "ND");
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 1, codigo: "SAL_RECIBE_KG" }).valor, "NA");
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 1, codigo: "SAL_PLATO" }).valor, "NA");
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 1, codigo: "SAL_PLANB" }).valor, "no_marcada");
});

test("Hoja 5: columna vacía = NR; casilla vacía = NC; los motivos son NA cuando no aplican", () => {
  const { estado, id, c } = fichaDePrueba();
  let filas = L.filasLargas(estado, D, V);
  const sem = (n, codigo) => fila(filas, { id, hoja: "5", sem: n, codigo }).valor;
  assert.equal(sem(2, "MIN_CAF"), "NR");
  assert.equal(sem(1, "MIN_CAF"), "NC");
  assert.equal(sem(1, "REG"), "ND");
  assert.equal(sem(1, "PAUSA_MOT"), "NA", "PAUSA_DIAS = 0");
  assert.equal(sem(1, "FUGA_CAF_MOT"), "NC", "hubo fuga y no se marcó motivo");
  assert.equal(sem(1, "FUGA_PLATO"), "NA");
  c.semanal[1].FUGA_PREP = "0";
  filas = L.filasLargas(estado, D, V);
  assert.equal(sem(1, "FUGA_CAF_MOT"), "NA", "todo llegó");
});

test("lo que describe la rutina del negocio sólo sale en la exportación interna", () => {
  const { estado } = fichaDePrueba();
  assert.ok(D.internos.includes("CERRADO") && D.internos.includes("SAL_FECHA") && D.internos.includes("DIAS_OP"));
  const publicas = new Set(L.filasLargas(estado, D, V).map((f) => f.codigo));
  const internas = new Set(L.filasLargas(estado, D, V, { interno: true }).map((f) => f.codigo));
  for (const codigo of D.internos) {
    assert.ok(!publicas.has(codigo), `${codigo} salió sin ser interna`);
    if (campo(codigo).tipo !== "multi") assert.ok(internas.has(codigo), codigo);
  }
  for (const texto of [L.csvAncho(estado, D, V), L.csvCafeteria(estado, D, V)]) {
    const cabeza = texto.replace(/^﻿/, "").split("\r\n")[0].split(",");
    for (const codigo of D.internos) assert.ok(!cabeza.includes(codigo.toLowerCase()), codigo);
    assert.ok(!cabeza.includes("dias_abiertos_der"));
  }
});

test("una ficha consistente no levanta ninguna marca", () => {
  const { c } = fichaDePrueba();
  assert.deepEqual(reglas(c), []);
});

test("las diecisiete reglas IC se marcan y no corrigen lo capturado", () => {
  const { estado, id, c } = fichaDePrueba();
  const nada = D.reglas["IC-7"].fichas[0];
  c.antes.PRE = valores("PRE").slice(1);                                   // IC-1
  c.antes.REC_FREC = "5";                                                  // IC-2
  c.diario[1].SEP_PLATO = "1";                                             // IC-3
  c.diario[2].SEP_POSOS = "1";                                             // IC-4
  c.diario[3].SEP_POSOS = "1¼";                                            // IC-5
  c.semanal[1].REG = valores("REG");                                       // IC-6
  c.semanal[1].ALM_OBS = [nada, valores("ALM_OBS")[0]];                    // IC-7
  c.semanal[1].PAUSA_MOT = [valores("PAUSA_MOT")[0]];                      // IC-8
  c.salidas[2] = { SAL_FECHA: "05/11", SAL_PLANB: ["marcada"], SAL_POSOS: "1" };
  c.semanal[2] = { FUGA_POSOS: "0", FUGA_PREP: "0" };
  c.salidas[3] = { SAL_FECHA: "10/11", SAL_PLANB: ["marcada"], SAL_POSOS: "1" }; // IC-9, en la semana 2
  c.semanal[1].ACT_CAF = [valores("ACT_CAF").find((v) => v !== nada)];      // IC-10 (retiro sin nota)
  c.semanal[1].DIAS_OP = "6";                                              // IC-11
  c.semanal[1].ALM_DIAS = "4";                                             // IC-12
  c.salidas[4] = { SAL_FECHA: "26/10", SAL_POSOS: "1" };                   // IC-13
  c.salidas[1].SAL_RECIBE_CONT = "3";                                      // IC-14
  c.semanal[1].FUGA_CAF_MOT = [D.reglas["IC-15"].fichas[2]];               // IC-15
  c.semanal[1].ALM_LLENOS = "5";                                           // IC-16
  c.cierre = { CONTIN: valores("CONTIN").slice(0, 2) };                    // IC-17
  const halladas = new Set(L.marcas(c, D, V).map((m) => m.regla));
  for (const regla of L.REGLAS_EVALUADAS) assert.ok(halladas.has(regla), regla);
  const filas = L.filasLargas(estado, D, V, { interno: true });
  const raro = fila(filas, { id, hoja: "3", fase: PILOTO, dia: 3, codigo: "SEP_POSOS" });
  assert.deepEqual([raro.valor, raro.valor_original, raro.marcas], ["ND", "1¼", "IC-5"]);
  assert.equal(fila(filas, { id, hoja: "3", fase: PILOTO, dia: 1, codigo: "SEP_PLATO" }).valor, 1, "se conserva lo que dice el papel");
  assert.equal(fila(filas, { id, hoja: "4", sal_n: 1, codigo: "SAL_RECIBE_CONT" }).valor, 3, "se conservan los dos números");
});

test("con UNIDAD en kilos se aceptan decimales y no se convierten a litros", () => {
  const { estado, id, c } = fichaDePrueba();
  c.arranque.UNIDAD = [valores("UNIDAD")[1]];
  c.diario[1].SEP_POSOS = "2.3";
  assert.ok(!reglas(c).some((r) => r.startsWith("IC-5")));
  const filas = L.filasLargas(estado, D, V);
  assert.equal(fila(filas, { id, hoja: "3", fase: PILOTO, dia: 1, codigo: "SEP_POSOS" }).valor, 2.3);
  assert.equal(fila(filas, { id, hoja: "2", codigo: "MED_PREP_CAP" }).valor, "10");
  c.arranque.MED_PREP_CAP = "";
  assert.equal(fila(L.filasLargas(estado, D, V), { id, hoja: "2", codigo: "MED_PREP_CAP" }).valor, "NA");
  const s1 = fila(L.filasAnchas(estado, D, V), { id, sem: 1 });
  assert.equal(s1[`sep_l_${POSOS}_der`], "");
  assert.equal(s1[`sep_sem_${POSOS}_der`], 3.3);
});

test("GUARD_DIAS cuenta desde la última salida en que se llevó todo", () => {
  const { c } = fichaDePrueba();
  c.salidas[2] = { SAL_FECHA: "09/11", SAL_POSOS: "1", SAL_TODO: [valores("SAL_TODO")[1]] };
  c.salidas[3] = { SAL_FECHA: "12/11", SAL_POSOS: "1" };
  assert.deepEqual(L.guardado(c, V), { 1: 2, 2: 5, 3: 8 });
  assert.ok(reglas(c).includes("IC-12:SAL_FECHA"));
  assert.equal(L.semanaDe(c, "09/11"), 2);
});

test("el CSV ancho suma por corriente y marca las derivadas", () => {
  const { estado, id } = fichaDePrueba();
  const anchas = L.filasAnchas(estado, D, V, { interno: true });
  assert.equal(anchas.length, 5, "la semana previa y S1–S4");
  const s1 = fila(anchas, { id, sem: 1 });
  assert.equal(s1[`sep_sem_${POSOS}_der`], 4);
  assert.equal(s1[`sep_l_${POSOS}_der`], 16);
  assert.equal(s1[`sep_l_${PREP}_der`], 15);
  assert.equal(s1.dias_abiertos_der, 2);
  assert.equal(s1[`sep_dia_${POSOS}_der`], 8);
  assert.equal(s1[`fuga_l_${PREP}_der`], 10);
  assert.equal(s1[`sep_l_${PLATO}_der`], "");
  assert.equal(s1.sal_l_der, 30);
  assert.equal(s1.dest_l_der, 30);
  assert.equal(s1.guard_dias_max_der, 2);
  assert.equal(s1.gen_est_caf_der, 41);
  assert.equal(fila(anchas, { id, fase: BASE })[`sep_l_${POSOS}_der`], 8);
  const texto = L.csvAncho(estado, D, V, { interno: true });
  assert.equal(texto.replace(/^﻿/, "").split("\r\n")[0], L.columnasAncho(D, V, { interno: true }).join(","));
});

test("la fila por cafetería lleva las Hojas 1, 2 y 6 y el balance del mes", () => {
  const { estado, id, c } = fichaDePrueba();
  c.cierre = { ALM_LLENOS_F: "½" };
  const [f] = L.filasCafeteria(estado, D, V, { interno: true });
  assert.equal(f.id, id);
  assert.equal(f.ficha_rev, D.ficha_rev);
  assert.equal(f.alm_tmax, "3");
  assert.equal(f[`corr_acepta_${PLATO}`], 0);
  assert.equal(f.sep_total_l_der, 31);
  assert.equal(f.fuga_total_l_der, 10);
  assert.equal(f.guardado_final_l_der, 10);
  assert.equal(f.balance_caf_der, -19);
  assert.equal(L.csvCafeteria(estado, D, V).replace(/^﻿/, "").split("\r\n").length, 3);
});

test("ningún encabezado ni fila lleva datos del negocio; una cafetería sin datos no sale", () => {
  const { estado } = fichaDePrueba();
  L.agregar(estado, D);
  const prohibidas = /responsable|nombre|correo|email|telefono|domicilio|direccion|municipio|ventas|clientes_|ticket|menu|proveedor|horario/i;
  for (const texto of [L.csvLargo(estado, D, V, { interno: true }), L.csvAncho(estado, D, V, { interno: true }), L.csvCafeteria(estado, D, V, { interno: true })]) {
    for (const columna of texto.replace(/^﻿/, "").split("\r\n")[0].split(",")) assert.doesNotMatch(columna, prohibidas, columna);
    assert.doesNotMatch(texto, new RegExp(`(^|\\n)${D.prefijo}2,`));
  }
  assert.equal(L.csvLargo(estado, D, V).replace(/^﻿/, "").split("\r\n")[0], "id,ficha_rev,hoja,fase,sem,dia,sal_n,codigo,valor,valor_original,marcas");
});
