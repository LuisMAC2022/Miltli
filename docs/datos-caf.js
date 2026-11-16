// GENERADO por tools/generar-datos.js a partir de ficha/diccionario-de-datos-cafeterias-v0.1-borrador.md.
// No editar a mano: cambia el diccionario y ejecuta `npm run datos`.
(function (global) {
  "use strict";
  const DATOS = {
   "diccionario": "caf-v0.1",
   "ficha_rev": "CAF-01",
   "prefijo": "K",
   "corrientes": [
    "posos",
    "prep",
    "plato"
   ],
   "fases": [
    "base",
    "piloto"
   ],
   "internos": [
    "REC_FREC",
    "DIAS_OP",
    "CERRADO",
    "SAL_FECHA",
    "DREV"
   ],
   "campos": [
    {
     "codigo": "ID",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Cafetería K___",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "opción",
     "abierta": true,
     "muestra": "K1",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "FICHA_REV",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Sello del pie: F-CAF rev. NN",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "opción",
     "vocabulario": "FICHA_REV",
     "ausencias": []
    },
    {
     "codigo": "DEST_TIPO",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que se separa va a · marca uno",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "opción",
     "vocabulario": "DEST_TIPO",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "DEST_ID",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Clave del destino",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "texto",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "CORR_ACEPTA",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "El destino aceptó por escrito estas corrientes · marca todas",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "CORR_ACEPTA",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "ALM_TMAX",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Tiempo máximo de guardado: ___ días",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "num",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "PLANB",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Plan B si se cumple el tiempo máximo sin recolección · marca uno",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "opción",
     "vocabulario": "PLANB",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "REC_FREC",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recolección cada ___ días",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "num",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "REC_ROL",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recolección a cargo de · marca uno",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "opción",
     "vocabulario": "REC_ROL",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "SANIT_QUIEN",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "La verificación sanitaria la revisó · marca uno",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "opción",
     "vocabulario": "SANIT_QUIEN",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "PRE",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Columna «Lista»: condiciones de arranque cumplidas · una casilla por condición",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "PRE",
     "ausencias": []
    },
    {
     "codigo": "PRE_FECHA",
     "pantalla": "c1",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Las ocho quedaron listas el ___",
     "quien": "programa",
     "cuando": "antes",
     "tipo": "fecha",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "FINI",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Inicio ___/___/2026",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "fecha",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "UNIDAD",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Aquí se cuenta en · marca uno",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "UNIDAD",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "MED_POSOS_DESC",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recipiente de medida de la corriente",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NC",
      "NA"
     ],
     "corriente": "posos"
    },
    {
     "codigo": "MED_PREP_DESC",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recipiente de medida de la corriente",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NC",
      "NA"
     ],
     "corriente": "prep"
    },
    {
     "codigo": "MED_PLATO_DESC",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recipiente de medida de la corriente",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NC",
      "NA"
     ],
     "corriente": "plato"
    },
    {
     "codigo": "MED_POSOS_CAP",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Capacidad del recipiente, en litros",
     "quien": "**equipo**",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND",
      "NA"
     ],
     "corriente": "posos"
    },
    {
     "codigo": "MED_PREP_CAP",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Capacidad del recipiente, en litros",
     "quien": "**equipo**",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND",
      "NA"
     ],
     "corriente": "prep"
    },
    {
     "codigo": "MED_PLATO_CAP",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Capacidad del recipiente, en litros",
     "quien": "**equipo**",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "ND",
      "NA"
     ],
     "corriente": "plato"
    },
    {
     "codigo": "DREV",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Día del renglón semanal",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "DREV",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "SEP_QUIEN",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Quién separa · marca todos",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "SEP_QUIEN",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ANOTA_ROL",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Quién cierra el día en la Hoja 3",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "ANOTA_ROL",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "PERS_CAP",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Personas que separan y hay que capacitar",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "PERS_CAP",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "DPRE_CAF",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Antes de este piloto, ¿qué camino seguían estos residuos? · marca todos",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "DPRE_CAF",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "DPRE_CAF_OTRO",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Otro: ___",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "texto",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "LLEVA_FUERA",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Durante el piloto, alguien se lleva parte de estos residuos por fuera del programa",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "LLEVA_FUERA",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_N",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores de guardado: cuántos",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_CAP",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Capacidad de cada uno, en litros",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_CAP_ND",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "□ no la sé",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "bool",
     "vocabulario": "ALM_CAP_ND",
     "ausencias": []
    },
    {
     "codigo": "ALM_TAPA",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Todos con tapa",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "bool",
     "vocabulario": "ALM_TAPA",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_IE",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Interior · Exterior",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "ALM_IE",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_SS",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Sol · Sombra",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "ALM_SS",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_FRIO",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Refrigerado · Sin refrigerar",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "ALM_FRIO",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_AREA",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "En el área de alimentos · En un área aparte",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "ALM_AREA",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_LIMPIA",
     "pantalla": "c2",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Quién lava los contenedores",
     "quien": "cafetería",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "ALM_LIMPIA",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "FASE",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Esta hoja es de · marca uno",
     "quien": "equipo",
     "cuando": "día 1",
     "tipo": "opción",
     "vocabulario": "FASE",
     "ausencias": [],
     "obligatorio": true
    },
    {
     "codigo": "DIA",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Día",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "num",
     "ausencias": []
    },
    {
     "codigo": "FECHA",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Fecha día / mes",
     "quien": "cafetería",
     "cuando": "diario",
     "tipo": "fecha",
     "ausencias": [
      "NR"
     ]
    },
    {
     "codigo": "CERRADO",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Cerrado: ese día no se abrió",
     "quien": "cafetería",
     "cuando": "diario",
     "tipo": "bool",
     "vocabulario": "CERRADO",
     "ausencias": []
    },
    {
     "codigo": "SEP_POSOS",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Total del día, por corriente",
     "quien": "cafetería",
     "cuando": "diario",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NR",
      "NC",
      "NA"
     ],
     "corriente": "posos"
    },
    {
     "codigo": "SEP_PREP",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Total del día, por corriente",
     "quien": "cafetería",
     "cuando": "diario",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NR",
      "NC",
      "NA"
     ],
     "corriente": "prep"
    },
    {
     "codigo": "SEP_PLATO",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Total del día, por corriente",
     "quien": "cafetería",
     "cuando": "diario",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NR",
      "NC",
      "NA"
     ],
     "corriente": "plato"
    },
    {
     "codigo": "NOTA_D",
     "pantalla": "c3",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "¿Algo que contar de hoy?",
     "quien": "cafetería",
     "cuando": "diario",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "SAL_N",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "N.º de la salida",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "num",
     "ausencias": []
    },
    {
     "codigo": "SAL_FECHA",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Fecha día / mes",
     "quien": "cafetería",
     "cuando": "salida",
     "tipo": "fecha",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SAL_POSOS",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores de guardado que salen, por corriente",
     "quien": "cafetería",
     "cuando": "salida",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "ND",
      "NA"
     ],
     "corriente": "posos"
    },
    {
     "codigo": "SAL_PREP",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores de guardado que salen, por corriente",
     "quien": "cafetería",
     "cuando": "salida",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "ND",
      "NA"
     ],
     "corriente": "prep"
    },
    {
     "codigo": "SAL_PLATO",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores de guardado que salen, por corriente",
     "quien": "cafetería",
     "cuando": "salida",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "ND",
      "NA"
     ],
     "corriente": "plato"
    },
    {
     "codigo": "SAL_TODO",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "¿Se llevó todo?",
     "quien": "cafetería",
     "cuando": "salida",
     "tipo": "bool",
     "vocabulario": "SAL_TODO",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SAL_ENTREGA_ROL",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Entrega",
     "quien": "cafetería",
     "cuando": "salida",
     "tipo": "opción",
     "vocabulario": "SAL_ENTREGA_ROL",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SAL_COND",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que se ve al abrir · lo marcan los dos · marca todo",
     "quien": "cafetería · recibe",
     "cuando": "salida",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "SAL_COND",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SAL_RECIBE_ROL",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recibe",
     "quien": "recibe",
     "cuando": "salida",
     "tipo": "opción",
     "vocabulario": "SAL_RECIBE_ROL",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SAL_RECIBE_CONT",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores que contó quien recibe",
     "quien": "recibe",
     "cuando": "salida",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "SAL_RECIBE_KG",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Kilos, si quien recibe pesa",
     "quien": "recibe",
     "cuando": "salida",
     "tipo": "num",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "SAL_PLANB",
     "pantalla": "c4",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Plan B",
     "quien": "cafetería · recibe",
     "cuando": "salida",
     "tipo": "bool",
     "vocabulario": "SAL_PLANB",
     "ausencias": []
    },
    {
     "codigo": "SEM",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Columna S1…S4",
     "quien": "—",
     "cuando": "impreso",
     "tipo": "opción",
     "abierta": true,
     "muestra": "1",
     "ausencias": []
    },
    {
     "codigo": "SFECHA",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Fecha de este renglón",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "fecha",
     "ausencias": []
    },
    {
     "codigo": "DIAS_OP",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Días que abrimos esta semana",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "MIN_CAF",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Minutos de todo el personal en la semana",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "REG",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Cómo anotamos esta semana · marca sólo una",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "opción",
     "vocabulario": "REG",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "FUGA_POSOS",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que no llegó al destino, por corriente · escribe 0 si todo llegó",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC",
      "NA"
     ],
     "corriente": "posos"
    },
    {
     "codigo": "FUGA_PREP",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que no llegó al destino, por corriente · escribe 0 si todo llegó",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC",
      "NA"
     ],
     "corriente": "prep"
    },
    {
     "codigo": "FUGA_PLATO",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que no llegó al destino, por corriente · escribe 0 si todo llegó",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC",
      "NA"
     ],
     "corriente": "plato"
    },
    {
     "codigo": "FUGA_CAF_MOT",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Si algo no llegó, ¿por qué? · marca todas",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "FUGA_CAF_MOT",
     "ausencias": [
      "NA",
      "NC"
     ]
    },
    {
     "codigo": "ALM_LLENOS",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores de guardado llenos en este momento",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_DIAS",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Días desde la última recolección",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "REC_FALTO",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Recolecciones acordadas que no llegaron · escribe 0 si llegaron todas",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "PAUSA_DIAS",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Días que abrimos y no se separó · escribe 0 si ninguno",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "num",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "PAUSA_MOT",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Si los hubo, ¿por qué? · marca todas",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "PAUSA_MOT",
     "ausencias": [
      "NA",
      "NC"
     ]
    },
    {
     "codigo": "ALM_OBS",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Al abrir los contenedores esta semana vimos · marca todo",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "ALM_OBS",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ACT_CAF",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Qué hicimos esta semana · marca todo",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "ACT_CAF",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "NOTA_S",
     "pantalla": "c5",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que quieran contar de esta semana",
     "quien": "cafetería",
     "cuando": "semanal",
     "tipo": "texto",
     "especiales": "NOTA_S",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "FCIE",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Fecha del cierre",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "fecha",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_OBS_F",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Al abrir los contenedores vimos · marca todo",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "multi",
     "escala": "nom",
     "vocabulario": "ALM_OBS_F",
     "ausencias": [
      "ND"
     ]
    },
    {
     "codigo": "ALM_LLENOS_F",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Contenedores de guardado llenos en este momento",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "num",
     "medios": true,
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "FIN_GUARD",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que está guardado hoy · marca uno",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "opción",
     "vocabulario": "FIN_GUARD",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "ALM_TAM",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "El espacio de guardado nos resultó",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "opción",
     "vocabulario": "ALM_TAM",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "REC_SUF",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "La recolección pasó",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "opción",
     "vocabulario": "REC_SUF",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CUELLO_CAF",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que más limitó el mes en esta cafetería · marca uno",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "opción",
     "vocabulario": "CUELLO_CAF",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CUELLO_CAF_OTRO",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Otro: ___",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "texto",
     "ausencias": [
      "NA"
     ]
    },
    {
     "codigo": "CONTIN",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "El mes que viene",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "opción",
     "vocabulario": "CONTIN",
     "ausencias": [
      "NC"
     ]
    },
    {
     "codigo": "CIE_FACIL",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que nos resultó fácil de sostener",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "CIE_DIFICIL",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Lo que nos costó más trabajo",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "CIE_CAMBIO",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Si volviéramos a empezar, cambiaríamos",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    },
    {
     "codigo": "CIE_OTRO",
     "pantalla": "c6",
     "instr": [
      "F-CAF"
     ],
     "etiqueta": "Algo que el programa debería saber",
     "quien": "cafetería",
     "cuando": "cierre",
     "tipo": "texto",
     "ausencias": [],
     "vacioValido": true
    }
   ],
   "reglas": {
    "IC-1": {
     "tipo": "error",
     "fichas": [
      "FINI",
      "PRE"
     ]
    },
    "IC-2": {
     "tipo": "error",
     "fichas": [
      "REC_FREC",
      "ALM_TMAX"
     ]
    },
    "IC-3": {
     "tipo": "señal",
     "fichas": [
      "SEP_*",
      "SAL_*",
      "FUGA_*",
      "CORR_ACEPTA"
     ]
    },
    "IC-4": {
     "tipo": "error",
     "fichas": [
      "CERRADO",
      "SEP_*"
     ]
    },
    "IC-5": {
     "tipo": "error",
     "fichas": [
      "UNIDAD",
      "recipientes"
     ]
    },
    "IC-6": {
     "tipo": "error",
     "fichas": [
      "REG1",
      "REG2"
     ]
    },
    "IC-7": {
     "tipo": "error",
     "fichas": [
      "nada",
      "SAL_COND",
      "ALM_OBS",
      "ALM_OBS_F",
      "ACT_CAF"
     ]
    },
    "IC-8": {
     "tipo": "error",
     "fichas": [
      "FUGA_CAF_MOT",
      "0",
      "PAUSA_MOT",
      "PAUSA_DIAS"
     ]
    },
    "IC-9": {
     "tipo": "señal",
     "fichas": [
      "SAL_PLANB",
      "PLANB",
      "basura",
      "0"
     ]
    },
    "IC-10": {
     "tipo": "señal",
     "fichas": [
      "otro",
      "retiro",
      "NOTA_S"
     ]
    },
    "IC-11": {
     "tipo": "señal",
     "fichas": [
      "DIAS_OP",
      "CERRADO"
     ]
    },
    "IC-12": {
     "tipo": "señal",
     "fichas": [
      "ALM_DIAS",
      "ALM_TMAX",
      "GUARD_DIAS",
      "ALM_TMAX"
     ]
    },
    "IC-13": {
     "tipo": "señal",
     "fichas": [
      "FASE",
      "base"
     ]
    },
    "IC-14": {
     "tipo": "señal",
     "fichas": [
      "SAL_RECIBE_CONT",
      "SAL_POSOS",
      "SAL_PREP",
      "SAL_PLATO"
     ]
    },
    "IC-15": {
     "tipo": "señal",
     "fichas": [
      "LLEVA_FUERA",
      "no",
      "fuera",
      "casi_siempre"
     ]
    },
    "IC-16": {
     "tipo": "error",
     "fichas": [
      "ALM_LLENOS",
      "ALM_LLENOS_F",
      "ALM_N"
     ]
    },
    "IC-17": {
     "tipo": "error",
     "fichas": []
    }
   }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = DATOS;
  else global.MiltliDatosCaf = DATOS;
}(typeof window !== "undefined" ? window : globalThis));
