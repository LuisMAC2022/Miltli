(function (global) {
  "use strict";

  const STORAGE_KEY = "miltli-pages-v1";
  const DAY_MS = 24 * 60 * 60 * 1000;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function todayISO(now = new Date()) {
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }

  function isoToUtc(iso) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    if (!match) return NaN;
    return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  function addDays(iso, days) {
    const timestamp = isoToUtc(iso);
    if (!Number.isFinite(timestamp)) return "";
    const date = new Date(timestamp + days * DAY_MS);
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  }

  function weekForDate(dateISO, startISO) {
    const date = isoToUtc(dateISO);
    const start = isoToUtc(startISO);
    if (!Number.isFinite(date) || !Number.isFinite(start)) return 0;
    const difference = Math.floor((date - start) / DAY_MS);
    if (difference < 0) return 0;
    return Math.floor(difference / 7) + 1;
  }

  function weekRange(startISO, week) {
    const number = Math.max(1, Math.min(4, Number(week) || 1));
    return { start: addDays(startISO, (number - 1) * 7), end: addDays(startISO, number * 7 - 1) };
  }

  function formatDate(iso) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    return match ? `${match[3]}/${match[2]}/${match[1]}` : "—";
  }

  function finiteNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function defaultState() {
    return {
      version: 1,
      config: {
        clave: "H1",
        responsable: "",
        personas: 1,
        capacidadL: 80,
        inicio: todayISO(),
        coordinadorNombre: "",
        coordinadorEmail: ""
      },
      entradas: [],
      revisiones: {},
      entregas: {}
    };
  }

  function normalizeState(candidate) {
    const base = defaultState();
    const source = candidate && typeof candidate === "object" ? candidate : {};
    const config = source.config && typeof source.config === "object" ? source.config : {};
    const key = /^H[1-5]$/.test(String(config.clave || "")) ? String(config.clave) : base.config.clave;
    const start = Number.isFinite(isoToUtc(config.inicio)) ? config.inicio : base.config.inicio;

    return {
      version: 1,
      config: {
        clave: key,
        responsable: String(config.responsable || "").trim(),
        personas: Math.max(1, Math.round(finiteNumber(config.personas, 1))),
        capacidadL: Math.max(0, finiteNumber(config.capacidadL, 80)),
        inicio: start,
        coordinadorNombre: String(config.coordinadorNombre || "").trim(),
        coordinadorEmail: String(config.coordinadorEmail || "").trim()
      },
      entradas: Array.isArray(source.entradas) ? source.entradas.map(normalizeEntry).filter(Boolean) : [],
      revisiones: normalizeReviews(source.revisiones),
      entregas: normalizeDeliveries(source.entregas)
    };
  }

  function normalizeEntry(entry) {
    if (!entry || typeof entry !== "object" || !Number.isFinite(isoToUtc(entry.fecha))) return null;
    return {
      id: String(entry.id || makeId()),
      fecha: entry.fecha,
      humedoL: Math.max(0, finiteNumber(entry.humedoL)),
      secoL: Math.max(0, finiteNumber(entry.secoL)),
      tipo: String(entry.tipo || "").trim(),
      contaminantes: Boolean(entry.contaminantes),
      minutos: Math.max(0, Math.round(finiteNumber(entry.minutos))),
      notas: String(entry.notas || "").trim(),
      creadoEn: String(entry.creadoEn || new Date().toISOString())
    };
  }

  function normalizeReviews(reviews) {
    const result = {};
    if (!reviews || typeof reviews !== "object") return result;
    for (let week = 1; week <= 4; week += 1) {
      const review = reviews[String(week)] || reviews[week];
      if (!review || typeof review !== "object") continue;
      result[String(week)] = {
        semana: week,
        humedad: String(review.humedad || "adecuada"),
        olor: String(review.olor || "ninguno"),
        plagas: String(review.plagas || "ninguno"),
        estructura: String(review.estructura || "suelta y aireada"),
        ocupadoPct: Math.max(0, finiteNumber(review.ocupadoPct)),
        accion: String(review.accion || "").trim(),
        resultado: String(review.resultado || "").trim(),
        minutos: Math.max(0, Math.round(finiteNumber(review.minutos))),
        foto: Boolean(review.foto),
        guardadoEn: String(review.guardadoEn || new Date().toISOString())
      };
    }
    return result;
  }

  function normalizeDeliveries(deliveries) {
    const result = {};
    if (!deliveries || typeof deliveries !== "object") return result;
    for (let week = 1; week <= 4; week += 1) {
      const delivery = deliveries[String(week)] || deliveries[week];
      if (!delivery || typeof delivery !== "object" || !delivery.enviadoEn) continue;
      result[String(week)] = {
        enviadoEn: String(delivery.enviadoEn),
        metodo: String(delivery.metodo || "manual")
      };
    }
    return result;
  }

  function makeId() {
    if (global.crypto && typeof global.crypto.randomUUID === "function") return global.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function entriesForWeek(state, week) {
    return state.entradas
      .filter((entry) => weekForDate(entry.fecha, state.config.inicio) === Number(week))
      .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.creadoEn.localeCompare(b.creadoEn));
  }

  function totals(entries) {
    return entries.reduce((sum, entry) => {
      sum.humedoL += finiteNumber(entry.humedoL);
      sum.secoL += finiteNumber(entry.secoL);
      sum.minutos += finiteNumber(entry.minutos);
      return sum;
    }, { humedoL: 0, secoL: 0, minutos: 0 });
  }

  function layerSummary(humedoL, secoL) {
    const wet = Math.max(0, finiteNumber(humedoL));
    const dry = Math.max(0, finiteNumber(secoL));
    const missing = Math.max(0, wet * 2 - dry);
    return { wet, dry, missing, ratio: wet > 0 ? dry / wet : 0 };
  }

  function correctiveActions(humidity, odor, pests, structure) {
    const actions = [];
    if (odor === "podrido") actions.push("Agregar material seco y mezclar.");
    else if (odor === "amoniaco") actions.push("Agregar hojas o cartón.");
    else if (odor === "fuerte") actions.push("Agregar material seco y mezclar la superficie.");
    if (humidity === "húmeda" || humidity === "saturada") actions.push("Agregar secos y proteger de la lluvia.");
    else if (humidity === "seca") actions.push("Agregar agua gradualmente.");
    if (pests === "muchas moscas") actions.push("Enterrar los residuos y cubrir con secos.");
    else if (pests === "hormigas") actions.push("Aumentar ligeramente la humedad.");
    else if (pests === "roedores" || pests === "cucarachas") actions.push("Retirar materiales problemáticos y asegurar la tapa.");
    if (structure === "compacta") actions.push("Mezclar y agregar material estructurante.");
    else if (structure === "con bloques grandes" || structure === "material demasiado grande") actions.push("Trocear mejor y revisar la humedad.");
    return actions;
  }

  function csvEscape(value) {
    let text = value == null ? "" : String(value);
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function buildWeeklyCsv(state, week, generatedAt = new Date().toISOString()) {
    const number = Math.max(1, Math.min(4, Number(week) || 1));
    const range = weekRange(state.config.inicio, number);
    const weekEntries = entriesForWeek(state, number);
    const sum = totals(weekEntries);
    const layers = layerSummary(sum.humedoL, sum.secoL);
    const review = state.revisiones[String(number)] || null;
    const header = [
      "tipo_registro", "hogar", "responsable", "personas", "semana", "inicio_semana", "fin_semana",
      "fecha", "humedo_l", "seco_l", "razon_seco_humedo", "tipo_residuo", "contaminantes",
      "humedad", "olor", "plagas", "estructura", "ocupado_pct", "accion", "resultado", "minutos",
      "foto_enviada", "notas", "generado_en"
    ];
    const common = [state.config.clave, state.config.responsable, state.config.personas, number, range.start, range.end];
    const rows = [];
    rows.push(["resumen", ...common, "", sum.humedoL.toFixed(1), sum.secoL.toFixed(1), layers.ratio.toFixed(2), "", "", "", "", "", "", review ? review.ocupadoPct : "", "", "", sum.minutos, "", "", generatedAt]);
    weekEntries.forEach((entry) => {
      rows.push(["diario", ...common, entry.fecha, entry.humedoL.toFixed(1), entry.secoL.toFixed(1), "", entry.tipo, entry.contaminantes ? "sí" : "no", "", "", "", "", "", "", "", entry.minutos, "", entry.notas, generatedAt]);
    });
    if (review) {
      rows.push(["semanal", ...common, "", "", "", "", "", "", review.humedad, review.olor, review.plagas, review.estructura, review.ocupadoPct, review.accion, review.resultado, review.minutos, review.foto ? "sí" : "no", "", generatedAt]);
    }
    return `\ufeff${[header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n")}\r\n`;
  }

  function weeklyFilename(state, week) {
    return `miltli_${state.config.clave}_semana-${Number(week)}_${todayISO()}.csv`;
  }

  const core = {
    addDays,
    buildWeeklyCsv,
    correctiveActions,
    defaultState,
    entriesForWeek,
    formatDate,
    layerSummary,
    normalizeState,
    todayISO,
    totals,
    weekForDate,
    weekRange,
    weeklyFilename
  };

  if (typeof module !== "undefined" && module.exports) module.exports = core;
  global.MiltliCore = core;

  if (!global.document || !global.localStorage) return;

  let state = loadState();
  let messageTimer = null;

  function $(selector) {
    return document.querySelector(selector);
  }

  function $all(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function loadState() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      return normalizeState(raw ? JSON.parse(raw) : null);
    } catch (error) {
      console.error("No se pudo leer el almacenamiento local", error);
      return defaultState();
    }
  }

  function saveState() {
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function showMessage(text, isError = false) {
    const box = $("#mensaje-global");
    box.textContent = text;
    box.classList.toggle("error", isError);
    box.hidden = false;
    global.clearTimeout(messageTimer);
    messageTimer = global.setTimeout(() => { box.hidden = true; }, 5000);
  }

  function setView(name) {
    const valid = ["panel", "registro", "revision", "entrega", "ajustes", "guia"];
    const view = valid.includes(name) ? name : "panel";
    $all("[data-view]").forEach((section) => { section.hidden = section.dataset.view !== view; });
    $all("[data-nav]").forEach((link) => {
      if (link.dataset.nav === view) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (global.location.hash !== `#${view}`) global.history.replaceState(null, "", `#${view}`);
    global.scrollTo({ top: 0, behavior: "auto" });
  }

  function currentPilotWeek() {
    return weekForDate(todayISO(), state.config.inicio);
  }

  function completedPendingWeeks() {
    const today = isoToUtc(todayISO());
    const pending = [];
    for (let week = 1; week <= 4; week += 1) {
      const range = weekRange(state.config.inicio, week);
      if (today >= isoToUtc(range.end) && !state.entregas[String(week)]) pending.push(week);
    }
    return pending;
  }

  function renderPanel() {
    const current = currentPilotWeek();
    const monthTotals = totals(state.entradas);
    const layers = layerSummary(monthTotals.humedoL, monthTotals.secoL);
    const latestReview = [4, 3, 2, 1].map((week) => state.revisiones[String(week)]).find(Boolean);
    const estimated = state.config.capacidadL > 0 ? ((monthTotals.humedoL + monthTotals.secoL) / state.config.capacidadL) * 100 : 0;
    const occupied = latestReview ? latestReview.ocupadoPct : estimated;

    $("#semana-etiqueta").textContent = current === 0 ? "Antes del arranque" : current > 4 ? "Piloto concluido" : `Semana ${current} de 4`;
    $("#panel-intro").textContent = `${state.config.clave}${state.config.responsable ? ` · ${state.config.responsable}` : ""}. Día 1: ${formatDate(state.config.inicio)}.`;
    $("#kpi-humedos").textContent = `${monthTotals.humedoL.toFixed(1)} L`;
    $("#kpi-secos").textContent = `${monthTotals.secoL.toFixed(1)} L`;
    $("#kpi-razon").textContent = `${layers.ratio.toFixed(1)} : 1`;
    $("#kpi-ocupacion").textContent = `${occupied.toFixed(0)} %`;

    $("#barra-humedo").style.flexGrow = String(layers.wet);
    $("#barra-seco").style.flexGrow = String(layers.dry);
    $("#barra-faltante").style.flexGrow = String(layers.missing);
    if (layers.wet === 0 && layers.dry === 0) {
      $("#capas-texto").textContent = "Todavía no hay cargas registradas.";
    } else if (layers.missing > 0) {
      $("#capas-texto").textContent = `Faltan ${layers.missing.toFixed(1)} L de material seco para alcanzar la proporción 2:1.`;
    } else {
      $("#capas-texto").textContent = `Proporción acumulada ${layers.ratio.toFixed(1)}:1. Cumple la regla común.`;
    }

    const pending = completedPendingWeeks();
    const alert = $("#aviso-entrega");
    if (pending.length) {
      alert.hidden = false;
      alert.innerHTML = `<h2>Entrega pendiente</h2><p>Falta confirmar el envío de ${pending.map((week) => `la semana ${week}`).join(", ")}.</p><p><a href="#entrega">Preparar entrega semanal</a></p>`;
    } else {
      alert.hidden = true;
      alert.innerHTML = "";
    }

    const body = $("#tabla-entradas");
    body.replaceChildren();
    const recent = [...state.entradas].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.creadoEn.localeCompare(a.creadoEn)).slice(0, 12);
    recent.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${formatDate(entry.fecha)}</td><td class="num">${weekForDate(entry.fecha, state.config.inicio)}</td><td class="num">${entry.humedoL.toFixed(1)} L</td><td class="num">${entry.secoL.toFixed(1)} L</td><td></td><td></td>`;
      row.children[4].textContent = `${entry.tipo || "—"}${entry.contaminantes ? " ⚠" : ""}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ligero";
      button.textContent = "Borrar";
      button.addEventListener("click", () => deleteEntry(entry.id));
      row.children[5].append(button);
      body.append(row);
    });
    $("#sin-entradas").hidden = recent.length > 0;
    $(".tabla-scroll").hidden = recent.length === 0;
  }

  function renderEntryRule() {
    const wet = finiteNumber($("#entrada-humedo").value);
    const dry = finiteNumber($("#entrada-seco").value);
    const date = $("#entrada-fecha").value;
    const week = weekForDate(date, state.config.inicio);
    const summary = layerSummary(wet, dry);
    const box = $("#regla-carga");
    box.className = "regla nota";
    if (week === 1) {
      box.textContent = "Semana 1: solo se mide. El material seco es opcional hasta que comience el compostaje.";
    } else if (week < 1 || week > 4) {
      box.textContent = "La fecha queda fuera de las cuatro semanas del piloto.";
      box.className = "regla alerta";
    } else if (wet <= 0) {
      box.textContent = "Anota el volumen de húmedos para calcular cuánto seco hace falta.";
    } else if (summary.missing > 0) {
      box.textContent = `Para ${wet.toFixed(1)} L de húmedos se necesitan ${(wet * 2).toFixed(1)} L de seco. Faltan ${summary.missing.toFixed(1)} L.`;
      box.className = "regla alerta";
    } else {
      box.textContent = `Proporción ${summary.ratio.toFixed(1)}:1. Cubre completamente los restos.`;
      box.className = "regla bien";
    }
  }

  function renderReviewSuggestions() {
    const actions = correctiveActions(
      $("#revision-humedad").value,
      $("#revision-olor").value,
      $("#revision-plagas").value,
      $("#revision-estructura").value
    );
    const box = $("#sugerencias");
    if (!actions.length) {
      box.innerHTML = "<h2>Acción sugerida</h2><p>Sin problemas que corregir. Mezcla completo, revisa con la prueba del puño y toma la fotografía.</p>";
    } else {
      box.innerHTML = `<h2>Acciones sugeridas</h2><ul>${actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul>`;
    }
  }

  function loadReviewForm() {
    const week = $("#revision-semana").value;
    const review = state.revisiones[String(week)];
    $("#revision-humedad").value = review ? review.humedad : "adecuada";
    $("#revision-olor").value = review ? review.olor : "ninguno";
    $("#revision-plagas").value = review ? review.plagas : "ninguno";
    $("#revision-estructura").value = review ? review.estructura : "suelta y aireada";
    $("#revision-ocupado").value = review ? review.ocupadoPct : 0;
    $("#revision-minutos").value = review ? review.minutos : 0;
    $("#revision-accion").value = review ? review.accion : "";
    $("#revision-resultado").value = review ? review.resultado : "";
    $("#revision-foto").checked = review ? review.foto : false;
    renderReviewSuggestions();
  }

  function renderDelivery() {
    const week = Number($("#entrega-semana").value);
    const range = weekRange(state.config.inicio, week);
    const entries = entriesForWeek(state, week);
    const review = state.revisiones[String(week)];
    const delivery = state.entregas[String(week)];
    $("#entrega-periodo").textContent = `${formatDate(range.start)} – ${formatDate(range.end)}`;
    $("#entrega-registros").textContent = String(entries.length);
    $("#entrega-revision").textContent = review ? "Guardada" : "Pendiente";
    $("#entrega-estado").textContent = delivery ? "Enviado" : "Pendiente";
    $("#entrega-confirmacion").textContent = delivery ? `Marcado el ${new Date(delivery.enviadoEn).toLocaleString("es-MX")} (${delivery.metodo}).` : "Sin confirmación.";
    $("#btn-desmarcar").disabled = !delivery;
  }

  function renderConfig() {
    const config = state.config;
    $("#config-clave").value = config.clave;
    $("#config-responsable").value = config.responsable;
    $("#config-personas").value = config.personas;
    $("#config-capacidad").value = config.capacidadL;
    $("#config-inicio").value = config.inicio;
    $("#config-coordinador").value = config.coordinadorNombre;
    $("#config-email").value = config.coordinadorEmail;
  }

  function renderAll() {
    renderPanel();
    renderDelivery();
    renderConfig();
  }

  function deleteEntry(id) {
    if (!global.confirm("¿Borrar este registro?")) return;
    state.entradas = state.entradas.filter((entry) => entry.id !== id);
    saveState();
    renderAll();
    showMessage("Registro borrado.");
  }

  function downloadText(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    global.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function selectedWeek() {
    return Number($("#entrega-semana").value);
  }

  function downloadWeek(week = selectedWeek()) {
    downloadText(weeklyFilename(state, week), buildWeeklyCsv(state, week), "text/csv;charset=utf-8");
    showMessage(`CSV de la semana ${week} descargado.`);
  }

  async function shareWeek() {
    const week = selectedWeek();
    const filename = weeklyFilename(state, week);
    const file = new File([buildWeeklyCsv(state, week)], filename, { type: "text/csv;charset=utf-8" });
    const shareData = {
      title: `Miltli · ${state.config.clave} · semana ${week}`,
      text: `Registros de ${state.config.clave}, semana ${week}.`,
      files: [file]
    };
    if (!navigator.share || !navigator.canShare || !navigator.canShare({ files: [file] })) {
      downloadWeek(week);
      showMessage("Este navegador no comparte archivos directamente. El CSV quedó descargado; adjúntalo al mensaje.", true);
      return;
    }
    try {
      await navigator.share(shareData);
      state.entregas[String(week)] = { enviadoEn: new Date().toISOString(), metodo: "compartir" };
      saveState();
      renderAll();
      showMessage(`Semana ${week} compartida y marcada como enviada.`);
    } catch (error) {
      if (error && error.name !== "AbortError") showMessage("No se pudo abrir el menú para compartir.", true);
    }
  }

  function openEmail() {
    const week = selectedWeek();
    const email = state.config.coordinadorEmail;
    if (!email) {
      showMessage("Guarda el correo del coordinador en Ajustes.", true);
      setView("ajustes");
      return;
    }
    downloadWeek(week);
    const filename = weeklyFilename(state, week);
    const subject = encodeURIComponent(`Miltli · ${state.config.clave} · semana ${week}`);
    const body = encodeURIComponent(`Hola${state.config.coordinadorNombre ? ` ${state.config.coordinadorNombre}` : ""},\n\nAdjunto el archivo ${filename} con los registros de la semana ${week} del hogar ${state.config.clave}.\n\nResponsable: ${state.config.responsable || "sin nombre"}.\n`);
    global.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
  }

  function markDelivery() {
    const week = selectedWeek();
    state.entregas[String(week)] = { enviadoEn: new Date().toISOString(), metodo: "confirmación manual" };
    saveState();
    renderAll();
    showMessage(`Semana ${week} marcada como enviada.`);
  }

  function unmarkDelivery() {
    const week = selectedWeek();
    delete state.entregas[String(week)];
    saveState();
    renderAll();
    showMessage(`Se retiró la confirmación de la semana ${week}.`);
  }

  function downloadBackup() {
    const payload = { exportedAt: new Date().toISOString(), application: "Miltli GitHub Pages", data: state };
    downloadText(`miltli_respaldo_${state.config.clave}_${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    showMessage("Respaldo completo descargado.");
  }

  async function restoreBackup(file) {
    try {
      const parsed = JSON.parse(await file.text());
      state = normalizeState(parsed.data || parsed);
      saveState();
      renderAll();
      loadReviewForm();
      showMessage("Respaldo restaurado.");
    } catch (error) {
      console.error(error);
      showMessage("El archivo no es un respaldo válido de Miltli.", true);
    } finally {
      $("#archivo-restaurar").value = "";
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character]));
  }

  function bindEvents() {
    global.addEventListener("hashchange", () => setView(global.location.hash.slice(1)));
    $all("[data-nav]").forEach((link) => link.addEventListener("click", () => setView(link.dataset.nav)));

    ["#entrada-humedo", "#entrada-seco", "#entrada-fecha"].forEach((selector) => $(selector).addEventListener("input", renderEntryRule));
    $("#form-entrada").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const entry = normalizeEntry({
        id: makeId(),
        fecha: form.get("fecha"),
        humedoL: form.get("humedoL"),
        secoL: form.get("secoL"),
        tipo: form.get("tipo"),
        contaminantes: form.get("contaminantes") === "on",
        minutos: form.get("minutos"),
        notas: form.get("notas"),
        creadoEn: new Date().toISOString()
      });
      const week = entry ? weekForDate(entry.fecha, state.config.inicio) : 0;
      if (!entry || week < 1 || week > 4) {
        showMessage("La fecha debe pertenecer a una de las cuatro semanas del piloto.", true);
        return;
      }
      if (entry.humedoL <= 0 && entry.secoL <= 0) {
        showMessage("La carga no puede quedar en cero.", true);
        return;
      }
      state.entradas.push(entry);
      saveState();
      event.currentTarget.reset();
      $("#entrada-fecha").value = todayISO();
      $("#entrada-humedo").value = 0;
      $("#entrada-seco").value = 0;
      $("#entrada-minutos").value = 0;
      renderEntryRule();
      renderAll();
      setView("panel");
      showMessage("Carga guardada.");
    });

    $("#revision-semana").addEventListener("change", loadReviewForm);
    ["#revision-humedad", "#revision-olor", "#revision-plagas", "#revision-estructura"].forEach((selector) => $(selector).addEventListener("change", renderReviewSuggestions));
    $("#form-revision").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const week = Number(form.get("semana"));
      state.revisiones[String(week)] = {
        semana: week,
        humedad: String(form.get("humedad")),
        olor: String(form.get("olor")),
        plagas: String(form.get("plagas")),
        estructura: String(form.get("estructura")),
        ocupadoPct: Math.max(0, finiteNumber(form.get("ocupadoPct"))),
        accion: String(form.get("accion") || "").trim(),
        resultado: String(form.get("resultado") || "").trim(),
        minutos: Math.max(0, Math.round(finiteNumber(form.get("minutos")))),
        foto: form.get("foto") === "on",
        guardadoEn: new Date().toISOString()
      };
      saveState();
      renderAll();
      showMessage(`Revisión de la semana ${week} guardada.`);
    });

    $("#entrega-semana").addEventListener("change", renderDelivery);
    $("#btn-descargar").addEventListener("click", () => downloadWeek());
    $("#btn-compartir").addEventListener("click", shareWeek);
    $("#btn-correo").addEventListener("click", openEmail);
    $("#btn-marcar").addEventListener("click", markDelivery);
    $("#btn-desmarcar").addEventListener("click", unmarkDelivery);

    $("#form-config").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      state.config = normalizeState({ config: Object.fromEntries(form.entries()) }).config;
      saveState();
      renderAll();
      renderEntryRule();
      showMessage("Ajustes guardados.");
    });

    $("#btn-respaldo").addEventListener("click", downloadBackup);
    $("#archivo-restaurar").addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) restoreBackup(file);
    });
    $("#btn-borrar-todo").addEventListener("click", () => {
      if (!global.confirm("Se borrarán ajustes, registros, revisiones y confirmaciones. ¿Continuar?")) return;
      state = defaultState();
      saveState();
      renderAll();
      loadReviewForm();
      $("#entrada-fecha").value = todayISO();
      renderEntryRule();
      showMessage("Todos los datos locales fueron borrados.");
    });
  }

  function initialize() {
    $("#entrada-fecha").value = todayISO();
    const current = currentPilotWeek();
    const selected = Math.max(1, Math.min(4, current || 1));
    $("#revision-semana").value = String(selected);
    $("#entrega-semana").value = String(selected);
    bindEvents();
    loadReviewForm();
    renderEntryRule();
    renderAll();
    setView(global.location.hash.slice(1) || "panel");
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("Service worker", error));
  }

  document.addEventListener("DOMContentLoaded", initialize);
}(typeof window !== "undefined" ? window : globalThis));
