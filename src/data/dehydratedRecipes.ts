import { DehydratedRecipe } from '../types/domain';

export const DEHYDRATED_RECIPES: DehydratedRecipe[] = [
  // --- 1. Сніданки (Breakfasts) ---
  {
    id: 'recipe-celebration-brunch',
    title: 'Святковий сніданок з яйцем та шинкою (Celebration Brunch)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 380,
    proteinPerServing: 24,
    fatPerServing: 16,
    carbsPerServing: 35,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Картопляні пластівці', amount: 120, unit: 'г', category: 'крупи' },
      { name: 'Яєчний порошок', amount: 80, unit: 'г', category: 'яйця' },
      { name: 'Шинка нежирна відварена', amount: 200, unit: 'г', category: 'м\'ясо' },
      { name: 'Цибуля ріпчаста подрібнена', amount: 100, unit: 'г', category: 'овочі' },
      { name: 'Сир Чеддер тертий', amount: 80, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Шинку нарізати дрібними кубиками 4 мм, зняти надлишок жиру серветкою.',
      'Цибулю спасерувати з краплею води до прозорості.',
      'Змішати картопляне пюре, розведений яєчний меланж, шинку та цибулю в густу масу, запекти в духовці тонким шаром 15 хв при 160°C.',
      'Остудити та розкришити на піддони дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '7-9 год',
      trayLining: 'Силіконовий лист або пергамент',
      drynessTest: 'Ламкі сухі гранули без вологи всередині'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом на рівні суміші (~300 мл на порцію)',
      soakMinutes: 2,
      boilMinutes: 2,
      altitudeNote: 'На висоті понад 3000 м тримати під кришкою у спальнику 5 хв'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-granola-alpine',
    title: 'Альпійська гранола з горіхами та сушеними ягодами',
    category: 'breakfast',
    mealTypes: ['breakfast', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 420,
    proteinPerServing: 14,
    fatPerServing: 18,
    carbsPerServing: 52,
    fiberPerServing: 6.5,
    rawIngredients: [
      { name: 'Вівсяні пластівці', amount: 200, unit: 'г', category: 'крупи' },
      { name: 'Мед натуральний', amount: 60, unit: 'г', category: 'солодощі' },
      { name: 'Горіхи волоські та мигдаль', amount: 80, unit: 'г', category: 'горіхи' },
      { name: 'Сушені чорниці та журавлина', amount: 60, unit: 'г', category: 'сухофрукти' },
      { name: 'Сухе молоко незбиране', amount: 80, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Вівсяні пластівці змішати з підігрітим медом та подрібненими горіхами.',
      'Підсушити в духовці при 140°C до золотистого кольору (20 хв), постійно помішуючи.',
      'Остудити, додати сухі ягоди та сухе молоко, перемішати.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '4-5 год (досушування)',
      trayLining: 'Сітчастий піддон',
      drynessTest: 'Хрусткі розсипчасті пластівці'
    },
    campRehydration: {
      waterRatioNote: 'Залити 150 мл холодної або теплої води, перемішати',
      soakMinutes: 1,
      boilMinutes: 0
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-quick-oatmeal-plus',
    title: 'Вівсянка «Чемпіон» з висівками, яблуками та корицею',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 80,
    kcalPerServing: 350,
    proteinPerServing: 13,
    fatPerServing: 7,
    carbsPerServing: 58,
    fiberPerServing: 8.5,
    rawIngredients: [
      { name: 'Вівсяні пластівці швидкі', amount: 160, unit: 'г', category: 'крупи' },
      { name: 'Висівки вівсяні', amount: 40, unit: 'г', category: 'добавки' },
      { name: 'Яблука сушені кубиками', amount: 50, unit: 'г', category: 'сухофрукти' },
      { name: 'Сухе молоко', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Цукор тростинний з корицею', amount: 40, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Яблука нарізати тонкими кубиками і висушити окремо.',
      'Змішати пластівці, висівки, яблука, сухе молоко, цукор та мелену корицю в сухому вигляді.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '6 год для яблук',
      trayLining: 'Сітка',
      drynessTest: 'Сухі шкірясті кубики яблук'
    },
    campRehydration: {
      waterRatioNote: 'Залити 250 мл окропу, накрити кришкою на 3-4 хв',
      soakMinutes: 3,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'В. Хачикян (розкладка для гірських походів)'
  },
  {
    id: 'recipe-packer-potatoes-cheese',
    title: 'Картопляний омлет по-мисливськи з сиром (Packer\'s Potatoes Plus)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 410,
    proteinPerServing: 22,
    fatPerServing: 18,
    carbsPerServing: 40,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Картопляні пластівці', amount: 140, unit: 'г', category: 'крупи' },
      { name: 'Яєчний порошок', amount: 70, unit: 'г', category: 'яйця' },
      { name: 'Сушений фарш курячий', amount: 60, unit: 'г', category: 'м\'ясо' },
      { name: 'Сушений сир Пармезан', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Сушена зелена цибуля та кріп', amount: 15, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Зварити густе пюре на воді з яйцем, вмішати варений курячий фарш та зелень.',
      'Розподілити лопаткою шаром 4 мм на піддони дегідратора і висушити.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '8 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Крихкі сухі коржики, легко ламаються на пластівці'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом трохи вище рівня пластівців (~300 мл/порцію), варити 2 хв',
      soakMinutes: 2,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-breakfast-casserole',
    title: 'Селянська запіканка зі шпинатом та яйцем (Country Quiche)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 390,
    proteinPerServing: 25,
    fatPerServing: 17,
    carbsPerServing: 32,
    fiberPerServing: 3.8,
    rawIngredients: [
      { name: 'Яйця свіжі (для домашнього запікання)', amount: 6, unit: 'шт', category: 'яйця' },
      { name: 'Шпинат свіжий віджатий', amount: 250, unit: 'г', category: 'овочі' },
      { name: 'Сир фета / бринза нежирна', amount: 150, unit: 'г', category: 'молочні' },
      { name: 'Панірувальні сухарі тонкі', amount: 80, unit: 'г', category: 'хліб' },
      { name: 'Мускатний горіх та перець', amount: 5, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Шпинат припустити, віджати всю вологу, змішати зі збитими яйцями, сиром та сухарями.',
      'Запекти у формі при 180°C 25 хв.',
      'Повністю остудити, нарізати тонкими смужками 5 мм і розкласти на лотки.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '8-10 год',
      trayLining: 'Пергамент',
      drynessTest: 'Тверді хрусткі смужки'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом у казані, варити 3 хв, настояти 5 хв',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },

  // --- 2. Намазки, паштети та обідні страви (Lunch Spreads & Midday Meals) ---
  {
    id: 'recipe-quick-hummus',
    title: 'Хумус похідний швидкого приготування (Quick Hummus Spread)',
    category: 'spread',
    mealTypes: ['lunch', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 260,
    proteinPerServing: 12,
    fatPerServing: 9,
    carbsPerServing: 32,
    fiberPerServing: 7.2,
    rawIngredients: [
      { name: 'Нут варений (або консервований)', amount: 450, unit: 'г', category: 'бобові' },
      { name: 'Паста кунжутна (тахіні)', amount: 40, unit: 'г', category: 'насіння' },
      { name: 'Часник свіжий', amount: 15, unit: 'г', category: 'овочі' },
      { name: 'Сік лимона', amount: 25, unit: 'мл', category: 'приправи' },
      { name: 'Зіра (кумін) мелена та сіль', amount: 8, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Збити в блендері нут, тахіні, часник, лимонний сік та спеції в ніжне однорідне пюре.',
      'Розмазати лопаткою тонким шаром 2-3 мм по силіконових листах дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Сухий пласт, що розтирається пальцями у дрібний порошок'
    },
    campRehydration: {
      waterRatioNote: 'Додати 80-100 мл холодної або теплої води, перемішати ложкою до кремової консистенції',
      soakMinutes: 2,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-creamy-tuna-spread',
    title: 'Паштет із тунця з травами (Creamy Tuna Spread)',
    category: 'spread',
    mealTypes: ['lunch'],
    servingsYield: 4,
    dryWeightPerServingGrams: 55,
    kcalPerServing: 240,
    proteinPerServing: 28,
    fatPerServing: 7,
    carbsPerServing: 12,
    fiberPerServing: 1.2,
    rawIngredients: [
      { name: 'Тунець у власному соку (злити рідину)', amount: 350, unit: 'г', category: 'риба' },
      { name: 'Сухе молоко незбиране', amount: 40, unit: 'г', category: 'молочні' },
      { name: 'Цибуля ріпчаста сушена подрібнена', amount: 15, unit: 'г', category: 'овочі' },
      { name: 'Кріп сушений, чорний перець', amount: 5, unit: 'г', category: 'спеції' },
      { name: 'Крохмаль кукурудзяний', amount: 15, unit: 'г', category: 'загусник' }
    ],
    homePrepSteps: [
      'Тунця ретельно розім\'яти виделкою, змішати з сухим молоком, крохмалем, цибулею та травами в пасту.',
      'Розподілити ложкою на піддони у вигляді дрібних коржиків.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '6-7 год',
      trayLining: 'Пергамент',
      drynessTest: 'Сухі ламкі пластівці без запаху сирої риби'
    },
    campRehydration: {
      waterRatioNote: 'Додати 70 мл води (краще теплої) і 1 ч.л. олії, перемішати й намазувати на сухарі чи галети',
      soakMinutes: 2,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-white-bean-pate',
    title: 'Паштет із білої квасолі з розмарином (White Bean Paté)',
    category: 'spread',
    mealTypes: ['lunch'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 230,
    proteinPerServing: 14,
    fatPerServing: 3,
    carbsPerServing: 38,
    fiberPerServing: 8.0,
    rawIngredients: [
      { name: 'Квасоля біла варена', amount: 400, unit: 'г', category: 'бобові' },
      { name: 'Часник печений', amount: 20, unit: 'г', category: 'овочі' },
      { name: 'Розмарин сушений подрібнений', amount: 3, unit: 'г', category: 'спеції' },
      { name: 'Оливкова олія', amount: 10, unit: 'г', category: 'жири' },
      { name: 'Сіль, лимонний сік', amount: 10, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Подрібнити відварену квасолю з печеним часником та розмарином у блендері.',
      'Розмазати тонким шаром по лотках дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Повністю висихає до стану сухих чіпсів, що кришаться в пудру'
    },
    campRehydration: {
      waterRatioNote: 'Залити 80 мл води, перемішати 1 хвилину',
      soakMinutes: 1,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-black-bean-salsa',
    title: 'Сальса з чорної квасолі та томатів (Black Bean Salsa)',
    category: 'spread',
    mealTypes: ['lunch', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 55,
    kcalPerServing: 210,
    proteinPerServing: 11,
    fatPerServing: 1.5,
    carbsPerServing: 40,
    fiberPerServing: 7.5,
    rawIngredients: [
      { name: 'Чорна квасоля варена', amount: 300, unit: 'г', category: 'бобові' },
      { name: 'Томати стиглі без соку', amount: 200, unit: 'г', category: 'овочі' },
      { name: 'Перець солодкий і гострий халапеньйо', amount: 60, unit: 'г', category: 'овочі' },
      { name: 'Кінза свіжа подрібнена', amount: 15, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Квасолю злегка притиснути виделкою, овочі дрібно порубати, змішати зі спеціями.',
      'Викласти тонким шаром на піддони дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7-8 год',
      trayLining: 'Пергамент',
      drynessTest: 'Хрусткі розсипчасті шматочки'
    },
    campRehydration: {
      waterRatioNote: 'Залити 70-80 мл холодної води на 5 хв, вживати з галетами',
      soakMinutes: 5,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },

  // --- 3. Супи, чаудери, борщі та рагу (Soups, Chowders, Stews) ---
  {
    id: 'recipe-borscht-home-style',
    title: 'Борщ український домашній сушений з яловичиною',
    category: 'soup',
    mealTypes: ['lunch', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 75,
    kcalPerServing: 320,
    proteinPerServing: 22,
    fatPerServing: 10,
    carbsPerServing: 36,
    fiberPerServing: 6.8,
    rawIngredients: [
      { name: 'Яловичий фарш нежирний відварений', amount: 280, unit: 'г', category: 'м\'ясо' },
      { name: 'Буряк столовий варений тертий', amount: 250, unit: 'г', category: 'овочі' },
      { name: 'Капуста білокачанна нашаткована', amount: 200, unit: 'г', category: 'овочі' },
      { name: 'Морква та цибуля пасеровані', amount: 150, unit: 'г', category: 'овочі' },
      { name: 'Томатна паста густа 25%', amount: 60, unit: 'г', category: 'томат' },
      { name: 'Часник свіжий подрібнений', amount: 15, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Зварити повноцінний густий борщ на знежиреному бульйоні з вареним фаршем та всіма овочами.',
      'Томатну пасту та часник додати в кінці варіння.',
      'Остудити, віджати зайву рідку юшку через друшляк (юшку можна висушити на окремому силіконовому листі як соусний концентрат).',
      'Густу частину рівномірно розподілити шаром 5 мм по лотках дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '8-10 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Сухі, ламкі гранули м\'яса та овочів темно-бордового кольору'
    },
    campRehydration: {
      waterRatioNote: 'Залити 400 мл окропу на порцію, варити 3 хвилини, настояти під кришкою 5 хв',
      soakMinutes: 2,
      boilMinutes: 3,
      altitudeNote: 'Додати порцію сала або топленого масла прямо в тарілку перед вживанням'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'В. Хачикян + класична практика гірських походів'
  },
  {
    id: 'recipe-canyon-chili',
    title: 'Чілі Кон Карне по-каньйонськи (Canyon Country Chili)',
    category: 'main',
    mealTypes: ['lunch', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 430,
    proteinPerServing: 32,
    fatPerServing: 12,
    carbsPerServing: 48,
    fiberPerServing: 9.5,
    rawIngredients: [
      { name: 'Яловичий фарш нежирний', amount: 350, unit: 'г', category: 'м\'ясо' },
      { name: 'Квасоля червона варена', amount: 300, unit: 'г', category: 'бобові' },
      { name: 'Томати у власному соку подрібнені', amount: 250, unit: 'г', category: 'овочі' },
      { name: 'Перець болгарський та цибуля', amount: 150, unit: 'г', category: 'овочі' },
      { name: 'Суміш спецій чілі, часник, кумін', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Фарш обсмажити на сухій сковороді, злити жир, промити окропом.',
      'З\'єднати з квасолею, томатами, перцем, цибулею та спеціями.',
      'Тушкувати 20 хв на слабкому вогні до повного випаровування вільної рідини.',
      'Розкласти масу на піддони дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '8-10 год',
      trayLining: 'Силіконовий лист або пергамент',
      drynessTest: 'Квасоля розсипається в порошок при натисканні, м\'ясо тверде без м\'яких часток'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою на 1.5 см вище рівня страви (~350 мл/порцію), варити 3 хв',
      soakMinutes: 2,
      boilMinutes: 3,
      altitudeNote: 'Швидке відновлення навіть на висоті 4000 м, бо боби вже попередньо розварені!'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4'
  },
  {
    id: 'recipe-corn-chowder',
    title: 'Кукурудзяний чаудер з куркою та беконом (Corn Chowder Plus)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 80,
    kcalPerServing: 390,
    proteinPerServing: 24,
    fatPerServing: 14,
    carbsPerServing: 42,
    fiberPerServing: 4.8,
    rawIngredients: [
      { name: 'Куряче філе відварене розібране', amount: 250, unit: 'г', category: 'м\'ясо' },
      { name: 'Кукурудза солодка зерна', amount: 300, unit: 'г', category: 'овочі' },
      { name: 'Картопля відварена кубиками', amount: 200, unit: 'г', category: 'овочі' },
      { name: 'Сухе молоко', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Цибуля сушена, паприка, чебрець', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Половину кукурудзи збити блендером для вершкової текстури.',
      'Змішати з кубиками картоплі, курячим філе, цілими зернами кукурудзи та спеціями.',
      'Проварити 5 хв, розкласти на піддони дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '8 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Тверді сухі зерна та волокна'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350 мл окропу, варити 3 хв, всипати сухе молоко й перемішати',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4'
  },
  {
    id: 'recipe-sweet-potato-lentil-stew',
    title: 'Рагу з батату та червоної сочевиці (Sweet Potato Lentil Stew)',
    category: 'soup',
    mealTypes: ['lunch', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 360,
    proteinPerServing: 18,
    fatPerServing: 4,
    carbsPerServing: 62,
    fiberPerServing: 10.5,
    rawIngredients: [
      { name: 'Сочевиця червона', amount: 200, unit: 'г', category: 'бобові' },
      { name: 'Батат (солодка картопля) кубиками', amount: 350, unit: 'г', category: 'овочі' },
      { name: 'Морква та цибуля', amount: 150, unit: 'г', category: 'овочі' },
      { name: 'Імбир свіжий тертий і карі', amount: 12, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Зварити сочевицю з бататом, морквою та спеціями до повної готовності густого рагу (20 хв).',
      'Злегка розім\'яти товкачкою, розкласти шаром 4 мм на піддони.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7-9 год',
      trayLining: 'Силікон',
      drynessTest: 'Сухий ламкий пласт'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350-400 мл окропу, варити 2 хв, настояти 3 хв',
      soakMinutes: 1,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4'
  },
  {
    id: 'recipe-legume-salami-soup',
    title: 'Суп квасолевий з салямі (Legume-Salami Soup)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 80,
    kcalPerServing: 410,
    proteinPerServing: 20,
    fatPerServing: 17,
    carbsPerServing: 44,
    fiberPerServing: 8.0,
    rawIngredients: [
      { name: 'Квасоля строката варена', amount: 350, unit: 'г', category: 'бобові' },
      { name: 'Салямі суха дрібно нарізана', amount: 120, unit: 'г', category: 'м\'ясо' },
      { name: 'Томати сушені шматочками', amount: 40, unit: 'г', category: 'овочі' },
      { name: 'Цибуля сушена, базилік, орегано', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Квасолю зварити до м\'якості та розім\'яти наполовину.',
      'Салямі підсушити на паперовому рушнику від зайвого жиру.',
      'Змішати, розподілити по піддонах дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '7-8 год',
      trayLining: 'Пергамент',
      drynessTest: 'Ламкі шматочки без липкого жиру'
    },
    campRehydration: {
      waterRatioNote: 'Залити 400 мл окропу, варити 3 хв',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4'
  },
  {
    id: 'recipe-moroccan-chickpea-stew',
    title: 'Марокканське рагу з нуту з курагою (Moroccan Chickpea Stew)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 370,
    proteinPerServing: 16,
    fatPerServing: 6,
    carbsPerServing: 63,
    fiberPerServing: 9.8,
    rawIngredients: [
      { name: 'Нут відварений', amount: 350, unit: 'г', category: 'бобові' },
      { name: 'Курага нарізана смужками', amount: 80, unit: 'г', category: 'сухофрукти' },
      { name: 'Томати пасеровані з цибулею', amount: 180, unit: 'г', category: 'овочі' },
      { name: 'Кориця, зіра, коріандр, перець', amount: 10, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Нут злегка роздавити, змішати з томатною засмажкою, курагою та марокканськими спеціями.',
      'Протушкувати 10 хв і викласти на лотки.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '8 год',
      trayLining: 'Силікон',
      drynessTest: 'Хрусткий нут та сухі смужки кураги'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350 мл окропу, варити 3 хв, настояти 4 хв',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4'
  },
  {
    id: 'recipe-caldo-verde-hiker',
    title: 'Картопляний суп з капустою кале (Caldo Verde)',
    category: 'soup',
    mealTypes: ['lunch', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 70,
    kcalPerServing: 310,
    proteinPerServing: 16,
    fatPerServing: 11,
    carbsPerServing: 37,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Картопляне пюре густе', amount: 350, unit: 'г', category: 'овочі' },
      { name: 'Капуста білокачанна або кале дрібна', amount: 200, unit: 'г', category: 'овочі' },
      { name: 'Ковбаса мисливська сушена', amount: 100, unit: 'г', category: 'м\'ясо' },
      { name: 'Часник та оливкова олія', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Зварити суп, розім\'яти картоплю в бульйоні, додати дрібно нарізану зелень та ковбасу.',
      'Висушити на піддонах.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '7-8 год',
      trayLining: 'Пергамент',
      drynessTest: 'Сухі пластівці'
    },
    campRehydration: {
      waterRatioNote: 'Залити 400 мл окропу, прокип\'ятити 2 хв',
      soakMinutes: 1,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4'
  },

  // --- 4. Пасти, запіканки та другі страви (Pasta & Casseroles) ---
  {
    id: 'recipe-sierra-spaghetti',
    title: 'Спагеті Сьєрра з м\'ясним соусом (Sierra Spaghetti)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 95,
    kcalPerServing: 440,
    proteinPerServing: 28,
    fatPerServing: 13,
    carbsPerServing: 53,
    fiberPerServing: 4.8,
    rawIngredients: [
      { name: 'Спагеті твердих сортів (зламані навпіл)', amount: 220, unit: 'г', category: 'макарони' },
      { name: 'Фарш яловичий нежирний відварений', amount: 250, unit: 'г', category: 'м\'ясо' },
      { name: 'Соус томатний з базиліком і часником', amount: 200, unit: 'г', category: 'соус' },
      { name: 'Сир Пармезан тертий', amount: 50, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Зварити спагеті аль-денте, промити холодною водою.',
      'Фарш проварити з томатним соусом 10 хв.',
      'Перемішати пасту з соусом і м\'ясом так, щоб кожна макаронина покрилася соусом.',
      'Рівномірно розподілити на лотках дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '7-9 год',
      trayLining: 'Пергамент або силікон',
      drynessTest: 'Паста тверда, злегка пружна при спробі зігнути, м\'ясо абсолютно сухе'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою врівень з пастою (~300 мл/порцію), варити 3 хвилини, настояти 3 хв',
      soakMinutes: 1,
      boilMinutes: 3,
      altitudeNote: 'Готується вдвічі швидше за звичайні сухі макарони, оскільки крохмаль уже клейстеризований!'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 5'
  },
  {
    id: 'recipe-lazy-lasagna',
    title: 'Лазанья лінива з сиром та яловичиною (Lazy Lasagna)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 95,
    kcalPerServing: 450,
    proteinPerServing: 30,
    fatPerServing: 15,
    carbsPerServing: 48,
    fiberPerServing: 4.2,
    rawIngredients: [
      { name: 'Широка яєчна локшина / шматочки листів лазаньї', amount: 200, unit: 'г', category: 'макарони' },
      { name: 'Яловичий фарш варений знежирений', amount: 250, unit: 'г', category: 'м\'ясо' },
      { name: 'Томатний соус маринара', amount: 220, unit: 'г', category: 'соус' },
      { name: 'Сир Моцарела / Чеддер знежирений', amount: 80, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Зварити локшину, змішати з м\'ясним соусом та тертим сиром.',
      'Викласти тонким шаром на лотки дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '8-9 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Сухі ламкі шматочки локшини з соусом'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою трохи вище рівня страви, варити 3 хв',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 5'
  },
  {
    id: 'recipe-spicy-chicken-pasta',
    title: 'Гостра куряча паста з паприкою (Spicy Chicken Pasta)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 420,
    proteinPerServing: 32,
    fatPerServing: 10,
    carbsPerServing: 50,
    fiberPerServing: 3.8,
    rawIngredients: [
      { name: 'Паста пір\'я (Penne)', amount: 200, unit: 'г', category: 'макарони' },
      { name: 'Куряче філе відварене волокнами', amount: 280, unit: 'г', category: 'м\'ясо' },
      { name: 'Томати печені та паприка гостра', amount: 150, unit: 'г', category: 'овочі' },
      { name: 'Часник та петрушка', amount: 15, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Зварити пасту, з\'єднати з куркою, томатною заправкою та спеціями.',
      'Висушити на пергаменті.'
    ],
    dehydrationParams: {
      tempCelsius: 63,
      timeHours: '7-8 год',
      trayLining: 'Пергамент',
      drynessTest: 'Тверді сухі макаронини та волокна'
    },
    campRehydration: {
      waterRatioNote: 'Залити 300 мл окропу, прокип\'ятити 2 хв, настояти 3 хв',
      soakMinutes: 1,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 5'
  },
  {
    id: 'recipe-sesame-noodles-thai',
    title: 'Тайська локшина з кунжутом та куркою (Thai Sesame Noodles)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 410,
    proteinPerServing: 26,
    fatPerServing: 12,
    carbsPerServing: 50,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Яєчна або рисова локшина', amount: 220, unit: 'г', category: 'макарони' },
      { name: 'Курячий фарш варено-сушений', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Кунжутна паста та соєвий соус', amount: 50, unit: 'г', category: 'соус' },
      { name: 'Імбир сушений, кунжут смажений', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Зварити локшину, перемішати з куркою, кунжутним соусом та імбиром.',
      'Висушити в дегідраторі.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7 год',
      trayLining: 'Пергамент',
      drynessTest: 'Ламкі гнізда локшини'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом урівень, накрити на 3 хвилини',
      soakMinutes: 3,
      boilMinutes: 1
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 5'
  },
  {
    id: 'recipe-chicken-pilaf-oriental',
    title: 'Плов східний сушений з курячим філе та барбарисом',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 420,
    proteinPerServing: 26,
    fatPerServing: 11,
    carbsPerServing: 55,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Рис пропарений довгозерний', amount: 220, unit: 'г', category: 'крупи' },
      { name: 'Куряче філе знежирене', amount: 250, unit: 'г', category: 'м\'ясо' },
      { name: 'Морква соломкою та цибуля', amount: 180, unit: 'г', category: 'овочі' },
      { name: 'Барбарис сушений, зіра, часник', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Зварити справжній розсипчастий плов без зайвої олії (підсушити м\'ясо та овочі перед з\'єднанням з рисом).',
      'Остудити, перетерти грудочки рису і розсипати тонким шаром по піддонах.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '8-9 год',
      trayLining: 'Сітчастий лист',
      drynessTest: 'Тверді сухі зерна рису та шматочки м\'яса'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою на 1 см вище рису, варити 3 хв, настояти у спальнику 5 хв',
      soakMinutes: 2,
      boilMinutes: 3,
      altitudeNote: 'У поході на висоті >3000 м економить до 20 хвилин варіння рису!'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 4 + практика гірських походів'
  },
  {
    id: 'recipe-feta-couscous-mediterranean',
    title: 'Кускус по-середземноморськи з фетою та в\'яленими томатами',
    category: 'main',
    mealTypes: ['lunch', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 390,
    proteinPerServing: 17,
    fatPerServing: 12,
    carbsPerServing: 54,
    fiberPerServing: 5.2,
    rawIngredients: [
      { name: 'Кускус швидкого приготування', amount: 200, unit: 'г', category: 'крупи' },
      { name: 'В\'ялені томати шматочками', amount: 50, unit: 'г', category: 'овочі' },
      { name: 'Сир фета сушений крихтою', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Оливки сушені подрібнені', amount: 30, unit: 'г', category: 'овочі' },
      { name: 'Сушені орегано, базилік та часник', amount: 8, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Томати та оливки підсушити в дегідраторі.',
      'Змішати сухий кускус з усіма інгредієнтами безпосередньо перед пакуванням.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '6 год для овочів',
      trayLining: 'Сітка',
      drynessTest: 'Шкірясті сухі томати'
    },
    campRehydration: {
      waterRatioNote: 'Залити 250 мл окропу, перемішати, закрити кришкою на 4 хвилини (варити не потрібно!)',
      soakMinutes: 4,
      boilMinutes: 0,
      altitudeNote: 'Ідеальна штурмова страва, що взагалі не вимагає варіння'
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 5'
  },
  {
    id: 'recipe-black-bean-stroganoff',
    title: 'Строганов із чорної квасолі з грибами (Black Bean Stroganoff)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 380,
    proteinPerServing: 20,
    fatPerServing: 8,
    carbsPerServing: 56,
    fiberPerServing: 8.5,
    rawIngredients: [
      { name: 'Локшина яєчна відварена', amount: 180, unit: 'г', category: 'макарони' },
      { name: 'Чорна квасоля варена', amount: 220, unit: 'г', category: 'бобові' },
      { name: 'Гриби печериці пасеровані з цибулею', amount: 200, unit: 'г', category: 'гриби' },
      { name: 'Сметанний або вершковий сухий соус', amount: 50, unit: 'г', category: 'соус' }
    ],
    homePrepSteps: [
      'Приготувати строганов: змішати локшину, квасолю, гриби з цибулею та вершковим соусом.',
      'Викласти тонким шаром на лотки дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7-9 год',
      trayLining: 'Силікон',
      drynessTest: 'Повністю сухі ламкі шматочки локшини з грибами'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою трохи вище суміші, варити 3 хв',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Backpack Gourmet, Ch. 5'
  },

  // --- 5. Снеки, батончики та перекуси (Snacks & Pocket Food) ---
  {
    id: 'recipe-trail-jerky-beef',
    title: 'Джерки яловичі класичні (Beef Jerky)',
    category: 'snack',
    mealTypes: ['snack', 'lunch'],
    servingsYield: 4,
    dryWeightPerServingGrams: 40,
    kcalPerServing: 165,
    proteinPerServing: 22,
    fatPerServing: 6,
    carbsPerServing: 4,
    fiberPerServing: 0.0,
    rawIngredients: [
      { name: 'Яловичина нежирна (вирізка або огузок)', amount: 450, unit: 'г', category: 'м\'ясо' },
      { name: 'Соєвий соус', amount: 60, unit: 'мл', category: 'соус' },
      { name: 'Вустерширський соус', amount: 20, unit: 'мл', category: 'соус' },
      { name: 'Часник сушений, чорний перець, коріандр', amount: 10, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'М\'ясо злегка підморозити, нарізати поперек волокон тонкими смужками 4-5 мм.',
      'Замаринувати в суміші соусів та спецій на 8-12 год у холодильнику.',
      'Обсушити паперовими рушниками і розкласти на решітки.'
    ],
    dehydrationParams: {
      tempCelsius: 65,
      timeHours: '6-8 год',
      trayLining: 'Сітка',
      drynessTest: 'Смужка гнеться і тріскається по волокнах, але не ламається навпіл'
    },
    campRehydration: {
      waterRatioNote: 'Готове до вживання без відновлення. Можна жувати на переходах як кармхарч',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 2'
  },
  {
    id: 'recipe-fruit-leather-strawberry',
    title: 'Пастила полунично-яблучна (Strawberry-Apple Fruit Leather)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 35,
    kcalPerServing: 110,
    proteinPerServing: 1.0,
    fatPerServing: 0.5,
    carbsPerServing: 26,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Яблука запечені', amount: 300, unit: 'г', category: 'фрукти' },
      { name: 'Полуниця свіжа або морожена', amount: 250, unit: 'г', category: 'ягоди' },
      { name: 'Мед натуральний', amount: 30, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Збити запечені яблука з полуницею та медом у гладке пюре.',
      'Рівномірно розподілити шаром 3 мм на змащений краплею олії силіконовий лист.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '8-10 год',
      trayLining: 'Силіконовий лист',
      drynessTest: 'Лист легко відділяється, шкірястий, не липне до пальців у центрі'
    },
    campRehydration: {
      waterRatioNote: 'Готове до вживання. Згортати в рулетики з пергаментом',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 3'
  },
  {
    id: 'recipe-puma-bars',
    title: 'Енергетичні батончики «Пума» з горіхами та насінням льону (Puma Bars)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 50,
    kcalPerServing: 240,
    proteinPerServing: 8,
    fatPerServing: 14,
    carbsPerServing: 22,
    fiberPerServing: 5.0,
    rawIngredients: [
      { name: 'Вівсяні пластівці', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Насіння льону подрібнене', amount: 30, unit: 'г', category: 'насіння' },
      { name: 'Арахіс або мигдаль подрібнений', amount: 50, unit: 'г', category: 'горіхи' },
      { name: 'Родзинки та курага подрібнені', amount: 50, unit: 'г', category: 'сухофрукти' },
      { name: 'Мед та арахісова паста', amount: 60, unit: 'г', category: 'паста' }
    ],
    homePrepSteps: [
      'Змішати пластівці, насіння, горіхи та сухофрукти з підігрітою сумішшю меду та арахісової пасти.',
      'Утрамбувати у форму шаром 1 см, підсушити в дегідраторі та нарізати на батончики.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '6 год',
      trayLining: 'Пергамент',
      drynessTest: 'Щільні пружні брусочки'
    },
    campRehydration: {
      waterRatioNote: 'Готове карманне харчування',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 3'
  },
  {
    id: 'recipe-spiced-mixed-nuts',
    title: 'Пряна суміш горіхів зі спеціями (Spiced Mixed Nuts)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 45,
    kcalPerServing: 280,
    proteinPerServing: 9,
    fatPerServing: 25,
    carbsPerServing: 6,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Мигдаль, кеш\'ю та волоські горіхи', amount: 180, unit: 'г', category: 'горіхи' },
      { name: 'Яєчний білок (для фіксації спецій)', amount: 15, unit: 'г', category: 'яйця' },
      { name: 'Паприка копчена, сіль, кайєнський перець', amount: 8, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Горіхи злегка змочити збитим білком зі спеціями та сіллю.',
      'Розкласти в один шар на сітку дегідратора і просушити.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '4-5 год',
      trayLining: 'Сітка',
      drynessTest: 'Хрусткі горіхи з рівномірною ароматною скоринкою'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на привалі',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Backpack Gourmet, Ch. 3'
  }
];

export function getRecipeById(id: string): DehydratedRecipe | undefined {
  return DEHYDRATED_RECIPES.find(r => r.id === id);
}
