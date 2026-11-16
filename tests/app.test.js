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

const R = (regla, i) => D.reglas[regla].fichas[i];
const halladas = (h, verificacion) => L.marcas(h, D, V, verificacion).map((m) => `${m.regla}:${m.codigo}`);

test("la app evalúa todas las reglas del §8 salvo la de la hoja de concordancia", () => {
  assert.deepEqual(L.REGLAS_EVALUADAS, Object.keys(D.reglas).filter((r) => r !== "I-27"));
  assert.deepEqual(D.reglas["I-27"].fichas, ["CONC_OBS", "CONC_ROL"], "I-27 es de un instrumento que la app no captura");
  assert.equal(campo("CONC_OBS"), undefined);
});

test("una ficha consistente no levanta marcas", () => {
  const { h } = fichaDePrueba();
  h.diario[4].ORG = "1";
  assert.deepEqual(halladas(h), []);
});

test("I-10 a I-14: parada, llenado, seco y animales de la casa", () => {
  const { h } = fichaDePrueba();
  h.diario[4].ORG = "1";
  h.unico.PARADA_DIA = "17";
  h.semanal[1].FUGA = "1";
  h.semanal[1].FUGA_MOT = [R("I-10", 0)];
  h.semanal[3] = { LLEN_S: [R("I-12", 2)] };
  h.alta.MASC = [R("I-14", 4)];
  h.semanal[2] = { FUGA: "1", FUGA_MOT: [R("I-14", 2)] };
  const r = halladas(h);
  for (const esperada of ["I-10:FUGA_MOT", "I-12:LLEN_S", "I-14:MASC"]) assert.ok(r.includes(esperada), esperada);
  h.semanal[3].LLEN_S = [valores("LLEN_S")[3]];
  h.alta.MASC = [R("I-14", 1)];
  assert.ok(!halladas(h).some((x) => /I-12|I-14/.test(x)), "casi lleno en la semana de la parada, y fuga a animales con «casi siempre»");
  h.semanal[2].FUGA_MOT = [];
  h.semanal[4] = { FUGA: "0" };
  assert.ok(halladas(h).includes("I-14:MASC"), "«casi siempre» y ninguna de las cuatro semanas con esa fuga");
});

test("I-16 a I-20 e I-24, I-25: el registro técnico del día 28", () => {
  const { h } = fichaDePrueba();
  h.diario[4].ORG = "1";
  h.alta.UBIC_TP = [R("I-20", 1)];
  h.tecnico.dia1 = { CONT_FORMA: [valores("CONT_FORMA")[0]], CONT_LARGO: "40", CONT_ANCHO: "30", CONT_ALTO: "50", CONT_TARA: "2", CONT_TARA_MET: [R("I-19", 1)] };
  h.tecnico.cierre = {
    DENS_V: "1.2", DENS_M: "300", RES_GUARDADO: [valores("RES_GUARDADO")[1]], LLEN_REF: "25", PESO_BRUTO: "80", PESO_MET: [R("I-20", 3)],
    SUELO_TIPO: [R("I-25", 1)], SUELO_PROF: "10", MUE_SUELO_P1_M: "200"
  };
  const r = halladas(h);
  for (const esperada of ["I-16:DENS_V", "I-18:PESO_BRUTO", "I-19:PESO_MET", "I-20:PESO_MET", "I-24:DENS_V", "I-24:DENS_M", "I-25:SUELO_PROF", "I-25:MUE_SUELO_P1_M"]) assert.ok(r.includes(esperada), esperada);
  assert.ok(!r.includes("I-17:LLEN_REF"));
  h.tecnico.cierre.PESO_BRUTO = "14";
  assert.ok(!halladas(h).includes("I-18:PESO_BRUTO"), "12 kg en 30 L: 0.4 kg/L, dentro del intervalo");
  h.tecnico.cierre.PESO_BRUTO = "1.5";
  assert.ok(halladas(h).includes("I-18:PESO_BRUTO"), "peso neto negativo");
});

test("I-21 a I-23 e I-26: material previo, decimales, ventana de la visita y verificación", () => {
  const { estado, h } = fichaDePrueba();
  h.diario[4].ORG = "1";
  const termometro = valores("VER_INSTR").find((v) => /^term/.test(v));
  h.alta.FINI = "02/11/2026";
  h.alta.D0_VACIO = [R("I-21", 1)];
  h.tecnico.cierre = { VIS_FECHA: "25/11", VIS_OK: [R("I-23", 2)], TEMP_I: "31.25", TEMP_AMB: "22.5" };
  estado.verificacion = [{ VER_FECHA: "25/11", VER_INSTR: [termometro], VER_LECT: "0.5", VER_OK: [R("I-26", 1)] }];
  const r = halladas(h, estado.verificacion);
  for (const esperada of ["I-21:D0_VACIO", "I-22:TEMP_I", "I-23:VIS_FECHA", "I-26:VIS_FECHA"]) assert.ok(r.includes(esperada), esperada);
  assert.ok(!r.includes("I-22:TEMP_AMB"));
  assert.equal(fila(L.filasLargas(estado, D, V), { hoja: "V", codigo: "VER_OK" }).marcas, "I-26");
  h.tecnico.cierre.VIS_FECHA = "28/11";
  assert.ok(!halladas(h, estado.verificacion).some((x) => /I-23|I-26/.test(x)), "día 27: dentro de la ventana 26–28, y otra fecha que la verificación");
  assert.equal(fila(L.filasHogar(estado, D, V), {}).dia_vis_der, 27);
});

test("fechas del papel: con y sin año, y cambio de año", () => {
  const ini = L.fecha("20/12/2026");
  assert.equal(L.dias(L.fecha("03/01", ini), ini), 14);
  assert.equal(L.dias(L.fecha("2026-12-21", ini), ini), 1);
  assert.equal(L.fecha("31/13"), null);
  assert.equal(L.fecha("mañana"), null);
});

test("el volumen geométrico sigue la forma del contenedor", () => {
  const [rect, cil, cubeta] = valores("CONT_FORMA");
  assert.equal(L.volumen({ CONT_FORMA: [rect], CONT_LARGO: "40", CONT_ANCHO: "30" }, 25), 30);
  assert.equal(L.redondo(L.volumen({ CONT_FORMA: [cil], CONT_DIAM_SUP: "30" }, 20)), 14.14);
  assert.equal(L.redondo(L.volumen({ CONT_FORMA: [cubeta], CONT_DIAM_SUP: "30", CONT_DIAM_INF: "30", CONT_ALTO: "40" }, 20)), 14.14, "una cubeta recta es un cilindro");
  assert.equal(L.volumen({ CONT_FORMA: [rect] }, 25), null);
});

test("el CSV ancho tiene columnas fijas, las de la tabla de correspondencia, aunque no haya datos", () => {
  const cabeza = L.columnasAncho(D, V);
  const tabla = require("node:fs").readFileSync(require("node:path").join(__dirname, "..", "ficha", "tabla-de-correspondencia-v0.1.md"), "utf8");
  for (const columna of ["sfecha", "reg", "fuga", "pers_s", "min_s", "llen_s", "nota_s", "fuga_mot_fg1", "act_a0"]) {
    assert.ok(cabeza.includes(columna), columna);
    assert.ok(tabla.includes("`" + columna + "`"), `${columna} no está en la tabla`);
  }
  assert.equal(new Set(cabeza).size, cabeza.length, "sin columnas repetidas");
  assert.equal(L.csvAncho(L.estadoInicial(D), D, V).replace(/^\uFEFF/, "").trim(), cabeza.join(","));
});

test("la fila por hogar lleva lo que se anota una vez, sin columnas repetidas ni DREV", () => {
  const { estado, id, h } = fichaDePrueba();
  h.alta.DPRE_OTRO = "texto de prueba";
  h.dia28 = { HUM: [valores("HUM")[1], valores("HUM")[3]] };
  h.tecnico.dia1 = { VIS_FECHA: "02/11" };
  h.tecnico.cierre = { VIS_FECHA: "28/11", DENS_V: "1", DENS_M: "270" };
  const cabeza = L.columnasHogar(D, V);
  assert.equal(new Set(cabeza).size, cabeza.length, "sin columnas repetidas");
  assert.ok(!cabeza.includes("drev") && L.columnasHogar(D, V, { interno: true }).includes("drev"));
  const [f] = L.filasHogar(estado, D, V);
  assert.equal(f.id, id);
  assert.equal(f.pers0, "3");
  assert.equal(f.dpre_otro, 0, "la opción");
  assert.equal(f.dpre_otro_texto, "texto de prueba", "lo escrito");
  assert.deepEqual([f.hum_min, f.hum_max, f[`hum_${valores("HUM")[1].toLowerCase()}`]], [valores("HUM")[1], valores("HUM")[3], 1]);
  assert.deepEqual([f.vis_fecha_d1, f.vis_fecha_d28], ["02/11", "28/11"]);
  assert.equal(f.dens_ent_der, 0.27);
  assert.equal(f.parada_dia, "NC");
  for (const columna of Object.keys(f)) assert.ok(cabeza.includes(columna), `${columna} no está en el encabezado`);
  assert.doesNotMatch(L.csvHogar(estado, D, V), /responsable|tipo_residuo|nombre|correo|telefono/i);
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
  assert.equal(s1.org_sem_der, 1.5);
  assert.equal(s1.sec_sem_der, 5);
  assert.equal(s1.dias_anotados_der, 2);
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
