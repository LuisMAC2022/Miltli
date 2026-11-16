// Pantallas de la captura del coordinador: hogares (F-HOG) y cafeterías (F-CAF), cada ficha con su
// modelo (acta-02, CAF-08). Todas se construyen desde los datos y vocabularios generados de los
// diccionarios: aquí no se escribe a mano ninguna categoría. Ningún campo trae valor por omisión; lo
// guardado se vuelca a los controles por propiedad, después de pintar.
(function () {
  "use strict";

  const L = window.MiltliLogica;
  const LC = window.MiltliLogicaCaf;
  const D = window.MiltliDatos;
  const DC = window.MiltliDatosCaf;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mayus = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  const VISTAS = {
    hog: [
      { id: "h1", corto: "Hoja 1", titulo: "Hoja 1 · Arranque", nota: "Se transcribe una vez, del papel del día 1." },
      { id: "h2", corto: "Hoja 2", titulo: "Hoja 2 · Registro diario", nota: "Un renglón por día. Renglón vacío = no anotó (NR); 0 = no agregó nada. Cantidades en botes: 0, 1, ½, 1½. Si el papel trae otra cosa, escríbela tal cual: se guarda como ND con el texto original." },
      { id: "h3", corto: "Hoja 3", titulo: "Hoja 3 · Renglón semanal", nota: "Una columna por semana. Columna vacía = NR; casilla vacía dentro de una semana con datos = NC. Se captura lo que dice el papel, aunque sea inconsistente: la app lo marca, no lo corrige." },
      { id: "h4", corto: "Hoja 4", titulo: "Hoja 4 · Día 28", nota: "Revisión de estado y cierre. Una sección sin marcas se exporta como ND." },
      { id: "t1", corto: "Técnico día 1", titulo: "Registro técnico · día 1", nota: "Del registro del equipo. Quién del equipo: una clave (E1, E2…), nunca un nombre." },
      { id: "t28", corto: "Técnico día 28", titulo: "Registro técnico · día 28", nota: "Del registro del equipo. No se describe el contenido de lo que se pesa." },
      { id: "ver", corto: "Verificación", titulo: "Verificación de instrumentos", nota: "Una fila por instrumento y por día de medición. Vale para los cinco hogares." }
    ],
    caf: [
      { id: "c1", corto: "Hoja 1", titulo: "Hoja 1 · Antes de empezar", nota: "La llenan el programa y la gerencia antes del día 1. Mientras falte una de las ocho condiciones, no se separa nada. El destino va con su clave, nunca con un nombre ni una dirección." },
      { id: "c2", corto: "Hoja 2", titulo: "Hoja 2 · Arranque", nota: "Se transcribe una vez, del papel del día 1. La capacidad de cada recipiente la mide el equipo." },
      { id: "c3b", corto: "Hoja 3 · previa", titulo: "Hoja 3 · Semana de medición previa", nota: "Siete días en que sólo se mide: lo separado sigue su camino de siempre y no hay salidas. Se captura el total del día, no las rayas." },
      { id: "c3", corto: "Hoja 3 · piloto", titulo: "Hoja 3 · Registro por día", nota: "Un renglón por día. 0 = se abrió y no se separó nada; renglón vacío = no se anotó (NR); «Cerrado» = no hubo operación. Recipientes en enteros y medios; kilos con decimales sólo si la cafetería cuenta en kilos." },
      { id: "c4", corto: "Hoja 4", titulo: "Hoja 4 · Entregas", nota: "Una salida por cada vez que lo guardado sale de la cafetería. Una salida sin llenar no es un dato. Si quien recibe contó distinto de quien entrega, se capturan los dos números." },
      { id: "c5", corto: "Hoja 5", titulo: "Hoja 5 · Renglón semanal", nota: "Una columna por semana. Columna vacía = NR; casilla vacía dentro de una semana con datos = NC. Se captura lo que dice el papel: la app lo marca, no lo corrige." },
      { id: "c6", corto: "Hoja 6", titulo: "Hoja 6 · Cierre", nota: "Se llena sólo el día de cierre." }
    ]
  };
  const EXPORTAR = { id: "exportar", corto: "Exportar", titulo: "Exportar y respaldar" };
  const FORMULARIOS = { h1: [["h1"], "alta"], h4: [["h4"], "dia28"], t1: [["vis", "t1"], "tecnico.dia1"], t28: [["vis", "t28"], "tecnico.cierre"], c1: [["c1"], "antes"], c2: [["c2"], "arranque"], c6: [["c6"], "cierre"] };
  const ROTULOS = {
    hog: { unidad: "Hogar que se transcribe", sin: "Sin avisos en este hogar.", pie: "El número es la regla del diccionario v0.3 §8 y viaja en la columna «marcas» del CSV." },
    caf: { unidad: "Cafetería que se transcribe", sin: "Sin avisos en esta cafetería.", pie: "El número es la regla del diccionario de cafeterías §8 y viaja en la columna «marcas» del CSV." }
  };

  const vocabularios = { hog: {}, caf: {} };
  let estado = L.estadoInicial(D);
  let estadoCaf = LC.estadoInicial();
  const unidad = { hog: D.hogares[0], caf: "" };
  let ficha = "hog";
  let vista = "h1";

  // ---------- estado ----------

  function cargar() {
    try { estado = L.normalizar(JSON.parse(localStorage.getItem(L.CLAVE)), D); } catch (e) { estado = L.estadoInicial(D); }
    try { estadoCaf = LC.normalizar(JSON.parse(localStorage.getItem(LC.CLAVE)), DC); } catch (e) { estadoCaf = LC.estadoInicial(); }
  }

  function guardar() {
    try {
      localStorage.setItem(L.CLAVE, JSON.stringify(estado));
      localStorage.setItem(LC.CLAVE, JSON.stringify(estadoCaf));
    } catch (e) { avisar("No se pudo guardar en este navegador.", true); }
  }

  const actual = () => (ficha === "caf" ? estadoCaf.cafeterias[unidad.caf] : estado.hogares[unidad.hog]);
  const campos = (pantallas) => (ficha === "caf" ? pantallas.flatMap((p) => LC.capturables(DC, p)) : L.capturables(D, pantallas));

  function nodo(ruta, crear) {
    const partes = ruta.split(".");
    let o = partes[0] === "ver" ? estado.verificacion : actual();
    const inicio = partes[0] === "ver" ? 1 : 0;
    for (let i = inicio; i < partes.length - 1; i += 1) {
      if (o[partes[i]] == null) { if (!crear) return [null, null]; o[partes[i]] = {}; }
      o = o[partes[i]];
    }
    return [o, partes[partes.length - 1]];
  }
  const leer = (ruta) => { const [o, k] = nodo(ruta, false); return o ? o[k] : undefined; };
  const escribir = (ruta, valor) => { const [o, k] = nodo(ruta, true); if (L.vacio(valor)) delete o[k]; else o[k] = valor; };

  // ---------- piezas ----------

  const items = (campo) => vocabularios[ficha][campo.vocabulario] || [];
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
    return (vocabularios[ficha][campo.especiales] || []).map((item) => `<label class="marca"><input type="checkbox" data-ruta="${ruta}" data-especial="${esc(item.valor)}"> ${esc(mayus(item.valor.replace(/_/g, " ")))}</label>`).join("");
  }

  function campoHTML(campo, ruta) {
    const pista = `<small>${esc(campo.codigo)} · ${esc(campo.quien.replace(/\*/g, ""))}</small>`;
    if (L.esMarcable(campo)) {
      return `<fieldset class="pregunta"><legend>${esc(campo.etiqueta)} ${pista}</legend><div class="opciones">${casillas(campo, ruta)}</div>${selectorAusencia(campo, ruta)}</fieldset>`;
    }
    const id = `c-${ruta.replace(/\./g, "-")}`;
    return `<p class="pregunta"><label for="${id}">${esc(campo.etiqueta)} ${pista}</label><span class="linea"><input type="text" id="${id}" data-ruta="${ruta}" autocomplete="off">${especiales(campo, ruta)}${selectorAusencia(campo, ruta)}</span></p>`;
  }

  const formulario = (lista, raiz) => `<form class="captura" autocomplete="off">${lista.map((c) => campoHTML(c, `${raiz}.${c.codigo}`)).join("")}</form>`;

  // En cafeterías, la columna de una corriente que el destino no aceptó va tachada en el papel.
  const tachada = (campo) => ficha === "caf" && campo.corriente && !LC.aceptada(actual(), campo.corriente);
  const cabeza = (campo) => `<th scope="col">${esc(campo.etiqueta)}${campo.corriente ? ` · ${esc(campo.corriente)}` : ""}${tachada(campo) ? " <small>(no aceptada)</small>" : ""}</th>`;

  // Rejilla de un renglón por día: una columna por casilla; las de marcar, como casilla de verificación.
  function hojaDiaria(lista, dias, raiz, nombre) {
    const celda = (c, d) => (L.esMarcable(c)
      ? `<td class="centro">${items(c).map((item) => `<input type="checkbox" data-ruta="${raiz}.${d}.${c.codigo}" data-valor="${esc(item.valor)}" aria-label="${esc(c.etiqueta)}, día ${d}">`).join("")}</td>`
      : `<td><input type="text" data-ruta="${raiz}.${d}.${c.codigo}" aria-label="${esc(c.etiqueta)}${c.corriente ? ` ${esc(c.corriente)}` : ""}, día ${d}" autocomplete="off"></td>`);
    const filas = dias.map((d) => `<tr${d % 7 === 0 ? ' class="fin-semana"' : ""}><th scope="row">${d}</th>${lista.map((c) => celda(c, d)).join("")}</tr>`).join("");
    return `<div class="tabla-scroll" tabindex="0" role="region" aria-label="${nombre}"><table class="rejilla diaria"><thead><tr><th scope="col">Día</th>${lista.map(cabeza).join("")}</tr></thead><tbody>${filas}</tbody></table></div>`;
  }

  // Rejilla de una columna por semana, con el control de transcripción del coordinador al pie.
  function hojaSemanal(semanales, unicos) {
    const titulos = `<tr><th scope="col">Casilla</th>${L.SEMANAS.map((s) => `<th scope="col">S${s}</th>`).join("")}</tr>`;
    const filas = semanales.map((c) => {
      const nombre = `${esc(c.etiqueta)}${c.corriente ? ` · ${esc(c.corriente)}` : ""}${tachada(c) ? " <small>(no aceptada)</small>" : ""}`;
      if (!L.esMarcable(c)) return `<tr><th scope="row">${nombre}</th>${L.SEMANAS.map((s) => `<td><input type="text" data-ruta="semanal.${s}.${c.codigo}" aria-label="${esc(c.etiqueta)}, semana ${s}" autocomplete="off"></td>`).join("")}</tr>`;
      const grupo = `<tr class="grupo"><th scope="colgroup" colspan="5">${nombre}</th></tr>`;
      return grupo + items(c).map((item) => `<tr><th scope="row" class="sub">${rotulo(item)}</th>${L.SEMANAS.map((s) => `<td class="centro"><input type="checkbox" data-ruta="semanal.${s}.${c.codigo}" data-valor="${esc(item.valor)}" aria-label="${rotulo(item)}, semana ${s}"></td>`).join("")}</tr>`).join("");
    }).join("");
    const control = ["recibida", "transcrita"].map((b) => `<tr><th scope="row" class="sub">Foto ${b}</th>${L.SEMANAS.map((s) => `<td class="centro"><input type="checkbox" data-ruta="transcripcion.${s}.${b}" data-bandera aria-label="Foto ${b}, semana ${s}"></td>`).join("")}</tr>`).join("");
    return `<div class="tabla-scroll" tabindex="0" role="region" aria-label="Renglón semanal"><table class="rejilla semanal"><thead>${titulos}</thead><tbody>${filas}<tr class="grupo"><th scope="colgroup" colspan="5">Control de la transcripción (no se exporta)</th></tr>${control}</tbody></table></div>${unicos.length ? formulario(unicos, "unico") : ""}`;
  }

  function hojaVerificacion() {
    const lista = campos(["ver"]);
    const filas = estado.verificacion.map((_, i) => `<tr>${lista.map((c) => `<td>${L.esMarcable(c) ? casillas(c, `ver.${i}.${c.codigo}`) : `<input type="text" data-ruta="ver.${i}.${c.codigo}" aria-label="${esc(c.etiqueta)}, fila ${i + 1}" autocomplete="off">`}</td>`).join("")}</tr>`).join("");
    return `<div class="tabla-scroll" tabindex="0" role="region" aria-label="Verificación de instrumentos"><table class="rejilla"><thead><tr>${lista.map((c) => `<th scope="col">${esc(c.etiqueta)}</th>`).join("")}</tr></thead><tbody>${filas || `<tr><td colspan="${lista.length}" class="vacio">Sin filas todavía.</td></tr>`}</tbody></table></div><p><button type="button" id="ver-agregar" class="secundario">Agregar fila</button></p>`;
  }

  // Hoja 4 de cafeterías: una salida por bloque; se abren las que ya tienen datos y la siguiente.
  function hojaSalidas() {
    const lista = campos(["c4"]);
    const salidas = actual().salidas;
    const llenas = LC.SALIDAS.filter((n) => Object.keys(salidas[n] || {}).length);
    const siguiente = (llenas.length ? Math.max(...llenas) : 0) + 1;
    return LC.SALIDAS.map((n) => `<details class="salida"${llenas.includes(n) || n === siguiente ? " open" : ""}><summary>Salida ${n}${llenas.includes(n) ? " · con datos" : ""}</summary>${formulario(lista, `salidas.${n}`)}</details>`).join("");
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

  function avisos() {
    if (!actual()) return [];
    return ficha === "caf" ? LC.marcas(actual(), DC, vocabularios.caf) : L.marcas(actual(), D, vocabularios.hog, estado.verificacion);
  }

  function pintarAvisos() {
    const lista = avisos();
    const reglas = (ficha === "caf" ? DC : D).reglas;
    const donde = (a) => `${a.fase && a.fase !== DC.fases[1] ? ` · semana previa` : ""}${a.sem ? ` · semana ${a.sem}` : ""}${a.dia ? ` · día ${a.dia}` : ""}${a.sal_n ? ` · salida ${a.sal_n}` : ""}`;
    $("#avisos-lista").innerHTML = lista.length
      ? lista.map((a) => `<li><strong>${a.regla}</strong> <small>${esc((reglas[a.regla] || {}).tipo || "")}</small> · ${a.codigo} · hoja ${a.hoja}${donde(a)}</li>`).join("")
      : `<li class="vacio">${ROTULOS[ficha].sin}</li>`;
    $("#avisos-cuenta").textContent = String(lista.length);
    $("#avisos-pie").textContent = `Se marcan, no se corrigen: captura lo que dice el papel. ${ROTULOS[ficha].pie}`;
  }

  function pintarUnidades() {
    const lista = ficha === "caf" ? LC.ids(estadoCaf) : D.hogares;
    if (ficha === "caf" && !lista.includes(unidad.caf)) unidad.caf = lista[0] || "";
    $("#unidad-rotulo").textContent = ROTULOS[ficha].unidad;
    $("#unidad").innerHTML = lista.map((id) => `<option>${id}</option>`).join("");
    $("#unidad").value = unidad[ficha];
    $("#unidad").disabled = !lista.length;
    $("#unidad-agregar").hidden = ficha !== "caf";
  }

  function cuerpo() {
    if (vista === "ver") return hojaVerificacion();
    if (!actual()) return `<p class="aviso">Todavía no hay ninguna cafetería en este dispositivo. «Agregar cafetería» crea la siguiente clave (${esc(DC.prefijo)}1, ${esc(DC.prefijo)}2…). Qué negocio es cada clave lo sabe sólo la lista de claves, que vive fuera de esta app.</p>`;
    if (FORMULARIOS[vista]) return formulario(campos(FORMULARIOS[vista][0]), FORMULARIOS[vista][1]);
    if (vista === "h2") return hojaDiaria(campos(["h2"]), L.DIAS, "diario", "Registro diario");
    if (vista === "c3b") return hojaDiaria(campos(["c3"]), LC.DIAS_BASE, "base", "Semana de medición previa");
    if (vista === "c3") return hojaDiaria(campos(["c3"]), LC.DIAS, "diario", "Registro por día");
    if (vista === "c4") return hojaSalidas();
    const semanales = campos([vista]);
    return hojaSemanal(semanales.filter((c) => c.cuando !== "una vez"), semanales.filter((c) => c.cuando === "una vez"));
  }

  function pintar() {
    const propias = [...VISTAS.hog, ...VISTAS.caf];
    if (vista !== "exportar") {
      const v = propias.find((x) => x.id === vista) || VISTAS.hog[0];
      vista = v.id;
      ficha = VISTAS.caf.includes(v) ? "caf" : "hog";
    }
    const v = vista === "exportar" ? EXPORTAR : propias.find((x) => x.id === vista);
    $("#vistas").innerHTML = [...VISTAS[ficha], EXPORTAR].map((x) => `<a href="#${x.id}"${x.id === vista ? ' aria-current="page"' : ""}>${esc(x.corto)}</a>`).join("");
    for (const a of $$("#fichas a")) { if (a.dataset.ficha === ficha) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); }
    const exportar = vista === "exportar";
    $("#exportar").hidden = !exportar;
    $("#captura").hidden = exportar;
    $("#avisos").hidden = exportar || vista === "ver";
    $("#unidad-caja").hidden = exportar || vista === "ver";
    if (exportar) { $("#anterior").hidden = !localStorage.getItem(L.CLAVE_ANTERIOR); return; }
    pintarUnidades();
    $("#captura").innerHTML = `<h2>${esc(v.titulo)}${vista === "ver" || !actual() ? "" : ` · <span class="clave">${esc(unidad[ficha])}</span>`}</h2><p class="entrada">${esc(v.nota)}</p>${cuerpo()}`;
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
  const CSV = "text/csv;charset=utf-8";

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
    $("#unidad").addEventListener("change", (e) => { unidad[ficha] = e.target.value; pintar(); });
    $("#unidad-agregar").addEventListener("click", () => {
      unidad.caf = LC.agregar(estadoCaf, DC);
      guardar();
      pintar();
      avisar(`Se creó la clave ${unidad.caf}. Anótala en la lista de claves, fuera de esta app.`);
    });
    window.addEventListener("hashchange", () => { vista = location.hash.slice(1) || "h1"; pintar(); });

    const interno = () => ({ interno: $("#interno").checked });
    const exportaciones = {
      "csv-largo": ["largo", () => L.csvLargo(estado, D, vocabularios.hog, interno())],
      "csv-ancho": ["ancho", () => L.csvAncho(estado, D, vocabularios.hog)],
      "csv-hogar": ["hogar", () => L.csvHogar(estado, D, vocabularios.hog, interno())],
      "caf-largo": ["cafeterias_largo", () => LC.csvLargo(estadoCaf, DC, vocabularios.caf, interno())],
      "caf-ancho": ["cafeterias_ancho", () => LC.csvAncho(estadoCaf, DC, vocabularios.caf, interno())],
      "caf-unica": ["cafeterias", () => LC.csvCafeteria(estadoCaf, DC, vocabularios.caf, interno())]
    };
    for (const [id, [nombre, generar]] of Object.entries(exportaciones)) {
      $(`#${id}`).addEventListener("click", () => descargar(`miltli_${hoy()}_${nombre}${$("#interno").checked ? "_interno" : ""}.csv`, generar(), CSV));
    }
    $("#respaldo").addEventListener("click", () => {
      const texto = "Este archivo contiene la captura de los hogares y de las cafeterías con su clave. No lleva nombres ni domicilios, pero dentro del grupo es reidentificable. Guárdalo sólo donde vivan los datos del piloto; no lo mandes por chat.";
      if (window.confirm(texto)) descargar(`miltli_${hoy()}_respaldo.json`, JSON.stringify({ ...estado, caf: estadoCaf }, null, 1), "application/json");
    });
    $("#restaurar").addEventListener("change", async (e) => {
      const archivo = e.target.files[0];
      if (!archivo) return;
      try {
        const candidato = JSON.parse(await archivo.text());
        if (candidato.version !== 2) throw new Error("versión");
        if (!window.confirm("Restaurar sustituye toda la captura de este dispositivo, de hogares y de cafeterías, por la del archivo.")) return;
        estado = L.normalizar(candidato, D);
        estadoCaf = LC.normalizar(candidato.caf, DC);
        guardar();
        avisar("Respaldo restaurado.");
      } catch (err) { avisar("El archivo no es un respaldo de esta versión de la captura.", true); }
      e.target.value = "";
    });
    $("#borrar").addEventListener("click", () => {
      if (!window.confirm("Se borra toda la captura de este dispositivo, de hogares y de cafeterías. No se puede deshacer. ¿Ya descargaste el respaldo?")) return;
      estado = L.estadoInicial(D);
      estadoCaf = LC.estadoInicial();
      guardar();
      avisar("Captura borrada.");
    });
    $("#anterior-csv").addEventListener("click", () => {
      try { descargar(`miltli_${hoy()}_serie-anterior.csv`, L.csv(L.serieAnterior(JSON.parse(localStorage.getItem(L.CLAVE_ANTERIOR)))), CSV); } catch (err) { avisar("No se pudo leer la serie anterior.", true); }
    });
    $("#anterior-borrar").addEventListener("click", () => {
      if (!window.confirm("Se borra del dispositivo el registro de la versión anterior de la app.")) return;
      localStorage.removeItem(L.CLAVE_ANTERIOR);
      pintar();
    });
  }

  async function iniciar() {
    $("#version").textContent = `F-HOG rev. ${D.ficha_rev}, diccionario ${D.diccionario}, reglas I-1 a I-${L.REGLAS_EVALUADAS.length} · F-CAF ${DC.ficha_rev}, diccionario ${DC.diccionario}, reglas IC-1 a IC-${LC.REGLAS_EVALUADAS.length}`;
    try {
      [vocabularios.hog, vocabularios.caf] = await Promise.all(["./vocabulario.json", "./vocabulario-caf.json"].map(async (url) => (await fetch(url)).json()));
    } catch (e) { avisar("No se pudo cargar el vocabulario.", true); return; }
    cargar();
    vista = location.hash.slice(1) || "h1";
    enlazar();
    pintar();
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  document.addEventListener("DOMContentLoaded", iniciar);
}());
