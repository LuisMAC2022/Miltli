# Contraste: ficha vigente (rama `ficha`) frente a las directrices (rama `ficha_colaboracion`)

Fecha del análisis: septiembre de 2026
Ficha analizada: `ficha/miltli-ficha-hogares.html` tras la revisión 01 (3 hojas, medición por botes)
Documento de decisiones de esa revisión: `ficha/revision-01-lenguaje-medicion-privacidad.md`

Este documento no propone cambios al instrumento: registra el estado de la alineación entre los
tres modelos que hoy conviven en el repositorio, y deja anotado qué queda pendiente y en quién recae.

---

## 0. Qué se comparó, y una advertencia sobre el orden de los hechos

| Fuente | Ubicación | Naturaleza |
| --- | --- | --- |
| Ficha vigente | `ficha/miltli-ficha-hogares.html`, rama `ficha` | Instrumento: 3 hojas · arranque y cierre / diario / revisión semanal |
| Diccionario de datos v0.1 | `ficha/Miltli_Diccionario_de_Datos_v0.1.docx`, rama `ficha_colaboracion` | Contrato de datos: qué, quién, con qué frecuencia, para qué |
| Decisiones arquitectónicas v0.1 | `ficha/Miltli_Decisiones_Arquitectonicas_v0.1.docx`, rama `ficha_colaboracion` | 14 criterios de diseño + 5 objetivos de aprendizaje |
| Prompt de protocolo operativo v0.1 | `ficha/Miltli_Prompt_Protocolo_Operativo_v0.1.docx`, rama `ficha_colaboracion` | Método para definir el CÓMO se observa cada variable, con prueba de estrés |
| Plan de trabajo | `planes/plan_trabajo.md`, ambas ramas | Operación del mes, en litros |
| App publicada | `docs/`, ambas ramas | Captura digital local, en litros |

Una advertencia que condiciona la lectura: `git diff ficha origin/ficha_colaboracion` sobre `ficha/`
devuelve **sólo los tres `.docx`**. La rama de colaboración no modificó la ficha, y la revisión 01 se
hizo en la rama `ficha`. Es decir, **los dos trabajos avanzaron en paralelo, sin tocarse**. El resultado
es más interesante de lo que se esperaría: no es que la ficha esté atrasada frente a las directrices,
sino que **cada una va por delante en cosas distintas**, y en un punto van en direcciones opuestas.

---

## 1. ¿En qué se diferencian?

### 1.1 La diferencia de fondo: una es un instrumento, la otra es un contrato

Las directrices definen **qué significa cada dato y quién lo produce**; la ficha define **qué se
observa, en qué momento y con qué palabras**. El prompt cierra con una instrucción explícita —*«No
diseñes todavía la ficha final»*— que la revisión 01 no siguió, porque se hizo sin tener esos
documentos a la vista. El resultado es que la ficha ya trae definiciones operacionales que el
protocolo todavía no había escrito: «cuenta hasta diez a unos 15 cm del centro», «toma un puño y
apriétalo», «acerca la nariz una sola vez». Son exactamente el tipo de definición que pedía el prompt,
pero **viven dentro de la hoja y no están documentadas como protocolo**, así que no se pueden versionar
ni auditar por separado.

### 1.2 Lo que la revisión 01 ya resolvió del pliego de directrices

| Decisión arquitectónica | Estado |
| --- | --- |
| #2 Separar observación de interpretación | **Cumplida, y a fondo.** «Incidencias» desaparece; la hoja 3 dice «ninguna casilla es buena ni mala» y cada señal lleva una glosa descriptiva |
| #4 Masa y volumen igualmente válidos | **Resuelta, y de forma más fuerte que la directriz.** La ficha no ofrece dos vías: estandariza volumen para todos, con el bote calibrado en litros por el equipo. Elimina de raíz el riesgo de partir el conjunto en hogares-gramo y hogares-litro |
| #5 Eliminar el pesaje semanal categorizado | **Cumplida** |
| #7 Humedad reemplaza a lixiviado | **Cumplida y ampliada:** cinco niveles con prueba del puño, el lixiviado pasa a ser el extremo de la escala |
| #12 Hoja A = alta y cierre, Hoja B = diario | **Cumplida.** Se añade una hoja 3 para lo semanal |
| #14 Instrumentación y calidad de datos como prioridad | **Cumplida.** El gesto de llenado fijo y las anclas de temperatura son decisiones de metrología, no de comodidad |
| #1 La ficha como instrumento de medición | **Cumplida** |

A esto se añade algo que las directrices no pedían y que es un aporte propio de la revisión 01: el
**apartado de privacidad**. La eliminación del pesaje categorizado, que el diccionario justificaba por
costo, resultó eliminar de paso un registro dietético del hogar. Ni el diccionario ni las decisiones
arquitectónicas mencionan la privacidad en ninguna de sus 14 entradas.

### 1.3 Lo que sigue divergiendo

#### a) Frecuencia de las variables de estado — la divergencia estructural

El diccionario clasifica HUM, OLOR y FAU como **núcleo, usuario, diario**; TEMP_P como experimental,
usuario, diario. La ficha las mueve **todas a semanal**.

| Variable | Diccionario v0.1 | Ficha vigente | Observaciones por hogar en el piloto |
| --- | --- | --- | --- |
| Humedad (HUM) | Núcleo · diario | Semanal, 5 niveles | 28 → **4** |
| Olor (OLOR) | Núcleo · diario | Semanal, 6 tipos | 28 → **4** |
| Fauna (FAU) | Núcleo experimental · diario | Semanal, 12 grupos | 28 → **4** |
| Temperatura (TEMP_P) | Experimental · diario | Semanal, 4 anclas + vaho | 28 → **4** |

La revisión 01 declara esta pérdida y la acepta a cambio de que el registro se sostenga el mes
completo. Es una decisión defendible, pero conviene ver su tamaño: con cinco hogares, el piloto
completo producirá **20 observaciones de estado**, y menos si alguien se salta una semana.

#### b) Acción / intervención (ACT)

El diccionario la marca **núcleo, usuario, diario, multirrespuesta**, con un uso declarado:
«relacionar acción con evolución». La decisión #6 es aún más explícita: permite estudiar
`Estado_t + Acción_t → Estado_t+1`. La ficha la reduce a una casilla semanal **Sí / No** más texto
libre en un renglón compartido por toda la semana.

Con eso no se puede reconstruir qué se hizo, ni cuándo dentro de la semana, ni antes o después de la
observación. Es la brecha más significativa que queda entre los dos modelos, y afecta directamente al
objetivo de aprendizaje **D** («¿estado, entradas e intervenciones muestran relaciones útiles?»).

#### c) «Registro realizado» — una regresión que no está anotada

El diccionario incluye la variable **Registro realizado (Sí / NR)**, núcleo, con uso literal:
*«distinguir dato ausente»*. La ficha anterior la tenía como columna `✓ / NR`. La ficha vigente la
elimina y la sustituye por una instrucción: *«Si un día no anotaste, deja el renglón vacío y sigue»*.

El efecto es que un renglón vacío ya no se puede leer: puede ser un día sin registro, o un día sin
residuo en el que se olvidó poner el `0`. La distinción entre **ausencia de dato** y **dato cero** se
pierde, que es precisamente lo que la variable existía para evitar. Es la única divergencia que la
propia revisión 01 no lista entre sus costos (§7), y tiene consecuencias aguas abajo: el plan de
trabajo mide «porcentaje de registros completados» y su criterio de éxito #1 es «realiza registros
durante por lo menos tres de las cuatro semanas».

#### d) Códigos — las dos direcciones opuestas

La decisión #10 pide una arquitectura **icono → nombre humano → código**, con niveles internos
(`O0, O1, O2…`), explícitamente para conservar usabilidad **y** facilitar la captura; la #9 pide
diseñar posiciones y códigos consistentes pensando en OMR. La revisión 01 fue deliberadamente en el
sentido contrario: *«tres secciones descriptivas, todas por casilla, sin códigos que memorizar»*.

Las dos posturas tienen razón en su propio terreno y el conflicto es real, no un descuido:

- Para el hogar, la ficha vigente es mucho mejor: prosa reconocible en lugar de letras que hay que
  recordar. La decisión #2 (descripción, no juicio) se cumple mejor sin códigos.
- Para la captura, la ficha vigente es peor que la anterior: no hay ninguna etiqueta corta que sirva de
  puente entre la casilla de papel, la columna del diccionario y el campo de la app. El mapeo tendrá
  que hacerse a mano, una vez por variable, y nadie lo ha escrito.

Hay además dos detalles concretos que empeoran para la captura automática: las cantidades diarias
ahora se escriben como **fracciones manuscritas** (`½`, `1½`), que están entre las peores entradas
posibles para lectura óptica, y el llenado del contenedor se **escribe** como `¼ · ½ · ¾ · casi lleno`
en una celda en lugar de marcarse. La `L M M J V S D` del día de revisión, con dos `M`
indistinguibles al circular, sigue igual que antes.

#### e) Lo que la ficha tiene y el diccionario no contempla

Aquí la relación se invierte: **el diccionario v0.1 ya quedó corto frente a la ficha**.

| Variable nueva en la ficha | ¿Está en el diccionario? | Origen |
| --- | --- | --- |
| Minutos dedicados por semana | No | Lo pedía el plan de trabajo |
| Qué tan lleno está el contenedor (semanal y al cierre) | No | Lo pedía el plan de trabajo |
| Vaho o gotas en la tapa al abrir | No | Nueva: casi objetiva, no requiere tocar |
| Avance de la descomposición (3 niveles) | No | Nueva |
| Textura de la mezcla (3 niveles) | No | El plan tenía «estructura» |
| Dificultad para conseguir material seco | No | Nueva: el cuello de botella más probable |
| Reserva de material seco al arrancar | No | Nueva |
| Semanas sin material seco (cierre) | No | Nueva |
| Tamaño del contenedor percibido | No | Nueva |
| Continuidad el mes siguiente | No | Nueva |
| Personas que comieron en casa, **por semana** | Sólo como dato de alta, una vez | La ficha lo repite porque el denominador cambia |
| Bote de medida y su capacidad en litros | Sí, como «recipiente patrón», sólo para hogares sin báscula | Ahora es núcleo para todos |

Y en sentido inverso, dos variables del diccionario desaparecieron del instrumento: **Registro
realizado** (§1.3.c) y **Composta cosechada** —que el diccionario asignaba al equipo como experimental
y que la ficha eliminó por completo, con el argumento correcto de que instalaba una expectativa de
fracaso, pero sin dejarla en ningún registro del equipo—.

**Consecuencia práctica: el diccionario v0.1 ya no describe el instrumento.** Once variables vigentes
no están en él y tres de las suyas cambiaron de frecuencia o desaparecieron. Si se sigue tratando como
contrato de datos, hay que emitir una v0.2; si no, deja de serlo en los hechos.

#### f) Los dos niveles de medición

La decisión #3 y las filas «Técnica» del diccionario reservan al equipo dos mediciones periódicas:
**caracterización masa/volumen** (para densidad aparente) y **temperatura instrumental** (para validar
la percepción). Ninguna de las dos existe todavía en ningún archivo del repositorio.

La ficha resuelve la densidad de otra manera: un pesaje **único y opcional** de un bote lleno, hecho
por el hogar que tenga báscula. Es más barato, pero no es lo mismo: el diccionario pedía mediciones
**pareadas y periódicas del equipo**, y la validación de la escala térmica contra un termómetro —el
objetivo de aprendizaje **E**— sigue sin tener dónde ocurrir.

### 1.4 La prueba de estrés del prompt, aplicada a la ficha vigente

El tercer documento pide intentar romper cada definición con escenarios ambiguos. Como la ficha ya
existe, la prueba se puede correr ahora. Este es el resultado:

| Escenario del prompt | ¿Lo resuelve la ficha vigente? |
| --- | --- |
| Seca en la superficie y húmeda debajo | **Sí**, autoriza marcar varias casillas. Pero no se registra la zona, así que al analizar no se sabe si es un gradiente normal o un dato contradictorio |
| Se observó una sola mosca | **No.** «Mosquitas que revolotean al abrir» no tiene umbral de cantidad: una mosca y una nube producen la misma marca |
| Larvas que el voluntario no sabe identificar | **No.** No existe casilla «vi algo que no supe identificar». «No vi ninguno de los anteriores» dice otra cosa. El hogar marcará mal o dejará vacío |
| Fría antes de agregar, tibia varias horas después | **No.** No se fija el momento de la revisión semanal respecto de la última carga |
| Se agregaron residuos dos veces el mismo día | **Sí.** «Puedes anotar todo junto al final del día» |
| Bote llenado sin compactar un día y compactado otro | **Sí.** Gesto de llenado fijo y escrito en las tres hojas |
| Se mezcló la pila después de percibir olor | **Parcial.** Se marcan el olor y «cambié algo», pero sin orden temporal dentro de la semana: no se sabe qué ocurrió antes |
| Se seleccionó «otro» y no se escribió la explicación | **Parcial.** Dice «descríbelo abajo», pero el renglón libre es uno por semana y es opcional |

Cuatro de ocho escenarios siguen abiertos, y tres de ellos —umbral de cantidad en fauna, opción «no
lo sé» y momento de observación— se resuelven con cambios pequeños en la hoja 3.

### 1.5 Gobernanza

La ficha y sus decisiones son HTML y Markdown: se versionan, se comparan por líneas, se revisan. Las
tres directrices son `.docx` binarios; `git diff` sólo informa `Bin 0 → 38656 bytes`. El documento que
más va a cambiar —el diccionario— está en el único formato del repositorio que no permite ver qué
cambió.

---

## 2. ¿Cuáles son los riesgos de cada uno?

### 2.1 Riesgos del modelo «ficha» (instrumento primero)

1. **Cuatro puntos por hogar en todas las variables de estado.** Es el riesgo dominante del rediseño.
   Cinco hogares × cuatro revisiones = 20 observaciones de estado en el piloto entero, y una semana
   saltada cuesta el 25 % de un hogar. Los objetivos de aprendizaje **B** (¿las categorías se aplican
   de forma reproducible?) y **D** (¿hay señal biológica?) se apoyan en esa base.
2. **Cumplimiento no medible.** Sin `✓ / NR`, el renglón vacío es ambiguo (§1.3.c). El criterio de
   éxito #1 del plan y su indicador «porcentaje de registros completados» dejan de ser calculables con
   precisión, y no se podrá distinguir un hogar que no generó residuo de uno que no registró: son
   conclusiones opuestas sobre el mismo hogar.
3. **Intervenciones no cruzables con el estado.** Sí/No semanal más texto libre no permite atribuir
   ningún cambio a ninguna acción.
4. **Multimarca sin regla de reducción.** La ficha autoriza marcar «se desmorona» y «escurre agua» a la
   vez, lo cual es correcto —la superficie y el fondo difieren—, pero produce un dato sin orden: no hay
   escala ordinal reconstruible y por tanto no hay tendencia que graficar sin una regla previa
   («predominante», «la peor zona», «registrar ambas como rango»). Esa regla no está escrita y, si se
   decide después de tener los datos, será una decisión tomada mirando el resultado.
5. **Confiabilidad entre observadores en fauna.** Doce grupos que exigen distinguir, por ejemplo,
   larvas de mosca soldado («grandes, planas y café, muy movedizas») de gusanos de mosca doméstica
   («blancos delgados») son una tarea de determinación taxonómica. Sin fotografía ni icono de apoyo
   —y el prompt pregunta explícitamente por cada variable «¿requiere capacitación o ayuda visual?»—
   la concordancia entre dos personas será baja, y la fauna es justamente donde la ficha más apostó.
6. **Captura sin puente.** Sin códigos, sin etiquetas cortas y con fracciones manuscritas, la
   transcripción a datos será manual y no reproducible, y el mapeo hacia la app no está escrito (§1.3.d).
7. **Densidad estimada sobre una o dos mediciones.** Un pesaje opcional por hogar, de un solo bote, un
   solo día, de una sola mezcla, es una base frágil para convertir litros a kilos de todo el grupo.
   La ficha lo presenta con más confianza de la que el dato soporta. La mitigación existe y está en el
   diccionario: que esa medición la haga el equipo, pareada y en dos momentos.
8. **Retiro de material no compostable, sin registro.** La ficha anterior lo tenía; la vigente no, y el
   plan lo pide («presencia de materiales no aceptados»). Es además uno de los casos que el diccionario
   señalaba como disparador de nota obligatoria.
9. **Sin campo de entrega ni acuse.** El plan y la app suponen un circuito semanal con coordinador; la
   hoja de papel sigue fuera de él.
10. **Desalineación con el resto del repositorio.** La propia revisión 01 lo anota en su §8: la app
    captura gramos, el `README.md` describe gramos y el plan conserva las categorías antiguas. Mientras
    dure, hay dos semánticas vivas y ninguna advertencia visible para quien abra la app.

### 2.2 Riesgos del modelo «directrices» (semántica primero)

1. **El contrato ya no describe el instrumento.** Once variables vigentes no están en el diccionario
   v0.1 (§1.3.e). Un contrato de datos desactualizado es peor que no tenerlo: da una falsa sensación de
   que el esquema está fijado, y quien analice los datos partirá de un documento que no corresponde a
   las hojas que llenaron los hogares.
2. **El protocolo operativo sigue sin producirse.** Lo que existe es un *prompt* para construirlo. La
   ficha, mientras tanto, ya tomó las decisiones operacionales por su cuenta, dentro de la hoja. Si el
   protocolo se escribe ahora sin partir de esas decisiones, producirá una tercera definición de cada
   variable.
3. **Protocolo sin dueño humano.** Delegar la construcción del protocolo a una conversación con un
   modelo produce una variante distinta en cada ejecución. Sin una salida fijada, revisada y firmada
   por el equipo, la semántica no tiene responsable.
4. **Versionado opaco.** `.docx` binario para los tres documentos: sin diff, sin revisión por líneas.
5. **Riesgo de reexpansión de la carga.** Si el diccionario se aplica literalmente, HUM, OLOR, FAU y
   ACT vuelven a ser diarias y multirrespuesta. Eso revierte el logro central de la revisión 01 —dos
   números por día, menos de un minuto— y reintroduce el riesgo de abandono que motivó el rediseño.
   La respuesta correcta no es elegir un extremo (§3, paso 4).
6. **Mediciones técnicas sin calendario.** «El equipo lo hará periódicamente si es necesaria» no es un
   compromiso ejecutable: con tres personas de equipo y cinco hogares, si no se agenda, no ocurre, y
   con ella se pierde la validación de la escala térmica y el factor de densidad (objetivo **E**).
7. **Sobre-instrumentación de un n pequeño.** El propio documento lo admite: cinco participantes y 28
   días sirven para protocolo y exploración. Cada variable añadida baja la completitud sin subir la
   potencia.
8. **Silencio sobre privacidad.** Las 14 decisiones no la mencionan. Si la v0.2 del diccionario se
   redacta sólo desde el criterio de utilidad analítica, puede reintroducir la caracterización de
   residuos que la revisión 01 eliminó por dos razones independientes, una de ellas ética.

### 2.3 Riesgo compartido

Persisten **tres identificadores de hogar** (`H___` en la ficha, `H1–H5` en el plan y la app, `H001` en
el diccionario) y **dos unidades vivas** (botes/litros en la ficha y el plan, gramos en la app y el
`README.md`). Ningún conjunto de datos producido por los tres artefactos es unible sin una tabla de
conversión que todavía no existe.

---

## 3. ¿Cómo se pueden integrar ambos modelos?

La integración ya no consiste en rehacer la ficha: la revisión 01 resolvió la mayor parte del pliego.
Consiste en **subir el contrato al nivel del instrumento, y devolver al instrumento las tres cosas que
el contrato tenía razón en exigir**.

### Paso 1 — Diccionario v0.2, en Markdown, derivado de la ficha vigente
Reescribir el diccionario recorriendo la ficha casilla por casilla: cada casilla es una fila, con tipo,
quién, frecuencia, valores y uso. Las once variables nuevas se dan de alta; las tres que cambiaron se
actualizan. Se guarda como `ficha/diccionario-de-datos-v0.2.md`, versionable; los `.docx` quedan como
anexo de origen. Sin este paso, ninguno de los siguientes es auditable.

### Paso 2 — Devolver a la ficha las tres cosas que cuestan poco y valen mucho
Son las únicas modificaciones al instrumento que este análisis sostiene:

- **Cumplimiento.** Recuperar la distinción entre cero y ausencia. No hace falta la columna `✓/NR`:
  basta una casilla por semana en la hoja 3 —«esta semana anoté todos los días · me faltaron algunos»—
  o conservar la instrucción de escribir `0` y añadir una marca semanal. Cuesta cuatro marcas en el mes
  y devuelve el criterio de éxito #1 y el indicador de cumplimiento.
- **Intervenciones.** Convertir «¿Cambiaste algo esta semana?» en cinco casillas fijas —agregué seco ·
  removí · agregué agua · troceé más fino · retiré material— manteniendo el «no cambié nada» y el texto
  libre. Sigue siendo semanal y cuesta lo mismo que la casilla actual, pero se vuelve cruzable con el
  estado, que es la razón de ser de ACT.
- **Retiro de material no compostable.** Queda cubierto por la casilla «retiré material» anterior más
  la nota, y con eso el plan recupera su dato de materiales no aceptados.

### Paso 3 — Cerrar los cuatro escenarios abiertos de la prueba de estrés
Tres se resuelven dentro de la hoja 3 y no ocupan espacio nuevo: un umbral de cantidad en fauna
(«pocos / muchos» como dos columnas, o una sola casilla «muchos» junto al grupo), una casilla final
«vi algo que no supe identificar» y una línea en el encabezado que fije el momento de la revisión
(«antes de echar nada ese día»). El cuarto —orden temporal dentro de la semana— se acepta como límite
del formato semanal y se anota.

### Paso 4 — Resolver la frecuencia con un subconjunto diario mínimo, no con un extremo
El diccionario quiere resolución diaria; la ficha quiere que el registro se sostenga. Ambos tienen
razón, y la salida no es elegir. Se propone que el registro diario conserve sus dos números y añada
**una sola columna de marca rápida** para la variable de estado que más barata es de observar sin
abrir ni tocar —olor al acercarse, o la presencia de vaho— dejando las otras tres en la revisión
semanal. Con eso se recupera resolución diaria en un eje sin volver a los seis campos por día.
Si la prueba de usabilidad del paso 8 muestra que incluso eso pesa, se descarta y queda registrado.

### Paso 5 — Etiquetas cortas como puente de captura, sin ponerlas en la hoja del hogar
La decisión #10 y la revisión 01 se pueden satisfacer a la vez: la hoja del hogar se queda en prosa, y
el diccionario v0.2 asigna a cada casilla un código estable (`HUM3`, `OLOR2`, `FAU07`, `ACT2`). El
código vive en el contrato y en la app, no en el papel. Adicionalmente, imprimir el código en gris
claro al margen de cada renglón de la hoja 3 no molesta al hogar y hace la captura trivial; queda a
prueba en el paso 8. Para las cantidades diarias, sustituir las fracciones manuscritas por cuatro
casillas (`½ · 1 · 1½ · 2`) más un espacio para «más de 2» resolvería el problema de lectura sin costo
para quien escribe.

### Paso 6 — Calendarizar las dos mediciones técnicas del equipo
Dos visitas por hogar, en las semanas 2 y 4, agendadas en el plan de trabajo, con tres tareas:
temperatura con termómetro junto a la casilla que marcó el hogar —esto valida la escala de anclas y
cierra el objetivo **E**—, medición pareada masa+volumen de un bote y foto del interior. Se registra en
un archivo del equipo, no en la ficha del hogar. Resuelve además el pesaje único frágil del §2.1.7 y
recupera «composta cosechada» como observación del equipo, sin devolvérsela al voluntario.

### Paso 7 — Tabla de equivalencias y alineación del resto del repositorio
Publicar el mapeo entre las categorías de la ficha, las del plan y los campos de la app, y después
actualizar `docs/`, `README.md` y `planes/plan_trabajo.md` a botes y litros. Mientras la app siga en
gramos conviene una nota visible en ella. El destino de la app es ser la **capturista del coordinador**
—papel en el hogar, captura y CSV—, no un registro paralelo del voluntario: un solo origen del dato.

### Paso 8 — Probar antes de congelar
Las pruebas de usabilidad que pide el prompt, con los cinco participantes y antes de dar por cerrada la
ficha: llenado simulado de tres días, **dos personas describiendo la misma composta por separado** para
medir concordancia —sobre todo en fauna y humedad—, y cronometraje real del registro diario y de la
revisión semanal. Sólo después se congela.

### Orden sugerido
Pasos 1 y 6 primero, porque son contrato y calendario y no tocan el instrumento → pasos 2, 3 y 5 en una
sola revisión 02 de la ficha → paso 4 a prueba → paso 8 → congelar → paso 7.

---

## 4. ¿En qué difiere del plan de trabajo?

`planes/plan_trabajo.md` es el tercer modelo. Tras la revisión 01, la ficha **se acercó mucho** al
plan en lo operativo y **se separó de él en el marco conceptual**.

### 4.1 Lo que la revisión 01 alineó con el plan

| Punto | Antes | Ahora |
| --- | --- | --- |
| Unidad | Ficha en gramos, plan en litros | **Coinciden.** Botes calibrados en litros. El argumento de la revisión 01 es correcto: la regla 1:2 del plan ya era volumétrica |
| Regla 1:2 | Ausente de la ficha | **Presente** en la banda de la hoja 2: «por cada bote de orgánico, 2 botes de seco encima» |
| Tiempo dedicado | Ausente | **Presente**, semanal. El criterio de éxito #6 («menos de 30 min semanales») vuelve a ser medible |
| Porcentaje de llenado | Ausente | **Presente**, semanal y al cierre. El criterio #7 vuelve a ser medible |
| Diagnóstico semanal | Sustituido por pesaje de composición | **Presente y ampliado**: humedad, olor, fauna, textura |
| Cosecha al día 28 | La ficha la preguntaba; el plan decía que no se espera | **Coinciden:** eliminada, con la frase explícita en la hoja 1 |

### 4.2 Lo que el plan pide y la ficha sigue sin registrar

- **Acciones correctivas codificadas.** El plan trae una tabla de nueve problemas con su acción y exige
  que «toda acción correctiva deberá registrarse»; la ficha las reduce a Sí/No. Lo resuelve el paso 2.
- **Fotografía como entregable.** El plan la pide cada semana y la app tiene su casilla; la ficha sólo
  la menciona al pie de la hoja 2 para advertir sobre el encuadre, sin casilla de «enviada».
- **Materiales no aceptados detectados.** Lo pide el plan; lo resuelve el paso 2.
- **Costo.** El plan lo incluye en la evaluación individual y en la comparación grupal («gasto inicial
  y gasto operativo»); la ficha no lo registra en ningún punto, ni siquiera en el cierre.
- **Cumplimiento.** El plan lo mide; la ficha dejó de capturarlo (§1.3.c).
- **Tipo principal de residuo.** El plan lo pide a diario; la ficha lo eliminó **a propósito**, por
  privacidad, y lo dice en la hoja: «no se registra qué se come aquí». Aquí no hay que corregir la
  ficha: hay que corregir el plan.

### 4.3 Diferencia de calendario, que ninguna revisión ha tocado

El plan divide el mes en cuatro semanas distintas: la **semana 1 es de medición sin compostar** —siete
días separando y midiendo con la compostera todavía vacía— y el compostaje arranca en la semana 2. La
ficha presenta **28 días homogéneos** desde el día 1, con la regla 1:2 vigente desde el primero y una
revisión semanal ya en S1.

Un hogar que siga el plan al pie de la letra dejará vacía la columna de seco los primeros siete días y
marcará una revisión semanal sobre un contenedor vacío. Es la divergencia más operativa que queda y no
está registrada en ningún documento de decisiones: hay que decidir si el plan cede la semana 1 o si la
ficha marca esos siete renglones como fase de medición.

### 4.4 Diferencia de marco: el plan califica lo que la ficha se negó a calificar

Es la divergencia de fondo. Los criterios de éxito del plan están redactados como **ausencia de
problemas**: «evita olores fuertes persistentes», «no presenta lixiviados frecuentes», «no atrae
roedores». Sus categorías de diagnóstico ya son juicios: humedad «adecuada», olor «fuerte».

La ficha vigente dice lo contrario en la hoja 3: *«Ninguna casilla es buena ni mala; cada una dice hacia
dónde se está moviendo tu composta»*, y glosa «hormigas» como «hay zonas secas dentro del montón» en
lugar de como una plaga.

No es un matiz de redacción. Si el hogar llena una ficha que le dice que ninguna observación es un
fracaso y después el grupo evalúa su mes con criterios que cuentan olores y lixiviados como faltas, la
ficha habrá prometido algo que la evaluación no cumple. **El plan de trabajo debe reescribir sus
criterios de éxito en términos de proceso** —registró, sostuvo la rutina, identificó su cuello de
botella, puede estimar su generación— y dejar el estado de la composta como descripción, no como
calificación. La revisión 01 lo anticipa en su §8; conviene tratarlo como el cambio pendiente de mayor
alcance fuera de `ficha/`.

### 4.5 Donde el plan se queda corto frente a las directrices

Dos cosas que el plan no contempla y el diccionario sí: los **dos niveles de medición**
usuario/equipo con calibración, y la distinción explícita entre **observación e interpretación**. El
paso 6 del apartado 3 introduce el primero en el calendario del plan; el §4.4, el segundo.

---

## 5. Conclusión

El estado real no es «ficha atrasada frente a directrices». Es que **la revisión 01 resolvió por su
cuenta siete de las catorce decisiones arquitectónicas, resolvió mejor de lo pedido la de masa y
volumen, y añadió una dimensión —privacidad— que las directrices no contemplan**; mientras que el
diccionario conserva tres cosas que la ficha perdió o nunca tuvo y que sí hacen falta: la distinción
entre dato ausente y cero, la acción/intervención como variable analizable, y un puente de códigos
hacia la captura. El diccionario v0.1, en cambio, ya no describe el instrumento: once variables
vigentes no están en él.

Las tres acciones que más riesgo retiran, en este orden:

1. **Recuperar la distinción entre cero y ausencia** (cuatro marcas en el mes). Sin ella, el
   cumplimiento —criterio de éxito #1 del plan— no se puede calcular, y un hogar sin residuo y un hogar
   sin registro se verán iguales.
2. **Convertir «¿cambiaste algo?» en cinco casillas fijas**. Cuesta lo mismo que la casilla actual y es
   la condición para que los datos de estado puedan explicar algo.
3. **Emitir el diccionario v0.2 en Markdown a partir de la ficha vigente**, antes de que empiece el
   piloto. Un contrato de datos que no corresponde a las hojas que se van a llenar es peor que ninguno.

Y una recomendación de método, para que esto no se repita: las dos ramas produjeron trabajo valioso sin
verse durante un ciclo completo. Conviene fusionar `ficha_colaboracion` en `ficha` —los tres `.docx` no
tocan ningún archivo de la revisión 01, así que la fusión no tiene conflictos— y seguir en una sola.
