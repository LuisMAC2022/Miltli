# Diccionario de datos Miltli v0.2 — BORRADOR

> **Borrador para revisión del comité.** Sustituye a `Miltli_Diccionario_de_Datos_v0.1.docx`, que
> quedó desalineado del instrumento: once variables vigentes no estaban en él y tres de las suyas
> cambiaron de frecuencia o desaparecieron. Los `.docx` de origen se conservan en esta carpeta como
> anexo histórico y su transcripción en texto plano está en `anexos-v0.1/`.
>
> Deriva **casilla por casilla** de `miltli-ficha-hogares.html` (revisión 02, cuatro hojas) y de
> `registro-tecnico-equipo.md`. Si la ficha cambia, este documento cambia con ella: son el mismo
> contrato visto desde dos lados.

## Cómo leer este documento

- **Código**: etiqueta estable. **No aparece impresa en la hoja del hogar** —la hoja se queda en
  prosa, según la revisión 01— pero es la que usará la captura, la app y la tabla de correspondencia.
  Una vez validado, **un código no se reutiliza ni se renombra**: si una casilla desaparece, su código
  se retira; si aparece otra, se le da uno nuevo.
- **Quién**: `hogar` o `equipo`. Es el eje que la revisión 02 volvió explícito al sacar la temperatura
  y el pesaje de la ficha del hogar.
- **Cuándo**: `alta` (día 1) · `diario` · `semanal` · `cierre` (día 28) · `visita` (equipo).
- **Tipo**: `num` · `texto` · `opción` (una) · `multi` (varias) · `fecha` · `bool`.

---

## 1. Convenciones de ausencia — **cambian respecto de v0.1**

v0.1 decía: *«Celda vacía = error de captura; no es una respuesta válida»*. Eso ya no se sostiene,
porque la ficha promete explícitamente al hogar que **puede dejar en blanco cualquier pregunta**. Una
respuesta en blanco pasa a ser una respuesta válida y el esquema tiene que poder representarla.

| Valor | Significa | Dónde aparece |
| --- | --- | --- |
| `0` | Se observó o midió y la cantidad fue cero | `ORG`, `SEC`, cantidades |
| `NR` | No se realizó el registro ese día o esa semana | Renglón vacío de la Hoja 2; columna vacía de la Hoja 3 |
| `NC` | **Nuevo.** No contestada: el hogar decidió no responder | Preguntas de alta y de cierre |
| `ND` | Se observó pero no pudo determinarse | Variables de estado |
| `NA` | No aplica | Dependientes de otra respuesta |

**La distinción entre `0` y `NR` es la razón de ser de `REG`** (§4.1). Sin ella, un hogar que no
generó residuo y un hogar que no registró se ven iguales, que son conclusiones opuestas sobre el mismo
hogar. La banda de la Hoja 2 lo dice con estas palabras: *«`0` = ese día no hubo residuo. Renglón
vacío = no anotaste. No son lo mismo.»*

La distinción entre `NR` y `NC` es nueva y es de privacidad: `NR` es un dato que se perdió; `NC` es un
dato que el hogar ejerció su derecho a no dar. **En el análisis no se imputan ni se rellenan los `NC`,
y no se le pregunta al hogar por qué dejó algo en blanco.**

---

## 2. Identificación y contexto — Hoja 1, alta

| Código | Casilla en la ficha | Quién | Tipo | Valores | Uso |
| --- | --- | --- | --- | --- | --- |
| `ID` | Hogar `H___` | equipo | opción | `H1`…`H5` | Vincular registros sin nombres |
| `FINI` | Inicio ___/___/2026 | equipo | fecha | — | Alinear las cuatro semanas |
| `DREV` | Día de la revisión semanal | hogar | opción | `L M M J V S D` | Operativa. **No sale del equipo** (§7) |
| `PERS0` | Personas que comen en casa la mayoría de los días | hogar | num | entero | Denominador inicial de L/persona/semana |
| `MASC` | Parte de los restos se va a animales de la casa | hogar | opción | `no` · `a_veces` · `casi_siempre` | Fuga del flujo: lo que va al animal no llega a la composta |
| `DPRE` | Antes del piloto, ¿qué camino seguían los restos? | hogar | **multi** | `basura` · `animales` · `compost` · `otro` | Cambio de comportamiento y desvío |
| `DPRE_OTRO` | Otro: ___ | hogar | texto | — | Sólo si `DPRE` incluye `otro` |

> **Cambio respecto de v0.1 y de la revisión 01:** `DPRE` pasa de respuesta única a **multirrespuesta**.
> Un hogar puede repartir sus restos entre la basura y los animales, y la versión anterior lo obligaba
> a elegir una sola, produciendo un dato falso. También cambia el dueño de `PERS0` y `MASC`: v0.1 los
> asignaba al equipo; los llena el hogar.

### 2.1 Infraestructura y medida

| Código | Casilla | Quién | Tipo | Valores |
| --- | --- | --- | --- | --- |
| `BOTE_DESC` | Mi bote de medida es | hogar | texto | descripción libre del recipiente |
| `BOTE_CAP` | Capacidad medida por el equipo | **equipo** | num | litros |
| `BOTE_SEC_MISMO` | Uso el mismo bote para el seco | hogar | bool | sí · no |
| `BOTE_SEC_DESC` | Otro recipiente ___ | hogar | texto | `NA` si `BOTE_SEC_MISMO` = sí |
| `BOTE_SEC_CAP` | ___ L | equipo | num | litros; `NA` como arriba |
| `CONT_TIPO` | Contenedor: tipo | hogar | texto | — |
| `CONT_CAP` | Contenedor: capacidad | hogar | num | litros |
| `CONT_CAP_ND` | □ no la sé | hogar | bool | si está marcada, `CONT_CAP` = `ND` |
| `UBIC_IE` | Interior · Exterior | hogar | opción | `interior` · `exterior` |
| `UBIC_SS` | Sol · Sombra | hogar | opción | `sol` · `sombra` |
| `UBIC_TL` | Techado · A la lluvia | hogar | opción | `techado` · `lluvia` |
| `UBIC_TP` | Sobre tierra · Sobre piso firme | hogar | opción | `tierra` · `piso` |
| `SECO_DISP` | Material seco con el que cuento | hogar | **multi** | `hojas` · `carton` · `papel` · `aserrin` · `otro` |
| `SECO_DISP_OTRO` | Otro: ___ | hogar | texto | — |
| `SECO_ACC` | Conseguir material seco me resulta | hogar | opción | `en_casa` · `cerca` · `salir` · **`no_se_donde`** |
| `SECO_RES` | Reserva de material seco al arrancar | hogar | num | botes |

> **Cambio:** `SECO_ACC` gana el valor **`no_se_donde`** («No sé dónde conseguirlo»). No es un matiz
> de la escala anterior: las tres opciones previas suponían que el hogar sabe dónde buscar y sólo
> medían el esfuerzo. Un hogar que no sabe dónde conseguir carbono es un cuello de botella distinto
> —y más accionable para el programa— que uno que tiene que salir a buscarlo. Sin este valor, esos
> hogares se repartían entre «tengo que salir a buscarlo» y la casilla en blanco.
>
> **Retirados de v0.1:** `Masa recipiente vacío` (ya no se pesa en el hogar), `Método de cuantificación`
> (el volumen se estandarizó para todos, así que la variable no tiene variación) y `Restos dados a
> mascotas → tipo` (texto libre sobre alimentos, retirado por privacidad en la revisión 01).

---

## 3. Registro diario — Hoja 2

| Código | Casilla | Quién | Tipo | Valores | Notas |
| --- | --- | --- | --- | --- | --- |
| `DIA` | Día | — | num | 1…28 | Impreso, no se llena |
| `FECHA` | Fecha día / mes | hogar | fecha | — | |
| `ORG` | Orgánico que eché | hogar | num | botes, múltiplos de ½ | Unidad primaria: **botes**, no litros ni gramos |
| `SEC` | Seco que eché encima | hogar | num | botes, múltiplos de ½ | Vacío ≠ `0`: ver §1 |
| `NOTA_D` | ¿Algo que quieras contar de hoy? | hogar | texto | opcional, acotado a la composta | |

**Derivadas, calculadas por el equipo y nunca capturadas a mano:**
`ORG_L = ORG × BOTE_CAP` · `SEC_L = SEC × BOTE_CAP` (o `BOTE_SEC_CAP` si el hogar usa dos recipientes)
· `RAZON = SEC_L / ORG_L`, comparable contra la regla 1:2.

> **El dato primario de volumen no se convierte automáticamente a masa** (decisión #4). La conversión
> exige la densidad aparente de `DENS_M`/`DENS_V` y se hace en el análisis, de forma que pueda
> rehacerse cuando haya más mediciones.

---

## 4. Revisión semanal — Hoja 3, cuatro columnas `S1`–`S4`

Todas estas variables se repiten cuatro veces, una por semana. La clave de captura es
`ID + SEM + código`.

| Código | Casilla | Tipo | Valores |
| --- | --- | --- | --- |
| `SEM` | Columna S1…S4 | opción | `1`…`4` |
| `SFECHA` | Fecha de esta revisión | fecha | — |
| `PERS_S` | Personas que comieron en casa casi todos los días | num | entero |
| `MIN_S` | Minutos dedicados en toda la semana | num | minutos |
| `LLEN_S` | Qué tan lleno está el contenedor | opción | `1/4` · `1/2` · `3/4` · `casi_lleno` |

> `PERS_S` se repite cada semana **a propósito**: el denominador de L/persona/semana cambia, y v0.1 lo
> tomaba una sola vez al alta. `MIN_S` y `LLEN_S` no existían en v0.1; las pedía el plan de trabajo y
> devuelven sus criterios de éxito #6 y #7.

### 4.1 `REG` — cómo se anotó la semana *(recuperada de v0.1)*

| Código | Casilla | Tipo | Valores |
| --- | --- | --- | --- |
| `REG` | Cómo anoté esta semana | opción | `REG1` anoté todos los días · `REG2` me faltaron algunos · vacío = `ND` |

Es la variable «Registro realizado» de v0.1, que la revisión 01 había eliminado sin anotarlo entre sus
costos. Vuelve **semanal en vez de diaria**: cuesta cuatro marcas en el mes en lugar de 28 y devuelve
el indicador «porcentaje de registros completados».

### 4.2 Estado de la composta

| Código | Casilla | Tipo | Valores |
| --- | --- | --- | --- |
| `VAHO` | Al abrir había vaho o gotas de agua en la tapa | bool | marcada / no marcada |
| `HUM` | Humedad, prueba del puño | **multi** | `H1` se desmorona · `H2` se apelmaza, no sale agua · `H3` una o dos gotas · `H4` escurre agua · `H5` líquido en el fondo |
| `OLOR` | Olor | **multi** | `O0` casi no huele · `O1` tierra/bosque · `O2` dulce, fruta, vinagre · `O3` amoniaco · `O4` drenaje, huevo podrido · `O5` otro **→ exige `NOTA_S`** |
| `FAU` | Quién vive aquí esta semana | **multi** | `F01` lombrices · `F02` cochinillas, milpiés, caracoles, babosas · `F03` escarabajos o larvas en C · `F04` larvas de mosca soldado · `F05` mosquitas de la fruta · `F06` mosquitos negros de superficie · `F07` moscas grandes o gusanos blancos · `F08` hormigas · `F09` cucarachas · `F10` hongos · `F11` huellas o excavaciones · `F12` **vi algo que no supe identificar → exige `NOTA_S`** · `F00` ninguno de los anteriores |
| `MEZ_AV` | Avance de la descomposición | **multi** | `M1` se distinguen casi todos los restos · `M2` algunos ya no se reconocen · `M3` la mayor parte parece tierra oscura |
| `MEZ_TX` | Textura | **multi** | `X1` suelta · `X2` apelmazada · `X3` con bloques grandes |

**Reglas de integridad:**

- `F00` excluye `F01`–`F12`. Una captura que traiga las dos cosas es un error, no un dato.
- `O0` no excluye a las demás: se puede casi no oler en la superficie y oler a fermento al remover.
- **`VAHO` no es un nivel de `HUM`.** En la hoja comparten sección por economía de espacio; en el
  esquema son dos variables independientes y no deben fusionarse al capturar.
- **La multimarca no produce una escala ordinal.** `HUM`, `OLOR`, `FAU`, `MEZ_AV` y `MEZ_TX` admiten
  varias marcas porque la superficie y el fondo difieren. La regla para reducirlas a un valor
  graficable **está sin decidir** y debe fijarse antes de tener datos: ver protocolo §5.3.

### 4.3 `ACT` — qué hizo el hogar

| Código | Casilla | Tipo | Valores |
| --- | --- | --- | --- |
| `ACT` | ¿Qué hiciste esta semana? | **multi** | `A0` no cambié nada · `A1` removí o mezclé · `A2` agregué material seco de más · `A3` agregué agua · `A4` retiré material que no iba **→ exige `NOTA_S`** · `A5` cambié otra cosa **→ exige `NOTA_S`** |
| `NOTA_S` | Lo que quieras contar de cada semana | texto | opcional salvo por `O5`, `F12`, `A4`, `A5` |

`A0` excluye `A1`–`A5`. Los códigos conservan a propósito la numeración de v0.1 para que el histórico
siga siendo legible, aunque **el orden impreso en la hoja no coincide con el orden de los códigos**:
en el papel manda la lectura del hogar, en el esquema manda la continuidad. La captura se hace por
texto de casilla, nunca por posición.

`A4` es además el dato de «materiales no aceptados detectados» que pide el plan de trabajo y que el
instrumento había perdido.

---

## 5. Cierre — Hoja 4, día 28

| Código | Casilla | Tipo | Valores |
| --- | --- | --- | --- |
| `FCIE` | Fecha del cierre | fecha | — |
| `LLEN_F` | ¿Qué tan lleno quedó el contenedor? | opción | `1/4` · `1/2` · `3/4` · `casi_lleno` · `lleno` |
| `SECO_FALT` | ¿Hubo semanas en que te faltara material seco? | opción | `no` · `si` |
| `SECO_FALT_N` | Sí, en ___ de las 4 | num | 1…4; `NA` si `SECO_FALT` = `no` |
| `SECO_DIF` | Conseguir material seco durante el mes me resultó | opción | `facil` · `esfuerzo` · `dificil` · **`nunca_supe`** |
| `CONT_TAM` | El tamaño del contenedor me resultó | opción | `chico` · `adecuado` · `grande` |
| `CONTIN` | El mes que viene | opción | `igual` · `con_cambios` · `lo_dejo` |
| `CIE_FACIL` | Lo que me resultó fácil de sostener | texto | opcional |
| `CIE_DIFICIL` | Lo que me costó más trabajo | texto | opcional |
| `CIE_CAMBIO` | Si volviera a empezar, cambiaría | texto | opcional |
| `CIE_OTRO` | Algo que el equipo debería saber y no cabe arriba | texto | opcional |

`SECO_DIF` cierra el par con `SECO_ACC` del alta: la misma dificultad, preguntada antes y después, es
lo que permite ver si el cuello de botella del material seco se resolvió durante el mes o se agravó.
Su valor `nunca_supe` corresponde a `no_se_donde` del alta.

> **Retiradas de v0.1:** `Composta cosechada` y `Masa/volumen final` salen de la ficha del hogar. En
> 28 días no se espera composta madura y preguntarlo instalaba una expectativa de fracaso. Si el
> equipo quiere el dato, lo levanta en su visita de cierre y vive en el registro técnico.

---

## 6. Mediciones del equipo — `registro-tecnico-equipo.md`

Un renglón por visita. **Éstas son las variables que la revisión 02 sacó de la ficha del hogar.**

| Código | Campo | Tipo | Valores |
| --- | --- | --- | --- |
| `VIS_FECHA` | Fecha de la visita | fecha | — |
| `VIS_HORA` | Hora | hora | `TEMP_I` depende de la hora del día |
| `VIS_QUIEN` | Quién del equipo | texto | persona del equipo, no del hogar |
| `VIS_SEM` | Semana del piloto | opción | `1`…`4` |
| `TEMP_I` | Temperatura del montón | num | °C, un decimal |
| `TEMP_AMB` | Temperatura ambiente a la sombra | num | °C |
| `TEMP_PROF` | Profundidad de la sonda | num | cm, referencia 15 |
| `HUM_REF` | Casilla de humedad que marcó el hogar esa semana | opción | `H1`…`H5` · `sin_marca` |
| `DENS_V` | Volumen del bote lleno | num | litros |
| `DENS_M` | Masa del bote lleno, sin tara | num | gramos |
| `DENS_T` | Tara del bote | num | gramos |
| `VIS_OK` | ¿Se pudo hacer la visita? | opción | `si` · `repuesta` · `no_se_pudo` |
| `FOTO_EQ` | Foto tomada | bool | — |
| `VIS_NOTA` | Nota técnica | texto | sólo sobre la medición o el contenedor |

`TEMP_P` (temperatura percibida por el hogar) **queda retirada del esquema.** Su código no se
reutiliza. Quien analice datos anteriores a la revisión 02 debe saber que `TEMP_P` y `TEMP_I` no son
la misma variable medida de dos maneras: una es una percepción de flujo de calor con la mano y la
otra es una lectura instrumental. No se concatenan en una sola serie.

---

## 7. Restricciones de privacidad del esquema

Son parte del contrato de datos, no un apéndice. Un esquema que las omite las pierde en la primera
migración.

1. **Ningún campo de este diccionario admite nombre, dirección, teléfono ni correo del hogar.** El
   único identificador es `ID`. Un esquema derivado que agregue una columna «responsable» deja de
   cumplir este diccionario. *(Ver el hallazgo H-1 en `hallazgos-app-y-tabla-de-correspondencia.md`:
   la app actual la agrega.)*
2. **No existe ninguna variable de composición o tipo de residuo**, ni en el hogar ni en el equipo.
   No es un olvido: se retiró por privacidad y por costo, y su reintroducción exige decisión explícita
   del comité con el argumento de privacidad a la vista. *(Ver H-2.)*
3. **`DREV` no se publica ni se comparte fuera del equipo.** Cruzado con `PERS_S` describe rutina y
   ocupación de un domicilio.
4. **`NC` no se imputa.** Una respuesta en blanco no se rellena con la media, la moda ni el valor de la
   semana anterior, y no se le pregunta al hogar por qué la dejó así.
5. **La tabla que une `ID` con un domicilio no forma parte de este diccionario** y no debe vivir en el
   mismo archivo, la misma hoja de cálculo ni el mismo repositorio que los datos. La guarda únicamente
   la persona coordinadora.
6. **`ID` es seudonimización, no anonimización.** Con cinco hogares que se conocen entre sí, cualquier
   dato desagregado es reidentificable dentro del grupo. Todo lo que salga del grupo va agregado.

---

## 8. Qué falta para que este diccionario sea suficiente

- Validación del comité, casilla por casilla.
- La regla de reducción de la multimarca (§4.2, protocolo §5.3).
- La decisión sobre la semana 1 (protocolo §5.2), que cambia el significado de `SEC` vacío en los
  primeros siete renglones.
- La **tabla de correspondencia** entre estos códigos, los campos de la app y las categorías del plan
  de trabajo. Queda fuera de esta entrega; los hallazgos que la condicionan están en
  `hallazgos-app-y-tabla-de-correspondencia.md`.
