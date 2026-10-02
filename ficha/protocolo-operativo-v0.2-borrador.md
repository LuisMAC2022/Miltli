# Protocolo operativo Miltli v0.2 — BORRADOR

> **Borrador para el comité.** Sustituye a `protocolo-operativo-v0.1-borrador.md`, que se conserva sin
> cambios para comparar. Aplica las decisiones de `acta-01-decisiones-piloto.md` —D1–D6 son firmes— y
> deja marcado **PROPUESTA (P-xx)** lo que el comité todavía debe decidir.
>
> Fecha del borrador: octubre de 2026 · Deriva de: **F-HOG rev. 03** (`miltli-ficha-hogares.html`),
> `diccionario-de-datos-v0.3-borrador.md`, `registro-tecnico-equipo.md` (v0.3),
> `hoja-concordancia.html`, `hoja-guia.html` y `acta-01-decisiones-piloto.md`.

El diccionario define **qué** se mide. Este protocolo define **cómo** se observa cada variable,
**quién** la observa y **en qué orden**, para reducir ambigüedad, error de medición y diferencias
entre observadores. Los códigos son los del diccionario v0.3; en el papel no se imprimen.

---

## 0. Qué cambia respecto de v0.1

| | v0.1 | v0.2 | Origen |
| --- | --- | --- | --- |
| Qué mide `ORG` | Sin nombre fijo; el plan la llamaba «generación» | **Entrada a la composta**; se añade la **fuga** semanal | D1 |
| Semana 1 | Pendiente (§5.2) | **Se composta desde el día 1** | D1 |
| Estado de la composta | Revisión semanal (§1.4) | **Una vez, el día 28**, durante la visita, lado a lado con el equipo | A-1, RE-06 |
| Hoja 3 | Revisión semanal de estado | **Renglón semanal** de entrada y rutina, ≤ 1 minuto | A-1 |
| Visitas del equipo | Dos, sin fecha (§5.1, §6) | **Medición del día 1** + **visita de cierre del día 28** | D3 |
| Capacidad del bote | Botella de 1 L | **Masa de agua** en báscula de cocina | D3 |
| Densidad | Pareada en dos momentos | Un momento: pares de entrada, de seco y de pila | D3, RE-03 |
| Instrumentos | Sin especificar | Especificados y **verificados** cada día de medición | RE-05 |
| Multimarca | Pendiente (§5.3) | Rango sólo en ordinales | D4 |
| Concordancia | Prueba descrita en prosa | **Hoja propia**, tres fuentes, cambios preespecificados | RE-12 |
| Regla del 80 % | No estaba | En la hoja guía + `PARADA_DIA` | RE-02 |
| Lo que hace el programa | No se registraba | **Bitácora del programa** desde el día 1 | RE-07 |
| Hogares del equipo | No se distinguían | Estrato propio fuera del repositorio; fuera de concordancia y legibilidad; visita cruzada | RE-08 |

---

## 1. El orden de los procesos

### 1.1 Orden del proyecto — qué bloquea a qué

Es la secuencia de la decisión arquitectónica #11 (*semántica → protocolo → usabilidad → diseño →
digitalización*), con el estado real de cada paso.

| # | Paso | Producto | Estado | Responsable |
| --- | --- | --- | --- | --- |
| 1 | Semántica | `diccionario-de-datos-v0.3-borrador.md` | Borrador. D1–D6 firmes; PROPUESTAS abiertas | Comité |
| 2 | Protocolo de observación | este documento | Borrador | Comité |
| 3 | Calendario de mediciones técnicas | §6 | Estructura fijada (día 1 + día 28); **fechas y claves `[por definir]`** | Comité y coordinación |
| 4 | Pruebas de usabilidad | §7 | No ejecutadas | Equipo + dos hogares voluntarios + evaluadores externos |
| 5 | Congelar el instrumento | **F-HOG rev. 03** | No | Comité |
| 6 | Tabla de correspondencia | `tabla-de-correspondencia-v0.1.md` | Borrador contra v0.3 | Equipo de datos |
| 7 | Actualización de la app | `especificacion-cambios-app.md` (sólo especificación) | Código no iniciado | Equipo de datos |
| 8 | Alineación de `planes/` y `README.md` | hecha contra v0.3 | Borrador | Equipo |
| 9 | Diseño del mes 2 | `diseno-mes-2-composta-suelo-gei.md` | Borrador | Comité |

**Reglas de precedencia:**

- El paso 6 se escribió contra el diccionario v0.3 **antes** de validarlo, como admitía la revisión 03
  §11, a condición de **revisarlo una vez después de congelar**. El paso 7 sigue sin código hasta que
  el 6 esté revisado.
- El paso 3 **no depende** de los pasos 4 y 5: el calendario puede fijarse ya, y conviene, porque la
  sesión del día 1 incluye las estaciones de concordancia (§7).
- El paso 8 se hizo antes de congelar por orden del encargo. **Costo asumido:** habrá que repasarlo
  cuando el comité resuelva las PROPUESTAS.
- El paso 9 depende del paso 3: las muestras de línea base del mes 2 se toman en la visita del día 28.

### 1.2 Orden del piloto en el hogar

Impreso en la Hoja 1, en la banda «El orden del piloto, de principio a fin».

1. **Día 1 · arranque.** El equipo mide el bote y el contenedor (§1.3). El hogar pone la capa base,
   hace la primera carga y llena la **Hoja 1**.
2. **Días 1 a 28 · registro diario.** Dos números por día en la **Hoja 2**, en el orden de §1.4.
3. **Una vez por semana · renglón semanal.** Menos de un minuto en la **Hoja 3**, el día `DREV`, en el
   orden de §1.5.
4. **Día 28 · visita de cierre.** El hogar guarda los residuos del día sin echarlos. Hogar y equipo
   revisan la composta lado a lado y marcan cada uno por su cuenta; el hogar llena la **Hoja 4**
   (§1.6).

### 1.3 Secuencia del día 1

El día 1 tiene dos partes. La primera es grupal; la segunda ocurre en cada casa. **D3 exige que el
día 1 sea presencial**; si no puede serlo en cada casa, ver **PROPUESTA P-02** al final de esta
sección.

**A. Sesión de arranque (grupal, presencial)**

1. **Verificar los instrumentos** (`VER_*`, §2.25) antes de medir nada.
2. **Capacitación con estaciones** (hoja de concordancia, Parte A): 4–5 cubetas preparadas con estados
   de humedad conocidos. Cada participante marca por separado; nadie ve las marcas de otro. Después,
   y sólo después, se demuestra la prueba del puño.
3. **Medir el bote de medida de cada hogar** (§2.19): bote vacío (`BOTE_TARA`), bote lleno de agua
   hasta el borde (`BOTE_AGUA`), `BOTE_CAP` = diferencia / 1000. Se escribe en el registro técnico y se
   copia en la Hoja 1. Si el bote del hogar pasa de ~1.5 L, se le sugiere uno de ~1 L (RE-01).
4. **Entregar** las cuatro hojas, la hoja guía y la indicación del canal de entrega (P-06).
5. **Asignar claves** de observador (`O1`, `O2`…) para la hoja de concordancia. No se anotan nombres.

**B. En cada casa, antes de la primera carga**

El orden importa: la tara se toma con el contenedor vacío, antes de la capa base, y las dimensiones
antes de poner nada dentro.

1. **Forma y dimensiones internas** (`CONT_FORMA`, `CONT_LARGO`/`CONT_ANCHO` o `CONT_DIAM_SUP`/
   `CONT_DIAM_INF`, `CONT_ALTO`; §2.20).
2. **Tara del contenedor vacío, con tapa** (`CONT_TARA`, `CONT_TARA_MET`; §2.20). Si el contenedor no
   tiene fondo (`UBIC_TP` = `tierra`), no se toma: `CONT_TARA_MET` = `no_tomada` y el cierre será
   geométrico.
3. **PROPUESTA P-08:** marcar por dentro la **línea del 80 %** a la altura `ALT_80` = 0.8 × `CONT_ALTO`.
4. **Foto del sistema vacío** (`FOTO_EQ`), sólo el interior.
5. **El hogar pone la capa base** de material seco y la cuenta en botes (`D0_BASE`).
6. **Primera carga** (`D0_FECHA`) y Hoja 1 completa.

**Quién va:** una persona del equipo que **no vive en esa casa** (D3, RE-08).

**PROPUESTA P-02 — si el día 1 no es presencial en cada casa:**

| | Cómo | Qué se pierde | Recomendación |
| --- | --- | --- | --- |
| (a) | Visita breve del equipo a cada casa entre el día 0 y el día 1, sólo para los pasos B1–B4 | Nada; cuesta un traslado por casa | **Recomendada** |
| (b) | El hogar mide la tara con báscula de baño, por diferencia: se pesa solo y después cargando el contenedor vacío; mide las dimensiones con cinta | Exactitud: ± 0.5 kg o más en la tara, que en una pila de 15–30 kg es 2–3 % | Aceptable si (a) no es posible |
| (c) | Sin tara: método geométrico al cierre para ese hogar | El pesaje directo; queda la masa subestimada de la geometría | Último recurso |

### 1.4 Orden de cada carga diaria

Impreso en la Hoja 2. La medición va **después** de retirar y trocear (si no, se mide material que no
entra) y **antes** de echar (después ya no se puede medir).

1. Revisar y **retirar** lo que no va (plástico, vidrio, metal).
2. **Trocear** lo grande, a menos de 5 cm.
3. **Medir** en botes y **apuntar el número**, en enteros y medios.
4. **Echar** el orgánico.
5. **Cubrir** con 2 botes de seco por cada bote de orgánico (aumentable a 3, hoja guía).
6. **Tapar** el contenedor.

**Reglas de anotación** (impresas en la Hoja 2):

- Se anota **el día en que se echa**, no el día en que se generó (RE-01). Un día sin depósito es `0`:
  «hoy no agregué nada a la composta».
- Varias cargas el mismo día se suman en un renglón.
- **PROPUESTA P-03:** si no llega a medio bote, se guarda para el siguiente depósito.
- **Regla del 80 %** (RE-02, hoja guía): al llegar a la línea, se deja de echar, se anota el día en la
  Hoja 3 (`PARADA_DIA`) y desde entonces lo que no entra va a la fuga con «ya no cabía».
- **Día 28:** los residuos del día se guardan sin echarlos hasta que llegue el equipo (RE-06).

### 1.5 Orden del renglón semanal

Impreso en la Hoja 3. Es corto a propósito: **menos de un minuto** (§7). Ya no hace falta hacerlo
antes de echar nada, porque no observa el estado.

1. **Fecha** del renglón (`SFECHA`).
2. **Cómo anoté** la semana: una sola marca (`REG`).
3. **Lo que no llegó** a la composta, en botes; `0` si todo llegó (`FUGA`). Si es más de 0, **por qué**
   (`FUGA_MOT`).
4. **Material seco que usé** (`SECO_USO`).
5. **Personas** que comieron en casa casi todos los días (`PERS_S`) y **minutos** de la semana
   (`MIN_S`).
6. **Qué tan lleno** está el contenedor: una casilla (`LLEN_S`), mirando la línea del 80 % si existe.
7. **Qué hice** esta semana (`ACT`, **PROPUESTA P-04**).
8. **Nota** de la semana si alguna casilla la pide (`NOTA_S`).
9. **Entrega:** foto de las Hojas 2 y 3 al coordinador, por mensaje privado, sin ubicación
   (**PROPUESTA P-06**).

### 1.6 Orden de la visita de cierre del día 28 (RE-06)

**Preparación del hogar — la única que se pide:** guardar sin depositar los residuos del día hasta que
llegue el equipo. Sin eso no hay par DENS de entrada.

**Quiénes:** la persona del hogar que suele hacer la composta y una persona del equipo que **no vive
ahí**. Si el hogar es de una persona del equipo, la visita la hace **otra** persona del equipo
(RE-08).

**Duración estimada:** 45 a 60 minutos.

| Paso | Qué | Quién | Código | Por qué en este lugar |
| --- | --- | --- | --- | --- |
| 1 | **Abrir** la tapa, con los dos observadores delante | hogar | — | |
| 2 | **Mirar la tapa:** vaho o gotas | ambos | `VAHO` | Desaparece en segundos |
| 3 | **Oler una vez**, sin remover | ambos | `OLOR` | Remover libera olores que no estaban |
| 4 | **Temperatura:** sonda al centro, a 15 cm, sin remover; leer al estabilizarse (≥ 30 s); anotar hora y temperatura ambiente a la sombra | equipo | `TEMP_I`, `TEMP_PROF`, `VIS_HORA`, `TEMP_AMB` | Antes de mover el material |
| 5 | **Mirar la superficie** sin tocar | ambos | `FAU` (1.ª pasada) | |
| 6 | **Remover un poco** y volver a mirar | ambos | `FAU` (2.ª), `MEZ_AV`, `MEZ_TX` | |
| 7 | **Tomar un puño y apretar**, cada quien el suyo | ambos | `HUM` | |
| 8 | **Marcar por separado y sin hablar.** El hogar, en la Hoja 4 (estado, `OBS_MISMA` y `LLEN_F`); el equipo, en la Parte C de la hoja de concordancia. Nadie mira la hoja del otro hasta que los dos terminan | ambos | Hoja 4 · `CONC` | Concordancia sobre la pila real |
| 9 | **Pesaje** de la compostera completa, con tapa, entre dos personas | equipo + hogar | `PESO_BRUTO`, `PESO_MET` | Antes de sacar cualquier material |
| 10 | **Pares DENS:** residuo guardado (entrada), material seco principal de la semana y, si aplica, material de la pila | equipo | `DENS_*`, `DENS_SECO_*`, `DENS_PILA_*`, `RES_GUARDADO` | |
| 11 | **Altura de llenado:** nivelar la superficie con la mano sin apretar; cinco lecturas de borde a superficie (centro y cuatro lados) | equipo | `LLEN_REF` | Después de remover: se declara (§2.15) |
| 12 | **Foto** del interior, con las reglas de encuadre | equipo | `FOTO_EQ` | |
| 13 | **Muestras** de composta y de suelo, con su masa | equipo | `MUE_COMP_M`, `SUELO_*`, `MUE_SUELO_*` | Al final: alteran la pila y el suelo |
| 14 | **Cerrar:** devolver el material de la pila usado para densidad; el hogar echa el residuo guardado con su seco y lo anota en el renglón 28 | hogar | `ORG`, `SEC` (día 28) | El pesaje ya no lo incluye |

Después de la visita, el mismo día, el hogar contesta el resto de la Hoja 4 (cierre).

### 1.7 Después del día 28

1. Entrega de la Hoja 4 (fotografiada en la visita, P-06).
2. El coordinador **transcribe** papel y registro técnico con la app de captura (D5), por `data-valor`
   y nunca por posición.
3. La **bitácora del programa** se cierra con una entrada de cierre (RE-07).
4. Los criterios de éxito se calculan (`C1`…`C7`) **sin mirar antes** la tabla sellada de decisiones del
   Piloto 2; después se abre el sello (RE-11).
5. La coordinación asigna a cada hogar un **escenario de sitio de disposición** (`ESC_SITIO`) para la
   estimación de GEI, **fuera del repositorio** y junto con la lista de claves (§4, punto 11).
6. En los siete días siguientes a la visita, el equipo hace las pruebas de la muestra `H#-C0`
   (germinación, autocalentamiento adaptado) y, antes de cualquier aplicación, las pruebas de campo
   lentas del suelo (`diseno-mes-2-composta-suelo-gei.md` §4.2–§4.3).

---

## 2. Matriz del protocolo, variable por variable

Formato común: **quién y cuándo · procedimiento · opciones · si no se puede determinar · casos límite
· carga · validación · después del piloto.** Los apartados 2.1–2.11 actualizan v0.1; del 2.12 en
adelante son campos nuevos.

### 2.1 ORG — entrada a la composta

- **Quién y cuándo:** hogar, diario, paso 3 de §1.4.
- **Qué mide:** **botes echados a la composta ese día.** No mide generación (D1). Su indicador es la
  **entrada a la composta (L/persona/semana)**, `ENT_LPS`.
- **Procedimiento:** llenar el bote hasta el borde, **sin apretar, sin acomodar y sin sacudir**; contar
  botes en **enteros y medios**.
- **Si no se puede determinar:** anotar lo que se recuerde y decirlo en la nota del día.
- **Casos límite:** residuo guardado → se anota el día en que se echa. Menos de ½ bote → P-03. Después
  de `PARADA_DIA` → `0`, y lo que no entra va a `FUGA`. Día 28 → se echa después de la visita.
- **Carga:** menos de 15 segundos.
- **Validación:** par DENS de entrada del día 28 (§2.22).
- **Después del piloto:** conservar. Es la variable central.

### 2.2 SEC — material seco agregado

Igual que `ORG` en procedimiento y unidad. **Regla operativa:** 2 botes de seco por cada bote de
orgánico, aumentable a 3 (hoja guía). Desaparece el caso de la «semana de sólo medir» (D1): el vacío
significa lo mismo los 28 días.

### 2.3 REG — cómo se anotó la semana

- **Quién y cuándo:** hogar, semanal, paso 2 de §1.5.
- **Opciones:** `REG1` anoté todos los días · `REG2` me faltaron algunos. **«Marca sólo una»**, impreso
  (D-1).
- **Si no se puede determinar:** vacío → `ND`. Dos marcas → error de integridad I-4.
- **Después del piloto:** conservar. Sostiene el criterio de éxito #2.

### 2.4 VAHO — condensación al abrir

- **Quién y cuándo:** hogar y equipo, **día 28**, paso 2 de §1.6.
- **Opciones:** marcada / no marcada. Variable independiente, **no** un nivel de `HUM`.
- **Casos límite:** ambiente frío → la condensación aparece por diferencia térmica; ahora se puede leer
  junto con `TEMP_I` y `TEMP_AMB` de la misma visita.
- **Después del piloto:** conservar si se relaciona con `TEMP_I`.

### 2.5 HUM — humedad percibida

- **Quién y cuándo:** hogar y equipo, **día 28**, paso 7 de §1.6. Cada observador toma su propio puño.
- **Opciones:** `H1`–`H5`. **Ordinal** (D4): se resume con mínimo y máximo.
- **Multimarca:** permitida (superficie y fondo difieren).
- **Capacitación:** estaciones del día 1 (hoja de concordancia, Parte A).
- **Después del piloto:** conservar; aplicar la regla preespecificada de §7.2 si `H3`/`H4` no se
  distinguen.

### 2.6 OLOR

- **Quién y cuándo:** hogar y equipo, **día 28**, paso 3 de §1.6, **antes de remover**.
- **Opciones:** `O0`–`O5`; `O5` exige `NOTA_E`. **Nominal.**

### 2.7 FAU — quién vive en la composta

- **Quién y cuándo:** hogar y equipo, **día 28**, pasos 5 y 6 de §1.6.
- **Umbral de conteo:** se marca lo que se vio **más de una vez o en más de dos individuos**.
- **Opciones:** `F01`–`F11`, `F12` (exige `NOTA_E`), `F00`. **Nominal**; `F00` excluye a las demás.
- **Ayuda visual:** la hoja guía (E-2), con rasgos diagnósticos en texto.
- **Confiabilidad:** la variable más débil. El panel de fotos (§7.2) la prueba antes del arranque, con
  la agrupación preespecificada si falla.

### 2.8 MEZ — cómo se ve la mezcla

- **Quién y cuándo:** hogar y equipo, **día 28**, paso 6 de §1.6.
- **Dos ejes separados por una línea visible en el papel (D-3):** avance `M1`–`M3` (**ordinal**) y
  textura `X1`–`X3` (**nominal**, D4).

### 2.9 ACT — qué hizo el hogar — **PROPUESTA P-04: semanal**

- **Quién y cuándo:** hogar, semanal, paso 7 de §1.5 (si el comité elige la alternativa: una vez, en la
  Hoja 4).
- **Opciones:** `A0`–`A5`; `A4` y `A5` exigen `NOTA_S`; `A0` excluye a las demás. **Nominal.**
- **Límite asumido:** sin orden dentro de la semana. Con el estado observado sólo el día 28, `ACT` ya
  no se cruza con un estado semanal en el mes 1: sirve para describir la rutina y para elegir el
  extremo bajo o alto del factor de emisión casero (`A1`, semanas con mezclado;
  `diseno-mes-2-composta-suelo-gei.md` §4.4). El cruce estado → acción → estado es del mes 2.

### 2.10 TEMP_I — temperatura instrumental

- **Quién y cuándo:** equipo, **día 28**, paso 4 de §1.6.
- **Procedimiento:** sonda al centro del montón, a 15 cm (`TEMP_PROF`), sin remover; leer cuando la
  lectura se estabilice (al menos 30 s). Anotar `VIS_HORA` y `TEMP_AMB` a la sombra en ese momento.
- **Resolución:** **la del instrumento** (RE-05). Si no muestra décimas, no se escriben.
- **Para qué:** objetivo **E**, en lectura exploratoria: cinco lecturas, una por hogar.
- **Restricción:** el hogar nunca toma esta medida.

### 2.11 Notas libres

- `NOTA_D` (diaria), `NOTA_S` (semanal) y `NOTA_E` (día 28). Acotadas a la composta, en el encabezado
  y al pie.
- **Obligatoriedad condicional:** `NOTA_S` por `FG5`, `SECO_USO` = `otro`, `A4`, `A5`; `NOTA_E` por
  `O5` y `F12`.

### 2.12 FUGA y FUGA_MOT — lo que no llegó a la composta *(nuevo, D1)*

- **Quién y cuándo:** hogar, semanal, paso 3 de §1.5.
- **Procedimiento:** recordar los restos de comida que **se separaron o se pudieron separar** esa
  semana y **no** se echaron a la composta, y estimarlos en botes, enteros y medios. **Escribir `0` si
  todo llegó.** Si es más de 0, marcar todos los motivos que apliquen.
- **Opciones del motivo:** `FG1` ya no cabía · `FG2` no tenía material seco · `FG3` se fueron a
  animales · `FG4` se fueron a la basura · `FG5` otro (**exige nota**). Sin motivos de rutina del hogar.
- **Si no se puede determinar:** vacío → `NC`; el hogar puede no querer contestarlo.
- **Casos límite:** residuo guardado para otro día → **no** es fuga (llegará). Desde `PARADA_DIA` → todo
  lo no depositado es fuga con `FG1`. Restos que se dieron a un animal de la casa → `FG3` aunque
  `MASC` diga «no» (se marca como señal, I-14).
- **Error que se declara:** estimación de memoria, semanal, sin el gesto de llenado. **Cota inferior**
  de la generación: lo que nunca se separó no aparece.
- **Carga:** 10–15 segundos.
- **Después del piloto:** conservar si la fuga resulta mayor que el error de su propia estimación;
  si es casi siempre `0`, reducir a una pregunta de cierre.

### 2.13 SECO_USO — material seco usado *(nuevo, RE-03)*

- **Quién y cuándo:** hogar, semanal, paso 4 de §1.5.
- **Opciones:** `hojas` · `carton` · `papel` · `aserrin` · `otro` (exige nota) · `ninguno`
  (**PROPUESTA P-21**, excluye a las demás). **Nominal.**
- **Casos límite:** un material que no estaba en `SECO_DISP` → se marca igual; dice que la
  disponibilidad cambió.
- **Validación:** par DENS de seco del día 28 sobre el material principal de la última semana.
- **Después del piloto:** conservar; responde «¿qué material seco se usó?» y, con densidades,
  convierte `RAZON` a masa.

### 2.14 PARADA_DIA — día en que se dejó de agregar *(nuevo, RE-02)*

- **Quién y cuándo:** hogar, **una vez**, cuando ocurre; casilla al pie de la Hoja 3.
- **Opciones:** número de día 1…28, o la casilla «no hizo falta parar» (`no_paro`).
- **Casos límite:** el hogar paró y volvió a echar porque la pila bajó → se anota el **primer** día de
  parada y se cuenta en la nota de esa semana; los `ORG` > 0 posteriores se marcan como señal (I-11).
- **Después del piloto:** conservar; es el dato más directo para dimensionar el contenedor.

### 2.15 LLEN_S, LLEN_F y LLEN_REF — llenado *(cambiados y nuevo, D-2, RE-04)*

- **`LLEN_S`** (hogar, semanal): **cuatro casillas**, marca una (`1/4` · `1/2` · `3/4` · `casi_lleno`).
- **`LLEN_F`** (hogar, día 28): cinco casillas, marca una; se marca en el paso 8 de §1.6, **antes** de
  que el equipo mida la altura.
- **`LLEN_REF`** (equipo, día 28, paso 11): nivelar la superficie con la mano, sin apretar; medir con
  regla la distancia del borde a la superficie en el centro y cerca de cada lado (cinco lecturas);
  `LLEN_REF` = `CONT_ALTO` − promedio, en cm.
- **Par percepción–medición:** `LLEN_F` ↔ `LLEN_FRAC` (= `VOL_OCUP` / `CONT_VOL`).
- **Error que se declara:** la altura se mide después de remover (orden de RE-06); el removido afloja la
  pila y la altura puede ser mayor que en reposo.

### 2.16 D0_FECHA, D0_BASE, D0_VACIO — día 0 *(nuevo, D6)*

- **Quién y cuándo:** hogar, día 1, paso B5–B6 de §1.3.
- **Casos límite:** contenedor que ya tenía composta → `D0_VACIO` = `con_material`; el balance de masa
  del cierre no puede suponer arranque vacío (I-21).

### 2.17 OBS_MISMA — observador *(nuevo, E-4)*

- **Quién y cuándo:** hogar, día 28, paso 8 de §1.6. «Esta revisión la hizo la misma persona de siempre:
  sí / no». Neutra: no pide quién.
- **Semanal:** **PROPUESTA P-05**, con recomendación de no hacerlo.

### 2.18 CUELLO — lo que más limitó el mes *(nuevo, D2 — PROPUESTA P-22)*

- **Quién y cuándo:** hogar, día 28, cierre.
- **Opciones:** conseguir material seco · espacio en el contenedor · tiempo · llevar el registro ·
  separar los restos en la cocina · otro (escribir) · nada en particular. **Marca una.**
- **Para qué:** criterio de éxito #5. No hay respuesta «correcta»: «nada en particular» también cuenta.

### 2.19 BOTE_CAP — capacidad del bote por masa de agua *(cambiado, D3)*

- **Quién y cuándo:** equipo, día 1, sesión de arranque.
- **Procedimiento:** báscula de cocina verificada (§2.25). Pesar el bote **vacío y seco** (`BOTE_TARA`).
  Llenarlo de agua **hasta el borde**, sin que desborde, apoyado en la báscula, y pesar (`BOTE_AGUA`).
  `BOTE_CAP` = (`BOTE_AGUA` − `BOTE_TARA`) / 1000 L, porque 1 g de agua ≈ 1 mL. Igual para el
  recipiente del seco si es otro.
- **Error:** menor de 0.5 % por la temperatura del agua; el error real lo pone el «hasta el borde»,
  que es el mismo gesto que el hogar usará.
- **Límite de la báscula:** ≥ 5 kg. Un bote de más de ~4.5 L no se puede medir así: es otra razón para
  orientar a botes de ~1 L (RE-01).

### 2.20 Geometría y tara del contenedor *(nuevo, D3, RE-04)*

- **Quién y cuándo:** equipo, día 1, en casa (§1.3 B), o según P-02.
- **Dimensiones internas:** regla o cinta rígida, por dentro. `rect`: largo y ancho a media altura.
  `cil`: diámetro en la boca. `cubeta`: diámetro en la boca y en el fondo. `CONT_ALTO`: del fondo
  interior —o del suelo, si no tiene fondo— al borde, en el centro.
- **Tara:** báscula de plataforma verificada; contenedor **vacío y con tapa**, en la misma
  configuración en que se pesará el día 28.
- **Casos límite:** contenedor de forma irregular → `CONT_FORMA` = `otra`, se descompone en piezas
  regulares y se explica en `VIS_NOTA`. Sin fondo → `CONT_TARA_MET` = `no_tomada`.

### 2.21 Pesaje del día 28 y método geométrico *(nuevo, D3)*

- **Pesaje (`PESO_MET` = `bascula`):** compostera completa con tapa sobre la báscula de plataforma,
  levantada entre dos personas; `PESO_NETO` = `PESO_BRUTO` − `CONT_TARA`.
- **Método geométrico (`PESO_MET` = `geometrico`)**, cuando no tiene fondo o pesa más de lo que admite
  la báscula: `MASA_GEOM` = volumen ocupado (área interna × `LLEN_REF`) × densidad aparente de una
  muestra de la pila (`DENS_PILA`). **Declaración obligatoria:** la densidad de una muestra suelta
  **subestima** la densidad in situ; `MASA_GEOM` es una cota inferior.
- **PROPUESTA P-09 (`ambos`):** aplicar también la geometría en las que se pesan, para medir ese
  sesgo en cinco pares.
- **Masa de las muestras:** toda muestra extraída se pesa (RE-06); el balance la resta.

### 2.22 Pares de densidad — entrada, seco y pila *(cambiado y nuevo, D3, RE-03)*

- **Quién y cuándo:** equipo, día 28, paso 10 de §1.6.
- **Entrada (`DENS_V`, `DENS_M`, `DENS_T`):** el residuo guardado del día, en el bote del hogar, con
  **el mismo gesto de llenado** que usa el hogar. Si no llena el bote, se nivela sin apretar, se mide
  con regla el espacio vacío y se calcula el volumen, o se usa un recipiente calibrado del equipo de
  0.5 L.
- **Seco (`DENS_SECO_*`):** un bote del material seco principal de esa semana, con el mismo gesto;
  `DENS_SECO_TIPO` dice cuál.
- **Pila (`DENS_PILA_*`):** un bote de material de la pila removida, sin apretar; vuelve a la pila.
- **Restricción de privacidad:** se pesa y se mide volumen; **no se describe el contenido**.
- **Alcance:** cinco pares de cada uno, un solo momento. La conversión L→kg es **exploratoria**: se
  reporta como rango y se contrasta con EPA 2016 (residuo de alimentos suelto ≈ 0.27 kg/L; hojas
  sueltas 0.15–0.30; aserrín ≈ 0.16; cartón aplanado ≈ 0.06).

### 2.23 RES_GUARDADO *(nuevo, RE-06)*

- `si` · `no` · `no_hubo` (ese día no hubo residuo). Con `no` o `no_hubo` el par de entrada queda `ND`
  (§3).

### 2.24 Muestras de composta y suelo *(nuevo, A-3, mes 2)*

- **Quién y cuándo:** equipo, día 28, paso 13 de §1.6 —o, para el suelo, otro día **antes de cualquier
  aplicación**—.
- **Composta:** muestra compuesta de varios puntos de la pila removida; se pesa (`MUE_COMP_M`) y se
  etiqueta `H#-C0`.
- **Suelo:** dos parches contiguos o dos macetas iguales (`P1`, `P2`); cuál recibe composta se decide
  con un volado (**PROPUESTA P-14**) y se anota (`SUELO_CON`). Muestra compuesta de `SUELO_SUB`
  submuestras a profundidad fija (`SUELO_PROF`) por parche; se pesan y se etiquetan `H#-S-P1-0` y
  `H#-S-P2-0`.
- **Sin suelo:** `SUELO_TIPO` = `sin_suelo` (**PROPUESTA P-23**).
- **Detalle de método:** `diseno-mes-2-composta-suelo-gei.md` §4.2–§4.3.

### 2.25 Verificación de instrumentos *(nuevo, RE-05)*

Cada día de medición, **antes de la primera casa**, una fila por instrumento:

| Instrumento | Especificación mínima | Comprobación | Tolerancia |
| --- | --- | --- | --- |
| Termómetro de sonda | Vástago ≥ 15 cm; exactitud declarada por el fabricante | Agua con mucho hielo picado, agitada, 2 min | 0 °C ± la exactitud declarada (± 1 °C si no la declara) |
| Báscula de cocina | ≥ 5 kg; resolución 1 g | 1 L de agua medido con una jarra graduada, sobre un recipiente tarado | 1000 g ± 10 g (la incertidumbre la pone la jarra) |
| Báscula de plataforma | Capacidad ≥ `CONT_CAP` × 0.8 × ~0.7 kg/L (**supuesto**) + tara; resolución ≤ 0.1 kg | Garrafón de agua de volumen conocido (p. ej. 20 L ≈ 20 kg) | ± 1 % |

Si un instrumento falla (`VER_OK` = `no`), no se usa ese día; si ya se usó, todas sus lecturas llevan
la señal I-26.

### 2.26 Hoja de concordancia *(nuevo, RE-12)*

Procedimiento en §7.2 y en la propia hoja.

---

## 3. Prueba de estrés

Los escenarios de v0.1, revisados contra F-HOG rev. 03, y los nuevos que pide el acta.

| Escenario | ¿Resuelto? | Cómo |
| --- | --- | --- |
| Seca en la superficie, húmeda debajo | **Sí** | Multimarca; `HUM` es ordinal y se resume como rango (D4) |
| Se observó una sola mosca | **Sí** | Umbral: más de una vez o más de dos individuos |
| Larvas que no se saben identificar | **Sí** | `F12` + ayuda visual de la hoja guía |
| Fría antes de agregar, tibia horas después | **Sí** | Una sola lectura, con hora y en un orden fijo (§1.6) |
| Residuos dos veces el mismo día | **Sí** | Se suman en un renglón |
| Bote compactado un día y no otro | **Sí** | Gesto de llenado fijo, también para el equipo |
| Se mezcló la pila después de percibir olor | **Sí el día 28; parcial en el mes** | El orden de §1.6 fija oler antes de remover; `ACT` semanal no tiene orden interno |
| Se marcó «otro» sin escribir | **Parcial** | Nota condicional; se marca como señal (I-7, I-8) |
| El hogar no llenó el renglón de una semana | **Sí** | Columna vacía = `NR` |
| Hogar sin depósito un día | **Sí** | `0` = «hoy no agregué nada a la composta» (RE-01) |
| Dos personas de la misma casa | **Parcial** | `OBS_MISMA` el día 28; semanal sólo si se aprueba P-05 |
| **Nuevo · compostera llena antes del día 28** | **Sí** | Regla del 80 % → `PARADA_DIA`; desde ahí, `FUGA` con `FG1`; ningún segundo contenedor en el mes 1 (P-10). Ver la estimación abajo |
| **Nuevo · depósito cada dos días** | **Sí** | El residuo se anota el día en que se echa; los días intermedios son `0`, no renglón vacío. El criterio #1 cuenta el `0` como registrado |
| **Nuevo · menos de ½ bote** | **Sí, si se aprueba P-03** | Se guarda para el siguiente depósito. Sin P-03: ½ (sobreestima) |
| **Nuevo · visita sin residuos guardados** | **Parcial** | `RES_GUARDADO` = `no`; si el hogar acepta, se usa residuo disponible en la cocina ese día; si no hay, el par de entrada es `ND` y quedan cuatro pares |
| **Nuevo · compostera sin fondo** | **Sí** | `UBIC_TP` = `tierra` → `CONT_TARA_MET` = `no_tomada` → `PESO_MET` = `geometrico`, con el sesgo declarado |
| **Nuevo · hogar del equipo** | **Sí** | `ESTRATO_EQ` fuera del repositorio; fuera de concordancia y legibilidad; su visita la hace otra persona del equipo (RE-08) |
| Nuevo · el equipo no pudo visitar en la ventana | **Pendiente del comité** | Ventana P-01; `VIS_OK`; si cae después del día 28, lo echado después se anota en la nota del renglón 28 |
| Nuevo · la pila baja después de parar y vuelve a caber | **Sí** | `PARADA_DIA` es el primer día de parada; los `ORG` posteriores se marcan (I-11) |
| Nuevo · se acaba el material seco | **Sí** | `FG2` si no se echó orgánico por eso; `SECO_USO` = `ninguno`; `SECO_FALT` al cierre |
| Nuevo · el hogar se va de viaje una semana | **Sí, sin preguntarlo** | No hay residuo que echar: `ORG` = 0, `FUGA` = 0, `PERS_S` lo refleja. **No existe motivo «viaje»** (D1, privacidad) |
| Nuevo · la lluvia entra al contenedor | **Parcial** | `NOTA_D`; `UBIC_TL`; el pesaje del día 28 incluye esa agua y se declara |
| Nuevo · la composta ya tenía material | **Sí** | `D0_VACIO` = `con_material` (I-21) |

**Estimación gruesa — ¿cuándo llega una compostera de 60 L al 80 %?** *(supuestos, no datos)*

```
semanas hasta el 80 % ≈ (0.8 × V_contenedor − V_capa_base) / (V_org_semanal × (1 + r) × f)
```

- `V_org_semanal`: orgánico que entra por semana, en litros. **Supuesto ilustrativo:** 10 L.
- `r`: botes de seco por bote de orgánico. Regla: 2.
- `f`: fracción del volumen echado que sigue ocupando lugar al final de la semana (asentamiento y
  descomposición). **Supuesto:** 0.5; es el más incierto (0.3–0.7).
- `V_capa_base`: **supuesto** 6 L (unos 10 cm en un contenedor pequeño).

Con esos supuestos: (48 − 6) / (10 × 3 × 0.5) ≈ **2.8 semanas**. Con 15 L de orgánico por semana,
≈ 1.9 semanas; con `f` = 0.3, ≈ 4.7 semanas. La cifra de RE-02 («hacia la semana 3») es coherente
con los supuestos centrales y **queda por verificar**: `RED_VOL` del día 28 da el primer valor medido
de `f`.

---

## 4. Restricciones de privacidad que este protocolo impone

Las ocho de v0.1 siguen **intactas**:

1. **No se registra qué se come en la casa**, tampoco por el equipo al pesar.
2. **La hoja no lleva identificadores directos.** Sólo `H__`. La lista de claves la guarda únicamente la
   coordinación, fuera del chat y fuera de la nube.
3. **El registro del equipo usa la misma clave y tampoco lleva nombres.**
4. **Cualquier pregunta puede quedar en blanco.**
5. **Los campos de texto libre se acotan a la composta.**
6. **Las fotografías encuadran sólo el interior del contenedor**, sin personas, fachadas ni placas, con
   la ubicación de la cámara desactivada.
7. **`H1`–`H5` es seudonimización, no anonimización.** Lo que sale del grupo va agregado.
8. **El día del renglón semanal (`DREV`) no se comparte fuera del equipo.**

**Extensión v0.2:**

9. **Muestras etiquetadas sólo con `H#`** y un sufijo de tipo y momento: `H#-C0` (composta, línea
   base), `H#-S-P1-0` / `H#-S-P2-0` (suelo, parche, línea base); los momentos siguientes cambian el
   último dígito. **Sin coordenadas, sin dirección y sin descripción del lugar.** El laboratorio, si lo
   hay, recibe sólo la etiqueta.
10. **Fotos sin ubicación**, del hogar y del equipo. Antes de guardarlas con los datos se comprueba que
    no lleven coordenadas en sus metadatos. Las fotos del suelo encuadran sólo el suelo muestreado.
11. **Nada de hogar ↔ municipio en el repositorio.** La asignación de escenarios de disposición para
    la estimación de GEI (`ESC_SITIO`) vive con la lista de claves.
12. **Sin nombres del equipo ni de los observadores** en el repositorio: claves `E#` y `O#`. El
    calendario de §6 usa sólo claves.
13. **Hogares del equipo:** el repositorio dice cuántos son (tres), nunca cuáles. El estrato vive fuera
    del repositorio (`ESTRATO_EQ`).
14. **Bitácora del programa:** contenido sin datos personales; los registros no entran al repositorio.
15. **Pre-registro:** el contenido de la tabla de decisiones del Piloto 2 no entra al repositorio antes
    del cierre; sólo su hash.
16. **Canal de entrega:** sea cual sea la decisión (P-06), **nunca un chat de grupo** y siempre sin
    ubicación.
17. **Fuga sin rutina del hogar:** no hay motivo que describa viajes, ausencias ni visitas.

---

## 5. Conflictos y decisiones — estado

### 5.1 Lo que v0.1 dejó pendiente y el acta-01 resolvió

| v0.1 | Tema | Resolución |
| --- | --- | --- |
| §5.1 | Calendario de pesaje y temperatura | **D3**: día 1 + día 28. Fechas en §6, `[por definir]` |
| §5.2 | Semana 1 | **D1**: se composta desde el día 1 |
| §5.3 | Reducción de la multimarca | **D4**: rango sólo en ordinales |
| §5.4 | Resolución diaria | **Superado por A-1**: el estado es mensual en el mes 1. La cadencia del mes 2 está en `diseno-mes-2-composta-suelo-gei.md` (P-16) |
| §5.5 | Ayuda visual de fauna | **E-2**: en la hoja guía |
| §5.6 | Quién observa | **E-4**: `OBS_MISMA` el día 28; semanal, P-05 |
| §5.7 | Criterios de éxito | **D2**: siete criterios de proceso |
| §5.8 | Canal de entrega | **Sigue abierto: P-06** |

### 5.2 PROPUESTAS que tocan este protocolo

P-01 (ventana), P-02 (día 1 no presencial), P-03 (< ½ bote), P-04 (`ACT` semanal), P-05 (observador
semanal), P-06 (canal), P-08 (línea del 80 %), P-09 (doble método), P-10 (segundo contenedor), P-12
(umbrales de concordancia), P-13 (evaluadores externos), P-14 (volado del parche), P-21 (`ninguno` en
`SECO_USO`), P-22 (`CUELLO`), P-23 (hogar sin suelo). Recomendaciones y alternativas en el acta-01 §6.

### 5.3 Notas de análisis que este protocolo obliga a leer

- **Generación estimada = entrada + fuga**, autorreportada y **cota inferior**. Siempre con su error.
- **Reactividad (RE-09):** medir el desperdicio lo reduce por sí solo (Ramos et al. 2024, *British Food
  Journal* 126(2):812–833). Una tendencia descendente de la entrada **no** se interpreta sin más como
  fatiga o sub-registro.
- **Densidad:** cinco pares por tipo, un momento. La conversión L→kg es exploratoria y se da como rango.
- **Concordancia:** acuerdo bruto y tablas de confusión primero; kappa sólo como dato secundario.
- **Hogares del equipo:** tres de cinco. Lo que se diga de «los hogares» debe poder sostenerse también
  en los dos voluntarios, o decirse que no.

---

## 6. Calendario — sesión del día 1 y visita de cierre

La estructura está decidida (D3). **Fechas y personas: `[por definir]`.** «Quién va» lleva una **clave
de equipo** (`E1`, `E2`, `E3`); la correspondencia clave ↔ persona la guarda la coordinación, fuera del
repositorio.

| Hogar | Actividad | Fecha | Ventana | Quién va |
| --- | --- | --- | --- | --- |
| Todos | Sesión de arranque, grupal y presencial (§1.3 A) | `[por definir]` | — | `[por definir]` |
| H1 | Medición en casa del día 1 (§1.3 B) | `[por definir]` | día 0–1 (P-02) | `[por definir]` |
| H2 | Medición en casa del día 1 | `[por definir]` | día 0–1 | `[por definir]` |
| H3 | Medición en casa del día 1 | `[por definir]` | día 0–1 | `[por definir]` |
| H4 | Medición en casa del día 1 | `[por definir]` | día 0–1 | `[por definir]` |
| H5 | Medición en casa del día 1 | `[por definir]` | día 0–1 | `[por definir]` |
| H1 | Visita de cierre (§1.6) | `[por definir]` (día 28) | días 26–28 (P-01) | `[por definir]` |
| H2 | Visita de cierre | `[por definir]` (día 28) | días 26–28 | `[por definir]` |
| H3 | Visita de cierre | `[por definir]` (día 28) | días 26–28 | `[por definir]` |
| H4 | Visita de cierre | `[por definir]` (día 28) | días 26–28 | `[por definir]` |
| H5 | Visita de cierre | `[por definir]` (día 28) | días 26–28 | `[por definir]` |

**Condiciones que se fijan junto con las fechas:**

- **Nadie del equipo visita su propia casa.** Con tres hogares del equipo, cada uno lo visita otra
  persona del equipo. La coordinación lo comprueba fuera del repositorio.
- **Hora:** se anota siempre (`VIS_HORA`); de preferencia, la misma franja horaria en todas las casas,
  porque `TEMP_I` depende de la hora.
- **Capacidad:** cinco visitas de 45–60 minutos en tres días, más traslados, con tres personas del
  equipo: ninguna persona hace más de dos visitas de cierre.
- **Si no se puede visitar en la ventana:** se repone en los días 29–30 (`VIS_OK` = `repuesta`) y el
  hogar anota en la nota del renglón 28 lo que echó después; si tampoco, `VIS_OK` = `no_se_pudo` y se
  pierden los datos del equipo de ese hogar, **pero no** la Hoja 4, que el hogar llena igual.
- **Sesión del día 1:** necesita un lugar donde poner 4–5 cubetas de estaciones y una báscula. El plan
  la describía como videollamada (acta-01 §7, discrepancia 3).

---

## 7. Pruebas de usabilidad antes de congelar

**Quiénes participan:** los **dos hogares voluntarios** y, donde se indica, **evaluadores externos**
que no hayan visto el instrumento. Los tres hogares del equipo **no** participan como observadores
ingenuos (RE-08): conocen las categorías porque las diseñaron o las discutieron.

### 7.1 Pruebas de carga

| # | Prueba | Cómo | Criterio |
| --- | --- | --- | --- |
| 1 | **Renglón semanal** | Una semana simulada (con Hoja 2 llena) y el renglón de la Hoja 3, cronometrado | **≤ 1 minuto** |
| 2 | **Revisión del día 28** | Pasos 1–8 de §1.6 sobre una pila real o preparada; se cronometra sólo el marcado del paso 8 en la Hoja 4 | **≤ 5 minutos** |
| 3 | Llenado diario | Tres días simulados de la Hoja 2 | < 1 minuto por día |
| 4 | **Legibilidad** | Lectura en voz alta de las Hojas 1, 3 y 4 por alguien que no participó en su redacción (voluntario o externo) | Cero preguntas entendidas de otra forma; si las hay, se reescriben |
| 5 | **Transcripción cronometrada** | Una persona transcribe una ficha completa (cuatro hojas + registro técnico) a la captura | Minutos por ficha → **carga del coordinador en el Piloto 2** (= minutos × hogares × fichas); casillas ambiguas contadas |

### 7.2 Concordancia (objetivo B) — hoja de concordancia

Tres fuentes (RE-12): **A. estaciones** de humedad en la sesión del día 1; **B. panel de 15–20 fotos**
de interior de pilas aerobias para `FAU` y `MEZ`; **C. observación simultánea del día 28** (dos pares
útiles, por RE-08).

**Qué se reporta:** acuerdo bruto (proporción de coincidencias) con la referencia (A) o entre
observadores ingenuos (B, C), y **tablas de confusión** por variable. **Kappa sólo como dato
secundario**, porque se comporta mal cuando domina una categoría (Feinstein & Cicchetti 1990, *J Clin
Epidemiol* 43:543–549).

**Umbrales y cambios preespecificados — PROPUESTA P-12.** Se escriben ahora, antes de ver datos, y se
aplican **en el análisis**, sin reimprimir el papel, para que la prueba no retrase el arranque:

| Variable | Fuente | Se mantiene si | Si falla, se aplica |
| --- | --- | --- | --- |
| `HUM` | A | Acuerdo con la referencia ≥ 70 % | Se agrupa en tres niveles: seca (`H1`) · húmeda sin agua libre (`H2`) · con agua (`H3`+`H4`+`H5`) |
| `FAU` | B | Acuerdo ≥ 70 % en un grupo | Ese grupo se fusiona según la agrupación preespecificada: lombrices (`F01`) · descomponedores visibles (`F02`+`F03`) · larvas grandes y moscas (`F04`+`F07`) · insectos pequeños de superficie (`F05`+`F06`) · hormigas y cucarachas (`F08`+`F09`); `F10`, `F11`, `F12` y `F00` no cambian |
| `MEZ_AV` | B | Acuerdo ≥ 70 % | `M2`+`M3` se fusionan |
| `MEZ_TX` | B | Acuerdo ≥ 70 % | Se reporta sólo «apelmazada sí/no» (`X2`) |
| `OLOR`, `VAHO` | C | — | Sólo descriptivo: dos pares no sostienen un umbral |

**PROPUESTA P-13:** ampliar la fuente B con evaluadores externos (`CONC_ROL` = `externo`), porque con
dos hogares voluntarios el número de observadores ingenuos es muy bajo.

---

## 8. Qué se congela y qué no

- **Se congela** al terminar §7 y resolver las PROPUESTAS que bloquean (acta-01 §8): los textos de las
  casillas de F-HOG rev. 03, sus códigos y `data-valor`, el orden de las secciones y las definiciones
  operacionales de §2.
- **No se congela:** las fechas de §6, que pueden reprogramarse; la agrupación de `FAU`, que §7.2 prevé
  aplicar si falla; y la cadencia del mes 2.
- **Cambiar algo congelado** obliga a subir el sello a **F-HOG rev. 04**, emitir un diccionario v0.4 y
  revisar la tabla de correspondencia (RE-10).
