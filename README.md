# Miltli

Piloto de compostaje de HUMAN STEM, A.C.: cinco hogares, 28 días, una ficha en papel y una
aplicación estática de captura; y, en borrador, la ficha y la captura para cafeterías.

## El piloto y su registro

- **El registro es el papel:** la ficha **F-HOG rev. 03** (`ficha/miltli-ficha-hogares.html`), cuatro
  hojas que llena cada hogar. Se composta desde el día 1.
- Lo que mide es la **entrada a la composta (L/persona/semana)**, no la generación. Un renglón semanal
  registra además lo que **no llegó** a la composta (fuga); la generación estimada = entrada + fuga es
  autorreportada y aproximada.
- El estado de la composta se registra **una vez, el día 28**, en una visita de cierre del equipo.
- El significado de cada casilla está en `ficha/diccionario-de-datos-v0.3-borrador.md`; cómo se
  observa, en `ficha/protocolo-operativo-v0.2-borrador.md`; las decisiones que llevaron aquí, en
  `ficha/acta-01-decisiones-piloto.md`. El plan del mes está en `planes/plan_trabajo.md`.
- Índice de la carpeta y estado de cada paso: `ficha/readme.md`.

## Cafeterías (borrador)

La ficha para desechos de cafeterías, **F-CAF rev. 01** (`ficha/miltli-ficha-cafeterias.html`), es un
borrador de seis hojas con su propio diccionario
(`ficha/diccionario-de-datos-cafeterias-v0.1-borrador.md`). Mide lo que se **separa** por corriente y
por día de operación, lo que **sale** hacia el destino y lo que no llegó; no pide ventas, clientes,
menú ni nombres. **No se puede operar todavía:** sus decisiones de diseño están resueltas en
`ficha/acta-02-resolucion-de-bloqueos.md`, pero cada cafetería debe fijar antes su destino, su tiempo
máximo de guardado y su verificación sanitaria, y faltan la guía de separación, el protocolo y las
pruebas de usabilidad (acta-02 §4).

## La aplicación (`docs/`)

Página estática para GitHub Pages: la **captura del coordinador** (decisión D5 del acta-01, que el
acta-02 mantiene también para cafeterías). El registro es el papel; la app sólo lo transcribe, en un
mismo dispositivo. Implementa `ficha/especificacion-cambios-app.md`.

- **Dos fichas, dos modelos, una app** (acta-02, CAF-08): **Hogares** (F-HOG rev. 03, cinco hogares
  `H1`…`H5`) y **Cafeterías** (F-CAF rev. 01, claves `K1`, `K2`… que se agregan en la app). Se elige
  arriba de la página.
- **Pantallas en el orden del papel.** Hogares: Hojas 1 a 4, registro técnico del día 1 y del día 28,
  y verificación de instrumentos. Cafeterías: Hojas 1 a 6, con la Hoja 3 dos veces (la semana de
  medición previa y los 28 días) y la Hoja 4 con un bloque por salida. Todo se construye desde
  `docs/datos.js`, `docs/datos-caf.js` y sus vocabularios, que se **generan de los diccionarios**
  (`npm run datos`); ninguna categoría está escrita a mano en la app.
- **Sin valores por omisión:** ninguna casilla viene marcada ni ningún número prellenado. Cada campo
  admite sus valores de ausencia (`NR`, `NC`, `ND`, `NA`); al exportar, lo vacío sale con la ausencia
  que le asigna el diccionario. En cafeterías, `0` ≠ vacío ≠ «cerrado», y la corriente que el destino
  no aceptó sale `NA`.
- **Se captura lo que dice el papel.** Las inconsistencias se marcan, no se corrigen, y viajan en la
  columna `marcas`: en hogares, 26 de las 27 reglas del diccionario v0.3 §8 (la I-27 es de la hoja de
  concordancia, que la app no captura); en cafeterías, las 17 reglas `IC` de su diccionario.
- **Exportación**, por ficha: CSV largo (una fila por dato), CSV ancho por semana y CSV ancho de una
  fila por hogar o por cafetería, con las derivadas marcadas `_der`. El largo de cafeterías añade las
  columnas `fase` y `sal_n`, que son parte de su clave.
- **Exportación interna:** `DREV` y, en cafeterías, lo que describe la rutina del negocio
  (`REC_FREC`, `DIAS_OP`, `CERRADO`, `SAL_FECHA`) sólo salen con la casilla de exportación interna.
- **Respaldo JSON** de las dos fichas en un solo archivo, con advertencia, restauración y borrado.
  Funciona sin conexión después de la primera visita.
- **No lleva** nombres, correos ni teléfonos, ni las columnas retiradas por privacidad, ni datos del
  negocio; lo comprueban `tests/app-prohibiciones.test.js` y `tests/app-caf.test.js`.

Tres interpretaciones que la app tuvo que tomar, porque el diccionario no las fija:
**I-21** se marca siempre que el hogar arrancó con material previo; **I-22** compara los decimales de
la temperatura con los de las lecturas de verificación del termómetro; **I-26** marca la fila de
verificación y la visita de ese mismo día. Además, donde la tabla de correspondencia da el mismo
encabezado a una opción y a su texto libre (`dpre_otro`), la columna del texto se llama
`dpre_otro_texto`.

Pendiente: probar la captura con una ficha real llenada y con quien coordina; unificar los dos modelos
en uno de «fuentes» al congelar las dos fichas (CAF-08). Si el navegador guarda un registro de la
primera versión de la app, se ofrece exportarlo como serie aparte; no se convierte.

## Arquitectura y privacidad

GitHub Pages sólo publica archivos estáticos y no recibe ningún dato. La captura se guarda en
`localStorage` del navegador: borrar los datos del sitio, cambiar de navegador o de dispositivo
elimina el acceso, así que conviene descargar respaldos. En un equipo compartido, quien lo use
después puede verla.

Reglas que no cambian con ninguna versión: **ningún dato lleva nombre, domicilio, teléfono ni
correo**; no se registra **qué** se come en la casa; la **lista de claves** (la que une `H__` con un
domicilio) **nunca entra a este repositorio**. Detalle en el diccionario v0.3 §10.

## Desarrollo local

```sh
python3 -m http.server 8080 --directory docs
```

Abre `http://localhost:8080`.

## Pruebas

```sh
npm test
```

`npm test` cubre la lógica de la app y sus prohibiciones, y además comprueba que cada casilla de las dos fichas —hogares y cafeterías— tenga
su código en su diccionario y viceversa (`tests/ficha-cobertura.test.js`).

## Publicación

En **Settings → Pages**, elige **Deploy from a branch**, la rama que se vaya a publicar (`main`, una
vez fusionada esta rama) y la carpeta `/docs`. No hay proceso de compilación. Tras publicar una
versión nueva hay que subir el nombre de la caché en `docs/sw.js` para que nadie se quede con la
interfaz anterior.
