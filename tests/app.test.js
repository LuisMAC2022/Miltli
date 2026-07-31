const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../docs/app.js");

test("calcula semanas con límites correctos", () => {
  assert.equal(core.weekForDate("2026-07-01", "2026-07-01"), 1);
  assert.equal(core.weekForDate("2026-07-07", "2026-07-01"), 1);
  assert.equal(core.weekForDate("2026-07-08", "2026-07-01"), 2);
  assert.equal(core.weekForDate("2026-06-30", "2026-07-01"), 0);
  assert.equal(core.weekForDate("2026-07-29", "2026-07-01"), 5);
});

test("calcula rango semanal sin depender de zona horaria", () => {
  assert.deepEqual(core.weekRange("2026-07-01", 2), { start: "2026-07-08", end: "2026-07-14" });
});

test("calcula material seco faltante", () => {
  assert.deepEqual(core.layerSummary(3, 4), { wet: 3, dry: 4, missing: 2, ratio: 4 / 3 });
  assert.equal(core.layerSummary(3, 6).missing, 0);
});

test("exporta resumen, registros y revisión de una sola semana", () => {
  const state = core.normalizeState({
    config: { clave: "H2", responsable: "Ana", personas: 3, capacidadL: 80, inicio: "2026-07-01", coordinadorEmail: "coord@example.org" },
    entradas: [
      { id: "a", fecha: "2026-07-02", humedoL: 2, secoL: 4, tipo: "fruta", minutos: 5 },
      { id: "b", fecha: "2026-07-09", humedoL: 1, secoL: 2, tipo: "café", minutos: 3 }
    ],
    revisiones: { "1": { humedad: "adecuada", olor: "ninguno", plagas: "ninguno", estructura: "suelta y aireada", ocupadoPct: 12, minutos: 4, foto: true } }
  });
  const csv = core.buildWeeklyCsv(state, 1, "2026-07-07T12:00:00.000Z");
  assert.match(csv, /resumen,H2,Ana,3,1,2026-07-01,2026-07-07/);
  assert.match(csv, /diario,H2,Ana,3,1,2026-07-01,2026-07-07,2026-07-02,2\.0,4\.0/);
  assert.match(csv, /semanal,H2,Ana,3,1/);
  assert.doesNotMatch(csv, /2026-07-09/);
});

test("normaliza respaldos incompletos", () => {
  const state = core.normalizeState({ config: { clave: "X", personas: 0, inicio: "mala" } });
  assert.equal(state.config.clave, "H1");
  assert.equal(state.config.personas, 1);
  assert.match(state.config.inicio, /^\d{4}-\d{2}-\d{2}$/);
});
