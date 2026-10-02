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

## La aplicación (`docs/`)

La versión de `docs/` está preparada para GitHub Pages y sustituye el servidor Python/SQLite por
almacenamiento local del navegador.

**Hacia dónde va (decisión D5 del acta-01):** la app pasa a ser la **herramienta de captura del
coordinador**, que transcribe el papel; deja de ser un registro paralelo del hogar. Los cambios están
especificados —todavía sin código— en `ficha/especificacion-cambios-app.md`, y el puente entre las
casillas del papel y los campos de la app en `ficha/tabla-de-correspondencia-v0.1.md`.

> **Advertencia mientras no se implemente la especificación.** La versión publicada todavía exporta
> la columna `responsable` en cada fila del CSV y captura `tipo_residuo`. Las dos quedaron retiradas
> por privacidad (D5): **no las uses** al capturar el piloto, y no circules el CSV fuera de la
> coordinación.

### Funciones de la versión actual

- Configuración de un hogar (H1–H5), fecha de arranque y datos del coordinador.
- Registro diario de residuos húmedos, material seco, tiempo y observaciones, en litros.
- Regla 1:2 calculada al capturar la carga.
- Revisión semanal con categorías que la ficha ya no usa (humedad, olor y «plagas» de opción única).
- Exportación CSV separada para cada semana.
- Compartir el CSV con la API nativa del dispositivo cuando está disponible.
- Descarga del CSV y apertura de un correo dirigido al coordinador como alternativa.
- Confirmación local de cada entrega semanal.
- Respaldo y restauración completa en JSON.
- Caché de la interfaz para uso sin conexión después de la primera visita.

## Arquitectura y privacidad

GitHub Pages solo publica archivos estáticos. No ejecuta Python ni SQLite y no recibe los datos del
hogar. Los registros se guardan en `localStorage` del navegador. Borrar los datos del sitio, cambiar
de navegador o cambiar de dispositivo elimina el acceso a esos registros, por lo que conviene
descargar respaldos periódicos.

El navegador no puede adjuntar automáticamente un archivo a un correo mediante `mailto:`. La
aplicación descarga el CSV y abre un borrador; el usuario debe adjuntarlo y enviarlo. En navegadores
compatibles, «Compartir archivo» entrega el CSV al selector nativo de aplicaciones.

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

Además de la app, `npm test` comprueba que cada casilla de la ficha tenga su código en el diccionario
y viceversa (`tests/ficha-cobertura.test.js`).

## Publicación

Después de fusionar los cambios en `main`, abre **Settings → Pages**, elige **Deploy from a branch**,
selecciona la rama `main` y la carpeta `/docs`. GitHub Pages publicará la aplicación sin proceso de
compilación.
