# Revisión 01 de la ficha para hogares

Fecha: septiembre de 2026 · Archivo revisado: `ficha/miltli-ficha-hogares.html`

Documento de decisiones: qué se cambió, por qué, y qué se pierde con cada cambio.

---

## 1. Resumen de lo que cambió

| Antes | Ahora |
| --- | --- |
| 2 hojas: diario (28 renglones con 6 columnas) + alta con pesaje semanal categorizado | 3 hojas: arranque y cierre · diario (28 renglones con 3 columnas) · revisión semanal |
| Gramos, con báscula y código `SB` cuando no había | Botes: un recipiente por hogar, medido una vez en litros por el equipo |
| Pesaje semanal en 6 categorías de residuo | Eliminado |
| Columna «Incidencias»: `N O A L Ot` | Sección semanal «Quién vive aquí esta semana», 12 señales concretas |
| «Sensación térmica»: `F` fría, `T` tibia, `C` caliente | 4 niveles anclados al aire, a la propia mano y al umbral de retirar la mano |
| Columna «Estado»: `✓` hice el registro / `NR` no lo hice | Eliminada |
| «Ningún renglón se queda en blanco» | «Si un día no anotaste, deja el renglón vacío y sigue» |
| Cierre preguntaba por cosecha y por su peso | Cierre sin cosecha: llenado, faltantes de seco, esfuerzo y continuidad |

El esfuerzo diario del hogar pasa de seis decisiones por día (pesar dos veces, evaluar
temperatura, clasificar incidencias, declarar cumplimiento, redactar nota) a dos números.
La observación cualitativa se concentra en cuatro momentos del mes, de unos cinco minutos.

---

## 2. Lenguaje: de incidencia a descripción

### El problema

«Incidencia» nombra un suceso no deseado. La casilla `O` (olor) sólo dice que el hogar
cruzó un umbral de fracaso; no dice a qué huele, y a qué huele es justamente el dato que
distingue una composta que va bien de una que va mal:

- Olor a tierra mojada: descomposición aerobia en curso. Es el olor esperado.
- Olor dulce a fruta o vinagre: mucho material húmedo junto, fermentación en la superficie.
- Olor a amoniaco: exceso de nitrógeno frente al carbono. Falta material seco.
- Olor a drenaje o huevo podrido: el interior está trabajando sin oxígeno.

Las cuatro se marcaban igual: `O`. Lo mismo con `A` (animales), que agrupaba lombrices
—señal de mezcla madura y estable— con roedores, y con `L` (lixiviado), que no distinguía
humedad de encharcamiento.

Además, la presencia de olor y de fauna no es excepcional: es la condición normal de una
composta. Un formato que las clasifica como incidencia le pide al hogar que declare un
fracaso cada semana.

### El cambio

Tres secciones descriptivas, todas por casilla, sin códigos que memorizar:

- **Olor**: seis opciones, ordenadas empezando por «casi no huele» y «a tierra mojada».
- **Quién vive aquí esta semana**: doce grupos reconocibles a simple vista, con una nota
  corta en gris sobre qué suele acompañar a cada uno. Se abre con una frase explícita:
  «En una composta siempre hay vida: eso es justamente lo que la hace funcionar. Lo que
  cambia con las semanas es *quién* aparece».
- **Cómo se ve la mezcla**: avance de la descomposición y textura, por separado.

La nota en gris hace dos cosas a la vez: convierte cada observación en información
interpretable por el hogar sin esperar a la reunión semanal, y quita la carga moral. «Hormigas
— hay zonas secas dentro del montón» describe un estado del sistema; «incidencia: animales»
describe una falta del participante.

Se puede marcar más de una casilla por sección, porque una composta no tiene un solo estado:
la superficie y el fondo pueden estar en puntos distintos.

### Qué se pierde

La frecuencia de los eventos baja de diaria a semanal. Un episodio de tres días de mal olor
que se resuelve solo puede no quedar registrado. Se compensa parcialmente con la columna
libre y opcional del registro diario, pero es una pérdida real de resolución temporal,
aceptada a cambio de que el registro se sostenga las cuatro semanas.

---

## 3. Medición por volumen

### Protocolo

1. Cada hogar elige **un** recipiente y lo usa el mes completo.
2. El equipo mide su capacidad **una sola vez**, en la junta de arranque, llenándolo con una
   botella de 1 L. El hogar no calcula nada.
3. El hogar anota **cuántos botes** echó, admitiendo fracciones: `½`, `1`, `1½`, `2`.
4. Gesto de llenado fijo, escrito en la hoja: hasta el borde, sin apretar, sin acomodar y
   sin sacudir.
5. Mismo bote para el orgánico y para el seco, siempre que se pueda. Si no, se anota el
   segundo recipiente y sus litros.

### Implicaciones, y cómo se acotan

El volumen es más fácil de medir y menos preciso que el peso. La fuente de error es la
densidad: un bote de hojas de lechuga y un bote de cáscara de naranja pueden diferir tres o
cuatro veces en masa. El error no se elimina; se acota:

| Fuente de error | Mitigación en la ficha |
| --- | --- |
| Compactación variable al llenar | Gesto de llenado fijo y escrito en la hoja |
| Recipientes distintos entre hogares | El equipo mide cada uno en litros; se compara en litros, no en botes |
| Conversión a kilos | Un solo pesaje opcional de un bote lleno por hogar, en todo el mes, da un factor de densidad de grupo |
| Dato no auditable | Se registra el conteo de botes en crudo; la conversión a litros la hace el equipo después y se puede rehacer |

Dos observaciones sobre el alcance de los resultados:

- **Entre hogares**, las cifras sirven para orden de magnitud y para dimensionar contenedores,
  no para comparaciones finas. Una diferencia del 20 % entre dos casas no es interpretable.
- **Dentro de un hogar**, la tendencia a lo largo de las cuatro semanas es bastante más
  confiable, porque el recipiente, el gesto y el tipo de residuo se mantienen.

Para los objetivos declarados en `planes/plan_trabajo.md` —conocer la generación aproximada,
dimensionar el contenedor, detectar cuellos de botella— esta precisión alcanza.

Hay además un argumento a favor del volumen que no es sólo de conveniencia: **la regla de
operación del piloto ya era volumétrica**. «Por cada recipiente de húmedos, dos de secos» se
verifica en botes, no en gramos. Medir en gramos obligaba a convertir mentalmente entre dos
unidades; medir en botes hace que el registro y la regla usen la misma.

### Por qué se eliminó el pesaje semanal categorizado

Tres razones, en orden de peso:

1. **Costo**: exigía báscula, separar la basura por tipo durante siete días y una sesión
   semanal de pesaje. Era la parte más cara del formato y la primera que se abandona.
2. **Rendimiento**: la composición del residuo doméstico apenas cambia semana a semana en un
   mismo hogar. Cuatro mediciones de lo mismo aportan poco frente a lo que cuestan.
3. **Privacidad**: ver abajo. La categorización era, de hecho, un registro dietético.

---

## 4. Temperatura

### Por qué frío / tibio / caliente no funciona

La mano no mide temperatura: mide **flujo de calor**. Lo que se siente depende de la
temperatura del material, pero también de la temperatura ambiente, de qué tan fría esté la
propia mano, de la hora del día y de la humedad del material —una mezcla mojada conduce el
calor mucho mejor que una seca, así que a la misma temperatura se siente más fría—.

De ahí que «tibia» en una mañana fría de un patio y «tibia» en una cocina a mediodía puedan
ser dos temperaturas muy distintas, y que el mismo montón cambie de categoría según quién lo
toque. La escala no era comparable entre hogares ni consigo misma a lo largo del mes.

Hay un segundo problema, de fondo: una escala que va de frío a caliente se lee como un
marcador. En un contenedor de 60 a 150 litros alimentado con unos litros por semana, la
superficie por unidad de volumen es demasiado grande para sostener fase termófila. Lo normal
es que casi todas las lecturas del mes caigan en el extremo «frío». Una escala así le dice al
hogar, cuatro veces al mes, que no está logrando nada.

### Nota sobre «húmedo» como nivel térmico

En la conversación de partida apareció la propuesta «temperatura ambiente, húmedo, notablemente
caliente». Ahí hay dos ejes distintos: húmedo no es un grado de temperatura. Se separaron:
la humedad tiene su propia sección, con la prueba del puño.

### La escala propuesta

Se fija el **procedimiento** —mano o cuchara larga, unos 15 cm, al centro, contando hasta
diez— y se ancla a tres referencias que no se mueven:

| Casilla | Ancla física | Rango aproximado |
| --- | --- | --- |
| Igual que el aire — no noto diferencia | El aire de ese momento | ambiente |
| Apenas tibia — más que el aire, menos que mi mano | La piel, ~34 °C | ambiente + 2 hasta ~32 °C |
| Más caliente que mi mano — la dejo ahí sin molestia | Por encima de la piel, sin dolor | ~35–45 °C |
| Muy caliente — no aguanto la mano más de unos segundos | Umbral de retirada, ~45 °C | > 45 °C |

Las tres anclas —el aire del momento, la propia piel y el punto en que uno retira la mano—
están disponibles siempre, no dependen de la estación y son las mismas para cualquier persona.

Se añade una quinta casilla independiente: **«al abrir había vaho, o gotas de agua en la tapa»**.
Es casi objetiva, no requiere tocar nada, y la condensación indica a la vez actividad
biológica y contenido de humedad.

Y se escribe en la propia hoja, junto al encabezado de la sección: *«En composteras de casa lo
más común son las dos primeras casillas: que no caliente no significa que algo ande mal»*.
Es la frase que convierte la escala en una descripción y no en una calificación.

---

## 5. Revisión de las preguntas de llenado único

Se revisó cada pregunta de la antigua hoja 2 con dos criterios: si el dato se usa para algo
declarado en el plan de trabajo, y si puede exponer al hogar.

| Pregunta original | Resolución | Motivo |
| --- | --- | --- |
| Fecha de arranque | Se conserva, movida al encabezado | Necesaria para alinear las cuatro semanas |
| Día fijo de la revisión semanal | Se conserva | Operativa. No se comparte fuera del grupo (ver §6) |
| ¿Cuántas personas comen en esta casa? | Se conserva, con acotación explícita | Es el denominador de L/persona/semana, el indicador central. Se añade «sólo el número; no anotamos nombres, edades ni parentescos» y se repite semanalmente, porque el denominador cambia |
| ¿Hay mascotas que reciben restos? | Se conserva, reformulada | Es una fuga del flujo de residuo: lo que va al animal no llega a la composta. Pasa a `No · A veces · Casi siempre` |
| ¿Qué restos reciben las mascotas? | **Eliminada** | Texto libre sobre alimentos, con poco valor para el volumen |
| ¿Separaban orgánicos antes? + ¿Qué hacían con ellos? | **Fusionadas** en una sola | Eran redundantes: la segunda contiene a la primera |
| ¿Hay báscula disponible? | **Eliminada** | Ya no se pesa |
| Peso del recipiente vacío | **Sustituida** por «La medida de esta casa» | Ya no se pesa; ahora se calibra el volumen |
| Contenedor: tipo y capacidad | Se conserva | Necesaria para el porcentaje de llenado |
| Ubicación del contenedor | Se conserva, ampliada | Se añaden `Techado · A la lluvia` y `Sobre tierra · Sobre piso firme`: son los dos pares que más explican humedad, fauna y drenaje |
| Material seco disponible | Se conserva, ampliada | Se añaden «conseguir material seco me resulta…» y «reserva al arrancar». El acceso al carbono es el cuello de botella más probable del piloto y es exactamente el tipo de constraint que el programa quiere identificar para futuras ediciones |
| ¿Se cosechó composta? ¿Se pudo pesar? | **Eliminadas** | Descartadas por indicación: no habrá cosecha. Además, en 28 días no se espera composta madura, así que preguntarlo instalaba una expectativa de fracaso |

Preguntas nuevas en el cierre, todas orientadas a detectar restricciones repetibles:
semanas sin material seco, adecuación del tamaño del contenedor, qué resultó fácil de
sostener (antes de qué resultó difícil), qué cambiaría, y si continúa el mes siguiente.

---

## 6. Privacidad

### Riesgos identificados

**a) Caracterización semanal de residuos (eliminada).** Era el riesgo mayor y no era evidente.
Cuatro semanas de «cáscara de huevo / café y té / frutas y verduras crudas / restos cocinados»
constituyen un registro dietético del hogar, del que se infieren restricciones alimentarias,
prácticas religiosas, condición de salud y nivel de gasto. Su eliminación, decidida por costo,
resuelve de paso este riesgo. Queda dicho en la propia hoja: *«No se registra qué se come aquí»*.

**b) Ocupación y rutina.** Número de personas que comen en casa + día fijo de revisión +
fotografías semanales del patio describen cuánta gente vive ahí y cuándo hay actividad.
*Mitigación*: la hoja no lleva nombre, dirección ni teléfono; sólo la clave `H__`. La lista que
conecta clave y casa la guarda únicamente la persona coordinadora, fuera del chat del grupo y
fuera de la nube. El día de revisión no se incluye en los datos compartidos.

**c) Fotografías.** El plan pide una foto semanal al grupo. Una foto de patio puede capturar
fachada, placas, vecinos, menores, y llevar coordenadas GPS en los metadatos.
*Mitigación*, escrita al pie de la hoja diaria: encuadrar únicamente el interior del contenedor,
sin personas, sin fachadas, sin placas, con la ubicación de la cámara desactivada.

**d) Campos de texto libre.** «Nota — sólo si hubo incidencia» invitaba a escribir cualquier
cosa: visitas, enfermedades, conflictos domésticos.
*Mitigación*: el campo se declara opcional y se acota explícitamente a la composta, en el
encabezado de la columna y otra vez al pie.

**e) Ausencia de consentimiento efectivo.** El formato original pedía llenar todo («ningún
renglón se queda en blanco»), sin decir qué se hace con los datos.
*Mitigación*: se añade el bloque «Cómo se cuidan tus datos» y la frase **«Puedes dejar en
blanco cualquier pregunta. La ficha sirve igual.»** Un dato que el hogar no quiere dar es un
dato que no se necesita.

**f) Conservación y difusión.** *Mitigación*: la hoja original se queda en el hogar; al grupo
van sólo los números; el resumen final presenta a todas las casas juntas, sin identificar
hogares.

### Lo que sigue sin resolverse desde la ficha

- La clave `H1`–`H5` es seudonimización, no anonimización: en un grupo de cinco hogares que se
  conocen entre sí, quien vea los datos puede reidentificar. Es aceptable dentro del grupo,
  no lo es si los datos salen de él. Por eso el resumen público va agregado.
- El canal de entrega (chat, hoja de cálculo compartida, correo) queda fuera de esta ficha y
  merece su propia decisión.

---

## 7. Lo que cuesta este rediseño

Se escribe aquí para que la decisión sea informada y no se descubra a mitad del piloto:

1. **Tres hojas en vez de dos.** Una hoja más por hogar. Se imprime una vez al mes.
2. **Resolución temporal menor** en olor, fauna y temperatura: de 28 observaciones a 4.
3. **Precisión de masa menor**: el error por densidad no se elimina, sólo se acota.
4. **Sin datos de composición del residuo.** Si más adelante se quisiera saber qué fracción es
   café o cáscara, habría que levantarlo en un ejercicio aparte, acotado y voluntario, no
   como registro semanal permanente.

---

## 8. Pendiente en el resto del repositorio

Estos cambios dejan la ficha en papel desalineada de lo demás. No se tocó nada fuera de
`ficha/`; queda anotado:

- `docs/app.js` y `docs/index.html` siguen capturando gramos y la regla 1:2 sobre peso.
- `docs/` exporta CSV con columnas de peso.
- `planes/plan_trabajo.md` conserva el formato de registro diario con «peso o volumen» y
  «tipo de residuo», las categorías de diagnóstico antiguas y los criterios de éxito
  redactados como ausencia de problemas.
- `README.md` describe «registro diario de residuos húmedos» en gramos.
