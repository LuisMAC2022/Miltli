# Registro técnico del equipo — pesaje y temperatura

> **Borrador.** Depende de que el comité valide `protocolo-operativo-v0.1-borrador.md` §2.10 y fije
> el calendario de su §6.

Este registro es el **segundo nivel de medición** de la decisión arquitectónica #3. Existe porque la
toma de temperatura y el pesaje **salieron de la ficha del hogar** en la revisión 02: las hace el
equipo que coordina la actividad, no el voluntario.

## Por qué está separado de la ficha del hogar

| | Ficha del hogar | Este registro |
| --- | --- | --- |
| Quién llena | La casa | El equipo |
| Frecuencia | Diaria y semanal | Dos visitas en el mes (las que fije el comité) |
| Instrumentos | Ninguno; un bote de medida | Termómetro de sonda y báscula |
| Dónde vive el papel | Se queda en la casa | Lo conserva el equipo |
| Identificador | Clave `H__` | La **misma** clave `H__` |

El voluntario no debe convertirse en técnico de laboratorio. Que estas dos medidas vivan aquí es lo
que permite a la Hoja 3 del hogar quedarse en descripciones que cualquier persona puede hacer sin
instrumentos, y lo que le da al objetivo de aprendizaje **E** —¿qué relación hay entre lo que la casa
percibe y lo que mide un instrumento?— un lugar donde ocurrir.

## Reglas de privacidad de este registro

Son las mismas que las de la ficha del hogar, y aplican aunque este papel no salga del equipo:

- **Sin nombres, sin direcciones, sin teléfonos.** Sólo la clave `H__`. La dirección para llegar a la
  visita vive en la agenda de la persona coordinadora, no aquí.
- **No se describe el contenido del bote que se pesa.** Se anota masa y volumen; no de qué está
  hecho. Un registro de composición del residuo es un registro dietético del hogar, y eso está fuera
  del piloto por decisión explícita (revisión 01, §6.a).
- **Las fotografías siguen la misma regla de encuadre** que las del hogar: sólo el interior del
  contenedor, sin personas, sin fachadas, sin placas, con la ubicación de la cámara desactivada.
- Si este registro se digitaliza, va al mismo destino y con las mismas restricciones que los datos del
  hogar; no a una hoja aparte «del equipo» con reglas más laxas.

## Orden de la visita

Fijado en `protocolo-operativo-v0.1-borrador.md` §1.5. El orden importa: la temperatura se toma antes
de mover nada, y el pesaje después, porque obliga a sacar material.

1. Temperatura instrumental, sin remover.
2. Anotar qué casilla marcó el hogar esa semana en su Hoja 3.
3. Pesaje pareado masa + volumen, con el gesto de llenado del hogar.
4. Foto del interior.
5. Devolver el material y cubrir con seco.

## Hoja de registro — una por visita

| Campo | Código | Valor |
| --- | --- | --- |
| Hogar | `ID` | H___ |
| Fecha de la visita | `VIS_FECHA` | ____ / ____ / 2026 |
| Hora | `VIS_HORA` | ____ : ____ |
| Quién del equipo | `VIS_QUIEN` | ____________ |
| Semana del piloto | `VIS_SEM` | S1 · S2 · S3 · S4 |
| **Temperatura del montón** | `TEMP_I` | ________ °C |
| Temperatura ambiente a la sombra | `TEMP_AMB` | ________ °C |
| Profundidad de la sonda | `TEMP_PROF` | ________ cm (referencia: 15) |
| Casilla de humedad que marcó el hogar esa semana | `HUM_REF` | H1 · H2 · H3 · H4 · H5 · sin marca |
| **Volumen del bote lleno** | `DENS_V` | ________ L |
| **Masa del bote lleno, sin tara** | `DENS_M` | ________ g |
| Tara del bote | `DENS_T` | ________ g |
| ¿Se pudo hacer la visita? | `VIS_OK` | sí · repuesta dentro de la ventana · no se pudo |
| Foto tomada | `FOTO_EQ` | sí · no |
| Nota técnica | `VIS_NOTA` | sólo sobre la medición o el contenedor |

## Cómo se usan estos datos

- **`TEMP_I` + `HUM_REF` + la Hoja 3 del hogar** → única vía para saber si lo que describe la casa se
  corresponde con lo que mide un instrumento. Con dos visitas por hogar y cinco hogares son **diez
  pares**: alcanza para una lectura exploratoria, no para validar una escala. Conviene decirlo al
  presentar los resultados.
- **`DENS_M` / `DENS_V`** → densidad aparente, y con ella la conversión de litros a kilos para todo el
  grupo. **Dos mediciones pareadas por hogar, en momentos distintos**, y no una sola: una medición
  única, de un solo bote, de un solo día y de una sola mezcla no sostiene la conversión de todo el
  piloto. El dato primario de volumen **no se convierte automáticamente a masa** (decisión #4): se
  conservan las dos columnas y la conversión se hace, y se puede rehacer, en el análisis.
