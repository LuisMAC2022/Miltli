# Tabla de correspondencia v0.1 — BORRADOR

> **«Tabla de correspondencia»** es el nombre de **esta** tabla: une los códigos del diccionario con los
> campos de la app y las categorías del plan, y **se versiona en el repositorio** (acta-01, D5). No es
> la **lista de claves** —la que une `H__` con un domicilio—, que **nunca entra al repositorio**.
>
> Fecha: octubre de 2026 · Escrita contra `diccionario-de-datos-v0.3-borrador.md` y F-HOG rev. 03
> **antes de congelar**, como admite el protocolo v0.2 §1.1: se revisa una vez cuando el comité
> resuelva las PROPUESTAS. App de referencia: `docs/app.js` y `docs/index.html` tal como están hoy.
> Estructura: la propuesta en `hallazgos-app-y-tabla-de-correspondencia.md` §5.

## Cómo leer esta tabla

**Una fila por casilla** de los instrumentos que se capturan: la ficha del hogar (hojas 1 a 4) y el
registro técnico (T). Para las preguntas de opción múltiple, la fila es la de la pregunta y sus
opciones viajan en `data-valor`; la columna `columna_csv` dice cómo se abren en columnas. Las filas
siguen el orden del diccionario: las de la hoja de concordancia (C) y de la bitácora (B) van entre las
del equipo y **no** se capturan en la app. Al final van los campos de la app **sin casilla**.

| Columna | Contenido |
| --- | --- |
| `codigo` | Código del diccionario v0.3 |
| `hoja` | 1 arranque · 2 diario · 3 semanal · 4 día 28 · T técnico · C concordancia · B bitácora |
| `casilla_ficha` | Texto de la casilla en el instrumento (en el HTML, el atributo `data-codigo` lleva el código) |
| `campo_app_actual` | Campo que hoy existe en `docs/`, o `—` |
| `campo_app_propuesto` | Campo después de la migración: **el mismo código** (`especificacion-cambios-app.md`) |
| `columna_csv` | Encabezado en el CSV ancho; el CSV largo usa `codigo` + `valor` |
| `categoria_plan` | Categoría equivalente en `planes/plan_trabajo.md`, o `—` |
| `tipo_relacion` | Relación entre la casilla y el **campo actual** de la app: `exacta` · `pierde_informacion` · `gana_informacion` · **`sin_equivalencia`** · **`retirada_por_privacidad`** |
| `regla_conversion` | Cómo se convierte, o por qué no se puede |
| `nota` | Hallazgo, PROPUESTA o valor de ausencia asociado |

**`sin_equivalencia`** no es un error de la tabla: dice que la app de hoy no tiene nada que corresponda
y que el campo se crea en la migración. **`retirada_por_privacidad`** dice que el campo existió y se
quitó a propósito: **no debe volver a conectarse** creyendo que fue un olvido.

## Reglas que valen para todas las filas

1. **El papel es el registro; la app es la captura del coordinador** (D5). La app nunca es un registro
   paralelo del hogar.
2. **Se captura por `data-valor`, nunca por posición** (RE-14). El orden impreso de `ACT` no coincide
   con el de sus códigos.
3. **Ausencia** (C-5): cada campo admite los valores de ausencia del diccionario v0.3 §1 (`0`, `NR`,
   `NC`, `ND`, `NA`); **ningún campo trae valor por omisión**.
4. **Multimarca** (D4): una columna 0/1 por opción; `HUM` y `MEZ_AV` añaden mínimo y máximo; las demás
   no tienen rango.
5. **Semana** (C-6): manda la columna S1–S4 de la ficha; la semana que calcula la app por ventanas de
   7 días no se usa para el análisis.
6. **Cantidades** (D-5): enteros y medios; lo demás se captura como `ND` con el texto original en una
   columna de auditoría. No se redondea.
7. **Versión** (D-6 de la revisión 03): `FICHA_REV` viaja en cada fila.

## Tabla

| `codigo` | `hoja` | `casilla_ficha` | `campo_app_actual` | `campo_app_propuesto` | `columna_csv` | `categoria_plan` | `tipo_relacion` | `regla_conversion` | `nota` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ID` | 1 | Hogar H___ (encabezado de las cuatro hojas) | `config.clave` | `ID` | `id` | Identificación de hogares (H1–H5) | `exacta` | Mismo vocabulario `H1`–`H5`; la app ya lo valida con /^H[1-5]$/ | R-1 resuelto; si falta: — obligatorio |
| `FINI` | 1 | Inicio ___/___/2026 | `config.inicio` | `FINI` | `fini` | Día 1 | `exacta` | dd/mm/aaaa → ISO aaaa-mm-dd | C-6: la app cuenta semanas de 7 días desde aquí; manda `SEM` de la ficha; si falta: — obligatorio |
| `FICHA_REV` | 1 | Sello del pie: F-HOG rev. NN | — | `FICHA_REV` | `ficha_rev` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — |
| `DREV` | 1 | Día del renglón semanal | — | `DREV` | `drev` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | No sale del equipo (dicc. §10.3); si falta: NC |
| `PERS0` | 1 | Personas que comen en casa la mayoría de los días | `config.personas` | `PERS0` | `pers0` | Número de personas en el hogar | `pierde_informacion` | Entero. La app no admite vacío (mínimo 1): `NC` se pierde | R-2, C-5; si falta: NC |
| `MASC` | 1 | Durante el piloto, parte de los restos se va a animales de la casa | — | `MASC` | `masc` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `DPRE` | 1 | Antes de este piloto, ¿qué camino seguían los restos? | — | `DPRE` | `dpre_basura`…`dpre_otro` (multi-hot) | Adicionalidad (GEI) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Una columna 0/1 por opción; sin rango (D4, nominal) | si falta: NC |
| `DPRE_OTRO` | 1 | Otro: ___ | — | `DPRE_OTRO` | `dpre_otro` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: NA si DPRE no incluye otro |
| `BOTE_DESC` | 1 | Mi bote de medida es | — | `BOTE_DESC` | `bote_desc` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: NC |
| `BOTE_CAP` | 1 | Capacidad medida por el equipo ___ L | — | `BOTE_CAP` | `bote_cap` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `BOTE_SEC_MISMO` | 1 | Uso el mismo bote para el seco | — | `BOTE_SEC_MISMO` | `bote_sec_mismo` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: `si`/`no` (o marcada/no marcada) | si falta: NC |
| `BOTE_SEC_DESC` | 1 | Otro recipiente ___ | — | `BOTE_SEC_DESC` | `bote_sec_desc` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: NA si BOTE_SEC_MISMO = si |
| `BOTE_SEC_CAP` | 1 | ___ L | — | `BOTE_SEC_CAP` | `bote_sec_cap` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA como arriba |
| `CONT_TIPO` | 1 | Contenedor: tipo | — | `CONT_TIPO` | `cont_tipo` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: NC |
| `CONT_CAP` | 1 | Contenedor: capacidad | `config.capacidadL` | `CONT_CAP` | `cont_cap` | Capacidad aproximada del contenedor | `pierde_informacion` | Litros. La app trae 80 por omisión: `NC`/`ND` se pierden | C-5; `CONT_CAP_ND` no existe en la app; si falta: NC |
| `CONT_CAP_ND` | 1 | □ no la sé | — | `CONT_CAP_ND` | `cont_cap_nd` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: `si`/`no` (o marcada/no marcada) | si falta: — |
| `UBIC_IE` | 1 | Interior · Exterior | — | `UBIC_IE` | `ubic_ie` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `UBIC_SS` | 1 | Sol · Sombra | — | `UBIC_SS` | `ubic_ss` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `UBIC_TL` | 1 | Techado · A la lluvia | — | `UBIC_TL` | `ubic_tl` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `UBIC_TP` | 1 | Sobre tierra · Sobre piso firme | — | `UBIC_TP` | `ubic_tp` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `SECO_DISP` | 1 | Material seco con el que cuento | — | `SECO_DISP` | `seco_disp_hojas`…`seco_disp_otro` (multi-hot) | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Una columna 0/1 por opción; sin rango (D4, nominal) | si falta: NC |
| `SECO_DISP_OTRO` | 1 | Otro: ___ | — | `SECO_DISP_OTRO` | `seco_disp_otro` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: NA si no incluye otro |
| `SECO_ACC` | 1 | Conseguir material seco me resulta | — | `SECO_ACC` | `seco_acc` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `SECO_RES` | 1 | Reserva de material seco al arrancar | — | `SECO_RES` | `seco_res` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Botes en enteros y medios (D-5); fuera de patrón → `ND` + original en auditoría. A litros sólo en derivadas | si falta: NC |
| `D0_FECHA` | 1 | Fecha de la primera carga | — | `D0_FECHA` | `d0_fecha` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: dd/mm → ISO aaaa-mm-dd | si falta: NC |
| `D0_BASE` | 1 | Botes de material seco en la capa base | — | `D0_BASE` | `d0_base` | Base de ~10 cm de material seco | `sin_equivalencia` | Hoy no se captura. Tras la migración: Botes en enteros y medios (D-5); fuera de patrón → `ND` + original en auditoría. A litros sólo en derivadas | si falta: NC |
| `D0_VACIO` | 1 | El contenedor arrancó | — | `D0_VACIO` | `d0_vacio` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `DIA` | 2 | Día | — | `DIA` | `dia` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: — |
| `FECHA` | 2 | Fecha día / mes | `entradas[].fecha` | `FECHA` | `fecha` | — | `exacta` | dd/mm → ISO con el año de `FINI` | La app crea una entrada por carga, no por día; si falta: NR si el renglón está vacío |
| `ORG` | 2 | Orgánico que eché a la composta | `entradas[].humedoL` | `ORG` | `org` | Formato diario: orgánico (botes) · Entrada a la composta | `pierde_informacion` | La app guarda litros; la ficha, botes. `humedoL` = `ORG` × `BOTE_CAP`. La app exige un número (0 por omisión): `NR` se pierde | C-5; D-5; D1: es entrada, no generación; si falta: NR |
| `SEC` | 2 | Seco que eché encima | `entradas[].secoL` | `SEC` | `sec` | Formato diario: seco (botes) · Material seco | `pierde_informacion` | `secoL` = `SEC` × `BOTE_CAP` (o `BOTE_SEC_CAP`). Mismo problema de ausencia | C-5; si falta: NR si el renglón está vacío; NC si sólo falta este número |
| `NOTA_D` | 2 | ¿Algo que quieras contar de hoy? | `entradas[].notas` | `NOTA_D` | `nota_d` | Formato diario: nota | `exacta` | Texto; acotar a la composta (H-5) | H-5; si falta: vacío válido |
| `SEM` | 3 | Columna S1…S4 | `revisiones[semana] / weekForDate()` | `SEM` | `sem` | — | `sin_equivalencia` | Manda la columna S1–S4 de la ficha, anclada a `DREV`; la semana calculada por la app no se usa | C-6; si falta: — |
| `SFECHA` | 3 | Fecha de este renglón | — | `SFECHA` | `sfecha` | Renglón semanal: fecha | `sin_equivalencia` | Hoy no se captura. Tras la migración: dd/mm → ISO aaaa-mm-dd | si falta: regla §1.2–§1.3 |
| `REG` | 3 | Cómo anoté esta semana · marca sólo una | — | `REG` | `reg` | Cumplimiento (criterios #1 y #2) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: ND |
| `FUGA` | 3 | Botes que esta semana no llegaron a la composta · escribe 0 si todo llegó | — | `FUGA` | `fuga` | Fuga y generación estimada | `sin_equivalencia` | Hoy no se captura. Tras la migración: Botes en enteros y medios (D-5); fuera de patrón → `ND` + original en auditoría. A litros sólo en derivadas | si falta: NC (§1.3) |
| `FUGA_MOT` | 3 | ¿Por qué no llegaron? · marca todas las que apliquen | — | `FUGA_MOT` | `fuga_mot_fg1`…`fuga_mot_fg5` (multi-hot) | Fuga y generación estimada | `sin_equivalencia` | Hoy no se captura. Tras la migración: Una columna 0/1 por opción; sin rango (D4, nominal) | si falta: NA si FUGA = 0; si no, NC |
| `SECO_USO` | 3 | Material seco que usé esta semana · marca todos | — | `SECO_USO` | `seco_uso_hojas`…`seco_uso_ninguno` (multi-hot) | Material seco · «¿Qué material seco se usó?» | `sin_equivalencia` | Hoy no se captura. Tras la migración: Una columna 0/1 por opción; sin rango (D4, nominal) | si falta: NC |
| `PERS_S` | 3 | Personas que comieron en casa casi todos los días | — | `PERS_S` | `pers_s` | Entrada por persona y semana (denominador) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NC |
| `MIN_S` | 3 | Minutos que le dediqué a la composta en toda la semana | `entradas[].minutos + revisiones[].minutos` | `MIN_S` | `min_s` | Trabajo: minutos por semana | `sin_equivalencia` | La app suma minutos por carga y por revisión; la ficha tiene un solo total semanal | R-5; si falta: NC |
| `LLEN_S` | 3 | Qué tan lleno está el contenedor · marca una | `revisiones[].ocupadoPct` | `LLEN_S` | `llen_s` | Capacidad | `pierde_informacion` | Cuartos → % inventa precisión; % → cuartos pierde. Se captura el cuarto; el % sólo como derivada marcada | R-4; si falta: NC |
| `ACT` | 3 | ¿Qué hiciste esta semana? · marca todo | `revisiones[].accion (texto)` | `ACT` | `act_a0`…`act_a5` (multi-hot) | Ajustes de operación · «Qué hice esta semana» | `sin_equivalencia` | Texto libre contra seis casillas codificadas; no se convierte. Multi-hot `ACT` | R-6; P-04; PROPUESTA P-04; si falta: NC |
| `NOTA_S` | 3 | Lo que quieras contar de esta semana | — | `NOTA_S` | `nota_s` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `PARADA_DIA` | 3 | Dejé de agregar residuos el día ___ · □ no hizo falta parar | — | `PARADA_DIA` | `parada_dia` | Regla del 80 % | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NC |
| `FCIE` | 4 | Fecha del cierre | — | `FCIE` | `fcie` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: dd/mm → ISO aaaa-mm-dd | si falta: NC |
| `OBS_MISMA` | 4 | Esta revisión la hizo la misma persona de siempre | — | `OBS_MISMA` | `obs_misma` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: `si`/`no` (o marcada/no marcada) | si falta: NC |
| `VAHO` | 4 | Al abrir había vaho o gotas en la tapa | — | `VAHO` | `vaho` | Estado al día 28 (descripción) | `sin_equivalencia` | Hoy no se captura. Tras la migración: `si`/`no` (o marcada/no marcada) | si falta: no marcada |
| `HUM` | 4 | Humedad, prueba del puño | `revisiones[].humedad (select)` | `HUM` | `hum_h1`…`hum_h5` + `hum_min`, `hum_max` | Estado al día 28 (descripción) | `sin_equivalencia` | La app: seca/adecuada/húmeda/saturada, opción única y con juicio («adecuada»). No se traduce en ninguna dirección | C-1, C-4; si falta: ND |
| `OLOR` | 4 | Olor | `revisiones[].olor (select)` | `OLOR` | `olor_o0`…`olor_o5` (multi-hot) | Estado al día 28 (descripción) | `sin_equivalencia` | La app mezcla intensidad (ligero, fuerte) y tipo; `fuerte` no tiene `O` | C-3, C-4; si falta: ND |
| `FAU` | 4 | Quién vive aquí | `revisiones[].plagas (select)` | `FAU` | `fau_f01`…`fau_f00` (multi-hot) | Estado al día 28 (descripción) | `sin_equivalencia` | «Plagas», opción única, contra 13 grupos descriptivos multimarca | C-2, C-4; si falta: ND |
| `MEZ_AV` | 4 | Avance de la descomposición | — | `MEZ_AV` | `mez_av_m1`…`mez_av_m3` + `mez_av_min`, `mez_av_max` | Estado al día 28 (descripción) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Una columna 0/1 por opción; mín. y máx. ordinales (D4) | si falta: ND |
| `MEZ_TX` | 4 | Textura | `revisiones[].estructura (select)` | `MEZ_TX` | `mez_tx_x1`…`mez_tx_x3` (multi-hot) | Estado al día 28 (descripción) | `pierde_informacion` | suelta y aireada → `X1`; compacta → `X2`; con bloques grandes / material demasiado grande → `X3`. La app es opción única | C-4; D4: nominal; si falta: ND |
| `NOTA_E` | 4 | Lo que quieras contar de esta revisión | — | `NOTA_E` | `nota_e` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `LLEN_F` | 4 | ¿Qué tan lleno quedó el contenedor? · marca una | — | `LLEN_F` | `llen_f` | Capacidad | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `SECO_FALT` | 4 | ¿Hubo semanas en que te faltara material seco? | — | `SECO_FALT` | `seco_falt` | Material seco | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `SECO_FALT_N` | 4 | Sí, en ___ de las 4 | — | `SECO_FALT_N` | `seco_falt_n` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si SECO_FALT = no |
| `SECO_DIF` | 4 | Conseguir material seco durante el mes me resultó | — | `SECO_DIF` | `seco_dif` | Material seco | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `CONT_TAM` | 4 | El tamaño del contenedor me resultó | — | `CONT_TAM` | `cont_tam` | Capacidad · «¿Qué tamaño de contenedor…?» | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `CUELLO` | 4 | Lo que más limitó el mes en esta casa · marca una | — | `CUELLO` | `cuello` | Criterio #5 | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | PROPUESTA P-22; si falta: NC |
| `CUELLO_OTRO` | 4 | Otro: ___ | — | `CUELLO_OTRO` | `cuello_otro` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: NA si CUELLO ≠ otro |
| `CONTIN` | 4 | El mes que viene | — | `CONTIN` | `contin` | «¿Quién continuará…?» | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NC |
| `CIE_FACIL` | 4 | Lo que me resultó fácil de sostener | — | `CIE_FACIL` | `cie_facil` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `CIE_DIFICIL` | 4 | Lo que me costó más trabajo | — | `CIE_DIFICIL` | `cie_dificil` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `CIE_CAMBIO` | 4 | Si volviera a empezar, cambiaría | — | `CIE_CAMBIO` | `cie_cambio` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `CIE_OTRO` | 4 | Algo que el equipo debería saber y no cabe arriba | — | `CIE_OTRO` | `cie_otro` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `VIS_TIPO` | T | Tipo de visita | — | `VIS_TIPO` | `vis_tipo` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `VIS_FECHA` | T | Fecha de la visita | — | `VIS_FECHA` | `vis_fecha` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: dd/mm → ISO aaaa-mm-dd | si falta: — obligatorio |
| `VIS_HORA` | T | Hora (en el cierre, hora de la lectura de TEMP_I) | — | `VIS_HORA` | `vis_hora` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: hh:mm | si falta: ND |
| `VIS_QUIEN` | T | Quién del equipo | — | `VIS_QUIEN` | `vis_quien` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `VIS_OK` | T | ¿Se pudo hacer la visita? | — | `VIS_OK` | `vis_ok` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `FOTO_EQ` | T | Foto tomada | — | `FOTO_EQ` | `foto_eq` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: `si`/`no` (o marcada/no marcada) | si falta: ND |
| `VIS_NOTA` | T | Nota técnica | — | `VIS_NOTA` | `vis_nota` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Texto acotado; sin datos personales | si falta: vacío válido |
| `BOTE_TARA` | T | Masa del bote de medida vacío | — | `BOTE_TARA` | `bote_tara` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `BOTE_AGUA` | T | Masa del bote lleno de agua hasta el borde | — | `BOTE_AGUA` | `bote_agua` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `BOTE_SEC_TARA` | T | Masa del recipiente del seco vacío | — | `BOTE_SEC_TARA` | `bote_sec_tara` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si BOTE_SEC_MISMO = si |
| `BOTE_SEC_AGUA` | T | Masa del recipiente del seco lleno de agua | — | `BOTE_SEC_AGUA` | `bote_sec_agua` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA como arriba |
| `CONT_FORMA` | T | Forma interior del contenedor | — | `CONT_FORMA` | `cont_forma` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: ND |
| `CONT_LARGO` | T | Largo interior | — | `CONT_LARGO` | `cont_largo` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si no es rect |
| `CONT_ANCHO` | T | Ancho interior | — | `CONT_ANCHO` | `cont_ancho` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si no es rect |
| `CONT_DIAM_SUP` | T | Diámetro interior en la boca | — | `CONT_DIAM_SUP` | `cont_diam_sup` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si es rect |
| `CONT_DIAM_INF` | T | Diámetro interior en el fondo | — | `CONT_DIAM_INF` | `cont_diam_inf` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si es rect |
| `CONT_ALTO` | T | Altura interior útil (del fondo o del suelo al borde) | — | `CONT_ALTO` | `cont_alto` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `CONT_TARA` | T | Masa del contenedor vacío, con tapa | — | `CONT_TARA` | `cont_tara` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `CONT_TARA_MET` | T | Cómo se obtuvo la tara | — | `CONT_TARA_MET` | `cont_tara_met` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `RES_GUARDADO` | T | El hogar guardó los residuos del día | — | `RES_GUARDADO` | `res_guardado` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: ND |
| `TEMP_I` | T | Temperatura del montón | — | `TEMP_I` | `temp_i` | Visita de cierre: temperatura | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `TEMP_AMB` | T | Temperatura ambiente a la sombra | — | `TEMP_AMB` | `temp_amb` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `TEMP_PROF` | T | Profundidad de la sonda | — | `TEMP_PROF` | `temp_prof` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `PESO_MET` | T | Método de la masa de la pila | — | `PESO_MET` | `peso_met` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | PROPUESTA P-09; si falta: — obligatorio |
| `PESO_BRUTO` | T | Masa de la compostera completa, con tapa | — | `PESO_BRUTO` | `peso_bruto` | Visita de cierre: pesaje | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si PESO_MET = geometrico |
| `DENS_V` | T | Volumen del bote lleno de residuo fresco del día | — | `DENS_V` | `dens_v` | Densidad (GEI) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND si RES_GUARDADO ≠ si |
| `DENS_M` | T | Masa de ese residuo, sin tara | — | `DENS_M` | `dens_m` | Densidad (GEI) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND como arriba |
| `DENS_T` | T | Tara del bote | — | `DENS_T` | `dens_t` | Densidad (GEI) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND como arriba |
| `DENS_SECO_TIPO` | T | Material seco principal de esa semana | — | `DENS_SECO_TIPO` | `dens_seco_tipo` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: ND |
| `DENS_SECO_V` | T | Volumen del bote lleno de ese material | — | `DENS_SECO_V` | `dens_seco_v` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `DENS_SECO_M` | T | Masa del material, sin tara | — | `DENS_SECO_M` | `dens_seco_m` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `DENS_SECO_T` | T | Tara del recipiente | — | `DENS_SECO_T` | `dens_seco_t` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `DENS_PILA_V` | T | Volumen del bote lleno de material de la pila | — | `DENS_PILA_V` | `dens_pila_v` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si PESO_MET = bascula |
| `DENS_PILA_M` | T | Masa del material de la pila, sin tara | — | `DENS_PILA_M` | `dens_pila_m` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA como arriba |
| `DENS_PILA_T` | T | Tara del recipiente | — | `DENS_PILA_T` | `dens_pila_t` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA como arriba |
| `LLEN_REF` | T | Altura de llenado medida con regla | — | `LLEN_REF` | `llen_ref` | Capacidad | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `MUE_COMP_M` | T | Masa de la muestra de composta extraída | — | `MUE_COMP_M` | `mue_comp_m` | Línea base de composta (mes 2) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si no se tomó |
| `SUELO_TIPO` | T | Suelo disponible para el diseño pareado | — | `SUELO_TIPO` | `suelo_tipo` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: ND |
| `SUELO_CON` | T | Parche o maceta que recibirá composta | — | `SUELO_CON` | `suelo_con` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | PROPUESTA P-14; si falta: NA si sin_suelo |
| `SUELO_PROF` | T | Profundidad de muestreo | — | `SUELO_PROF` | `suelo_prof` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si sin_suelo |
| `SUELO_SUB` | T | Submuestras que forman cada muestra compuesta | — | `SUELO_SUB` | `suelo_sub` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si sin_suelo |
| `MUE_SUELO_P1_M` | T | Masa de la muestra compuesta del parche P1 | — | `MUE_SUELO_P1_M` | `mue_suelo_p1_m` | Línea base de suelo (mes 2) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si sin_suelo |
| `MUE_SUELO_P2_M` | T | Masa de la muestra compuesta del parche P2 | — | `MUE_SUELO_P2_M` | `mue_suelo_p2_m` | Línea base de suelo (mes 2) | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: NA si sin_suelo |
| `CONC_FUENTE` | C | Fuente | — | no se captura en la app | — | — | `sin_equivalencia` | Fuera de la app: se transcribe a la hoja de análisis de concordancia. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `CONC_FECHA` | C | Fecha de la observación | — | no se captura en la app | — | — | `sin_equivalencia` | Fuera de la app: se transcribe a la hoja de análisis de concordancia. dd/mm → ISO aaaa-mm-dd | si falta: ND |
| `CONC_OBS` | C | Clave del observador | — | no se captura en la app | — | — | `sin_equivalencia` | Fuera de la app: se transcribe a la hoja de análisis de concordancia. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `CONC_ROL` | C | Grupo del observador | — | no se captura en la app | — | — | `sin_equivalencia` | Fuera de la app: se transcribe a la hoja de análisis de concordancia. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `CONC_ITEM` | C | Qué se observa | — | no se captura en la app | — | — | `sin_equivalencia` | Fuera de la app: se transcribe a la hoja de análisis de concordancia. Texto acotado; sin datos personales | si falta: — obligatorio |
| `CONC_REF` | C | Estado de referencia de la estación | — | no se captura en la app | — | — | `sin_equivalencia` | Fuera de la app: se transcribe a la hoja de análisis de concordancia. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: NA fuera de estaciones |
| `BIT_FECHA` | B | Fecha | — | no se captura en la app | — | Organización: coordinador | `sin_equivalencia` | Fuera de la app: la bitácora se lleva donde viven los datos. dd/mm → ISO aaaa-mm-dd | si falta: — obligatorio |
| `BIT_HOGAR` | B | Hogar | — | no se captura en la app | — | Organización: coordinador | `sin_equivalencia` | Fuera de la app: la bitácora se lleva donde viven los datos. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `BIT_TIPO` | B | Tipo | — | no se captura en la app | — | Organización: coordinador | `sin_equivalencia` | Fuera de la app: la bitácora se lleva donde viven los datos. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `BIT_CONT` | B | Contenido, sin datos personales | — | no se captura en la app | — | Organización: coordinador | `sin_equivalencia` | Fuera de la app: la bitácora se lleva donde viven los datos. Texto acotado; sin datos personales | si falta: — obligatorio |
| `BIT_ROL` | B | Quién (rol, no nombre) | — | no se captura en la app | — | Organización: coordinador | `sin_equivalencia` | Fuera de la app: la bitácora se lleva donde viven los datos. Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `VER_FECHA` | T | Fecha de la comprobación | — | `VER_FECHA` | `ver_fecha` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: dd/mm → ISO aaaa-mm-dd | si falta: — obligatorio |
| `VER_INSTR` | T | Instrumento | — | `VER_INSTR` | `ver_instr` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Valor de `data-valor`; dos marcas → error de integridad (§8) | si falta: — obligatorio |
| `VER_REF` | T | Valor de referencia | — | `VER_REF` | `ver_ref` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: — obligatorio |
| `VER_LECT` | T | Lectura del instrumento | — | `VER_LECT` | `ver_lect` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: Número con la unidad del diccionario; vacío según «Si falta» | si falta: ND |
| `VER_OK` | T | Dentro de la tolerancia | — | `VER_OK` | `ver_ok` | — | `sin_equivalencia` | Hoy no se captura. Tras la migración: `si`/`no` (o marcada/no marcada) | si falta: — obligatorio |

## Campos de la app sin casilla en la ficha

| `campo_app_actual` | Dónde está hoy | `tipo_relacion` | Destino | Hallazgo |
| --- | --- | --- | --- | --- |
| `config.responsable` | Ajustes; columna `responsable` en **cada fila** del CSV; cuerpo del correo | `retirada_por_privacidad` | **Se elimina** del modelo, del CSV, del correo y del respaldo | H-1, D5 |
| `entradas[].tipo` | Registro diario («Tipo de residuo»); columna `tipo_residuo` del CSV | `retirada_por_privacidad` | **Se elimina.** No se mapea a nada (dicc. §10.2) | H-2, D5 |
| `config.coordinadorNombre`, `config.coordinadorEmail` | Ajustes; correo de entrega | `retirada_por_privacidad` | Salen del modelo de datos: la app es del coordinador y no necesita escribir su propio nombre ni correo en los datos | H-6, dicc. §10.1 |
| `entradas[].contaminantes` | Casilla diaria «Encontré materiales no aceptados» | `sin_equivalencia` | Se retira; el dato vive en `A4`, semanal, con nota | R-7 |
| `entradas[].minutos` | Minutos por carga | `sin_equivalencia` | Se retira; el único total es `MIN_S` | R-5 |
| `revisiones[].minutos` | Minutos de la revisión | `sin_equivalencia` | Se retira; ídem | R-5 |
| `revisiones[].resultado` | «Resultado observado» | `sin_equivalencia` | Se retira: el resultado es el estado siguiente, que ya se registra | R-6 |
| `revisiones[].foto` | «Ya envié la fotografía al grupo» | `sin_equivalencia` | Se retira: la foto va al coordinador, no al grupo (P-06), y el coordinador sabe si la recibió | H-4, P-06 |
| `entregas[]` | Confirmación local de envío | `sin_equivalencia` | Se convierte en «hoja recibida y transcrita» por semana, del lado del coordinador | — |
| Regla «Semana 1: solo se mide» | `renderEntryRule()` | `sin_equivalencia` | **Se elimina**: se composta desde el día 1 | D1 |

## Categorías del plan sin casilla

| `categoria_plan` | Por qué no tiene casilla | Qué se hace |
| --- | --- | --- |
| Costo (gasto inicial y operativo) | Ninguna versión de la ficha lo pregunta | PROPUESTA P-18 |
| «Tipo principal de residuo» | Retirado por privacidad | Ya no está en el plan (D5) |
| Generación (L/persona/semana) | El registro mide **entrada**; la generación es estimada | `GEN_EST` = entrada + fuga, derivada (D1) |

## Equivalencias de valores que **no** existen

Para las variables de estado no hay función que traduzca las categorías de la app a las de la ficha,
en ninguna dirección. Los datos capturados con la app antes de la migración, si los hay, se conservan
como **serie distinta** y no se concatenan.

| Variable | Valores de la app hoy | Por qué no se traducen |
| --- | --- | --- |
| `HUM` | seca · **adecuada** · húmeda · saturada | «Adecuada» es un juicio; `húmeda` no separa `H3` de `H4`; `saturada` mezcla `H4` y `H5` (C-1) |
| `OLOR` | ninguno · ligero · fuerte · podrido · amoniaco | Mezcla intensidad y tipo; `fuerte` no tiene `O` (C-3) |
| `FAU` | ninguno · pocas moscas · muchas moscas · hormigas · cucarachas · roedores | «Plagas» es una interpretación; once grupos más `F12` y `F00` no caben en seis opciones únicas (C-2) |
| `MEZ_TX` | suelta y aireada · compacta · con bloques grandes · material demasiado grande | Única traducción parcial: `X1`/`X2`/`X3`, perdiendo la multimarca (C-4) |

## Qué falta para cerrar esta tabla

- Que el comité resuelva las PROPUESTAS que tocan casillas (acta-01 §8): si cambia una casilla,
  cambia su fila.
- Revisarla una vez contra F-HOG rev. 03 congelada.
- Validarla con la prueba de transcripción cronometrada (protocolo v0.2 §7.1, prueba 5).
