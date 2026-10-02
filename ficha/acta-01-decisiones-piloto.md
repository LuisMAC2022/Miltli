# Acta 01 — Decisiones del piloto y preparación del mes 2

Fecha del acta: 2 de octubre de 2026 · Serie: **actas** (documentos de decisión, prefijo `acta-`; ver RE-10)
Instrumento: `miltli-ficha-hogares.html`, de **F-HOG rev. 02** a **F-HOG rev. 03**
Contrato: `diccionario-de-datos-v0.2-borrador.md` → `diccionario-de-datos-v0.3-borrador.md`
Protocolo: `protocolo-operativo-v0.1-borrador.md` → `protocolo-operativo-v0.2-borrador.md`

Este acta registra **qué se decidió, quién lo decidió y qué cambia en cada archivo**. No reabre las
decisiones: las aplica. Lo que no quedó decidido se marca **PROPUESTA — decide el comité**, con
recomendación y alternativas, y se reúne en el §6.

---

## 0. Procedencia y cómo leer este acta

### 0.1 De dónde viene cada cosa

| Origen | Qué aporta | Cómo se cita aquí |
| --- | --- | --- |
| **vatoLoko, 1-oct-2026** | Las opciones marcadas en el artefacto «Seis decisiones del piloto» (D1–D6), las aclaraciones del mismo día y el destino de los encargos de la junta | «vatoLoko (1-oct-2026)» |
| **Revisión externa con Claude, 1-oct-2026** | Los hallazgos `RE-01`…`RE-14` | «RE-xx» |
| Revisiones 01–03, contraste 01, hallazgos | El análisis de partida de cada punto | Por archivo y sección |
| **Respuestas del usuario que hizo el encargo, 2-oct-2026** | Ratificación (§0.2) y número de hogares del equipo (RE-08) | «respuesta del 2-oct-2026» |
| **Este acta** | Lo que el encargo delegó explícitamente («decide tú», «decide y documenta») y la redacción de textos nuevos | «este acta» |

El artefacto «Seis decisiones del piloto» **no está en el repositorio**. Este acta trabaja con la
descripción que de él hace el encargo; si el artefacto dice otra cosa, manda el artefacto y este acta
se corrige.

### 0.2 Ratificación

Se preguntó si las decisiones D1–D6 y sus aclaraciones requieren ratificación del comité. **Respuesta
del 2-oct-2026: son firmes y no requieren ratificación.** En consecuencia:

- **Decidida** = firme desde el 1-oct-2026. Se aplica en los borradores de esta entrega.
- **PROPUESTA** = va al comité. Ninguna PROPUESTA se aplica como si estuviera decidida: donde el papel
  o el protocolo necesitan un texto para existir, se imprime la recomendación y queda anotado que el
  comité puede cambiarla antes de congelar.

### 0.3 Formato de cada punto

**Regla anterior** → **Decisión** → **Consecuencias** → **Archivos afectados** → **Estado** →
**Procedencia**. Es el formato de las revisiones 01–03 con dos campos más: el estado y la procedencia.

---

## 1. Resumen

| Punto | En una línea | Estado |
| --- | --- | --- |
| D1 | `ORG` mide **entrada a la composta**; se añade un renglón semanal de **fuga**; se composta desde el día 1 | Decidida |
| D2 | Siete criterios de éxito **de proceso**, todos calculables con v0.3; «5 de 7» se mantiene | Decidida · umbrales nuevos PROPUESTA |
| D3 | Sin visitas en S2 ni S4: **medición del día 1** y **una visita de cierre el día 28** | Decidida · ventana y día 1 no presencial PROPUESTA |
| D4 | Rango (mín, máx) **sólo en ordinales** (`HUM`, `MEZ_AV`); nominales en multi-hot | Decidida · `MEZ_TX` nominal (este acta) |
| D5 | Fuera `responsable` y `tipo_residuo`; la app es la captura del coordinador; nombres fijados | Decidida |
| D6 | **Una sola reimpresión**: F-HOG rev. 03 | Decidida |
| A-1 | **Estado mensual (día 28), entrada semanal** | Decidida · `ACT` semanal PROPUESTA |
| A-2 | Pesaje: equipo en casa + densidad | Decidida (ver D3) |
| A-3 | Suelo de cada hogar, diseño pareado, línea base a más tardar el día 28 | Decidida |
| A-4 | Glosas: 4 prescriptivas a la hoja guía, 2 reescritas, el resto se queda | Decidida |
| E-1…E-4 | Hoja de concordancia, ayuda visual de fauna, canal de entrega, observador | E-1, E-2, E-4 decididas · E-3 PROPUESTA |
| RE-01…RE-14 | Hallazgos de la revisión externa | Integrados · detalles PROPUESTA donde se indica |

---

## 2. Decisiones D1–D6

### D1 — Qué mide el piloto: A + B

**Regla anterior.** `planes/plan_trabajo.md` prometía saber «cuánto residuo orgánico genera cada
hogar» y llamaba al indicador «Generación — litros de residuos por persona y semana». La ficha sólo
mide lo que entra a la composta (`ORG`), y nada registraba lo que no llegaba. La revisión 03 §2.3 lo
señaló como el hallazgo principal: *se llama de un modo y mide de otro*. Además, el plan dedicaba la
semana 1 a medir sin compostar, y la Hoja 2 de la rev. 02 imprimía un parche: «Si el grupo acordó una
primera semana de sólo medir, esos días deja el seco vacío» (protocolo v0.1 §5.2).

**Decisión.**

- **A.** `ORG` mide **entrada a la composta**. En todo documento el indicador se llama **«Entrada a
  la composta (L/persona/semana)»**, nunca «generación».
- **B.** Renglón semanal de **fuga**: «botes que esta semana no llegaron a la composta» (`FUGA`, en
  botes, admite ½), con motivo multimarca (`FUGA_MOT`):
  `FG1` ya no cabía · `FG2` no tenía material seco · `FG3` a animales · `FG4` a la basura ·
  `FG5` otro (**nota obligatoria**).
  No hay motivos que describan la rutina del hogar (viajes, ausencias, visitas): el motivo es de la
  composta, no de la casa.
- **Generación estimada = entrada + fuga.** Es autorreportada y aproximada, y **se presenta siempre
  con su error declarado**.
- **Se rechaza C.** Se composta desde el día 1. Los siete primeros renglones no son una fase distinta.

**Consecuencias.**

1. La generación estimada es una **cota inferior**: lo que nunca se separó (se fue a la basura sin
   que nadie lo notara) no deja rastro en ninguna casilla. La fuga, además, se recuerda una vez por
   semana y se estima en botes sin el gesto de llenado. Ésos son los dos errores que se declaran.
2. Se cierra el pendiente de la revisión 03 §10.2: `SEC` vacío significa lo mismo en los 28 renglones
   (renglón sin anotar), porque ya no hay semana de sólo medir.
3. Se pierde la única línea base **previa a la intervención** que ofrecía C (revisión 03 §2.3c). La
   entrada se mide ya bajo la intervención; junto con RE-09 (reactividad), su tendencia no se lee
   como línea base.
4. `MASC` (alta, frecuencia) y `FG3` (semanal, en botes) quedan como par: la primera dice si pasa, la
   segunda cuánto. Su desacuerdo se marca como señal, no como error (diccionario v0.3 §8).
5. Nuevas derivadas: `FUGA_L`, `ENT_LPS` (entrada L/persona/semana) y `GEN_EST`.

**Archivos afectados.** Diccionario v0.3 §3, §4, §9 · protocolo v0.2 §2.1, §2.3, §5 · F-HOG rev. 03
Hojas 2 y 3 · `planes/plan_trabajo.md` · `README.md` · tabla de correspondencia · especificación de
la app.

**Estado.** Decidida.

**Procedencia.** vatoLoko (1-oct-2026): opciones A + B, rechazo de C, lista cerrada de motivos y la
exclusión de motivos de rutina. Análisis de partida: revisión 03 §2.3 y protocolo v0.1 §5.2. Códigos
`FUGA`, `FUGA_MOT`, `FG1`–`FG5` y la lectura como cota inferior: este acta.

---

### D2 — Criterios de éxito: A

**Regla anterior.** El plan evaluaba el mes con siete criterios y aprobaba con «5 de 7». La revisión
03 §3.1 mostró que **cuatro no eran calculables** con la ficha y que dos (#2 olores persistentes, #3
lixiviados frecuentes) no lo eran en principio con observaciones semanales. Los criterios #2, #3 y #4
estaban redactados como ausencia de problemas, contra la promesa impresa de que «ninguna casilla es
buena ni mala» (protocolo v0.1 §5.7, contraste §4.4).

**Decisión.** Los siete criterios se reescriben **en términos de proceso**: registró, sostuvo la
rutina, identificó su cuello de botella, puede estimar su entrada semanal y dimensionar su
contenedor. **Se acepta explícitamente que un hogar con la composta oliendo mal y el registro
impecable aprueba.** El estado de la composta se describe; no se califica.

| # | Criterio (proceso) | Antes (plan) | Campos v0.3 | Cálculo | Umbral |
| --- | --- | --- | --- | --- | --- |
| 1 | **Registró el diario** | #1 registros en ≥ 3 de 4 semanas | `DIA`, `FECHA`, `ORG` (Hoja 2) | Una semana cuenta como registrada si al menos 5 de sus 7 renglones tienen un número en `ORG`. El `0` cuenta; el renglón vacío, no | ≥ 3 de 4 semanas (del plan). «5 de 7 renglones»: **PROPUESTA** |
| 2 | **Llenó el renglón semanal** | — (nuevo) | `REG`, `FUGA` (Hoja 3) | Una semana cuenta si `REG` tiene una marca válida y `FUGA` tiene un número (el `0` cuenta) | ≥ 3 de 4 semanas · **PROPUESTA** |
| 3 | **Sostuvo la rutina de depósito** | #2, #3, #4 (estado), retirados | `ORG`, `PARADA_DIA` | Semanas con al menos un `ORG` > 0, contadas sólo hasta la semana de `PARADA_DIA`: las semanas posteriores a la parada salen del denominador | ≥ 3 de 4, o todas las anteriores a la parada · **PROPUESTA** |
| 4 | **La rutina cupo en su semana** | #6 menos de 30 min semanales | `MIN_S` | Mediana de `MIN_S` en las semanas con dato; requiere ≥ 2 semanas con dato | ≤ 30 min (del plan) |
| 5 | **Identificó su cuello de botella** | #5 mantiene reserva de seco | `CUELLO` (Hoja 4); `SECO_FALT`, `FUGA_MOT` como contraste descriptivo | `CUELLO` tiene una marca, incluida «nada en particular». `NC` no cuenta | Contestada |
| 6 | **Puede estimar su entrada semanal** | #7, primera mitad («generación») | `ORG`, `BOTE_CAP`, `PERS_S` | `ENT_LPS` calculable en la semana: ≥ 5 de 7 renglones con número, `PERS_S` con número y `BOTE_CAP` medido | ≥ 3 de 4 semanas · **PROPUESTA** |
| 7 | **Puede dimensionar su contenedor** | #7, segunda mitad | `LLEN_S`, `PARADA_DIA`, `LLEN_REF`, `CONT_ALTO` o `CONT_CAP`, `CONT_TAM` | Tasa de llenado calculable (de `LLEN_S` en ≥ 3 semanas, o de `PARADA_DIA`), contrastada con `LLEN_REF`, y `CONT_TAM` contestada | Calculable y contestada |

**La regla «5 de 7» se mantiene.** Razones:

1. Los siete criterios son de proceso: ninguno castiga el estado de la composta, así que la regla ya
   no cuenta olores como faltas.
2. Tolera dos fallas. Los criterios #1 y #6 están acoplados —sin diario no hay entrada que estimar—,
   de modo que un hogar que pierde el diario pierde los dos y sólo aprueba si cumple **todos** los
   demás. Es exigente sin ser imposible.
3. Cambiar a la vez los criterios y el umbral impediría comparar este piloto con el plan original.

**PROPUESTA (P-07b) — decide el comité:** «5 de 7 **con el #1 obligatorio**», porque el propósito del
mes 1 es probar la entrada y sin diario no hay entrada que evaluar. Alternativa: dejar «5 de 7» sin
condición (lo que aplica este acta mientras el comité no decida).

**Consecuencias.**

1. `CUELLO` es una pregunta nueva de cierre (Hoja 4): «lo que más limitó el mes en esta casa». Es la
   forma de que el criterio #5 sea calculable. **PROPUESTA de implementación (P-22):** alternativa,
   derivar el #5 de `SECO_FALT`, `FUGA_MOT` y `CIE_DIFICIL`; se descarta como recomendación porque
   `CIE_DIFICIL` es texto libre y no se puede contar sin interpretarlo.
2. Los criterios de estado del plan (#2, #3, #4) no se trasladan: su información vive en la revisión
   del día 28 (`HUM`, `OLOR`, `FAU`), como descripción.
3. El plan se corrige (§«Criterios de éxito») y repite esta tabla.
4. Los criterios se calculan como derivadas `C1`…`C7` (diccionario v0.3 §9).

**Archivos afectados.** `planes/plan_trabajo.md` · diccionario v0.3 §5, §9 · F-HOG rev. 03 Hoja 4 ·
especificación de la app (no calcula criterios: los calcula el análisis).

**Estado.** Decidida. Umbrales nuevos (#1 «5 de 7 renglones», #2, #3, #6): **PROPUESTA (P-07a)**.
`CUELLO`: **PROPUESTA de implementación (P-22)**.

**Procedencia.** vatoLoko (1-oct-2026): opción A, base de los criterios y la aceptación explícita del
hogar «con olor y registro impecable». Análisis: revisión 03 §3.1, protocolo v0.1 §5.7, contraste
§4.4. Tabla, cálculos y mantenimiento de «5 de 7»: este acta, por delegación del encargo («mantén o
revisa con justificación»).

---

### D3 — Visitas técnicas: C, modificada por una aclaración posterior

**Regla anterior.** El protocolo v0.1 §5.1 recomendaba dos visitas por hogar (S2 y S4) con ventana
de tres días; la tabla del §6 estaba vacía. El registro técnico suponía «dos visitas en el mes» y
pares de densidad «en dos momentos distintos». La Hoja 1 imprimía: «El pesaje y la temperatura los
hace el equipo que coordina, en las visitas que anuncie». La capacidad del bote se medía llenándolo
con una botella de 1 L.

**Decisión.**

- **No hay visitas en S2 ni S4.** Hay **una sola visita de cierre por hogar, el día 28**, del equipo,
  en casa. Contenido mínimo, en el orden de RE-06:
  1. pesaje de la compostera completa: bruto − tara del día 1;
  2. un bote de residuo fresco del día (**par DENS de entrada**) y un bote del material seco
     principal de esa semana (**par DENS de seco**);
  3. `TEMP_I`, `TEMP_AMB` y hora;
  4. observación de estado **simultánea e independiente**, hogar y equipo;
  5. altura de llenado con regla (`LLEN_REF`) y foto con las reglas de encuadre;
  6. muestras de línea base de composta y suelo para el mes 2.
- **Día 1, presencial:** `BOTE_CAP` pesando el bote lleno de agua (1 g ≈ 1 mL), dimensiones internas
  de la compostera y tara de la compostera vacía.
- **Compostera sin fondo** (`UBIC_TP = tierra`) **o más pesada que la báscula:** método geométrico,
  área interna × altura de llenado × densidad aparente de una muestra de la pila. **La densidad de una
  muestra suelta subestima la densidad in situ**, y así se declara.
- **Nadie del equipo visita su propia casa.**

**Consecuencias.**

1. **Cinco pares de densidad de entrada** (uno por hogar), en un solo momento. La conversión L→kg es
   **exploratoria**: se reporta con su incertidumbre y se contrasta con la literatura (EPA 2016:
   residuo de alimentos suelto ≈ 0.27 kg/L). Se pierde el «dos momentos distintos» del protocolo v0.1
   §2.10.
2. **Cinco lecturas de `TEMP_I`**, una por hogar: el objetivo de aprendizaje **E** queda en lectura
   exploratoria (antes se esperaban diez pares).
3. La Hoja 1 deja de prometer «visitas que anuncie» y describe la medición del día 1 y la visita del
   día 28 (F-HOG rev. 03).
4. El protocolo §6 se rehace: sesión del día 1 + visita de cierre, con columnas hogar · fecha ·
   ventana · quién va. Fechas y personas: `[por definir]`. En el repositorio, «quién va» lleva sólo
   una **clave de equipo** (`E1`…), nunca un nombre (regla de privacidad del encargo).
5. `VIS_QUIEN` pasa de texto libre a **clave de equipo**, por la misma razón.
6. `VIS_SEM` se **retira** (ya no hay visitas por semana) y la sustituye `VIS_TIPO` (`dia1` · `cierre`).
7. `HUM_REF` se **retira**: el par percepción–instrumento lo dan ahora la `HUM` que marca el hogar en
   la Hoja 4 y la `TEMP_I` de la misma visita. Copiar la marca del hogar al registro del equipo
   durante la visita rompería la independencia de la observación (RE-06, paso 8). Es una consecuencia
   técnica; el comité puede revertirla.
8. Códigos nuevos del equipo (diccionario v0.3 §7): `BOTE_TARA`, `BOTE_AGUA`, `BOTE_SEC_TARA`,
   `BOTE_SEC_AGUA`, `CONT_FORMA`, `CONT_LARGO`, `CONT_ANCHO`, `CONT_DIAM_SUP`, `CONT_DIAM_INF`,
   `CONT_ALTO`, `CONT_TARA`, `CONT_TARA_MET`, `RES_GUARDADO`, `PESO_MET`, `PESO_BRUTO`, los pares
   `DENS_SECO_*` y `DENS_PILA_*`, `LLEN_REF`, las muestras y la verificación de instrumentos.
9. El plan decía que el día 1 es una **videollamada**; D3 lo hace presencial. Ver §7, discrepancia 3.

**PROPUESTAS que abre (detalle en §6):**

- **P-01 · Ventana de la visita de cierre.** Recomendación: días **26 a 28** (−2 / +0), para que la
  visita nunca caiga después del último renglón de la Hoja 2. Reposición en los días 29–30 sólo si no
  hubo otra opción, anotando en la nota del día 28 lo que se echó después. Alternativas: ±2 días
  simétrico (26–30); ±3 días.
- **P-02 · Si el día 1 no es presencial en cada casa.** Recomendación: (a) visita breve del equipo a
  cada casa entre el día 0 y el día 1, sólo para dimensiones y tara, antes de la capa base.
  Alternativas: (b) tara medida por el hogar con báscula de baño, por diferencia (la persona se pesa
  sola y luego cargando la compostera vacía), con error de ± 0.5 kg o más que se declara; (c) sin
  tara: método geométrico al cierre para todos los hogares sin tara.
- **P-09 · Doble método.** Recomendación: aplicar también el método geométrico en las composteras
  que sí se pesan. Cuesta un bote más de material de la pila y da **cinco pares báscula ↔ geometría**
  para medir cuánto subestima la densidad suelta, que es justo lo que el Piloto 2 necesitará si no
  puede pesar.

**Archivos afectados.** Protocolo v0.2 §1, §2, §3, §6 · `registro-tecnico-equipo.md` · diccionario
v0.3 §7 · F-HOG rev. 03 Hojas 1 y 4 · hoja guía · `planes/plan_trabajo.md`.

**Estado.** Decidida. Ventana (P-01), alternativas del día 1 (P-02) y doble método (P-09):
**PROPUESTA**.

**Procedencia.** vatoLoko (1-oct-2026): opción C y la aclaración «pesaje: equipo en casa +
densidad». Contenido y orden de la visita: RE-06. Instrumentos: RE-05. Geometría: RE-04. Valor de
contraste EPA 2016: tal como lo cita el encargo. Retiro de `HUM_REF` y `VIS_SEM`, y `VIS_QUIEN` como
clave: este acta.

---

### D4 — Regla de multimarca: A, con corrección

**Regla anterior.** El protocolo v0.1 §5.3 recomendaba «registrar el rango (mínimo y máximo marcados)
y reportar el predominante sólo cuando se marque una sola casilla», sin distinguir tipos de escala.
El artefacto «Seis decisiones del piloto» **aplicaba ese rango a las ocho variables multirrespuesta**:
`HUM`, `OLOR`, `FAU`, `MEZ_AV`, `MEZ_TX`, `ACT`, `DPRE` y `SECO_DISP`.

**Por qué se corrige.** El mínimo y el máximo sólo existen si las opciones tienen un orden. En una
variable nominal el «rango» depende del número que se le asignó a cada código: «`F01`–`F09`» parece
decir que se vio todo lo que hay entre lombrices y cucarachas, y renumerar los códigos cambiaría el
resultado sin que cambie la composta. En `ACT` es todavía más claro: su numeración se conservó por
continuidad con v0.1, no por orden (diccionario v0.2 §4.3).

**Decisión.**

| Variable | Escala | Cómo se guarda | Cómo se grafica | Exclusiones |
| --- | --- | --- | --- | --- |
| `HUM` | **Ordinal** `H1` < … < `H5` | Una columna por opción + `HUM_MIN`, `HUM_MAX` | Rango por hogar; predominante sólo con una marca | — |
| `MEZ_AV` | **Ordinal** `M1` < `M2` < `M3` | Una columna por opción + `MEZ_AV_MIN`, `MEZ_AV_MAX` | Rango | — |
| `MEZ_TX` | **Nominal** (decidido aquí) | Multi-hot | Frecuencia de presencia | — |
| `OLOR` | Nominal | Multi-hot | Frecuencia de presencia | `O0` **no** excluye |
| `FAU` | Nominal | Multi-hot | Frecuencia de presencia | `F00` excluye `F01`–`F12` |
| `ACT` | Nominal | Multi-hot | Frecuencia de presencia | `A0` excluye `A1`–`A5` |
| `DPRE` | Nominal | Multi-hot | Frecuencia de presencia | — |
| `SECO_DISP` | Nominal | Multi-hot | Frecuencia de presencia | — |
| `FUGA_MOT` (nueva) | Nominal | Multi-hot | Frecuencia de presencia | `NA` si `FUGA` = 0 |
| `SECO_USO` (nueva) | Nominal | Multi-hot | Frecuencia de presencia | `ninguno` excluye a las demás |

**`MEZ_TX` es nominal.** «Suelta», «apelmazada» y «con bloques grandes» no están sobre un mismo eje:
`X2` describe compactación (agua y aire), `X3` describe tamaño de partícula. Una pila puede estar
apelmazada sin bloques o tener bloques y estar suelta, y ningún orden entre `X2` y `X3` tiene sentido
físico. El protocolo v0.1 §2.8 ya sospechaba que `X` duplica parte de `HUM`; tratarla como nominal
permite medir esa redundancia sin imponerle un orden.

**Consecuencias.** El diccionario v0.3 indica la regla variable por variable; la app guarda una
columna binaria por opción y calcula mín./máx. sólo para `HUM` y `MEZ_AV`; la tabla de
correspondencia lo dice en `regla_conversion`. Con el estado observado una vez (A-1), el rango de
`HUM` y `MEZ_AV` es de una sola observación por hogar; las nominales semanales (`FUGA_MOT`,
`SECO_USO`, `ACT`) se grafican como presencia por semana.

**Archivos afectados.** Diccionario v0.3 §4, §5, §6 · protocolo v0.2 §5 · tabla de correspondencia ·
especificación de la app.

**Estado.** Decidida, incluido `MEZ_TX` nominal.

**Procedencia.** vatoLoko (1-oct-2026): opción A con la corrección (rango sólo en ordinales).
Clasificación de `MEZ_TX`: este acta, por delegación del encargo («decide y documenta»).

---

### D5 — Privacidad y app: A

**Regla anterior.** La app exporta `responsable` en cada fila del CSV (hallazgo H-1) y captura
`tipo_residuo` como texto libre (H-2). El nombre «tabla de correspondencia» se usaba para dos objetos
(H-3). Papel y app eran dos registros primarios del mismo hecho (R-3). El plan pedía a diario el
«tipo principal de residuo».

**Decisión.**

- Se retiran `responsable` del CSV y `tipo_residuo` de la app.
- **La app es la herramienta de captura del coordinador; el papel es el registro.**
- El plan se corrige: desaparece «tipo principal de residuo».
- Nombres fijos: **«tabla de correspondencia»** para la de campos (se versiona en el repositorio) y
  **«lista de claves»** para la que une `H__` con un domicilio (**nunca entra al repositorio**).
- En esta entrega la app **sólo se especifica**, sin código (Fase 5).

**Consecuencias.** `tipo_residuo` aparece en la tabla de correspondencia como
`retirada_por_privacidad` y sin destino. El `README.md` describe la app actual con una advertencia:
mientras no se implemente la especificación, la versión publicada todavía tiene esos dos campos. El
diccionario v0.3 §10 incorpora los dos nombres.

**Archivos afectados.** `planes/plan_trabajo.md` · `README.md` · diccionario v0.3 §10 ·
`tabla-de-correspondencia-v0.1.md` · `especificacion-cambios-app.md`.

**Estado.** Decidida.

**Procedencia.** vatoLoko (1-oct-2026). Análisis: hallazgos H-1, H-2, H-3, R-3.

---

### D6 — Defectos del papel: A

**Regla anterior.** La revisión 03 §11 proponía una «revisión 04 del instrumento» que tocara el papel
una vez, y resolvía D-1 (`REG`) y D-5 (fracciones) sólo en el esquema.

**Decisión.** **Una sola reimpresión**, F-HOG rev. 03, que recoge:

- los cuatro defectos de la revisión 03 que tocan el papel: `LLEN_S` como **4 casillas cerradas**
  (D-2); **separación visible** entre avance y textura de la mezcla (D-3); `MASC` con **«durante el
  piloto»** (D-4); y las **casillas de día 0**: fecha de la primera carga (`D0_FECHA`), botes de la
  capa base (`D0_BASE`) y si arrancó vacío (`D0_VACIO`) (revisión 03 §2.4);
- las dos correcciones que la revisión 03 resolvía sólo en el esquema, ahora también en el papel:
  `REG` con «marca sólo una» (D-1) y la regla impresa «sólo enteros y medios» para `ORG`, `SEC` y
  `FUGA` (D-5);
- todo lo de este acta que toca el papel: fuga, material seco usado, día de parada, observador, cuello
  de botella, leyenda del 0, regla del día de depósito, nueva frase de la Hoja 1, maquetación de las
  Hojas 3 y 4, glosas y atributos `data-codigo` (RE-14).
- una corrección menor que este acta añade por estar en la misma hoja: el día del renglón semanal
  (`DREV`) se imprime «Lu Ma Mi Ju Vi Sá Do» en lugar de «L M M J V S D», porque las dos «M»
  circuladas no se distinguen al capturar (contraste §1.3.d).

**Consecuencias.** `FICHA_REV` = `03`. La rev. 02 se conserva como
`ficha/miltli-ficha-hogares-rev02.html`, sin cambios, para comparar. **La rev. 03 no se congela**
hasta cerrar lo que lista el §8.

**Archivos afectados.** `miltli-ficha-hogares.html` · `miltli-ficha-hogares-rev02.html` (copia) ·
diccionario v0.3 · `ficha/readme.md`.

**Estado.** Decidida.

**Procedencia.** vatoLoko (1-oct-2026). Defectos: revisión 03 §9 y §2.4.

---

## 3. Aclaraciones del mismo día

### A-1 — Estado mensual, entrada semanal

**Regla anterior.** `HUM`, `OLOR`, `FAU`, `MEZ` y `VAHO` se observaban cada semana en la Hoja 3, con
`REG`, `PERS_S`, `MIN_S`, `LLEN_S` y `ACT`.

**Decisión.**

- `HUM`, `OLOR`, `FAU`, `MEZ` (`MEZ_AV`, `MEZ_TX`) y `VAHO` se observan **una vez, el día 28, durante
  la visita de cierre**.
- **Cada semana queda un renglón corto de entrada y rutina:** `REG`, `FUGA` + `FUGA_MOT`, material
  seco usado (`SECO_USO`), `PERS_S`, `MIN_S`, `LLEN_S`.
- El objetivo de aprendizaje **D** (estado → acción → estado) **pasa al mes 2**.
- **Maquetación (decidida en este acta):** **Hoja 3 = renglón semanal S1–S4**, con `ACT` (si se
  aprueba P-04), el día de parada y la nota de cada semana; **Hoja 4 = revisión de estado del día 28 +
  cierre**. Razones: (1) todo lo que ocurre el día 28 queda en la misma hoja, que sigue en blanco los
  27 días anteriores, como pedía la revisión 02; (2) las Hojas 2 y 3 son exactamente lo que se entrega
  cada semana (E-3), y la Hoja 4 lo que se entrega en la visita; (3) la Hoja 3 deja de mezclar dos
  ritmos —rutina semanal y estado— que ahora tienen frecuencias distintas.

**PROPUESTA P-04 — `ACT` semanal.** Recomendación: **sí**, en la Hoja 3, porque `ACT` es rutina, no
estado, y recordarlo un mes entero es poco fiable. Alternativa: `ACT` una sola vez en la Hoja 4
(«¿qué hiciste durante el mes?»), con los mismos códigos. La rev. 03 imprime la recomendación; si el
comité elige la alternativa, el bloque se mueve de hoja sin cambiar códigos.

**Consecuencias.**

1. Observaciones de estado en el mes 1: **5** (una por hogar), contra 20 en la rev. 02. El objetivo
   **B** (reproducibilidad) se apoya en la hoja de concordancia (RE-12), no en las pilas.
2. El orden de la antigua revisión semanal (protocolo v0.1 §1.4) pasa a la visita del día 28 (RE-06).
   El renglón semanal ya no necesita hacerse «antes de echar nada».
3. `NOTA_S` sigue siendo semanal y la exigen `FG5`, `A4`, `A5` y `SECO_USO` = `otro`. Para `O5` y
   `F12`, que ahora se marcan el día 28, la nota es `NOTA_E` (nueva, Hoja 4).
4. El «diagnóstico obligatorio» de la semana 3 del plan y su revisión a mitad de semana se retiran:
   el hogar sigue mirando su composta para operarla (hoja guía), pero no la registra cada semana.
5. Pérdida asumida: un episodio de estado en las semanas 1–3 sólo deja rastro en las notas libres
   (`NOTA_D`, `NOTA_S`).

**Archivos afectados.** F-HOG rev. 03 Hojas 3 y 4 · diccionario v0.3 §4, §5 · protocolo v0.2 §1 ·
plan · `diseno-mes-2-composta-suelo-gei.md` (cadencia de estado del mes 2).

**Estado.** Decidida. `ACT` semanal: **PROPUESTA (P-04)**.

**Procedencia.** vatoLoko (1-oct-2026). Maquetación: este acta, por delegación («decide tú, con
justificación»).

### A-2 — Pesaje: equipo en casa + densidad

Decidida. Ver D3. **Procedencia:** vatoLoko (1-oct-2026).

### A-3 — Suelo de cada hogar, diseño pareado

**Regla anterior.** No existía ninguna previsión de suelo.

**Decisión.** El suelo es **el de cada hogar** (jardín o macetas), con **diseño pareado por hogar**:
con y sin composta, en dos parches contiguos o dos macetas iguales. La muestra de línea base se toma
**antes de cualquier aplicación**, a más tardar en la visita del día 28.

**Consecuencias.** Códigos `SUELO_TIPO`, `SUELO_CON`, `SUELO_PROF`, `SUELO_SUB`, `MUE_SUELO_P1_M`,
`MUE_SUELO_P2_M` (registro técnico). Muestras etiquetadas sólo con `H#`, sin coordenadas.

**PROPUESTAS:** **P-14** — qué parche recibe composta se decide **con un volado** en la visita y se
anota (`SUELO_CON`), para que la asignación no dependa de cuál «se ve mejor». **P-23** — si un hogar
no tiene jardín ni macetas (`SUELO_TIPO = sin_suelo`), el programa le entrega dos macetas iguales con
el mismo sustrato; alternativa: el hogar queda fuera del componente de suelo.

**Archivos afectados.** Registro técnico · diccionario v0.3 §7 · protocolo v0.2 §1.5, §2 ·
`diseno-mes-2-composta-suelo-gei.md` §4.3.

**Estado.** Decidida. P-14 y P-23: **PROPUESTA**. **Procedencia:** vatoLoko (1-oct-2026).

### A-4 — Glosas

**Regla anterior.** La Hoja 3 de la rev. 02 llevaba glosas en gris; cuatro prescribían una acción y
dos describían un descuido de la persona.

**Decisión.**

| Glosa en la rev. 02 | Casilla | Destino |
| --- | --- | --- |
| «removerla le devuelve aire» | `X2` apelmazada | **A la hoja guía** |
| «trocear más al echarlos» | `X3` con bloques | **A la hoja guía** |
| «se van al cubrirla con seco» | `F05` mosquitas | **A la hoja guía**; en la cuadrícula queda «fruta a la vista» |
| «más seco y remover suele resolverlo» | `H5` líquido en el fondo | **A la hoja guía** |
| «algo cocinado quedó sin cubrir» | `F07` moscas grandes | **Reescrita:** «hay restos cocinados expuestos en la superficie» |
| «algo quedó destapado y alguien vino» | `F11` huellas | **Reescrita:** «un animal más grande encontró acceso a la composta» |
| Las demás («la vida se frena y espera agua», «punto de esponja escurrida», etc.) | — | **Se quedan** |

Las dos reescrituras describen la composta, no a la persona. La redacción es de este acta.

**Archivos afectados.** F-HOG rev. 03 Hoja 4 · `hoja-guia.html`.

**Estado.** Decidida. **Procedencia:** vatoLoko (1-oct-2026); textos nuevos: este acta.

---

## 4. Encargos de la junta

### E-1 — Hoja de concordancia

Decidida: la redacta esta entrega (`ficha/hoja-concordancia.html`), con las tres fuentes de RE-12.
**Procedencia:** vatoLoko (1-oct-2026); contenido: RE-12.

### E-2 — Ayuda visual de fauna

Decidida: va dentro de la hoja guía. Rasgos diagnósticos **en texto** (tamaño, color, forma,
movimiento) y **huecos** para fotos propias del equipo o con licencia CC atribuida. No se copian
imágenes con derechos. **Procedencia:** vatoLoko (1-oct-2026); responde al pendiente del protocolo
v0.1 §5.5.

### E-3 — Canal de entrega — **PROPUESTA (P-06), decide el comité**

**Regla anterior.** Sin decidir (protocolo v0.1 §5.8, hallazgo H-4). La rev. 02 imprimía «al grupo
van sólo los números» y el plan pedía «compartir una fotografía y un resumen semanal con el grupo».

**Recomendación.** Todo va **sólo al coordinador, por mensaje privado**: una foto semanal de las
Hojas 2 y 3, con la ubicación de la cámara desactivada. El resto se fotografía en la visita del día
28. **Nunca a un chat de grupo:** cada hogar vería los números de los demás, que es el efecto de
comparación que el diseño evita.

**Alternativas.** (a) Entrega sólo en la visita del día 28 (menos carga, pero se pierde el aviso
temprano de un hogar que dejó de registrar). (b) Correo al coordinador (deja copia en un servidor de
terceros, igual que la mensajería).

**Consecuencia para el papel.** La rev. 03 imprime el texto de la recomendación («al coordinador, por
mensaje privado; al grupo sólo el resumen con todas las casas juntas»). **Si el comité decide otra
cosa, ese texto cambia antes de congelar.** Ver también P-11 (reuniones de comparación).

**Procedencia.** vatoLoko (1-oct-2026) la dejó como PROPUESTA con esta recomendación.

### E-4 — Observador

Decidida: casilla neutra **«esta revisión la hizo la misma persona de siempre: sí / no»**
(`OBS_MISMA`) en la revisión del día 28.

**PROPUESTA P-05 — también semanal (`OBS_MISMA_S`).** Recomendación: **no**. El renglón semanal
registra cantidades y rutina, que dependen poco de quién anota; el efecto del observador importa en
el estado, que ahora se observa una vez. El código queda reservado en el diccionario como «propuesto,
no impreso».

**Procedencia.** vatoLoko (1-oct-2026); antecedente: protocolo v0.1 §5.6.

---

## 5. Hallazgos de la revisión externa (RE-01 … RE-14)

Todos proceden de la **revisión externa con Claude del 1-oct-2026** y se integran por orden del
encargo. Donde un detalle no quedó decidido, se marca.

### RE-01 — Leyenda del 0

**Regla anterior.** La Hoja 2 decía «`0` = ese día no hubo residuo», pero el protocolo v0.1 §2.1
manda anotar el residuo **el día en que se echa**. Un día con residuo guardado quedaba descrito como
«no hubo residuo».

**Decisión.** Leyenda: **«`0` = hoy no agregué nada a la composta»**, y se imprime la regla del día
de depósito. El día 1 se orienta a **botes de ~1 L**, para que un día normal ocupe varias unidades y
el «½» sea una resolución fina.

**PROPUESTA P-03 — menos de ½ bote.** Recomendación: «si no llega a medio bote, guárdalo para el
siguiente depósito». Alternativas: anotarlo como ½ (sobreestima la entrada) o escribir «¼» (rompe la
regla de enteros y medios, D-5).

**Consecuencias.** `ORG` = botes **echados** ese día. El 0 dice que no hubo depósito, no que no hubo
residuo. Un bote de ~1 L cabe en la báscula de cocina de RE-05 para medir `BOTE_CAP` con agua.

**Archivos.** F-HOG rev. 03 Hoja 2 · protocolo v0.2 §2.1 · hoja guía · diccionario v0.3 §3.
**Estado.** Decidida; la regla de < ½ bote, **PROPUESTA (P-03)**.

### RE-02 — Regla del 80 %

**Regla anterior.** El plan decía «Si el contenedor alcanza aproximadamente el 80 %: dejar de
incorporar nuevos residuos», pero ni la ficha ni el protocolo lo recogían y nada registraba cuándo
ocurría (también lo señalaba la revisión 03 §4.1).

**Decisión.** La regla va en la hoja guía; se añade el campo **«dejé de agregar el día __»**
(`PARADA_DIA`, con la casilla «no hizo falta parar»). **Desde ese día, lo no depositado va a fuga con
el motivo «ya no cabía»** (`FG1`).

**Consecuencias.** Es probable que ocurra: una estimación gruesa, a verificar, sitúa a una compostera
de 60 L en el 80 % hacia la semana 3 (el protocolo v0.2 §3 deja la cuenta con supuestos rotulados).
Reglas de consistencia nuevas: `FG1` en una semana anterior a `PARADA_DIA` y `ORG` > 0 después de
`PARADA_DIA` se marcan (diccionario v0.3 §8). Los criterios #3 y #7 de D2 descuentan la parada.

**PROPUESTAS:** **P-08** — el día 1 el equipo marca por dentro de la compostera la **línea del 80 %**
(0.8 × `CONT_ALTO`), para que la regla se pueda cumplir sin calcular. **P-10** — durante el mes 1
**no se abre un segundo contenedor**: lo que no cabe va a fuga «ya no cabía»; el segundo lote es
decisión del mes 2 (el plan proponía «preparar un segundo contenedor»).

**Archivos.** Hoja guía · F-HOG rev. 03 Hoja 3 · protocolo v0.2 §2, §3 · diccionario v0.3 · plan.
**Estado.** Decidida; P-08 y P-10, **PROPUESTA**.

### RE-03 — Material seco usado

**Regla anterior.** `SECO_DISP` registra la disponibilidad el día 1; nada registraba qué entró cada
semana. Sin ese dato, la pregunta del plan «¿Qué material seco funcionó mejor?» no tiene respuesta y
`RAZON` no es comparable entre hogares (EPA 2016: hojas sueltas 0.15–0.30 kg/L, aserrín seco ≈ 0.16,
cartón aplanado ≈ 0.06).

**Decisión.** Renglón semanal `SECO_USO` con las opciones de `SECO_DISP` (`hojas` · `carton` ·
`papel` · `aserrin` · `otro`), nominal y multi-hot, y el **par de densidad del seco** al cierre
(`DENS_SECO_*`, con el tipo de material en `DENS_SECO_TIPO`).

**PROPUESTA P-21 — opción `ninguno`** («no usé material seco esta semana»), con regla de exclusión
como `F00` y `A0`, para que «no usé» no se confunda con «no contesté». Alternativa: sin esa opción,
y el vacío se lee como `NC`.

**Consecuencias.** «¿Qué seco funcionó mejor?» se responde **de forma descriptiva**: cinco hogares,
materiales mezclados y un solo par de densidad del seco por hogar no permiten atribuir resultados a un
material. La razón seco/orgánico en masa es exploratoria.

**Archivos.** F-HOG rev. 03 Hoja 3 · registro técnico · diccionario v0.3 §4, §7. **Estado.**
Decidida; `ninguno`, **PROPUESTA (P-21)**.

### RE-04 — Geometría del contenedor

**Regla anterior.** `CONT_CAP` es declarado o «no sé», y los cuartos de llenado son gruesos.

**Decisión.** Día 1: **dimensiones internas** (`CONT_FORMA`, `CONT_LARGO`, `CONT_ANCHO`,
`CONT_DIAM_SUP`, `CONT_DIAM_INF`, `CONT_ALTO`). Día 28: **altura de llenado** con regla (`LLEN_REF`),
que forma el par percepción–medición con `LLEN_F` y da la **reducción de volumen** frente a la
entrada acumulada (`RED_VOL`).

**Consecuencias.** `CONT_CAP` declarado se conserva como contraste del volumen geométrico
(`CONT_VOL`). La reducción de volumen mezcla asentamiento y descomposición; no se lee como
descomposición pura.

**Archivos.** Registro técnico · diccionario v0.3 §7, §9 · protocolo v0.2 §2. **Estado.** Decidida.

### RE-05 — Instrumentos

**Decisión.** Se especifican y se verifican:

- **Báscula para la compostera llena:** capacidad ≥ `CONT_CAP` × 0.8 × ~0.7 kg/L (**el 0.7 es un
  supuesto**), resolución ≤ 0.1 kg. La compostera se levanta entre dos personas.
- **Báscula de cocina para los botes:** ≥ 5 kg, resolución 1 g.
- **Termómetro de sonda:** vástago ≥ 15 cm y exactitud declarada. **No se registran décimas si el
  instrumento no las muestra.**
- **Comprobación previa** cada día de medición: termómetro en agua con hielo (0 °C) y báscula con
  1 L de agua de volumen conocido (`VER_*`).

**Consecuencias.** `TEMP_I` cambia de «°C, un decimal» a «°C, con la resolución del instrumento».
Para una compostera de 150 L, la báscula debe llegar a ~84 kg más la tara. **Archivos.** Registro
técnico · protocolo v0.2 §2 · diccionario v0.3 §7. **Estado.** Decidida.

### RE-06 — Visita del día 28

**Regla anterior.** Protocolo v0.1 §1.5: «el hogar no prepara nada»; temperatura antes de abrir del
todo; pesaje pareado del bote; foto; devolver material.

**Decisión.** Al hogar se le pide **una sola preparación: guardar sin depositar los residuos del día
hasta que llegue el equipo**. Sin eso no hay par DENS de entrada. Orden: 1 abrir · 2 `VAHO` (ambos
observadores) · 3 oler una vez (ambos) · 4 `TEMP_I` · 5 mirar la superficie (`FAU`) · 6 remover
(`FAU`, `MEZ`) · 7 apretar (`HUM`) · 8 marcar por separado y sin hablar · 9 pesaje · 10 pares DENS ·
11 altura de llenado · 12 foto · 13 muestras · 14 cerrar. **Se registra la masa de toda muestra
extraída.**

**Consecuencias.** La altura se mide después de remover, con la superficie nivelada a mano sin
apretar; el removido puede dejar la pila más alta que en reposo, y así se declara. El residuo del par
DENS se deposita después del pesaje y se anota en el renglón del día 28; el balance de masa lo
excluye. Código nuevo `RES_GUARDADO` para el caso «no hubo residuos guardados».

**Archivos.** Protocolo v0.2 §1.5 · registro técnico · hoja guía · F-HOG rev. 03 Hojas 1, 2 y 4.
**Estado.** Decidida.

### RE-07 — Bitácora del programa

**Regla anterior.** `ACT` registra lo que hizo el hogar; nada registraba lo que hizo el programa.

**Decisión.** Plantilla del coordinador: fecha · hogar (`H#` o «todos») · tipo · contenido sin datos
personales · quién (rol). Tipos: recordatorios, consejos, reuniones de comparación, entregas de
material seco, cambios de protocolo y eventos no planeados (el ejemplo de RE-07: un acopio espontáneo
de residuos de café que se enmoheció y terminó en una composta casera sin decisión del programa).
**Empieza el día 1. En el repositorio va sólo la plantilla**; los registros viven donde vivan los
datos.

**Archivos.** `plantilla-bitacora-programa.md` · diccionario v0.3 §7.4. **Estado.** Decidida.

### RE-08 — Doble papel

**Regla anterior.** Ningún documento distinguía a los hogares del equipo.

**Hecho de partida corregido.** RE-08 hablaba de **uno** de los hogares. **Respuesta del 2-oct-2026:
son tres hogares del equipo** (coincide con el anexo v0.1: «3 miembros del equipo y 2 voluntarios»).
Uno de ellos es el de quien diseñó el instrumento y lo analizará; los otros dos hogares del piloto son
conocidos del equipo.

**Decisión.** Los hogares del equipo:

- se marcan como **estrato propio en la capa de análisis** (`ESTRATO_EQ`), **nunca** en el papel ni en
  documentos públicos, y sin decir qué `H#` son;
- **se excluyen de las pruebas de concordancia y de legibilidad** (como observadores ingenuos);
- su **visita de cierre la hace otra persona**.

**Consecuencias.** Con tres de cinco hogares fuera, la concordancia sobre pilas reales del día 28
deja **dos pares** útiles: el peso del objetivo B recae en las estaciones y el panel de fotos (RE-12).
**P-13:** ampliar el panel de fotos con evaluadores externos que no hayan visto el instrumento. Los
estratos (3 y 2) se usan sólo dentro del equipo; lo publicado va agregado sobre los cinco. El sesgo
de quien analiza su propio hogar se mitiga con el pre-registro (RE-11).

**Archivos.** Diccionario v0.3 §7.5 · protocolo v0.2 §3, §6, §7 · hoja de concordancia. **Estado.**
Decidida; P-13, **PROPUESTA**.

### RE-09 — Reactividad de la medición

**Decisión.** Nota de análisis: medir el desperdicio de alimentos lo reduce por sí solo (Ramos et al.
2024, *British Food Journal* 126(2):812–833). **Una tendencia descendente de la entrada no se
interpreta sin más como fatiga o sub-registro.** **Archivos.** Diccionario v0.3 §9 · protocolo v0.2
§5 · `diseno-mes-2-composta-suelo-gei.md`. **Estado.** Decidida.

### RE-10 — Versionado

**Regla anterior.** La serie `revision-NN` servía a la vez para los documentos de decisión y para el
papel. La revisión 03 no cambió casillas pero ocupó el número 03, y su §11 llamaba «revisión 04 del
instrumento» a la reimpresión y «rev. 03» al sello.

**Decisión.** El papel pasa de **F-HOG rev. 02 a F-HOG rev. 03**, no a «revisión 04». Regla única:
**el papel tiene su propia serie y `FICHA_REV` registra sólo esa serie.** Los documentos de análisis y
decisión usan otro prefijo; este encargo produce `acta-01`. El nombre `revision-NN` queda cerrado en
03 para no confundirlo con la serie del papel.

**Consecuencias.** Se corrigen las menciones a «revisión 04 del papel»: `ficha/readme.md` (paso 5) y
la revisión 03 §11, donde se añade una nota de corrección sin borrar el texto original (el documento es
un registro de decisión con su fecha). El protocolo v0.1 §1.1 ya decía «revisión 03 de la ficha»; el
v0.2 dice «F-HOG rev. 03».

**Archivos.** `ficha/readme.md` · `revision-03-…md` (nota) · protocolo v0.2 · diccionario v0.3.
**Estado.** Decidida.

### RE-11 — Decisiones pre-registradas

**Decisión.** Igual que la regla de multimarca, las decisiones hacia el Piloto 2 se escriben **antes
de ver datos**: tabla indicador → umbral → cambio en el Piloto 2, con **verde (sigue), ámbar (ajusta)
y rojo (detiene)** (Avery et al. 2017, *BMJ Open* 7:e013537), y **una predicción escrita por fila**
(Taylor et al. 2014, *BMJ Qual Saf* 23:290–298: sólo 4 de 47 reportes PDSA escribieron una
predicción). Como el sitio es público y los hogares podrían leerlo, **el contenido se guarda fuera del
repositorio** (`.gitignore`) y en el repositorio se versiona **sólo su hash SHA-256 con fecha**; se
revela después del cierre.

**PROPUESTA P-17:** los umbrales y las predicciones de esa tabla. El sello que se versiona ahora es el
del borrador; **vale como pre-registro sólo el último sello anterior al día 1**, después de que el
comité revise la tabla.

**Archivos.** `ficha/preregistro/` · `.gitignore` · `diseno-mes-2-composta-suelo-gei.md` §4.5.
**Estado.** Decidida; umbrales y predicciones, **PROPUESTA (P-17)**.

### RE-12 — Concordancia (objetivo B)

**Regla anterior.** Protocolo v0.1 §7.2: «dos personas describen la misma composta por separado», sin
hoja ni fecha (revisión 03 §2.5). Con ≤ 5 pilas son ~5 pares; con RE-08, dos.

**Decisión.** La hoja combina tres fuentes: **estaciones** en la capacitación del día 1 (4–5 cubetas
preparadas con estados de humedad conocidos, que todos marcan por separado); un **panel de 15–20
fotos** de interior de cualquier pila aerobia, para `FAU` y `MEZ`; y la **observación simultánea e
independiente del día 28**. Se reportan **acuerdo bruto y tablas de confusión**; kappa sólo como dato
secundario, porque se comporta mal cuando domina una categoría (Feinstein & Cicchetti 1990, *J Clin
Epidemiol* 43:543–549). **Se define de antemano qué cambio se aplica si una variable falla** (p. ej.
agrupar `FAU` en los 4–5 grupos que el protocolo ya anticipa), para que la prueba no retrase el
arranque.

**PROPUESTA P-12:** los umbrales de acuerdo y la regla de cambio de cada variable (protocolo v0.2
§7.2 y hoja de concordancia).

**Archivos.** `hoja-concordancia.html` · protocolo v0.2 §7 · diccionario v0.3 §7.3. **Estado.**
Decidida; umbrales, **PROPUESTA (P-12)**.

### RE-13 — Simulador / modelo de residuos

**Regla anterior.** Se planeaba que este registro diera al simulador pesos y composición medidos. (El
simulador no está documentado en el repositorio: §7, discrepancia 6.)

**Decisión registrada.** El registro da **entrada en L/persona/semana, fuga y un factor kg/L de 5
pares, y nada de composición** (diccionario §7.2 de v0.2, §10.2 de v0.3). **La composición del
simulador saldrá de estudios de caracterización publicados.**

**Estado.** Decidida. **Procedencia:** RE-13; el encargo pide registrarlo como decisión.

### RE-14 — Puente de captura

**Decisión.** Cada casilla del HTML lleva `data-codigo` (y `data-valor` donde aplica), sin
imprimirse. La cobertura casilla ↔ código se verifica con un script (`tests/ficha-cobertura.test.js`)
y la captura no depende de la posición. Los 28 renglones de la Hoja 2 pasan a ser HTML estático, para
que el script los lea sin ejecutar JavaScript.

**Archivos.** `miltli-ficha-hogares.html` · `hoja-concordancia.html` · `tests/`. **Estado.**
Decidida.

---

## 6. PROPUESTAS abiertas — decide el comité

| ID | Tema | Recomendación | Alternativas | Bloquea congelar |
| --- | --- | --- | --- | --- |
| P-01 | Ventana de la visita de cierre | Días 26–28 (−2 / +0); reposición 29–30 con nota | ±2 simétrico; ±3 | **Sí** (calendario) |
| P-02 | Día 1 no presencial en cada casa | (a) visita breve a cada casa en día 0–1 para dimensiones y tara | (b) tara con báscula de baño por el hogar; (c) sólo método geométrico | **Sí** (Hoja 1) |
| P-03 | Menos de ½ bote | Guardarlo para el siguiente depósito | Anotar ½; escribir ¼ | Sí (Hoja 2) |
| P-04 | `ACT` semanal | Sí, en la Hoja 3 | Una vez, en la Hoja 4 | Sí (maquetación) |
| P-05 | Observador semanal (`OBS_MISMA_S`) | No | Sí, en la Hoja 3 | No |
| P-06 | Canal de entrega | Foto semanal de Hojas 2–3 al coordinador por mensaje privado, sin ubicación; nunca al grupo | Sólo en la visita; correo | **Sí** (texto de Hojas 1 y 4) |
| P-07a | Umbrales nuevos de D2 | Los de la tabla de D2 | Otros valores | No (análisis) |
| P-07b | «5 de 7» con #1 obligatorio | Sí | «5 de 7» sin condición | No |
| P-08 | Línea del 80 % dentro de la compostera | Sí, el día 1 | Sólo la regla en la hoja guía | No |
| P-09 | Doble método (báscula + geometría) | Sí, en todas las que se pesan | Geometría sólo cuando no se puede pesar | No |
| P-10 | Segundo contenedor en el mes 1 | No; fuga «ya no cabía» | Permitirlo y registrarlo aparte | No |
| P-11 | Reuniones de comparación del plan | Se mantienen sobre el procedimiento, sin mostrar números por hogar; se anotan en la bitácora | Mantenerlas como están; suprimirlas | No |
| P-12 | Umbrales de concordancia y cambio preespecificado | Los del protocolo v0.2 §7.2 | Otros valores | **Sí** (antes del día 1) |
| P-13 | Evaluadores externos para el panel de fotos | Sí, para ampliar n | Sólo participantes | No |
| P-14 | Asignación del parche con composta | Volado en la visita | Elección del hogar | No |
| P-15 | Criterio de madurez para aplicar al suelo | Ver `diseno-mes-2…` §4.2 | — | No (mes 2) |
| P-16 | Cadencia de estado en el mes 2 | Ver `diseno-mes-2…` §4.2 | — | No (mes 2) |
| P-17 | Umbrales y predicciones del Piloto 2 | Ver el contenido sellado | — | Sí (sello antes del día 1) |
| P-18 | Dónde se registra el costo | Una pregunta de cierre o la bitácora | No registrarlo | No |
| P-21 | Opción `ninguno` en `SECO_USO` | Sí | Sin opción; vacío = `NC` | Sí (Hoja 3) |
| P-22 | `CUELLO` como pregunta de cierre | Sí | Derivar el #5 de campos existentes | Sí (Hoja 4) |
| P-23 | Hogar sin jardín ni macetas | El programa entrega dos macetas iguales | Fuera del componente de suelo | No |

(P-19 y P-20 no se usan: se resolvieron como consecuencias técnicas de D3 —retiro de `HUM_REF` y
`VIS_QUIEN` como clave— y quedan anotadas allí.)

---

## 7. Discrepancias entre el encargo y el repositorio

Por la regla 5 del encargo, **manda el repositorio**; aquí se anotan y se sigue.

1. **Rama.** El encargo sugiere `ficha-rev03` creada desde la rama que publica `ficha/`. La sesión
   obliga a trabajar en `claude/new-session-pe41c4`, que parte del mismo commit que
   `claude/unify-ficha-branches-xjgdwx` (revisión 03). `main` no contiene la revisión 03.
2. **Hogares del equipo.** RE-08 dice «uno»; el anexo v0.1 dice tres. Respuesta del 2-oct-2026: tres.
3. **Día 1.** El plan lo describe como **videollamada**; D3 y RE-12 (estaciones con cubetas) lo
   necesitan **presencial**. Se aplica D3 y se abre P-02.
4. **Comparación entre hogares.** La rev. 02 promete «al grupo van sólo los números» y el plan pide
   compartir foto y resumen con el grupo y una «comparación grupal» semanal; el encargo describe un
   diseño que **evita** el efecto de comparación. Nada en el repositorio lo decía. Se registra como
   P-06 y P-11.
5. **Conteo de variables.** La revisión 03 cita «67 variables» del diccionario v0.2; el recuento
   mecánico de v0.2 da **68** (la diferencia es `FICHA_REV`, que la propia revisión 03 dio de alta).
6. **Simulador.** RE-13 habla de un simulador o modelo de residuos que **no aparece en ningún archivo**
   del repositorio. Se registra la decisión igualmente.
7. **Artefacto «Seis decisiones del piloto».** No está en el repositorio; se trabajó con su
   descripción en el encargo (§0.1).

---

## 8. Qué falta para congelar F-HOG rev. 03

1. Que el comité resuelva las PROPUESTAS marcadas «Sí» en la última columna del §6: **P-01, P-02,
   P-03, P-04, P-06, P-12, P-17, P-21 y P-22**.
2. Fijar fechas y claves de equipo del calendario (protocolo v0.2 §6), hoy `[por definir]`.
3. Ejecutar las pruebas de usabilidad del protocolo v0.2 §7 con los dos hogares voluntarios y
   evaluadores externos (los hogares del equipo quedan fuera, RE-08).
4. Pasar la verificación de impresión y de cobertura (`npm test`) sobre la versión final.
5. Volver a sellar la tabla de decisiones del Piloto 2 (RE-11) con los umbrales que apruebe el comité.
