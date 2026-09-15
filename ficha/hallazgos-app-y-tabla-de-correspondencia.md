# Hallazgos previos a la actualización de la app y a la tabla de correspondencia

Fecha: septiembre de 2026 · Rama: unificación de `ficha` y `ficha_colaboracion`
Artefactos revisados: `ficha/miltli-ficha-hogares.html` (revisión 02), `docs/app.js`, `docs/index.html`,
`planes/plan_trabajo.md`, `README.md`, los tres `.docx` de directrices y `tests/app.test.js`.

**Ninguno de los dos trabajos que vienen —actualizar la app y crear la tabla de correspondencia— forma
parte de esta entrega.** Este documento existe para que quien los haga no descubra estos problemas a
la mitad. Cada hallazgo dice qué es, dónde está, qué bloquea y qué se propone.

## Cómo leer la severidad

| | Significado |
| --- | --- |
| **Bloqueante** | Hacer la app o la tabla sin resolverlo produce un resultado que habrá que deshacer, o expone datos del hogar |
| **Previo** | No impide empezar, pero debe resolverse antes de congelar el esquema |
| **Anotado** | Se registra para que no se pierda; puede convivir con el trabajo |

---

## 0. Resumen

| ID | Hallazgo | Severidad | Bloquea |
| --- | --- | --- | --- |
| H-1 | El CSV semanal lleva el nombre del responsable en cada fila | **Bloqueante** | App |
| H-2 | `tipo_residuo` reintroduce el registro dietético del hogar | **Bloqueante** | App y tabla |
| H-3 | Dos «tablas de correspondencia» distintas con el mismo nombre | **Bloqueante** | Tabla |
| H-4 | El canal de entrega sigue sin decidirse | Previo | App |
| H-5 | El texto libre de la app no está acotado como en la ficha | Previo | App |
| H-6 | Respaldo JSON y `localStorage` sin advertencia de contenido | Anotado | App |
| R-1 | Tres identificadores de hogar conviviendo | **Bloqueante** | Tabla |
| R-2 | Dos denominadores de «personas», con frecuencias distintas | Previo | Tabla |
| R-3 | Dos registros primarios del mismo hecho (papel y app) | **Bloqueante** | App |
| R-4 | Llenado del contenedor en dos resoluciones | Previo | Tabla |
| R-5 | Minutos capturados dos veces y sumados | Previo | App |
| R-6 | Acción correctiva en texto libre y codificada a la vez | Previo | Tabla |
| R-7 | Contaminantes: diario booleano contra `A4` semanal | Previo | Tabla |
| C-1 | Las categorías de estado no son mapeables una a una | **Bloqueante** | Tabla |
| C-2 | La app pregunta por «plagas»; la ficha se negó a calificar | **Bloqueante** | App |
| C-3 | Olor por intensidad contra olor por tipo | **Bloqueante** | Tabla |
| C-4 | La app no admite multimarca | **Bloqueante** | App |
| C-5 | La app no puede representar ausencia (`NR`, `NC`, `ND`) | **Bloqueante** | App y tabla |
| C-6 | Dos definiciones distintas de «semana» | Previo | Tabla |
| C-7 | La mayor parte del instrumento no tiene contraparte en la app | Previo | App |
| D-1 | La documentación del repositorio afirma que la app está en gramos; no lo está | Previo | Planeación |
| D-2 | `README.md` y `planes/` describen el modelo anterior | Previo | Planeación |

---

## 1. Privacidad

### H-1 · El CSV semanal lleva el nombre del responsable en cada fila — **bloqueante**

`docs/app.js`: el encabezado del CSV incluye `responsable`, y ese valor se repite en **todas** las
filas (`common` se antepone a cada renglón, sea resumen, diario o semanal). El campo se captura en
`docs/index.html` con `autocomplete="name"`, es decir, está pensado para un nombre de persona.

El archivo que cada hogar entrega semanalmente al coordinador contiene, por tanto, la pareja
`hogar` + `responsable`. **Ese archivo es, en los hechos, la lista que une clave y persona** — la
misma lista que la ficha promete por escrito que no existirá fuera de la coordinación:

> «Esta hoja no lleva nombre, dirección ni teléfono: sólo la clave H__. La lista que conecta cada
> clave con una casa la guarda sólo la persona coordinadora, fuera del chat y fuera de la nube.»

Si los CSV circulan por el chat del grupo, la promesa impresa en la hoja queda incumplida por el
propio sistema que la acompaña. No es un riesgo hipotético: es el flujo previsto en el README.

**Propuesta:** retirar `responsable` del CSV. Si el coordinador necesita saber a quién reclamar una
entrega, eso vive en su agenda, no en el archivo de datos. Si se decide conservarlo dentro del
dispositivo, que no se exporte.

### H-2 · `tipo_residuo` reintroduce el registro dietético — **bloqueante**

`docs/index.html` captura «Tipo de residuo» como texto libre, con el marcador de posición
«Frutas, verduras, café, etc.», y `docs/app.js` lo exporta en la columna `tipo_residuo` de cada fila
diaria.

La revisión 01 eliminó la caracterización semanal de residuos por dos razones independientes, una de
ellas de privacidad: cuatro semanas de composición del residuo doméstico son un registro dietético
del que se infieren restricciones alimentarias, prácticas religiosas, condición de salud y nivel de
gasto. La ficha lo declara en la propia hoja: **«No se registra qué se come aquí»**.

Un campo de texto libre diario sobre el tipo de residuo produce el mismo dato, con menos estructura y
sin haber sido decidido.

**Propuesta:** eliminar el campo de la app y **no incluirlo en la tabla de correspondencia**. No debe
mapearse a nada: no es una variable del instrumento, es una variable retirada. Si el plan de trabajo
lo sigue pidiendo (lo pide, en su formato de registro diario), hay que corregir el plan.

### H-3 · Dos «tablas de correspondencia» distintas con el mismo nombre — **bloqueante**

El nombre se está usando para dos objetos que no tienen nada que ver:

| | Qué une | Quién la necesita | Dónde debe vivir |
| --- | --- | --- | --- |
| **Tabla de campos** | Códigos del diccionario ↔ columnas de la app ↔ categorías del plan | Todo el equipo | Versionada en el repositorio |
| **Lista de hogares** | Clave `H__` ↔ domicilio o persona | Sólo la coordinación | **Nunca** en el repositorio, ni en la nube, ni en el chat |

La segunda es el material más sensible del piloto: es la llave que convierte todo lo demás en datos
personales. Si las dos comparten nombre, tarde o temprano comparten archivo.

**Propuesta:** fijar los nombres antes de crear nada. Aquí se usan **«tabla de correspondencia»** para
la primera y **«lista de claves»** para la segunda, y el diccionario v0.2 §7.5 deja escrito que la
segunda no forma parte del esquema.

### H-4 · El canal de entrega sigue sin decidirse — previo

La app descarga un CSV y abre un borrador de correo; el plan menciona chat y hoja de cálculo
compartida; la ficha dice que la hoja original se queda en la casa. Nadie ha decidido por dónde viajan
los datos, y esa decisión determina quién los ve y dónde quedan almacenados. El cuerpo del correo que
genera la app incluye la clave del hogar y el nombre del responsable.

**Propuesta:** decidirlo junto con H-1, porque la respuesta cambia qué puede llevar el archivo.

### H-5 · El texto libre de la app no está acotado — previo

La ficha acota sus campos libres dos veces («sólo cosas de la composta», en el encabezado y al pie),
como salvaguarda de privacidad. La app usa el marcador «Cambios, dificultades o materiales
disponibles», que invita a escribir cualquier cosa.

**Propuesta:** copiar la acotación de la ficha en la app, y a los campos `accion` y `resultado`.

### H-6 · Respaldo y almacenamiento local — anotado

El respaldo JSON exporta el estado completo, nombre del responsable y del coordinador incluidos, sin
decir qué contiene. Y `localStorage` persiste en el navegador: en un dispositivo compartido, los datos
quedan accesibles a quien lo use después.

**Propuesta:** una línea de advertencia al descargar el respaldo y una opción de borrado local.

**A favor de la app, y conviene no perderlo en la migración:** `csvEscape` ya antepone una comilla a
los valores que empiezan por `=`, `+`, `-` o `@`, lo que evita la inyección de fórmulas cuando el CSV
se abre en una hoja de cálculo. Está bien hecho y debe conservarse.

---

## 2. Redundancias

### R-1 · Tres identificadores de hogar — **bloqueante**

`H___` en la ficha, `H1`–`H5` en la app (validado con `/^H[1-5]$/`) y `H001…` en el diccionario v0.1.
Ningún conjunto de datos producido por los tres artefactos es unible sin una conversión que no existe.

**Propuesta:** `H1`–`H5`, que es lo que ya validan la app y el plan. El diccionario v0.2 lo fija así.
Si el programa crece más allá de cinco hogares, se amplía entonces y se documenta el cambio; inventar
hoy un formato de tres dígitos para cinco casas sólo añade una conversión más.

### R-2 · Dos denominadores de «personas» — previo

La app guarda `personas` una sola vez, en la configuración. La ficha pregunta `PERS0` al alta y
**`PERS_S` cada semana**, a propósito: el denominador de litros por persona y semana cambia cuando
alguien se va de viaje o llegan visitas. La app no puede representar esa variación, así que el
indicador central del piloto se calcularía con un denominador fijo que la ficha sabe que no lo es.

**Propuesta:** `PERS_S` por semana en la app; conservar `PERS0` como dato de alta.

### R-3 · Dos registros primarios del mismo hecho — **bloqueante**

Hoy el voluntario puede anotar la misma carga en el papel y en la app. Son dos registros primarios del
mismo hecho, que divergirán, y no hay regla que diga cuál manda.

**Propuesta, ya recomendada en el contraste:** **un solo origen del dato.** El papel es el registro del
hogar; la app es la **capturista del coordinador**: transcribe el papel y produce el CSV. Esto cambia
el destinatario de la app y, con él, buena parte de su interfaz —y es justamente lo que resuelve H-1,
porque el coordinador ya sabe de quién es cada hoja y no necesita el campo `responsable` dentro del
archivo.

### R-4 · Llenado del contenedor en dos resoluciones — previo

`ocupadoPct` (0–120 %) en la app; `¼ · ½ · ¾ · casi lleno` en la ficha. La conversión de cuartos a
porcentaje inventa precisión; la inversa pierde información.

**Propuesta:** que la app capture los mismos cuartos y que el porcentaje, si se quiere, sea derivado y
marcado como tal.

### R-5 · Minutos capturados dos veces — previo

La app suma `entrada.minutos` (por carga) y `revision.minutos` (por revisión) en el mismo total. La
ficha tiene **un solo** `MIN_S`: «minutos que le dediqué a la composta en toda la semana». Capturar la
ficha en la app tal como está obliga a decidir en qué casilla se pone ese número, y cualquier elección
produce un total que no significa lo mismo que el de los demás hogares.

**Propuesta:** un solo campo semanal, igual que la ficha.

### R-6 · La acción correctiva, dos veces — previo

La app tiene `accion` y `resultado` como texto libre; la ficha ahora tiene `ACT` con seis casillas
fijas (`A0`–`A5`). Mantener las dos formas produce un dato que no se puede contar y otro que sí, sobre
el mismo hecho.

**Propuesta:** `ACT` codificado más una nota condicional, y retirar `resultado` o convertirlo en parte
de la nota. El «resultado observado» de la semana siguiente ya está en las casillas de estado de esa
semana: eso es precisamente lo que `ACT` existe para poder cruzar.

### R-7 · Contaminantes: booleano diario contra `A4` semanal — previo

La app tiene una casilla diaria «Encontré materiales no aceptados»; la ficha lo recoge en `A4`
(«retiré material que no iba»), semanal y con nota obligatoria. Son el mismo hecho con frecuencias
distintas.

**Propuesta:** decidir una. La diaria da más resolución y cuesta una casilla; la semanal ya está
impresa. Si se conservan las dos, la tabla de correspondencia debe decir explícitamente que **no** son
la misma variable.

---

## 3. Semántica: lo que impide escribir la tabla de correspondencia

El supuesto implícito de «hacer una tabla de correspondencia» es que existe una función que traduce
las categorías de un artefacto a las del otro. **Para las variables de estado, esa función no existe en
ninguna de las dos direcciones.**

### C-1 · Humedad — **bloqueante**

| App (`select`, una opción) | Ficha (`HUM`, multimarca) |
| --- | --- |
| seca | `H1` se desmorona |
| **adecuada** | `H2` se apelmaza y mantiene la forma |
| húmeda | `H3` salen una o dos gotas |
| saturada | `H4` escurre agua |
| — | `H5` líquido acumulado en el fondo |

«Adecuada» es un juicio, no una observación, y contradice la decisión arquitectónica #2 y la frase
impresa en la Hoja 3 («ninguna casilla es buena ni mala»). Además `húmeda` no distingue entre `H3` y
`H4`, y `saturada` mezcla `H4` con `H5`.

**Propuesta:** la app adopta `H1`–`H5`. No se traduce hacia atrás; los datos de la app anteriores a la
migración se conservan como una serie distinta y no se concatenan.

### C-2 · Fauna — **bloqueante**

La app pregunta por **«plagas»**, con una sola opción entre `ninguno · pocas moscas · muchas moscas ·
hormigas · cucarachas · roedores`. La ficha tiene doce grupos descriptivos, multimarca, con glosas del
tipo «hormigas — hay zonas secas dentro del montón», y abre la sección diciendo que en una composta
siempre hay vida.

La palabra «plaga» ya es la interpretación que el instrumento se negó a hacer. No es un problema de
mapeo: es que las dos preguntas no preguntan lo mismo.

**Propuesta:** la app adopta `FAU` completo, incluidas `F12` («vi algo que no supe identificar») y
`F00`, con su regla de exclusión.

### C-3 · Olor — **bloqueante**

La app mide **intensidad** (`ninguno · ligero · fuerte`) y añade dos **tipos** (`podrido`, `amoniaco`)
en la misma lista, mezclando dos ejes. La ficha mide **tipo** (`O0`–`O5`), porque a qué huele es lo
que distingue una composta que va bien de una que va mal. `fuerte` no se puede traducir a ningún `O`.

**Propuesta:** la app adopta `O0`–`O5`. Si se quiere intensidad, es una segunda variable, no valores
de la misma lista.

### C-4 · La app no admite multimarca — **bloqueante**

`HUM`, `OLOR`, `FAU`, `MEZ_AV`, `MEZ_TX` y `ACT` son multirrespuesta en la ficha, porque la superficie
y el fondo de una composta están en puntos distintos. La app usa `<select>` de opción única en todas.
Capturar una ficha con dos casillas marcadas obligaría a elegir una **y la pérdida no quedaría
registrada**.

**Propuesta:** casillas en la app. Y antes, la decisión pendiente del protocolo §5.3: **la regla para
reducir varias marcas a un valor graficable, fijada antes de tener datos.** Si se decide después, será
una decisión tomada mirando el resultado.

### C-5 · La app no puede representar la ausencia — **bloqueante**

El diccionario v0.2 distingue `0`, `NR` (no se registró), `NC` (el hogar decidió no contestar), `ND`
(no se pudo determinar) y `NA`. La app no tiene vocabulario para ninguno: los campos de cantidad son
`required` con `value="0"`, de modo que el cero es el camino de menor resistencia al capturar un día
del que no se sabe nada, y los `select` siempre traen una opción preseleccionada.

Esto destruye justamente lo que `REG` existe para preservar: un hogar que no generó residuo y un hogar
que no registró quedan iguales. Y `NC` importa además por privacidad: la ficha promete que se puede
dejar cualquier pregunta en blanco, y un sistema que no sabe guardar «en blanco» convierte esa promesa
en un campo relleno por omisión.

**Propuesta:** que el vocabulario de ausencia sea parte del esquema **antes** de tocar la app, y que
ningún campo traiga valor por omisión.

### C-6 · Dos definiciones de «semana» — previo

La app calcula la semana con ventanas de siete días desde `inicio` (`weekForDate`). La ficha ancla
`S1`–`S4` al **día fijo de revisión** que el grupo acordó. Si el día 1 del piloto y el día de revisión
no coinciden, las dos numeraciones se desfasan y los mismos datos caen en semanas distintas según
quién los mire.

**Propuesta:** una regla de alineación escrita en la tabla de correspondencia, y que sea la ficha la
que mande, porque es la que llena el hogar.

### C-7 · La mayor parte del instrumento no existe en la app — previo

Sin contraparte en la app: `REG`, `VAHO`, `MEZ_AV`, `DPRE`, `MASC`, `UBIC_*`, `BOTE_*`, `SECO_DISP`,
`SECO_ACC`, `SECO_RES`, `CONT_TAM`, `CONTIN`, las cuatro preguntas abiertas del cierre y **todo el
registro técnico del equipo** (`TEMP_I`, `TEMP_AMB`, `HUM_REF`, `DENS_M`, `DENS_V`).

Sin contraparte en la ficha, y deliberadamente: `tipo_residuo` (H-2) y `foto_enviada` —que el plan sí
pide y la ficha sólo menciona al pie para advertir sobre el encuadre—.

**Propuesta:** decidir el alcance de la app antes de ampliarla. Con el papel como origen del dato
(R-3), la app no necesita replicar las cuatro hojas: necesita capturar lo que se entrega cada semana.

---

## 4. Documentación del repositorio

### D-1 · La app no está en gramos, aunque tres documentos lo afirman — previo

`revision-01-lenguaje-medicion-privacidad.md` §8 dice que «`docs/app.js` y `docs/index.html` siguen
capturando gramos», que «`docs/` exporta CSV con columnas de peso» y que el `README.md` describe el
registro «en gramos». El contraste lo repite en §2.1.10 y §2.3 («dos unidades vivas… gramos en la app
y el `README.md`»).

**No es así.** `docs/app.js` trabaja con `humedoL` y `secoL`, el CSV exporta `humedo_l` y `seco_l`, y
no hay ninguna aparición de gramos, peso ni kilos en `docs/` ni en `README.md`. La app ya está en
litros.

Importa porque cambia el trabajo que viene: una migración planeada como «convertir gramos a litros»
trabajaría sobre un problema que no existe y dejaría intacto el real, que es el de **categorías,
frecuencias y ausencias** (§3). La unidad es lo único en lo que la app y la ficha ya coinciden —falta
sólo el paso de botes a litros, que es una multiplicación por `BOTE_CAP`—.

Los dos documentos se conservan como están, con su fecha: son registros de decisión, no descripciones
del estado actual. Esta corrección queda aquí, y anotada en la revisión 02.

### D-2 · `README.md` y `planes/plan_trabajo.md` describen el modelo anterior — previo

El README enumera «Revisión semanal con diagnóstico y acciones correctivas», que son las categorías
con juicio de C-1 a C-3. El plan conserva el «tipo principal de residuo» diario (H-2), sus criterios de
éxito redactados como ausencia de problemas y su tabla de nueve problemas con acción correctiva.

Es el punto 8 de la secuencia del protocolo §1.1 y va **al final**: alinear estos documentos contra un
instrumento que todavía puede cambiar obliga a hacerlo dos veces. Pero el criterio de éxito del plan
(protocolo §5.7) conviene decidirlo antes, porque cambia lo que se le promete al hogar.

### D-3 · Las directrices ya son versionables — resuelto en esta entrega

Los tres `.docx` sólo producían `Bin 0 → 38656 bytes` en `git diff`, de modo que el documento más
propenso a cambiar era el único que no permitía ver qué cambió. Se añadió su transcripción en texto
plano en `anexos-v0.1/`. Los `.docx` se conservan como anexo de origen.

---

## 5. Orden propuesto

1. **Decidir H-3** (los dos nombres) y **H-1 + H-2** (qué sale del dispositivo). Son decisiones de
   media hora y condicionan todo lo demás.
2. **Validar el diccionario v0.2 y el protocolo** con el comité, incluida la regla de multimarca
   (C-4) y el vocabulario de ausencia (C-5).
3. **Fijar el calendario** de pesaje y temperatura (protocolo §6): no depende de nada de lo anterior y
   la primera visita cae pronto.
4. **Decidir R-3**, el origen único del dato, porque define para quién es la app.
5. **Escribir la tabla de correspondencia** con el esqueleto de abajo, dejando explícitas las
   correspondencias que **no** existen en lugar de forzarlas.
6. **Actualizar la app** contra la tabla ya escrita.
7. **Alinear** `README.md` y `planes/plan_trabajo.md`.

### Esqueleto propuesto para la tabla de correspondencia

Una fila por **casilla de la ficha**, no por campo de la app: la ficha es el origen del dato.

| Columna | Contenido |
| --- | --- |
| `codigo` | Código del diccionario v0.2 |
| `hoja` | 1 arranque · 2 diario · 3 semanal · 4 cierre · T técnico |
| `casilla_ficha` | Texto literal impreso en la hoja |
| `campo_app_actual` | Nombre del campo hoy en `docs/`, o vacío |
| `campo_app_propuesto` | Nombre después de la migración |
| `columna_csv` | Encabezado en el CSV exportado |
| `categoria_plan` | Categoría equivalente en `planes/plan_trabajo.md`, o vacío |
| `tipo_relacion` | `exacta` · `pierde_informacion` · `gana_informacion` · **`sin_equivalencia`** · **`retirada_por_privacidad`** |
| `regla_conversion` | Cómo se convierte, o por qué no se puede |
| `nota` | Decisión pendiente asociada |

Las dos últimas categorías de `tipo_relacion` son las que más importan: son las que impiden que la
tabla se lea como si todo tradujera a todo. `tipo_residuo` debe aparecer como
`retirada_por_privacidad` y sin destino, para que nadie la vuelva a conectar más adelante creyendo que
fue un olvido.
