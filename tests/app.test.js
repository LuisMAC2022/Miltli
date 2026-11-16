// Lógica de la captura del coordinador (ficha/especificacion-cambios-app.md §3–§9 y §12).
// Los datos de estas pruebas son inventados y no describen a ningún hogar.
const test = require("node:test");
const assert = require("node:assert/strict");
const L = require("../docs/logica.js");
const D = require("../docs/datos.js");
const V = require("../docs/vocabulario.json");

const campo = (codigo) => D.campos.find((c) => c.codigo === codigo);
const valores = (codigo) => V[campo(codigo).vocabulario].map((x) => x.valor);
const fila = (filas, filtro) => filas.find((f) => Object.entries(filtro).every(([k, v]) => f[k] === v));

function fichaDePrueba() {
  const estado = L.estadoInicial(D);
  const h = estado.hogares[D.hogares[1]];
  h.alta = { PERS0: "3", BOTE_CAP: "1.02", DREV: [valores("DREV")[0]], DPRE: [valores("DPRE")[0], valores("DPRE")[1]] };
  h.diario = { 1: { FECHA: "02/11", ORG: "1½", SEC: "3" }, 2: { FECHA: "03/11", ORG: "0", SEC: "0" }, 4: { FECHA: "05/11", ORG: "poquito", SEC: "2" } };
  h.semanal = { 1: { SFECHA: "08/11", FUGA: "0", PERS_S: "3", MIN_S: "20" } };
  return { estado, id: D.hogares[1], h };
}

test("cantidades: enteros y medios; lo demás es ND con el texto original", () => {
  assert.equal(L.cantidad("0").valor, 0);
  assert.equal(L.cantidad("2").valor, 2);
  assert.equal(L.cantidad("½").valor, 0.5);
  assert.equal(L.cantidad("1½").valor, 1.5);
  assert.equal(L.cantidad("1.5").valor, 1.5);
  assert.equal(L.cantidad("1,5").valor, 1.5);
  assert.equal(L.cantidad("").valor, "");
  assert.equal(L.cantidad("nc").valor, "NC");
  assert.deepEqual(L.cantidad("1¼"), { valor: "ND", original: "1¼", error: true });
  assert.deepEqual(L.cantidad("60 %"), { valor: "ND", original: "60 %", error: true });
});

test("un renglón vacío de la Hoja 2 sale como NR y un 0 sale como 0", () => {
  const { estado, id } = fichaDePrueba();
  const filas = L.filasLargas(estado, D, V);
  assert.equal(fila(filas, { id, hoja: "2", dia: 2, codigo: "ORG" }).valor, 0);
  assert.equal(fila(filas, { id, hoja: "2", dia: 3, codigo: "ORG" }).valor, "NR");
  assert.equal(fila(filas, { id, hoja: "2", dia: 3, codigo: "FECHA" }).valor, "NR");
  assert.equal(fila(filas, { id, hoja: "2", dia: 1, codigo: "ORG" }).valor, 1.5);
  const raro = fila(filas, { id, hoja: "2", dia: 4, codigo: "ORG" });
  assert.deepEqual([raro.valor, raro.valor_original, raro.marcas], ["ND", "poquito", "I-6"]);
});

test("Hoja 3: columna vacía = NR; casilla vacía en una semana con datos = NC; motivo NA si la fuga es 0", () => {
  const { estado, id } = fichaDePrueba();
  const filas = L.filasLargas(estado, D, V);
  assert.equal(fila(filas, { id, hoja: "3", sem: 2, codigo: "FUGA" }).valor, "NR");
  assert.equal(fila(filas, { id, hoja: "3", sem: 1, codigo: "LLEN_S" }).valor, "NC");
  assert.equal(fila(filas, { id, hoja: "3", sem: 1, codigo: "REG" }).valor, "ND");
  assert.equal(fila(filas, { id, hoja: "3", sem: 1, codigo: "FUGA_MOT" }).valor, "NA");
  assert.equal(fila(filas, { id, hoja: "3", sem: 1, codigo: "NOTA_S" }).valor, "");
  assert.equal(fila(filas, { id, hoja: "4", codigo: "HUM" }).valor, "NR", "Hoja 4 entera en blanco");
});

test("las multimarca se abren en multi-hot y las opciones únicas no", () => {
  const { estado, id } = fichaDePrueba();
  const filas = L.filasLargas(estado, D, V);
  const [a, b, c] = valores("DPRE");
  assert.equal(fila(filas, { id, codigo: `DPRE_${a}` }).valor, 1);
  assert.equal(fila(filas, { id, codigo: `DPRE_${b}` }).valor, 1);
  assert.equal(fila(filas, { id, codigo: `DPRE_${c}` }).valor, 0);
  assert.equal(fila(filas, { id, codigo: "DPRE" }), undefined);
});

test("DREV sólo sale en la exportación interna del equipo", () => {
  const { estado } = fichaDePrueba();
  assert.equal(fila(L.filasLargas(estado, D, V), { codigo: "DREV" }), undefined);
  assert.equal(fila(L.filasLargas(estado, D, V, { interno: true }), { codigo: "DREV" }).valor, valores("DREV")[0]);
});

test("las reglas de consistencia se marcan y no corrigen lo capturado", () => {
  const { estado, id, h } = fichaDePrueba();
  const act = campo("ACT");
  const otra = valores("ACT").find((v) => v !== act.excluyente);
  h.semanal[1].ACT = [act.excluyente, otra];
  h.semanal[1].REG = valores("REG");
  h.semanal[1].FUGA_MOT = [valores("FUGA_MOT")[0]];
  h.unico.PARADA_DIA = "4";
  h.diario[5] = { ORG: "1" };
  const reglas = L.marcas(h, D, V).map((m) => `${m.regla}:${m.codigo}`);
  for (const esperada of ["I-2:ACT", "I-4:REG", "I-9:FUGA_MOT", "I-6:ORG", "I-11:ORG"]) assert.ok(reglas.includes(esperada), esperada);
  const filas = L.filasLargas(estado, D, V);
  assert.equal(fila(filas, { id, sem: 1, codigo: `ACT_${act.excluyente}` }).valor, 1, "se conserva lo que dice el papel");
  assert.equal(fila(filas, { id, sem: 1, codigo: `ACT_${otra}` }).marcas, "I-2");
  assert.equal(fila(filas, { id, sem: 1, codigo: "REG" }).valor, valores("REG").join("|"));
});

test("I-15: la capacidad del bote se compara con la masa de agua", () => {
  const { h } = fichaDePrueba();
  h.tecnico.dia1 = { BOTE_TARA: "40", BOTE_AGUA: "1060" };
  assert.ok(!L.marcas(h, D, V).some((m) => m.regla === "I-15"));
  h.tecnico.dia1.BOTE_AGUA = "1200";
  assert.ok(L.marcas(h, D, V).some((m) => m.regla === "I-15"));
});

test("el CSV largo tiene sus nueve columnas y ninguna prohibida; los hogares sin datos no salen", () => {
  const { estado, id } = fichaDePrueba();
  const texto = L.csvLargo(estado, D, V);
  const [cabeza, ...lineas] = texto.replace(/^﻿/, "").trim().split("\r\n");
  assert.equal(cabeza, "id,ficha_rev,hoja,sem,dia,codigo,valor,valor_original,marcas");
  assert.ok(lineas.every((l) => l.startsWith(`${id},${D.ficha_rev},`)));
  assert.doesNotMatch(texto, /responsable|tipo_residuo|nombre|correo|telefono/i);
});

test("el CSV ancho suma la semana y marca las derivadas", () => {
  const { estado, id } = fichaDePrueba();
  const s1 = fila(L.filasAnchas(estado, D, V), { id, sem: 1 });
  assert.equal(s1.org, 1.5);
  assert.equal(s1.sec, 5);
  assert.equal(s1.dias_anotados, 2);
  assert.equal(s1.org_l_der, 1.53);
  assert.equal(s1.ent_lps_der, 0.51);
  assert.equal(s1.gen_est_der, 0.51);
  assert.match(s1.marcas, /I-6/);
});

test("csvEscape neutraliza fórmulas y escapa comillas", () => {
  assert.equal(L.csvEscape("=SUMA(A1)"), "'=SUMA(A1)");
  assert.equal(L.csvEscape('dijo "no"'), '"dijo ""no"""');
  assert.equal(L.csvEscape("a,b"), '"a,b"');
});

test("normaliza respaldos incompletos y rechaza los de otra versión", () => {
  const limpio = L.normalizar({ version: 2, hogares: { [D.hogares[0]]: { alta: { PERS0: "2" }, diario: "roto" } }, verificacion: "roto" }, D);
  assert.equal(limpio.hogares[D.hogares[0]].alta.PERS0, "2");
  assert.deepEqual(limpio.hogares[D.hogares[0]].diario, {});
  assert.deepEqual(limpio.verificacion, []);
  assert.deepEqual(Object.keys(limpio.hogares), D.hogares);
  assert.deepEqual(L.normalizar({ version: 1, config: {} }, D), L.estadoInicial(D));
});

test("la serie anterior sólo rescata las cantidades diarias, por lista blanca", () => {
  const viejo = { version: 1, config: { clave: "H3", [["respon", "sable"].join("")]: "Persona inventada" }, entradas: [{ fecha: "2026-07-01", humedoL: 2, secoL: 4, tipo: "x", notas: "y" }] };
  const filas = L.serieAnterior(viejo);
  assert.deepEqual(filas, [{ serie: "anterior_v1", id: "H3", fecha: "2026-07-01", humedo_l: 2, seco_l: 4 }]);
  assert.doesNotMatch(L.csv(filas), /inventada/);
});
