# Acta 02 — Resolución de las decisiones que bloquean

Fecha del acta: 16 de noviembre de 2026 · Serie: **actas** (prefijo `acta-`, RE-10)
Parte de: `acta-01-decisiones-piloto.md` §6 y §8 · `planes/escalamiento_cafeterias.md` §6 ·
`diccionario-de-datos-cafeterias-v0.1-borrador.md` §0

Este acta **define** cada decisión que impedía avanzar y la **resuelve**. No cambia ninguna casilla:
F-HOG rev. 03 ya imprime las recomendaciones del acta-01 y F-CAF rev. 01 ya está redactada sobre los
supuestos de trabajo de su diccionario. Lo que hace es convertir esas recomendaciones y supuestos en
decisiones, y separar lo que **no** se resuelve escribiendo (§4).

---

## 0. Procedencia

| Origen | Qué aporta | Cómo se cita |
| --- | --- | --- |
| **Instrucción del 16-nov-2026** de quien dirige el desarrollo | «D5 se mantiene» y el encargo de definir y resolver las decisiones que bloquean | «instrucción del 16-nov-2026» |
| **Este acta** | La opción elegida en cada punto, siguiendo la recomendación o la inclinación ya escrita en el repositorio | «este acta» |

**Alcance de la autoridad.** El acta-01 reservaba las PROPUESTAS al comité. Estas resoluciones se
toman por la instrucción del 16-nov-2026, no por una sesión del comité: valen para seguir trabajando
y **el comité puede reabrir cualquiera con un acta posterior**. Ninguna elige algo distinto de lo que
el repositorio ya recomendaba; donde no había recomendación, se dice (§2, CAF-10 y CAF-13).

**D5 se mantiene** (instrucción del 16-nov-2026): el registro es el papel y la app sólo lo
transcribe, también en cafeterías.

---

## 1. Hogares — las nueve PROPUESTAS que bloqueaban congelar F-HOG rev. 03

| ID | Qué se decidía | Resolución | Cambia el papel |
| --- | --- | --- | --- |
| P-01 | Ventana de la visita de cierre | **Días 26–28** (−2 / +0); reposición los días 29–30 con nota | No |
| P-02 | Día 1 no presencial en cada casa | **(a)** Visita breve a cada casa en día 0–1 para dimensiones y tara | No |
| P-03 | Menos de ½ bote | **Se guarda** para el siguiente depósito | No |
| P-04 | `ACT` semanal | **Sí, en la Hoja 3** | No |
| P-06 | Canal de entrega | **Foto semanal** de las Hojas 2–3 al coordinador por mensaje privado, sin ubicación; nunca al grupo | No |
| P-12 | Umbrales de concordancia y cambio preespecificado | **Los del protocolo v0.2 §7.2**, sin cambio | No |
| P-17 | Umbrales y predicciones del Piloto 2 | **No se resuelve aquí** (§4, pendiente 3): el contenido está sellado y fuera del repositorio | No |
| P-21 | Opción `ninguno` en `SECO_USO` | **Sí** | No |
| P-22 | `CUELLO` como pregunta de cierre | **Sí** | No |

Además, **P-24** (no bloqueaba el papel, sí la app): **adoptada**. `docs/datos.js` es la fuente única
y se genera del diccionario, `docs/vocabulario.json` sólo crece por adición y las prohibiciones se
comprueban con `tests/app-prohibiciones.test.js`. Ya estaba implementada.

Las demás PROPUESTAS del acta-01 §6 (P-05, P-07a/b, P-08 a P-11, P-13 a P-16, P-18, P-23) no bloquean
y **siguen abiertas con su recomendación**.

**Consecuencia.** Del acta-01 §8, el punto 1 queda cerrado salvo P-17. Los puntos 2 a 5 son trabajo
de campo y están en el §4.

---

## 2. Cafeterías — las decisiones CAF-01 a CAF-17

«Bloquea» dice qué impedía. Las doce primeras filas marcadas **ficha** son las que bloqueaban el papel.

| ID | Qué se decidía | Bloquea | Resolución |
| --- | --- | --- | --- |
| CAF-01 | A dónde va lo que se separa | ficha | **Fuera de la cafetería.** Cada cafetería anota en la Hoja 1 cuál de tres destinos usa (`DEST_TIPO`: `acopio`, `composteras`, `tercero`). **La composta dentro de la cafetería queda fuera de esta revisión.** El destino se dimensiona con la semana de medición previa (CAF-10) |
| CAF-02 | Tiempo máximo de guardado y plan B | ficha | **(a) Número fijo de días** (`ALM_TMAX`) y un plan B entre tres (`PLANB`), escritos antes del día 1. **Este acta no pone el número:** lo fija quien opera el destino, por cafetería |
| CAF-03 | Corrientes que acepta el método | ficha | **Lo decide quien opera el destino, por escrito**, entre `posos`, `prep` y `plato` (`CORR_ACEPTA`); las columnas no aceptadas se tachan. La revisión puntual de la basura común **no se incluye** |
| CAF-04 | Unidad de normalización | ficha | **Ninguna:** cantidades absolutas por corriente y por día con operación |
| CAF-05 | Si se registra la corriente | ficha | **(b)** Una columna por corriente en el papel y códigos cerrados en la app |
| CAF-06 | Volumen o masa | ficha | **(a) Recipientes calibrados por corriente**; kilos sólo si la cafetería ya pesa sus residuos (`UNIDAD`) |
| CAF-07 | Quién anota | ficha | **(b)** Rayas del personal al vaciar, quien cierra el día escribe el total, y quien recibe cuenta por su lado |
| CAF-09 | Acuerdo con la cafetería | ficha | **(b) Carta breve firmada por la gerencia.** La ficha sólo registra que existe; la carta lleva nombres y no entra al repositorio |
| CAF-10 | Línea base | ficha | **(b) Una semana de medición previa** (`FASE` = `base`: se mide y lo separado sigue su camino de siempre) **y luego 28 días** (`FASE` = `piloto`). El análisis no traía inclinación; se elige por coherencia con CAF-01: nada se guarda sin un destino dimensionado |
| CAF-11 | Visita de cierre | ficha | **(a) En la cafetería:** guardado, pares de densidad por corriente y preguntas de cierre. El estado de la composta es asunto de la ficha del destino |
| CAF-13 | Verificación sanitaria | ficha | **La revisa la gerencia de la cafetería contra sus propias obligaciones**, con la lista de normas candidatas de `escalamiento_cafeterias.md` §5.5 como preguntas que el programa le entrega; se anota quién la revisó (`SANIT_QUIEN`). El programa **no afirma qué exige ninguna norma**. El análisis no traía inclinación |
| CAF-16 | Orden frente a la ficha doméstica | ficha | **(b) En paralelo**, como ya se hizo. Al congelar F-HOG rev. 03 se reconcilian los 17 códigos compartidos |
| CAF-08 | Modelo de datos | app | **(c) Separados ahora; se generaliza al congelar las dos fichas**, hacia un modelo de `fuentes` con `tipo_fuente`. Hasta entonces la app no cambia su raíz `hogares` |
| CAF-12 | Qué necesita el modelo de residuos | denominador | **(b) Se entrega el mínimo:** cantidad por corriente y semana, fuga y un factor kg/L por corriente. Si el proyecto del modelo pide más, se reabre |
| CAF-14 | Incidente de guardado | — | **(b) Condición de paro escrita antes del día 1** |
| CAF-15 | Publicación | — | **Nada se publica por cafetería** sin permiso escrito de la gerencia; lo que sale del grupo va agregado |
| CAF-17 | La cafetería del precedente | — | **Sigue abierta** (§4, pendiente 9). No cambia el papel |

También se adoptan las seis decisiones propias de la redacción de F-CAF rev. 01 (diccionario de
cafeterías §0): prefijo de clave `K`, hojas 1 a 6, sin hora en las salidas, fuga por corriente,
guardado observado cada semana y prefijo `SAL_` para las salidas.

**Consecuencia.** Los «supuestos de trabajo» del diccionario de cafeterías §0 dejan de ser supuestos.
F-CAF rev. 01 sigue siendo **borrador** por lo que lista el §4, no por decisiones de diseño.

---

## 3. Lo que esto desbloquea

| Trabajo | Estado antes | Estado ahora |
| --- | --- | --- |
| Cerrar la app doméstica: las 14 reglas de consistencia restantes y el CSV ancho según la tabla de correspondencia | No dependía de decisiones | Puede hacerse ya |
| Captura de cafeterías en la app (D5): pantallas de las seis hojas, por corriente y día, entregas, reglas y CSV propios | Bloqueada por CAF-05 y CAF-08 | **Desbloqueada** como modelo aparte dentro de la misma app (CAF-08 c), generado del diccionario de cafeterías (P-24) |
| Generalizar a `fuentes` con `tipo_fuente` | Sin decidir | Decidido el rumbo; se hace al congelar las dos fichas |
| Protocolo, registro técnico y guía de separación de cafeterías | Sin base firme | Pueden redactarse sobre este acta |

---

## 4. Lo que sigue pendiente — no se resuelve escribiendo

Son hechos, fechas o pruebas. Ninguno impide programar; **todos impiden llevar el papel a campo.**

| # | Pendiente | De quién es | Impide |
| --- | --- | --- | --- |
| 1 | Fechas y claves de equipo del calendario (protocolo v0.2 §6) | Coordinación | Congelar F-HOG |
| 2 | Pruebas de usabilidad y concordancia (protocolo v0.2 §7) con los dos hogares voluntarios y evaluadores externos | Equipo | Congelar F-HOG |
| 3 | **P-17:** que las personas del comité escriban o ratifiquen umbrales y predicciones del Piloto 2, y volver a sellar antes del día 1 (`preregistro/SELLOS.md`) | Comité | Congelar F-HOG |
| 4 | Verificación de impresión y `npm test` sobre la versión final | Equipo | Congelar F-HOG |
| 5 | Por cafetería: destino concreto, `ALM_TMAX`, plan B, corrientes aceptadas por escrito, condición de paro y carta firmada (Hoja 1) | Programa, destino y gerencia | Empezar en esa cafetería |
| 6 | Consultar las normas candidatas (`escalamiento_cafeterias.md` §5.5): ninguna se ha leído | Gerencia; el programa entrega la lista | Condición 7 de la Hoja 1 |
| 7 | Instrumentos que no existen: guía de separación, registro técnico y protocolo de cafeterías, y la ficha del destino | Equipo | Operar F-CAF |
| 8 | Pruebas de usabilidad de F-CAF con personal de una cafetería | Equipo | Congelar F-CAF |
| 9 | CAF-17: si la cafetería del precedente participa | Equipo | Nada |
