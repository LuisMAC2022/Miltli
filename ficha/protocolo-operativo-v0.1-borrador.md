# Protocolo operativo Miltli v0.1 — BORRADOR

> **Este documento es un borrador. No está validado y no debe usarse para operar el piloto
> todavía.** Se somete a revisión de un **comité humano** del equipo Miltli. El comité valida o
> corrige cada definición y, una vez validado, **fija el calendario del pesaje y de la toma de
> temperatura** (§6), que este borrador deja deliberadamente vacío.
>
> Fecha del borrador: septiembre de 2026 · Rama: unificación de `ficha` y `ficha_colaboracion`
> Deriva de: `ficha/miltli-ficha-hogares.html` (revisión 02), `Miltli_Diccionario_de_Datos_v0.1.docx`,
> `Miltli_Decisiones_Arquitectonicas_v0.1.docx` y `Miltli_Prompt_Protocolo_Operativo_v0.1.docx`.

El diccionario define **qué** se mide. Este protocolo define **cómo** se observa y clasifica cada
variable, **quién** la observa y **en qué orden**, para reducir ambigüedad, error de medición y
diferencias entre observadores.

---

## 0. Qué cambia respecto de v0.1 de las directrices

Tres cambios de fondo, todos ya incorporados en la ficha (revisión 02):

1. **La temperatura sale de la ficha del hogar.** Deja de ser una percepción del voluntario
   (`TEMP_P`) y pasa a ser una medición instrumental del equipo (`TEMP_I`). El pesaje sigue el mismo
   camino. Ninguna de las dos las hace ya la casa.
2. **Los dos niveles de medición se separan físicamente.** El hogar llena cuatro hojas; el equipo
   llena su propio registro (`registro-tecnico-equipo.md`). Son dos instrumentos distintos con la
   misma clave `H__`.
3. **El orden de los procesos se vuelve explícito** (§1). Antes estaba implícito en tres documentos
   que no coincidían entre sí.

---

## 1. El orden de los procesos

### 1.1 Orden del proyecto — qué bloquea a qué

Es la secuencia de la decisión arquitectónica #11 (*semántica → protocolo → usabilidad → diseño →
digitalización*), con el estado real de cada paso.

| # | Paso | Producto | Estado | Responsable |
| --- | --- | --- | --- | --- |
| 1 | Semántica | `diccionario-de-datos-v0.2-borrador.md` | Borrador, sin validar | Comité |
| 2 | Protocolo de observación | este documento | Borrador, sin validar | Comité |
| 3 | Calendario de mediciones técnicas | §6, tabla vacía | **Pendiente: lo fija el comité** | Comité |
| 4 | Pruebas de usabilidad | §7 | No ejecutadas | Equipo + 5 participantes |
| 5 | Congelar el instrumento | revisión 03 de la ficha | No | Comité |
| 6 | Tabla de correspondencia | fuera del alcance de esta entrega | No | Equipo de datos |
| 7 | Actualización de la app | fuera del alcance de esta entrega | No | Equipo de datos |
| 8 | Alineación de `planes/` y `README.md` | no iniciada | No | Equipo |

**Reglas de precedencia que el comité debe sostener:**

- El paso 6 **no puede empezar antes** de que el 1 esté validado: una tabla de correspondencia
  construida sobre un diccionario sin firmar fija errores en el esquema.
- El paso 7 **no puede empezar antes** del 6: hoy la app y la ficha no comparten ni identificadores
  ni categorías (ver `hallazgos-app-y-tabla-de-correspondencia.md`).
- El paso 3 **no depende** de los pasos 4 y 5: el calendario puede fijarse en cuanto el comité valide
  las definiciones de `TEMP_I` y `DENS`, y conviene que así sea, porque la visita de la semana 2 cae
  antes de que terminen las pruebas de usabilidad.
- El paso 8 va **al final**, y sólo después de congelar: alinear documentos contra un instrumento que
  todavía se mueve obliga a hacerlo dos veces.

### 1.2 Orden del piloto en el hogar

Impreso en la Hoja 1 de la ficha, en la banda «El orden del piloto, de principio a fin».

1. **Día 1 · arranque.** El equipo mide el bote del hogar en litros y entrega las cuatro hojas. El
   hogar llena la **Hoja 1** completa. No se vuelve a tocar.
2. **Días 1 a 28 · registro diario.** Dos números por día en la **Hoja 2**, en el orden de §1.3.
3. **Una vez por semana · revisión.** Cinco minutos en la **Hoja 3**, en el orden de §1.4, el mismo
   día de la semana en todas las casas.
4. **Cuando el equipo avise · visita técnica.** Pesaje y temperatura, por el equipo, en el orden de
   §1.5. El hogar no interviene.
5. **Día 28 · cierre.** El hogar llena la **Hoja 4**, el mismo día que la última revisión semanal.

### 1.3 Orden de cada carga diaria

Impreso en la Hoja 2. El orden importa por dos razones de medición: la medición va **después** de
retirar contaminantes y trocear (si no, se mide material que no entra), y **antes** de echar (después
ya no se puede medir).

1. Revisar y **retirar** lo que no va (plástico, vidrio, metal).
2. **Trocear** lo grande, a menos de 5 cm.
3. **Medir** en botes y **apuntar el número**.
4. **Echar** el orgánico.
5. **Cubrir** con 2 botes de seco por cada bote de orgánico.
6. **Tapar** el contenedor.

Si se generan residuos dos o más veces el mismo día, se puede acumular y hacer un solo registro al
final del día: se suman los botes y se escribe un único número por renglón.

### 1.4 Orden de la revisión semanal

El orden está fijado porque cada paso altera lo que mide el siguiente: remover destruye el vaho y
libera olores que no estaban disponibles antes.

1. **Antes de echar nada ese día.** Si ya se echó, se anota la observación igual y se marca en la
   nota libre de la semana.
2. **Abrir y mirar la tapa**: vaho o gotas (`VAHO`). Se observa primero porque desaparece en segundos.
3. **Oler** una sola vez, sin remover (`OLOR`).
4. **Mirar la superficie** sin tocar (`FAU`, primera pasada).
5. **Remover un poco** y volver a mirar (`FAU`, segunda pasada; `MEZ`).
6. **Tomar un puño y apretar** (`HUM`).
7. **Marcar** la columna de la semana, incluidas `REG` (cómo se anotó) y `ACT` (qué se hizo).
8. **Escribir** la nota libre de la semana si hay algo que no cabe en las casillas.

### 1.5 Orden de la visita técnica del equipo

Ver `registro-tecnico-equipo.md`. El orden también es de medición: la temperatura se toma **antes**
de mover nada, y el pesaje **después**, porque obliga a sacar material.

1. Llegar sin avisar cambios de última hora; el hogar no prepara nada.
2. **Temperatura instrumental** (`TEMP_I`) antes de abrir del todo y antes de remover.
3. Anotar **qué casilla marcó el hogar esa semana** en la Hoja 3, junto a la lectura. Es lo que
   permite validar la escala percibida contra el termómetro.
4. **Pesaje pareado** (`DENS_M` + `DENS_V`): llenar el bote del hogar con el gesto de llenado fijo,
   anotar litros y pesar.
5. Foto del interior del contenedor, con las mismas reglas de encuadre que el hogar.
6. Devolver el material al contenedor y cubrir con seco.

---

## 2. Matriz del protocolo, variable por variable

Formato común: **código · quién y cuándo · procedimiento · opciones · qué hacer si no se puede
determinar · casos límite · carga · validación · criterio posterior al piloto.**

Los códigos son los de `diccionario-de-datos-v0.2-borrador.md`. **No aparecen impresos en la hoja del
hogar**: viven en el contrato de datos y en la captura, según la decisión #10 resuelta en el sentido
del paso 5 del contraste.

### 2.1 ORG — orgánicos agregados

- **Quién y cuándo:** hogar, diario, en el paso 3 de §1.3.
- **Procedimiento:** llenar el bote de medida hasta el borde, **sin apretar, sin acomodar y sin
  sacudir**; contar botes admitiendo mitades.
- **Opciones:** número con fracciones de ½ (`0`, `½`, `1`, `1½`, `2`…). Unidad primaria: **botes**.
  La conversión a litros la hace el equipo con la capacidad del bote; **no se convierte a masa** sin
  la densidad empírica de §2.10.
- **Si no se puede determinar:** anotar lo que se recuerde y marcarlo en la nota del día. No existe
  código `ND` para cantidades.
- **Casos límite:** varias cargas el mismo día → se suman. Residuo generado pero no echado (guardado
  en refrigeración) → se anota el día en que **se echa**, no el día en que se genera; si el hogar
  hace la semana de sólo medir, se anota el día en que se **mide**.
- **Carga:** menos de 15 segundos.
- **Validación:** pesaje pareado del equipo (§2.10).
- **Después del piloto:** conservar. Es la variable central.

### 2.2 SEC — material seco agregado

Igual que `ORG` en procedimiento y unidad. Diferencias:

- **Regla operativa:** 2 botes de seco por cada bote de orgánico, aumentable a 3.
- **Caso límite propio:** en la semana de sólo medir (si el grupo la adopta, §5.2) la columna de seco
  se deja **vacía**, no en `0`: no hubo compostaje, no es que no se agregara seco.
- **Después del piloto:** conservar.

### 2.3 REG — cómo se anotó la semana *(recupera «Registro realizado» del diccionario v0.1)*

- **Quién y cuándo:** hogar, semanal, paso 7 de §1.4.
- **Opciones:** `REG1` anoté todos los días · `REG2` me faltaron algunos días.
- **Por qué existe:** sin esta marca, un renglón vacío de la Hoja 2 es ilegible: puede ser un día sin
  residuo o un día sin registro, que son conclusiones opuestas sobre el mismo hogar. La ficha lo dice
  en la banda de la Hoja 2: **`0` = no hubo residuo; renglón vacío = no anoté**.
- **Si no se puede determinar:** dejar las dos casillas vacías. Se interpreta como `ND`.
- **Carga:** una marca por semana, cuatro en el mes.
- **Después del piloto:** conservar. Es la única fuente del indicador «porcentaje de registros
  completados» del plan de trabajo y de su criterio de éxito #1.

### 2.4 VAHO — condensación al abrir

- **Quién y cuándo:** hogar, semanal, **paso 2** de §1.4, antes de cualquier otra cosa.
- **Opciones:** marcada / no marcada. Es una variable independiente, **no un nivel de humedad**,
  aunque en la hoja comparta sección con `HUM` por economía de espacio.
- **Casos límite:** ambiente frío → la condensación aparece por diferencia térmica con el exterior y
  no sólo por humedad del material; se anota igual y el análisis lo trata como señal conjunta de
  actividad y humedad, nunca como medida de ninguna de las dos por separado.
- **Después del piloto:** conservar sólo si se cruza con `TEMP_I`; si no, es ambigua.

### 2.5 HUM — humedad percibida

- **Quién y cuándo:** hogar, semanal, paso 6 de §1.4.
- **Procedimiento:** tomar un puño de la mezcla, de preferencia con guante, y apretarlo.
- **Opciones:** `H1` se desmorona · `H2` se apelmaza y mantiene la forma, no sale agua · `H3` salen
  una o dos gotas · `H4` escurre agua · `H5` líquido acumulado en el fondo.
- **Multimarca:** permitida y esperada. La superficie y el fondo difieren.
- **Si no se puede determinar:** dejar vacío.
- **Casos límite:** seca arriba y húmeda abajo → se marcan las dos casillas. **La zona no se
  registra**, y ésa es una pérdida asumida: al analizar no se distingue un gradiente normal de un
  dato contradictorio. Ver §5.3.
- **Capacitación:** sí, la prueba del puño debe demostrarse una vez en la junta de arranque.
- **Después del piloto:** conservar; evaluar si `H3` y `H4` se distinguen de forma reproducible.

### 2.6 OLOR

- **Quién y cuándo:** hogar, semanal, paso 3 de §1.4, **antes de remover**.
- **Procedimiento:** abrir, acercar la nariz una sola vez y volver a cerrar.
- **Opciones:** `O0` casi no huele · `O1` tierra mojada, bosque, hojarasca · `O2` dulce: fruta,
  vinagre, fermento · `O3` amoniaco · `O4` drenaje, huevo podrido, basura encerrada · `O5` otro
  (**exige nota**).
- **Multimarca:** permitida.
- **Errores probables:** oler después de remover, lo que sobreestima `O3` y `O4`. El orden de §1.4 lo
  previene; conviene repetirlo en la junta de arranque.
- **Después del piloto:** conservar.

### 2.7 FAU — quién vive en la composta

- **Quién y cuándo:** hogar, semanal, pasos 4 y 5 de §1.4.
- **Umbral de conteo (nuevo):** se marca lo que se vio **más de una vez o en más de dos individuos**.
  Una mosca suelta no se marca. Resuelve el escenario «se observó una sola mosca» del prompt.
- **Opciones:** `F01`–`F11` los once grupos descritos en la hoja · `F12` vi algo que no supe
  identificar (**nuevo**, exige nota) · `F00` no vi ninguno de los anteriores.
- **Regla de exclusión:** `F00` excluye `F01`–`F12`.
- **Si no se puede determinar:** `F12`. Existe precisamente para que la duda no se registre como
  ausencia, que era el error más probable de la versión anterior.
- **Confiabilidad:** es la variable más débil del instrumento. Distinguir larvas de mosca soldado de
  gusanos de mosca doméstica es determinación taxonómica. **El comité debería decidir si se produce
  una ayuda visual de una página** (§5.5); sin ella, la concordancia entre observadores será baja y
  el objetivo de aprendizaje B queda sin responder en esta variable.
- **Después del piloto:** revisar agrupando: es probable que once grupos sean demasiados y que la
  señal esté en cuatro o cinco.

### 2.8 MEZ — cómo se ve la mezcla

- **Quién y cuándo:** hogar, semanal, paso 5 de §1.4.
- **Opciones, dos ejes independientes:** avance (`M1` se distinguen casi todos los restos · `M2`
  algunos ya no se reconocen · `M3` la mayor parte parece tierra oscura) y textura (`X1` suelta ·
  `X2` apelmazada · `X3` con bloques grandes).
- **Multimarca:** permitida dentro de cada eje.
- **Después del piloto:** conservar `M`; evaluar si `X` duplica información de `HUM`.

### 2.9 ACT — qué hizo el hogar *(recupera la intervención como variable analizable)*

- **Quién y cuándo:** hogar, semanal, paso 7 de §1.4.
- **Opciones:** `A0` no cambié nada · `A1` removí o mezclé · `A2` agregué material seco de más ·
  `A3` agregué agua · `A4` retiré material que no iba (**exige nota**) · `A5` cambié otra cosa
  (**exige nota**).
- **Regla de exclusión:** `A0` excluye `A1`–`A5`.
- **Por qué existe así:** una casilla Sí/No no permite cruzar acción con estado. Con estas seis se
  puede estudiar `Estado_t + Acción_t → Estado_t+1` (decisión #6) al precio de la misma marca
  semanal. `A4` además devuelve al piloto el dato de «materiales no aceptados» que pide el plan de
  trabajo.
- **Límite asumido:** no hay orden temporal dentro de la semana. Si el hogar removió *después* de
  oler, el dato no lo distingue. Se acepta como límite del formato semanal y se anota aquí para que
  el análisis no lo lea como causalidad.
- **Después del piloto:** conservar. Si se recupera resolución diaria (§5.4), ésta es la primera
  candidata junto con `OLOR`.

### 2.10 TEMP_I y DENS — mediciones del equipo *(extraídas de la ficha del hogar)*

- **Quién y cuándo:** **equipo**, en las visitas que fije el comité (§6). El hogar no toma ninguna de
  las dos medidas y así se lo dice la Hoja 1.
- **`TEMP_I` · procedimiento:** termómetro de sonda, a unos 15 cm del centro del montón, sin remover,
  esperando a que la lectura se estabilice (30 s). Se anota °C con un decimal, la hora y la
  temperatura ambiente a la sombra en ese momento.
- **`TEMP_I` · para qué:** validar contra lo que el hogar describió esa semana en la Hoja 3 y cerrar
  el objetivo de aprendizaje **E**. Sin ella, la escala percibida no tenía contra qué validarse; con
  ella, la escala percibida ya no hace falta en la hoja del hogar.
- **`DENS_M` + `DENS_V` · procedimiento:** llenar el bote del hogar con el **mismo gesto de llenado**
  que usa el hogar (hasta el borde, sin apretar, sin acomodar, sin sacudir), anotar litros y pesar en
  gramos, descontando la tara del bote. **Pareado y en dos momentos distintos** del piloto: una sola
  medición no sostiene una conversión de litros a kilos para todo el grupo.
- **Restricción de privacidad:** el equipo **no clasifica ni describe el contenido** del bote. Se
  pesa y se mide volumen; no se anota de qué está hecho. Ver §4.
- **Después del piloto:** conservar como medición técnica; no devolverla nunca al voluntario.

### 2.11 NOTA — texto libre

- **Quién y cuándo:** hogar, diario (columna de la Hoja 2) y semanal (renglón de la Hoja 3).
- **Obligatoriedad condicional:** exigida por `O5`, `F12`, `A4` y `A5`. Opcional en todo lo demás.
- **Acotación:** «sólo cosas de la composta», escrito en el encabezado de la columna y repetido al
  pie. Es una salvaguarda de privacidad, no una regla de estilo (§4).

---

## 3. Prueba de estrés

Los ocho escenarios del prompt, más cuatro añadidos, contra la ficha de la revisión 02.

| Escenario | ¿Resuelto? | Cómo |
| --- | --- | --- |
| Seca en la superficie, húmeda debajo | **Parcial** | Multimarca autorizada; la zona no se registra (§5.3) |
| Se observó una sola mosca | **Sí** | Umbral: más de una vez o más de dos individuos (§2.7) |
| Larvas que no se saben identificar | **Sí** | `F12` «vi algo que no supe identificar» |
| Fría antes de agregar, tibia horas después | **Sí, por eliminación** | La percepción térmica salió de la ficha; `TEMP_I` fija hora y ambiente |
| Se agregaron residuos dos veces el mismo día | **Sí** | Se suman y se anota un solo renglón (§2.1) |
| Bote compactado un día y no otro | **Sí** | Gesto de llenado fijo, impreso en las cuatro hojas y usado también por el equipo |
| Se mezcló la pila después de percibir olor | **Parcial** | `ACT` ya distingue qué se hizo; el orden dentro de la semana sigue sin registrarse (§2.9) |
| Se marcó «otro» sin escribir explicación | **Parcial** | La nota es condicionalmente obligatoria, pero el renglón libre es uno por semana |
| **Nuevo:** el hogar no revisó una semana | **Sí** | Columna vacía + `REG` de las demás semanas |
| **Nuevo:** hogar sin residuo un día | **Sí** | `0` explícito, distinguido del renglón vacío (§2.3) |
| **Nuevo:** el equipo no pudo hacer la visita | **Pendiente del comité** | El calendario de §6 debe incluir una ventana de reposición |
| **Nuevo:** dos personas de la misma casa llenan la ficha | **No** | No se registra quién observó. Ver §5.6 |

---

## 4. Restricciones de privacidad que este protocolo impone

Se escriben como restricciones, no como recomendaciones, para que una v0.3 redactada sólo desde la
utilidad analítica no las deshaga sin una decisión explícita del comité. Vienen de la revisión 01,
§6, y del hecho de que las 14 decisiones arquitectónicas no mencionan la privacidad en ninguna
entrada.

1. **No se registra qué se come en la casa.** Ni por categorías de residuo, ni por pesaje
   categorizado, ni en la caracterización del equipo. Cuatro semanas de composición de residuo son un
   registro dietético del que se infieren restricciones alimentarias, prácticas religiosas, condición
   de salud y nivel de gasto. Esto vale también para el equipo: el pesaje de §2.10 mide masa y
   volumen, **no contenido**.
2. **La hoja no lleva identificadores directos.** Sólo la clave `H__`. La lista que une clave y casa
   la guarda únicamente la persona coordinadora, fuera del chat del grupo y fuera de la nube.
3. **El registro del equipo usa la misma clave y tampoco lleva nombres.** Si el equipo necesita saber
   a qué domicilio ir, eso vive en la agenda de la persona coordinadora, no en el registro de datos.
4. **Cualquier pregunta puede quedar en blanco.** Está impreso en las Hojas 1 y 4. Un dato que el
   hogar no quiere dar es un dato que no se necesita.
5. **Los campos de texto libre se acotan a la composta**, en el encabezado y al pie.
6. **Las fotografías encuadran sólo el interior del contenedor**, sin personas, sin fachadas, sin
   placas y con la ubicación de la cámara desactivada. Vale igual para las fotos del equipo.
7. **La clave `H1`–`H5` es seudonimización, no anonimización.** En un grupo de cinco hogares que se
   conocen, quien vea los datos puede reidentificar. Aceptable dentro del grupo; **no** si los datos
   salen de él. El resumen público va agregado.
8. **El día fijo de revisión semanal no se comparte fuera del equipo.** Cruzado con el número de
   personas en casa, describe rutina y ocupación de un domicilio.

---

## 5. Conflictos y decisiones pendientes — para el comité

Cada punto trae opciones y una recomendación. **Ninguno está decidido.**

### 5.1 Calendario del pesaje y de la temperatura *(la decisión que este borrador existe para habilitar)*
Las mediciones técnicas no tienen fecha en ningún archivo del repositorio. «El equipo lo hará
periódicamente si es necesaria» no es un compromiso ejecutable: con tres personas de equipo y cinco
hogares, si no se agenda, no ocurre.
**Recomendación:** dos visitas por hogar, en las semanas 2 y 4, con ventana de reposición de tres
días. Rellenar la tabla de §6.

### 5.2 La semana 1: ¿medir sin compostar, o compostar desde el día 1?
`planes/plan_trabajo.md` dedica la semana 1 a medir con la compostera vacía; la ficha presenta 28 días
homogéneos. Un hogar que siga el plan al pie de la letra dejará la columna de seco vacía siete días y
hará una revisión semanal sobre un contenedor vacío.
**Opciones:** (a) el plan cede la semana 1 y el compostaje arranca el día 1; (b) la ficha marca los
siete primeros renglones como fase de medición y la primera revisión semanal pasa a la semana 2.
**Estado actual:** la ficha admite las dos, con una línea en la banda de la Hoja 2. Es un parche, no
una decisión. **Recomendación:** (a), por simplicidad, y corregir el plan.

### 5.3 Regla de reducción de la multimarca
La ficha autoriza marcar «se desmorona» y «escurre agua» a la vez, lo cual es correcto, pero produce
un dato sin orden: no hay escala ordinal reconstruible y por tanto no hay tendencia que graficar.
**La regla debe decidirse ahora, antes de tener datos**; si se decide después, será una decisión
tomada mirando el resultado. **Opciones:** predominante · la peor zona · registrar ambas como rango.
**Recomendación:** registrar el rango (mínimo y máximo marcados) y reportar el predominante sólo
cuando se marque una sola casilla.

### 5.4 ¿Se recupera algo de resolución diaria?
Las cuatro variables de estado son semanales: cinco hogares × cuatro revisiones = **20 observaciones
de estado en todo el piloto**, y una semana saltada cuesta el 25 % de un hogar.
**Recomendación:** probar en usabilidad (§7) una única marca diaria de `OLOR` o de `VAHO` —las dos más
baratas, no exigen abrir ni tocar— y descartarla si pesa. No reexpandir las cuatro.

### 5.5 Ayuda visual de fauna
Sin fotografías o iconos, once grupos taxonómicos tendrán baja concordancia entre observadores (§2.7).
**Recomendación:** una hoja de apoyo de una página, que no se llena y no se entrega; sólo se consulta.

### 5.6 Quién observa dentro de la casa
Si dos personas de la misma casa llenan la ficha en semanas distintas, parte de la variación entre
semanas será variación entre observadores y no del proceso.
**Recomendación:** no añadir un campo de nombre —sería un identificador directo en una hoja que
deliberadamente no los tiene— sino una casilla neutra «esta semana revisó la misma persona de siempre:
sí / no». Queda a decisión del comité.

### 5.7 Criterios de éxito del plan de trabajo
El plan evalúa el mes como **ausencia de problemas** («evita olores fuertes», «no presenta lixiviados»,
«no atrae roedores»), mientras la ficha promete al hogar que **ninguna casilla es buena ni mala**. Si
el hogar llena una ficha que le dice que nada es un fracaso y después el grupo evalúa su mes contando
olores como faltas, la ficha habrá prometido algo que la evaluación no cumple.
**Recomendación:** reescribir los criterios en términos de proceso —registró, sostuvo la rutina,
identificó su cuello de botella, puede estimar su generación— y dejar el estado de la composta como
descripción. Es el cambio pendiente de mayor alcance fuera de `ficha/`.

### 5.8 Canal de entrega
Chat, hoja de cálculo compartida o correo: la decisión no está tomada y no es menor, porque determina
dónde acaban viviendo los datos y quién los ve. Ver el documento de hallazgos.

---

## 6. Calendario de mediciones técnicas — **lo llena el comité**

El comité fija estas fechas después de validar §2.10. Mientras la tabla esté vacía, la ficha no puede
congelarse: la Hoja 1 promete visitas al hogar.

| Hogar | Visita 1 · fecha | Ventana de reposición | Visita 2 · fecha | Ventana de reposición | Quién va |
| --- | --- | --- | --- | --- | --- |
| H1 |  |  |  |  |  |
| H2 |  |  |  |  |  |
| H3 |  |  |  |  |  |
| H4 |  |  |  |  |  |
| H5 |  |  |  |  |  |

Condiciones que el comité debería fijar junto con las fechas:

- Hora aproximada, porque `TEMP_I` depende de la hora del día y debe compararse con la ambiente.
- Que la visita caiga **el mismo día de la revisión semanal del hogar, o el siguiente**, para poder
  parear la lectura del termómetro con la casilla que marcó el hogar.
- Qué pasa si el hogar no puede recibir la visita: se repone dentro de la ventana o se pierde el dato,
  pero se anota cuál de las dos cosas ocurrió.

---

## 7. Pruebas de usabilidad antes de congelar

Con los cinco participantes, antes de dar por cerrado el diseño (paso 5 de §1.1):

1. **Llenado simulado de tres días** de la Hoja 2, cronometrado. Criterio: menos de un minuto por día.
2. **Concordancia entre observadores:** dos personas describen la misma composta por separado, sin
   verse, y se comparan `HUM`, `OLOR`, `FAU` y `MEZ`. Es la prueba que más importa, porque es la que
   responde al objetivo de aprendizaje **B**, y la fauna es donde más apostó la ficha.
3. **Cronometraje de la revisión semanal** completa. Criterio: cinco minutos.
4. **Lectura en voz alta de la Hoja 1** por alguien que no participó en su redacción, para detectar
   preguntas que se entienden distinto de lo que se quiso preguntar.
5. **Prueba de la marca diaria** de §5.4, si el comité decide probarla.
6. **Prueba de captura:** una persona transcribe una ficha llena a la tabla del diccionario v0.2 y se
   cuenta cuántas casillas quedan ambiguas. Es la prueba que anticipa el trabajo de la tabla de
   correspondencia.

---

## 8. Qué se congela y qué no

- **Se congela** al terminar §7: los textos de las casillas, sus códigos, el orden de las secciones y
  las definiciones operacionales de §2.
- **No se congela:** el calendario de §6, que puede reprogramarse; y la lista de opciones de `FAU`,
  que el propio protocolo prevé revisar después del piloto.
- **Cambiar algo congelado** obliga a emitir una v0.3 del diccionario y a revisar la tabla de
  correspondencia. Ése es el costo que la secuencia de §1.1 existe para evitar.
