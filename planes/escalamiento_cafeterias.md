# Escalamiento a cafeterías — qué se reutiliza del piloto doméstico y qué cambia

> **Análisis para el equipo, no decisión.** Fecha: 2 de octubre de 2026. Es el punto de partida de la
> «ficha para desechos de cafeterías» que anuncia `ficha/readme.md:6-7`. Se leyó el repositorio en la
> rama `claude/new-session-pe41c4`, commit `f6c885a`, sin modificar nada fuera de este archivo.
> La ficha doméstica **F-HOG rev. 03 está en revisión y sin congelar** (`ficha/readme.md:29`;
> acta-01:823-831): lo que aquí se apoya en ella es provisional y la matriz (§4) lo marca.

## Cómo leer este documento

| Marca | Qué es |
| --- | --- |
| `ruta:línea` | Lo que **dice el repositorio** |
| commit `abc1234` | Lo que **muestra la historia de git** |
| **Encargo** | Lo que dijo quien pidió este análisis y el repositorio no registra |
| **[Inferencia]** | Lectura de este análisis a partir de lo anterior |
| **[Propuesta]** | Sugerencia de este análisis. **No es una decisión del equipo** ni una PROPUESTA del comité en el sentido del acta-01 |

- Las preguntas abiertas se numeran **CAF-01…** para no confundirlas con las `P-xx` del acta-01 ni con
  los hallazgos `D-`, `H-`, `R-` y `C-` de documentos anteriores.
- **Ninguna cifra sin fuente.** Las que aparecen vienen del repositorio, con su cita; lo demás está
  «por medir» o «por definir».
- Veredictos, esfuerzos y esqueleto son de este análisis: todos son **[Propuesta]** aunque no lo repitan
  en cada fila.

**Abreviaturas de rutas** (el número después de `:` es la línea):

| Abreviatura | Ruta |
| --- | --- |
| `README` | `README.md` |
| `plan` | `planes/plan_trabajo.md` |
| `ficha/readme` | `ficha/readme.md` |
| `acta-01` | `ficha/acta-01-decisiones-piloto.md` |
| `dicc-v0.3` | `ficha/diccionario-de-datos-v0.3-borrador.md` |
| `prot-v0.2` | `ficha/protocolo-operativo-v0.2-borrador.md` |
| `F-HOG` | `ficha/miltli-ficha-hogares.html` (F-HOG rev. 03) |
| `RT` | `ficha/registro-tecnico-equipo.md` |
| `concordancia` | `ficha/hoja-concordancia.html` |
| `guia` | `ficha/hoja-guia.html` |
| `bitacora` | `ficha/plantilla-bitacora-programa.md` |
| `tabla-corr` | `ficha/tabla-de-correspondencia-v0.1.md` |
| `espec-app` | `ficha/especificacion-cambios-app.md` |
| `mes-2` | `ficha/diseno-mes-2-composta-suelo-gei.md` |
| `hallazgos` | `ficha/hallazgos-app-y-tabla-de-correspondencia.md` |
| `rev-01` | `ficha/revision-01-lenguaje-medicion-privacidad.md` |
| `anexo-DA` | `ficha/anexos-v0.1/Miltli_Decisiones_Arquitectonicas_v0.1.txt` |
| `SELLOS` | `ficha/preregistro/SELLOS.md` |
| `app.js`, `index.html` | `docs/app.js`, `docs/index.html` |
| `test-app`, `test-cobertura` | `tests/app.test.js`, `tests/ficha-cobertura.test.js` |

---

## 1. Resumen

- **Se reutiliza** la capa de medición: `0` ≠ vacío, entrada + fuga como cota inferior, volumen → masa
  sólo con pares de densidad, reglas que se marcan y no se corrigen, claves con la lista fuera del
  repositorio, bitácora del programa, pre-registro sellado, verificación de instrumentos y el CSV largo.
- **Cambia** lo que suponía «un hogar que composta lo suyo»: el denominador (personas), el bote de ~1 L,
  los motivos de fuga, la hoja guía, el estado y el suelo del día 28 (sólo con composta en sitio) y el
  compromiso de 28 días, que pasa a ser un acuerdo de dos partes porque el programa asume la logística.
- **Bloquean la ficha:** destino, tiempo máximo de almacenamiento y plan B (CAF-01, CAF-02); corrientes
  que acepta el método (CAF-03); unidad y denominador sin datos del negocio (CAF-04, CAF-06); si la
  corriente se registra (CAF-05); quién anota en el turno (CAF-07); acuerdo y verificación sanitaria
  (CAF-09, CAF-13). El diseño previo de Piloto 2 con acopios **no está en el repositorio** (§2.1).

---

## 2. Mapa del repositorio

| Ruta | Qué es |
| --- | --- |
| `README.md` | Descripción del piloto doméstico y de la app publicada, con la advertencia de privacidad vigente |
| `planes/plan_trabajo.md` | Plan del mes 1: modelo de trabajo, materiales aceptados, calendario, fórmulas y criterios de éxito |
| `ficha/readme.md` | Índice de `ficha/`, orden de los procesos y estado de cada paso; anuncia la ficha de cafeterías |
| `ficha/acta-01-decisiones-piloto.md` | Decisiones firmes D1–D6, aclaraciones, RE-01…RE-14 y las 23 PROPUESTAS abiertas |
| `ficha/miltli-ficha-hogares.html` | **F-HOG rev. 03**, cuatro hojas, con `data-codigo` en cada casilla; sin congelar |
| `ficha/miltli-ficha-hogares-rev02.html` | F-HOG rev. 02 conservada para comparar; no se opera |
| `ficha/hoja-guia.html` | Hoja de consulta del hogar: reglas de operación y ayuda visual de fauna |
| `ficha/hoja-concordancia.html` | Prueba de concordancia: estaciones, panel de fotos y observación del día 28 |
| `ficha/registro-tecnico-equipo.md` | Formularios del equipo para el día 1 y el día 28, e instrumentos |
| `ficha/plantilla-bitacora-programa.md` | Plantilla de la bitácora de lo que hace el programa (registros fuera del repositorio) |
| `ficha/diccionario-de-datos-v0.3-borrador.md` | Contrato de datos: códigos, ausencias, multimarca, integridad, derivadas y privacidad |
| `ficha/protocolo-operativo-v0.2-borrador.md` | Cómo y en qué orden se observa cada variable; prueba de estrés y pruebas de usabilidad |
| `ficha/tabla-de-correspondencia-v0.1.md` | Puente casilla ↔ campo de la app ↔ columna del CSV, con lo retirado por privacidad |
| `ficha/especificacion-cambios-app.md` | Diseño, sin código, de la app como captura del coordinador |
| `ficha/diseno-mes-2-composta-suelo-gei.md` | Mes 2: calidad de composta, suelo, estimación de GEI y estructura de la tabla del Piloto 2 |
| `ficha/preregistro/SELLOS.md` y `.gitignore` | Hash de la tabla de decisiones del Piloto 2; el contenido no está en el repositorio |
| `ficha/revision-0{1,2,3}-*.md`, `contraste-01-*.md`, `hallazgos-*.md` | Análisis que llevaron a la rev. 03 |
| `ficha/*.docx` y `ficha/anexos-v0.1/` | Directrices originales (diccionario, decisiones arquitectónicas, prompt de protocolo) |
| `docs/` | App estática para GitHub Pages: `app.js`, `index.html`, `estilo.css`, `sw.js`, `manifest.webmanifest` |
| `tests/app.test.js`, `tests/ficha-cobertura.test.js` | Pruebas de la app y de cobertura casilla ↔ código; `npm test` pasa 16 de 16 |
| `package.json` | Sólo el comando de pruebas (`node --test`); sin dependencias |

### 2.1 Donde el encargo y el repositorio no coinciden — manda el repositorio

1. **La app no es htmx/Python.** Es HTML y JavaScript estáticos que guardan en `localStorage`
   (`README:21-22`, `README:49-52`). Ningún commit contiene código Python ni htmx: `git log --all -S
   htmx` no devuelve nada, y «Python» sólo aparece en el texto del README desde el commit `aea95b2`,
   que dice que la versión estática **sustituye** un servidor Python/SQLite que nunca estuvo aquí.
2. **La app todavía no es la captura del coordinador.** Está decidido (D5, `acta-01:314-317`) pero sólo
   especificado, sin código (`espec-app:3-4`; `README:24-27`). La versión publicada sigue siendo del
   hogar y **todavía exporta `responsable` y `tipo_residuo`** (`app.js:202-203`; aviso en
   `README:29-32`).
3. **El Piloto 2 con departamentos, cafeterías, escuelas y acopios no está.** Ningún archivo ni commit
   menciona acopios como diseño, escuelas o departamentos (`git log --all -S escuela`, `-S departament`
   y `-S negocio` vacíos). La única «acopio» es el precedente del café (`acta-01:643-644`). El Piloto 2
   del repositorio es una tabla de decisiones sellada cuyo contenido no está aquí (`SELLOS:6-8`) y, en el
   único texto que lo describe, «repetirse con más hogares» (`mes-2:325`). La ficha de cafeterías sólo
   aparece como paso siguiente a la doméstica (`ficha/readme:6-7`, commit `a4782a0`).
4. **El modelo universitario no está documentado.** El repositorio habla de un «simulador o modelo de
   residuos» que «no aparece en ningún archivo» (`acta-01:740-741`, `acta-01:810-811`) y nunca dice
   «universidad». Lo único que fija es lo que el registro le entrega: `ENT_LPS`, `FUGA_L` y un factor
   kg/L, **sin composición** (`dicc-v0.3:540-541`).
5. **El precedente del café.** El repositorio lo registra como ejemplo de imprevisto para la bitácora:
   «un acopio espontáneo de residuos de café que se enmoheció y terminó en una composta casera sin
   decisión del programa» (`acta-01:643-644`; `bitacora:38-41`). Que viniera de una cafetería donde
   trabaja alguien de la organización y que pasaran dos semanas lo dice el **Encargo**, no el
   repositorio. Tratar destino y tiempo máximo como **requisitos previos** es también del Encargo; este
   análisis lo adopta.
6. **El método.** Según el Encargo, Miltli aporta medición e interfaz, no el método. El plan doméstico,
   sin embargo, sí fija reglas de método —materiales aceptados, proporción 1:2, regla del 80 %
   (`plan:135-220`)— sin decir de quién son. Para cafeterías, este análisis las trata como decisiones
   de quien opere el método.
7. Coinciden con el encargo: mes 1 prueba la entrada (`plan:18-21`), fuga semanal (`README:10-12`),
   estado una vez el día 28 (`README:13`) y ficha en revisión (últimos commits `e9cd9bb`, `e722f0a`,
   `f6c885a`, del 2-oct-2026 hacia las 02:00 UTC; nueve PROPUESTAS que bloquean, `acta-01:825-826`).

---

## 3. Supuestos del piloto doméstico

| # | Supuesto | Dónde vive |
| --- | --- | --- |
| S-1 | La fuente es un hogar y el denominador son las personas que comen ahí | `dicc-v0.3:108`, `dicc-v0.3:202`, `dicc-v0.3:513` |
| S-2 | Quien separa es quien composta, en el mismo lugar | `plan:37-46` |
| S-3 | No hay transporte ni almacenamiento más allá del siguiente depósito | `plan:203`; `prot-v0.2:137-143` |
| S-4 | Volúmenes pequeños: bote de ~1 L, enteros y medios | `acta-01:527-529`; `dicc-v0.3:183-185` |
| S-5 | La casa no tiene báscula; el equipo pesa | `plan:130-131` |
| S-6 | Una persona, o la misma casa, anota | `dicc-v0.3:254` |
| S-7 | Se opera siete días por semana: 28 renglones | `dicc-v0.3:167` |
| S-8 | Materiales aceptados: los de una cocina doméstica, sin carne, lácteos, aceites ni salsas | `plan:135-175` |
| S-9 | Lo que se protege es la vida privada de una casa: qué se come y su rutina | `dicc-v0.3:554-560` |
| S-10 | Compromiso voluntario, unilateral, de 28 días; cualquier pregunta puede quedar en blanco | `plan:87-97` |
| S-11 | El equipo entra a la casa el día 1 y el día 28 | `acta-01:185-201` |
| S-12 | El suelo del mes 2 es el del propio hogar | `acta-01:426-428` |
| S-13 | El camino previo de los restos tiene cuatro opciones domésticas | `dicc-v0.3:110`; `mes-2:209-217` |
| S-14 | Contenedor de 60 a 150 L con regla del 80 % y sin segundo contenedor | `plan:121`; `plan:205-217` |
| S-15 | Cinco fuentes con claves cerradas `H1`–`H5` | `dicc-v0.3:104`; `app.js:74`; `espec-app:30` |

---

## 4. Matriz de reutilización

**Columnas.** *Veredicto*: reutilizar (tal cual o casi) · adaptar (misma idea, otro contenido) ·
reemplazar (no sirve para cafeterías). *Esfuerzo*: estimación de este análisis para llevarlo a
cafeterías. *¿Depende de la ficha en revisión?*: **sí** cuando el elemento doméstico tiene una
PROPUESTA abierta (`acta-01:763-787`) o un texto que cambia al congelar; **no** cuando descansa en una
decisión firme (D1–D6, A-x, E-x, RE-x decididas) o no pertenece a la ficha.

| # | Elemento | Ruta | Veredicto | Por qué | Esfuerzo | ¿Depende? |
| --- | --- | --- | --- | --- | --- | --- |
| | **A. Propósito e indicadores** | | | | | |
| 1 | Propósito del mes 1: probar la entrada, no la composta | `plan:18-21` | Adaptar | La idea vale; en una cafetería «la entrada» incluye separar, guardar y entregar, porque el destino puede no estar en el sitio [Inferencia] | Bajo | No (D1) |
| 2 | Indicador «Entrada a la composta (L/persona/semana)», `ENT_LPS` | `dicc-v0.3:513`; `plan:390-392` | Reemplazar | El denominador es «personas que comieron en casa» (`dicc-v0.3:202`); un negocio no tiene equivalente sin datos del negocio (CAF-04). Se conserva la regla de nombre: nunca «generación» (`acta-01:79-80`) | Medio | No |
| 3 | Fuga semanal, `0` obligatorio, generación estimada como cota inferior | `dicc-v0.3:199`, `dicc-v0.3:209-211`, `dicc-v0.3:514` | Reutilizar | No depende del tipo de fuente: lo que se separó y no llegó al destino | Bajo | No (D1) |
| 4 | Motivos de fuga `FG1`–`FG5` | `dicc-v0.3:200`; `acta-01:80-86` | Adaptar | `FG1` (ya no cabía) y `FG2` (sin seco) suponen composta en sitio; faltan motivos de logística: sin recolección, se echó a perder antes de entregar, contaminado. La lista doméstica es cerrada por decisión (`acta-01:111`): la de cafetería es otra lista, con códigos nuevos | Bajo | No |
| 5 | Bote de ~1 L calibrado con masa de agua; enteros y medios | `dicc-v0.3:140-145`; `prot-v0.2:374-384`; `acta-01:527-529` | Adaptar | Se conservan el gesto («hasta el borde, sin apretar», `prot-v0.2:220-221`) y la calibración con agua; el tamaño de ~1 L se eligió para volúmenes domésticos. El de la cafetería es por medir; si hay báscula, se registra masa (`anexo-DA:19`) — CAF-06 | Medio | Sí (P-03) |
| 6 | Volumen → masa sólo con pares de densidad | `dicc-v0.3:376-385`, `dicc-v0.3:532-534`; `anexo-DA:19` | Reutilizar | Con varias corrientes hace más falta: una densidad por corriente, por medir. El contraste de EPA 2016 es de «residuo de alimentos suelto» (`dicc-v0.3:522`), no de posos de café | Bajo | No |
| | **B. El papel (F-HOG rev. 03)** | | | | | |
| 7 | Hoja 1, arranque | `F-HOG:591-742`; `dicc-v0.3:98-159` | Adaptar | Se conserva la forma (una sola vez, el día 1); cambian casi todas las casillas | Medio | Sí |
| 8 | `PERS0`, `PERS_S` | `dicc-v0.3:108`, `dicc-v0.3:202` | Reemplazar | Ver fila 2 y CAF-04 | Medio | No |
| 9 | `MASC`, restos a animales de la casa | `dicc-v0.3:109` | Reemplazar | No hay animales de la casa. El análogo es que alguien se lleve residuos fuera del programa, que es el precedente (`acta-01:643-644`) [Inferencia] | Bajo | No |
| 10 | `DPRE`, camino previo de los restos | `dicc-v0.3:110`; `mes-2:202-217` | Adaptar | Indispensable: es la adicionalidad de la estimación de GEI. Las opciones domésticas no cubren recolección municipal, recolección separada ni «se lo llevaba alguien» | Bajo | No |
| 11 | Contenedor, ubicación y seco (`CONT_*`, `UBIC_*`, `SECO_*`) | `dicc-v0.3:128-138` | Adaptar | Sólo con composta en la cafetería. Si no, lo que se describe es el **almacenamiento**, con otras casillas (CAF-01) | Medio | No |
| 12 | Día 0 (`D0_FECHA`, `D0_BASE`, `D0_VACIO`) | `dicc-v0.3:150-159` | Adaptar | Sólo con composta en sitio; con acopio es de la ficha del destino | Bajo | No |
| 13 | Hoja 2: `FECHA`, `ORG`, `SEC`, `NOTA_D`; día en que se echa; `0` ≠ vacío | `dicc-v0.3:163-185`; `plan:444-450` | Adaptar | Las reglas se reutilizan; cambian: una columna por corriente si se separan (CAF-05), una marca de «cerrado» para días sin operación, `SEC` sólo con composta en sitio y, quizá, renglón por turno (CAF-07) | Medio | Sí (P-03) |
| 14 | Hoja 3: `REG`, `MIN_S`, `LLEN_S`, `NOTA_S` | `dicc-v0.3:196-206` | Adaptar | `REG` y `NOTA_S` tal cual; `MIN_S` pasa a minutos del personal; `LLEN_S` describe el contenedor de almacenamiento | Bajo | Sí (P-21 si queda `SECO_USO`) |
| 15 | `ACT`, qué hice | `dicc-v0.3:205` | Adaptar | Sólo con composta en sitio; si no, su lugar lo ocupan acciones de almacenamiento y limpieza | Bajo | Sí (P-04) |
| 16 | Regla del 80 % y `PARADA_DIA` | `plan:205-220`; `dicc-v0.3:207` | Adaptar | El análogo logístico es una **regla de parada por tiempo máximo** o por contenedores llenos sin recolección (CAF-02) | Bajo | Sí (P-08, P-10) |
| 17 | Hoja 4, estado del día 28 (`VAHO`, `HUM`, `OLOR`, `FAU`, `MEZ_*`) | `dicc-v0.3:249-273` | Adaptar | Sólo si la composta está en la cafetería; si no, va a la ficha del destino. `F10` (hongos) describe composta; el moho en un residuo guardado necesita un código propio, porque un código no cambia de significado (`dicc-v0.3:17-18`) | Bajo | Sí (P-12) |
| 18 | Hoja 4, cierre (`LLEN_F`, `SECO_*`, `CONT_TAM`, `CUELLO`, `CONTIN`, `CIE_*`) | `dicc-v0.3:275-296` | Adaptar | `CONTIN` y `CIE_*` tal cual; `CUELLO` necesita opciones de logística, personal y almacenamiento | Bajo | Sí (P-22) |
| 19 | Hoja guía | `guia` | Reemplazar | Guía para operar una composta doméstica. La de cafetería es de separación, almacenamiento y entrega, y su contenido de método no es de Miltli (Encargo) | Alto | No |
| 20 | «Cómo se cuidan tus datos»; «puedes dejar en blanco» | `F-HOG:726-735`; `plan:92` | Adaptar | Mismo principio; el texto habla al negocio y a su personal | Bajo | Sí (P-06 imprime el canal) |
| 21 | `data-codigo` en cada casilla y prueba de cobertura | `dicc-v0.3:16-18`; `test-cobertura` | Reutilizar | El mecanismo sirve; la prueba lee una lista fija de archivos (§8, hallazgo 4) | Bajo | No |
| 22 | Serie propia del papel, `FICHA_REV` | `acta-01:688-691` | Reutilizar | Regla RE-10: cada papel tiene su serie. Nombre por definir [Propuesta: `F-CAF`] | Bajo | No |
| | **C. Equipo y mediciones** | | | | | |
| 23 | Registro técnico del día 1 (bote, contenedor, tara) | `RT`; `dicc-v0.3:345-364` | Adaptar | Se calibran los recipientes de cada corriente y se mide el almacenamiento | Medio | Sí (P-02) |
| 24 | Pares de densidad del día 28 | `dicc-v0.3:376-385`; `prot-v0.2:409-422` | Adaptar | Un par por corriente; el par de pila sólo con composta en sitio | Bajo | No |
| 25 | Verificación de instrumentos `VER_*` | `dicc-v0.3:452-462`; `prot-v0.2:442-453` | Reutilizar | Independiente de la fuente | Bajo | No |
| 26 | Especificación de básculas | `prot-v0.2:446-450`; `acta-01:605-606` | Adaptar | La regla «capacidad ≥ recipiente lleno + tara» se conserva; la capacidad queda por definir hasta medir un día típico | Bajo | No |
| 27 | Visita de cierre del día 28, en el orden de RE-06 | `prot-v0.2:163-191` | Adaptar | Sin composta en sitio cambia de objeto: almacenamiento, pares de densidad y entrevista (CAF-11) | Medio | Sí (P-01) |
| 28 | Hoja de concordancia | `concordancia`; `dicc-v0.3:410-427` | Adaptar | Sólo si hay variables que dos personas deban clasificar igual; candidata: contaminación visible [Inferencia] | Medio | Sí (P-12, P-13) |
| 29 | Muestras de composta y suelo del hogar | `dicc-v0.3:387-393`; `acta-01:426-428` | Reemplazar | El suelo «de cada hogar» no existe en una cafetería; las muestras van donde esté la composta | Bajo (sale de la ficha) | No |
| | **D. Programa y gobernanza** | | | | | |
| 30 | Bitácora del programa | `bitacora`; `dicc-v0.3:429-439` | Reutilizar | Dos cambios: `BIT_HOGAR` admite claves de cafetería, y tipos para recolección y para incidencias de almacenamiento. Es el instrumento que habría registrado el precedente (`bitacora:38-41`) | Bajo | No |
| 31 | Lista de claves fuera del repositorio; claves de equipo y roles | `dicc-v0.3:562-567`; `plan:99-110` | Reutilizar | Un negocio se reidentifica más fácil que un hogar (CAF-15) [Inferencia] | Bajo | No |
| 32 | El papel es el registro; la app la usa el coordinador | `acta-01:316-317` | Reutilizar | D5 no depende del tipo de fuente | Bajo | No |
| 33 | Canal de entrega: foto al coordinador, nunca al grupo | `acta-01:487-490`; `plan:47-48` | Adaptar | Quien manda la foto es un rol de la cafetería | Bajo | Sí (P-06) |
| 34 | Estrato de hogares del equipo y visita cruzada | `acta-01:659-664`; `dicc-v0.3:445` | Reutilizar | Aplica si una cafetería está ligada a alguien de la organización, como la del precedente (Encargo) | Bajo | No |
| 35 | Sesión de arranque presencial con estaciones | `prot-v0.2:86-96` | Adaptar | Capacitación por turno, repetible si cambia el personal [Inferencia] | Medio | Sí (P-02, P-12) |
| | **E. Privacidad** | | | | | |
| 36 | Las ocho restricciones del esquema | `dicc-v0.3:545-576` | Adaptar | Se conservan y se amplían a datos del negocio: ventas, clientes, compras, proveedores, menú, horarios | Medio | No (D5) |
| 37 | «No se registra qué se come»; `tipo_residuo` retirado | `dicc-v0.3:554-557`; `hallazgos:72-88`; `tabla-corr:186-187` | Adaptar | La razón es el registro dietético **de un hogar**. En un negocio, una corriente operativa (posos, preparación, plato) puede justificarse, pero como código nuevo y cerrado, nunca reconectando `tipo_residuo` (`tabla-corr:34-35`) — CAF-05 | Medio | No (D5) |
| | **F. Datos y app** | | | | | |
| 38 | App publicada | `app.js:52-67`, `app.js:74`, `app.js:201-207` | Reemplazar | App del hogar, un hogar por dispositivo, clave limitada a `H1`–`H5`, todavía con `responsable` y `tipo_residuo`; la especificación ya la reemplaza | — (ya previsto) | No |
| 39 | Modelo de datos de la especificación | `espec-app:74-97` | Adaptar | Raíz `hogares` con `H1 … H5` (`espec-app:78-79`); CAF-08 | Medio | Sí |
| 40 | CSV largo `id, ficha_rev, hoja, sem, dia, codigo, valor, valor_original, marcas` | `espec-app:144-146` | Reutilizar | No depende del tipo de fuente si `ficha_rev` lleva la serie; hoy sólo vale `02` o `03` (`dicc-v0.3:106`) | Bajo | Sí (sin código) |
| 41 | `datos.js`, `vocabulario.json` sólo por adición, lint de prohibiciones | `espec-app:60-72`, `espec-app:169-178` | Reutilizar | Añadir valores de cafetería sin renombrar los del hogar es exactamente «sólo por adición» | Bajo | Sí (P-24) |
| 42 | Tabla de correspondencia | `tabla-corr:20-35` | Reutilizar | Una tabla nueva para la ficha nueva, con los mismos tipos de relación | Bajo | Sí |
| 43 | Salidas al modelo de residuos | `dicc-v0.3:540-541`; `acta-01:743-745` | Adaptar | El repositorio no dice qué necesita el modelo de fuentes no domésticas (`acta-01:810-811`) — CAF-12 | Medio | No |
| | **G. Ciclo y evaluación** | | | | | |
| 44 | 28 días, renglón semanal y visita del día 28 | `plan:224-384` | Adaptar | Sirve como ventana de medición; cambian el calendario (días sin operación) y el objeto de la visita (CAF-10, CAF-11) | Bajo | Sí (P-01) |
| 45 | Criterios de éxito `C1`–`C7` y «5 de 7» | `plan:473-495`; `acta-01:130-151` | Adaptar | Siguen siendo de proceso; se cuentan sobre días con operación y se añaden criterios del lado del programa (§5.8) | Medio | Sí (P-07a, P-07b, P-22) |
| 46 | Pre-registro con sello | `acta-01:701-716`; `SELLOS:14-19` | Reutilizar | Independiente de la fuente | Bajo | No |
| 47 | Diseño del mes 2: composta, suelo, GEI | `mes-2` | Adaptar (sólo GEI) | La fórmula de GEI, la adicionalidad por `DPRE` y `ESC_SITIO` se reutilizan; el suelo no. Si hay transporte, es un término que la fórmula doméstica no tiene [Inferencia] | Medio | No |
| 48 | Materiales aceptados y regla 1:2 | `plan:135-196` | Reemplazar | Es método: lo define quien opere el destino (Encargo; CAF-03) | — (no es de Miltli) | No |

---

## 5. Brechas específicas de cafeterías

### 5.1 Unidad y normalización

**Lo que hay.** El indicador doméstico divide la entrada semanal entre las personas que comieron en
casa (`dicc-v0.3:513`, `dicc-v0.3:202`). Lo que el registro entrega al modelo es `ENT_LPS`, `FUGA_L` y
un factor kg/L (`dicc-v0.3:540-541`). Masa y volumen valen igual; si hay báscula, se registra masa
(`anexo-DA:19`).

**La brecha.** Una cafetería no tiene «personas que comen ahí» que pueda reportar sin dar un dato del
negocio. Los candidatos:

| Denominador | ¿Lo reporta el personal sin esfuerzo? | ¿Expone datos del negocio? | ¿Compara cafeterías? | Lectura [Inferencia] |
| --- | --- | --- | --- | --- |
| Ninguno: cantidad por día de operación y por semana | Sí | No; sólo qué días abrió | Poco: mezcla tamaños | El mínimo indispensable; se reporta siempre |
| Clientes atendidos o tickets | Depende de la caja | **Sí**: es un indicador de ventas | Sí | Sólo con justificación, y en bandas |
| Comidas o bebidas servidas | Depende del registro de ventas | **Sí** | Sí, si el menú se parece | Igual que el anterior |
| kg de alimento comprado | No: requiere facturas | **Sí**: compras y proveedores | Sí | Descartar salvo que el modelo lo exija |
| Personal por turno | Sí | Bajo | Poco | Sirve para el costo de tiempo, no para normalizar la entrada |
| Categoría del establecimiento (tamaño por bandas, tipo de servicio) | Sí, una vez | Bajo | Sí, gruesa | Candidato para la capa restringida, como `ESC_SITIO` (`dicc-v0.3:446`) |

**[Propuesta]** Reportar siempre la cantidad absoluta por corriente, por día de operación y por semana,
más los días con operación. El indicador se llama «entrada al destino», nunca «generación», por la
misma razón que D1 (`acta-01:79-80`). Un denominador sólo si CAF-04 y CAF-12 lo justifican, en bandas y
en la capa restringida (`dicc-v0.3:441-447`), nunca en el repositorio.

**Qué tendría que reportar la cafetería [Propuesta]:**

| Dato | Frecuencia | Quién (rol) | ¿Dato del negocio? | Veredicto |
| --- | --- | --- | --- | --- |
| Cantidad separada, por corriente | Por día de operación (o por turno, CAF-07) | Personal de turno | No | Necesario |
| Día con operación sí / no | Diario | Personal | Bajo | Necesario: distingue `0` de «cerrado» |
| Entregas o recolecciones: fecha, hora, contenedores, condición visible | Por evento | Quien entrega y quien recibe | No | Necesario (§5.4) |
| Fuga semanal y motivo | Semanal | Encargado | No | Necesario |
| Minutos dedicados | Semanal | Encargado | Bajo | Necesario: es el costo |
| Denominador | Semanal | Encargado | **Sí** | Sólo si CAF-04 lo justifica |
| Ventas, tickets, proveedores, menú, horarios de turno | — | — | **Sí** | Fuera |
| Nombres del personal o de la gerencia | — | — | Identifica personas | Fuera: sólo roles |

**Por medir:** volumen y masa de un día típico por corriente; variación entre días. **Por definir:**
denominador, unidad (CAF-06).

### 5.2 Corrientes y contaminación

**Lo que hay.** La lista doméstica acepta frutas, verduras, «café molido y filtros de papel» y té sin
grapas ni plástico (`plan:141-144`), y excluye carne, lácteos, aceites, alimentos líquidos y «comida con
mucha salsa» (`plan:164-168`). No hay lista de cafetería. No existe ninguna variable de composición
(`dicc-v0.3:554-557`). La contaminación se retira antes de medir (`prot-v0.2:128`) y queda en `A4`, semanal
(`dicc-v0.3:205`); la casilla diaria de contaminantes de la app se retiró (`tabla-corr:189`).

| Corriente | ¿Está en la lista doméstica? | Lectura |
| --- | --- | --- |
| Posos de café y filtros | Sí (`plan:143`) | Es la corriente del precedente (`acta-01:643-644`); su densidad y su comportamiento guardada están por medir |
| Restos de preparación (cáscaras, recortes crudos) | Sí (`plan:141-142`) | Equivale al orgánico doméstico |
| Restos de plato | En buena parte no: cocinado, salsas, lácteos, carne (`plan:164-168`) | Decisión de método |
| Bolsas de té, servilletas usadas | Té sin plástico (`plan:144`); servilletas como **seco** (`plan:156`) | Si una servilleta usada es seco o contaminante lo decide el método |
| Alimento preparado no vendido | No aparece | Decisión de método; además, dice algo de la operación [Inferencia] |

**La brecha.** Qué corrientes acepta el proceso es una **decisión de método** y el repositorio no la
toma para cafeterías: queda abierta (CAF-03). Para la medición importa por dos razones [Inferencia]:
cada corriente tendrá su propia densidad (el contraste de EPA 2016 es sólo para «residuo de alimentos
suelto», `dicc-v0.3:522`), y la separación la hacen varias personas con prisa, a veces el cliente, así
que la contaminación es más probable que en una casa.

**Contaminación [Propuesta], de menos a más carga:** (a) sólo «retiramos material que no iba», semanal,
como `A4`; (b) «contaminación visible: sí / no» en cada entrega, que ve quien entrega y quien recibe;
(c) una vez, en la visita de cierre, el equipo separa y pesa lo impropio de un recipiente, sin describir
alimentos (`dicc-v0.3:554-557` se mantiene). Qué cuenta como impropio lo dice el método.

### 5.3 Medición

**Lo que hay.** El hogar mide en botes al echar (`prot-v0.2:123-143`); puede anotar todo al final del
día (`plan:290`); el renglón semanal dura menos de un minuto (`prot-v0.2:147`). El equipo hace los
pares de densidad el día 28 (`prot-v0.2:409-422`) con básculas especificadas y verificadas
(`prot-v0.2:446-450`).

| | Hogar | Cafetería [Propuesta] |
| --- | --- | --- |
| Quién mide | La misma persona de siempre | Quien vacía el recipiente chico al contenedor de almacenamiento, en cualquier turno |
| Cuándo | Al echar, después de retirar y trocear | Al vaciar o al cerrar el turno; **nunca durante el servicio** |
| Con qué | Bote de ~1 L calibrado | Recipiente calibrado por corriente (gesto «hasta el borde, sin apretar», `prot-v0.2:220-221`) o báscula si ya existe (CAF-06) |
| Dónde se anota | Hoja 2, un renglón por día | **Hoja de pared** junto a los contenedores: una raya por recipiente lleno, por corriente; el encargado cierra el día con el número |
| Equivalente del registro diario | `ORG`, `SEC` | Recipientes por corriente y día (y turno, si CAF-07 lo pide), con «cerrado» para días sin operación |
| Equivalente de la fuga semanal | `FUGA` + `FUGA_MOT` | Renglón semanal del encargado: recipientes separados que no llegaron al destino, con motivos de logística (matriz, fila 4) |
| Verificación externa | Pesaje y densidad el día 28 | Pares de densidad por corriente en la visita, **y** conteo o pesaje de quien recibe en cada entrega |

El conteo de quien recibe da un **balance**: lo que salió de la cafetería contra lo que llegó al
destino. Una diferencia se marca como señal, igual que las reglas de consistencia domésticas
(`dicc-v0.3:468-471`) [Propuesta].

**Lo que la cafetería no puede medir.** Lo que nunca se separó. Como en el hogar, la generación
estimada es una cota inferior (`dicc-v0.3:514`). Sólo un negocio que consienta permite estimarlo: una
revisión puntual de la basura común en la visita de cierre, pesando la fracción orgánica sin describir
alimentos [Propuesta]; con su costo de privacidad, va a CAF-03.

**Báscula.** Capacidad por definir después de medir un día típico; se reutiliza la regla de RE-05
(capacidad ≥ recipiente lleno + tara, `acta-01:605-606`). **Por medir:** recipientes por día y corriente,
densidad por corriente, minutos por turno. **Prueba de usabilidad** [Propuesta]: la del renglón semanal
(`prot-v0.2:629`) y la de llenado diario (`prot-v0.2:631`), hechas en un turno real con hora pico.

### 5.4 Destino y logística

**Lo que hay.** Nada: el hogar composta en su patio; no hay transporte, y el único almacenamiento es
guardar «para el siguiente depósito» (`plan:203`) o hasta la visita del día 28 (`prot-v0.2:165-166`),
sin tiempo máximo en ningún caso (§8, hallazgo 2). Durante el mes 1 no se abre un segundo contenedor
(`acta-01:558-559`). El precedente muestra qué pasa cuando una corriente se separa sin destino
(`acta-01:643-644`).

**Opciones de destino** (detalle y pros y contras en CAF-01): composta en la cafetería · acopio del
programa (el diseño previo, según el Encargo) · recolección del programa hacia composteras existentes ·
servicio de un tercero.

**Requisitos antes del día 1 [Propuesta]** — sin ellos no se separa nada:

1. Destino **nombrado** y que **aceptó** las corrientes de CAF-03.
2. Capacidad del destino frente a la generación de la cafetería; las dos por medir.
3. **Tiempo máximo de almacenamiento**, por definir (CAF-02).
4. **Plan B escrito** para cuando se vence: qué se hace con lo guardado, quién lo decide (el programa,
   no quien lo tiene en la mano) y cómo se anota.
5. Frecuencia de recolección y quién recoge (rol), por definir; debe ser compatible con 3.
6. Contenedores: número, capacidad, tapa y quién los limpia; por definir.

**Instrumento nuevo [Propuesta]: registro de entregas** (cadena de custodia). Por cada entrega: fecha,
hora, recipientes por corriente, condición visible (olor, moscas, moho: sí / no), quién entrega (rol),
quién recibe (rol) y clave del destino. Lo llenan las dos partes; es lo que vuelve medible el
cumplimiento del programa.

**Si el destino es una compostera doméstica del piloto,** lo que entra de fuera se suma a su `ORG` y
contamina su `ENT_LPS` (§8, hallazgo 3): necesitaría una casilla aparte en la ficha del hogar.

### 5.5 Higiene y regulación

**Lo que hay.** Nada sobre negocios de alimentos. Las normas que cita el repositorio son de calidad de
composta y de suelo, usadas como referencia y no como cumplimiento (`mes-2:57-62`, `mes-2:74-82`,
`mes-2:166`), y el propio documento advierte que no pudo consultarlas (`mes-2:9-12`).

**Lo que cambia [Inferencia].** Guardar orgánicos dentro de un establecimiento que maneja alimentos
añade riesgos que en una casa son privados: plagas, olores, escurrimientos, limpieza de contenedores,
ubicación respecto de las áreas de alimentos y quién responde ante un incidente o una inspección. El
programa no debe pedir a la cafetería nada que choque con sus obligaciones.

**Normas por verificar.** Este análisis **no consultó ninguna**; la lista es de candidatas y no dice qué
exigen. Título, vigencia y aplicabilidad: por verificar.

| Norma o instrumento | Por qué podría aplicar [Inferencia] | Qué exige |
| --- | --- | --- |
| NOM-251-SSA1-2009 | Higiene en establecimientos que procesan alimentos | Por verificar |
| NOM-256-SSA1-2012 | Servicios de control de plagas, si la cafetería los contrata | Por verificar |
| Ley General para la Prevención y Gestión Integral de los Residuos y su reglamento | Clasificación de generadores y de residuos | Por verificar |
| NOM-161-SEMARNAT-2011 | Residuos de manejo especial sujetos a plan de manejo | Por verificar |
| Ley y normas locales de residuos (en la Ciudad de México, la Ley de Residuos Sólidos y la NADF-024-AMBT-2013) | Separación, almacenamiento y recolección. El repositorio cita normas de la CDMX (`mes-2:74-82`) pero no dice dónde opera el programa | Por verificar |
| NADF-020-AMBT-2011 y NMX-AA-180-SCFI-2018 | Ya citadas (`mes-2:57-82`); pesan si la cafetería o el acopio producen o entregan composta | Por verificar (el repositorio ya lo deja pendiente) |
| Reglamentos del inmueble o de la institución (si la cafetería está dentro de una escuela u oficina) | Dónde y cuánto tiempo se puede guardar | Por verificar |
| NMX-F-605-NORMEX (Distintivo H), si la cafetería lo tiene | Es voluntario; el piloto no debería ponerlo en riesgo | Por verificar |

**[Propuesta]** Observar el almacenamiento con un vocabulario propio y descriptivo en cada entrega y en
el cierre (olor al abrir, moscas, moho, roedores o huellas, escurrimiento), con códigos nuevos y no con
`FAU` u `OLOR`, que describen composta. Quién verifica y qué detiene el piloto: CAF-13 y CAF-14.

### 5.6 Roles y compromiso

**Lo que hay.** El hogar opera, registra y avisa (`plan:87-97`); el coordinador transcribe, lleva la
bitácora y guarda la lista de claves (`plan:64-78`); el equipo mide el día 1 y el 28 y nadie visita su
propia casa (`plan:80-85`). El compromiso es de un lado: el hogar se compromete con su composta.

| Rol en la cafetería [Propuesta] | Qué hace | Equivalente doméstico |
| --- | --- | --- |
| Dueño o gerencia | Autoriza, firma el acuerdo, decide salir | — (nuevo) |
| Encargado o enlace (un rol, no un nombre) | Cierra el día, llena el renglón semanal, manda la foto | El hogar |
| Personal de turno | Separa, vacía, raya la hoja de pared | El hogar |
| Programa: coordinación | Transcribe, lleva la bitácora y el registro de entregas | Coordinador |
| Programa: logística | Recoge, cumple la frecuencia, aplica el plan B | — (nuevo) |
| Programa: equipo técnico | Calibra, mide densidades, visita | Equipo técnico |

**Lo que reemplaza el compromiso de 28 días [Propuesta]:** un **acuerdo de participación** de dos
partes (CAF-09). La cafetería se compromete a separar, anotar y guardar según las reglas; el programa,
a recoger con la frecuencia acordada, a dar contenedores y a aplicar el plan B. Como el programa asume
la logística, su cumplimiento también se mide (§5.8). Se conserva «cualquier pregunta puede quedar en
blanco» (`plan:92`) y se añade cómo salir y qué pasa con lo guardado al salir.

**Por medir:** minutos por turno y por semana (análogo de `MIN_S`, `dicc-v0.3:203`); cuántas personas
hay que capacitar y cada cuánto cambia el personal. **Capacitación** [Propuesta]: la sesión del día 1
(`prot-v0.2:86-96`) pasa a ser breve, en el lugar y por turno, repetible para personal nuevo.

**Precedente.** Si la cafetería del precedente participa, aplica la lógica de RE-08: estrato propio y
visita de otra persona (`acta-01:659-664`) — CAF-17.

### 5.7 Modelo de datos y app

**Lo que hay.** La app publicada es del hogar (`app.js:52-67`), acepta sólo `H1`–`H5` (`app.js:74`) y
todavía exporta `responsable` y `tipo_residuo` (`app.js:202-203`). La especificación, sin código, la
convierte en captura del coordinador para cinco hogares (`espec-app:26-32`, `espec-app:74-91`), con
`datos.js` como fuente única, `vocabulario.json` que sólo crece por adición y un lint de prohibiciones
(`espec-app:60-72`, `espec-app:169-178`; P-24). Su CSV largo no depende del tipo de fuente
(`espec-app:144-146`). Ningún archivo nuevo de la especificación añade dependencias.

**¿Generalizar o separar?** Opciones y pros y contras en CAF-08. **[Propuesta]** Instrumentos y
diccionarios **separados** (una ficha y un diccionario de cafeterías), con lo común compartido por
referencia: convenciones de ausencia (`dicc-v0.3:63-94`), regla de multimarca (`dicc-v0.3:300-320`),
«se marcan, no se corrigen» (`dicc-v0.3:468-471`), privacidad y el CSV largo con la serie del papel en
`ficha_rev`. Generalizar a una «fuente con tipo» **cuando las dos fichas estén congeladas**, no antes:
la doméstica no lo está, y la secuencia es semántica → protocolo → usabilidad → diseño → digitalización
(`anexo-DA:33`). En la app nada de cafeterías antes de que exista el código de la migración doméstica
(`espec-app:183-191`); mientras tanto, papel. Sin dependencias nuevas.

**Tipo de residuo: ¿papel o app?** El retiro de `tipo_residuo` se justificó como registro dietético de
una casa (`hallazgos:72-88`, `rev-01:210-215`) y la tabla pide no reconectarlo «creyendo que fue un
olvido» (`tabla-corr:34-35`). En una cafetería la corriente puede ser necesaria para operar (CAF-03).
Dos restricciones del repositorio acotan la respuesta:

- **«Sólo en papel» choca con D5** si la casilla está en la ficha: el papel es el registro y la app lo
  transcribe, y el criterio de aceptación es «sin una sola casilla sin destino» (`espec-app:195-196`).
  Sólo cabe si se declara fuera de la app, como la bitácora y la concordancia (`espec-app:34-36`).
- **En la app** sólo como **código nuevo, vocabulario cerrado y nunca texto libre** —el campo retirado
  era texto libre con «Frutas, verduras, café, etc.» (`hallazgos:74-76`)—, con justificación escrita en
  el diccionario de cafeterías. Las prohibiciones del lint (`espec-app:173`) y la prueba de privacidad
  (`test-cobertura:201-206`) tendrían que distinguir «corriente» de «tipo de residuo» a propósito.

**Campos que identifican personas o exponen el negocio [Propuesta]:**

| Campo candidato | Riesgo | Veredicto |
| --- | --- | --- |
| Nombre de la cafetería, dirección, teléfono | Identifica el negocio | Sólo en la lista de claves, fuera del repositorio (`dicc-v0.3:562-567`) |
| Nombre del encargado o del personal | Identifica personas | Fuera; sólo rol, como `BIT_ROL` (`dicc-v0.3:439`) |
| Ventas, tickets, clientes, comidas servidas | Expone el negocio | Fuera, salvo que CAF-04 lo justifique; en bandas y en la capa restringida |
| Compras, proveedores | Expone el negocio | Fuera |
| Menú o platillos | Expone el negocio; análogo de «qué se come» | Fuera |
| Horarios de turno y de recolección | Rutina del negocio, como `DREV` (`dicc-v0.3:558-560`) | Sólo dentro del equipo |
| Número de personas del personal | Bajo | En bandas, si se usa para el costo de tiempo |
| Fotos | Logotipos, fachada, clientes, personal | Sólo el interior del contenedor, sin ubicación (`dicc-v0.3:571-574`) |

**Formato del modelo de residuos.** El repositorio sólo fija `ENT_LPS`, `FUGA_L` y un factor kg/L, sin
composición, y dice que la composición saldrá de estudios publicados (`acta-01:743-745`). No hay
esquema de archivo. **[Propuesta]** Entregar los análogos: entrada por corriente y semana, fuga y un
factor kg/L por corriente; lo demás, preguntarlo (CAF-12).

**Claves.** `ID` es una opción cerrada `H1`–`H5` en el diccionario, la app y la especificación
(`dicc-v0.3:104`, `app.js:74`, `espec-app:79`). El prefijo de cafetería no debe chocar con valores ya
usados: `H` (hogar y humedad), `O` (olor y observador), `E` (equipo), `F`/`FG`, `A`, `M`, `X`, `P`
(parches), `S` (semanas y escenarios), `REG` (§8, hallazgo 1). Prefijo por definir.

### 5.8 Ciclo y criterios de éxito

**Lo que hay.** Cuatro semanas con renglón semanal y visita de cierre (`plan:224-384`); criterios de
proceso, «5 de 7» (`plan:473-495`); un hogar con la composta oliendo mal y el registro impecable
aprueba (`plan:475-477`). D1 rechazó la semana de sólo medir y aceptó perder la línea base previa
(`acta-01:89`, `acta-01:98-100`).

**¿Sigue sirviendo?** [Inferencia] Como **ventana de medición**, 28 días sí. Pero: (1) una cafetería
puede cerrar días, así que los criterios se cuentan sobre días con operación; (2) la visita del día 28
pierde su centro si la composta no está ahí (CAF-11); (3) la semana de línea base que los hogares no
tuvieron aquí tiene sentido: medir y dejar que la corriente siga su camino habitual evita guardar sin
destino y da el antes de la intervención (CAF-10).

| Criterio doméstico | Análogo en cafetería [Propuesta] |
| --- | --- |
| #1 Registró el diario (5 de 7 renglones) | Registró los días con operación (proporción por definir) |
| #2 Llenó el renglón semanal | Igual |
| #3 Sostuvo la rutina de depósito | Separó en las semanas con operación |
| #4 La rutina cupo en su semana (≤ 30 min, `plan:487`) | Minutos por turno; umbral por definir después de medir |
| #5 Identificó su cuello de botella | Igual, con opciones de logística y personal |
| #6 Puede estimar su entrada semanal | Entrada por corriente calculable (con o sin denominador, CAF-04) |
| #7 Puede dimensionar su contenedor | Puede dimensionar almacenamiento y frecuencia de recolección |
| — | **Nuevo, del programa:** recolecciones a tiempo |
| — | **Nuevo, del programa:** ningún lote superó el tiempo máximo |
| — | **Nuevo, del programa:** ningún lote tuvo un destino que el programa no decidió |

Los tres nuevos miden al programa, no a la cafetería: el precedente fue una falla del programa
(`acta-01:643-644`). Si un incidente sanitario se describe o detiene, como en la tabla verde / ámbar /
rojo del pre-registro (`acta-01:703-706`), es CAF-14.

---

## 6. Decisiones abiertas

Preguntas que sólo el equipo puede responder. «Inclinación» es de este análisis **[Propuesta]**.

### CAF-01 · ¿A dónde va lo que se separa? — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Composta en la cafetería | Sin transporte ni almacenamiento largo; la ficha doméstica se reutiliza casi entera | Espacio, olor y plagas dentro de un negocio de alimentos (§5.5); el personal opera una composta, no sólo separa; capacidad por medir |
| b) Acopio del programa | Concentra el método en un lugar con responsable; es el diseño previo según el Encargo | Almacenamiento y transporte entre los dos puntos; el acopio necesita su propia ficha; no está en el repositorio |
| c) Recolección hacia composteras existentes (domésticas o comunitarias) | Sin infraestructura nueva | Capacidad acotada (regla del 80 % y sin segundo contenedor, `plan:205-217`); contamina la entrada del hogar receptor (§8, hallazgo 3); es lo que pasó en el precedente sin decisión |
| d) Servicio de un tercero | Logística ajena | Costo; Miltli deja de ver lo que pasa después; hay que verificar que acepte las corrientes |

También: ¿sigue vigente el diseño previo con acopios? **Inclinación:** decidir el destino y
dimensionarlo con una semana medida antes de pedir a nadie que separe.

### CAF-02 · Tiempo máximo de almacenamiento y plan B — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Número fijo, por definir con quien opera el método y con la verificación sanitaria | Claro para el personal; se audita con el registro de entregas | Hay que justificar el número con una fuente; puede no cuadrar con la frecuencia posible |
| b) Lo fija la frecuencia de recolección que el programa sostiene | Realista | Convierte una limitación logística en regla sanitaria |
| c) Por condición observable (olor, moho) | No requiere número | Se detecta cuando ya falló, que es el precedente [Inferencia] |

Plan B: a la basura y anotado como fuga «sin recolección» · destino de respaldo nombrado · pausar la
separación. **Inclinación:** (a), con el plan B escrito antes del día 1 y anotado en la bitácora el
mismo día en que se aplique.

### CAF-03 · Qué corrientes acepta el método y qué contaminación tolera — **bloquea la ficha**

Decisión de método, no de Miltli (Encargo). Opciones: a) sólo posos de café · b) posos y restos de
preparación, lo que la lista doméstica ya acepta (`plan:141-144`) · c) también restos de plato.

| Opción | A favor | En contra |
| --- | --- | --- |
| a) | Una corriente, una densidad, poca contaminación [Inferencia]; es la del precedente | Puede ser una parte pequeña del total (por medir) |
| b) | Coincide con lo que el piloto doméstico ya sabe manejar | Dos corrientes, dos densidades |
| c) | Más volumen desviado | Cocinados, salsas y lácteos que el método doméstico excluye (`plan:164-168`); más riesgo sanitario |

También: ¿se hace una revisión puntual de la basura común para estimar lo no separado (§5.3)?

### CAF-04 · Unidad de normalización — **bloquea la ficha**

Opciones en §5.1: ninguna (absoluta por día de operación) · clientes · comidas servidas · kg comprados
· personal por turno · categoría del establecimiento. **A favor de la absoluta:** no pide datos del
negocio y siempre se puede reportar. **En contra:** no compara cafeterías de distinto tamaño.
**Inclinación:** absoluta siempre; denominador sólo si el modelo lo exige (CAF-12), en bandas y en la
capa restringida.

### CAF-05 · ¿Se registra la corriente, y dónde? — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) No se separa por corriente | Ficha más simple; nada que justificar | Mezcla densidades; inútil si el método trata distinto cada corriente |
| b) Columnas por corriente en el papel y códigos cerrados en la app | Cumple D5 y «ninguna casilla sin destino» (`espec-app:195-196`) | Reabre la discusión de `tipo_residuo`; hay que ajustar lint y prueba de privacidad a propósito |
| c) Columnas en el papel, la app sólo captura el total | Menos campos en la app | Choca con D5 salvo que se declare fuera de la app (`espec-app:34-36`); se pierde la corriente en el análisis |
| d) Corriente sólo en un ejercicio aparte, acotado y voluntario | Es la salida que ya proponía `rev-01:259-261` | No sirve para operar el día a día |

**Inclinación:** si CAF-03 acepta más de una corriente con manejo distinto, (b); si una, la pregunta
desaparece.

### CAF-06 · ¿Volumen o masa en la cafetería? — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Recipientes calibrados por corriente | Mismo método que el hogar; masa con los pares del equipo | Error de llenado; un recipiente por corriente |
| b) Báscula de la cafetería | Masa directa (`anexo-DA:19`) | Hay que verificarla (`dicc-v0.3:452-462`); usar la báscula de alimentos para residuos es por verificar (§5.5) |
| c) Conteo de contenedores; masa sólo de quien recibe | Casi sin carga para el personal | Resolución gruesa; depende del destino |

### CAF-07 · Quién anota, cuándo y con qué detalle — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Cada turno su renglón | Detecta qué turno no separa | Más casillas; expone la rutina del negocio |
| b) El encargado cierra el día con la hoja de pared | Un solo responsable por día | Depende de que el turno haya rayado |
| c) Sólo quien recibe, al recoger | Ninguna carga en la cafetería | Sin dato diario; sin fuga |

**Inclinación:** (b) con la hoja de pared, más el conteo de quien recibe como balance.

### CAF-08 · Modelo de datos: ¿«fuente con tipo» o modelos separados? — no bloquea la ficha; bloquea la app

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Generalizar ahora: `fuentes` con `tipo_fuente` | Una sola app y un solo análisis | Toca un diccionario y una especificación sin congelar; acopla la cafetería a PROPUESTAS domésticas |
| b) Modelos separados para siempre, exportación común | Cada ficha evoluciona sola | Duplica código y reglas comunes |
| c) Separados ahora; generalizar al congelar las dos | Respeta el orden semántica → digitalización (`anexo-DA:33`); se generaliza con dos casos reales | Una migración más adelante |

**Inclinación:** (c).

### CAF-09 · Forma y contenido del acuerdo con la cafetería — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Acuerdo verbal | Rápido | Nada que consultar cuando falla la recolección |
| b) Carta breve firmada por la gerencia, con compromisos de las dos partes | Deja escritos destino, tiempo máximo, plan B y salida | Requiere redactarla y que alguien la firme |
| c) Convenio institucional | Formal | Lento; desproporcionado para un piloto [Inferencia] |

Contenido mínimo [Propuesta]: duración; qué hace cada parte; qué **no** se pide (ventas, nombres);
cómo se sale y qué pasa con lo guardado; a quién se avisa un incidente.

### CAF-10 · ¿28 días desde el día 1, o con una semana de línea base? — **bloquea la ficha**

| Opción | A favor | En contra |
| --- | --- | --- |
| a) 28 días, separando y entregando desde el día 1, como D1 | Comparable con el piloto doméstico | Sin línea base previa, como en los hogares (`acta-01:98-100`) |
| b) Semana de línea base (medir; la corriente sigue a su destino habitual) y luego 28 días | Nada se guarda sin destino; da el antes de la intervención; dimensiona destino y recolección con datos | Una semana más; medir ya cambia la conducta (RE-09, `acta-01:677-680`) |
| c) Ciclo según la frecuencia de recolección | Se ajusta a la logística | No comparable con el hogar |

### CAF-11 · ¿Qué es la visita de cierre si la composta no está en la cafetería? — **bloquea la ficha**

Opciones: a) en la cafetería: almacenamiento, pares de densidad por corriente, entrevista de cierre ·
b) en el destino: estado de la composta con la Hoja 4 doméstica · c) las dos. **A favor de (c):** cada
lugar mide lo que es suyo. **En contra:** dos visitas y dos instrumentos.

### CAF-12 · ¿Qué necesita el modelo de residuos de una fuente no doméstica? — bloquea el denominador

Preguntas para el proyecto universitario: unidad (L o kg); resolución (día o semana); denominador;
corrientes separadas o total; categoría del establecimiento; formato de archivo. **Opción a)** adaptar
el registro a la respuesta: el modelo queda servido, pero puede pedir datos del negocio. **Opción b)**
entregar el mínimo de §5.1 y que el modelo se adapte: privacidad intacta, posible pérdida de utilidad.

### CAF-13 · Verificación sanitaria y responsabilidad — **bloquea la ficha**

¿Quién verifica las normas de §5.5 —la cafetería con sus propias obligaciones, una asesoría del
programa, ambas— y quién responde ante un incidente o una inspección? **A favor** de que verifique la
cafetería: conoce sus obligaciones. **En contra:** el programa le estaría pidiendo algo que no evaluó.

### CAF-14 · Un incidente de almacenamiento, ¿se describe o detiene?

| Opción | A favor | En contra |
| --- | --- | --- |
| a) Se describe, como el estado de la composta en los hogares (`plan:475-477`) | Coherente con el piloto doméstico | En un negocio de alimentos un incidente tiene consecuencias fuera del piloto [Inferencia] |
| b) Condición de paro escrita antes del día 1 (rojo del pre-registro) | Protege a la cafetería y al programa | Hay que definir qué es incidente sin juicios vagos |

### CAF-15 · Publicación y reidentificación

Con una o pocas cafeterías, cualquier número publicado la identifica [Inferencia]. Opciones: a) sólo
agregados cuando haya varias · b) con consentimiento, nombrarla · c) no publicar por cafetería mientras
el número sea pequeño. Lo que sale del grupo va agregado (`dicc-v0.3:568-570`).

### CAF-16 · Orden de trabajo frente a la ficha doméstica en revisión — **bloquea la ficha**

`ficha/readme:6-7` dice que la ficha de cafeterías se crea cuando la doméstica «sea satisfactoria».
Opciones: a) esperar a congelar F-HOG rev. 03: nada se rehace · b) redactar en paralelo sobre lo firme
(D1–D6) y dejar huecos donde la doméstica tiene PROPUESTAS: se gana tiempo, pero hay que reconciliar al
congelar.

### CAF-17 · La cafetería del precedente

¿Es candidata? Si participa: estrato propio y visita de otra persona (RE-08), y su lote anterior queda
registrado sólo como imprevisto en la bitácora (`bitacora:38-41`), sin decir de dónde vino ni quién lo
llevó.

---

## 7. Esqueleto de la ficha de cafeterías

Sólo encabezados, espejo de F-HOG rev. 03. Nombre de la serie **[Propuesta]**: `F-CAF`. Las marcas
dependen de CAF-01: «sólo con composta en sitio» quiere decir que el encabezado desaparece si el
destino está fuera.

| Hoja | Encabezado doméstico (`F-HOG:línea`) | Encabezado de cafetería | Marca |
| --- | --- | --- | --- |
| 0 | — | Antes del día 1: condiciones de arranque (destino, tiempo máximo, plan B, acuerdo, verificación sanitaria) | nuevo |
| 1 | Arranque (593) | Arranque | adaptar |
| 1 | El orden del piloto, de principio a fin (606) | El orden del piloto, de principio a fin | adaptar |
| 1 | Parte A · sólo el día 1 (616) | Parte A · sólo el día 1 | reutilizar |
| 1 | La medida de esta casa (623) | La medida de esta cafetería: recipientes de cada corriente | adaptar |
| 1 | Lo que mide el equipo, no la casa (641) | Lo que mide el equipo, no la cafetería | adaptar |
| 1 | Cómo arrancó tu composta (649) | Cómo arrancó la composta — sólo con composta en sitio | adaptar |
| 1 | Cómo es esta casa y esta composta (667) | Cómo es esta cafetería y su manejo de residuos | adaptar |
| 1 | — | Destino, almacenamiento y recolección | nuevo |
| 1 | — | Turnos y quién anota (por rol) | nuevo |
| 1 | Cómo se cuidan tus datos (727) | Cómo se cuidan los datos de la cafetería y de su personal | adaptar |
| 2 | Registro diario (747) | Registro por día de operación | adaptar |
| 2 | El orden de cada carga (762) | El orden de cada separación y vaciado | adaptar |
| 2 | Cómo se cuenta (773) | Cómo se cuenta | adaptar |
| 2 | Tabla de 28 renglones | Tabla por día (y turno), una columna por corriente, con «cerrado» | adaptar |
| 2 | — | Entregas y recolecciones del día | nuevo |
| 3 | Renglón semanal (846) | Renglón semanal | reutilizar |
| 3 | Fecha · personas · minutos | Fecha · días con operación · minutos del personal | adaptar |
| 3 | Cómo anoté esta semana | Cómo anotamos esta semana | reutilizar |
| 3 | Lo que no llegó a la composta · por qué | Lo que no llegó al destino · por qué | adaptar |
| 3 | — | Contaminación que se retiró o se vio | nuevo |
| 3 | Material seco que usé | Material seco — sólo con composta en sitio | adaptar |
| 3 | Qué tan lleno está el contenedor | Almacenamiento: contenedores llenos y días sin recolección | adaptar |
| 3 | ¿Qué hiciste esta semana? | Qué hicimos esta semana | adaptar |
| 3 | Regla del 80 % | Regla de parada: tiempo máximo y plan B | adaptar |
| 3 | Lo que quieras contar de cada semana (933) | Lo que quieran contar de cada semana | reutilizar |
| 4 | Cierre (951) | Cierre | reutilizar |
| 4 | Parte B · sólo el día 28 (963) | Parte B · sólo el día de cierre | reutilizar |
| 4 | — | Revisión del almacenamiento, junto con el equipo | nuevo |
| 4 | Revisión de la composta, junto con el equipo (968) | Revisión de la composta — sólo con composta en sitio | reutilizar |
| 4 | Cómo terminó el piloto en esta casa (1046) | Cómo terminó el piloto en esta cafetería | adaptar |
| 4 | Lo que quieras dejar dicho (1090) | Lo que quieran dejar dicho | reutilizar |
| Pie | F-HOG rev. 03 · Hoja N de 4 (740) | Serie propia · Hoja N de M | adaptar |

**Instrumentos que la acompañan:**

| Doméstico | Cafetería | Marca |
| --- | --- | --- |
| Hoja guía (`guia`) | Guía de separación, almacenamiento y entrega para el personal | nuevo |
| Registro técnico del equipo (`RT`) | Registro técnico: recipientes, almacenamiento, pares de densidad por corriente | adaptar |
| Hoja de concordancia (`concordancia`) | Sólo si hay variables que clasificar | adaptar |
| Bitácora del programa (`bitacora`) | La misma, con claves de cafetería y tipos de logística | reutilizar |
| — | Registro de entregas (cadena de custodia) | nuevo |
| — | Acuerdo de participación (no es un instrumento de datos) | nuevo |
| — | Ficha del destino o del acopio, si lo hay | nuevo (fuera de esta ficha) |

---

## 8. Hallazgos de paso

No se corrigió ninguno.

1. **Prefijos que chocan en la hoja de concordancia.** El observador se escribe «`O___`»
   (`concordancia:70`, `dicc-v0.3:419`) en la misma hoja donde el olor se marca `O0`…`O5`
   (`concordancia:187-191`, `dicc-v0.3:257`). En la misma tabla, `CONC_ITEM` usa `H#` para un hogar y
   `CONC_REF` usa `H1`…`H5` para un nivel de humedad (`dicc-v0.3:421-422`). Al transcribir a mano,
   «O2» o «H3» se leen de dos maneras.
2. **Ningún documento fija un tiempo máximo de guardado.** Ni la regla de «menos de ½ bote: se guarda
   para el siguiente depósito» (`plan:203`, `prot-v0.2:140`) ni el residuo guardado del día 28
   (`prot-v0.2:143`, `prot-v0.2:165-166`). Es el mismo hueco que dejó pasar el precedente.
3. **Una entrada externa a una compostera del piloto contaminaría `ENT_LPS`.** La bitácora anotaría el
   café con el `H#` del hogar al que llegó (`bitacora:38-41`), pero la Hoja 2 no tiene cómo separarlo
   de `ORG`, y `ENT_LPS` = Σ `ORG_L` / `PERS_S` (`dicc-v0.3:513`) lo contaría como entrada de esa casa.
   Ninguna regla prohíbe recibir orgánicos de fuera.
4. **La prueba de privacidad lee una lista fija de archivos** (`test-cobertura:201-206`). Una ficha
   nueva no queda cubierta hasta que alguien la añada; y, si menciona «tipo de residuo», fallará en
   cuanto se añada. Las dos cosas deben decidirse a propósito.
5. **Número de hogares.** El objetivo del plan dice «entre tres y cinco participantes» (`plan:14-15`);
   el README, «cinco hogares» (`README:3`), y el plan mismo asigna `H1`–`H5` (`plan:241`).
6. **Notación de la proporción invertida.** El README dice «Regla 1:2» (`README:38`), como el plan
   (`plan:184`: un bote húmedo, dos de seco); la app muestra «proporción 2:1» (`app.js:325`).
7. **Ya documentados y todavía vigentes.** La app exporta `responsable` y `tipo_residuo`
   (`app.js:202-203`) y la prueba espera «Ana» en el CSV (`test-app:24`, `test-app:32`); la app dice
   «Semana 1: solo se mide» (`app.js:368`), contra D1. Están anotados en `README:29-32`,
   `espec-app:180-181` y `acta-01:817-819`.
8. **La clave del hogar está cerrada en tres capas** (`dicc-v0.3:104`, `app.js:74`, `espec-app:79`). No
   es un error para el piloto de cinco hogares, pero cualquier escala nueva la toca en las tres.

---

## 9. Fuentes

**Del repositorio** (rama `claude/new-session-pe41c4`, commit `f6c885a`), leídos para este análisis:
`README.md`; `planes/plan_trabajo.md`; `package.json`; `.gitignore`; en `ficha/`: `readme.md`,
`acta-01-decisiones-piloto.md`, `diccionario-de-datos-v0.3-borrador.md`,
`protocolo-operativo-v0.2-borrador.md`, `especificacion-cambios-app.md`,
`tabla-de-correspondencia-v0.1.md`, `diseno-mes-2-composta-suelo-gei.md`,
`registro-tecnico-equipo.md`, `plantilla-bitacora-programa.md`, `preregistro/SELLOS.md`,
`miltli-ficha-hogares.html`, `hoja-concordancia.html` (casillas citadas),
`revision-01-lenguaje-medicion-privacidad.md` (§6–§7), `revision-03-…md` (§5),
`hallazgos-app-y-tabla-de-correspondencia.md` (índice y H-2), `contraste-01-…md` (índice),
`anexos-v0.1/Miltli_Decisiones_Arquitectonicas_v0.1.txt` y el texto de los tres `.docx`;
`docs/app.js`, `docs/index.html`; `tests/app.test.js`, `tests/ficha-cobertura.test.js`. `npm test`:
16 pruebas, 16 pasan.

**De la historia de git:** `f13fc34` (commit inicial), `0375226` (primer plan), `aea95b2` (README de
la app estática y mención del servidor Python/SQLite), `fca1364` (app), `a4782a0` (anuncio de la ficha
de cafeterías), `c249eb9` (unificación de ramas), `d389b71` (acta-01), `e9cd9bb`, `e722f0a`, `f6c885a`
(fases 3 a 5). Búsquedas `git log --all -S` de `acopio`, `cafeter`, `escuela`, `departament`,
`negocio`, `htmx`, `Python` y `SQLite`.

**Externas.** Ninguna consultada para este análisis. Las referencias que aparecen (EPA 2016, Ramos et
al. 2024, IPCC 2006) son las que cita el repositorio, en las líneas indicadas. Las normas de §5.5 son
**candidatas por verificar**: no se leyó ninguna.

**Del encargo** (sin respaldo en el repositorio): el precedente con sus detalles (cafetería, dos
semanas), el diseño previo de Piloto 2 con acopios, el proyecto universitario, que Miltli no aporta el
método y que la ficha doméstica se envió a revisión la noche anterior.
