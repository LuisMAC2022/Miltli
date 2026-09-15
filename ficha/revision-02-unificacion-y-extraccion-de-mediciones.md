# Revisión 02 de la ficha para hogares — unificación de ramas y extracción de las mediciones técnicas

Fecha: septiembre de 2026 · Archivo revisado: `ficha/miltli-ficha-hogares.html`
Revisión anterior: `revision-01-lenguaje-medicion-privacidad.md` · Análisis de partida:
`contraste-01-ficha-vs-direcciones.md`

Documento de decisiones: qué se cambió, por qué, y qué se pierde con cada cambio.

---

## 0. Punto de partida

Las ramas `ficha` y `ficha_colaboracion` avanzaron un ciclo completo en paralelo, sobre archivos
disjuntos: la primera produjo la revisión 01 del instrumento y el contraste; la segunda, los tres
`.docx` de directrices. La fusión no tuvo conflictos, tal como anticipaba el contraste.

Unificar no era sólo fusionar archivos. El contraste había dejado un diagnóstico: la revisión 01
resolvió por su cuenta siete de las catorce decisiones arquitectónicas y añadió una dimensión que las
directrices no contemplan —privacidad—, pero perdió tres cosas que el diccionario tenía razón en
exigir. Esta revisión devuelve esas tres, incorpora las indicaciones nuevas y deja el repositorio en
condiciones de recibir la actualización de la app y la tabla de correspondencia.

---

## 1. Resumen de lo que cambió

| Antes (revisión 01) | Ahora (revisión 02) |
| --- | --- |
| 3 hojas: arranque y cierre · diario · semanal | **4 hojas**: arranque · diario · semanal · cierre |
| Arranque y cierre en la misma hoja, separados por un título | **Hojas distintas**, con banda «Parte A · sólo el día 1» y «Parte B · sólo el día 28» |
| Temperatura percibida por el hogar: 4 anclas más vaho | **Eliminada de la ficha.** La mide el equipo con termómetro |
| Pesaje opcional de un bote por el hogar, con su báscula | **Eliminado de la ficha.** Lo hace el equipo, pareado y en dos momentos |
| Sin registro para el equipo | `registro-tecnico-equipo.md`, con su propia hoja y sus reglas |
| El orden de los procesos, implícito y distinto en tres documentos | **Explícito** en cuatro niveles: proyecto, piloto, carga diaria y revisión semanal |
| «¿Cambiaste algo esta semana?» Sí / No | **Seis casillas fijas** `A0`–`A5`, cruzables con el estado |
| Renglón vacío ambiguo: ¿cero o sin registrar? | **`REG` semanal** más la regla impresa: «`0` = no hubo residuo; renglón vacío = no anotaste» |
| «Destino previo de los residuos»: marca uno | **Multirrespuesta** |
| Conseguir material seco: 3 opciones | **4 opciones**, con «No sé dónde conseguirlo» |
| Fauna sin umbral de cantidad y sin «no lo sé» | Umbral («más de una vez o más de dos individuos») y casilla `F12` |
| Diccionario v0.1 en `.docx`, desalineado del instrumento | **v0.2 en Markdown**, derivada casilla por casilla, con códigos estables |
| Sin protocolo operativo | **Borrador** para validación del comité, con el calendario pendiente |

---

## 2. La temperatura y el pesaje salen de la ficha

### Qué se hizo

La sección «Temperatura» de la Hoja 3 desaparece por completo, con sus cuatro anclas. La fila de
pesaje opcional de la Hoja 1 también. Las dos pasan a `registro-tecnico-equipo.md`, que llena el
equipo que coordina la actividad, con termómetro de sonda y báscula, en las visitas que fije el
comité. La Hoja 1 lo dice al hogar con todas sus letras: *«El pesaje y la temperatura los hace el
equipo que coordina, en las visitas que anuncie: no necesitas báscula ni termómetro.»*

### Por qué mejora el instrumento, más allá de la indicación

Las dos mediciones estaban mal colocadas por razones distintas y la revisión 01 ya lo sabía de una de
ellas:

- **Temperatura.** La revisión 01 había construido una escala de anclas físicas precisamente porque
  la mano no mide temperatura, mide flujo de calor. Era una buena solución a un problema que no había
  por qué tener: un termómetro no depende de qué tan fría esté la mano del observador, ni de la hora,
  ni de la humedad del material. Y el objetivo de aprendizaje **E** —¿qué relación hay entre lo que la
  casa percibe y lo que mide un instrumento?— no tenía dónde ocurrir, porque no existía la medición
  instrumental contra la cual comparar. Ahora existe; lo que se pierde es el otro lado de la
  comparación (§5).
- **Pesaje.** El contraste lo marcaba como riesgo 2.1.7: un pesaje único, opcional, de un solo bote,
  un solo día y una sola mezcla, es una base frágil para convertir litros a kilos de todo el grupo, y
  la ficha lo presentaba con más confianza de la que el dato soporta. La mitigación ya estaba escrita
  en el diccionario —mediciones pareadas y periódicas del equipo— y no se había aplicado. Ahora se
  aplica.

Hay además un efecto que no se buscaba: la ficha del hogar deja de pedir **cualquier** instrumento. Un
hogar sin báscula ya no queda en desventaja ni tiene que declararlo.

### El vaho se queda, y no como temperatura

La casilla «al abrir había vaho, o gotas de agua en la tapa» no se fue con la temperatura: pasa a
encabezar la sección de humedad. No es una medida térmica —es una observación casi objetiva, que no
exige tocar nada— y el orden de la revisión semanal la pone primero porque desaparece en segundos.
En el diccionario es una variable independiente, `VAHO`, y no un nivel de `HUM`: comparten sección en
el papel por economía de espacio, no por semántica.

---

## 3. El orden de los procesos

Estaba implícito y era distinto en cada documento. Ahora es explícito en cuatro niveles:

1. **Del proyecto** (`protocolo §1.1`): qué paso bloquea a cuál. Lo más importante que fija: la tabla
   de correspondencia no puede empezar antes de que el diccionario esté validado, y la app no puede
   empezar antes de la tabla.
2. **Del piloto** (impreso en la Hoja 1): día 1 → diario → semanal → visita del equipo → día 28.
3. **De cada carga diaria** (impreso en la Hoja 2): retirar → trocear → **medir** → echar → cubrir →
   tapar. La medición va después de retirar y trocear, porque si no se mide material que no entra, y
   antes de echar, porque después ya no se puede medir.
4. **De la revisión semanal** (`protocolo §1.4`): antes de echar nada ese día → vaho → olor → mirar →
   remover → puño → marcar. Cada paso altera lo que mide el siguiente: remover destruye el vaho y
   libera olores que antes no estaban disponibles.

El orden de la revisión cierra además uno de los escenarios abiertos de la prueba de estrés: el
momento de observación respecto de la última carga, que antes no estaba fijado.

---

## 4. Lo que el contraste pedía devolver, devuelto

- **La distinción entre cero y ausencia.** Nueva sección semanal «Cómo anoté esta semana», dos
  casillas, y la regla impresa en la banda del diario. Cuesta cuatro marcas en el mes y devuelve el
  criterio de éxito #1 del plan y el indicador «porcentaje de registros completados», que sin ella no
  eran calculables. Era la única divergencia que la revisión 01 no listaba entre sus costos.
- **La intervención como variable analizable.** «¿Cambiaste algo?» Sí/No se convierte en `A0`–`A5`,
  con los mismos códigos del diccionario v0.1 para no romper la continuidad. Cuesta lo mismo que la
  casilla anterior y permite estudiar `Estado_t + Acción_t → Estado_t+1`. `A4` («retiré material que
  no iba») devuelve además el dato de materiales no aceptados que pedía el plan.
- **El puente de códigos hacia la captura.** Resuelto como proponía el contraste: la hoja del hogar se
  queda en prosa y los códigos viven en `diccionario-de-datos-v0.2-borrador.md`. La decisión #10 y la
  revisión 01 se cumplen a la vez porque no compiten por el mismo espacio.

Y tres escenarios de la prueba de estrés que se cerraron dentro de la Hoja 3: umbral de cantidad en
fauna, casilla «vi algo que no supe identificar» y momento de la observación.

---

## 5. Lo que cuesta esta revisión

1. **Una hoja más.** De tres a cuatro. Es el precio de separar visiblemente el arranque del cierre: no
   cabían en una hoja junto con la banda de orden y la del equipo. A cambio, el cierre gana espacio
   real para escribir —cuatro renglones anchos en vez de tres cortos— y una hoja que está en blanco
   durante 27 días deja de invitar a llenarse antes de tiempo.
2. **Se pierde la percepción térmica del hogar.** Al sacar la temperatura, se pierde el lado
   doméstico de la comparación que el objetivo **E** quería hacer: ya no hay una escala percibida que
   validar contra el termómetro. Lo que queda es la relación entre `TEMP_I` y el resto de lo que
   describe la casa —humedad, olor, vaho—, que es menos directo. Fue una indicación explícita y se
   acata; queda anotado que ésa es la pérdida.
3. **Dos visitas por hogar que antes no existían.** El pesaje y la temperatura pasan a depender de que
   el equipo vaya. Con tres personas y cinco hogares, si no se agenda, no ocurre —y entonces no habrá
   ni factor de densidad ni validación térmica, que es peor que el pesaje frágil que había—. Por eso
   el calendario es la decisión que el protocolo pide al comité en primer lugar.
4. **Diez pares de medición, no más.** Dos visitas × cinco hogares. Alcanza para una lectura
   exploratoria de la densidad, no para validar nada. Conviene decirlo al presentar resultados.
5. **`ACT` sigue sin orden temporal dentro de la semana.** Se sabe qué se hizo, no si fue antes o
   después de la observación. Se acepta como límite del formato semanal.
6. **La multimarca sigue sin regla de reducción.** La ficha autoriza marcar varias casillas, que es lo
   correcto, pero la regla para convertir eso en algo graficable no está decidida. Debe decidirse
   antes de tener datos; está como pendiente §5.3 del protocolo.

---

## 6. Privacidad en esta revisión

La revisión 01 introdujo el apartado de privacidad; ésta lo sostiene en tres frentes nuevos:

- **La extracción de las mediciones no abre una puerta trasera.** El registro del equipo usa la misma
  clave `H__`, sin nombres, y tiene prohibido describir el contenido del bote que pesa. Un pesaje
  categorizado hecho por el equipo sería el mismo registro dietético que la revisión 01 eliminó, sólo
  que con otra mano. Queda escrito en `registro-tecnico-equipo.md` y en el protocolo §4.
- **Las restricciones pasan a ser parte del contrato de datos.** Estaban en un documento de decisiones
  que un esquema derivado podía ignorar sin darse cuenta. Ahora son la §7 del diccionario v0.2, para
  que una v0.3 redactada sólo desde la utilidad analítica tenga que desdecirlas explícitamente.
- **«En blanco» se vuelve un valor representable.** La ficha promete que cualquier pregunta puede
  quedar sin contestar; el diccionario v0.1 decía que una celda vacía es un error de captura. Las dos
  cosas no podían ser ciertas. El v0.2 introduce `NC` —no contestada— distinto de `NR` —no
  registrada—, y la regla de que los `NC` no se imputan ni se preguntan.

El hallazgo H-1 del documento de hallazgos es el más serio que salió de esta revisión y no está en la
ficha sino en la app: el CSV semanal lleva el nombre del responsable en cada fila, de modo que el
archivo que circula cada semana es la lista que la ficha promete por escrito que no existirá.

---

## 7. Corrección a las revisiones anteriores

`revision-01` §8 y el contraste §2.1.10 y §2.3 afirman que la app y el `README.md` están en gramos.
No lo están: `docs/app.js` usa `humedoL` y `secoL`, el CSV exporta `humedo_l` y `seco_l`, y no hay
ninguna aparición de gramos, peso ni kilos en `docs/` ni en `README.md`.

Los dos documentos se conservan tal cual, con su fecha —son registros de decisión, no descripciones
del estado actual—. Importa porque cambia el trabajo que viene: la divergencia real entre la app y la
ficha no es de unidad, sino de categorías, frecuencias y ausencias. Detalle en el hallazgo D-1.

---

## 8. Pendiente

Nada de lo siguiente se hizo en esta revisión, y todo está detallado en los documentos que se citan:

- **Validación del comité** del protocolo y del diccionario v0.2, y **el calendario del pesaje y la
  temperatura** (protocolo §6, tabla vacía a propósito).
- **Pruebas de usabilidad** antes de congelar (protocolo §7), en especial la de concordancia entre dos
  observadores describiendo la misma composta.
- **Tabla de correspondencia** y **actualización de la app**: fuera del alcance, con sus condiciones
  en `hallazgos-app-y-tabla-de-correspondencia.md`.
- **Alineación de `README.md` y `planes/plan_trabajo.md`**, incluidos los criterios de éxito del plan,
  que hoy evalúan el mes como ausencia de problemas mientras la ficha promete al hogar que ninguna
  casilla es buena ni mala.
