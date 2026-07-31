# Miltli

Aplicación estática para el piloto doméstico de compostaje. La versión de `docs/` está preparada para GitHub Pages y sustituye el servidor Python/SQLite por almacenamiento local del navegador.

## Funciones implementadas

- Configuración de un hogar (H1–H5), fecha de arranque y datos del coordinador.
- Registro diario de residuos húmedos, material seco, tiempo y observaciones.
- Regla 1:2 calculada al capturar la carga.
- Revisión semanal con diagnóstico y acciones correctivas.
- Exportación CSV separada para cada semana.
- Compartir el CSV con la API nativa del dispositivo cuando está disponible.
- Descarga del CSV y apertura de un correo dirigido al coordinador como alternativa.
- Confirmación local de cada entrega semanal.
- Respaldo y restauración completa en JSON.
- Caché de la interfaz para uso sin conexión después de la primera visita.

## Arquitectura y privacidad

GitHub Pages solo publica archivos estáticos. No ejecuta Python ni SQLite y no recibe los datos del hogar. Los registros se guardan en `localStorage` del navegador. Borrar los datos del sitio, cambiar de navegador o cambiar de dispositivo elimina el acceso a esos registros, por lo que conviene descargar respaldos periódicos.

El navegador no puede adjuntar automáticamente un archivo a un correo mediante `mailto:`. La aplicación descarga el CSV y abre un borrador; el usuario debe adjuntarlo y enviarlo. En navegadores compatibles, «Compartir archivo» entrega el CSV al selector nativo de aplicaciones.

## Desarrollo local

```sh
python3 -m http.server 8080 --directory docs
```

Abre `http://localhost:8080`.

## Pruebas

```sh
npm test
```

## Publicación

El flujo `.github/workflows/pages.yml` prueba la aplicación y publica el contenido de `docs/` al fusionar cambios en `main`. En **Settings → Pages**, selecciona **GitHub Actions** como fuente la primera vez.
