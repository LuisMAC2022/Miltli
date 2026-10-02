# Diccionario de datos Miltli v0.3 — BORRADOR

> **Borrador.** Sustituye a `diccionario-de-datos-v0.2-borrador.md`, que se conserva sin cambios para
> comparar. Incorpora las decisiones de `acta-01-decisiones-piloto.md` (D1–D6, aclaraciones A-1…A-4,
> encargos E-1…E-4 y RE-01…RE-14). Las decisiones D1–D6 son firmes (acta-01 §0.2); lo que el acta
> marca **PROPUESTA** está señalado aquí con la misma etiqueta y su número `P-xx`.
>
> Deriva **casilla por casilla** de `miltli-ficha-hogares.html` (**F-HOG rev. 03**, cuatro hojas), de
> `registro-tecnico-equipo.md` (v0.3), de `hoja-concordancia.html` y de
> `plantilla-bitacora-programa.md`. Si cualquiera de ellos cambia, este documento cambia con él.
> La correspondencia casilla ↔ código se comprueba con `npm test` (`tests/ficha-cobertura.test.js`),
> que lee los atributos `data-codigo` del HTML (RE-14).

## Cómo leer este documento

- **Código**: etiqueta estable. No aparece impresa en la hoja del hogar: viaja en el atributo
  `data-codigo` de cada casilla del HTML, invisible al imprimir. **Un código no se reutiliza ni se
  renombra**: si una casilla desaparece, su código se retira (§11); si aparece otra, recibe uno nuevo.
- **Quién**: `hogar` · `equipo` · `coordinador` · `—` (impreso o calculado).
- **Cuándo**: `día 1` · `diario` · `semanal` · `día 28` · `—` (derivada).
- **Tipo**: `num` · `texto` · `opción` (una) · `multi` (varias) · `fecha` · `hora` · `bool`.
- **Instr.** (instrumento donde vive la casilla):

  | Valor | Instrumento | Se verifica contra |
  | --- | --- | --- |
  | `F-HOG` | Ficha del hogar, F-HOG rev. 03 | `data-codigo` en `miltli-ficha-hogares.html` |
  | `RT` | Registro técnico del equipo | Columna de códigos de `registro-tecnico-equipo.md` |
  | `CONC` | Hoja de concordancia | `data-codigo` en `hoja-concordancia.html` |
  | `BIT` | Bitácora del programa (sólo la plantilla está en el repositorio) | `plantilla-bitacora-programa.md` |
  | `DER` | Derivada: se calcula, nunca se captura a mano | — |
  | `ANA` | Capa de análisis restringida: **vive fuera del repositorio** (§7.5) | — |
  | `PROP` | Propuesta, **no impresa**: sólo existe si el comité la aprueba | — |

- **Si falta**: qué valor de ausencia (§1) toma la casilla cuando queda vacía.
- **D4**: escala de las variables de opción múltiple (§6). `ord` = ordinal, `nom` = nominal.

---

## 0. Qué cambia respecto de v0.2

| | v0.2 | v0.3 |
| --- | --- | --- |
| Nombre de `ORG` | «Orgánico que eché» con uso «flujo de entrada»; el plan lo llamaba «generación» | **Entrada a la composta**. El indicador se llama «Entrada a la composta (L/persona/semana)» (D1) |
| Lo que no llega a la composta | Sin registro | `FUGA` + `FUGA_MOT`, semanales (D1) |
| Estado de la composta | Semanal, Hoja 3, cuatro observaciones | **Una vez, el día 28**, Hoja 4, durante la visita (A-1) |
| Hoja 3 | Revisión semanal de estado | **Renglón semanal** de entrada y rutina (A-1) |
| Material seco | Sólo disponibilidad al alta | + `SECO_USO` semanal y par de densidad del seco (RE-03) |
| Visitas del equipo | Dos (las que fijara el comité) | **Día 1** (medición) + **día 28** (cierre) (D3) |
| Densidad | Pareada «en dos momentos» | Un momento (día 28): entrada, seco y pila (D3) |
| Multimarca | Regla sin decidir | Rango sólo en ordinales; nominales en multi-hot (D4, §6) |
| Día 0 | No existía | `D0_FECHA`, `D0_BASE`, `D0_VACIO` (D6) |
| Regla del 80 % | Sólo en el plan | `PARADA_DIA` (RE-02) |
| Concordancia | Descrita en prosa | Hoja propia con tres fuentes (RE-12) |
| Bitácora del programa | No existía | Plantilla (RE-07) |

**Conteo** (detalle en §12): v0.2 tenía **68** variables (la revisión 03 citaba 67, antes de dar de
alta `FICHA_REV`). v0.3 tiene **159 códigos**: 124 que se capturan (`F-HOG` 65, `RT` 51,
`CONC` 12, `BIT` 5, con 9 compartidos entre instrumentos), 32 derivadas, 2 de la capa
restringida y 1 propuesta no impresa. Dos códigos se retiran en esta versión (§11).

---

## 1. Convenciones de ausencia

Las de v0.2 siguen vigentes. v0.3 las **extiende** a la Hoja 3 nueva, a la revisión del día 28 y al
registro del equipo.

| Valor | Significa | Dónde aparece |
| --- | --- | --- |
| `0` | Se observó o midió y la cantidad fue cero | `ORG`, `SEC`, `FUGA`, cantidades |
| `NR` | No se realizó el registro ese día, esa semana o esa visita | Renglón vacío de la Hoja 2; columna vacía de la Hoja 3; Hoja 4 entera en blanco; visita no hecha |
| `NC` | No contestada: el hogar decidió no responder | Preguntas de alta y de cierre; **casillas vacías dentro de una semana con datos** |
| `ND` | Se observó pero no pudo determinarse | Variables de estado; `REG`; mediciones del equipo que no se pudieron hacer |
| `NA` | No aplica | Dependientes de otra respuesta |

Reglas, de la más general a la más específica:

1. **`0` ≠ vacío** (v0.2). En la Hoja 2 la leyenda cambia (RE-01): **«`0` = hoy no agregué nada a la
   composta»**. El residuo guardado se anota el día en que se echa, así que un `0` dice que no hubo
   depósito, no que no hubo residuo.
2. **Hoja 3, columna completa vacía** → todos los campos de esa semana son `NR`.
3. **Hoja 3, columna con algún dato** → cada casilla vacía es `NC`, **incluida `FUGA`**: el hogar debe
   escribir `0` si todo llegó, y la hoja lo pide. Excepciones: `FUGA_MOT` es `NA` cuando `FUGA` = 0;
   `REG` vacío es `ND` (v0.2).
4. **Hoja 4, revisión de estado**: una sección sin marcas es `ND`, como en v0.2. La hoja entera en
   blanco es `NR`.
5. **Preguntas de alta y de cierre** vacías: `NC` (v0.2). Nunca se imputan ni se pregunta por qué
   (§10.4).
6. **Registro del equipo**: la promesa «puedes dejar en blanco» es para el hogar, no para el equipo.
   **Un campo vacío del equipo es un error de captura.** Lo que no se pudo medir se escribe `ND` con la
   razón en `VIS_NOTA`; lo que no corresponde al método o a la forma del contenedor, `NA`; si la visita
   no ocurrió, `VIS_OK` = `no_se_pudo` y el resto de esa visita es `NR`.
7. **Hoja de concordancia**: una variable sin marcar por un observador es `ND`; la hoja entera en
   blanco, `NR`.

---

## 2. Hoja 1 — Arranque (día 1)

### 2.1 Identificación y contexto

| Código | Casilla en la ficha | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ID` | Hogar `H___` (encabezado de las cuatro hojas) | equipo | día 1 | opción | `H1`…`H5` | F-HOG · RT | — obligatorio |
| `FINI` | Inicio ___/___/2026 | equipo | día 1 | fecha | — | F-HOG | — obligatorio |
| `FICHA_REV` | Sello del pie: `F-HOG rev. NN` | — | impreso | opción | `02` · `03` | F-HOG | — |
| `DREV` | Día del renglón semanal | hogar | día 1 | opción | `lu` · `ma` · `mi` · `ju` · `vi` · `sa` · `do` | F-HOG | `NC` |
| `PERS0` | Personas que comen en casa la mayoría de los días | hogar | día 1 | num | entero | F-HOG | `NC` |
| `MASC` | **Durante el piloto**, parte de los restos se va a animales de la casa | hogar | día 1 | opción | `no` · `a_veces` · `casi_siempre` | F-HOG | `NC` |
| `DPRE` | Antes de este piloto, ¿qué camino seguían los restos? | hogar | día 1 | multi · nom | `basura` · `animales` · `compost` · `otro` | F-HOG | `NC` |
| `DPRE_OTRO` | Otro: ___ | hogar | día 1 | texto | — | F-HOG | `NA` si `DPRE` no incluye `otro` |

> **Cambios.** `MASC` lleva ahora «durante el piloto» (D-4 de la revisión 03): `DPRE` es el pasado y
> `MASC` el presente, y el papel ya lo dice. `DREV` cambia sus valores de `L M M J V S D` a dos letras
> (`lu`, `ma`, `mi`…), porque las dos «M» circuladas no se distinguen al capturar (contraste §1.3.d);
> el papel imprime «Lu Ma Mi Ju Vi Sá Do». `DREV` sigue sin salir del equipo (§10.3) y ahora fija el
> día del **renglón semanal**, no de una revisión de estado.

### 2.2 Infraestructura y medida

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `BOTE_DESC` | Mi bote de medida es | hogar | día 1 | texto | descripción libre del recipiente | F-HOG | `NC` |
| `BOTE_CAP` | Capacidad medida por el equipo ___ L | **equipo** | día 1 | num | litros, dos decimales; **se calcula de la masa de agua** (§7.1) | F-HOG · RT | `ND` |
| `BOTE_SEC_MISMO` | Uso el mismo bote para el seco | hogar | día 1 | bool | `si` · `no` | F-HOG | `NC` |
| `BOTE_SEC_DESC` | Otro recipiente ___ | hogar | día 1 | texto | — | F-HOG | `NA` si `BOTE_SEC_MISMO` = `si` |
| `BOTE_SEC_CAP` | ___ L | equipo | día 1 | num | litros; misma regla que `BOTE_CAP` | F-HOG · RT | `NA` como arriba |
| `CONT_TIPO` | Contenedor: tipo | hogar | día 1 | texto | — | F-HOG | `NC` |
| `CONT_CAP` | Contenedor: capacidad | hogar | día 1 | num | litros, **declarada** | F-HOG | `NC` |
| `CONT_CAP_ND` | □ no la sé | hogar | día 1 | bool | marcada → `CONT_CAP` = `ND` | F-HOG | — |
| `UBIC_IE` | Interior · Exterior | hogar | día 1 | opción | `interior` · `exterior` | F-HOG | `NC` |
| `UBIC_SS` | Sol · Sombra | hogar | día 1 | opción | `sol` · `sombra` | F-HOG | `NC` |
| `UBIC_TL` | Techado · A la lluvia | hogar | día 1 | opción | `techado` · `lluvia` | F-HOG | `NC` |
| `UBIC_TP` | Sobre tierra · Sobre piso firme | hogar | día 1 | opción | `tierra` · `piso` | F-HOG | `NC` |
| `SECO_DISP` | Material seco con el que cuento | hogar | día 1 | multi · nom | `hojas` · `carton` · `papel` · `aserrin` · `otro` | F-HOG | `NC` |
| `SECO_DISP_OTRO` | Otro: ___ | hogar | día 1 | texto | — | F-HOG | `NA` si no incluye `otro` |
| `SECO_ACC` | Conseguir material seco me resulta | hogar | día 1 | opción | `en_casa` · `cerca` · `salir` · `no_se_donde` | F-HOG | `NC` |
| `SECO_RES` | Reserva de material seco al arrancar | hogar | día 1 | num | botes | F-HOG | `NC` |

> **Cambio de método en `BOTE_CAP`** (D3). Ya no se cuenta con botellas de 1 L: el equipo pesa el bote
> vacío (`BOTE_TARA`) y lleno de agua hasta el borde (`BOTE_AGUA`), y `BOTE_CAP` = (`BOTE_AGUA` −
> `BOTE_TARA`) / 1000, porque 1 g de agua ≈ 1 mL (error menor de 0.5 % a temperatura ambiente). El
> dato de origen está en el registro técnico; el número de la Hoja 1 es la copia que el hogar consulta.
> El día 1 se orienta a **botes de ~1 L** (RE-01): un día normal ocupa varias unidades y el «½» se
> vuelve una resolución fina.
>
> **`UBIC_TP` = `tierra`** obliga al método geométrico en el cierre (§7.2): una compostera sin fondo no
> se puede pesar.

### 2.3 Día 0 — cómo arrancó la composta *(nuevo, D6)*

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `D0_FECHA` | Fecha de la primera carga | hogar | día 1 | fecha | — | F-HOG | `NC` |
| `D0_BASE` | Botes de material seco en la capa base | hogar | día 1 | num | botes, enteros y medios | F-HOG | `NC` |
| `D0_VACIO` | El contenedor arrancó | hogar | día 1 | opción | `vacio` · `con_material` (ya tenía composta o material de antes) | F-HOG | `NC` |

Resuelven la revisión 03 §2.4: sin ellos la serie no tiene origen. `D0_VACIO` = `con_material` cambia
el balance de masa del cierre: la tara del día 1 ya no corresponde a un contenedor vacío (§8).

---

## 3. Hoja 2 — Registro diario

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `DIA` | Día | — | impreso | num | 1…28 | F-HOG | — |
| `FECHA` | Fecha día / mes | hogar | diario | fecha | — | F-HOG | `NR` si el renglón está vacío |
| `ORG` | Orgánico que eché a la composta | hogar | diario | num | botes, **enteros y medios**: `0`, `½`, `1`, `1½`… | F-HOG | `NR` |
| `SEC` | Seco que eché encima | hogar | diario | num | botes, enteros y medios | F-HOG | `NR` si el renglón está vacío; `NC` si sólo falta este número |
| `NOTA_D` | ¿Algo que quieras contar de hoy? | hogar | diario | texto | opcional, acotado a la composta | F-HOG | vacío válido |

**Lo que mide `ORG`** (D1): **entrada a la composta**, en botes echados ese día. **No es generación.**
Reglas impresas en la hoja (RE-01, D-5):

- Se anota el **día en que se echa**, no el día en que se generó el residuo.
- Sólo **enteros y medios**. **PROPUESTA (P-03):** si no llega a medio bote, se guarda para el
  siguiente depósito.
- Desde `PARADA_DIA` (§4) el hogar deja de echar: `ORG` = `0`, y lo que no entró va a `FUGA`.
- El día 28 el hogar guarda los residuos del día hasta que llegue el equipo (RE-06); después de la
  visita los echa y los anota en el renglón 28.

**Normalización de la captura (D-5).** Se acepta un número entero, un entero seguido de `½` o de
`.5`, o `½`. Cualquier otra cosa («1¼», «poquito», «60 %») se captura como `ND`, **se conserva el
texto original** en una columna de auditoría y se marca (§8). No se redondea.

---

## 4. Hoja 3 — Renglón semanal (S1–S4)

Un renglón corto de **entrada y rutina** por semana, el día `DREV` (A-1). La clave de captura es
`ID + SEM + código`.

| Código | Casilla | Quién | Cuándo | Tipo | Valores | D4 | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SEM` | Columna S1…S4 | — | impreso | opción | `1`…`4` | — | F-HOG | — |
| `SFECHA` | Fecha de este renglón | hogar | semanal | fecha | — | — | F-HOG | regla §1.2–§1.3 |
| `REG` | Cómo anoté esta semana · **marca sólo una** | hogar | semanal | opción | `REG1` anoté todos los días · `REG2` me faltaron algunos | — | F-HOG | `ND` |
| `FUGA` | Botes que esta semana **no llegaron** a la composta · escribe `0` si todo llegó | hogar | semanal | num | botes, enteros y medios | — | F-HOG | `NC` (§1.3) |
| `FUGA_MOT` | ¿Por qué no llegaron? · marca todas las que apliquen | hogar | semanal | multi | `FG1` ya no cabía · `FG2` no tenía material seco · `FG3` se fueron a animales · `FG4` se fueron a la basura · `FG5` otro **→ exige `NOTA_S`** | nom | F-HOG | `NA` si `FUGA` = 0; si no, `NC` |
| `SECO_USO` | Material seco que usé esta semana · marca todos | hogar | semanal | multi | `hojas` · `carton` · `papel` · `aserrin` · `otro` **→ exige `NOTA_S`** · `ninguno` | nom | F-HOG | `NC` |
| `PERS_S` | Personas que comieron en casa casi todos los días | hogar | semanal | num | entero | — | F-HOG | `NC` |
| `MIN_S` | Minutos que le dediqué a la composta en toda la semana | hogar | semanal | num | minutos | — | F-HOG | `NC` |
| `LLEN_S` | Qué tan lleno está el contenedor · **marca una** | hogar | semanal | opción | `1/4` · `1/2` · `3/4` · `casi_lleno` | — | F-HOG | `NC` |
| `ACT` | ¿Qué hiciste esta semana? · marca todo · **PROPUESTA P-04** | hogar | semanal | multi | `A0` no cambié nada · `A1` removí o mezclé · `A2` agregué material seco de más · `A3` agregué agua · `A4` retiré material que no iba **→ exige `NOTA_S`** · `A5` cambié otra cosa **→ exige `NOTA_S`** | nom | F-HOG | `NC` |
| `NOTA_S` | Lo que quieras contar de esta semana | hogar | semanal | texto | opcional salvo por `FG5`, `SECO_USO` = `otro`, `A4`, `A5` | — | F-HOG | vacío válido |
| `PARADA_DIA` | Dejé de agregar residuos el día ___ · □ no hizo falta parar | hogar | una vez | num | día 1…28 · `no_paro` | — | F-HOG | `NC` |

> **`FUGA` y `FUGA_MOT` (D1).** `generación estimada = entrada + fuga`. Es una **cota inferior**: lo
> que nunca se separó no deja rastro. Los motivos son de la composta; **no hay motivos de rutina del
> hogar** (viajes, ausencias, visitas), por decisión y por privacidad (§10.3).
>
> **`SECO_USO` (RE-03)** usa los valores de `SECO_DISP`, para poder ver si el hogar usó lo que dijo
> tener. **PROPUESTA (P-21):** la opción `ninguno` («no usé material seco esta semana») excluye a las
> demás, como `F00` y `A0`.
>
> **`REG` (D-1)** vuelve a ser una opción única **también en el papel** («marca sólo una»). Si llegan
> las dos marcas, es un error (§8), no un dato.
>
> **`LLEN_S` (D-2)** pasa a **cuatro casillas cerradas**: se marca, no se escribe.
>
> **`ACT`** queda en la Hoja 3 como recomienda el acta (P-04): es rutina, no estado, y recordarla un
> mes entero es poco fiable. Si el comité la pasa al día 28, el bloque se mueve a la Hoja 4 con los
> mismos códigos y `Cuándo` = `día 28`. `A0` excluye `A1`–`A5`. Los códigos conservan la numeración
> de v0.1; **el orden impreso no coincide con el de los códigos** y la captura se hace por
> `data-valor`, nunca por posición.
>
> **`PARADA_DIA` (RE-02)** registra cuándo se aplicó la regla del 80 %. Desde ese día lo no depositado
> va a `FUGA` con `FG1`. **PROPUESTA (P-08):** el día 1 el equipo marca la línea del 80 % por dentro
> del contenedor.

**Propuesta no impresa:**

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `OBS_MISMA_S` | Esta semana anotó la misma persona de siempre | hogar | semanal | bool | `si` · `no` | PROP | — |

**PROPUESTA P-05**, con recomendación de **no** imprimirla (acta-01, E-4). Si el comité la aprueba, se
imprime en la Hoja 3, su `Instr.` pasa a `F-HOG` y el código no cambia.

---

## 5. Hoja 4 — Día 28: revisión de estado y cierre

La Hoja 4 se llena **sólo el día 28**. La revisión de estado se hace **durante la visita de cierre**,
en el orden de RE-06, y el hogar marca **por separado y sin hablar** con el equipo (protocolo v0.2
§1.5). El equipo marca lo mismo en la hoja de concordancia (§7.3).

### 5.1 Revisión de estado del día 28

| Código | Casilla | Quién | Cuándo | Tipo | Valores | D4 | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FCIE` | Fecha del cierre | hogar | día 28 | fecha | — | — | F-HOG | `NC` |
| `OBS_MISMA` | Esta revisión la hizo la misma persona de siempre | hogar | día 28 | bool | `si` · `no` | — | F-HOG | `NC` |
| `VAHO` | Al abrir había vaho o gotas en la tapa | hogar | día 28 | bool | marcada / no marcada | — | F-HOG · CONC | no marcada |
| `HUM` | Humedad, prueba del puño | hogar | día 28 | multi | `H1` se desmorona · `H2` se apelmaza, no sale agua · `H3` una o dos gotas · `H4` escurre agua · `H5` líquido en el fondo | **ord** | F-HOG · CONC | `ND` |
| `OLOR` | Olor | hogar | día 28 | multi | `O0` casi no huele · `O1` tierra/bosque · `O2` dulce, fruta, vinagre · `O3` amoniaco · `O4` drenaje, huevo podrido · `O5` otro **→ exige `NOTA_E`** | nom | F-HOG · CONC | `ND` |
| `FAU` | Quién vive aquí | hogar | día 28 | multi | `F01` lombrices · `F02` cochinillas, milpiés, caracoles, babosas · `F03` escarabajos o larvas en C · `F04` larvas de mosca soldado · `F05` mosquitas de la fruta · `F06` mosquitos negros de superficie · `F07` moscas grandes o gusanos blancos · `F08` hormigas · `F09` cucarachas · `F10` hongos · `F11` huellas o excavaciones · `F12` **no supe identificar → exige `NOTA_E`** · `F00` ninguno de los anteriores | nom | F-HOG · CONC | `ND` |
| `MEZ_AV` | Avance de la descomposición | hogar | día 28 | multi | `M1` se distinguen casi todos los restos · `M2` algunos ya no se reconocen · `M3` la mayor parte parece tierra oscura | **ord** | F-HOG · CONC | `ND` |
| `MEZ_TX` | Textura | hogar | día 28 | multi | `X1` suelta · `X2` apelmazada · `X3` con bloques grandes | nom | F-HOG · CONC | `ND` |
| `NOTA_E` | Lo que quieras contar de esta revisión | hogar | día 28 | texto | opcional salvo por `O5`, `F12` | — | F-HOG | vacío válido |

> **Cambio de frecuencia (A-1).** Estas variables pasan de semanales a **una observación por hogar**,
> el día 28. El objetivo de aprendizaje D (estado → acción → estado) pasa al mes 2.
>
> **Sin cambios de códigos.** Se conservan los de v0.2, de modo que la serie es legible aunque cambie
> la frecuencia. **No se concatenan** los datos semanales de una ficha rev. 02 con los del día 28 de
> una rev. 03: el análisis separa por `FICHA_REV`.
>
> **`MEZ_AV` y `MEZ_TX` (D-3)** van separados por una línea visible en el papel, cada uno con su título.
>
> **Glosas (A-4).** Cuatro glosas que prescribían una acción pasan a la hoja guía; dos se reescriben
> para describir la composta y no a la persona (`F07`, `F11`). Los códigos no cambian.

### 5.2 Cierre

| Código | Casilla | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `LLEN_F` | ¿Qué tan lleno quedó el contenedor? · **marca una** | hogar | día 28 | opción | `1/4` · `1/2` · `3/4` · `casi_lleno` · `lleno` | F-HOG | `NC` |
| `SECO_FALT` | ¿Hubo semanas en que te faltara material seco? | hogar | día 28 | opción | `no` · `si` | F-HOG | `NC` |
| `SECO_FALT_N` | Sí, en ___ de las 4 | hogar | día 28 | num | 1…4 | F-HOG | `NA` si `SECO_FALT` = `no` |
| `SECO_DIF` | Conseguir material seco durante el mes me resultó | hogar | día 28 | opción | `facil` · `esfuerzo` · `dificil` · `nunca_supe` | F-HOG | `NC` |
| `CONT_TAM` | El tamaño del contenedor me resultó | hogar | día 28 | opción | `chico` · `adecuado` · `grande` | F-HOG | `NC` |
| `CUELLO` | Lo que más limitó el mes en esta casa · **marca una** · **PROPUESTA P-22** | hogar | día 28 | opción | `seco` conseguir material seco · `espacio` espacio en el contenedor · `tiempo` · `anotar` llevar el registro · `separar` separar los restos en la cocina · `otro` · `nada` nada en particular | F-HOG | `NC` |
| `CUELLO_OTRO` | Otro: ___ | hogar | día 28 | texto | — | F-HOG | `NA` si `CUELLO` ≠ `otro` |
| `CONTIN` | El mes que viene | hogar | día 28 | opción | `igual` · `con_cambios` · `lo_dejo` | F-HOG | `NC` |
| `CIE_FACIL` | Lo que me resultó fácil de sostener | hogar | día 28 | texto | opcional | F-HOG | vacío válido |
| `CIE_DIFICIL` | Lo que me costó más trabajo | hogar | día 28 | texto | opcional | F-HOG | vacío válido |
| `CIE_CAMBIO` | Si volviera a empezar, cambiaría | hogar | día 28 | texto | opcional | F-HOG | vacío válido |
| `CIE_OTRO` | Algo que el equipo debería saber y no cabe arriba | hogar | día 28 | texto | opcional | F-HOG | vacío válido |

> **`LLEN_F`** pasa de «circula uno» a casillas, por la misma razón que `LLEN_S`. Forma el par
> percepción–medición con `LLEN_REF` (RE-04), como antes lo hacía `HUM_REF` con `TEMP_I`.
>
> **`CUELLO`** existe para que el criterio de éxito #5 («identificó su cuello de botella») sea
> calculable (D2). `SECO_DIF` sigue cerrando el par con `SECO_ACC` del alta.

---

## 6. Regla de la multimarca, variable por variable (D4)

**El rango (mínimo, máximo) sólo existe en las variables ordinales.** En las nominales, el «rango»
dependería del número asignado a cada código. El artefacto «Seis decisiones del piloto» aplicaba el
rango a las ocho variables multirrespuesta de v0.2; se corrige por esa razón (acta-01, D4).

| Variable | Escala | Columnas en la captura | Resumen que se grafica | Exclusión | Nota |
| --- | --- | --- | --- | --- | --- |
| `HUM` | Ordinal `H1` < `H2` < `H3` < `H4` < `H5` | `HUM_H1`…`HUM_H5` (0/1) | `HUM_MIN`, `HUM_MAX`; `HUM_PRED` sólo si hay una marca | — | `VAHO` **no** es un nivel de `HUM` |
| `MEZ_AV` | Ordinal `M1` < `M2` < `M3` | `MEZ_AV_M1`…`M3` | `MEZ_AV_MIN`, `MEZ_AV_MAX`; `MEZ_AV_PRED` con una marca | — | — |
| `MEZ_TX` | **Nominal** | `MEZ_TX_X1`…`X3` | Frecuencia de presencia | — | `X2` (compactación) y `X3` (tamaño de partícula) no están en un eje |
| `OLOR` | Nominal | `OLOR_O0`…`O5` | Frecuencia de presencia | — | `O0` no excluye: se puede casi no oler arriba y oler a fermento al remover |
| `FAU` | Nominal | `FAU_F00`…`F12` | Frecuencia de presencia | `F00` excluye `F01`–`F12` | — |
| `ACT` | Nominal | `ACT_A0`…`A5` | Frecuencia de presencia por semana | `A0` excluye `A1`–`A5` | — |
| `DPRE` | Nominal | `DPRE_basura`…`otro` | Frecuencia de presencia | — | — |
| `SECO_DISP` | Nominal | `SECO_DISP_hojas`…`otro` | Frecuencia de presencia | — | — |
| `FUGA_MOT` | Nominal | `FUGA_MOT_FG1`…`FG5` | Frecuencia de presencia por semana | — | Todas `NA` si `FUGA` = 0 |
| `SECO_USO` | Nominal | `SECO_USO_hojas`…`ninguno` | Frecuencia de presencia por semana | `ninguno` excluye a las demás (P-21) | — |

Las variables de **opción única** (`REG`, `LLEN_S`, `LLEN_F`, `CUELLO`, etc.) no tienen regla de
reducción: si llegan dos marcas, es un error de integridad (§8).

---

## 7. Mediciones del equipo y otros instrumentos

### 7.0 Campos comunes de cada visita — `RT`

| Código | Campo | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `VIS_TIPO` | Tipo de visita | equipo | día 1 · día 28 | opción | `dia1` · `cierre` | RT | — obligatorio |
| `VIS_FECHA` | Fecha de la visita | equipo | día 1 · día 28 | fecha | — | RT | — obligatorio |
| `VIS_HORA` | Hora (en el cierre, hora de la lectura de `TEMP_I`) | equipo | día 1 · día 28 | hora | hh:mm | RT | `ND` |
| `VIS_QUIEN` | Quién del equipo | equipo | día 1 · día 28 | opción | **clave de equipo** `E1`, `E2`… nunca un nombre | RT | — obligatorio |
| `VIS_OK` | ¿Se pudo hacer la visita? | equipo | día 1 · día 28 | opción | `si` · `repuesta` (dentro de la ventana) · `no_se_pudo` | RT | — obligatorio |
| `FOTO_EQ` | Foto tomada | equipo | día 1 · día 28 | bool | `si` · `no` | RT | `ND` |
| `VIS_NOTA` | Nota técnica | equipo | día 1 · día 28 | texto | sólo sobre la medición o el contenedor | RT | vacío válido |

> **`VIS_QUIEN`** deja de ser texto libre: lleva una clave de equipo. La correspondencia clave ↔
> persona la guarda la coordinación, igual que la lista de claves. **Nadie del equipo visita su propia
> casa** (D3, RE-08); el cumplimiento lo verifica la coordinación, fuera del repositorio, porque el
> repositorio no sabe qué hogar es de quién.
>
> **`VIS_SEM` se retira** (§11): ya no hay visitas por semana.

### 7.1 Día 1 — medición del sistema — `RT`

| Código | Campo | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `BOTE_TARA` | Masa del bote de medida vacío | equipo | día 1 | num | g, resolución 1 g | RT | `ND` |
| `BOTE_AGUA` | Masa del bote lleno de agua hasta el borde | equipo | día 1 | num | g | RT | `ND` |
| `BOTE_SEC_TARA` | Masa del recipiente del seco vacío | equipo | día 1 | num | g | RT | `NA` si `BOTE_SEC_MISMO` = `si` |
| `BOTE_SEC_AGUA` | Masa del recipiente del seco lleno de agua | equipo | día 1 | num | g | RT | `NA` como arriba |
| `CONT_FORMA` | Forma interior del contenedor | equipo | día 1 | opción | `rect` · `cil` · `cubeta` (más ancha arriba que abajo) · `otra` | RT | `ND` |
| `CONT_LARGO` | Largo interior | equipo | día 1 | num | cm | RT | `NA` si no es `rect` |
| `CONT_ANCHO` | Ancho interior | equipo | día 1 | num | cm | RT | `NA` si no es `rect` |
| `CONT_DIAM_SUP` | Diámetro interior en la boca | equipo | día 1 | num | cm | RT | `NA` si es `rect` |
| `CONT_DIAM_INF` | Diámetro interior en el fondo | equipo | día 1 | num | cm | RT | `NA` si es `rect` |
| `CONT_ALTO` | Altura interior útil (del fondo o del suelo al borde) | equipo | día 1 | num | cm | RT | `ND` |
| `CONT_TARA` | Masa del contenedor vacío, con tapa | equipo | día 1 | num | kg, resolución ≤ 0.1 | RT | `ND` |
| `CONT_TARA_MET` | Cómo se obtuvo la tara | equipo | día 1 | opción | `bascula_equipo` · `bascula_hogar` (báscula de baño, por diferencia) · `no_tomada` | RT | — obligatorio |

> **`CONT_TARA_MET`** existe porque el día 1 puede no ser presencial en cada casa (**PROPUESTA P-02**).
> `bascula_hogar` lleva un error declarado de ± 0.5 kg o más; `no_tomada` obliga al método geométrico
> en el cierre.

### 7.2 Día 28 — visita de cierre — `RT`

| Código | Campo | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `RES_GUARDADO` | El hogar guardó los residuos del día | equipo | día 28 | opción | `si` · `no` · `no_hubo` (no hubo residuo ese día) | RT | `ND` |
| `TEMP_I` | Temperatura del montón | equipo | día 28 | num | °C, **con la resolución del instrumento** (sin décimas si no las muestra) | RT | `ND` |
| `TEMP_AMB` | Temperatura ambiente a la sombra | equipo | día 28 | num | °C, misma regla | RT | `ND` |
| `TEMP_PROF` | Profundidad de la sonda | equipo | día 28 | num | cm, referencia 15 | RT | `ND` |
| `PESO_MET` | Método de la masa de la pila | equipo | día 28 | opción | `bascula` · `geometrico` · `ambos` (P-09) | RT | — obligatorio |
| `PESO_BRUTO` | Masa de la compostera completa, con tapa | equipo | día 28 | num | kg, resolución ≤ 0.1 | RT | `NA` si `PESO_MET` = `geometrico` |
| `DENS_V` | Volumen del bote lleno de residuo fresco del día | equipo | día 28 | num | litros | RT | `ND` si `RES_GUARDADO` ≠ `si` |
| `DENS_M` | Masa de ese residuo, **sin tara** | equipo | día 28 | num | g | RT | `ND` como arriba |
| `DENS_T` | Tara del bote | equipo | día 28 | num | g | RT | `ND` como arriba |
| `DENS_SECO_TIPO` | Material seco principal de esa semana | equipo | día 28 | opción | valores de `SECO_DISP` | RT | `ND` |
| `DENS_SECO_V` | Volumen del bote lleno de ese material | equipo | día 28 | num | litros | RT | `ND` |
| `DENS_SECO_M` | Masa del material, sin tara | equipo | día 28 | num | g | RT | `ND` |
| `DENS_SECO_T` | Tara del recipiente | equipo | día 28 | num | g | RT | `ND` |
| `DENS_PILA_V` | Volumen del bote lleno de material de la pila | equipo | día 28 | num | litros | RT | `NA` si `PESO_MET` = `bascula` |
| `DENS_PILA_M` | Masa del material de la pila, sin tara | equipo | día 28 | num | g | RT | `NA` como arriba |
| `DENS_PILA_T` | Tara del recipiente | equipo | día 28 | num | g | RT | `NA` como arriba |
| `LLEN_REF` | Altura de llenado medida con regla | equipo | día 28 | num | cm, del fondo a la superficie nivelada sin apretar | RT | `ND` |
| `MUE_COMP_M` | Masa de la muestra de composta extraída | equipo | día 28 | num | g | RT | `NA` si no se tomó |
| `SUELO_TIPO` | Suelo disponible para el diseño pareado | equipo | día 28 | opción | `jardin` · `macetas` · `sin_suelo` | RT | `ND` |
| `SUELO_CON` | Parche o maceta que recibirá composta | equipo | día 28 | opción | `P1` · `P2` (asignado con un volado, P-14) | RT | `NA` si `sin_suelo` |
| `SUELO_PROF` | Profundidad de muestreo | equipo | día 28 | num | cm (fija para todos; ver `diseno-mes-2-composta-suelo-gei.md`) | RT | `NA` si `sin_suelo` |
| `SUELO_SUB` | Submuestras que forman cada muestra compuesta | equipo | día 28 | num | entero | RT | `NA` si `sin_suelo` |
| `MUE_SUELO_P1_M` | Masa de la muestra compuesta del parche P1 | equipo | día 28 | num | g | RT | `NA` si `sin_suelo` |
| `MUE_SUELO_P2_M` | Masa de la muestra compuesta del parche P2 | equipo | día 28 | num | g | RT | `NA` si `sin_suelo` |

> **Los tres pares de densidad** (D3, RE-03): entrada (`DENS_*`), seco (`DENS_SECO_*`) y pila
> (`DENS_PILA_*`). Convención heredada de v0.2: `_M` es la masa **neta** (sin tara) y `_T` la tara, que
> se anota aunque la báscula se haya tarado con el recipiente encima. Son **cinco pares de cada uno**,
> en un solo momento: la conversión L→kg es **exploratoria** y se contrasta con EPA 2016 (§9).
>
> **La densidad de una muestra suelta de la pila subestima la densidad in situ** (D3). Por eso el
> método geométrico se declara siempre con ese sesgo, y P-09 propone medir los dos métodos donde se
> pueda pesar.
>
> **El equipo no describe el contenido** de ningún bote que pesa (§10.2). `DENS_SECO_TIPO` nombra un
> material seco, no un alimento.
>
> **`HUM_REF` se retira** (§11): el par percepción–instrumento lo dan la `HUM` de la Hoja 4 y la
> `TEMP_I` de la misma visita, y copiar la marca del hogar durante la visita rompería la independencia.

### 7.3 Hoja de concordancia — `CONC` (RE-12)

Tres fuentes: estaciones de humedad el día 1, panel de fotos y observación simultánea del día 28. Las
marcas usan **los mismos códigos** que la Hoja 4 (`VAHO`, `HUM`, `OLOR`, `FAU`, `MEZ_AV`, `MEZ_TX`).

| Código | Campo | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `CONC_FUENTE` | Fuente | equipo | día 1 · día 28 | opción | `estacion` · `foto` · `pila` | CONC | — obligatorio |
| `CONC_FECHA` | Fecha de la observación | observador | día 1 · día 28 | fecha | — | CONC | `ND` |
| `CONC_OBS` | Clave del observador | equipo | día 1 · día 28 | opción | `O1`, `O2`… asignada en la sesión; nunca un nombre | CONC | — obligatorio |
| `CONC_ROL` | Grupo del observador | equipo | día 1 · día 28 | opción | `voluntario` · `equipo` · `externo` | CONC | — obligatorio |
| `CONC_ITEM` | Qué se observa | equipo | día 1 · día 28 | texto | nº de estación (1–5), nº de foto (1–20) o `H#` de la pila | CONC | — obligatorio |
| `CONC_REF` | Estado de referencia de la estación | equipo | día 1 | opción | `H1`…`H5`, preparado y conocido; no se muestra al observador | CONC | `NA` fuera de estaciones |

> **`CONC_ROL`** separa a los observadores ingenuos de los que conocen el instrumento. Los hogares del
> equipo (RE-08) observan como `equipo` y **no cuentan** en las medidas de concordancia de
> observadores ingenuos. `externo` existe para la **PROPUESTA P-13** (evaluadores ajenos al piloto en
> el panel de fotos).

### 7.4 Bitácora del programa — `BIT` (RE-07)

Sólo la plantilla está en el repositorio; los registros viven donde vivan los datos.

| Código | Campo | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `BIT_FECHA` | Fecha | coordinador | cuando ocurra | fecha | — | BIT | — obligatorio |
| `BIT_HOGAR` | Hogar | coordinador | cuando ocurra | opción | `H1`…`H5` · `todos` | BIT | — obligatorio |
| `BIT_TIPO` | Tipo | coordinador | cuando ocurra | opción | `recordatorio` · `consejo` · `reunion` · `entrega_seco` · `cambio_protocolo` · `imprevisto` · `otro` | BIT | — obligatorio |
| `BIT_CONT` | Contenido, sin datos personales | coordinador | cuando ocurra | texto | — | BIT | — obligatorio |
| `BIT_ROL` | Quién (rol, no nombre) | coordinador | cuando ocurra | opción | `coordinacion` · `equipo` · `hogar` · `externo` | BIT | — obligatorio |

### 7.5 Capa de análisis restringida — `ANA` (fuera del repositorio)

| Código | Qué es | Quién la asigna | Dónde vive | Uso |
| --- | --- | --- | --- | --- |
| `ESTRATO_EQ` | `si` si el hogar es de una persona del equipo (RE-08) | coordinación | Con los datos, **nunca** en el papel, en el repositorio ni en documentos públicos | Analizar los hogares del equipo como estrato propio y excluirlos de la concordancia de observadores ingenuos |
| `ESC_SITIO` | Escenario de sitio de disposición que se le asigna al hogar para la estimación de GEI | coordinación | Con la lista de claves, **nunca** en el repositorio | Elegir `MCF` y `OX` (`diseno-mes-2-composta-suelo-gei.md` §4.4) sin asociar `H#` con municipio |

> Son tres hogares del equipo (respuesta del 2-oct-2026; acta-01, RE-08). El repositorio dice
> cuántos son, nunca cuáles. Los resultados por estrato (3 y 2 hogares) se usan sólo dentro del
> equipo; lo que sale del grupo va agregado sobre los cinco.

### 7.6 Verificación de instrumentos — `RT` (RE-05)

Una fila por instrumento y por día de medición, **antes** de la primera casa.

| Código | Campo | Quién | Cuándo | Tipo | Valores | Instr. | Si falta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `VER_FECHA` | Fecha de la comprobación | equipo | día 1 · día 28 | fecha | — | RT | — obligatorio |
| `VER_INSTR` | Instrumento | equipo | día 1 · día 28 | opción | `termometro` · `bascula_cocina` · `bascula_plataforma` | RT | — obligatorio |
| `VER_REF` | Valor de referencia | equipo | día 1 · día 28 | num | 0 °C (agua con hielo) · 1000 g (1 L de agua) · masa conocida en kg | RT | — obligatorio |
| `VER_LECT` | Lectura del instrumento | equipo | día 1 · día 28 | num | misma unidad | RT | `ND` |
| `VER_OK` | Dentro de la tolerancia | equipo | día 1 · día 28 | bool | `si` · `no` (tolerancias en el registro técnico) | RT | — obligatorio |

---

## 8. Reglas de integridad y de consistencia

**Se marcan, no se corrigen.** Un registro que viola una regla conserva su valor original y lleva una
marca; nadie lo «arregla» en la captura. Las de tipo **error** invalidan sólo la variable afectada
(pasa a `ND` en el análisis, con el original a la vista); las de tipo **señal** se leen, no se
invalidan.

| # | Regla | Tipo | Origen |
| --- | --- | --- | --- |
| I-1 | `F00` junto con cualquier `F01`–`F12` | error | v0.2 |
| I-2 | `A0` junto con cualquier `A1`–`A5` | error | v0.2 |
| I-3 | `SECO_USO` = `ninguno` junto con otra opción | error | RE-03, P-21 |
| I-4 | `REG1` y `REG2` marcadas a la vez | error | D-1 |
| I-5 | Más de una marca en `LLEN_S`, `LLEN_F` o `CUELLO` | error | D-2 |
| I-6 | Cantidad en `ORG`, `SEC`, `FUGA` o `D0_BASE` que no es entero ni medio | error | D-5 |
| I-7 | `FG5`, `A4`, `A5` o `SECO_USO` = `otro` sin `NOTA_S` esa semana | señal | v0.2, D1 |
| I-8 | `O5` o `F12` sin `NOTA_E` | señal | v0.2, A-1 |
| I-9 | `FUGA_MOT` marcado con `FUGA` = 0 | error | D1 |
| I-10 | **`FG1` «ya no cabía» en una semana que termina antes de `PARADA_DIA`** | señal | RE-02 |
| I-11 | `ORG` > 0 en un día posterior a `PARADA_DIA` | señal | RE-02 |
| I-12 | `PARADA_DIA` registrado y `LLEN_S` de esa semana en `1/4` o `1/2` | señal | RE-02 |
| I-13 | `SECO_USO` = `ninguno` en una semana con algún `SEC` > 0 | señal | RE-03 |
| I-14 | `MASC` = `casi_siempre` y ninguna semana con `FG3` (o `MASC` = `no` y alguna con `FG3`) | señal | D1 |
| I-15 | `BOTE_CAP` difiere de (`BOTE_AGUA` − `BOTE_TARA`) / 1000 en más de 0.01 L | error | D3 |
| I-16 | `DENS_V` difiere de `BOTE_CAP` en más de 5 % cuando se usó el bote del hogar lleno al borde | señal | D3 |
| I-17 | `LLEN_REF` > `CONT_ALTO` | error | RE-04 |
| I-18 | `PESO_NETO` ≤ 0, o densidad media de la pila (`PESO_NETO` / `VOL_OCUP`) fuera de 0.1–1.2 kg/L | señal | D3, RE-05 |
| I-19 | `CONT_TARA_MET` = `no_tomada` y `PESO_MET` ≠ `geometrico` | error | D3 |
| I-20 | `UBIC_TP` = `tierra` y `PESO_MET` = `bascula` | error | D3 |
| I-21 | `D0_VACIO` = `con_material` y balance de masa calculado como si arrancara vacío | señal | D6 |
| I-22 | `TEMP_I` o `TEMP_AMB` con más decimales de los que muestra el instrumento verificado | señal | RE-05 |
| I-23 | `VIS_FECHA` de cierre fuera de la ventana aprobada (P-01) y `VIS_OK` = `si` | señal | D3 |
| I-24 | `RES_GUARDADO` ≠ `si` y algún `DENS_V`/`DENS_M` con número | señal | RE-06 |
| I-25 | `SUELO_TIPO` = `sin_suelo` y algún campo `SUELO_*` o `MUE_SUELO_*` con número | error | A-3 |
| I-26 | `VER_OK` = `no` en un instrumento usado ese día | señal (afecta todas las lecturas de ese instrumento ese día) | RE-05 |
| I-27 | El mismo `CONC_OBS` aparece con dos `CONC_ROL` distintos | error | RE-12 |

---

## 9. Derivadas — se calculan, nunca se capturan a mano

| Código | Fórmula | Unidad | Instr. | Nota |
| --- | --- | --- | --- | --- |
| `ORG_L` | `ORG` × `BOTE_CAP` | L/día | DER | |
| `SEC_L` | `SEC` × `BOTE_CAP` (o `BOTE_SEC_CAP` si el hogar usa dos recipientes) | L/día | DER | |
| `FUGA_L` | `FUGA` × `BOTE_CAP` | L/semana | DER | |
| `RAZON` | Σ `SEC_L` / Σ `ORG_L` de la semana | — | DER | Comparable con la regla 1:2 **dentro** del hogar; entre hogares sólo con `DENS_SECO` |
| `ENT_LPS` | Σ `ORG_L` de la semana / `PERS_S` | L/persona/semana | DER | **«Entrada a la composta (L/persona/semana)»**. Nunca «generación» |
| `GEN_EST` | (Σ `ORG_L` + `FUGA_L`) / `PERS_S` | L/persona/semana | DER | **Generación estimada**, autorreportada, cota inferior; se presenta siempre con su error |
| `CONT_AREA` | `rect`: `CONT_LARGO` × `CONT_ANCHO`; `cil`: π·(`CONT_DIAM_SUP`/2)²; `cubeta`: área a la altura de llenado, por interpolación lineal de los diámetros | cm² | DER | |
| `CONT_VOL` | Volumen interior geométrico hasta `CONT_ALTO` | L | DER | Se contrasta con `CONT_CAP` declarado |
| `ALT_80` | 0.8 × `CONT_ALTO` | cm | DER | Altura de la línea del 80 % (P-08) |
| `VOL_OCUP` | Volumen geométrico hasta `LLEN_REF` | L | DER | |
| `LLEN_FRAC` | `VOL_OCUP` / `CONT_VOL` | — | DER | Par con `LLEN_F` (percepción) |
| `RED_VOL` | 1 − `VOL_OCUP` / (Σ `ORG_L` + Σ `SEC_L` + `D0_BASE` × `BOTE_CAP`) | — | DER | Reducción de volumen frente a la entrada acumulada: mezcla asentamiento y descomposición |
| `PESO_NETO` | `PESO_BRUTO` − `CONT_TARA` | kg | DER | Excluye el residuo del par DENS, que se echa después del pesaje |
| `DENS_ENT` | `DENS_M` / (1000 × `DENS_V`) | kg/L | DER | Contraste: EPA 2016, residuo de alimentos suelto ≈ 0.27 kg/L |
| `DENS_SECO` | `DENS_SECO_M` / (1000 × `DENS_SECO_V`) | kg/L | DER | Contraste EPA 2016: hojas sueltas 0.15–0.30; aserrín ≈ 0.16; cartón aplanado ≈ 0.06 |
| `DENS_PILA` | `DENS_PILA_M` / (1000 × `DENS_PILA_V`) | kg/L | DER | Muestra suelta: **subestima** la densidad in situ |
| `MASA_GEOM` | `VOL_OCUP` × `DENS_PILA` | kg | DER | Cota inferior de la masa de la pila |
| `DIA_VIS` | `VIS_FECHA` (cierre) − `FINI` + 1 | día | DER | Día del piloto en que ocurrió la visita |
| `HUM_MIN`, `HUM_MAX`, `HUM_PRED` | Mínimo y máximo marcados; predominante sólo si hay una marca | código | DER | §6 |
| `MEZ_AV_MIN`, `MEZ_AV_MAX`, `MEZ_AV_PRED` | Ídem | código | DER | §6 |
| `C1`…`C7` | Criterios de éxito de proceso (acta-01, D2) | sí/no | DER | Tabla de cálculo en `planes/plan_trabajo.md` |
| `GEI_EST` | `M_desviada` × `EF_relleno` − `M_compostada` × `EF_casera` | kg CO2e | DER | **Estimación**, nunca medición. Método en `diseno-mes-2-composta-suelo-gei.md` §4.4 |

> **El volumen no se convierte automáticamente a masa** (decisión arquitectónica #4). Toda masa se
> calcula en el análisis, puede rehacerse y se reporta como **rango** a partir de los pares de
> densidad.
>
> **Reactividad (RE-09).** Medir el desperdicio de alimentos lo reduce por sí solo (Ramos et al. 2024,
> *British Food Journal* 126(2):812–833). **Una tendencia descendente de `ENT_LPS` no se interpreta sin
> más como fatiga o sub-registro.**
>
> **Lo que el registro le da a un simulador** (RE-13): `ENT_LPS`, `FUGA_L` y un factor kg/L de cinco
> pares. **Nada de composición**: la del simulador saldrá de estudios de caracterización publicados.

---

## 10. Restricciones de privacidad del esquema

Las seis de v0.2 siguen **intactas**; v0.3 las extiende a los campos nuevos. Son parte del contrato
de datos, no un apéndice.

1. **Ningún campo admite nombre, dirección, teléfono ni correo.** El único identificador del hogar es
   `ID`. Un esquema derivado que agregue una columna «responsable» deja de cumplir este diccionario
   (D5). **Extensión v0.3:** las personas del equipo y los observadores tampoco se nombran: `VIS_QUIEN`
   lleva una clave de equipo, `CONC_OBS` una clave de observador y `BIT_ROL` un rol.
2. **No existe ninguna variable de composición o tipo de residuo**, ni en el hogar ni en el equipo.
   **Extensión v0.3:** los pares de densidad pesan y miden volumen, **no describen el contenido**;
   `DENS_SECO_TIPO` nombra un material seco, no un alimento; `FUGA_MOT` dice por qué no llegó, no qué
   era. `tipo_residuo` está **retirada por privacidad** (D5) y no se mapea a nada.
3. **`DREV` no se publica ni se comparte fuera del equipo.** **Extensión v0.3:** tampoco motivos de
   fuga que describan la rutina del hogar (no existen como opción), ni `VIS_FECHA`/`VIS_HORA` junto con
   el `ID` fuera del equipo.
4. **`NC` no se imputa** ni se pregunta por qué. Vale para las casillas nuevas de las Hojas 3 y 4.
5. **La lista de claves** (`ID` ↔ domicilio) **no forma parte de este diccionario** y no vive en el
   mismo archivo, hoja de cálculo ni repositorio que los datos. **Nombres fijos (D5):** «tabla de
   correspondencia» es la de campos y se versiona; «lista de claves» es la de hogares y **nunca entra
   al repositorio**. **Extensión v0.3:** con la lista de claves viven también la correspondencia
   clave de equipo ↔ persona y la asignación de escenarios `ESC_SITIO`, porque **en el repositorio no
   puede quedar ninguna asociación hogar ↔ municipio**.
6. **`ID` es seudonimización, no anonimización.** Todo lo que sale del grupo va agregado.
   **Extensión v0.3:** el estrato de hogares del equipo (`ESTRATO_EQ`) vive fuera del repositorio y
   nunca se publica; los resultados por estrato sólo circulan dentro del equipo.
7. **Nuevo — muestras y fotos.** Las muestras de composta y de suelo se etiquetan **sólo con `H#`** y
   un sufijo de tipo (formato en el protocolo v0.2 §4), **sin coordenadas** ni descripción del lugar.
   Las fotos encuadran sólo el interior del contenedor (o el suelo muestreado), sin personas, fachadas
   ni placas, y **con la ubicación de la cámara desactivada**.
8. **Nuevo — pre-registro.** La tabla de decisiones del Piloto 2 no se publica antes del cierre: en el
   repositorio sólo está su hash (RE-11).

---

## 11. Códigos retirados

**No se reutilizan.**

| Código | Retirado en | Por qué |
| --- | --- | --- |
| `TEMP_P` | v0.2 | La percepción térmica salió de la ficha (revisión 02). No se concatena con `TEMP_I` |
| `VIS_SEM` | **v0.3** | Ya no hay visitas por semana; lo sustituye `VIS_TIPO` (D3) |
| `HUM_REF` | **v0.3** | Redundante con la `HUM` de la Hoja 4 en la misma visita, y copiarla rompería la independencia de la observación (D3, RE-06). El comité puede revertirlo |
| `responsable` | **v0.3** (de la app, no del diccionario) | Privacidad (D5, H-1). Nunca fue variable de este diccionario |
| `tipo_residuo` | **v0.3** (de la app, no del diccionario) | Privacidad (D5, H-2). `retirada_por_privacidad` en la tabla de correspondencia |

Retirados de v0.1 que siguen fuera: `Masa recipiente vacío`, `Método de cuantificación`, `Restos dados
a mascotas → tipo`, `Composta cosechada`, `Masa/volumen final` (este último vuelve, como medición del
equipo, en `PESO_BRUTO` y `MASA_GEOM`).

---

## 12. Conteo de variables

| | v0.2 | v0.3 |
| --- | ---: | ---: |
| Se capturan en la ficha del hogar (`F-HOG`) | 54 | 65 |
| Se capturan en el registro técnico (`RT`) | 14 | 51 |
| Hoja de concordancia (`CONC`), incluidos los 6 que comparte con la Hoja 4 | — | 12 |
| Bitácora (`BIT`) | — | 5 |
| Compartidos entre instrumentos (se cuentan una vez) | — | −9 |
| **Códigos que se capturan, únicos** | **68** | **124** |
| Derivadas (`DER`) | 3 (en prosa) | 32 |
| Capa restringida (`ANA`) | — | 2 |
| Propuestas no impresas (`PROP`) | — | 1 |
| Retirados en esta versión | — | 2 (`VIS_SEM`, `HUM_REF`) |

> Cómo se cuenta: un código que vive en dos instrumentos (por ejemplo `HUM` en la Hoja 4 y en la hoja
> de concordancia, o `BOTE_CAP` en la Hoja 1 y en el registro técnico) es **una** variable. El conteo
> se rehace con el script de `tests/ficha-cobertura.test.js`; si este cuadro y el script difieren,
> manda el script y se corrige el cuadro.

**Lo que cuesta el crecimiento.** De 68 a 124 variables, casi todo el aumento es del **equipo** (de 14
a 51, de las cuales 48 son sólo suyas) y de dos instrumentos nuevos que el hogar no llena (concordancia
y bitácora). El hogar gana **11 códigos** —fuga y su motivo, seco usado, parada, los tres del día 0,
observador, cuello de botella con su «otro» y la nota del día 28— y pierde tres de las cuatro
repeticiones de cada variable de estado.
El costo para el hogar se prueba en el protocolo v0.2 §7 (renglón semanal ≤ 1 min, revisión del día
28 ≤ 5 min).

---

## 13. Qué falta para que este diccionario sea suficiente

- Que el comité resuelva las PROPUESTAS que tocan casillas: **P-03, P-04, P-05, P-21, P-22** (y P-02,
  que decide si `CONT_TARA_MET` puede valer `bascula_hogar`).
- La validación del comité **casilla por casilla** de las casillas nuevas.
- La prueba de captura del protocolo v0.2 §7 (transcripción cronometrada de una ficha completa).
- Revisar `tabla-de-correspondencia-v0.1.md` contra la versión que se congele.
