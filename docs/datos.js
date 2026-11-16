// GENERADO por tools/generar-datos.js a partir de ficha/diccionario-de-datos-v0.3-borrador.md.
// No editar a mano: cambia el diccionario y ejecuta `npm run datos`.
(function (global) {
  "use strict";
  const DATOS = {
   "diccionario": "v0.3",
   "ficha_rev": "03",
   "hogares": [
    "H1",
    "H2",
    "H3",
    "H4",
    "H5"
   ],
   "campos": [
    {
     "codigo": "ID",
     "pantalla": "h1",
     "instr": [
      "F-HOG",
      "RT"
     ],
     "etiqueta": "Hogar H___",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "opción",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "FINI",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Inicio ___/___/2026",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "fecha",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "FICHA_REV",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Sello del pie: F-HOG rev. NN",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "opción",
     "vocabulario": "FICHA_REV",
     "ausencias": []
    },
    {
     "codigo": "DREV",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Día del renglón semanal",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "DREV",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "PERS0",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Personas que comen en casa la mayoría de los días",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "MASC",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Durante el piloto, parte de los restos se va a animales de la casa",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "MASC",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "DPRE",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Antes de este piloto, ¿qué camino seguían los restos?",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "DPRE",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "DPRE_OTRO",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Otro: ___",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "BOTE_DESC",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Mi bote de medida es",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "BOTE_CAP",
     "pantalla": "h1",
     "instr": [
      "F-HOG",
      "RT"
     ],
     "etiqueta": "Capacidad medida por el equipo ___ L",
     "quien": "**equipo**",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "BOTE_SEC_MISMO",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Uso el mismo bote para el seco",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "bool",
     "vocabulario": "BOTE_SEC_MISMO",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "BOTE_SEC_DESC",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Otro recipiente ___",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "BOTE_SEC_CAP",
     "pantalla": "h1",
     "instr": [
      "F-HOG",
      "RT"
     ],
     "etiqueta": "___ L",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONT_TIPO",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Contenedor: tipo",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CONT_CAP",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Contenedor: capacidad",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CONT_CAP_ND",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "□ no la sé",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "bool",
     "vocabulario": "CONT_CAP",
     "ausencias": []
    },
    {
     "codigo": "UBIC_IE",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Interior · Exterior",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "UBIC_IE",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "UBIC_SS",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Sol · Sombra",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "UBIC_SS",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "UBIC_TL",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Techado · A la lluvia",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "UBIC_TL",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "UBIC_TP",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Sobre tierra · Sobre piso firme",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "UBIC_TP",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "SECO_DISP",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Material seco con el que cuento",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "SECO_DISP",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "SECO_DISP_OTRO",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Otro: ___",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "SECO_ACC",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Conseguir material seco me resulta",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "SECO_ACC",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "SECO_RES",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Reserva de material seco al arrancar",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "D0_FECHA",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Fecha de la primera carga",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "fecha",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "D0_BASE",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Botes de material seco en la capa base",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "D0_VACIO",
     "pantalla": "h1",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "El contenedor arrancó",
     "quien": "hogar",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "D0_VACIO",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "DIA",
     "pantalla": "h2",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Día",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "num",
     "ausencias": []
    },
    {
     "codigo": "FECHA",
     "pantalla": "h2",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Fecha día / mes",
     "quien": "hogar",
     "cuando": "diario",
     "tipo": "fecha",
     "ausencias": [
      "NR"
     ]
    },
    {
     "codigo": "ORG",
     "pantalla": "h2",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Orgánico que eché a la composta",
     "quien": "hogar",
     "cuando": "diario",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NR"
     ]
    },
    {
     "codigo": "SEC",
     "pantalla": "h2",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Seco que eché encima",
     "quien": "hogar",
     "cuando": "diario",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NR",
      "NC"
     ]
    },
    {
     "codigo": "NOTA_D",
     "pantalla": "h2",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "¿Algo que quieras contar de hoy?",
     "quien": "hogar",
     "cuando": "diario",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "SEM",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Columna S1…S4",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "opción",
     "abierta": true,
     "ausencias": []
    },
    {
     "codigo": "SFECHA",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Fecha de este renglón",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "fecha",
     "ausencias": []
    },
    {
     "codigo": "REG",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Cómo anoté esta semana · marca sólo una",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "opción",
     "vocabulario": "REG",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "FUGA",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Botes que esta semana no llegaron a la composta · escribe 0 si todo llegó",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "FUGA_MOT",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "¿Por qué no llegaron? · marca todas las que apliquen",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "FUGA_MOT",
     "ausencias": [
      "NA",
      "NC"
     ]
    },
    {
     "codigo": "SECO_USO",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Material seco que usé esta semana · marca todos",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "SECO_USO",
     "excluyente": "ninguno",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "PERS_S",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Personas que comieron en casa casi todos los días",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "MIN_S",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Minutos que le dediqué a la composta en toda la semana",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "LLEN_S",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Qué tan lleno está el contenedor · marca una",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "opción",
     "vocabulario": "LLEN_S",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ACT",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "¿Qué hiciste esta semana? · marca todo",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "ACT",
     "excluyente": "A0",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "NOTA_S",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Lo que quieras contar de esta semana",
     "quien": "hogar",
     "cuando": "semanal",
     "tipo": "texto",
     "especiales": "NOTA_S",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "PARADA_DIA",
     "pantalla": "h3",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Dejé de agregar residuos el día ___ · □ no hizo falta parar",
     "quien": "hogar",
     "cuando": "una vez",
     "tipo": "num",
     "especiales": "PARADA_DIA",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "FCIE",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Fecha del cierre",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "fecha",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "OBS_MISMA",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Esta revisión la hizo la misma persona de siempre",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "bool",
     "vocabulario": "OBS_MISMA",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "VAHO",
     "pantalla": "h4",
     "instr": [
      "F-HOG",
      "CONC"
     ],
     "etiqueta": "Al abrir había vaho o gotas en la tapa",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "bool",
     "vocabulario": "VAHO",
     "ausencias": []
    },
    {
     "codigo": "HUM",
     "pantalla": "h4",
     "instr": [
      "F-HOG",
      "CONC"
     ],
     "etiqueta": "Humedad, prueba del puño",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "multi",
     "escala": "ord",
     "vocabulario": "HUM",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "OLOR",
     "pantalla": "h4",
     "instr": [
      "F-HOG",
      "CONC"
     ],
     "etiqueta": "Olor",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "OLOR",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "FAU",
     "pantalla": "h4",
     "instr": [
      "F-HOG",
      "CONC"
     ],
     "etiqueta": "Quién vive aquí",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "FAU",
     "excluyente": "F00",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "MEZ_AV",
     "pantalla": "h4",
     "instr": [
      "F-HOG",
      "CONC"
     ],
     "etiqueta": "Avance de la descomposición",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "multi",
     "escala": "ord",
     "vocabulario": "MEZ_AV",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "MEZ_TX",
     "pantalla": "h4",
     "instr": [
      "F-HOG",
      "CONC"
     ],
     "etiqueta": "Textura",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "MEZ_TX",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "NOTA_E",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Lo que quieras contar de esta revisión",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "texto",
     "especiales": "NOTA_E",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "LLEN_F",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "¿Qué tan lleno quedó el contenedor? · marca una",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "LLEN_F",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "SECO_FALT",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "¿Hubo semanas en que te faltara material seco?",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "SECO_FALT",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "SECO_FALT_N",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Sí, en ___ de las 4",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "SECO_DIF",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Conseguir material seco durante el mes me resultó",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "SECO_DIF",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CONT_TAM",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "El tamaño del contenedor me resultó",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "CONT_TAM",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CUELLO",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Lo que más limitó el mes en esta casa · marca una",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "CUELLO",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CUELLO_OTRO",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Otro: ___",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "texto",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONTIN",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "El mes que viene",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "CONTIN",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CIE_FACIL",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Lo que me resultó fácil de sostener",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "CIE_DIFICIL",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Lo que me costó más trabajo",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "CIE_CAMBIO",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Si volviera a empezar, cambiaría",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "CIE_OTRO",
     "pantalla": "h4",
     "instr": [
      "F-HOG"
     ],
     "etiqueta": "Algo que el equipo debería saber y no cabe arriba",
     "quien": "hogar",
     "cuando": "día 28",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "VIS_TIPO",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "Tipo de visita",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "opción",
     "vocabulario": "VIS_TIPO",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "VIS_FECHA",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "Fecha de la visita",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "fecha",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "VIS_HORA",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "Hora",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "hora",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "VIS_QUIEN",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "Quién del equipo",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "opción",
     "abierta": true,
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "VIS_OK",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "¿Se pudo hacer la visita?",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "opción",
     "vocabulario": "VIS_OK",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "FOTO_EQ",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "Foto tomada",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "bool",
     "vocabulario": "FOTO_EQ",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "VIS_NOTA",
     "pantalla": "vis",
     "instr": [
      "RT"
     ],
     "etiqueta": "Nota técnica",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "BOTE_TARA",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del bote de medida vacío",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "BOTE_AGUA",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del bote lleno de agua hasta el borde",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "BOTE_SEC_TARA",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del recipiente del seco vacío",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "BOTE_SEC_AGUA",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del recipiente del seco lleno de agua",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONT_FORMA",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Forma interior del contenedor",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "CONT_FORMA",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "CONT_LARGO",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Largo interior",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONT_ANCHO",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Ancho interior",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONT_DIAM_SUP",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Diámetro interior en la boca",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONT_DIAM_INF",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Diámetro interior en el fondo",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONT_ALTO",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Altura interior útil",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "CONT_TARA",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del contenedor vacío, con tapa",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "CONT_TARA_MET",
     "pantalla": "t1",
     "instr": [
      "RT"
     ],
     "etiqueta": "Cómo se obtuvo la tara",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "CONT_TARA_MET",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "RES_GUARDADO",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "El hogar guardó los residuos del día",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "RES_GUARDADO",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "TEMP_I",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Temperatura del montón",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "TEMP_AMB",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Temperatura ambiente a la sombra",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "TEMP_PROF",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Profundidad de la sonda",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "PESO_MET",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Método de la masa de la pila",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "PESO_MET",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "PESO_BRUTO",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa de la compostera completa, con tapa",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "DENS_V",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Volumen del bote lleno de residuo fresco del día",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_M",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa de ese residuo, sin tara",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_T",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Tara del bote",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_SECO_TIPO",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Material seco principal de esa semana",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "SECO_DISP",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_SECO_V",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Volumen del bote lleno de ese material",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_SECO_M",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del material, sin tara",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_SECO_T",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Tara del recipiente",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "DENS_PILA_V",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Volumen del bote lleno de material de la pila",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "DENS_PILA_M",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa del material de la pila, sin tara",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "DENS_PILA_T",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Tara del recipiente",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "LLEN_REF",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Altura de llenado medida con regla",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "MUE_COMP_M",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa de la muestra de composta extraída",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "SUELO_TIPO",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Suelo disponible para el diseño pareado",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "SUELO_TIPO",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SUELO_CON",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Parche o maceta que recibirá composta",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "opción",
     "vocabulario": "SUELO_CON",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "SUELO_PROF",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Profundidad de muestreo",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "especiales": "SUELO_PROF",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "SUELO_SUB",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Submuestras que forman cada muestra compuesta",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "MUE_SUELO_P1_M",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa de la muestra compuesta del parche P1",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "MUE_SUELO_P2_M",
     "pantalla": "t28",
     "instr": [
      "RT"
     ],
     "etiqueta": "Masa de la muestra compuesta del parche P2",
     "quien": "equipo",
     "cuando": "día 28",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "VER_FECHA",
     "pantalla": "ver",
     "instr": [
      "RT"
     ],
     "etiqueta": "Fecha de la comprobación",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "fecha",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "VER_INSTR",
     "pantalla": "ver",
     "instr": [
      "RT"
     ],
     "etiqueta": "Instrumento",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "opción",
     "vocabulario": "VER_INSTR",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "VER_REF",
     "pantalla": "ver",
     "instr": [
      "RT"
     ],
     "etiqueta": "Valor de referencia",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "num",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "VER_LECT",
     "pantalla": "ver",
     "instr": [
      "RT"
     ],
     "etiqueta": "Lectura del instrumento",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "num",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "VER_OK",
     "pantalla": "ver",
     "instr": [
      "RT"
     ],
     "etiqueta": "Dentro de la tolerancia",
     "quien": "equipo",
     "cuando": "día 1 · día 28",
     "tipo": "bool",
     "vocabulario": "VER_OK",
     "ausencias": [],
     "obligatorio": true
    }
   ]
  };
  if (typeof module !== "undefined" && module.exports) module.exports = DATOS;
  else global.MiltliDatos = DATOS;
}(typeof window !== "undefined" ? window : globalThis));
