// Pantallas de la captura del coordinador. Todas se construyen desde datos.js y vocabulario.json:
// aquí no se escribe a mano ninguna categoría del diccionario. Ningún campo trae valor por omisión;
// lo guardado se vuelca a los controles por propiedad, después de pintar.
(function () {
  "use strict";

  const L = window.MiltliLogica;
  const D = window.MiltliDatos;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mayus = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  const VISTAS = [
    { id: "h1", titulo: "Hoja 1 · Arranque", nota: "Se transcribe una vez, del papel del día 1." },
    { id: "h2", titulo: "Hoja 2 · Registro diario", nota: "Un renglón por día. Renglón vacío = no anotó (NR); 0 = no agregó nada. Cantidades en botes: 0, 1, ½, 1½. Si el papel trae otra cosa, escríbela tal cual: se guarda como ND con el texto original." },
    { id: "h3", titulo: "Hoja 3 · Renglón semanal", nota: "Una columna por semana. Columna vacía = NR; casilla vacía dentro de una semana con datos = NC. Se captura lo que dice el papel, aunque sea inconsistente: la app lo marca, no lo corrige." },
    { id: "h4", titulo: "Hoja 4 · Día 28", nota: "Revisión de estado y cierre. Una sección sin marcas se exporta como ND." },
    { id: "t1", titulo: "Registro técnico · día 1", nota: "Del registro del equipo. Quién del equipo: una clave (E1, E2…), nunca un nombre." },
    { id: "t28", titulo: "Registro técnico · día 28", nota: "Del registro del equipo. No se describe el contenido de lo que se pesa." },
    { id: "ver", titulo: "Verificación de instrumentos", nota: "Una fila por instrumento y por día de medición. Vale para los cinco hogares." },
    { id: "exportar", titulo: "Exportar y respaldar" }
  ];
  const RAIZ_DE = { h1: "alta", h4: "dia28", t1: "tecnico.dia1", t28: "tecnico.cierre" };

  let vocabulario = {};
  let estado = L.estadoInicial(D);
  let hogar = D.hogares[0];
  let vista = "h1";

  // ---------- estado ----------

  function cargar() {
    try { estado = L.normalizar(JSON.parse(localStorage.getItem(L.CLAVE)), D); } catch (e) { estado = L.estadoInicial(D); }
  }

  function guardar() {
    try { localStorage.setItem(L.CLAVE, JSON.stringify(estado)); } catch (e) { avisar("No se pudo guardar en este navegador.", true); }
  }

  function nodo(ruta, crear) {
    const partes = ruta.split(".");
    let actual = partes[0] === "ver" ? estado.verificacion : estado.hogares[hogar];
    const inicio = partes[0] === "ver" ? 1 : 0;
    for (let i = inicio; i < partes.length - 1; i += 1) {
      if (actual[partes[i]] == null) { if (!crear) return [null, null]; actual[partes[i]] = {}; }
      actual = actual[partes[i]];
    }
    return [actual, partes[partes.length - 1]];
  }
  const leer = (ruta) => { const [o, k] = nodo(ruta, false); return o ? o[k] : undefined; };
  const escribir = (ruta, valor) => { const [o, k] = nodo(ruta, true); if (L.vacio(valor)) delete o[k]; else o[k] = valor; };

  // ---------- piezas ----------

  const items = (campo) => vocabulario[campo.vocabulario] || [];
  const rotulo = (item) => esc(mayus(item.etiqueta || item.valor.replace(/_/g, " ")));

  function selectorAusencia(campo, ruta) {
    if (!campo.ausencias.length) return "";
    return `<select class="ausencia" data-ruta="${ruta}" data-ausencia aria-label="Ausencia en ${esc(campo.etiqueta)}"><option>—</option>${campo.ausencias.map((a) => `<option>${a}</option>`).join("")}</select>`;
  }

  function casillas(campo, ruta) {
    return items(campo).map((item) => `<label class="marca"><input type="checkbox" data-ruta="${ruta}" data-valor="${esc(item.valor)}"> ${rotulo(item)}</label>`).join("");
  }

  function especiales(campo, ruta) {
    if (!campo.especiales) return "";
    return (vocabulario[campo.especiales] || []).map((item) => `<label class="marca"><input type="checkbox" data-ruta="${ruta}" data-especial="${esc(item.valor)}"> ${esc(mayus(item.valor.replace(/_/g, " ")))}</label>`).join("");
  }

  function campoHTML(campo, ruta) {
    const pista = `<small>${esc(campo.codigo)} · ${esc(campo.quien)}</small>`;
    if (L.esMarcable(campo)) {
      return `<fieldset class="pregunta"><legend>${esc(campo.etiqueta)} ${pista}</legend><div class="opciones">${casillas(campo, ruta)}</div>${selectorAusencia(campo, ruta)}</fieldset>`;
    }
    const id = `c-${ruta.replace(/\./g, "-")}`;
    return `<p class="pregunta"><label for="${id}">${esc(campo.etiqueta)} ${pista}</label><span class="linea"><input type="text" id="${id}" data-ruta="${ruta}" autocomplete="off">${especiales(campo, ruta)}${selectorAusencia(campo, ruta)}</span></p>`;
  }

  const formulario = (campos, raiz) => `<form class="captura" autocomplete="off">${campos.map((c) => campoHTML(c, `${raiz}.${c.codigo}`)).join("")}</form>`;

  function hojaDiaria() {
    const campos = L.capturables(D, ["h2"]);
    const filas = L.DIAS.map((d) => `<tr${d % 7 === 0 ? ' class="fin-semana"' : ""}><th scope="row">${d}</th>${campos.map((c) => `<td><input type="text" data-ruta="diario.${d}.${c.codigo}" aria-label="${esc(c.etiqueta)}, día ${d}" autocomplete="off"></td>`).join("")}</tr>`).join("");
    return `<div class="tabla-scroll" tabindex="0" role="region" aria-label="Registro diario"><table class="rejilla diaria"><thead><tr><th scope="col">Día</th>${campos.map((c) => `<th scope="col">${esc(c.etiqueta)}</th>`).join("")}</tr></thead><tbody>${filas}</tbody></table></div>`;
  }

  function hojaSemanal() {
    const todos = L.capturables(D, ["h3"]);
    const semanales = todos.filter((c) => c.cuando !== "una vez");
    const cabeza = `<tr><th scope="col">Casilla</th>${L.SEMANAS.map((s) => `<th scope="col">S${s}</th>`).join("")}</tr>`;
    const filas = semanales.map((c) => {
      if (!L.esMarcable(c)) return `<tr><th scope="row">${esc(c.etiqueta)}</th>${L.SEMANAS.map((s) => `<td><input type="text" data-ruta="semanal.${s}.${c.codigo}" aria-label="${esc(c.etiqueta)}, semana ${s}" autocomplete="off"></td>`).join("")}</tr>`;
      const grupo = `<tr class="grupo"><th scope="colgroup" colspan="5">${esc(c.etiqueta)}</th></tr>`;
      return grupo + items(c).map((item) => `<tr><th scope="row" class="sub">${rotulo(item)}</th>${L.SEMANAS.map((s) => `<td class="centro"><input type="checkbox" data-ruta="semanal.${s}.${c.codigo}" data-valor="${esc(item.valor)}" aria-label="${rotulo(item)}, semana ${s}"></td>`).join("")}</tr>`).join("");
    }).join("");
    const control = ["recibida", "transcrita"].map((b) => `<tr><th scope="row" class="sub">Foto ${b}</th>${L.SEMANAS.map((s) => `<td class="centro"><input type="checkbox" data-ruta="transcripcion.${s}.${b}" data-bandera aria-label="Foto ${b}, semana ${s}"></td>`).join("")}</tr>`).join("");
    return `<div class="tabla-scroll" tabindex="0" role="region" aria-label="Renglón semanal"><table class="rejilla semanal"><thead>${cabeza}</thead><tbody>${filas}<tr class="grupo"><th scope="colgroup" colspan="5">Control de la transcripción (no se exporta)</th></tr>${control}</tbody></table></div>${formulario(todos.filter((c) => c.cuando === "una vez"), "unico")}`;
  }

  function hojaVerificacion() {
    const campos = L.capturables(D, ["ver"]);
    const filas = estado.verificacion.map((_, i) => `<tr>${campos.map((c) => `<td>${L.esMarcable(c) ? casillas(c, `ver.${i}.${c.codigo}`) : `<input type="text" data-ruta="ver.${i}.${c.codigo}" aria-label="${esc(c.etiqueta)}, fila ${i + 1}" autocomplete="off">`}</td>`).join("")}</tr>`).join("");
    return `<div class="tabla-scroll" tabindex="0" role="region" aria-label="Verificación de instrumentos"><table class="rejilla"><thead><tr>${campos.map((c) => `<th scope="col">${esc(c.etiqueta)}</th>`).join("")}</tr></thead><tbody>${filas || `<tr><td colspan="${campos.length}" class="vacio">Sin filas todavía.</td></tr>`}</tbody></table></div><p><button type="button" id="ver-agregar" class="secundario">Agregar fila</button></p>`;
  }

  // ---------- pintar ----------

  function hidratar() {
    for (const el of $$("#captura [data-ruta]")) {
      const valor = leer(el.dataset.ruta);
      const ausente = L.esAusencia(valor);
      if (el.dataset.ausencia !== undefined) el.value = ausente ? valor : "—";
      else if (el.dataset.bandera !== undefined) el.checked = valor === true;
      else if (el.dataset.especial) el.checked = valor === el.dataset.especial;
      else if (el.dataset.valor) { el.checked = Array.isArray(valor) && valor.includes(el.dataset.valor); el.disabled = ausente && Boolean(el.closest("fieldset")); }
      else {
        const especial = $$(`#captura [data-especial]`).some((e) => e.dataset.ruta === el.dataset.ruta && e.dataset.especial === valor);
        el.value = valor == null || especial || (ausente && el.closest(".pregunta")) ? "" : valor;
        el.disabled = Boolean(el.closest(".pregunta")) && (ausente || especial);
      }
    }
  }

  function pintarAvisos() {
    const lista = L.marcas(estado.hogares[hogar], D, vocabulario);
    $("#avisos-lista").innerHTML = lista.length
      ? lista.map((a) => `<li><strong>${a.regla}</strong> · ${a.codigo}${a.sem ? ` · semana ${a.sem}` : ""}${a.dia ? ` · día ${a.dia}` : ""}</li>`).join("")
      : '<li class="vacio">Sin avisos en este hogar.</li>';
    $("#avisos-cuenta").textContent = String(lista.length);
  }

  function pintar() {
    const v = VISTAS.find((x) => x.id === vista) || VISTAS[0];
    vista = v.id;
    for (const a of $$("#vistas a")) a.toggleAttribute("aria-current", a.hash === `#${vista}`), a.hasAttribute("aria-current") && a.setAttribute("aria-current", "page");
    const exportar = vista === "exportar";
    $("#exportar").hidden = !exportar;
    $("#captura").hidden = exportar;
    $("#avisos").hidden = exportar || vista === "ver";
    $("#hogar-caja").hidden = exportar || vista === "ver";
    if (exportar) { $("#anterior").hidden = !localStorage.getItem(L.CLAVE_ANTERIOR); return; }
    let cuerpo;
    if (vista === "h2") cuerpo = hojaDiaria();
    else if (vista === "h3") cuerpo = hojaSemanal();
    else if (vista === "ver") cuerpo = hojaVerificacion();
    else cuerpo = formulario(L.capturables(D, vista === "t1" || vista === "t28" ? ["vis", vista] : [vista]), RAIZ_DE[vista]);
    $("#captura").innerHTML = `<h2>${esc(v.titulo)}${vista === "ver" ? "" : ` · <span class="clave">${hogar}</span>`}</h2><p class="entrada">${esc(v.nota)}</p>${cuerpo}`;
    hidratar();
    pintarAvisos();
  }

  function avisar(texto, error) {
    const m = $("#mensaje");
    m.textContent = texto;
    m.classList.toggle("error", Boolean(error));
    m.hidden = false;
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => { m.hidden = true; }, 4500);
  }

  // ---------- eventos ----------

  function alCambiar(evento) {
    const el = evento.target;
    if (!el.dataset || !el.dataset.ruta) return;
    const ruta = el.dataset.ruta;
    let repintar = false;
    if (el.dataset.ausencia !== undefined) { escribir(ruta, el.value === "—" ? "" : el.value); repintar = true; }
    else if (el.dataset.bandera !== undefined) escribir(ruta, el.checked ? true : "");
    else if (el.dataset.especial) { escribir(ruta, el.checked ? el.dataset.especial : ""); repintar = true; }
    else if (el.dataset.valor) {
      const previo = leer(ruta);
      const lista = Array.isArray(previo) ? previo.filter((x) => x !== el.dataset.valor) : [];
      if (el.checked) lista.push(el.dataset.valor);
      escribir(ruta, lista);
    } else escribir(ruta, el.value);
    guardar();
    if (repintar) hidratar();
    pintarAvisos();
  }

  function descargar(nombre, contenido, tipo) {
    const url = URL.createObjectURL(new Blob([contenido], { type: tipo }));
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const hoy = () => new Date().toISOString().slice(0, 10);

  function enlazar() {
    $("#captura").addEventListener("input", (e) => { if (e.target.type === "text") alCambiar(e); });
    $("#captura").addEventListener("change", (e) => { if (e.target.type !== "text") alCambiar(e); });
    $("#captura").addEventListener("submit", (e) => e.preventDefault());
    $("#captura").addEventListener("click", (e) => {
      if (e.target.id !== "ver-agregar") return;
      estado.verificacion.push({});
      guardar();
      pintar();
    });
    $("#hogar").addEventListener("change", (e) => { hogar = e.target.value; pintar(); });
    window.addEventListener("hashchange", () => { vista = location.hash.slice(1) || "h1"; pintar(); });

    $("#csv-largo").addEventListener("click", () => descargar(`miltli_${hoy()}_largo.csv`, L.csvLargo(estado, D, vocabulario, { interno: $("#interno").checked }), "text/csv;charset=utf-8"));
    $("#csv-ancho").addEventListener("click", () => descargar(`miltli_${hoy()}_ancho.csv`, L.csvAncho(estado, D, vocabulario), "text/csv;charset=utf-8"));
    $("#respaldo").addEventListener("click", () => {
      const texto = "Este archivo contiene la captura de los cinco hogares con su clave. No lleva nombres ni domicilios, pero dentro del grupo es reidentificable. Guárdalo sólo donde vivan los datos del piloto; no lo mandes por chat.";
      if (window.confirm(texto)) descargar(`miltli_${hoy()}_respaldo.json`, JSON.stringify(estado, null, 1), "application/json");
    });
    $("#restaurar").addEventListener("change", async (e) => {
      const archivo = e.target.files[0];
      if (!archivo) return;
      try {
        const candidato = JSON.parse(await archivo.text());
        if (candidato.version !== 2) throw new Error("versión");
        if (!window.confirm("Restaurar sustituye toda la captura de este dispositivo por la del archivo.")) return;
        estado = L.normalizar(candidato, D);
        guardar();
        avisar("Respaldo restaurado.");
      } catch (err) { avisar("El archivo no es un respaldo de esta versión de la captura.", true); }
      e.target.value = "";
    });
    $("#borrar").addEventListener("click", () => {
      if (!window.confirm("Se borra toda la captura de este dispositivo. No se puede deshacer. ¿Ya descargaste el respaldo?")) return;
      estado = L.estadoInicial(D);
      guardar();
      avisar("Captura borrada.");
    });
    $("#anterior-csv").addEventListener("click", () => {
      try { descargar(`miltli_${hoy()}_serie-anterior.csv`, L.csv(L.serieAnterior(JSON.parse(localStorage.getItem(L.CLAVE_ANTERIOR)))), "text/csv;charset=utf-8"); } catch (err) { avisar("No se pudo leer la serie anterior.", true); }
    });
    $("#anterior-borrar").addEventListener("click", () => {
      if (!window.confirm("Se borra del dispositivo el registro de la versión anterior de la app.")) return;
      localStorage.removeItem(L.CLAVE_ANTERIOR);
      pintar();
    });
  }

  async function iniciar() {
    $("#hogar").innerHTML = D.hogares.map((h) => `<option>${h}</option>`).join("");
    $("#vistas").innerHTML = VISTAS.map((v) => `<a href="#${v.id}">${esc(v.titulo.split(" · ")[0] === "Registro técnico" ? "Técnico " + v.titulo.split(" · ")[1] : v.titulo.split(" · ")[0])}</a>`).join("");
    $("#version").textContent = `Diccionario ${D.diccionario} · F-HOG rev. ${D.ficha_rev} · reglas evaluadas: ${L.REGLAS_EVALUADAS.join(", ")}`;
    try { vocabulario = await (await fetch("./vocabulario.json")).json(); } catch (e) { avisar("No se pudo cargar el vocabulario.", true); return; }
    cargar();
    hogar = $("#hogar").value;
    vista = location.hash.slice(1) || "h1";
    enlazar();
    pintar();
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  document.addEventListener("DOMContentLoaded", iniciar);
}());
