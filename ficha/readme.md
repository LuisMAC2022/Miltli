# Ficha del piloto doméstico

En esta carpeta se encontrará la ficha para los hogares: los borradores, sus revisiones y las razones
de las decisiones y cambios realizados.

Se comenzó trabajando con la ficha para desechos de hogares. Una vez sea satisfactoria se procederá a
crear la ficha para desechos de cafeterías.

Esta carpeta unifica el trabajo de las ramas `ficha` —instrumento y revisiones— y `ficha_colaboracion`
—directrices: diccionario, decisiones arquitectónicas y prompt de protocolo—, que habían avanzado en
paralelo sin tocarse.

## El orden de los procesos

La secuencia manda sobre el calendario: automatizar una variable mal definida sólo acelera la
producción de datos deficientes.

| # | Paso | Producto | Estado |
| --- | --- | --- | --- |
| 1 | Semántica | `diccionario-de-datos-v0.2-borrador.md` | Borrador, **sin validar** |
| 2 | Protocolo de observación | `protocolo-operativo-v0.1-borrador.md` | Borrador, **sin validar** |
| 3 | Calendario de pesaje y temperatura | protocolo §6 | **Pendiente: lo fija el comité** |
| 4 | Pruebas de usabilidad | protocolo §7 | No ejecutadas |
| 5 | Congelar el instrumento | revisión 03 | No |
| 6 | Tabla de correspondencia | — | Fuera del alcance actual |
| 7 | Actualización de la app | `docs/` | Fuera del alcance actual |
| 8 | Alineación de `README.md` y `planes/` | — | No iniciada |

Los pasos 6 y 7 tienen condiciones previas documentadas en
`hallazgos-app-y-tabla-de-correspondencia.md`; conviene leerlo antes de empezar cualquiera de los dos.

## Archivos

### El instrumento

- `miltli-ficha-hogares.html` — **ficha vigente**. Se abre en el navegador y se imprime con el botón
  «Imprimir ficha». Son cuatro hojas tamaño carta: **arranque** (día 1), **registro diario** (28 días),
  **revisión semanal** (S1–S4) y **cierre** (día 28). El arranque y el cierre van en hojas distintas
  para que no haya duda de qué se llena cuándo.
- `registro-tecnico-equipo.md` — el registro del **equipo**, no del hogar: pesaje y toma de
  temperatura. Existe desde la revisión 02, cuando esas dos mediciones salieron de la ficha del hogar.

### El contrato de datos

- `diccionario-de-datos-v0.2-borrador.md` — qué significa cada casilla, quién la llena, con qué
  frecuencia y con qué código. Derivado casilla por casilla de la ficha vigente. **Es el documento del
  que depende la tabla de correspondencia.** Borrador.
- `protocolo-operativo-v0.1-borrador.md` — cómo se observa cada variable y **en qué orden**, con la
  prueba de estrés, las restricciones de privacidad y las decisiones pendientes. Incluye la tabla,
  todavía vacía, del **calendario de pesaje y temperatura que debe fijar el comité**. Borrador.

### Decisiones y análisis

- `revision-01-lenguaje-medicion-privacidad.md` — decisiones de la revisión 01: lenguaje descriptivo
  en lugar de incidencias, medición por volumen, escala de temperatura y revisión de privacidad de las
  preguntas de llenado único.
- `contraste-01-ficha-vs-direcciones.md` — contraste de la ficha contra las directrices y contra
  `planes/plan_trabajo.md`: diferencias, riesgos de cada modelo y ruta de integración.
- `revision-02-unificacion-y-extraccion-de-mediciones.md` — decisiones de la revisión 02: unificación
  de las dos ramas, salida de la temperatura y el pesaje hacia el equipo, separación de arranque y
  cierre, orden de los procesos y lo que cuesta cada cambio.
- `hallazgos-app-y-tabla-de-correspondencia.md` — **qué hay que resolver antes** de actualizar la app
  y de crear la tabla de correspondencia, con foco en redundancias y riesgos de privacidad.

### Anexos de origen

- `Miltli_Diccionario_de_Datos_v0.1.docx`, `Miltli_Decisiones_Arquitectonicas_v0.1.docx`,
  `Miltli_Prompt_Protocolo_Operativo_v0.1.docx` — las directrices originales de `ficha_colaboracion`.
  Se conservan como origen histórico; el contenido vigente está en los borradores de arriba.
- `anexos-v0.1/` — transcripción en texto plano de esos tres `.docx`, para poder compararlos línea por
  línea con `git diff`. Si difieren del `.docx`, manda el `.docx`.

## Dos advertencias

1. **Los dos borradores no están validados.** El protocolo y el diccionario v0.2 se someten a revisión
   de un comité humano. Hasta que el comité los valide y fije el calendario de las mediciones técnicas,
   la ficha no debe congelarse: la Hoja 1 le promete visitas al hogar.
2. **La privacidad es parte del contrato, no un apéndice.** Las restricciones están en el protocolo §4
   y en el diccionario §7 precisamente para que un esquema derivado no las pierda sin decidirlo. Las
   dos que más se olvidan: no se registra qué se come en la casa —tampoco lo hace el equipo al pesar—,
   y la lista que une la clave `H__` con un domicilio no vive en este repositorio.
