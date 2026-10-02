# Registro técnico del equipo — día 1 y visita de cierre

> **Versión v0.3 · borrador · octubre de 2026.** Va con `diccionario-de-datos-v0.3-borrador.md` §7 y
> `protocolo-operativo-v0.2-borrador.md` §1.3, §1.6 y §2.19–§2.25. Aplica la decisión D3 de
> `acta-01-decisiones-piloto.md`: **no hay visitas en S2 ni S4**; hay una **medición del día 1** y una
> **visita de cierre el día 28**. Las fechas del calendario siguen `[por definir]` (protocolo v0.2 §6).

## Cambios de versión

| Versión | Fecha | Qué cambió | Origen |
| --- | --- | --- | --- |
| v0.2 | septiembre de 2026 | Primera versión: pesaje pareado y temperatura, «dos visitas en el mes» | Revisión 02 |
| **v0.3** | **octubre de 2026** | Dos formularios —**día 1** y **día 28**— en lugar de una hoja por visita semanal. Nuevos: capacidad del bote por masa de agua, dimensiones y tara del contenedor, pesaje de la compostera, pares de densidad de seco y de pila, altura de llenado, muestras para el mes 2 y verificación de instrumentos. `VIS_SEM` sustituido por `VIS_TIPO`; `HUM_REF` retirado; `VIS_QUIEN` pasa a clave de equipo; `TEMP_I` con la resolución del instrumento | acta-01: D3, RE-03, RE-04, RE-05, RE-06, A-3 |

Este registro es el **segundo nivel de medición** de la decisión arquitectónica #3: lo llena el
equipo que coordina, no el hogar.

## Por qué está separado de la ficha del hogar

| | Ficha del hogar (F-HOG rev. 03) | Este registro |
| --- | --- | --- |
| Quién llena | La casa | El equipo |
| Frecuencia | Diaria, semanal y día 28 | **Día 1** (medición del sistema) y **día 28** (visita de cierre) |
| Instrumentos | Ninguno; un bote de medida | Báscula de cocina, báscula de plataforma, termómetro de sonda, regla o cinta |
| Dónde vive el papel | Se queda en la casa | Lo conserva el equipo |
| Identificador | Clave `H__` | La **misma** clave `H__` |

## Reglas de privacidad de este registro

Son las mismas que las de la ficha del hogar, y aplican aunque este papel no salga del equipo:

- **Sin nombres, sin direcciones, sin teléfonos.** Sólo la clave `H__`. Quién del equipo fue se anota
  con su **clave de equipo** (`E1`, `E2`, `E3`), no con su nombre. La dirección para llegar vive en la
  agenda de la coordinación, no aquí.
- **No se describe el contenido de nada de lo que se pesa.** Se anota masa y volumen; no de qué está
  hecho. El material seco se nombra por su tipo (hojas, cartón…), que no es un alimento.
- **Nadie del equipo visita su propia casa.** Este registro no dice qué hogar es de quién; la
  coordinación lo comprueba fuera de él.
- **Fotografías:** sólo el interior del contenedor —o el suelo muestreado—, sin personas, fachadas ni
  placas, con la ubicación de la cámara **desactivada**.
- **Muestras:** etiqueta sólo con `H#` y el sufijo de tipo (`H#-C0`, `H#-S-P1-0`, `H#-S-P2-0`). **Sin
  coordenadas** ni descripción del lugar.
- **Un campo vacío del equipo es un error de captura.** Lo que no se pudo medir se escribe `ND` y la
  razón va en la nota técnica; lo que no corresponde, `NA` (diccionario v0.3 §1.6).
- Si este registro se digitaliza, va al mismo destino y con las mismas restricciones que los datos del
  hogar.

## Instrumentos

| Instrumento | Especificación mínima | Para qué |
| --- | --- | --- |
| Báscula de cocina | ≥ 5 kg, resolución 1 g | Bote de medida (día 1) y pares de densidad (día 28) |
| Báscula de plataforma | Capacidad ≥ `CONT_CAP` × 0.8 × ~0.7 kg/L **(el 0.7 es un supuesto)** más la tara; resolución ≤ 0.1 kg. Para 150 L: ~84 kg + tara | Tara del contenedor (día 1) y compostera llena (día 28). Se levanta entre dos personas |
| Termómetro de sonda | Vástago ≥ 15 cm; exactitud declarada | `TEMP_I` y `TEMP_AMB`. **No se anotan décimas si el instrumento no las muestra** |
| Regla o cinta rígida | Graduada en mm | Dimensiones internas y altura de llenado |
| Recipiente calibrado de 0.5 L | — | Par de entrada cuando el residuo guardado no llena el bote |
| Jarra graduada de 1 L y garrafón de volumen conocido | — | Verificación de las básculas |

## Verificación de instrumentos — cada día de medición, antes de la primera casa

| Campo | Código | Valor |
| --- | --- | --- |
| Fecha | `VER_FECHA` | ____ / ____ / 2026 |
| Instrumento | `VER_INSTR` | termómetro · báscula de cocina · báscula de plataforma |
| Referencia | `VER_REF` | 0 °C (agua con hielo) · 1000 g (1 L de agua) · ____ kg (garrafón) |
| Lectura | `VER_LECT` | ________ |
| Dentro de la tolerancia | `VER_OK` | sí · no |

Tolerancias: termómetro, 0 °C ± la exactitud declarada (± 1 °C si no la declara); báscula de cocina,
1000 g ± 10 g; báscula de plataforma, ± 1 %. Un instrumento que no pasa no se usa ese día.

---

## Formulario A — Día 1: medición del sistema

Orden fijado en el protocolo v0.2 §1.3. **La tara va antes de la capa base; las dimensiones, antes de
poner nada dentro.**

| Campo | Código | Valor |
| --- | --- | --- |
| Hogar | `ID` | H___ |
| Tipo de visita | `VIS_TIPO` | **día 1** |
| Fecha | `VIS_FECHA` | ____ / ____ / 2026 |
| Hora | `VIS_HORA` | ____ : ____ |
| Quién del equipo (clave) | `VIS_QUIEN` | E___ |
| ¿Se pudo hacer? | `VIS_OK` | sí · repuesta dentro de la ventana · no se pudo |
| **Bote de medida vacío** | `BOTE_TARA` | ________ g |
| **Bote lleno de agua hasta el borde** | `BOTE_AGUA` | ________ g |
| Capacidad del bote = (agua − tara) / 1000 · **se copia en la Hoja 1** | `BOTE_CAP` | ________ L |
| Recipiente del seco vacío (si es otro) | `BOTE_SEC_TARA` | ________ g · NA |
| Recipiente del seco lleno de agua | `BOTE_SEC_AGUA` | ________ g · NA |
| Capacidad del recipiente del seco · se copia en la Hoja 1 | `BOTE_SEC_CAP` | ________ L · NA |
| Forma interior del contenedor | `CONT_FORMA` | rectangular · cilíndrica · cubeta (más ancha arriba) · otra |
| Largo interior (rectangular) | `CONT_LARGO` | ________ cm · NA |
| Ancho interior (rectangular) | `CONT_ANCHO` | ________ cm · NA |
| Diámetro interior en la boca | `CONT_DIAM_SUP` | ________ cm · NA |
| Diámetro interior en el fondo | `CONT_DIAM_INF` | ________ cm · NA |
| Altura interior útil, del fondo (o del suelo) al borde | `CONT_ALTO` | ________ cm |
| Contenedor vacío, con tapa | `CONT_TARA` | ________ kg · NA |
| Cómo se obtuvo la tara | `CONT_TARA_MET` | báscula del equipo · báscula de baño del hogar · no se tomó (sin fondo o sin visita) |
| Foto del sistema vacío | `FOTO_EQ` | sí · no |
| Nota técnica | `VIS_NOTA` | sólo sobre la medición o el contenedor |

**PROPUESTA P-08:** marcar por dentro la línea del 80 % a 0.8 × `CONT_ALTO` = ______ cm.

---

## Formulario B — Día 28: visita de cierre

Orden fijado en el protocolo v0.2 §1.6 (RE-06). **El hogar guardó los residuos del día sin echarlos.**
La observación de estado del equipo (pasos 2–8) **no va en este formulario**: va en la Parte C de
`hoja-concordancia.html`, marcada por separado y sin hablar con el hogar.

| Campo | Código | Valor |
| --- | --- | --- |
| Hogar | `ID` | H___ |
| Tipo de visita | `VIS_TIPO` | **cierre** |
| Fecha | `VIS_FECHA` | ____ / ____ / 2026 |
| Quién del equipo (clave) — **no vive en este hogar** | `VIS_QUIEN` | E___ |
| ¿Se pudo hacer? | `VIS_OK` | sí · repuesta dentro de la ventana · no se pudo |
| ¿El hogar guardó los residuos del día? | `RES_GUARDADO` | sí · no · ese día no hubo residuo |
| *Paso 4* · **Temperatura del montón** | `TEMP_I` | ________ °C (resolución del instrumento) |
| *Paso 4* · Hora de esa lectura | `VIS_HORA` | ____ : ____ |
| *Paso 4* · Temperatura ambiente a la sombra | `TEMP_AMB` | ________ °C |
| *Paso 4* · Profundidad de la sonda | `TEMP_PROF` | ________ cm (referencia: 15) |
| *Paso 9* · Método de la masa de la pila | `PESO_MET` | báscula · geométrico · ambos |
| *Paso 9* · **Compostera completa, con tapa** | `PESO_BRUTO` | ________ kg · NA |
| *Paso 10* · Residuo del día: volumen del bote lleno | `DENS_V` | ________ L |
| *Paso 10* · Residuo del día: masa sin tara | `DENS_M` | ________ g |
| *Paso 10* · Residuo del día: tara del bote | `DENS_T` | ________ g |
| *Paso 10* · Material seco principal de la semana | `DENS_SECO_TIPO` | hojas · cartón · papel · aserrín · otro |
| *Paso 10* · Seco: volumen | `DENS_SECO_V` | ________ L |
| *Paso 10* · Seco: masa sin tara | `DENS_SECO_M` | ________ g |
| *Paso 10* · Seco: tara | `DENS_SECO_T` | ________ g |
| *Paso 10* · Pila: volumen (si geométrico o ambos) | `DENS_PILA_V` | ________ L · NA |
| *Paso 10* · Pila: masa sin tara | `DENS_PILA_M` | ________ g · NA |
| *Paso 10* · Pila: tara | `DENS_PILA_T` | ________ g · NA |
| *Paso 11* · **Altura de llenado** = altura interior − promedio de 5 lecturas de borde a superficie (`__ __ __ __ __` cm) | `LLEN_REF` | ________ cm |
| *Paso 12* · Foto del interior | `FOTO_EQ` | sí · no |
| *Paso 13* · Muestra de composta `H#-C0`: masa extraída | `MUE_COMP_M` | ________ g · NA |
| *Paso 13* · Suelo disponible | `SUELO_TIPO` | jardín · macetas · sin suelo |
| *Paso 13* · Parche que recibirá composta (volado) | `SUELO_CON` | P1 · P2 · NA |
| *Paso 13* · Profundidad de muestreo | `SUELO_PROF` | ________ cm · NA |
| *Paso 13* · Submuestras por muestra compuesta | `SUELO_SUB` | ________ · NA |
| *Paso 13* · Muestra `H#-S-P1-0`: masa | `MUE_SUELO_P1_M` | ________ g · NA |
| *Paso 13* · Muestra `H#-S-P2-0`: masa | `MUE_SUELO_P2_M` | ________ g · NA |
| Nota técnica | `VIS_NOTA` | sólo sobre la medición, el contenedor o las muestras |

Al cerrar (paso 14): el material de la pila usado para la densidad vuelve a la pila; la muestra de
composta no. El hogar echa el residuo guardado con su seco **después** del pesaje y lo anota en el
renglón 28 de su Hoja 2.

---

## Cómo se usan estos datos

- **`TEMP_I` + la Hoja 4 del hogar en la misma visita** → la relación entre lo que describe la casa y
  lo que mide un instrumento (objetivo **E**). Son **cinco lecturas**, una por hogar: alcanza para una
  lectura exploratoria, no para validar nada. Conviene decirlo al presentar resultados.
- **Pares de densidad** → conversión de litros a kilos, **exploratoria**: cinco pares de entrada, cinco
  de seco y, si se aplica la geometría, cinco de pila, todos en un solo momento. Se reportan como rango
  y se contrastan con EPA 2016 (residuo de alimentos suelto ≈ 0.27 kg/L; hojas sueltas 0.15–0.30;
  aserrín ≈ 0.16; cartón aplanado ≈ 0.06). El dato primario de volumen **no se convierte
  automáticamente a masa** (decisión #4).
- **`PESO_BRUTO` − `CONT_TARA`** → masa de la pila al día 28, para el balance y para el mes 2. Con el
  método geométrico es una **cota inferior**: la densidad de una muestra suelta subestima la densidad
  in situ.
- **`LLEN_REF`** → par percepción–medición con `LLEN_F` del hogar, y reducción de volumen frente a lo
  que entró (`RED_VOL`).
- **Muestras** → línea base del mes 2 (`diseno-mes-2-composta-suelo-gei.md`).
