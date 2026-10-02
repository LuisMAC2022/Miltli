# Diseño del mes 2 — composta, suelo y estimación de GEI evitados

> **Borrador para el comité.** Fecha: octubre de 2026. Responde al propósito fijado en
> `acta-01-decisiones-piloto.md`: el mes 1 prueba la entrada —separación, medición, rutina— y, al mismo
> tiempo, **deja medido lo necesario** para que el mes 2 pueda evaluar la calidad de la composta, la
> calidad del suelo y una estimación de los gases de efecto invernadero (GEI) evitados. Los códigos son
> los de `diccionario-de-datos-v0.3-borrador.md`; los pasos, los de `protocolo-operativo-v0.2-borrador.md`.
>
> **Nota de fuentes.** Las normas mexicanas citadas no se pudieron consultar desde la sesión en que se
> redactó este documento: la red del entorno bloqueó los sitios de SEDEMA y SEMARNAT. Los valores de la
> NMX-AA-180-SCFI-2018 son los que resume el encargo y **deben verificarse contra el texto oficial**
> antes de usarse; la revisión de la NADF-020-AMBT-2011 queda **pendiente** (§4.2.2).

---

## 4.1 Lo que el mes 1 debe dejar medido para que el mes 2 sea posible

Cada ítem tiene su campo en el diccionario v0.3, su momento y su paso en el protocolo v0.2. **Si un
ítem no se mide en su momento, no se puede reconstruir después**; la última columna dice qué se pierde.

| # | Ítem | Campo v0.3 | Momento | Paso del protocolo v0.2 | Si falta |
| --- | --- | --- | --- | --- | --- |
| **Composta** | | | | | |
| 1 | Tara del contenedor vacío | `CONT_TARA`, `CONT_TARA_MET` | Día 1 | §1.3 B2, §2.20 | Sin masa de la pila por báscula: sólo geometría (cota inferior) |
| 2 | Dimensiones internas | `CONT_FORMA`, `CONT_LARGO`, `CONT_ANCHO`, `CONT_DIAM_SUP`, `CONT_DIAM_INF`, `CONT_ALTO` | Día 1 | §1.3 B1, §2.20 | Sin volumen ocupado ni método geométrico |
| 3 | Edad del lote | `D0_FECHA`, `D0_VACIO`, `PARADA_DIA` | Día 1 · cuando ocurra | §1.3 B6, §2.14, §2.16 | No se sabe cuánto lleva madurando cada parte de la pila |
| 4 | Lo que entró, en volumen | `ORG`, `SEC`, `D0_BASE`, `BOTE_CAP` | Diario · día 1 | §1.4, §2.19 | Sin balance de masa ni GEI |
| 5 | Qué material seco entró | `SECO_USO`, `DENS_SECO_TIPO` | Semanal · día 28 | §1.5, §2.13 | Sin sensibilidad del seco ni lectura de C/N por materiales |
| 6 | Masa de la pila al día 28 | `PESO_BRUTO`, `PESO_MET` (o `DENS_PILA_*` + `LLEN_REF`) | Día 28 | §1.6 pasos 9–11, §2.21 | Sin punto de partida para la pérdida de masa del mes 2 |
| 7 | Altura de llenado | `LLEN_REF` | Día 28 | §1.6 paso 11, §2.15 | Sin volumen ocupado ni reducción de volumen |
| 8 | Estado al día 28 | `VAHO`, `HUM`, `OLOR`, `FAU`, `MEZ_AV`, `MEZ_TX` | Día 28 | §1.6 pasos 2–8 | Sin primer punto de la serie de estado del mes 2 (objetivo D) |
| 9 | Temperatura de la pila | `TEMP_I`, `TEMP_AMB`, `VIS_HORA` | Día 28 | §1.6 paso 4, §2.10 | Sin referencia para el autocalentamiento |
| 10 | Muestra de composta de línea base | `MUE_COMP_M` (etiqueta `H#-C0`) | Día 28 | §1.6 paso 13, §2.24 | **Irreconstruible:** sin línea base de madurez |
| **Suelo** | | | | | |
| 11 | Suelo disponible | `SUELO_TIPO` | Día 28 | §1.6 paso 13, §2.24 | Sin diseño pareado |
| 12 | Parche que recibirá composta | `SUELO_CON` | Día 28 | §2.24 (volado, P-14) | Asignación sesgada por la elección del hogar |
| 13 | Muestras de línea base P1 y P2 | `MUE_SUELO_P1_M`, `MUE_SUELO_P2_M`, `SUELO_PROF`, `SUELO_SUB` (etiquetas `H#-S-P1-0`, `H#-S-P2-0`) | Día 28, **antes de cualquier aplicación** | §1.6 paso 13, §2.24 | **Irreconstruible:** sin línea base previa a la aplicación |
| **GEI** | | | | | |
| 14 | Entrada semanal | `ORG`, `BOTE_CAP`, `PERS_S` → `ENT_LPS` | Diario · semanal | §1.4, §1.5 | Sin masa compostada |
| 15 | Densidad de la entrada | `DENS_V`, `DENS_M`, `DENS_T`, `RES_GUARDADO` | Día 28 | §1.6 paso 10, §2.22, §2.23 | La masa sólo con el valor de la literatura |
| 16 | Densidad del seco (sensibilidad) | `DENS_SECO_V`, `DENS_SECO_M`, `DENS_SECO_T` | Día 28 | §1.6 paso 10, §2.22 | Sensibilidad del seco sólo con la literatura |
| 17 | Fuga (se excluye del cálculo, se documenta) | `FUGA`, `FUGA_MOT` | Semanal | §1.5, §2.12 | No se puede decir qué se excluyó |
| 18 | Adicionalidad | `DPRE` | Día 1 | §1.3 B6 (Hoja 1) | No se sabe qué parte habría ido a un sitio de disposición |
| 19 | Mezclado | `ACT` (`A1`) | Semanal | §1.5 paso 7, §2.9 | No se elige el extremo del factor casero |
| 20 | Indicadores anaerobios | `OLOR` (`O4`), `HUM` (`H4`, `H5`) | Día 28 | §1.6 pasos 3 y 7 | Ídem |
| 21 | Escenario de sitio de disposición | `ESC_SITIO` (fuera del repositorio) | Antes del análisis | §1.7 paso 5 | Sin factor de relleno por hogar: se reporta sólo el rango de escenarios |
| **Programa** | | | | | |
| 22 | Lo que hizo el programa | `BIT_*` | Continuo desde el día 1 | §1.7, plantilla de bitácora | No se distingue un efecto del programa de uno del hogar |

---

## 4.2 Calidad de la composta

A los 28 días la composta estará **inmadura**: la pila sigue recibiendo residuo casi hasta el día 28.
El mes 2 sigue su maduración; no evalúa «si salió bien».

### 4.2.1 Marco de referencia: NMX-AA-180-SCFI-2018

Se usa como **marco de referencia, no de cumplimiento**: está escrita para plantas de tratamiento
aerobio de la fracción orgánica de los residuos sólidos urbanos y de manejo especial, no para
composteras de casa. Valores de referencia **tal como los resume el encargo** (verificar contra la
norma):

| Parámetro | Referencia | Cómo se lee en el piloto |
| --- | --- | --- |
| Índice de germinación (IG) | Tipo III 80–85 % · Tipo II 85–90 % · Tipo I > 90 % | Principal indicador de madurez de bajo costo |
| Autocalentamiento en Dewar | ΔT 0–5 °C = madura | Estabilidad; prueba adaptada (§4.2.3) |
| Humedad | 25–45 % | Por secado |
| pH | 6.7–8.5 | Con medidor barato |
| Conductividad eléctrica (CE) | Según la norma `[por verificar]` | Con medidor barato; sales |
| Relación C/N | 15–25 | Sólo laboratorio (opcional) |
| Olor y color | Descriptivos | Olor a tierra; color oscuro |

### 4.2.2 NADF-020-AMBT-2011 (Ciudad de México) — revisión pendiente

La norma ambiental de la Ciudad de México que establece los requisitos mínimos para producir composta
a partir de la fracción orgánica de residuos y las especificaciones mínimas de calidad de la composta
que se produce o distribuye en la ciudad (publicada en la *Gaceta Oficial del Distrito Federal* en
2012). Clasifica la composta en tipos según su calidad y su uso. **Su texto no fue accesible desde la
sesión**: la comparación de sus tipos y límites con la NMX-AA-180 queda `[por definir]` y debe hacerse
antes de fijar el criterio de madurez (P-15). Como la NMX, es un marco de referencia, no de
cumplimiento, para composteras domésticas.

### 4.2.3 Pruebas de bajo costo

| Prueba | Cómo | Desviación que se declara |
| --- | --- | --- |
| **Germinación** | Extracto acuoso de la composta; semillas de **berro** (*Lepidium sativum*) o **rábano** en cajas con papel humedecido con el extracto y con agua (control); 48–72 h a temperatura estable y a oscuras. IG = (germinadas × longitud de raíz en el extracto) / (germinadas × longitud de raíz en el control) × 100 | Proporción del extracto, número de semillas y temperatura según la norma `[por verificar]`; si se usa otra, se anota |
| **Autocalentamiento adaptado** | Muestra con la humedad ajustada en un termo doméstico de ~1.5–2 L, tapado; temperatura interna y ambiente una o dos veces al día durante 5–10 días. ΔT = máxima interna − ambiente | **No es un vaso Dewar** ni tiene ambiente controlado: el termo pierde más calor y el ambiente varía. Se anota el ambiente en cada lectura y el resultado se lee como orientativo |
| **Olor y color** | Escala descriptiva de la Hoja 4 para el olor; color comparado con una tarjeta de grises impresa | Subjetivo; mismo observador en todos los momentos |
| **pH y CE** | Medidores portátiles calibrados con sus soluciones; extracto composta:agua | Proporción `[por verificar]` contra la norma; se usa la misma en todos los momentos |
| **Humedad por secado** | Pesar una submuestra, secar hasta masa constante (horno a 105 °C, o el más cercano disponible) y volver a pesar | Si el horno no llega a 105 °C, se anota la temperatura usada |
| Laboratorio (opcional) | C/N, materia orgánica | Costo; sólo si el comité lo aprueba |

### 4.2.4 Calendario

| Momento | Muestra | Pruebas |
| --- | --- | --- |
| **Día 28** (visita de cierre) | `H#-C0` | Humedad y pH/CE el mismo día; germinación y autocalentamiento en los 7 días siguientes |
| ~ día 56 | `H#-C1` | Todas |
| ~ día 84 | `H#-C2` | Todas |
| Cada ~4 semanas | `H#-Cn` | Hasta cumplir el criterio de madurez |

**No se aplica composta al suelo hasta cumplir el criterio de madurez que fije el comité.**
**PROPUESTA P-15:** IG ≥ 80 % (umbral del Tipo III) **y** ΔT del autocalentamiento adaptado ≤ 5 °C **y**
olor a tierra o casi sin olor (`O0`/`O1`, sin `O3` ni `O4`) en la misma muestra. Alternativas: sólo IG
≥ 80 %; o IG ≥ 85 %, más conservador.

### 4.2.5 Cadencia de observación de estado en el mes 2

El objetivo **D** (estado → acción → estado) pasó al mes 2 y necesita **al menos dos observaciones
por hogar** después de la del día 28.

**PROPUESTA P-16:** la revisión de estado de la Hoja 4 (sólo el bloque de estado), **cada dos
semanas** —días 42 y 56— por el hogar, con el mismo orden de §1.6 sin la parte del equipo; `ACT` sigue
semanal. Con la observación del día 28 son **tres puntos por hogar** y dos intervalos con acción
registrada. Alternativas: semanal (cuatro puntos, más carga); o sólo en las tomas de muestra (días 56
y 84, con el equipo).

---

## 4.3 Calidad del suelo

### 4.3.1 Diseño

**Pareado por hogar** (A-3): en el suelo de cada casa —jardín o macetas—, dos parches contiguos o dos
macetas iguales, **P1** y **P2**. Uno recibe composta y el otro no; cuál se decide con un volado en la
visita (P-14) y se anota en `SUELO_CON`. Con cinco hogares son, como máximo, cinco pares: el análisis
es **descriptivo**, por diferencias dentro de cada par.

- **Parches:** contiguos, del mismo tamaño (`[por definir]`, p. ej. 50 × 50 cm), misma exposición y
  mismo uso.
- **Macetas:** iguales, con el mismo sustrato de origen y en el mismo lugar.
- **Hogar sin suelo:** P-23.

### 4.3.2 Muestreo

- **Muestra compuesta por parche:** `SUELO_SUB` submuestras (p. ej. 5 a 10) a **profundidad fija**
  (`SUELO_PROF`; **PROPUESTA:** 0–15 cm en suelo, toda la profundidad en maceta), mezcladas; se pesa
  (`MUE_SUELO_P*_M`) y se etiqueta `H#-S-P1-0` / `H#-S-P2-0`.
- **Lo que no se puede reconstruir después —la línea base previa a la aplicación— se toma a más tardar
  el día 28.** Las pruebas lentas (infiltración, respiración, densidad aparente) pueden hacerse otro
  día, **siempre antes de aplicar**.
- Privacidad: etiqueta sólo con `H#`; sin coordenadas ni descripción del lugar; fotos sin ubicación.

### 4.3.3 Indicadores de campo

Según la guía del kit de calidad de suelo del USDA-NRCS (*Soil Quality Test Kit Guide*):

| Indicador | Qué dice del suelo |
| --- | --- |
| Respiración | Actividad biológica |
| Infiltración | Estructura y porosidad |
| Densidad aparente | Compactación |
| Conductividad eléctrica | Sales |
| pH | Acidez o alcalinidad |
| Nitrato | Nitrógeno disponible |
| Estabilidad de agregados | Estructura |
| Lombrices | Vida del suelo |

Cada prueba se hace igual en P1 y P2, el mismo día. Los procedimientos se copian de la guía en una hoja
de campo del equipo `[por definir]`.

### 4.3.4 Laboratorio, opcional

Según la NOM-021-SEMARNAT-2000: **materia orgánica, pH, textura y nitrógeno**. Sólo si el comité lo
aprueba y en la línea base y el último seguimiento.

### 4.3.5 Calendario

| Momento | Qué |
| --- | --- |
| A más tardar el día 28 | Línea base de P1 y P2 (muestra compuesta) |
| Antes de aplicar | Pruebas de campo lentas en P1 y P2 |
| Cuando se cumpla P-15 | Aplicación de composta en el parche asignado |
| **+3 meses** de la aplicación | Seguimiento |
| **+6 meses** de la aplicación | Seguimiento |

**No se prometen efectos en el mes 2.** Los efectos en el suelo tardan meses: el mes 2 deja la línea
base y, si la composta madura a tiempo, la aplicación. Lo que se diga del suelo antes de +3 meses es
una descripción de la línea base.

---

## 4.4 Estimación de GEI evitados

Siempre es una **estimación**, nunca una medición: no se mide ningún gas.

```
E = M_desviada × EF_relleno − M_compostada × EF_casera        [kg CO2e]
```

`E` son **emisiones comprometidas de vida completa**: todo el metano que el residuo habría emitido en
un sitio de disposición a lo largo de su descomposición, menos lo que emite al compostarse en casa.
**No se cuenta el CO2 biogénico.**

### 4.4.1 Masas, en kg húmedos

- **Entrada (L) × densidad** de los pares DENS de entrada, **expresada como rango** (mínimo y máximo de
  los cinco pares, con el valor de EPA 2016 —residuo de alimentos suelto ≈ 0.27 kg/L— como contraste).
- **La fuga se excluye**: no se compostó.
- **Adicionalidad según `DPRE`:** lo que antes del piloto ya iba a animales o a composta **no cuenta
  como desviado**.
- **Términos de la fórmula** (decisión de este documento; el comité puede simplificarla): con `b` = la
  fracción que antes iba a la basura y `c` = la que ya se compostaba,
  `M_desviada` = `b` × `M_entrada` y `M_compostada` = (1 − `c`) × `M_entrada`. Así, un hogar que ya
  compostaba no aparece «evitando» nada por seguir haciéndolo, y uno que antes daba los restos a sus
  animales aparece, correctamente, con emisiones añadidas.
- **`DPRE` mixto se acota con escenarios:**

| `DPRE` | `b` | `c` | Escenarios |
| --- | --- | --- | --- |
| sólo `basura` | 1 | 0 | — |
| sólo `animales` | 0 | 0 | — (E negativo) |
| sólo `compost` | 0 | 1 | — (E = 0) |
| varias marcas | central 1/k (k = marcas) | ídem | bajo: `b` = 0.1 · alto: `b` = 0.9 |
| `otro` o `NC` | 0 | 0 | Se excluye del agregado y se declara |

- **El material seco se excluye del cálculo principal**: su destino alternativo es incierto (hojas que
  se habrían quedado en el jardín, cartón que se habría reciclado). Va como **sensibilidad**, con su
  masa (`SEC_L` × `DENS_SECO`) y escenarios de destino.

### 4.4.2 `EF_relleno` — IPCC 2006, Vol. 5

```
EF_relleno = DOC × DOCf × MCF × F × 16/12 × (1 − R) × (1 − OX)      [kg CH4 / kg húmedo] × GWP_CH4
```

| Parámetro | Valor | Fuente |
| --- | --- | --- |
| `DOC` residuos de alimentos | 0.15 (0.08–0.20), base húmeda | Cap. 2, Cuadro 2.4 |
| `DOC` (sensibilidad del seco) | jardín 0.20 · papel y cartón 0.40 · madera 0.43 | Cap. 2, Cuadro 2.4 |
| `DOCf` | 0.5 | Cap. 3 |
| `F` (fracción de CH4 en el gas) | 0.5 | Cap. 3 |
| `MCF` | 1.0 gestionado anaerobio · 0.5 gestionado semiaerobio · 0.8 no gestionado profundo · **0.4 no gestionado somero** · 0.6 sin categoría | Cap. 3, Cuadro 3.1 |
| `OX` | 0; **0.1** si el sitio está cubierto con material oxidante | Cap. 3 |
| `R` | Recuperación de gas, si el sitio la documenta; si no, 0 | Cap. 3 |
| `k` | Sólo si se quiere un perfil temporal de las emisiones | Cap. 3, Cuadro 3.3 |

**Escenarios por tipo de sitio.** Se construyen por tipo, **sin asociar ningún `H#` con un municipio
en el repositorio**: la coordinación asigna a cada hogar un escenario (`ESC_SITIO`) fuera del
repositorio, con fuentes del INECC (inventario nacional, sector residuos), de SEDEMA y de los
municipios `[por definir]`.

| Escenario | `MCF` | `OX` | `EF_relleno` alimentos (kg CO2e/kg, GWP 28) |
| --- | ---: | ---: | ---: |
| S1 · relleno gestionado anaerobio, con cobertura | 1.0 | 0.1 | 1.26 |
| S2 · relleno gestionado semiaerobio, con cobertura | 0.5 | 0.1 | 0.63 |
| S3 · sitio no gestionado profundo | 0.8 | 0 | 1.12 |
| S4 · tiradero no gestionado somero | 0.4 | 0 | 0.56 |
| S5 · sin categoría | 0.6 | 0 | 0.84 |

Con `DOC` = 0.15, `R` = 0. Cuenta para S5: 0.15 × 0.5 × 0.6 × 0.5 × 16/12 = 0.030 kg CH4/kg × 28 =
0.84 kg CO2e/kg.

### 4.4.3 `EF_casera`

| Fuente | CH4 (g/kg húmedo) | N2O (g/kg húmedo) | kg CO2e/kg (AR5) |
| --- | --- | --- | --- |
| IPCC 2006, Vol. 5, Cap. 4, Cuadro 4.1, compostaje, base húmeda | 4 (0.03–8) | 0.24 (0.06–0.6) | **0.176** (0.017–0.383) |
| Andersen et al. 2010, *Waste Management* 30:2475–2482, compostaje casero medido | 0.4–4.2 | 0.30–0.55 | 0.091–0.263 |

Cuenta del valor central IPCC: 4 × 28 + 0.24 × 265 = 175.6 g CO2e/kg. En Andersen et al. 2010, **el
mezclado semanal dio los factores más altos**.

**Cómo se elige el extremo** (regla escrita antes de ver datos):

| Condición del hogar | `EF_casera` |
| --- | --- |
| `A1` (removí o mezclé) en ≥ 3 de 4 semanas **o** `O4` o `H4`/`H5` el día 28 | Alto: extremo superior de Andersen et al. (0.263) |
| `A1` en ≤ 1 semana **y** sin `O4` ni `H4`/`H5` | Bajo: extremo inferior de Andersen et al. (0.091) |
| Cualquier otro caso | Central: IPCC (0.176) |

El intervalo completo del IPCC (0.017–0.383) va a la tabla de sensibilidad.

### 4.4.4 Potenciales de calentamiento

**GWP100 del AR5: CH4 = 28, N2O = 265**, como exige la decisión 18/CMA.1 para reportar bajo el Acuerdo
de París. **Sensibilidad con el AR6:** CH4 de origen no fósil = 27, N2O = 273.

### 4.4.5 Ejemplo trabajado — **valores hipotéticos**

> **Todos los números de este ejemplo son inventados para mostrar el cálculo. No son datos del piloto.**

Un hogar hipotético echa **40 L** de orgánico en el mes. Sus `DPRE`: sólo `basura` (`b` = 1, `c` = 0).
Densidad central 0.27 kg/L (EPA 2016) y rango hipotético de los pares DENS de 0.25 a 0.45 kg/L. Sitio
asignado: S5.

```
M_entrada   = 40 L × 0.27 kg/L                       = 10.8 kg   (rango 10.0–18.0 kg)
M_desviada  = 1 × 10.8                               = 10.8 kg
M_compostada= (1 − 0) × 10.8                         = 10.8 kg
EF_relleno  = 0.84 kg CO2e/kg   (S5)
EF_casera   = 0.176 kg CO2e/kg  (central IPCC)
E           = 10.8 × 0.84 − 10.8 × 0.176             = 7.2 kg CO2e
```

### 4.4.6 Tabla de sensibilidad (mismo hogar hipotético)

| Cambio respecto del caso central | E (kg CO2e) |
| --- | ---: |
| Caso central (10.8 kg, S5, IPCC central) | 7.2 |
| Masa mínima del rango (10.0 kg) | 6.6 |
| Masa máxima del rango (18.0 kg) | 12.0 |
| Sitio S1 (gestionado anaerobio, cubierto) | 11.7 |
| Sitio S4 (tiradero somero) | 4.1 |
| `EF_casera` alto (Andersen, 0.263) | 6.2 |
| `EF_casera` bajo (Andersen, 0.091) | 8.1 |
| `EF_casera` máximo del IPCC (0.383) | 4.9 |
| `DOC` bajo (0.08) | 2.9 |
| `DOC` alto (0.20) | 10.2 |
| GWP del AR6 (CH4 27, N2O 273) | 6.9 |
| `DPRE` = `basura` + `animales`, escenario bajo (`b` = 0.1) | −1.0 |
| **Combinación desfavorable** (10.0 kg, S4, `DOC` 0.08, `EF_casera` 0.383) | **−0.8** |
| **Combinación favorable** (18.0 kg, S1, `DOC` 0.20, `EF_casera` 0.017) | **29.9** |

Cómo se leen: el signo puede cambiar. Lo que más mueve la cifra es **a dónde habría ido el residuo**
(sitio y adicionalidad), no la composta casera.

### 4.4.7 Cómo comunicar el resultado sin sobrevenderlo

> «Según una estimación con supuestos declarados, los residuos que estos cinco hogares compostaron en
> casa durante un mes evitarían entre X y Y kg de CO2e de emisiones futuras de metano, comparados con
> mandarlos a un sitio de disposición. Es una cifra pequeña y depende sobre todo de adónde habrían ido
> esos residuos. Lo valioso del piloto es el método, que puede repetirse con más hogares en el Piloto 2.»

La cifra por hogar será pequeña. No se anualiza ni se extrapola a la ciudad sin decirlo y sin declarar
los supuestos.

---

## 4.5 Tabla de decisiones del Piloto 2 — pre-registrada (RE-11)

Las decisiones hacia el Piloto 2 se escriben **antes de ver datos**, como la regla de multimarca.
Estructura de la tabla:

| Columna | Contenido |
| --- | --- |
| Indicador | Qué se mide, con su campo de v0.3 |
| Verde — sigue | Umbral con el que el Piloto 2 conserva el diseño |
| Ámbar — ajusta | Umbral con el que se ajusta, y cómo |
| Rojo — detiene | Umbral con el que esa parte se detiene o se rediseña |
| Cambio en el Piloto 2 | Qué se hace en cada color |
| Predicción | Lo que el equipo cree que va a pasar, escrito antes de ver datos |

La escala verde / ámbar / rojo sigue a Avery et al. 2017 (*BMJ Open* 7:e013537). La predicción por
fila responde a Taylor et al. 2014 (*BMJ Qual Saf* 23:290–298): sólo 4 de 47 reportes PDSA escribieron
una predicción.

**El contenido no está en este repositorio.** El sitio es público y los hogares podrían leerlo, y
conocer los umbrales cambiaría su conducta. El archivo `ficha/preregistro/tabla-decisiones-piloto-2.md`
está en `.gitignore`; en el repositorio sólo se versiona su **hash SHA-256 con fecha**
(`ficha/preregistro/SELLOS.md`). Se revela después del cierre y cualquiera puede comprobar que no
cambió.

**PROPUESTA P-17:** los umbrales y las predicciones. El sello actual es el del **borrador**; vale como
pre-registro **sólo el último sello anterior al día 1**, después de que el comité revise la tabla y
escriba o ratifique sus predicciones.
