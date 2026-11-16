# Miltli

Piloto doméstico de compostaje de HUMAN STEM, A.C.: cinco hogares, 28 días, una ficha en papel y una
aplicación estática de captura.

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
menú ni nombres. **No se puede operar todavía:** supone diecisiete decisiones que el equipo no ha
tomado —empezando por a dónde va lo que se separa y cuánto tiempo puede guardarse—, listadas en
`planes/escalamiento_cafeterias.md` §6.

## La aplicación (`docs/`)

Página estática para GitHub Pages: la **captura del coordinador** (decisión D5 del acta-01). El
registro es el papel; la app sólo lo transcribe, para los cinco hogares, en un mismo dispositivo.
Implementa `ficha/especificacion-cambios-app.md`.

- **Pantallas en el orden del papel:** Hojas 1 a 4 de F-HOG rev. 03, registro técnico del día 1 y del
  día 28, y verificación de instrumentos. Se construyen desde `docs/datos.js` y
  `docs/vocabulario.json`, que se **generan del diccionario v0.3** (`npm run datos`); ninguna
  categoría está escrita a mano en la app.
- **Sin valores por omisión:** ninguna casilla viene marcada ni ningún número prellenado. Cada campo
  admite sus valores de ausencia (`NR`, `NC`, `ND`, `NA`); al exportar, lo vacío sale con la ausencia
  que le asigna el diccionario.
- **Se captura lo que dice el papel.** Las inconsistencias se marcan, no se corrigen: 13 de las 27
  reglas del diccionario §8 se evalúan en pantalla y viajan en la columna `marcas`.
- **Exportación:** CSV largo (`id, ficha_rev, hoja, sem, dia, codigo, valor, valor_original, marcas`)
  y CSV ancho por hogar y semana, con las derivadas marcadas `_der`. `DREV` sólo sale en la
  exportación interna.
- **Respaldo JSON** con advertencia, restauración y borrado. Funciona sin conexión después de la
  primera visita.
- **No lleva** nombres, correos ni teléfonos, ni las columnas retiradas por privacidad; lo comprueba
  `tests/app-prohibiciones.test.js`.

Pendiente respecto de la especificación: las 14 reglas de consistencia restantes, y las columnas del
CSV ancho todavía no siguen una por una la tabla de correspondencia. La ficha de cafeterías no está
en la app. Si el navegador guarda un registro de la versión anterior, la app ofrece exportarlo como
serie aparte; no lo convierte.

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
