# Revisión 03 — La función de la ficha, y validación de la integración con el diccionario

Fecha: octubre de 2026 · Instrumento revisado: `miltli-ficha-hogares.html` (rev. 02, cuatro hojas)
Contrato revisado: `diccionario-de-datos-v0.2-borrador.md` (67 variables)

Esta revisión no cambia lo que la ficha mide. Hace dos cosas: comprueba si el instrumento cumple la
función que se le atribuye, y verifica si la ficha y el diccionario están lo bastante alineados para
pasar a la aplicación.

**Función declarada:** *establecer la línea base que nos permita medir el éxito del piloto, detectar
puntos de fallo y el mejoramiento continuo de los procesos de calidad.*

Son cuatro funciones distintas y el instrumento las cumple de forma desigual. El resumen, antes del
detalle:

| Función | Veredicto |
| --- | --- |
| Establecer la línea base | **Parcial.** La línea base del sistema es sólida; la del estado inicial no existe; y lo que se llama «generación» mide otra cosa |
| Medir el éxito del piloto | **No, contra los criterios vigentes.** Cuatro de los siete criterios del plan no son calculables con esta ficha, y tres no lo son en principio |
| Detectar puntos de fallo | **Sí para el instrumento, parcial para la composta.** El fallo del proceso de calidad se detecta mejor que el fallo del compostaje |
| Mejoramiento continuo | **No todavía.** Faltaba la condición más básica: saber qué versión del instrumento llenó cada hogar |

---

# Parte I · ¿Cumple la ficha su función?

## 1. Cómo se verificó

Se recorrieron las cuatro hojas casilla por casilla y se preguntó, para cada una, a cuál de las cuatro
funciones sirve y con qué resolución. Después se recorrieron en sentido inverso: para cada función, qué
dato la sostiene y si ese dato existe. Lo que sigue son los casos en que la respuesta fue «no existe» o
«existe pero no mide eso».

Tamaños con los que hay que leer todo este documento: **5 hogares × 28 días = 140 renglones diarios**,
y **5 × 4 = 20 observaciones de estado** por variable en todo el piloto.

## 2. Línea base

«Línea base» no es una cosa sola. Aquí hacen falta cinco, y el instrumento cubre dos y media.

### 2.1 Del sistema instalado — **cumplida, y bien**

La Hoja 1 es, en los hechos, una buena línea base de configuración: tipo y capacidad del contenedor,
cuatro pares de ubicación (interior/exterior, sol/sombra, techado/lluvia, tierra/piso), bote de medida
calibrado en litros, material seco disponible, acceso a material seco y reserva inicial. Son las
variables explicativas con las que después se interpreta por qué dos composteras se comportan distinto.

Esta parte no tiene observaciones. Es lo mejor resuelto del instrumento.

### 2.2 Del hogar como denominador — **cumplida**

`PERS0` al alta y `PERS_S` cada semana. Repetir el denominador fue una decisión correcta de la revisión
01 y el diccionario v0.1 no la tenía.

### 2.3 De la generación de residuo — **no es lo que se cree que es**

Éste es el hallazgo principal de la revisión.

`ORG` mide **los botes de orgánico que entraron a la composta**. El diccionario v0.2 lo dice con
precisión: su uso es «flujo de entrada». Pero `planes/plan_trabajo.md` declara como objetivo *«cuánto
residuo orgánico genera cada hogar»* y su tabla de comparación final llama al indicador
**«Generación — litros de residuos por persona y semana»**.

No son la misma cantidad. La generación del hogar es:

```
generación = ORG + lo que va a los animales + lo no aceptado que se retiró + lo que no se separó
```

De esos cuatro términos la ficha sólo mide el primero. `MASC` registra la frecuencia con que los restos
van a animales (`no · a veces · casi siempre`), no la cantidad, así que no se puede restar. `A4`
registra que se retiró material no aceptado, no cuánto. Y lo que simplemente no se separó —porque se
olvidó, porque el contenedor estaba lleno, porque había prisa— no deja rastro en ninguna casilla.

**La generación no es reconstruible a partir de estos datos, y el plan la promete.**

Hay que decir también qué *no* es un problema: para los otros tres objetivos declarados del piloto
—dimensionar el contenedor, saber cuánto material seco hace falta, detectar cuellos de botella— el
flujo de entrada es exactamente la cantidad correcta. No se necesita la generación total. El problema
no es que se mida mal; es que **se llama de un modo y mide de otro**, y ese nombre está a punto de
viajar a una columna de CSV y a la tabla de correspondencia, donde ya nadie recordará la diferencia.

Tres salidas, en orden de costo:

| | Qué implica | Costo |
| --- | --- | --- |
| **(a) Renombrar** | El indicador pasa a llamarse «entrada a la composta por persona y semana» en el plan, la app y la tabla. El piloto deja de prometer la generación | Cero. Sólo corregir el plan |
| **(b) Medir la fuga** | Un renglón semanal en la Hoja 3: «botes de restos que esta semana **no** llegaron a la composta», con dos o tres motivos marcables. `generación = ORG + fuga` | Un renglón por semana, cuatro marcas al mes |
| **(c) Semana de sólo medir** | Recuperar la semana 1 del plan: siete días separando y midiendo con la compostera vacía | Retrasa el compostaje una semana y mide la generación **antes** de que el piloto cambie la conducta, que es lo que una línea base debería hacer |

**Recomendación: (a) + (b).** Renombrar es obligatorio en cualquier caso, porque el nombre actual es
falso. La fuga añade un renglón y convierte el dato en algo que sí responde al objetivo del plan. La
(c) es la única que da una línea base verdaderamente *previa a la intervención*, pero cuesta una semana
de las cuatro y el protocolo §5.2 ya recomendaba lo contrario por simplicidad —esa recomendación se
tomó antes de que «establecer la línea base» fuera una función declarada, y conviene que el comité la
revise con este dato a la vista—.

### 2.4 Del estado inicial de la composta — **no existe**

No hay registro del día 0. No se anota la fecha de la primera carga, ni la capa base de material seco
que el plan pide colocar (unos diez centímetros), ni el estado del sistema vacío. La primera
observación de estado es la revisión de S1, cuando la composta lleva siete días operando.

Para una serie de cuatro puntos, perder el origen no es menor: la primera diferencia observable es
S1→S2, de modo que de cuatro observaciones salen **tres intervalos**, y ninguno arranca en un estado
conocido.

Es barato de arreglar: tres casillas en la Hoja 1 —fecha de la primera carga, botes de la capa base,
y si el sistema arrancó vacío o con material previo—.

### 2.5 De los procesos de calidad — **cubierta a medias**

La decisión arquitectónica #13 dice que el éxito del piloto incluye evaluar el formulario como
prototipo en cinco dimensiones: completitud, consistencia, carga de registro, capacidad discriminante
de las categorías y confiabilidad entre observadores.

| Dimensión | ¿Hay dato? |
| --- | --- |
| Completitud | **Sí** — `REG` más el conteo de renglones llenos |
| Carga de registro | **Sí** — `MIN_S` semanal, más `CIE_DIFICIL` al cierre |
| Consistencia | Parcial — se puede auditar a posteriori (p. ej. `F00` marcado junto con otra fauna), pero no hay dato que la mida |
| Capacidad discriminante | **No** — exige ver la distribución de marcas; con 20 observaciones por variable, una categoría que nadie marque no se distingue de una categoría mal definida |
| Confiabilidad entre observadores | **No** — sólo la daría la prueba de concordancia del protocolo §7, que **no tiene instrumento ni fecha** |

Las dos que faltan son justamente las que responden al objetivo de aprendizaje **B** («¿las categorías
se entienden y aplican de forma reproducible?»), que es el objetivo central de un piloto cuyo propósito
declarado es probar el sistema de adquisición de datos. **La prueba de concordancia necesita su propia
hoja**, y hoy no existe: está descrita en prosa dentro del protocolo.

## 3. Medir el éxito del piloto

### 3.1 Contra los siete criterios del plan

| # | Criterio del plan | ¿Calculable con la ficha rev. 02? |
| --- | --- | --- |
| 1 | Registros en ≥ 3 de las 4 semanas | **Sí.** `REG` lo devolvió en la revisión 02 |
| 2 | Evita olores fuertes **persistentes** | **No.** `OLOR` mide tipo, no intensidad, y «persistente» exige resolución mayor que una observación semanal |
| 3 | No presenta lixiviados **frecuentes** | **No.** `H5` existe, pero «frecuente» sobre cuatro observaciones no es una frecuencia |
| 4 | No atrae roedores | Parcial. `F11` (huellas, excavaciones) es un proxy razonable, semanal |
| 5 | Mantiene reserva suficiente de material seco | Parcial. `SECO_FALT` se pregunta **al cierre**, pidiendo recordar cuatro semanas atrás |
| 6 | Menos de 30 minutos semanales | **Sí.** `MIN_S` |
| 7 | Puede estimar su generación semanal y la capacidad necesaria | **A medias.** La capacidad sí; la «generación», no — §2.3 |

**Cuatro de siete no son calculables, y los criterios 2 y 3 no lo son en principio** con un formato de
observación semanal: piden una frecuencia y el instrumento da cuatro puntos.

A esto se suma el conflicto de fondo que ya estaba anotado (protocolo §5.7): los criterios 2, 3 y 4
están redactados como **ausencia de problemas**, mientras la Hoja 3 le promete al hogar que *«ninguna
casilla es buena ni mala»*. Si el hogar llena una ficha que le dice que nada es un fracaso y después el
grupo evalúa su mes contando olores como faltas, la ficha habrá prometido algo que la evaluación no
cumple.

Los criterios de éxito tienen que reescribirse **antes** de que empiece el piloto, no después, porque
determinan qué datos hacen falta. Reescritos en términos de proceso —registró, sostuvo la rutina,
identificó su cuello de botella, puede estimar su entrada semanal y dimensionar su contenedor— los
siete pasan a ser calculables con lo que la ficha ya captura, salvo el renombrado de §2.3.

### 3.2 Contra los cinco objetivos de aprendizaje

| | Objetivo | Estado |
| --- | --- | --- |
| **A** | Viabilidad: ¿registran consistentemente? | **Medible.** `REG` + renglones llenos |
| **B** | Calidad: ¿las categorías se aplican de forma reproducible? | **No medible con la ficha.** Depende de la prueba de concordancia (§2.5) |
| **C** | Costo: ¿qué variables son molestas o difíciles? | **Medible.** `MIN_S`, `CIE_DIFICIL`, y los `NC` leídos como señal |
| **D** | Señal biológica: ¿estado, entradas e intervenciones se relacionan? | **Medible, sin potencia.** 20 observaciones de estado en todo el piloto |
| **E** | Calibración: ¿lo doméstico se relaciona con lo técnico? | **Depende del calendario**, que sigue vacío. Diez pares como máximo |

## 4. Detectar puntos de fallo

Hay que separar dos cosas que se nombran igual.

### 4.1 Fallo del compostaje — **parcial, por resolución**

Las cuatro variables de estado son semanales. Un episodio que aparece el martes y se resuelve el
viernes no queda registrado: el único canal diario es la columna libre de notas, que es opcional y no
estructurada. Es una pérdida conocida y aceptada en la revisión 01 a cambio de que el registro se
sostenga el mes; se repite aquí porque, bajo la función «detectar puntos de fallo», es la limitación
dominante del instrumento.

Lo que sí funciona y conviene no perder: las glosas en gris («hormigas — hay zonas secas dentro del
montón») convierten cada observación en información accionable **en el momento**, sin esperar a la
reunión semanal. La detección ocurre en la casa aunque el dato no capture el episodio.

Falta un punto de fallo que el plan sí prevé y la ficha no registra: **el momento en que el contenedor
deja de aceptar residuo**. El plan manda dejar de incorporar al 80 % de ocupación; `LLEN_S` es un proxy
semanal en cuartos y no hay casilla para «dejé de echar porque ya no cabía».

### 4.2 Fallo del propio instrumento — **bien resuelto, y conviene nombrarlo**

Esto es un acierto del diseño que no estaba documentado como tal. La ficha tiene cuatro detectores de
su propio fallo:

| Señal | Qué fallo delata |
| --- | --- |
| `REG2` «me faltaron algunos días» | La rutina de registro no se sostuvo |
| `F12` «vi algo que no supe identificar» | Una categoría no alcanza para lo que la gente ve |
| `NC` (pregunta en blanco) | Una pregunta resulta invasiva, confusa o irrelevante |
| `VIS_OK` = «no se pudo» | El segundo nivel de medición no ocurrió |

Las cuatro registran el fallo **sin culpar a nadie**, que es la condición para que se usen. Son la línea
base real de los procesos de calidad y deberían leerse como indicadores de primera clase en el informe
final, no como huecos en los datos. Conviene que el diccionario lo diga.

## 5. Mejoramiento continuo

### 5.1 El ciclo cierra en la casa, semanalmente

Planear (regla 1:2 impresa) → hacer (`ORG`/`SEC`) → verificar (revisión semanal) → actuar (`ACT`, ahora
en seis casillas cruzables). El ciclo está completo a nivel del hogar y con periodicidad semanal. Es
más de lo que tenía la revisión 01, donde «¿cambiaste algo?» era Sí/No.

### 5.2 No cierra a nivel del programa

Las señales para mejorar el **protocolo** —no la composta— se concentran en la Hoja 4: `CIE_DIFICIL`,
`CIE_CAMBIO`, `CIE_OTRO`. Es decir, en un solo momento, al final, pidiendo recordar 28 días. El único
canal contemporáneo es `NOTA_S`, opcional y de un renglón por semana. Y la reunión semanal que el plan
convoca no tiene ningún instrumento asociado.

Barato de mejorar si el comité quiere: el renglón libre semanal podría llevar dos etiquetas en lugar de
ninguna —«de la composta» y «de la ficha»— para separar lo que mejora el proceso de lo que describe el
montón.

### 5.3 Faltaba la condición previa: control de versión — **corregido en esta revisión**

Un sistema de mejora continua compara ciclos. Para comparar el piloto 1 con el piloto 2 hay que saber
**qué versión del instrumento llenó cada hogar**, y la ficha no llevaba ninguna marca: ni número de
revisión, ni identificador de formato, ni fecha de edición. Dos hogares podían llenar dos versiones
distintas del mismo papel y nada lo registraría; y si el comité cambia algo en la semana 2, los datos
de antes y después quedarían mezclados sin rastro.

Es el requisito más elemental de un proceso de calidad —control de documentos— y es lo único que esta
revisión cambió en el instrumento: el pie de las cuatro hojas pasa a decir **`F-HOG rev. 02 · Hoja N de
4`**. No se tocó ninguna casilla.

De aquí en adelante: **cualquier cambio en una casilla sube el número de revisión**, y el número viaja
con los datos como una columna más (`FICHA_REV`) para que el análisis pueda separar lo que se llenó con
cada versión.

## 6. Veredicto de la Parte I

La ficha es un buen instrumento de **operación y de descripción**, y una línea base sólida de
**configuración**. Como instrumento de **evaluación** todavía no cierra, y la razón es que nunca se
escribió contra los criterios con los que se la va a evaluar: la revisión 01 la rediseñó contra la
carga del hogar, la 02 contra el contrato de datos, y ninguna de las dos contra los siete criterios de
éxito del plan.

Lo que falta no es más instrumento. Es, en este orden:

1. **Renombrar lo que mide `ORG`** (§2.3). Es falso hoy y se va a propagar a la app.
2. **Reescribir los criterios de éxito del plan** (§3.1). Determinan qué datos hacen falta, así que van
   antes de congelar nada.
3. **Una hoja para la prueba de concordancia** (§2.5). Es el único dato que responde al objetivo B.
4. **Tres casillas de día 0** (§2.4) y, si el comité quiere la generación, el renglón de fuga (§2.3b).

---

# Parte II · Validación de la integración ficha ↔ diccionario

La pregunta de esta parte es estrecha y concreta: **¿están la ficha y el diccionario lo bastante
alineados para que alguien construya la tabla de correspondencia y después la app, sin descubrir
contradicciones a mitad del trabajo?**

## 7. Método

Se extrajeron mecánicamente las dos listas —cada `dt`, encabezado de columna y renglón marcable de las
cuatro hojas, y cada código del diccionario— y se cruzaron en los dos sentidos. Después se comparó, una
por una, la **forma de responder** que ofrece el papel contra el **tipo** que declara el diccionario,
que es donde aparecieron los defectos.

## 8. Lo que pasa la validación

**Cobertura: completa en ambos sentidos.** Las 67 variables del diccionario tienen su casilla en la
ficha o en el registro técnico, y ninguna casilla de la ficha quedó sin código. Para un contrato
derivado a mano de un instrumento de cuatro hojas, es un resultado mejor del esperado y significa que
la tabla de correspondencia puede escribirse sin inventar nada.

También coinciden, verificado uno por uno:

- Los conteos de opciones: humedad 5 niveles más `VAHO`, olor 6, fauna 11 grupos más `F12` y `F00`,
  mezcla 3 + 3, acciones 6.
- Los dos juegos de llenado del contenedor: `LLEN_S` con cuatro valores (sin «lleno») y `LLEN_F` con
  cinco, tal como aparecen en las Hojas 3 y 4.
- El par `SECO_ACC` / `SECO_DIF`, incluida la correspondencia entre `no_se_donde` del alta y
  `nunca_supe` del cierre.
- Las reglas de exclusión `F00` y `A0`, y las notas condicionales de `O5`, `F12`, `A4`, `A5`.

## 9. Defectos encontrados

Seis, ninguno de fondo, todos de los que bloquean una captura limpia si no se resuelven antes.

### D-1 · `REG` admite en el papel un estado que el diccionario prohíbe — **bloqueante**

El diccionario declara `REG` como **opción única** (`REG1` o `REG2`). En la Hoja 3 son **dos casillas
independientes**, de modo que el papel permite marcar las dos o ninguna. «Ninguna» es interpretable
como `ND`, pero «las dos» no significa nada.

Y es precisamente la variable que existe para distinguir el cero de la ausencia, así que un valor
inválido ahí envenena el indicador de cumplimiento.

**Propuesta:** declararla en el diccionario como dos booleanos con la regla de integridad «no pueden
ser verdaderos a la vez», que es lo que el papel realmente ofrece, y dejar que la captura rechace el
caso. Cambiar el papel costaría una revisión del instrumento por un problema que el esquema puede
absorber.

### D-2 · `LLEN_S` se escribe a mano aunque es una opción cerrada — **bloqueante para la captura**

El diccionario la declara `opción` con cuatro valores. En la Hoja 3 la celda es de escritura libre y el
encabezado sólo sugiere los valores (`¼ · ½ · ¾ · casi lleno`). Nada impide que alguien escriba «60 %»,
«a la mitad» o «3/4 largos».

Es además una de las dos entradas manuscritas que el contraste ya había señalado como las peores para
cualquier lectura posterior, junto con las fracciones de `ORG`/`SEC`.

**Propuesta:** cuatro casillas en lugar de una celda, en la próxima revisión del instrumento. Mientras
tanto, la captura necesita una regla escrita de normalización, no el criterio de quien transcriba.

### D-3 · `MEZ_AV` y `MEZ_TX` comparten sección sin separación visible — previo

El diccionario son dos variables; en el papel son seis renglones seguidos bajo un solo encabezado, y lo
único que las distingue es una frase en gris: «las tres primeras casillas hablan del avance; las tres
siguientes, de la textura». Quien capture tiene que saberlo **por posición**.

**Propuesta:** una línea divisoria entre el tercer y el cuarto renglón en la próxima revisión; en el
diccionario, dejar escrito el rango de renglones de cada una.

### D-4 · `MASC` y `DPRE` se solapan sin marca temporal — previo

`DPRE` pregunta **«antes de este piloto»** y admite `animales`. `MASC` pregunta por los restos que van a
animales **sin ningún marcador de tiempo**, y por su posición en la hoja se entiende que es «ahora». Un
hogar que daba y sigue dando restos a sus animales marca las dos, y nada en el dato dice que una es
pasado y otra presente.

**Propuesta:** añadir «durante el piloto» al enunciado de `MASC` en la próxima revisión, y dejarlo
explícito en el diccionario ya.

### D-5 · El cuantificador de `ORG`/`SEC` admite fracciones manuscritas — previo

El diccionario dice «múltiplos de ½»; el papel dice «1, 2, ½, 1½…» en escritura libre. El campo de la
app tiene que aceptar pasos de 0.5 y rechazar el resto, y la tabla de correspondencia debe decirlo,
porque es la conversión que más veces se va a ejecutar (140 renglones × 2).

### D-6 · Falta la variable de versión del instrumento — **corregido en esta revisión**

Señalado en §5.3. La ficha ya lleva el sello `F-HOG rev. 02` y `FICHA_REV` queda dado de alta en el
diccionario en esta misma revisión. **Falta incorporarlo a la tabla de correspondencia**, para que
viaje con cada registro como una columna más.

## 10. Lo que no es un defecto de alineación pero bloquea igual

Tres decisiones siguen abiertas y las tres cambian el esquema, así que la app no debería empezar antes
de que estén tomadas:

1. **La regla de reducción de la multimarca.** Ocho variables son multirrespuesta y no hay regla para
   convertirlas en un valor graficable. Debe fijarse **antes** de tener datos; si se decide después,
   será una decisión tomada mirando el resultado. (Protocolo §5.3.)
2. **La semana 1.** Si el grupo adopta la semana de sólo medir, `SEC` vacío en los primeros siete
   renglones significa «no aplica» y no «no anotó». Es la misma celda con dos significados según una
   decisión que nadie ha tomado. (Protocolo §5.2, y ahora también §2.3 de este documento.)
3. **El calendario de pesaje y temperatura.** Catorce de las 67 variables son del equipo y ninguna
   tendrá dato si no se agendan las visitas. (Protocolo §6, tabla vacía.)

A lo que se suma, de la Parte I: **renombrar `ORG`** antes de que «generación» se convierta en el
nombre de una columna.

## 11. Veredicto de la Parte II

**La integración ficha ↔ diccionario está sustancialmente lograda.** La cobertura es completa en los
dos sentidos y los defectos son seis, locales, y ninguno obliga a rehacer el contrato.

Pero **no recomiendo pasar a la aplicación todavía**, y la razón no es la alineación entre estos dos
documentos: es que cuatro decisiones pendientes —multimarca, semana 1, calendario y el nombre de
`ORG`— cambian el esquema que la app tendría que implementar. Construir contra un esquema que va a
cambiar en esos cuatro puntos es exactamente el orden que la secuencia del protocolo §1.1 existe para
evitar.

### Orden propuesto

1. **El comité decide los cuatro puntos** del §10 más el renombrado. Son decisiones de una sesión.
2. **Diccionario v0.3** incorporando esas decisiones, `FICHA_REV`, y los defectos D-1, D-3, D-4, D-5
   como reglas de integridad y de normalización.
3. **Revisión 04 del instrumento**, que toca el papel una sola vez: D-2 (cuatro casillas), D-3 (línea
   divisoria), D-4 («durante el piloto»), las tres casillas de día 0 y, si procede, el renglón de fuga.
4. **Prueba de concordancia** con su hoja, y el resto de las pruebas de usabilidad.
5. **Congelar**, subiendo a `rev. 03` el sello de la ficha.
6. **Tabla de correspondencia** y después **la app**, con las condiciones ya documentadas en
   `hallazgos-app-y-tabla-de-correspondencia.md`.

Los pasos 1 y 2 son los que de verdad desbloquean la app. Los pasos 3 y 4 pueden correr en paralelo con
el 6 si el comité acepta que la tabla de correspondencia se escriba contra el diccionario v0.3 y se
revise una vez después de congelar.
