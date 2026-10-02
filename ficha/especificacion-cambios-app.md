# Especificación de cambios de la app — sólo diseño

> **Sin código.** Este documento dice qué cambia en `docs/` por la decisión D5 del
> `acta-01-decisiones-piloto.md` y por el diccionario v0.3. El puente casilla por casilla está en
> `tabla-de-correspondencia-v0.1.md`. Fecha: octubre de 2026 · App de referencia: `docs/app.js`,
> `docs/index.html`, `docs/sw.js` y `tests/app.test.js` tal como están hoy.

---

## 0. Antes de empezar: tres reglas que el encargo da por existentes y no existen

El encargo pide respetar «las reglas existentes: `datos.js` es la fuente única, `vocabulario.json`
sólo crece por adición, y las prohibiciones se verifican con lint». **En el repositorio no hay
`datos.js`, ni `vocabulario.json`, ni ningún lint**: `docs/` tiene `app.js`, `index.html`,
`estilo.css`, `sw.js` y `manifest.webmanifest`, y las categorías viven escritas a mano dentro de
`index.html` y `app.js`. Se anota como discrepancia (acta-01 §7, discrepancia 8).

**PROPUESTA P-24 — decide el comité.** Recomendación: **adoptar las tres como reglas de diseño de este
cambio**, tal como las describen §3 y §9. Alternativa: mantener las categorías dentro de `app.js` y
comprobarlas sólo con la prueba de cobertura del diccionario.

---

## 1. Propósito y alcance

| | Hoy | Después |
| --- | --- | --- |
| Para quién | El hogar | **La persona coordinadora** |
| Qué hace | Registro paralelo del hogar, en litros, con revisión semanal de estado | **Transcribe** el papel (F-HOG rev. 03) y el registro técnico del equipo |
| Cuántos hogares | Uno por dispositivo | **Cinco**, `H1`–`H5`, en el mismo dispositivo del coordinador |
| Origen del dato | La app y el papel a la vez (R-3) | **El papel**; la app sólo captura |
| Qué produce | CSV semanal por hogar, enviado por el hogar | CSV del coordinador para el análisis |

**Fuera del alcance de la app:** la hoja de concordancia y la bitácora del programa (se llevan donde
vivan los datos, en hojas propias) y cualquier cálculo de criterios de éxito o de GEI (los hace el
análisis).

---

## 2. Lo que se retira

| Qué | Dónde está hoy | Por qué | Hallazgo |
| --- | --- | --- | --- |
| `responsable` | Ajustes (`autocomplete="name"`), columna del CSV en **cada fila**, cuerpo del correo, panel, respaldo | El CSV era, en los hechos, la lista que une clave y persona | **D5**, H-1 |
| `tipo_residuo` («Tipo de residuo») | Registro diario, columna del CSV, tabla de últimas cargas | Registro dietético del hogar | **D5**, H-2 |
| Nombre y correo del coordinador | Ajustes, correo de entrega | Nombres y correos no entran a los datos | dicc. §10.1 |
| «Semana 1: solo se mide» | `renderEntryRule()` | Se composta desde el día 1 | **D1** |
| Diagnóstico con juicio (`humedad` «adecuada», `olor` por intensidad, «plagas») | Revisión semanal | No se traducen a la ficha; el estado es del día 28 | C-1, C-2, C-3, A-1 |
| Acciones correctivas sugeridas por la app | `correctiveActions()`, sección «Acciones sugeridas» | Se basaban en esas categorías; la orientación al hogar está en la hoja guía | C-1…C-3 |
| Contaminantes diarios | Casilla «Encontré materiales no aceptados» | El dato es `A4`, semanal | R-7 |
| Minutos por carga y por revisión | `entradas[].minutos`, `revisiones[].minutos` | Un solo `MIN_S` semanal | R-5 |
| «Resultado observado» | Revisión semanal | El resultado es el estado siguiente | R-6 |
| «Ya envié la fotografía al grupo» | Revisión semanal | La foto va al coordinador, nunca al grupo | P-06, H-4 |
| Envío por correo desde el hogar | `openEmail()` | Ya no entrega el hogar desde la app | D5, H-4 |

---

## 3. Modelo de datos

### 3.1 Fuente única: `docs/datos.js` (P-24)

Un solo módulo con el esquema de captura, **derivado del diccionario v0.3**: para cada código, su
hoja, quién, cuándo, tipo, escala D4 (`ord`/`nom`), valores permitidos (referencia a
`vocabulario.json`), exclusiones (`F00`, `A0`, `ninguno`), notas condicionales (`FG5`, `A4`, `A5`,
`O5`, `F12`, `SECO_USO` = `otro`) y valor de ausencia por omisión de la columna «Si falta». `app.js` no
escribe ninguna categoría a mano: las pantallas se construyen desde `datos.js`.

### 3.2 `docs/vocabulario.json` (P-24)

Las listas de valores por código (`H1`…`H5`, `FG1`…`FG5`, `hojas`…`ninguno`…). **Sólo crece por
adición**: un valor nunca se renombra ni se borra; si se retira, se marca `"retirado": true` con la
versión del diccionario en que se retiró. Así un respaldo viejo sigue siendo legible.

### 3.3 Estructura

```
estado (version 2)
└─ hogares
   └─ H1 … H5
      ├─ FICHA_REV                       "03"
      ├─ alta        { DREV, PERS0, MASC, DPRE[], BOTE_*, CONT_*, UBIC_*, SECO_*, D0_* … }
      ├─ diario      { 1…28: { FECHA, ORG, SEC, NOTA_D } }
      ├─ semanal     { 1…4:  { SFECHA, REG, FUGA, FUGA_MOT[], SECO_USO[], PERS_S, MIN_S, LLEN_S, ACT[], NOTA_S } }
      ├─ PARADA_DIA
      ├─ dia28       { FCIE, OBS_MISMA, LLEN_F, VAHO, HUM[], OLOR[], FAU[], MEZ_AV[], MEZ_TX[], NOTA_E,
      │                SECO_FALT, SECO_FALT_N, SECO_DIF, CONT_TAM, CUELLO, CUELLO_OTRO, CONTIN, CIE_* }
      ├─ tecnico     { dia1: { VIS_*, BOTE_TARA, BOTE_AGUA, …, CONT_TARA_MET },
      │                cierre: { VIS_*, RES_GUARDADO, TEMP_*, PESO_*, DENS_*, LLEN_REF, MUE_*, SUELO_* } }
      └─ transcripcion { 1…4: recibida/transcrita, por semana }
verificacion  [ { VER_FECHA, VER_INSTR, VER_REF, VER_LECT, VER_OK } ]
```

- **Cada valor es un valor del vocabulario o un valor de ausencia** (`0`, `NR`, `NC`, `ND`, `NA`). No
  existe el «vacío» como estado guardado: la pantalla obliga a elegir entre un dato y una ausencia.
- Las multimarca se guardan como **listas de códigos**; la exportación las abre en multi-hot.
- Las cantidades se guardan **en botes, como se escribieron** (texto original incluido); la conversión
  a litros sólo existe en la exportación ancha, marcada como derivada.

---

## 4. Captura

- **Una pantalla por hoja**, en el orden del papel: Hoja 1, Hoja 2 (rejilla de 28 renglones), Hoja 3
  (rejilla S1–S4), Hoja 4, registro técnico del día 1, registro técnico del día 28, verificación de
  instrumentos.
- **Por `data-valor`, nunca por posición.** Los textos de las casillas son los del papel; el orden
  impreso de `ACT` se conserva en pantalla aunque no coincida con el de los códigos.
- **Ninguna casilla preseleccionada y ningún número por omisión.** Hoy los campos de cantidad son
  `required` con `value="0"` y los `select` traen una opción `selected` (C-5): se eliminan.
- **Botones de ausencia** junto a cada campo, sólo los que el diccionario permite para ese campo:
  `NR` («no anotó»), `NC` («no contestó»), `ND` («no se pudo determinar»), `NA` («no aplica»). La
  regla de §1 del diccionario se aplica sola: columna de la Hoja 3 vacía → `NR` en toda la semana.
- **Cantidades:** aceptan `0`, enteros, `½`, `1½`, `1.5`. Cualquier otra cosa se guarda como `ND` con el
  texto original (D-5) y se marca.
- **Registro técnico:** `VIS_QUIEN` es una lista de claves de equipo (`E1`, `E2`, `E3`), sin nombres;
  `BOTE_CAP` se calcula de `BOTE_AGUA` − `BOTE_TARA` y se compara con lo escrito en la Hoja 1 (I-15).
- **Hogares de prueba:** la app no sabe qué hogares son del equipo (`ESTRATO_EQ` vive fuera de ella).

## 5. Multimarca y regla D4

- Casillas de verificación para `DPRE`, `SECO_DISP`, `FUGA_MOT`, `SECO_USO`, `ACT`, `HUM`, `OLOR`,
  `FAU`, `MEZ_AV`, `MEZ_TX`.
- **Exclusiones** (`F00`, `A0`, `ninguno`): si el papel trae la exclusión junto con otra marca, **se
  captura lo que dice el papel** y se marca el error (I-1, I-2, I-3). La app no corrige.
- **Mínimo y máximo sólo para `HUM` y `MEZ_AV`**, calculados en la exportación. Las nominales se
  exportan como columnas 0/1 y nada más.

## 6. Separación entre lo semanal y el día 28

- La pantalla de la Hoja 3 sólo tiene el **renglón semanal**: entrada y rutina. **No hay variables de
  estado semanales.**
- El estado (`VAHO`, `HUM`, `OLOR`, `FAU`, `MEZ_AV`, `MEZ_TX`) sólo existe en la pantalla de la Hoja 4.
- Si el comité pasa `ACT` al día 28 (P-04), basta cambiar su `cuando` en `datos.js`: la pantalla se
  reconstruye sola.

## 7. Reglas de consistencia

Las 27 reglas del diccionario v0.3 §8 se evalúan al exportar y se escriben en una columna `marcas`. **Se
marcan, no se corrigen.** La pantalla las muestra como avisos al capturar, sin impedir guardar lo que
dice el papel.

## 8. Exportación

- **CSV largo (principal):** una fila por dato, con
  `id, ficha_rev, hoja, sem, dia, codigo, valor, valor_original, marcas`. Crece sin cambiar de forma
  cuando el diccionario añade códigos.
- **CSV ancho (para el análisis):** una fila por hogar y semana, con las columnas de
  `tabla-de-correspondencia-v0.1.md` (`columna_csv`), multi-hot y derivadas marcadas como tales.
- **Nunca** llevan `responsable`, `tipo_residuo`, nombres, correos ni teléfonos. `DREV` sólo aparece en
  la exportación interna del equipo.
- **Se conserva `csvEscape`**: antepone una comilla a los valores que empiezan por `=`, `+`, `-` o `@`
  (inyección de fórmulas). Está bien hecho (H-6) y no se toca.
- Nombre de archivo: `miltli_<fecha>_<largo|ancho>.csv`, sin clave de hogar si el archivo trae los
  cinco.

## 9. Respaldo JSON y almacenamiento local

- **Advertencia al descargar el respaldo** (H-6), antes de generarlo: «Este archivo contiene la captura
  de los cinco hogares con su clave. No lleva nombres ni domicilios, pero dentro del grupo es
  reidentificable. Guárdalo sólo donde vivan los datos del piloto; no lo mandes por chat.»
- La opción «Borrar todos los datos» se conserva y se mueve a un lugar visible.
- Aviso permanente: los datos viven en el navegador de este dispositivo; en un equipo compartido,
  cualquiera que lo use después puede verlos.
- **Migración:** el estado `version 1` (registro del hogar) **no se convierte** al nuevo esquema: sus
  categorías no se traducen (C-1). Si hay datos, se exportan una vez como «serie anterior» y no se
  concatenan.
- `sw.js`: subir la versión de la caché (`miltli-pages-v2`) para que nadie siga con la interfaz vieja.

## 10. Prohibiciones verificadas con lint (P-24)

Una prueba más en `tests/` (`npm test`) que falle si en `docs/`:

1. aparece `responsable`, `tipo_residuo`, `autocomplete="name"`, `type="email"` o `type="tel"`;
2. un campo de captura trae `value=` por omisión o una opción `selected`;
3. `app.js` o `index.html` contienen una categoría que no está en `vocabulario.json`;
4. `datos.js` tiene un código que no está en el diccionario v0.3, o le falta uno de `F-HOG` o `RT`;
5. `vocabulario.json` perdió un valor que tenía en la versión anterior (sólo crece por adición);
6. el encabezado del CSV trae una columna prohibida.

`tests/app.test.js` cambia: la prueba «exporta resumen, registros y revisión de una sola semana» hoy
**espera** `responsable` («Ana») y `tipo` en el CSV; se reescribe para comprobar que **no** están.

## 11. Orden de trabajo cuando se autorice el código

1. `vocabulario.json` y `datos.js`, generados del diccionario v0.3, con su prueba de cobertura.
2. Pruebas de prohibiciones (§10) — fallan al principio y guían el resto.
3. Modelo de datos y pantallas de captura (§3–§6).
4. Exportación larga y ancha con las reglas de consistencia (§7–§8).
5. Respaldo con advertencia y migración (§9).
6. Retiro de lo listado en §2.
7. `README.md`: quitar la advertencia de la versión anterior.

## 12. Criterios de aceptación

- Una ficha completa de prueba (inventada y rotulada como tal) se transcribe sin una sola casilla sin
  destino, y el CSV largo reproduce el papel casilla por casilla.
- Un renglón vacío de la Hoja 2 sale como `NR` y un `0` sale como `0`.
- Ninguna exportación contiene `responsable`, `tipo_residuo`, nombres, correos ni teléfonos.
- `npm test` pasa con la cobertura del diccionario, las prohibiciones y la prueba de la app reescrita.
- La prueba de transcripción cronometrada (protocolo v0.2 §7.1, prueba 5) da un tiempo por ficha que
  entra en la tabla de decisiones del Piloto 2.
