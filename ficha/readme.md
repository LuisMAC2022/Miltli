# Ficha del piloto doméstico

En esta carpeta se encontrará la ficha para los hogares: los borradores, sus revisiones y las razones
de las decisiones y cambios realizados.

Se comenzó trabajando con la ficha para desechos de hogares. Una vez sea satisfactoria se procederá a
crear la ficha para desechos de cafeterías.

Esta carpeta unifica el trabajo de las ramas `ficha` —instrumento y revisiones— y `ficha_colaboracion`
—directrices: diccionario, decisiones arquitectónicas y prompt de protocolo—, que habían avanzado en
paralelo sin tocarse.

**Propósito del mes 1:** probar la entrada —separación, medición, rutina—, no la composta; y dejar
medido lo necesario para que el mes 2 evalúe composta, suelo y una estimación de GEI evitados. Las
decisiones que fijaron este propósito están en `acta-01-decisiones-piloto.md`.

## El orden de los procesos

La secuencia manda sobre el calendario: automatizar una variable mal definida sólo acelera la
producción de datos deficientes.

| # | Paso | Producto | Estado |
| --- | --- | --- | --- |
| 0 | Decisiones del piloto | `acta-01-decisiones-piloto.md` | **D1–D6 firmes**; 23 PROPUESTAS para el comité (§6) |
| 1 | Semántica | `diccionario-de-datos-v0.3-borrador.md` | Borrador; aplica el acta-01 |
| 2 | Protocolo de observación | `protocolo-operativo-v0.2-borrador.md` | Borrador; aplica el acta-01 |
| 3 | Calendario: sesión del día 1 y visita de cierre | protocolo v0.2 §6 | Estructura decidida (D3); **fechas y claves `[por definir]`** |
| 4 | Pruebas de usabilidad y concordancia | protocolo v0.2 §7 · `hoja-concordancia.html` | No ejecutadas |
| 5 | Congelar el instrumento | **F-HOG rev. 03** | **No**: faltan las PROPUESTAS que bloquean (acta-01 §8) |
| 6 | Tabla de correspondencia | `tabla-de-correspondencia-v0.1.md` | Borrador contra v0.3; se revisa al congelar |
| 7 | Actualización de la app | `especificacion-cambios-app.md` | Especificada, **sin código** |
| 8 | Alineación de `README.md` y `planes/` | — | Hecha contra v0.3; se repasa al congelar |
| 9 | Diseño del mes 2 | `diseno-mes-2-composta-suelo-gei.md` | Borrador |

> **Corrección (acta-01, RE-10).** El paso 5 decía antes que el instrumento se congelaría como una
> cuarta revisión del papel. El papel tiene su propia serie: lo que se congela es **F-HOG rev. 03**, y
> `FICHA_REV` registra sólo esa serie. Los documentos de decisión usan el prefijo `acta-`.

## Archivos

### El instrumento

- `miltli-ficha-hogares.html` — **ficha vigente, F-HOG rev. 03** (borrador, sin congelar). Se abre en
  el navegador y se imprime con el botón «Imprimir ficha». Cuatro hojas tamaño carta: **arranque**
  (día 1), **registro diario** (28 días), **renglón semanal** (S1–S4, menos de un minuto) y **cierre**
  (día 28: revisión de estado junto con el equipo y preguntas de cierre). Cada casilla lleva
  `data-codigo` (invisible al imprimir) con su código del diccionario.
- `miltli-ficha-hogares-rev02.html` — **F-HOG rev. 02 sin cambios**, conservada para comparar. No se
  usa para operar.
- `hoja-guia.html` — **hoja de consulta**, una página, no se llena: reglas de operación (1:2, regla del
  80 %, guardar los residuos el día de la visita), lo que suele ayudar según lo que se observa y la
  **ayuda visual de fauna** (rasgos en texto y recuadros para fotos propias o con licencia CC).
- `hoja-concordancia.html` — la **prueba de concordancia** (objetivo B): estaciones de humedad del día
  1, panel de fotos y observación del equipo en la visita del día 28, con las reglas preespecificadas.
- `registro-tecnico-equipo.md` — el registro del **equipo** (v0.3): formulario del día 1 (bote,
  dimensiones y tara del contenedor) y del día 28 (temperatura, pesaje, pares de densidad, altura de
  llenado, muestras), con la verificación de instrumentos.
- `plantilla-bitacora-programa.md` — plantilla de la **bitácora del programa** (lo que hace el
  programa, no el hogar). En el repositorio vive sólo la plantilla.

### El contrato de datos

- `diccionario-de-datos-v0.3-borrador.md` — qué significa cada casilla, quién la llena, cuándo, con
  qué código y qué valor toma si queda vacía. Incluye la regla de multimarca variable por variable, las
  reglas de consistencia, las derivadas y la privacidad (§10). **Es el documento del que depende la
  tabla de correspondencia.** La cobertura casilla ↔ código se comprueba con `npm test`.
- `diccionario-de-datos-v0.2-borrador.md` — versión anterior, sin cambios.
- `protocolo-operativo-v0.2-borrador.md` — cómo se observa cada variable y **en qué orden**: día 1,
  carga diaria, renglón semanal y visita de cierre; prueba de estrés, privacidad, calendario y pruebas
  de usabilidad.
- `protocolo-operativo-v0.1-borrador.md` — versión anterior, sin cambios.
- `tabla-de-correspondencia-v0.1.md` — una fila por casilla: código, campo de la app, columna del CSV,
  categoría del plan y tipo de relación, incluidas las que **no** tienen equivalencia y las retiradas
  por privacidad.
- `especificacion-cambios-app.md` — qué cambia en `docs/` para que la app sea la captura del
  coordinador. Sólo diseño.

### Decisiones y análisis

- `acta-01-decisiones-piloto.md` — **decisiones del 1-oct-2026** (D1–D6, aclaraciones, encargos y los
  hallazgos de la revisión externa RE-01…RE-14), cada una con regla anterior, decisión, consecuencias,
  archivos, estado y procedencia; las PROPUESTAS para el comité; y las discrepancias detectadas.
- `diseno-mes-2-composta-suelo-gei.md` — lo que el mes 1 debe dejar medido para el mes 2: calidad de
  composta, calidad de suelo, estimación de GEI evitados y la tabla de decisiones del Piloto 2
  (pre-registrada: en `preregistro/` sólo está su sello).
- `revision-01-lenguaje-medicion-privacidad.md` — lenguaje descriptivo, medición por volumen,
  temperatura y privacidad de las preguntas de llenado único.
- `contraste-01-ficha-vs-direcciones.md` — contraste de la ficha contra las directrices y el plan.
- `revision-02-unificacion-y-extraccion-de-mediciones.md` — unificación de las dos ramas y salida de la
  temperatura y el pesaje hacia el equipo.
- `hallazgos-app-y-tabla-de-correspondencia.md` — qué había que resolver antes de la app y de la
  tabla de correspondencia; la mayor parte lo resuelve el acta-01 (D5).
- `revision-03-funcion-de-la-ficha-y-validacion-de-integracion.md` — si la ficha cumple su función y si
  está alineada con el diccionario. Lleva una nota de corrección de RE-10.

### Anexos de origen

- `Miltli_Diccionario_de_Datos_v0.1.docx`, `Miltli_Decisiones_Arquitectonicas_v0.1.docx`,
  `Miltli_Prompt_Protocolo_Operativo_v0.1.docx` — las directrices originales de `ficha_colaboracion`.
- `anexos-v0.1/` — transcripción en texto plano de esos tres `.docx`. Si difieren, manda el `.docx`.

## Tres advertencias

1. **Nada está congelado.** D1–D6 son firmes, pero la ficha F-HOG rev. 03 imprime las recomendaciones de
   varias PROPUESTAS (canal de entrega, ventana de la visita, `ACT` semanal…) que el comité todavía
   debe decidir. La lista de lo que bloquea está en el acta-01 §8.
2. **La privacidad es parte del contrato, no un apéndice.** Las restricciones están en el protocolo v0.2
   §4 y en el diccionario v0.3 §10. Nunca entran a este repositorio: nombres, domicilios, teléfonos ni
   correos; el tipo o la composición del residuo; ninguna asociación hogar ↔ municipio; ni la **lista
   de claves** que une `H__` con un domicilio.
3. **Tres de los cinco hogares son de personas del equipo.** Se analizan como estrato propio fuera del
   repositorio y no cuentan como observadores ingenuos en la concordancia. Este repositorio nunca dice
   cuáles son.
