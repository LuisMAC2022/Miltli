# Plantilla — Bitácora del programa

> **Plantilla, no registro.** Viene de `acta-01-decisiones-piloto.md`, RE-07. En este repositorio vive
> **sólo la plantilla**; los registros viven donde vivan los datos del piloto, con las mismas
> restricciones. Códigos en `diccionario-de-datos-v0.3-borrador.md` §7.4.

## Para qué existe

`ACT` registra lo que hizo **el hogar**. Nada registraba lo que hizo **el programa**: un recordatorio,
un consejo, una reunión en la que se compararon resultados, una entrega de material seco o un cambio
de protocolo pueden cambiar lo que pasa en una composta tanto como lo que hace la casa. Sin esta
bitácora, un cambio en los datos de la semana 3 no se puede distinguir de un efecto del programa.

**Empieza el día 1** y la lleva la persona coordinadora. Se anota **el mismo día** en que ocurre.

## Campos

| Campo | Código | Qué se escribe |
| --- | --- | --- |
| Fecha | `BIT_FECHA` | Día en que ocurrió |
| Hogar | `BIT_HOGAR` | `H1`…`H5`, o `todos` |
| Tipo | `BIT_TIPO` | Uno de la lista de abajo |
| Contenido | `BIT_CONT` | Qué ocurrió, en una o dos frases, **sin datos personales** |
| Quién | `BIT_ROL` | **Rol**, nunca nombre: `coordinacion` · `equipo` · `hogar` · `externo` |

### Tipos

| Valor | Qué se anota |
| --- | --- |
| `recordatorio` | Avisos para llenar el renglón semanal, mandar la foto o guardar los residuos del día 28 |
| `consejo` | Cualquier indicación sobre cómo operar la composta, a uno o a todos los hogares |
| `reunion` | Reuniones semanales o de comparación: de qué se habló y si se mostraron números de hogares |
| `entrega_seco` | Entregas de material seco o de cualquier insumo del programa, con cantidad aproximada |
| `cambio_protocolo` | Cualquier cambio a la ficha, a la hoja guía o al protocolo una vez empezado el piloto |
| `imprevisto` | Eventos no planeados que afectan la composta o el registro |
| `otro` | Lo que no cabe arriba |

**Ejemplo de imprevisto**, el que dio origen a RE-07: un acopio espontáneo de residuos de café que se
enmoheció y terminó en una composta casera sin decisión del programa. Se anotaría con el `H#` del
hogar al que llegó, tipo `imprevisto` y la cantidad aproximada, sin decir de dónde vino el café ni
quién lo llevó.

## Formato de la tabla

| `BIT_FECHA` | `BIT_HOGAR` | `BIT_TIPO` | `BIT_CONT` | `BIT_ROL` |
| --- | --- | --- | --- | --- |
| `[fecha]` | `[H# o todos]` | `[tipo]` | `[qué ocurrió, sin datos personales]` | `[rol]` |

## Reglas

1. **Sin nombres, domicilios, teléfonos ni correos**, ni de los hogares ni del equipo: claves y roles.
2. **No se describe qué se come en ninguna casa.** Un consejo o un imprevisto se describen por lo que
   le pasó a la composta, no por los alimentos de la casa.
3. **No se anota la rutina de los hogares** (viajes, ausencias, visitas). Si un hogar avisa que no
   registrará una semana, se anota «aviso de semana sin registro», sin el motivo.
4. **No entra al repositorio.** Se guarda con los datos del piloto y se usa en el análisis para leer
   los cambios semana a semana.
5. Las reuniones en las que se muestren números por hogar se anotan **siempre**: son exactamente el
   efecto de comparación que el diseño intenta evitar (acta-01, P-06 y P-11).
