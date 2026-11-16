# Diccionario de datos de cafeterías v0.1 — BORRADOR

> **Borrador, sin validar.** Es el contrato de datos de `miltli-ficha-cafeterias.html` (**F-CAF rev.
> 01**, seis hojas) y deriva de ella **casilla por casilla**. No sustituye al diccionario doméstico
> (`diccionario-de-datos-v0.3-borrador.md`): lo **complementa**, y lo que las dos fichas tienen en
> común se toma de allá por referencia (§1).
>
> Parte de `planes/escalamiento_cafeterias.md`: su matriz de reutilización (§4), sus brechas (§5) y su
> esqueleto (§7). Ese análisis dejó **17 preguntas abiertas (CAF-01…CAF-17)** que sólo el equipo puede
> responder y que bloquean la ficha. **Ninguna está decidida.** Para que el papel pudiera existir, esta
> redacción tomó un supuesto de trabajo en cada una —casi siempre la «inclinación» del propio
> análisis— y los reúne en el §0, con lo que cambia si el equipo decide otra cosa.
>
> La correspondencia casilla ↔ código se comprueba con `npm test` (`tests/ficha-cobertura.test.js`),
> que lee los atributos `data-codigo` del HTML (acta-01, RE-14).

## Cómo leer este documento

- **Código**: etiqueta estable, invisible al imprimir (atributo `data-codigo`). **Un código no se
  reutiliza ni se renombra, y no cambia de significado** (v0.3, «Cómo leer»).
- **Origen**: `v0.3` = código **compartido** con el diccionario doméstico, con el mismo significado;
  `nuevo` = código propio de cafeterías, que no existe en v0.3. La prueba falla si un código `nuevo`
  ya existe en v0.3 o si uno `v0.3` no existe allá.
- **Quién**: `programa` (coordinación, con la gerencia) · `cafetería` (encargado o enlace: un rol) ·
  `personal` (de turno) · `recibe` (quien recibe una salida) · `equipo` · `—` (impreso).
- **Cuándo**: `antes` (antes del día 1) · `día 1` · `diario` · `salida` (cada vez que lo guardado sale)
  · `semanal` · `cierre` · `impreso`.
- **Tipo**: `num` · `texto` · `opción` (una) · `multi` (varias) · `fecha` · `bool`.
- **Instr.**: `F-CAF` (se verifica contra `data-codigo` en `miltli-ficha-cafeterias.html`) · `DER`
  (derivada: se calcula, nunca se captura).
- **Si falta**: valor de ausencia (v0.3 §1) que toma la casilla cuando queda vacía.

---

## 0. Supuestos de trabajo — lo que esta ficha da por decidido sin que lo esté

> **Adoptados (16-nov-2026).** El `acta-02-resolucion-de-bloqueos.md` §2 convierte estos supuestos en
> decisiones; el comité puede reabrirlas. La tabla se conserva como estaba.

| Pregunta | Lo que supone F-CAF rev. 01 | Dónde se ve | Si el equipo decide otra cosa |
| --- | --- | --- | --- |
| **CAF-01** Destino | El destino está **fuera** de la cafetería y la ficha registra cuál de tres tipos es (`DEST_TIPO`). **La composta dentro de la cafetería no está cubierta por esta revisión** | Hoja 1, condición 1; Hoja 4 | Con composta en sitio hace falta una hoja de composta (día 0, material seco, estado), que reutilizaría los códigos de v0.3 §2.3, §4 y §5.1; la Hoja 4 dejaría de aplicar |
| **CAF-02** Tiempo máximo y plan B | Un número fijo de días (`ALM_TMAX`) y un plan B elegido entre tres (`PLANB`), los dos escritos antes del día 1. **El número no lo pone esta ficha:** lo fija quien opera el método | Hoja 1, condiciones 2 y 3; regla de parada de la Hoja 5 | Si el límite se define por condición observable, `ALM_TMAX` se retira y la regla de parada se reescribe |
| **CAF-03** Corrientes | Tres corrientes candidatas con vocabulario cerrado —`posos`, `prep`, `plato`—; el método marca cuáles acepta (`CORR_ACEPTA`) y las columnas de las demás se tachan | Hoja 1, condición 1; Hojas 2 a 5 | Una corriente distinta es un código nuevo y una revisión nueva del papel. La revisión puntual de la basura común no está incluida |
| **CAF-04** Denominador | **Ninguno.** Cantidades absolutas por corriente y por día con operación | Hoja 3; `DIAS_OP` | Un denominador (clientes, comidas servidas) iría en bandas y en la capa restringida, nunca en el papel (§10) |
| **CAF-05** ¿Se registra la corriente? | Sí: una columna por corriente, con códigos cerrados (opción b) | Hoja 3 | Con una sola corriente aceptada, las otras dos columnas se tachan |
| **CAF-06** Volumen o masa | Recipientes calibrados por corriente; kilos sólo si la cafetería ya pesa sus residuos (`UNIDAD`) | Hoja 2 | Si sólo se cuentan contenedores al recoger (opción c), la Hoja 3 sobra y queda la Hoja 4 |
| **CAF-07** Quién anota | Rayas del personal al vaciar; quien cierra el día escribe el total; quien recibe cuenta por su lado | Hojas 3 y 4 | Un renglón por turno duplica la Hoja 3 y añade un código de turno, que describe la rutina del negocio |
| **CAF-08** Modelo de datos | Instrumento y diccionario separados; lo común, por referencia (opción c) | §1 | — |
| **CAF-09** Acuerdo | Carta breve firmada por la gerencia; la ficha sólo registra que existe, porque la carta lleva nombres | Hoja 1, condición 6 | — |
| **CAF-10** Línea base | La ficha **admite las dos**: `FASE` distingue una semana de medición previa de los 28 días de piloto | Hoja 3 | Si se descarta la semana previa, `FASE` vale siempre `piloto` |
| **CAF-11** Visita de cierre | En la cafetería: revisión del guardado, pares de densidad por corriente y preguntas de cierre. El estado de la composta es de la ficha del destino | Hoja 6 | — |
| **CAF-12** Lo que necesita el modelo | El mínimo: cantidad por corriente y semana, fuga y un factor kg/L por corriente (§9) | §9 | Depende de la respuesta del proyecto del modelo |
| **CAF-13** Verificación sanitaria | La ficha registra **que se hizo y quién** (`SANIT_QUIEN`). **No dice qué exige ninguna norma:** ninguna se consultó | Hoja 1, condición 7 | — |
| **CAF-14** Incidente | Hay una condición de paro escrita antes del día 1 (opción b); su contenido no está en la ficha | Hoja 1, condición 8; `PAUSA_MOT` = `incidente` | Si un incidente sólo se describe, la condición 8 se retira |
| **CAF-15** Publicación | Nada se publica por cafetería sin permiso escrito de la gerencia; lo que sale del grupo va agregado | Hojas 2 y 6 | — |
| **CAF-16** Orden de trabajo | En paralelo (opción b): se redactó sobre lo firme (D1–D6) y **sin tocar la F-HOG**, que sigue en revisión | — | Al congelar F-HOG rev. 03 se reconcilian los 17 códigos compartidos (§1.5) |
| **CAF-17** Cafetería del precedente | Nada en el papel. Si participa, su estrato vive en la capa restringida (`ESTRATO_EQ`, v0.3 §7.5) | — | — |

**Decisiones propias de esta redacción**, que el análisis no traía y que el equipo también puede
cambiar:

1. **Prefijo de la clave: `K`.** El análisis lo dejó «por definir» y pidió que no chocara con valores
   en uso: `H` (hogar y humedad), `O`, `E`, `F`/`FG`, `A`, `M`, `X`, `P`, `S`, `REG` y también `C`, que
   ya es `C1`…`C7` en los criterios de éxito. `K` está libre.
2. **Numeración de las hojas: 1 a 6.** El esqueleto del análisis iba de la Hoja 0 a la 4. Aquí «antes
   del día 1» es la Hoja 1 y las entregas tienen hoja propia (la 4), porque las llenan dos partes.
3. **No se registra la hora de las salidas.** La fecha basta para el tiempo de guardado, y la hora
   describe la rutina del negocio (§10.3).
4. **La fuga se anota por corriente**, no como un total: cada corriente tiene su recipiente, así que un
   total «en recipientes» no significaría nada.
5. **El guardado se observa cada semana** (`ALM_OBS`), aunque en los hogares el estado pasó al día 28
   (acta-01, A-1). Lo que se observa aquí no es una composta sino un residuo guardado dentro de un
   negocio de alimentos, y el precedente del café (acta-01, RE-07) fue justo eso sin observar.
6. **Los prefijos `ENT_` no se usan.** En v0.3 significan «entrada» (`ENT_LPS`, `DENS_ENT`); las salidas
   de lo guardado llevan `SAL_`.

---

## 1. Lo que se comparte con el diccionario v0.3

Se toma **por referencia**: si v0.3 cambia una de estas reglas, cambia también aquí.

1. **Convenciones de ausencia** (v0.3 §1): `0`, `NR`, `NC`, `ND`, `NA`. Extensiones de cafeterías:
   - **`0` ≠ vacío ≠ cerrado.** En la Hoja 3, `0` = se abrió y no se separó nada de esa corriente;
     renglón vacío = `NR`; `CERRADO` marcado = no hubo operación, y las cantidades de ese día son `NA`.
   - **Corriente no aceptada** (fuera de `CORR_ACEPTA`, columna tachada): `NA` en todas sus casillas.
   - **Hoja 1:** la llena el programa; un campo vacío es un error de captura, no una respuesta.
   - **Hoja 4:** un renglón sin llenar no es un dato: no hubo salida. Dentro de un renglón con datos,
     una casilla vacía es `ND`.
2. **Regla de la multimarca** (v0.3 §6, D4). Todas las variables `multi` de esta ficha son
   **nominales**: se capturan en multi-hot y se resumen como frecuencia de presencia. No hay rango.
3. **«Se marcan, no se corrigen»** (v0.3 §8). Vale en especial para el balance de la Hoja 4: si quien
   recibe cuenta distinto de quien entrega, se conservan los dos números.
4. **Privacidad** (v0.3 §10), con las extensiones del §10 de este documento.
5. **Códigos compartidos: 17.** Tienen el mismo significado en las dos fichas:
   `ID`, `FINI`, `FICHA_REV`, `DREV`, `DIA`, `FECHA`, `NOTA_D`, `SEM`, `SFECHA`, `REG`, `NOTA_S`, `FCIE`,
   `CONTIN`, `CIE_FACIL`, `CIE_DIFICIL`, `CIE_CAMBIO` y `CIE_OTRO`. Dos amplían su dominio sin cambiar
   de significado: `ID` (admite claves `K#` además de `H#`) y `FICHA_REV` (lleva la serie: `CAF-01`).
   Las notas libres se acotan aquí «a la separación y al guardado» en lugar de «a la composta».
6. **Exportación** (`especificacion-cambios-app.md`): el CSV largo `id, ficha_rev, hoja, sem, dia,
   codigo, valor…` sirve tal cual si `ficha_rev` lleva la serie. **Nada de cafeterías entra a la app
   antes de que exista el código de la migración doméstica**; mientras tanto, papel.

---

## 2. Hoja 1 — Antes de empezar

La llenan **el programa y la gerencia antes del día 1**. Es una lista de condiciones, no un
cuestionario: mientras falte una, no se separa nada (regla IC-1).

| Código | Casilla en la ficha | Quién | Cuándo | Tipo | Valores | Origen | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ID` | Cafetería `K___` (encabezado de las seis hojas) | programa | antes | opción | `K1`, `K2`… | v0.3 | F-CAF | — obligatorio |
| `FICHA_REV` | Sello del pie: `F-CAF rev. NN` | — | impreso | opción | `CAF-01` | v0.3 | F-CAF | — |
| `DEST_TIPO` | Lo que se separa va a · marca uno | programa | antes | opción | `acopio` un acopio del programa · `composteras` composteras que ya existen · `tercero` el servicio de un tercero | nuevo | F-CAF | — obligatorio |
| `DEST_ID` | Clave del destino | programa | antes | texto | clave que asigna la coordinación; nunca un nombre ni una dirección | nuevo | F-CAF | — obligatorio |
| `CORR_ACEPTA` | El destino aceptó por escrito estas corrientes · marca todas | programa | antes | multi | `posos` posos de café y filtros · `prep` restos de preparación, crudos · `plato` restos de plato | nuevo | F-CAF | — obligatorio |
| `ALM_TMAX` | Tiempo máximo de guardado: ___ días | programa | antes | num | días, entero | nuevo | F-CAF | — obligatorio |
| `PLANB` | Plan B si se cumple el tiempo máximo sin recolección · marca uno | programa | antes | opción | `basura` se va a la basura y se anota como «no llegó» · `respaldo` se lleva a un destino de respaldo · `pausa` se deja de separar hasta que haya recolección | nuevo | F-CAF | — obligatorio |
| `REC_FREC` | Recolección cada ___ días | programa | antes | num | días, entero | nuevo | F-CAF | — obligatorio |
| `REC_ROL` | Recolección a cargo de · marca uno | programa | antes | opción | `programa` · `tercero` · `cafeteria` la cafetería lo lleva | nuevo | F-CAF | — obligatorio |
| `SANIT_QUIEN` | La verificación sanitaria la revisó · marca uno | programa | antes | opción | `cafeteria` · `programa` · `ambos` | nuevo | F-CAF | — obligatorio |
| `PRE` | Columna «Lista»: condiciones de arranque cumplidas · una casilla por condición | programa | antes | multi | `destino` · `tmax` · `planb` · `recoleccion` · `contenedores` · `acuerdo` · `sanitaria` · `paro` | nuevo | F-CAF | no marcada = no cumplida |
| `PRE_FECHA` | Las ocho quedaron listas el ___ | programa | antes | fecha | — | nuevo | F-CAF | `ND` |

> **`DEST_ID`** es una clave, como `ID`: qué destino es cada clave lo sabe sólo la lista de claves
> (§10.2). Si el destino es una compostera doméstica **del piloto**, su `ORG` recibiría residuo ajeno a
> la casa y `ENT_LPS` lo contaría como entrada de ese hogar (`planes/escalamiento_cafeterias.md` §8,
> hallazgo 3): la F-HOG no tiene casilla para separarlo, y esta ficha no lo resuelve.
>
> **`CORR_ACEPTA`** nombra corrientes **operativas**, no alimentos. Qué entra en cada una es decisión
> de quien opera el método y va en su guía de separación, no en este diccionario (§10.1).
>
> **`ALM_TMAX`** y la condición de paro existen por el precedente que dio origen a la bitácora
> (acta-01, RE-07): una corriente que se separó sin destino. Ningún documento del piloto doméstico fija
> un tiempo máximo de guardado; aquí es condición de arranque.

---

## 3. Hoja 2 — Arranque (día 1)

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Origen | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FINI` | Inicio ___/___/2026 | equipo | día 1 | fecha | — | v0.3 | F-CAF | — obligatorio |
| `UNIDAD` | Aquí se cuenta en · marca uno | cafetería | día 1 | opción | `recipientes` · `kg` kilos, con báscula propia | nuevo | F-CAF | — obligatorio |
| `MED_POSOS_DESC` · `MED_PREP_DESC` · `MED_PLATO_DESC` | Recipiente de medida de la corriente (descripción) | cafetería | día 1 | texto | descripción libre del recipiente, no de su contenido | nuevo | F-CAF | `NC`; `NA` si la corriente no se acepta |
| `MED_POSOS_CAP` · `MED_PREP_CAP` · `MED_PLATO_CAP` | Capacidad del recipiente, en litros | **equipo** | día 1 | num | litros, dos decimales; se calcula de la masa de agua, igual que el bote doméstico (v0.3 §2.2) | nuevo | F-CAF | `ND`; `NA` si la corriente no se acepta o si `UNIDAD` = `kg` |
| `DREV` | Día del renglón semanal | cafetería | día 1 | opción | `lu` · `ma` · `mi` · `ju` · `vi` · `sa` · `do` | v0.3 | F-CAF | `NC` |
| `SEP_QUIEN` | Quién separa · marca todos | cafetería | día 1 | multi | `personal` · `clientes` en una estación de separación | nuevo | F-CAF | `NC` |
| `ANOTA_ROL` | Quién cierra el día en la Hoja 3 (rol) | cafetería | día 1 | opción | `encargado` encargado o enlace · `turno` quien cierra el turno | nuevo | F-CAF | `NC` |
| `PERS_CAP` | Personas que separan y hay que capacitar | cafetería | día 1 | opción | `1_3` · `4_8` · `9_mas` | nuevo | F-CAF | `NC` |
| `DPRE_CAF` | Antes de este piloto, ¿qué camino seguían estos residuos? · marca todos | cafetería | día 1 | multi | `basura` basura común · `separada` recolección separada de orgánicos · `alguien` se los llevaba alguien · `compost` ya se compostaban · `animales` alimento de animales · `otro` | nuevo | F-CAF | `NC` |
| `DPRE_CAF_OTRO` | Otro: ___ | cafetería | día 1 | texto | — | nuevo | F-CAF | `NA` si `DPRE_CAF` no incluye `otro` |
| `LLEVA_FUERA` | Durante el piloto, alguien se lleva parte de estos residuos por fuera del programa | cafetería | día 1 | opción | `no` · `a_veces` · `casi_siempre` | nuevo | F-CAF | `NC` |
| `ALM_N` | Contenedores de guardado: cuántos | cafetería | día 1 | num | entero | nuevo | F-CAF | `NC` |
| `ALM_CAP` | Capacidad de cada uno, en litros | cafetería | día 1 | num | litros, **declarada** | nuevo | F-CAF | `NC` |
| `ALM_CAP_ND` | □ no la sé | cafetería | día 1 | bool | `marcada` → `ALM_CAP` = `ND` | nuevo | F-CAF | — |
| `ALM_TAPA` | Todos con tapa | cafetería | día 1 | bool | `si` · `no` | nuevo | F-CAF | `NC` |
| `ALM_IE` | Interior · Exterior | cafetería | día 1 | opción | `interior` · `exterior` | nuevo | F-CAF | `NC` |
| `ALM_SS` | Sol · Sombra | cafetería | día 1 | opción | `sol` · `sombra` | nuevo | F-CAF | `NC` |
| `ALM_FRIO` | Refrigerado · Sin refrigerar | cafetería | día 1 | opción | `refrigerado` · `ambiente` | nuevo | F-CAF | `NC` |
| `ALM_AREA` | En el área de alimentos · En un área aparte | cafetería | día 1 | opción | `alimentos` · `aparte` | nuevo | F-CAF | `NC` |
| `ALM_LIMPIA` | Quién lava los contenedores (rol) | cafetería | día 1 | opción | `cafeteria` · `programa` | nuevo | F-CAF | `NC` |

> **Por qué `DPRE_CAF` y no `DPRE`.** `DPRE` es una lista doméstica de cuatro opciones; ésta añade la
> recolección separada y «se los llevaba alguien», que es el camino del precedente. Otra lista, otro
> código. Sigue siendo indispensable: es la adicionalidad de la estimación de GEI
> (`diseno-mes-2-composta-suelo-gei.md` §4.4).
>
> **`LLEVA_FUERA`** es el análogo de `MASC`: no hay animales de la casa, pero sí puede haber quien se
> lleve residuos sin decisión del programa. Se pregunta sin juicio, igual que allá.
>
> **`PERS_CAP`** va en rangos y sin turnos: sirve para dimensionar la capacitación, no para describir
> la plantilla del negocio (§10.3).
>
> **`MED_*_CAP` y `ALM_CAP`.** Si los contenedores de guardado no son iguales, o si la cafetería pesa
> (`UNIDAD` = `kg`), las medidas de cada uno y la verificación de la báscula van en el registro técnico
> de cafeterías, que **todavía no existe** (§12).

---

## 4. Hoja 3 — Registro por día

Hoja de pared, junto a los contenedores: el personal pone una raya por recipiente vaciado y quien
cierra el día escribe el total. **Las rayas no se capturan**; se captura el total.

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Origen | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FASE` | Esta hoja es de · marca uno | equipo | día 1 | opción | `base` semana de medición previa: sólo se mide y lo separado sigue su camino de siempre · `piloto` lo separado se guarda y se entrega | nuevo | F-CAF | — obligatorio |
| `DIA` | Día | — | impreso | num | 1…28 | v0.3 | F-CAF | — |
| `FECHA` | Fecha día / mes | cafetería | diario | fecha | — | v0.3 | F-CAF | `NR` si el renglón está vacío |
| `CERRADO` | Cerrado: ese día no se abrió | cafetería | diario | bool | `marcada` | nuevo | F-CAF | no marcada |
| `SEP_POSOS` · `SEP_PREP` · `SEP_PLATO` | Total del día, por corriente | cafetería | diario | num | recipientes, **enteros y medios**; o kilos con un decimal si la cafetería cuenta en kilos | nuevo | F-CAF | `NR` si el renglón está vacío; `NC` si sólo falta ese número; `NA` si `CERRADO` o si la corriente no se acepta |
| `NOTA_D` | ¿Algo que contar de hoy? | cafetería | diario | texto | opcional, acotado a la separación y al guardado | v0.3 | F-CAF | vacío válido |

**Lo que mide `SEP_*`:** lo que **se separó** ese día en cada corriente. **No es generación** —lo que
nunca se separó no deja rastro (v0.3, D1)— ni es todavía lo que llegó al destino: eso lo dicen la
Hoja 4 y la fuga.

- Una raya = un recipiente lleno hasta el borde, sin apretar. Al cerrar, el último cuenta `½` si va a
  la mitad y `1` si va casi lleno. **Sólo enteros y medios**; la normalización de la captura es la de
  v0.3 §3 (lo que no sea entero ni medio se captura `ND`, con el texto original a la vista).
- En la fase `base` se usan sólo los días 1 a 7 de una hoja propia, y esa semana no hay salidas en la
  Hoja 4 (IC-13).

---

## 5. Hoja 4 — Entregas: salidas de lo guardado

Un renglón por cada vez que lo guardado **sale** de la cafetería, sea una recolección normal o la
aplicación del plan B. Lo llenan juntos quien entrega y quien recibe. La clave de captura es
`ID + SAL_N + código`.

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Origen | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SAL_N` | N.º de la salida | — | impreso | num | 1…16 | nuevo | F-CAF | — |
| `SAL_FECHA` | Fecha día / mes | cafetería | salida | fecha | — | nuevo | F-CAF | `ND` |
| `SAL_POSOS` · `SAL_PREP` · `SAL_PLATO` | Contenedores de guardado que salen, por corriente | cafetería | salida | num | contenedores, enteros y medios | nuevo | F-CAF | `ND`; `NA` si la corriente no se acepta |
| `SAL_TODO` | ¿Se llevó todo? | cafetería | salida | bool | `si` · `no` quedó algo guardado | nuevo | F-CAF | `ND` |
| `SAL_ENTREGA_ROL` | Entrega (rol) | cafetería | salida | opción | `encargado` · `turno` | nuevo | F-CAF | `ND` |
| `SAL_COND` | Lo que se ve al abrir · lo marcan los dos · marca todo | cafetería · recibe | salida | multi | `olor` olor fuerte · `moscas` · `moho` · `escurre` líquido al fondo · `impropios` algo que no va · `nada` nada de esto | nuevo | F-CAF | `ND` |
| `SAL_RECIBE_ROL` | Recibe (rol) | recibe | salida | opción | `programa` logística del programa · `destino` quien opera el destino · `tercero` | nuevo | F-CAF | `ND` |
| `SAL_RECIBE_CONT` | Contenedores que contó quien recibe | recibe | salida | num | contenedores, enteros y medios | nuevo | F-CAF | `ND` |
| `SAL_RECIBE_KG` | Kilos, si quien recibe pesa | recibe | salida | num | kg | nuevo | F-CAF | `NA` si no pesa |
| `SAL_PLANB` | Plan B | cafetería · recibe | salida | bool | `marcada` | nuevo | F-CAF | no marcada |

> **Para qué sirve.** Vuelve medible el cumplimiento **del programa**, no de la cafetería: cada cuánto
> salió lo guardado (`GUARD_DIAS`, §9) y si lo que salió es lo que llegó. `SAL_COND` usa un vocabulario
> propio y **no** los códigos `OLOR` ni `FAU` de v0.3, que describen una composta: el moho en un
> residuo guardado no es `F10`.
>
> **`SAL_PLANB`** marcada con `PLANB` = `basura` es una salida que no llegó al destino: se anota además
> como fuga esa semana (IC-9).

---

## 6. Hoja 5 — Renglón semanal (S1–S4)

Un renglón de unos dos minutos, el día `DREV`. La clave de captura es `ID + SEM + código`.

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Origen | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SEM` | Columna S1…S4 | — | impreso | opción | `1`…`4` | v0.3 | F-CAF | — |
| `SFECHA` | Fecha de este renglón | cafetería | semanal | fecha | — | v0.3 | F-CAF | reglas de v0.3 §1.2–§1.3 |
| `DIAS_OP` | Días que abrimos esta semana | cafetería | semanal | num | 0…7 | nuevo | F-CAF | `NC` |
| `MIN_CAF` | Minutos de todo el personal en la semana | cafetería | semanal | num | minutos, sumados entre todas las personas | nuevo | F-CAF | `NC` |
| `REG` | Cómo anotamos esta semana · **marca sólo una** | cafetería | semanal | opción | `REG1` anotamos todos los días que abrimos · `REG2` nos faltaron algunos | v0.3 | F-CAF | `ND` |
| `FUGA_POSOS` · `FUGA_PREP` · `FUGA_PLATO` | Lo que no llegó al destino, por corriente · escribe `0` si todo llegó | cafetería | semanal | num | misma unidad que la Hoja 3 | nuevo | F-CAF | `NC`; `NA` si la corriente no se acepta |
| `FUGA_CAF_MOT` | Si algo no llegó, ¿por qué? · marca todas | cafetería | semanal | multi | `sin_recoleccion` no hubo recolección · `vencido` se echó a perder o pasó el tiempo máximo · `contaminado` venía revuelto con cosas que no van · `sin_espacio` los contenedores estaban llenos · `sin_tiempo` no dio tiempo de separar · `fuera` se lo llevó alguien por fuera del programa · `otro` **→ exige `NOTA_S`** | nuevo | F-CAF | `NA` si las tres fugas son `0`; si no, `NC` |
| `ALM_LLENOS` | Contenedores de guardado llenos en este momento | cafetería | semanal | num | enteros y medios | nuevo | F-CAF | `NC` |
| `ALM_DIAS` | Días desde la última recolección | cafetería | semanal | num | días | nuevo | F-CAF | `NC` |
| `REC_FALTO` | Recolecciones acordadas que no llegaron · escribe `0` si llegaron todas | cafetería | semanal | num | entero | nuevo | F-CAF | `NC` |
| `PAUSA_DIAS` | Días que abrimos y no se separó · escribe `0` si ninguno | cafetería | semanal | num | 0…7 | nuevo | F-CAF | `NC` |
| `PAUSA_MOT` | Si los hubo, ¿por qué? · marca todas | cafetería | semanal | multi | `tmax` se cumplió el tiempo máximo sin recolección · `lleno` contenedores llenos · `incidente` un incidente en el guardado · `indicacion` lo indicó el programa o la gerencia · `otro` **→ exige `NOTA_S`** | nuevo | F-CAF | `NA` si `PAUSA_DIAS` = 0; si no, `NC` |
| `ALM_OBS` | Al abrir los contenedores esta semana vimos · marca todo | cafetería | semanal | multi | `olor` olor fuerte al abrir · `moscas` · `moho` · `escurre` líquido escurrido · `huellas` huellas, excremento o mordidas de un animal · `nada` nada de lo anterior | nuevo | F-CAF | `NC` |
| `ACT_CAF` | Qué hicimos esta semana · marca todo | cafetería | semanal | multi | `retiro` retiramos material que no iba **→ exige `NOTA_S`** · `lavado` lavamos los contenedores · `capacitacion` explicamos la separación a personal nuevo · `cambio` cambiamos recipientes o su lugar · `otro` **→ exige `NOTA_S`** · `nada` no cambiamos nada | nuevo | F-CAF | `NC` |
| `NOTA_S` | Lo que quieran contar de esta semana | cafetería | semanal | texto | opcional salvo por los `otro` y por `retiro` | v0.3 | F-CAF | vacío válido |

> **La fuga** conserva la regla de D1 —`generación estimada = lo separado + la fuga`, siempre como
> cota inferior— pero con **otra lista de motivos**: la doméstica (`FG1`…`FG5`) es cerrada por decisión
> y supone una composta en casa. Los de aquí son de logística. `sin_tiempo` describe la operación, no
> la vida privada de nadie; aun así no sale del grupo sin agregar (§10.3).
>
> **`REC_FALTO`, `ALM_DIAS` y `PAUSA_MOT` = `tmax`** miden al programa. Si una semana trae recolecciones
> que no llegaron, quien falló no fue la cafetería.
>
> **`ALM_OBS`** comparte cuatro valores con `SAL_COND` (`olor`, `moscas`, `moho`, `escurre`) y añade
> `huellas`. `nada` excluye a los demás, como `F00` en v0.3.
>
> **`MIN_CAF`** no es `MIN_S`: son minutos sumados de varias personas, no de una. Es el costo de
> tiempo del piloto para el negocio.

---

## 7. Hoja 6 — Cierre

Se llena **sólo el día de cierre**, durante y después de la visita del equipo.

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Origen | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FCIE` | Fecha del cierre | cafetería | cierre | fecha | — | v0.3 | F-CAF | `NC` |
| `ALM_OBS_F` | Al abrir los contenedores vimos · marca todo | cafetería | cierre | multi | `olor` · `moscas` · `moho` · `escurre` · `huellas` · `nada` | nuevo | F-CAF | `ND` |
| `ALM_LLENOS_F` | Contenedores de guardado llenos en este momento | cafetería | cierre | num | enteros y medios | nuevo | F-CAF | `NC` |
| `FIN_GUARD` | Lo que está guardado hoy · marca uno | cafetería | cierre | opción | `nada` no hay nada guardado · `recoleccion` se va en la siguiente recolección · `planb` sigue el plan B | nuevo | F-CAF | `NC` |
| `ALM_TAM` | El espacio de guardado nos resultó | cafetería | cierre | opción | `chico` · `adecuado` · `grande` | nuevo | F-CAF | `NC` |
| `REC_SUF` | La recolección pasó | cafetería | cierre | opción | `poca` menos de lo necesario · `adecuada` lo necesario · `mucha` más de lo necesario | nuevo | F-CAF | `NC` |
| `CUELLO_CAF` | Lo que más limitó el mes en esta cafetería · **marca uno** | cafetería | cierre | opción | `separar` separar durante el servicio · `anotar` llevar el registro · `espacio` espacio para guardar · `recoleccion` que la recolección llegara a tiempo · `personal` cambios de personal y capacitación · `lavado` lavar los contenedores · `tiempo` · `nada` nada en particular · `otro` | nuevo | F-CAF | `NC` |
| `CUELLO_CAF_OTRO` | Otro: ___ | cafetería | cierre | texto | — | nuevo | F-CAF | `NA` si `CUELLO_CAF` ≠ `otro` |
| `CONTIN` | El mes que viene | cafetería | cierre | opción | `igual` · `con_cambios` · `lo_dejo` | v0.3 | F-CAF | `NC` |
| `CIE_FACIL` | Lo que nos resultó fácil de sostener | cafetería | cierre | texto | opcional | v0.3 | F-CAF | vacío válido |
| `CIE_DIFICIL` | Lo que nos costó más trabajo | cafetería | cierre | texto | opcional | v0.3 | F-CAF | vacío válido |
| `CIE_CAMBIO` | Si volviéramos a empezar, cambiaríamos | cafetería | cierre | texto | opcional | v0.3 | F-CAF | vacío válido |
| `CIE_OTRO` | Algo que el programa debería saber | cafetería | cierre | texto | opcional | v0.3 | F-CAF | vacío válido |

> **`ALM_TAM` y `REC_SUF`** son las que permiten dimensionar el guardado y la frecuencia de recolección
> del siguiente ciclo; `CUELLO_CAF` tiene opciones de logística y de personal que `CUELLO` no tiene.
> Ninguna evalúa a la cafetería.

---

## 8. Reglas de integridad y de consistencia

**Se marcan, no se corrigen** (v0.3 §8). `error` invalida sólo la variable afectada; `señal` se lee.

| # | Regla | Tipo | Análoga en v0.3 |
| --- | --- | --- | --- |
| IC-1 | `FINI` con fecha y `PRE` sin sus ocho marcas | error: se arrancó sin las condiciones | — |
| IC-2 | `REC_FREC` mayor que `ALM_TMAX` | error | — |
| IC-3 | Número en `SEP_*`, `SAL_*` o `FUGA_*` de una corriente que no está en `CORR_ACEPTA` | señal | — |
| IC-4 | `CERRADO` marcada y algún `SEP_*` mayor que cero ese día | error | — |
| IC-5 | Cantidad que no es entero ni medio, con `UNIDAD` = `recipientes` | error | I-6 |
| IC-6 | `REG1` y `REG2` marcadas a la vez | error | I-4 |
| IC-7 | `nada` junto con otra opción en `SAL_COND`, `ALM_OBS`, `ALM_OBS_F` o `ACT_CAF` | error | I-1, I-2 |
| IC-8 | `FUGA_CAF_MOT` marcado con las tres fugas en `0`, o `PAUSA_MOT` marcado con `PAUSA_DIAS` = 0 | error | I-9 |
| IC-9 | `SAL_PLANB` marcada con `PLANB` = `basura` y fuga `0` esa semana | señal | — |
| IC-10 | Un `otro`, o `retiro`, sin `NOTA_S` esa semana | señal | I-7 |
| IC-11 | `DIAS_OP` distinto de los días de esa semana sin `CERRADO` en la Hoja 3 | señal | — |
| IC-12 | `ALM_DIAS` mayor que `ALM_TMAX`, o `GUARD_DIAS` mayor que `ALM_TMAX` | señal: un lote pasó del tiempo máximo | — |
| IC-13 | `FASE` = `base` y algún renglón de la Hoja 4 con fecha de esa semana | señal | — |
| IC-14 | `SAL_RECIBE_CONT` distinto de `SAL_POSOS` + `SAL_PREP` + `SAL_PLATO` | señal: se conservan los dos números | — |
| IC-15 | `LLEVA_FUERA` = `no` y alguna semana con `fuera` (o `casi_siempre` y ninguna) | señal | I-14 |
| IC-16 | `ALM_LLENOS` o `ALM_LLENOS_F` mayor que `ALM_N` | error | I-17 |
| IC-17 | Más de una marca en una variable de opción única | error | I-5 |

---

## 9. Derivadas — se calculan, nunca se capturan a mano

| Código | Fórmula | Unidad | Instr. | Nota |
| --- | --- | --- | --- | --- |
| `SEP_POSOS_L` · `SEP_PREP_L` · `SEP_PLATO_L` | `SEP_*` × `MED_*_CAP` | L/día | DER | Sólo con `UNIDAD` = `recipientes`. Con `kg`, `SEP_*` ya es masa y no se convierte a volumen |
| `SEP_DIA` | Σ `SEP_*_L` de la semana / días con operación | L por día abierto | DER | **«Separado por día de operación»**, por corriente. El indicador mínimo: no pide ningún dato del negocio |
| `SAL_L` | (`SAL_POSOS` + `SAL_PREP` + `SAL_PLATO`) × `ALM_CAP` | L por salida | DER | Aproximado: supone contenedores iguales |
| `DEST_L` | Σ `SAL_L` de las salidas sin `SAL_PLANB` hacia `basura` | L/semana | DER | **«Entrada al destino»**. Nunca «generación» |
| `GUARD_DIAS` | `SAL_FECHA` − fecha de la última salida con `SAL_TODO` = `si` (o `FINI`) | días | DER | Tiempo de guardado del lote más antiguo. Se compara con `ALM_TMAX` (IC-12) |
| `GEN_EST_CAF` | Σ `SEP_*_L` + Σ fuga, en litros | L/semana | DER | Generación estimada, autorreportada, **cota inferior** |
| `BALANCE_CAF` | Σ `SEP_*_L` − Σ `SAL_L` − fuga − lo que sigue guardado | L | DER | Debería acercarse a cero; la diferencia es una señal, no un error de nadie |

> **El volumen no se convierte automáticamente a masa** (v0.3 §9). Hace falta **un par de densidad por
> corriente**, medido por el equipo en la visita de cierre: los posos no tienen la densidad del
> «residuo de alimentos suelto» con que v0.3 contrasta sus pares domésticos.
>
> **Los criterios de éxito no están definidos.** El análisis propone análogos de `C1`…`C7` y tres
> criterios nuevos **del programa** (recolecciones a tiempo, ningún lote pasado del tiempo máximo,
> ningún lote con un destino que el programa no decidió), todos con umbral «por definir». Esta ficha
> captura lo necesario para calcularlos —`REC_FALTO`, `GUARD_DIAS`, `fuera`, `SAL_PLANB`— pero no fija
> ninguno.

---

## 10. Privacidad: lo que se extiende a un negocio

Las ocho restricciones de v0.3 §10 valen aquí sin cambios. Lo que se añade:

1. **Corriente no es composición.** `posos`, `prep` y `plato` son corrientes operativas de un negocio,
   con vocabulario cerrado y sin texto libre. **`tipo_residuo` sigue retirada** (v0.3 §11) y esto no la
   reconecta: aquel campo era texto libre sobre lo que se come en una casa. Ninguna casilla de F-CAF
   admite describir alimentos, y el equipo tampoco describe el contenido de lo que pesa.
2. **Ningún campo admite el nombre del negocio, su dirección, su teléfono ni su correo**, ni nombres
   del personal o de la gerencia: sólo `ID` y roles. La **lista de claves** (`K#` ↔ negocio,
   `DEST_ID` ↔ destino) y la **carta de acuerdo**, que lleva nombres, nunca entran al repositorio.
3. **Nada que exponga el negocio.** No hay casillas de ventas, tickets, clientes, comidas servidas,
   compras, proveedores, menú ni horarios. No se registra la hora de las salidas ni qué turno anotó.
   `REC_FREC`, `DIAS_OP`, `CERRADO` y `SAL_FECHA` describen la rutina del negocio: **no salen del
   equipo junto con el `ID`**, igual que `DREV`.
4. **Un negocio se reidentifica más fácil que un hogar.** Con una o pocas cafeterías, cualquier número
   publicado la señala. Nada se publica por cafetería sin permiso escrito de la gerencia; lo que sale
   del grupo va agregado.
5. **Fotos:** sólo la hoja, o el interior de un contenedor; sin logotipos, fachada, clientes ni
   personal, y con la ubicación desactivada.
6. **«Pueden dejar en blanco cualquier pregunta»** vale para las Hojas 2, 5 y 6. La Hoja 1 es del
   programa y la Hoja 4 es un registro de dos partes: ahí un vacío no es una respuesta (§1.1).

---

## 11. Conteo de variables

| | F-CAF rev. 01 |
| --- | ---: |
| **Códigos que se capturan en la ficha (`F-CAF`)** | **86** |
| … compartidos con v0.3 | 17 |
| … nuevos | 69 |
| Derivadas (`DER`) | 9 |

De los 69 nuevos, 15 son las mismas cinco variables repetidas en las tres corrientes (`MED_*_DESC`,
`MED_*_CAP`, `SEP_*`, `SAL_*`, `FUGA_*`). El conteo se rehace con `npm test`; si este cuadro y la
prueba difieren, manda la prueba.

---

## 12. Qué falta para que esto se pueda usar

**Decisiones.** Las diecisiete del §0. Bloquean el papel, según el propio análisis: CAF-01, 02, 03,
04, 05, 06, 07, 09, 10, 11, 13 y 16.

**Instrumentos que acompañan a la ficha y no existen todavía:**

| Instrumento | Por qué no está aquí |
| --- | --- |
| Guía de separación, guardado y entrega para el personal | Su contenido es **método**, y el método no lo define Miltli |
| Registro técnico de cafeterías | Calibración de los recipientes, medidas de los contenedores, pares de densidad por corriente y verificación de la báscula propia. Depende de CAF-06 |
| Protocolo operativo de cafeterías | Cómo y en qué orden se observa cada variable; capacitación por turno |
| Carta de acuerdo de participación | No es un instrumento de datos y lleva nombres: vive fuera del repositorio |
| Ficha del destino o del acopio | Es otra ficha; si el destino composta, ahí va el estado de la composta |
| Tabla de correspondencia de F-CAF | Se escribe al congelar, como la doméstica |

**Cambios pendientes en documentos domésticos**, que no se hicieron para no mover lo que está en
revisión:

- La **bitácora del programa** debería admitir claves `K#` en `BIT_HOGAR` y tipos de logística
  (recolección, incidencia de guardado, aplicación del plan B). Es el instrumento que habría registrado
  el precedente.
- `ID` y `FICHA_REV` están cerrados en v0.3 a `H1`…`H5` y a `02` · `03`; la especificación de la app y
  `docs/app.js` repiten ese cierre.

**Pruebas.** Ninguna hecha. Como mínimo: llenado de la Hoja 3 en un turno real con hora pico, y el
renglón semanal cronometrado.
