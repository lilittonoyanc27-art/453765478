import { RoscoQuestion } from './types';

export const ROSCO_QUESTIONS: RoscoQuestion[] = [
  {
    id: 1,
    letter: 'A',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por A',
    prefixRuleHy: 'Սկսվում է A-ով (Ա)',
    questionEs: '¿Cómo se llama el lugar donde despegan y aterrizan los aviones?',
    questionHy: 'Ինչպե՞ս է կոչվում այն վայրը, որտեղ ինքնաթիռները թռչում և վայրէջք են կատարում։',
    answerEs: 'Aeropuerto',
    answerHy: 'Օդանավակայան',
    acceptableAnswers: ['aeropuerto', 'el aeropuerto'],
    topic: 'Transporte / Տրանսպորտ'
  },
  {
    id: 2,
    letter: 'B',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por B',
    prefixRuleHy: 'Սկսվում է B-ով (Բ)',
    questionEs: '¿Cómo se llama el vehículo que navega por el agua y transporta personas o mercancías?',
    questionHy: 'Ինչպե՞ս է կոչվում այն փոխադրամիջոցը, որը շարժվում է ջրով և տեղափոխում մարդկանց կամ ապրանքներ։',
    answerEs: 'Barco',
    answerHy: 'Նավ',
    acceptableAnswers: ['barco', 'el barco', 'buque', 'el buque'],
    topic: 'Transporte / Տրանսպորտ'
  },
  {
    id: 3,
    letter: 'C',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por C',
    prefixRuleHy: 'Սկսվում է C-ով (Կ/Ս)',
    questionEs: '¿Cómo se llama una caída natural de agua desde una gran altura, normalmente en un río?',
    questionHy: 'Ինչպե՞ս է կոչվում ջրի բնական անկումը մեծ բարձրությունից, սովորաբար գետում։',
    answerEs: 'Cascada',
    answerHy: 'Ջրվեժ',
    acceptableAnswers: ['cascada', 'la cascada', 'catarata', 'la catarata'],
    topic: 'Naturaleza / Բնություն'
  },
  {
    id: 4,
    letter: 'D',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por D',
    prefixRuleHy: 'Սկսվում է D-ով (Դ)',
    questionEs: '¿Cómo se llama una región donde llueve muy poco y hay escasa vegetación?',
    questionHy: 'Ինչպե՞ս է կոչվում այն տարածքը, որտեղ շատ քիչ անձրև է գալիս և բուսականությունը սակավ է։',
    answerEs: 'Desierto',
    answerHy: 'Անապատ',
    acceptableAnswers: ['desierto', 'el desierto'],
    topic: 'Geografía / Աշխարհագրություն'
  },
  {
    id: 5,
    letter: 'E',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por E',
    prefixRuleHy: 'Սկսվում է E-ով (Է/Ե)',
    questionEs: '¿Qué objeto utilizamos para ver nuestra propia imagen reflejada?',
    questionHy: 'Ի՞նչ առարկա ենք օգտագործում՝ մեր արտացոլանքը տեսնելու համար։',
    answerEs: 'Espejo',
    answerHy: 'Հայելի',
    acceptableAnswers: ['espejo', 'el espejo'],
    topic: 'Objetos / Առարկաներ'
  },
  {
    id: 6,
    letter: 'F',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por F',
    prefixRuleHy: 'Սկսվում է F-ով (Ֆ)',
    questionEs: '¿Cómo se llama la persona que hace fotografías de manera profesional?',
    questionHy: 'Ինչպե՞ս է կոչվում այն մարդը, որը մասնագիտորեն լուսանկարներ է անում։',
    answerEs: 'Fotógrafo',
    answerHy: 'Լուսանկարիչ',
    acceptableAnswers: ['fotógrafo', 'fotografo', 'fotógrafa', 'fotografa', 'el fotografo', 'el fotógrafo', 'la fotografa', 'la fotógrafa'],
    topic: 'Profesiones / Մասնագիտություններ'
  },
  {
    id: 7,
    letter: 'G',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por G',
    prefixRuleHy: 'Սկսվում է G-ով (Գ)',
    questionEs: '¿Cómo se llama el objeto de goma que llenamos de aire y utilizamos para decorar una fiesta?',
    questionHy: 'Ինչպե՞ս է կոչվում ռետինե առարկան, որը օդով ենք լցնում և օգտագործում տոնը զարդարելու համար։',
    answerEs: 'Globo',
    answerHy: 'Փուչիկ',
    acceptableAnswers: ['globo', 'el globo'],
    topic: 'Objetos / Առարկաներ'
  },
  {
    id: 8,
    letter: 'H',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por H',
    prefixRuleHy: 'Սկսվում է H-ով (Հ/չհնչող H)',
    questionEs: '¿Cómo se llama el aparato que utilizamos para cocinar alimentos en una cocina y que puede funcionar con electricidad o gas?',
    questionHy: 'Ինչպե՞ս է կոչվում այն սարքը, որն օգտագործում ենք խոհանոցում ուտելիք պատրաստելու համար, և որը կարող է աշխատել էլեկտրականությամբ կամ գազով։',
    answerEs: 'Horno',
    answerHy: 'Ջեռոց',
    acceptableAnswers: ['horno', 'el horno'],
    topic: 'Hogar / Կենցաղ'
  },
  {
    id: 9,
    letter: 'I',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por I',
    prefixRuleHy: 'Սկսվում է I-ով (Ի)',
    questionEs: '¿Qué objeto atrae algunos metales, especialmente el hierro?',
    questionHy: 'Ո՞ր առարկան է ձգում որոշ մետաղներ, հատկապես երկաթը։',
    answerEs: 'Imán',
    answerHy: 'Մագնիս',
    acceptableAnswers: ['imán', 'iman', 'el iman', 'el imán'],
    topic: 'Ciencia / Գիտություն'
  },
  {
    id: 10,
    letter: 'J',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por J',
    prefixRuleHy: 'Սկսվում է J-ով (Խ)',
    questionEs: '¿Qué animal africano tiene el cuello muy largo y se alimenta de hojas de los árboles?',
    questionHy: 'Աֆրիկյան ո՞ր կենդանին ունի շատ երկար պարանոց և սնվում է ծառերի տերևներով։',
    answerEs: 'Jirafa',
    answerHy: 'Ընձուղտ',
    acceptableAnswers: ['jirafa', 'la jirafa'],
    topic: 'Animales / Կենդանիներ'
  },
  {
    id: 11,
    letter: 'K',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por K',
    prefixRuleHy: 'Սկսվում է K-ով (Կ)',
    questionEs: '¿Qué animal australiano duerme muchas horas y se alimenta principalmente de hojas de eucalipto?',
    questionHy: 'Ո՞ր ավստրալական կենդանին է շատ ժամեր քնում և հիմնականում սնվում է էվկալիպտի տերևներով։',
    answerEs: 'Koala',
    answerHy: 'Կոալա',
    acceptableAnswers: ['koala', 'el koala'],
    topic: 'Animales / Կենդանիներ'
  },
  {
    id: 12,
    letter: 'L',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por L',
    prefixRuleHy: 'Սկսվում է L-ով (Լ)',
    questionEs: '¿Qué animal es conocido como el rey de la selva?',
    questionHy: 'Ո՞ր կենդանուն են անվանում ջունգլիների արքա։',
    answerEs: 'León',
    answerHy: 'Առյուծ',
    acceptableAnswers: ['león', 'leon', 'el leon', 'el león'],
    topic: 'Animales / Կենդանիներ'
  },
  {
    id: 13,
    letter: 'M',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por M',
    prefixRuleHy: 'Սկսվում է M-ով (Մ)',
    questionEs: '¿Cómo se llama el alimento dulce que se prepara con frutas y azúcar y que solemos untar en el pan?',
    questionHy: 'Ինչպե՞ս է կոչվում մրգերից և շաքարից պատրաստված քաղցր ուտելիքը, որը հաճախ քսում ենք հացին։',
    answerEs: 'Mermelada',
    answerHy: 'Մուրաբա, ջեմ',
    acceptableAnswers: ['mermelada', 'la mermelada'],
    topic: 'Alimentación / Սնունդ'
  },
  {
    id: 14,
    letter: 'N',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por N',
    prefixRuleHy: 'Սկսվում է N-ով (Ն)',
    questionEs: '¿Cómo se llama la parte del planeta situada más arriba del ecuador, según los puntos cardinales?',
    questionHy: 'Ինչպե՞ս է կոչվում աշխարհի կողմը, որը քարտեզի վրա սովորաբար գտնվում է վերևում։',
    answerEs: 'Norte',
    answerHy: 'Հյուսիս',
    acceptableAnswers: ['norte', 'el norte'],
    topic: 'Geografía / Աշխարհագրություն'
  },
  {
    id: 15,
    letter: 'Ñ',
    prefixType: 'contains',
    prefixRuleEs: 'Contiene la Ñ',
    prefixRuleHy: 'Պարունակում է Ñ տառը',
    questionEs: '¿Cómo se llama el juguete que tiene forma de niña o mujer y con el que juegan muchos niños?',
    questionHy: 'Ինչպե՞ս է կոչվում աղջկա կամ կնոջ տեսք ունեցող խաղալիքը, որով երեխաները խաղում են։',
    answerEs: 'Muñeca',
    answerHy: 'Տիկնիկ',
    acceptableAnswers: ['muñeca', 'la muñeca', 'muneca', 'la muneca'],
    topic: 'Juguetes / Խաղալիքներ'
  },
  {
    id: 16,
    letter: 'O',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por O',
    prefixRuleHy: 'Սկսվում է O-ով (Օ)',
    questionEs: '¿Cómo se llama un grupo de músicos que tocan diferentes instrumentos juntos, dirigidos normalmente por un director?',
    questionHy: 'Ինչպե՞ս է կոչվում երաժիշտների խումբը, որը միասին տարբեր գործիքներ է նվագում՝ սովորաբար դիրիժորի ղեկավարությամբ։',
    answerEs: 'Orquesta',
    answerHy: 'Նվագախումբ',
    acceptableAnswers: ['orquesta', 'la orquesta'],
    topic: 'Música y Cultura / Մշակույթ'
  },
  {
    id: 17,
    letter: 'P',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por P',
    prefixRuleHy: 'Սկսվում է P-ով (Պ)',
    questionEs: '¿Qué país de América del Sur tiene como capital Lima?',
    questionHy: 'Հարավային Ամերիկայի ո՞ր երկրի մայրաքաղաքն է Լիման։',
    answerEs: 'Perú',
    answerHy: 'Պերու',
    acceptableAnswers: ['perú', 'peru'],
    topic: 'Geografía / Աշխարհագրություն'
  },
  {
    id: 18,
    letter: 'Q',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por Q',
    prefixRuleHy: 'Սկսվում է Q-ով (Ք)',
    questionEs: '¿Cómo se llama la ciencia que estudia las sustancias, sus propiedades y sus transformaciones?',
    questionHy: 'Ինչպե՞ս է կոչվում գիտությունը, որն ուսումնասիրում է նյութերը, դրանց հատկություններն ու փոխակերպումները։',
    answerEs: 'Química',
    answerHy: 'Քիմիա',
    acceptableAnswers: ['química', 'quimica', 'la quimica', 'la química'],
    topic: 'Ciencia / Գիտություն'
  },
  {
    id: 19,
    letter: 'R',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por R',
    prefixRuleHy: 'Սկսվում է R-ով (Ռ/Ր)',
    questionEs: '¿Cómo se llama la flor que suele tener espinas en el tallo y puede ser roja, blanca, amarilla o rosa?',
    questionHy: 'Ինչպե՞ս է կոչվում այն ծաղիկը, որի ցողունը հաճախ փշեր ունի և որը կարող է լինել կարմիր, սպիտակ, դեղին կամ վարդագույն։',
    answerEs: 'Rosa',
    answerHy: 'Վարդ',
    acceptableAnswers: ['rosa', 'la rosa'],
    topic: 'Naturaleza / Բնություն'
  },
  {
    id: 20,
    letter: 'S',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por S',
    prefixRuleHy: 'Սկսվում է S-ով (Ս)',
    questionEs: '¿Qué aparato tiene luces rojas, amarillas y verdes para controlar el tráfico?',
    questionHy: 'Ո՞ր սարքն ունի կարմիր, դեղին և կանաչ լույսեր՝ երթևեկությունը կարգավորելու համար։',
    answerEs: 'Semáforo',
    answerHy: 'Լուսացույց',
    acceptableAnswers: ['semáforo', 'semaforo', 'el semáforo', 'el semaforo'],
    topic: 'Ciudad / Քաղաք'
  },
  {
    id: 21,
    letter: 'T',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por T',
    prefixRuleHy: 'Սկսվում է T-ով (Տ)',
    questionEs: '¿Cómo se llama el proceso de expresar un texto o un mensaje en otro idioma?',
    questionHy: 'Ինչպե՞ս է կոչվում տեքստը կամ հաղորդագրությունը մեկ այլ լեզվով արտահայտելու գործընթացը։',
    answerEs: 'Traducción',
    answerHy: 'Թարգմանություն',
    acceptableAnswers: ['traducción', 'traduccion', 'la traduccion', 'la traducción'],
    topic: 'Idiomas / Լեզուներ'
  },
  {
    id: 22,
    letter: 'U',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por U',
    prefixRuleHy: 'Սկսվում է U-ով (Ու)',
    questionEs: '¿Cómo se llama el conjunto de todas las galaxias, estrellas, planetas y el espacio?',
    questionHy: 'Ինչպե՞ս է կոչվում բոլոր գալակտիկաների, աստղերի, մոլորակների և տարածության ամբողջությունը։',
    answerEs: 'Universo',
    answerHy: 'Տիեզերք',
    acceptableAnswers: ['universo', 'el universo'],
    topic: 'Astronomía / Տիեզերք'
  },
  {
    id: 23,
    letter: 'V',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por V',
    prefixRuleHy: 'Սկսվում է V-ով (Վ)',
    questionEs: '¿Cómo se llama la persona que no come carne ni pescado, pero puede comer huevos y productos lácteos?',
    questionHy: 'Ինչպե՞ս է կոչվում այն մարդը, որը չի ուտում միս կամ ձուկ, բայց կարող է ուտել ձու և կաթնամթերք։',
    answerEs: 'Vegetariano',
    answerHy: 'Բուսակեր',
    acceptableAnswers: ['vegetariano', 'vegetariana', 'el vegetariano', 'la vegetariana', 'vegetariano/a', 'vegetariano o vegetariana'],
    topic: 'Alimentación / Սնունդ'
  },
  {
    id: 24,
    letter: 'W',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por W',
    prefixRuleHy: 'Սկսվում է W-ով (Վ/Ու)',
    questionEs: '¿Cómo se llama la tecnología que nos permite conectarnos a Internet sin necesidad de utilizar cables?',
    questionHy: 'Ինչպե՞ս է կոչվում այն տեխնոլոգիան, որը թույլ է տալիս միանալ ինտերնետին առանց լարերի։',
    answerEs: 'Wi-Fi',
    answerHy: 'Անլար ինտերնետային կապ (Wi-Fi)',
    acceptableAnswers: ['wi-fi', 'wifi', 'el wifi', 'el wi-fi', 'wi fi'],
    topic: 'Tecnología / Տեխնոլոգիաներ'
  },
  {
    id: 25,
    letter: 'X',
    prefixType: 'contains',
    prefixRuleEs: 'Contiene la X',
    prefixRuleHy: 'Պարունակում է X տառը',
    questionEs: '¿Qué gas del aire necesitamos para respirar y vivir?',
    questionHy: 'Օդում պարունակվող ո՞ր գազն է մեզ անհրաժեշտ շնչելու և ապրելու համար։',
    answerEs: 'Oxígeno',
    answerHy: 'Թթվածին',
    acceptableAnswers: ['oxígeno', 'oxigeno', 'el oxígeno', 'el oxigeno'],
    topic: 'Naturaleza y Ciencia / Բնություն'
  },
  {
    id: 26,
    letter: 'Y',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por Y',
    prefixRuleHy: 'Սկսվում է Y-ով (Յ)',
    questionEs: '¿Cómo se llama la práctica que combina posturas del cuerpo, ejercicios de respiración y relajación?',
    questionHy: 'Ինչպե՞ս է կոչվում այն զբաղմունքը, որը միավորում է մարմնի դիրքերը, շնչառական վարժություններն ու թուլացումը։',
    answerEs: 'Yoga',
    answerHy: 'Յոգա',
    acceptableAnswers: ['yoga', 'el yoga'],
    topic: 'Salud y Bienestar / Առողջություն'
  },
  {
    id: 27,
    letter: 'Z',
    prefixType: 'starts_with',
    prefixRuleEs: 'Empieza por Z',
    prefixRuleHy: 'Սկսվում է Z-ով (Զ/Ս)',
    questionEs: '¿Cómo se llama el animal salvaje que tiene una cola larga y peluda, suele ser de color rojizo y es famoso por su astucia?',
    questionHy: 'Ինչպե՞ս է կոչվում այն վայրի կենդանին, որն ունի երկար, փափուկ պոչ, սովորաբար կարմրավուն գույն և հայտնի է իր խորամանկությամբ։',
    answerEs: 'Zorro',
    answerHy: 'Աղվես',
    acceptableAnswers: ['zorro', 'el zorro', 'zorra', 'la zorra'],
    topic: 'Animales / Կենդանիներ'
  }
];

/**
 * Normalizes text for forgiving Spanish comparison:
 * - lowercase
 * - removes diacritics / accents (á->a, é->e, etc.)
 * - preserves ñ when matching ñ, but accepts n as fallback
 * - removes leading articles like 'el ', 'la ', 'los ', 'las ', 'un ', 'una '
 * - strips punctuation and excessive whitespace
 */
export function normalizeSpanish(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[¿?¡!.,;:_()\-–—/'"`]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^el\s+|^la\s+|^los\s+|^las\s+|^un\s+|^una\s+/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents (keeps base letter)
    .trim();
}

export function isAnswerCorrect(userInput: string, question: RoscoQuestion): boolean {
  if (!userInput || !userInput.trim()) return false;
  
  const normUser = normalizeSpanish(userInput);
  if (!normUser) return false;

  // Check against canonical answer
  if (normUser === normalizeSpanish(question.answerEs)) {
    return true;
  }

  // Check against acceptable answers
  for (const alt of question.acceptableAnswers) {
    if (normUser === normalizeSpanish(alt)) {
      return true;
    }
  }

  // Also check if raw without stripping accents matches
  const rawClean = userInput.toLowerCase().trim();
  for (const alt of question.acceptableAnswers) {
    if (rawClean === alt.toLowerCase().trim()) {
      return true;
    }
  }

  return false;
}
