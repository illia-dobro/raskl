import { DehydratedRecipe } from '../types/domain';

export const DEHYDRATED_RECIPES: DehydratedRecipe[] = [
  // --- 1. Сніданки (Breakfasts) ---
  {
    id: 'recipe-celebration-brunch',
    title: 'Картопляне пюре з омлетом, сиром та сушеною шинкою',
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
      { name: 'Картопляні пластівці (сухі, магазин)', amount: 140, unit: 'г', category: 'крупи' },
      { name: 'Яєчний порошок / сухий меланж (магазин)', amount: 70, unit: 'г', category: 'яйця' },
      { name: 'Шинка нежирна варено-сушена (сушиться окремо)', amount: 55, unit: 'г', category: 'м\'ясо' },
      { name: 'Сир твердий тертий сухий (магазин)', amount: 55, unit: 'г', category: 'молочні' },
      { name: 'Цибуля зелена та кріп сушені (окремо)', amount: 20, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Сушаться окремо ТІЛЬКИ шинка та зелень: нежирну шинку нарізати дрібними кубиками 3-4 мм і висушити в дегідраторі при 65°C (5-6 год). Зелену цибулю та кріп висушити окремо при 50°C.',
      'Картопляні пластівці, яєчний порошок та тертий твердий сир купуються готовими в магазині (їх сушити не потрібно).',
      'Збірка вдома: змішати всі сухі компоненти у герметичний зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 65,
      timeHours: '5-6 год (окремо шинка та зелень)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Кубики шинки сухі та тверді без жиру; зелень крихка'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~300 мл на порцію), перемішати, накрити кришкою та настояти 3-4 хв. Варити не потрібно!',
      soakMinutes: 4,
      boilMinutes: 0,
      altitudeNote: 'Утеплити казан на 4 хв — страва готується без витрати газу на кип\'ятіння'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка (конструктор сухих компонентів)'
  },
  {
    id: 'recipe-granola-alpine',
    title: 'Альпійська гранола з горіхами, ягодами та сухим молоком',
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
      { name: 'Вівсяні пластівці або готова гранола (магазин)', amount: 190, unit: 'г', category: 'крупи' },
      { name: 'Сухе молоко незбиране (магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Горіхи волоські та мигдаль (магазин)', amount: 60, unit: 'г', category: 'горіхи' },
      { name: 'Чорниця, журавлина або полуниця сушені (окремо)', amount: 50, unit: 'г', category: 'ягоди' }
    ],
    homePrepSteps: [
      'У дегідраторі сушаться лише свіжі ягоди (при 55°C, 6-8 год) або беруться готові сушені ягоди.',
      'Гранола/вівсяні пластівці, горіхи та сухе молоко беруться готовими сухими з магазину.',
      'Збірка вдома: змішати пластівці, горіхи, сушені ягоди та сухе молоко в зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '6-8 год (тільки для ягід)',
      trayLining: 'Сітчастий піддон',
      drynessTest: 'Сухі ягоди не виділяють соку при стисканні'
    },
    campRehydration: {
      waterRatioNote: 'Залити 150-200 мл теплої або холодної води прямо в мисці, перемішати і зачекати 2 хв',
      soakMinutes: 2,
      boilMinutes: 0
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-quick-oatmeal-plus',
    title: 'Вівсянка з сушеними яблуками, корицею та молоком',
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
      { name: 'Вівсяні пластівці швидкого приготування (магазин)', amount: 180, unit: 'г', category: 'крупи' },
      { name: 'Сухе молоко незбиране (магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Яблука сушені дрібними кубиками (окремо)', amount: 50, unit: 'г', category: 'фрукти' },
      { name: 'Горіхи подрібнені, насіння льону та кориця (магазин)', amount: 30, unit: 'г', category: 'горіхи' }
    ],
    homePrepSteps: [
      'Сушаться окремо лише яблука: нарізати тонкими кубиками або скибочками і висушити в дегідраторі при 55°C (5-6 год).',
      'Збірка вдома: у зіп-пакет змішати сухі вівсяні пластівці, сухе молоко, сушені яблука, горіхи та мелену корицю.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5-6 год (окремо тільки яблука)',
      trayLining: 'Сітка',
      drynessTest: 'Пружні сухі кубики яблук без вологи'
    },
    campRehydration: {
      waterRatioNote: 'Залити 250 мл окропу на порцію, накрити кришкою на 3-4 хв (варити не потрібно)',
      soakMinutes: 3,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-packer-potatoes-cheese',
    title: 'Картопляне пюре по-мисливськи з куркою та сиром',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 410,
    proteinPerServing: 22,
    fatPerServing: 18,
    carbsPerServing: 40,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Картопляні пластівці (сухі, магазин)', amount: 160, unit: 'г', category: 'крупи' },
      { name: 'Куряче філе варено-сушене (окремо)', amount: 75, unit: 'г', category: 'м\'ясо' },
      { name: 'Сир Чеддер або Пармезан сухий (магазин)', amount: 65, unit: 'г', category: 'молочні' },
      { name: 'Сухе молоко або сухі вершки (магазин)', amount: 40, unit: 'г', category: 'молочні' },
      { name: 'Морква, зелена цибуля та кріп сушені (окремо)', amount: 20, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Сушаться окремо лише куряче філе та овочі/зелень! Картопляні пластівці, сухі вершки та сир купуються готовими в магазині.',
      'Куряче філе відварити у підсоленій воді, розібрати на тонкі волокна або дрібні шматочки й висушити при 65°C (5-6 год). Натерту моркву та зелень висушити окремо при 55°C.',
      'Збірка вдома: змішати в зіп-пакеті картопляні пластівці, сухе молоко, сушену курку, сушені овочі та сир.'
    ],
    dehydrationParams: {
      tempCelsius: 65,
      timeHours: '5-6 год (окремо курятина та зелень з морквою)',
      trayLining: 'Сітчастий лист або пергамент',
      drynessTest: 'Волокна курки сухі та ламкі'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~300-350 мл на порцію), перемішати, накрити кришкою на 3-4 хв.',
      soakMinutes: 4,
      boilMinutes: 0
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-breakfast-casserole',
    title: 'Яєчний скрембл зі шпинатом, сиром фета та сухариками',
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
      { name: 'Яєчний порошок / сухий меланж (магазин)', amount: 120, unit: 'г', category: 'яйця' },
      { name: 'Сухарики пшеничні дрібні (магазин)', amount: 80, unit: 'г', category: 'хліб' },
      { name: 'Сухе молоко незбиране (магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Сир фета або твердий сушений (магазин)', amount: 50, unit: 'г', category: 'молочні' },
      { name: 'Шпинат та томати сушені (окремо)', amount: 30, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Сушаться окремо лише шпинат і томати: свіжий шпинат та нарізані томати висушити на окремих піддонах дегідратора при 55°C (4-5 год).',
      'Яєчний порошок, сухе молоко, сир та сухарики беруться готовими сухими з магазину.',
      'Збірка вдома: змішати яєчний порошок, сухе молоко, сушений шпинат, томати та сир у пакет. Сухарики покласти в окремий пакетик для подачі.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '4-5 год (окремо тільки шпинат і томати)',
      trayLining: 'Сітка',
      drynessTest: 'Шпинат крихкий, томати сухі'
    },
    campRehydration: {
      waterRatioNote: 'Розвести теплою водою (~200 мл на порцію), прогріти в казані 2 хв, постійно помішуючи, посипати сухариками.',
      soakMinutes: 2,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },

  // --- 2. Намазки, паштети та обідні страви (Lunch Spreads & Midday Meals) ---
  {
    id: 'recipe-quick-hummus',
    title: 'Хумус похідний з нутового борошна з сушеним часником',
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
      { name: 'Нутове борошно або нутові пластівці (сухі, магазин)', amount: 170, unit: 'г', category: 'бобові' },
      { name: 'Кунжут мелений або суха паста тахіні (магазин)', amount: 40, unit: 'г', category: 'насіння' },
      { name: 'Часник та солодка паприка сушені (окремо)', amount: 20, unit: 'г', category: 'овочі' },
      { name: 'Зіра (кумін) мелена, коріандр, лимонна кислота (магазин)', amount: 10, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Варити і сушити рідкий хумус НЕ потрібно! Основа береться готовою сухою з магазину — інстантне нутове борошно або нутові пластівці.',
      'Окремо сушаться лише часник та солодкий перець/паприка (або беруться готові сушені спеції).',
      'Збірка вдома: змішати нутове борошно, мелений кунжут, сушений часник, паприку, зіру та дрібку лимонної кислоти у зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '4-5 год (тільки для сушіння часнику та перцю)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Сухі пластинки часнику та перцю'
    },
    campRehydration: {
      waterRatioNote: 'Розвести 80-100 мл теплої або холодної води, додати ложку олії, перемішати до кремової пасти й намазувати на галети',
      soakMinutes: 2,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-creamy-tuna-spread',
    title: 'Рибний паштет-намазка з сушеним тунцем та зеленню',
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
      { name: 'Тунець у власному соку або біла риба варено-сушена (окремо)', amount: 110, unit: 'г', category: 'риба' },
      { name: 'Картопляні пластівці для основи паштету (магазин)', amount: 50, unit: 'г', category: 'крупи' },
      { name: 'Сухе молоко або сухі вершки (магазин)', amount: 40, unit: 'г', category: 'молочні' },
      { name: 'Цибуля ріпчаста та кріп сушені (окремо)', amount: 20, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Сушаться окремо лише риба та зелень з цибулею! Не потрібно замішувати сиру пасту перед сушінням.',
      'Тунця у власному соку (без олії!) або відварене філе нежирної риби розібрати на дрібні пластівці і висушити окремо при 65°C (5-6 год). Цибулю та кріп висушити окремо.',
      'Збірка вдома: змішати в зіп-пакеті сушену рибу, сухі картопляні пластівці, сухі вершки та сушену зелень.'
    ],
    dehydrationParams: {
      tempCelsius: 65,
      timeHours: '5-6 год (окремо рибні пластівці та зелень)',
      trayLining: 'Пергамент або сітка',
      drynessTest: 'Сухі ламкі волокна риби без вологи'
    },
    campRehydration: {
      waterRatioNote: 'Додати 70-80 мл теплої води, перемішати й дати постояти 2 хв. Намазувати на житні сухарі чи галети',
      soakMinutes: 2,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-white-bean-pate',
    title: 'Квасолевий паштет-намазка з сушеними томатами та часником',
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
      { name: 'Квасолеві пластівці швидкого приготування (магазин)', amount: 180, unit: 'г', category: 'бобові' },
      { name: 'Томати та часник сушені (окремо)', amount: 35, unit: 'г', category: 'овочі' },
      { name: 'Горіхи волоські подрібнені (магазин)', amount: 15, unit: 'г', category: 'горіхи' },
      { name: 'Розмарин, базилік та чорний перець сушені', amount: 10, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Квасолеві пластівці беруться готовими сухими з магазину (або відварена біла квасоля сушиться окремо).',
      'У дегідраторі окремо сушаться нарізані томати, часник та пряні трави при 55°C.',
      'Збірка вдома: з\'єднати в пакеті сухі квасолеві пластівці, сушені томати з часником, подрібнені горіхи та спеції.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5 год (окремо томати та часник)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Сухі шматочки томатів і часнику'
    },
    campRehydration: {
      waterRatioNote: 'Залити 80-90 мл гарячої або теплої води, перемішати 1 хв до густої намазки',
      soakMinutes: 2,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-black-bean-salsa',
    title: 'Мексиканська закуска з сушених томатів, перцю та квасолі',
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
      { name: 'Квасоля чорна варено-сушена або пластівці (окремо)', amount: 110, unit: 'г', category: 'бобові' },
      { name: 'Томати стиглі сушені кубиками (окремо)', amount: 60, unit: 'г', category: 'овочі' },
      { name: 'Перець солодкий та чилі сушені (окремо)', amount: 35, unit: 'г', category: 'овочі' },
      { name: 'Кінза та зелена цибуля сушені (окремо)', amount: 15, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Кожен інгредієнт сушиться окремо на своєму лотку дегідратора: томати кубиками (55°C), солодкий і гострий перець (55°C), зелень (50°C) та відварена квасоля (60°C).',
      'Збірка вдома: змішати висушені овочі, зелень та квасолю в один зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '5-7 год (окремо овочі та квасоля)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Овочі та квасоля сухі й розсипчасті'
    },
    campRehydration: {
      waterRatioNote: 'Залити 70-80 мл води на 4-5 хв, подавати з галетами чи лавашем',
      soakMinutes: 5,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },

  // --- 3. Супи, борщі та гарячі перші страви (Soups & Stews) ---
  {
    id: 'recipe-borscht-home-style',
    title: 'Борщ український з яловичиною та сушеними овочами',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 75,
    kcalPerServing: 320,
    proteinPerServing: 22,
    fatPerServing: 10,
    carbsPerServing: 36,
    fiberPerServing: 6.8,
    rawIngredients: [
      { name: 'Картопляні пластівці або картопля сушена (магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Яловичина варено-сушена фарш/волокна (сушиться окремо)', amount: 70, unit: 'г', category: 'м\'ясо' },
      { name: 'Буряк столовий сушений соломкою (сушиться окремо)', amount: 60, unit: 'г', category: 'овочі' },
      { name: 'Капуста білокачанна сушена (сушиться окремо)', amount: 40, unit: 'г', category: 'овочі' },
      { name: 'Морква, цибуля та томати сушені (окремо)', amount: 35, unit: 'г', category: 'овочі' },
      { name: 'Часник сушений, кріп, петрушка та лавровий лист', amount: 15, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Варити і сушити готовий рідкий борщ НЕ потрібно! У дегідраторі сушаться окремо виключно овочі та м\'ясо.',
      'Овочі (окремо на піддонах при 55°C): натертий буряк, тонко нашаткована капуста, терта морква, нарізана цибуля та томати.',
      'М\'ясо (окремо при 65°C): відварений нежирний яловичий фарш або дрібно нарізана відварена яловичина (промита від жиру).',
      'Збірка вдома: у герметичний зіп-пакет зсипати сушений буряк, капусту, моркву, цибулю, томати, сушену яловичину, картопляні пластівці та сушену зелень зі спеціями.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '5-7 год (окремо нарізані овочі при 55°C та м\'ясо при 65°C)',
      trayLining: 'Сітчасті піддони',
      drynessTest: 'Овочі ламкі та сухі, гранули яловичини тверді без жиру'
    },
    campRehydration: {
      waterRatioNote: 'Всипати сухий набір у казан з окропом (~350-400 мл на порцію), додати ложку томатної пасти (із загальної комори), проварити 4-5 хв і настояти 5 хв під кришкою',
      soakMinutes: 5,
      boilMinutes: 4,
      altitudeNote: 'Подавати з нарізаним салом і часником'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка (сухий борщовий набір)'
  },
  {
    id: 'recipe-canyon-chili',
    title: 'Чілі Кон Карне з яловичиною, квасолею та сушеними томатами',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 430,
    proteinPerServing: 32,
    fatPerServing: 12,
    carbsPerServing: 48,
    fiberPerServing: 9.5,
    rawIngredients: [
      { name: 'Квасолеві пластівці або квасоля червона сушена (окремо)', amount: 150, unit: 'г', category: 'бобові' },
      { name: 'Яловичий фарш варено-сушений (окремо)', amount: 90, unit: 'г', category: 'м\'ясо' },
      { name: 'Томати сушені кубиками (окремо)', amount: 60, unit: 'г', category: 'овочі' },
      { name: 'Перець болгарський та цибуля сушені (окремо)', amount: 45, unit: 'г', category: 'овочі' },
      { name: 'Паприка копчена, зіра, чилі, часник сушений (магазин)', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Тушкувати і сушити всю страву разом НЕ потрібно! М\'ясо та овочі сушаться окремо.',
      'Яловичий фарш відварити, промити окропом від жиру і висушити окремо при 65°C (5-6 год).',
      'Солодкий перець, цибулю та томати нарізати й висушити на окремих сітках при 55°C. Квасоля береться у вигляді готових пластівців або відварюється й сушиться окремо.',
      'Збірка вдома: змішати в зіп-пакеті сушений фарш, суху квасолю, сушені томати, перець, цибулю та спеції чілі.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5-6 год (окремо фарш та нарізані овочі)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Фарш твердий і сухий, овочі ламкі'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~350 мл/порцію), варити 3-4 хв, настояти 4 хв під кришкою',
      soakMinutes: 4,
      boilMinutes: 4,
      altitudeNote: 'Швидке приготування без тривалого виварювання бобів'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-corn-chowder',
    title: 'Кукурудзяний крем-суп (чаудер) з куркою та сушеними овочами',
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
      { name: 'Картопляні пластівці (сухі, магазин)', amount: 130, unit: 'г', category: 'крупи' },
      { name: 'Куряче філе варено-сушене (окремо)', amount: 75, unit: 'г', category: 'м\'ясо' },
      { name: 'Кукурудза солодка сушена зернами (окремо)', amount: 55, unit: 'г', category: 'овочі' },
      { name: 'Сухе молоко або сухі вершки (магазин)', amount: 45, unit: 'г', category: 'молочні' },
      { name: 'Морква, цибуля та кріп сушені (окремо)', amount: 15, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Варити суп вдома і збивати блендером НЕ потрібно! Кремову основу створюють сухі картопляні пластівці та сухі вершки з магазину.',
      'У дегідраторі окремо сушаться лише: відварене куряче філе волокнами (65°C), солодка кукурудза зернами та натерта морква з цибулею (55°C).',
      'Збірка вдома: змішати в зіп-пакеті картопляні пластівці, сухе молоко, сушену курку, кукурудзу та овочі.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5-6 год (окремо куряче філе, кукурудза та морква)',
      trayLining: 'Сітка',
      drynessTest: 'Зерна кукурудзи та волокна курки повністю сухі'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350 мл окропу на порцію, проварити 3 хв, настояти 3 хв під кришкою',
      soakMinutes: 3,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-sweet-potato-lentil-stew',
    title: 'Суп-рагу з червоної сочевиці з сушеними овочами та карі',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 360,
    proteinPerServing: 18,
    fatPerServing: 4,
    carbsPerServing: 62,
    fiberPerServing: 10.5,
    rawIngredients: [
      { name: 'Сочевиця червона колота швидкого варіння (суха, магазин)', amount: 220, unit: 'г', category: 'бобові' },
      { name: 'Морква та гарбуз/батат сушені соломкою (окремо)', amount: 65, unit: 'г', category: 'овочі' },
      { name: 'Томати та цибуля сушені (окремо)', amount: 40, unit: 'г', category: 'овочі' },
      { name: 'Імбир мелений, карі, коріандр, часник (магазин)', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Червону сочевицю варити і сушити вдома НЕ потрібно! Колота червона сочевиця береться сухою з магазину — в поході вона розварюється сама за 5 хвилин.',
      'У дегідраторі окремо сушаться лише овочі: натерта морква, гарбуз (або батат), цибуля та томати при 55°C (5 год).',
      'Збірка вдома: змішати суху червону сочевицю, сушені овочі та прянощі карі в зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5 год (сушаться тільки нарізані овочі)',
      trayLining: 'Сітчастий піддон',
      drynessTest: 'Суха ламка соломка моркви та гарбуза'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350-400 мл окропу на порцію, варити 5 хв на слабкому вогні, настояти 3 хв',
      soakMinutes: 3,
      boilMinutes: 5
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-legume-salami-soup',
    title: 'Горохово-квасолевий суп із салямі та сушеними овочами',
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
      { name: 'Горохові або квасолеві пластівці швидкі (сухі, магазин)', amount: 180, unit: 'г', category: 'бобові' },
      { name: 'Салямі або сирокопчена ковбаса сушена (окремо)', amount: 80, unit: 'г', category: 'м\'ясо' },
      { name: 'Морква, томати та цибуля сушені (окремо)', amount: 45, unit: 'г', category: 'овочі' },
      { name: 'Часник сушений, копчена паприка, зелень', amount: 15, unit: 'г', category: 'зелень' }
    ],
    homePrepSteps: [
      'Горохові та квасолеві пластівці купуються готовими сухими в магазині (варити й сушити горохове пюре не потрібно).',
      'У дегідраторі окремо сушаться морква, томати, цибуля та зелень (55°C). Салямі нарізається тонкими скибочками і підсушується окремо від зайвого жиру (або береться цілою палкою у вакуумі).',
      'Збірка вдома: змішати сухі бобові пластівці, сушені овочі та спеції у зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '4-5 год (окремо овочі та скибочки ковбаси)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Хрусткі овочі, сухі скибочки салямі'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350-400 мл окропу на порцію, проварити 3 хв, настояти 3 хв',
      soakMinutes: 3,
      boilMinutes: 3
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-moroccan-chickpea-stew',
    title: 'Кускус по-марокканськи з нутом, курагою та сушеними овочами',
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
      { name: 'Кускус швидкого приготування (сухий, магазин)', amount: 160, unit: 'г', category: 'крупи' },
      { name: 'Нут варено-сушений або нутові пластівці (окремо)', amount: 70, unit: 'г', category: 'бобові' },
      { name: 'Курага та родзинки нарізані (магазин)', amount: 55, unit: 'г', category: 'сухофрукти' },
      { name: 'Томати, морква та цибуля сушені (окремо)', amount: 45, unit: 'г', category: 'овочі' },
      { name: 'Зіра, коріандр, кориця, перець (магазин)', amount: 10, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Нічого не тушкується разом! Кускус, курага, родзинки та спеції купуються сухими в магазині.',
      'Окремо в дегідраторі сушаться лише: нарізані томати, морква й цибуля (55°C) та відварений нут (60°C).',
      'Збірка вдома: з\'єднати в зіп-пакеті сухий кускус, сушений нут, нарізану курагу, сушені овочі та східні прянощі.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '5-6 год (окремо овочі та відварений нут)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі та хрусткий нут'
    },
    campRehydration: {
      waterRatioNote: 'Залити 300 мл окропу на порцію, проварити 1-2 хв (або просто запарити під кришкою на 5 хв)',
      soakMinutes: 5,
      boilMinutes: 1
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-caldo-verde-hiker',
    title: 'Картопляний суп з сушеною капустою та ковбасками (Caldo Verde)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 70,
    kcalPerServing: 310,
    proteinPerServing: 16,
    fatPerServing: 11,
    carbsPerServing: 37,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Картопляні пластівці (сухі, магазин)', amount: 145, unit: 'г', category: 'крупи' },
      { name: 'Ковбаски мисливські сушені кружальцями (окремо)', amount: 75, unit: 'г', category: 'м\'ясо' },
      { name: 'Капуста білокачанна або кале сушена (окремо)', amount: 40, unit: 'г', category: 'овочі' },
      { name: 'Цибуля сушена, часник та зелень (окремо)', amount: 20, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Картопляні пластівці беруться готові сухі з магазину (варити і сушити картоплю НЕ потрібно).',
      'У дегідраторі окремо сушаться лише капуста, цибуля та ковбаски: капусту тонко нашаткувати і сушити при 55°C (3-4 год). Ковбаски нарізати тонкими кружальцями 2 мм, промокнути серветкою від жиру і сушити при 65°C.',
      'Збірка вдома: змішати сухі картопляні пластівці, сушену капусту, ковбасу та зелень у зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '4-5 год (окремо капуста та ковбаса)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Капуста хрустка, ковбаса суха без вологи'
    },
    campRehydration: {
      waterRatioNote: 'Залити 350-400 мл окропу на порцію, проварити 2 хв, настояти 3 хв під кришкою',
      soakMinutes: 3,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },

  // --- 4. Пасти, каші та другі страви (Pasta, Grains & Mains) ---
  {
    id: 'recipe-sierra-spaghetti',
    title: 'Спагеті Болоньєзе з сушеним яловичим фаршем та томатами',
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
      { name: 'Спагеті твердих сортів сухі (магазин, ламати навпіл)', amount: 200, unit: 'г', category: 'макарони' },
      { name: 'Фарш яловичий варено-сушений (окремо)', amount: 75, unit: 'г', category: 'м\'ясо' },
      { name: 'Томати, солодкий перець, морква та цибуля сушені (окремо)', amount: 55, unit: 'г', category: 'овочі' },
      { name: 'Сир Пармезан тертий сухий та базилік (магазин)', amount: 50, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Макарони сушити НЕ потрібно — вони беруться сухими з магазину (обирайте пасту швидкого варіння 4-5 хв).',
      'У дегідраторі окремо сушаться лише м\'ясо та овочі: нежирний яловичий фарш відварити, промити окропом від жиру і висушити при 65°C до сухих гранул (5-6 год). Томати, моркву, перець та цибулю нарізати і висушити окремо при 55°C.',
      'Збірка вдома: у герметичний зіп-пакет засипати сухі ламані спагеті, сушений фарш, сушені овочі та трави. Тертий сир покласти в окремий пакетик.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5-6 год (окремо фарш та нарізані овочі)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Фарш сухий усередині гранул, томати та овочі крихкі'
    },
    campRehydration: {
      waterRatioNote: 'Засипати суміш у казан з окропом (~300-350 мл/порцію), варити 4-5 хв до готовності спагеті, вмішати сир',
      soakMinutes: 2,
      boilMinutes: 4,
      altitudeNote: 'Тонкі спагеті варяться швидко та економлять газ'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-lazy-lasagna',
    title: 'Макарони по-італійськи з яловичиною, сушеними томатами та сиром',
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
      { name: 'Паста спіральки або метелики (суха, магазин)', amount: 200, unit: 'г', category: 'макарони' },
      { name: 'Фарш яловичий варено-сушений (окремо)', amount: 70, unit: 'г', category: 'м\'ясо' },
      { name: 'Томати сушені шматочками, часник та базилік (окремо)', amount: 50, unit: 'г', category: 'овочі' },
      { name: 'Сухий тертий сир та сухі вершки (магазин)', amount: 60, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Паста береться готова суха з магазину (сушити її не потрібно!).',
      'У дегідраторі окремо сушаться: відварений пісний фарш (65°C, 5-6 год) та нарізані томати з часником і базиліком (55°C).',
      'Збірка вдома: у пакет засипати сухі макарони, сушений фарш і сушені томати. Сирно-вершкову суміш покласти в окремий пакетик.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5-6 год (окремо фарш та томати)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Сухі шматочки томатів та сухі гранули фаршу'
    },
    campRehydration: {
      waterRatioNote: 'Засипати в казан, залити окропом (~320 мл на порцію), варити 4-5 хв, настояти 2 хв під кришкою, вмішати сир',
      soakMinutes: 2,
      boilMinutes: 4
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-spicy-chicken-pasta',
    title: 'Паста з сушеним курячим філе та солодким перцем',
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
      { name: 'Паста пір\'я або ріжки (суха, магазин)', amount: 200, unit: 'г', category: 'макарони' },
      { name: 'Куряче філе варено-сушене (окремо)', amount: 75, unit: 'г', category: 'м\'ясо' },
      { name: 'Томати, солодкий перець та цибуля сушені (окремо)', amount: 50, unit: 'г', category: 'овочі' },
      { name: 'Сухий тертий сир, часник та зелень (магазин)', amount: 35, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Паста береться суха з пачки (не варити і не сушити вдома).',
      'Окремо сушаться лише курятина та овочі: філе відварити у підсоленій воді, розібрати на дрібні волокна і висушити при 65°C. Перець, томати та цибулю тонко нарізати і висушити окремо при 55°C.',
      'Збірка вдома: суху пасту, сушену курку, сушені овочі та спеції змішати у герметичний зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5-6 год (окремо курятина та нарізані овочі)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Курячі волокна ламкі, овочі хрусткі'
    },
    campRehydration: {
      waterRatioNote: 'Залити 320 мл окропу на порцію, варити 4-5 хв, настояти 2-3 хв під кришкою',
      soakMinutes: 2,
      boilMinutes: 4
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-sesame-noodles-thai',
    title: 'Рисова локшина з куркою, сушеними овочами та кунжутом',
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
      { name: 'Локшина рисова або яєчна швидка (суха, магазин)', amount: 200, unit: 'г', category: 'макарони' },
      { name: 'Куряче філе варено-сушене (окремо)', amount: 70, unit: 'г', category: 'м\'ясо' },
      { name: 'Морква соломкою, перець та зелена цибуля сушені (окремо)', amount: 35, unit: 'г', category: 'овочі' },
      { name: 'Кунжут смажений, арахіс, імбир та часник (магазин)', amount: 35, unit: 'г', category: 'горіхи' }
    ],
    homePrepSteps: [
      'Локшину сушити не потрібно — вона береться готовою сухою з магазину і запарюється за 3-4 хв!',
      'У дегідраторі окремо сушаться лише відварене куряче філе (65°C) та тонка соломка свіжої моркви, перцю й зеленої цибулі (55°C).',
      'Збірка вдома: з\'єднати суху локшину, сушену курку, сушені овочі, кунжут, горіхи та спеції в пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5 год (окремо курка та морква з цибулею)',
      trayLining: 'Сітчастий лист',
      drynessTest: 'Курятина суха, морква ламка'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом у казані (~300 мл/порцію), проварити 1 хв і накрити кришкою на 4 хв',
      soakMinutes: 4,
      boilMinutes: 1
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-chicken-pilaf-oriental',
    title: 'Плов похідний з пропареним рисом, куркою та сушеними овочами',
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
      { name: 'Рис пропарений або рисові пластівці (сухі, магазин)', amount: 210, unit: 'г', category: 'крупи' },
      { name: 'Куряче філе або яловичина варено-сушена (окремо)', amount: 80, unit: 'г', category: 'м\'ясо' },
      { name: 'Морква соломкою та цибуля сушені (окремо)', amount: 50, unit: 'г', category: 'овочі' },
      { name: 'Барбарис сушений, зіра, куркума, часник (магазин)', amount: 20, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Варити і сушити готовий плов з рисом НЕ потрібно! Рис береться сухим з магазину (обирайте пропарений рис швидкого варіння або рисові пластівці).',
      'У дегідраторі окремо сушаться: відварене м\'ясо шматочками (65°C, 5-6 год) та нарізана соломкою морква і цибуля (55°C).',
      'Збірка вдома: змішати сухий рис, сушене м\'ясо, сушену моркву з цибулею, барбарис та зіру в один зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '5-6 год (окремо тільки м\'ясо, морква та цибуля)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'М\'ясо сухе, морква та цибуля ламкі'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~350 мл на порцію), додати ложку олії або топленого масла, варити 5 хв на слабкому вогні й укутати казан на 5-7 хв до повного упарювання рису',
      soakMinutes: 5,
      boilMinutes: 5,
      altitudeNote: 'Укутування казана заощаджує до 50% газу на стоянці'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-feta-couscous-mediterranean',
    title: 'Кускус по-середземноморськи з сушеними томатами та фетою',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 390,
    proteinPerServing: 17,
    fatPerServing: 12,
    carbsPerServing: 54,
    fiberPerServing: 5.2,
    rawIngredients: [
      { name: 'Кускус швидкого приготування (сухий, магазин)', amount: 200, unit: 'г', category: 'крупи' },
      { name: 'Сир фета сушений або Пармезан (магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Томати та солодкий перець сушені (окремо)', amount: 50, unit: 'г', category: 'овочі' },
      { name: 'Маслини сушені, орегано, базилік та часник', amount: 30, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Кускус та сир беруться сухими з магазину.',
      'Окремо в дегідраторі сушаться лише нарізані томати, солодкий перець та кружальця маслин при 55°C (5-6 год).',
      'Збірка вдома: змішати сухий кускус із сушеними овочами, травами та сиром у зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5-6 год (окремо томати, перець та маслини)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі шматочки томатів та перцю'
    },
    campRehydration: {
      waterRatioNote: 'Залити 250 мл окропу на порцію, перемішати, закрити кришкою на 4 хвилини (варити не потрібно!)',
      soakMinutes: 4,
      boilMinutes: 0,
      altitudeNote: 'Ідеальна швидка страва, що взагалі не потребує варіння'
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-black-bean-stroganoff',
    title: 'Локшина з сушеними білими грибами та печерицями у вершковому соусі',
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
      { name: 'Локшина яєчна або гречана тонка (суха, магазин)', amount: 190, unit: 'г', category: 'макарони' },
      { name: 'Гриби печериці та білі сушені з цибулею (окремо)', amount: 55, unit: 'г', category: 'гриби' },
      { name: 'Квасолеві пластівці або варено-сушена квасоля (окремо)', amount: 50, unit: 'г', category: 'бобові' },
      { name: 'Сухі вершки або сметанний соус-порошок (магазин)', amount: 45, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Локшина та сухі вершки беруться готовими сухими з магазину (сушити локшину НЕ потрібно).',
      'У дегідраторі окремо сушаться лише нарізані пластинками гриби (печериці/білі) та ріпчаста цибуля при 55°C (5-6 год).',
      'Збірка вдома: змішати суху локшину, сушені гриби з цибулею, бобові пластівці та сухі вершки зі спеціями у зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5-6 год (окремо гриби та цибуля)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Грибні пластинки та цибуля сухі й ламкі'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~320-350 мл на порцію), варити 3 хв, настояти 3 хв під кришкою до загустіння грибного соусу',
      soakMinutes: 3,
      boilMinutes: 3,
      altitudeNote: 'Швидка страва, не витрачає паливо на тривале варіння'
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Практична похідна розкладка'
  },

  // --- 5. Снеки, перекуси та кишенькове харчування (Snacks & Pocket Food) ---
  {
    id: 'recipe-trail-jerky-beef',
    title: 'Джерки яловичі класичні (в\'ялене м\'ясо смужками)',
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
      { name: 'Яловичина нежирна в\'ялена смужками (сушиться окремо)', amount: 145, unit: 'г', category: 'м\'ясо' },
      { name: 'Спеції для маринаду (коріандр, чорний перець, часник, соєвий соус)', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Нежирну яловичу вирізку злегка підморозити, нарізати поперек волокон тонкими смужками 4 мм.',
      'Замаринувати у спеціях та соєвому соусі на 6-8 год, промокнути паперовим рушником і розкласти на решітки дегідратора.'
    ],
    dehydrationParams: {
      tempCelsius: 65,
      timeHours: '6-7 год (сушиться чисте м\'ясо смужками)',
      trayLining: 'Сітка',
      drynessTest: 'Смужка гнеться і тріскається по волокнах, але не ламається в крихту'
    },
    campRehydration: {
      waterRatioNote: 'Готове до вживання без приготування — білковий перекус на переходах',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-fruit-leather-strawberry',
    title: 'Сушені яблука, ягоди та домашня фруктова пастила',
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
      { name: 'Яблука сушені часточками або пастила (окремо)', amount: 85, unit: 'г', category: 'фрукти' },
      { name: 'Полуниця, вишня або малина сушені (окремо)', amount: 45, unit: 'г', category: 'ягоди' },
      { name: 'Кориця та мед натуральний', amount: 10, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Яблука нарізати тонкими кільцями або перетерти в пюре з ягодами для пастили.',
      'Висушити фрукти та ягоди в дегідраторі при 55°C.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '6-8 год (фрукти та ягоди)',
      trayLining: 'Сітка або силіконовий лист для пастили',
      drynessTest: 'Еластичні сухі скибочки фруктів та пастила, що не липне до рук'
    },
    campRehydration: {
      waterRatioNote: 'Готове до вживання на привалах або як добавка в чай',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-puma-bars',
    title: 'Домашні енергетичні батончики з горіхів, кураги та вівсянки',
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
      { name: 'Курага, фініки та родзинки подрібнені (магазин)', amount: 80, unit: 'г', category: 'сухофрукти' },
      { name: 'Арахіс, мигдаль або волоські горіхи (магазин)', amount: 55, unit: 'г', category: 'горіхи' },
      { name: 'Вівсяні пластівці та насіння льону (магазин)', amount: 45, unit: 'г', category: 'крупи' },
      { name: 'Мед та арахісова паста (магазин)', amount: 20, unit: 'г', category: 'горіхи' }
    ],
    homePrepSteps: [
      'Всі інгредієнти вже сухі з магазину.',
      'Подрібнити сухофрукти з горіхами, змішати з пластівцями та арахісовою пастою, сформувати щільні батончики та загорнути в пергамент (за бажанням підсушити 2-3 год при 55°C).'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '2-3 год (легке підсушування сформованих батончиків)',
      trayLining: 'Пергамент',
      drynessTest: 'Щільні пружні батончики, що тримають форму в рюкзаку'
    },
    campRehydration: {
      waterRatioNote: 'Готовий кишеньковий перекус на ходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },
  {
    id: 'recipe-spiced-mixed-nuts',
    title: 'Карпатський трейл-мікс (горіхи, сушені ягоди та чорний шоколад)',
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
      { name: 'Мигдаль, фундук та кеш\'ю смажені (магазин)', amount: 90, unit: 'г', category: 'горіхи' },
      { name: 'Журавлина, вишня або яблука сушені (окремо)', amount: 50, unit: 'г', category: 'ягоди' },
      { name: 'Шоколад чорний 70% шматочками (магазин)', amount: 40, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушаться окремо лише ягоди/яблука (або купуються готовими сушеними).',
      'Змішати горіхи, сушені ягоди та ламаний чорний шоколад порційно по зіп-пакетах на кожен день походу.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5 год (лише якщо сушите власні ягоди чи яблука)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі ягоди та хрусткі горіхи'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на привалі',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Практична похідна розкладка'
  },

  // --- 6. Магазинні страви (без сушарки — швидка збірка з готових продуктів) ---
  {
    id: 'recipe-simple-oatmeal-raisins',
    title: 'Вівсяна каша молочна з родзинками та волоськими горіхами',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 85,
    kcalPerServing: 365,
    proteinPerServing: 12,
    fatPerServing: 10,
    carbsPerServing: 56,
    fiberPerServing: 6.0,
    rawIngredients: [
      { name: 'Вівсяні пластівці швидкого приготування (магазин)', amount: 180, unit: 'г', category: 'крупи' },
      { name: 'Молоко сухе незбиране 25% (магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Родзинки без кісточок (магазин)', amount: 60, unit: 'г', category: 'сухофрукти' },
      { name: 'Горіхи волоські очищені (магазин)', amount: 40, unit: 'г', category: 'горіхи' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — всі інгредієнти купуються готовими в магазині.',
      'Змішати вівсяні пластівці, сухе молоко, родзинки та подрібнені горіхи в один зіп-пакет на сніданок.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~250 мл на порцію), перемішати і настояти під кришкою 3-4 хв',
      soakMinutes: 4,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-semolina-honey',
    title: 'Манна каша молочна з курагою та медом',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 370,
    proteinPerServing: 11,
    fatPerServing: 7,
    carbsPerServing: 65,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Крупа манна (магазин)', amount: 180, unit: 'г', category: 'крупи' },
      { name: 'Молоко сухе незбиране 25% (магазин)', amount: 65, unit: 'г', category: 'молочні' },
      { name: 'Курага нарізана смужками (магазин)', amount: 60, unit: 'г', category: 'сухофрукти' },
      { name: 'Мед натуральний або згущене молоко (магазин)', amount: 55, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати манну крупу, сухе молоко та нарізану курагу в зіп-пакет.',
      'Мед або згущене молоко в дой-паку подається при заварюванні.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Всипати тонкою цівкою в теплу воду (~280 мл/порцію), помішуючи довести до кипіння (2 хв), додати мед',
      soakMinutes: 2,
      boilMinutes: 2
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-buckwheat-milk',
    title: 'Гречана каша молочна з пластівців із топленим маслом',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 80,
    kcalPerServing: 360,
    proteinPerServing: 13,
    fatPerServing: 11,
    carbsPerServing: 52,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Гречані пластівці швидкого приготування (магазин)', amount: 200, unit: 'г', category: 'крупи' },
      { name: 'Молоко сухе незбиране (магазин)', amount: 75, unit: 'г', category: 'молочні' },
      { name: 'Масло топлене Гхі або вершкове (магазин)', amount: 45, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати гречані пластівці та сухе молоко в зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~250 мл/порцію), накрити кришкою на 4 хв, заправити топленим маслом',
      soakMinutes: 4,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-couscous-sweet',
    title: 'Солодкий кускус із фініками, курагою та корицею',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 355,
    proteinPerServing: 9,
    fatPerServing: 3,
    carbsPerServing: 72,
    fiberPerServing: 6.0,
    rawIngredients: [
      { name: 'Кускус швидкого приготування (магазин)', amount: 200, unit: 'г', category: 'крупи' },
      { name: 'Фініки сушені без кісточки нарізані (магазин)', amount: 80, unit: 'г', category: 'сухофрукти' },
      { name: 'Курага та родзинки (магазин)', amount: 70, unit: 'г', category: 'сухофрукти' },
      { name: 'Кориця мелена та кокосова стружка (магазин)', amount: 10, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати сухий кускус із нарізаними фініками, курагою, родзинками та корицею в зіп-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом на 1 см вище рівня крупи, накрити кришкою на 4 хв (варити не потрібно)',
      soakMinutes: 4,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-polenta-cheese',
    title: 'Кукурудзяна каша (банош) із твердим сиром та вершками',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 395,
    proteinPerServing: 15,
    fatPerServing: 14,
    carbsPerServing: 52,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Кукурудзяна крупа експрес / полента швидка (магазин)', amount: 200, unit: 'г', category: 'крупи' },
      { name: 'Сир твердий Гауда або Чеддер (магазин)', amount: 90, unit: 'г', category: 'молочні' },
      { name: 'Сухі вершки або сухе молоко (магазин)', amount: 50, unit: 'г', category: 'молочні' },
      { name: 'Масло топлене (магазин)', amount: 20, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати кукурудзяну поленту швидкого варіння із сухими вершками у пакет. Твердий сир нарізати кубиками в таборі.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Всипати в киплячу воду (~300 мл/порцію), варити 3 хв помішуючи, додати сир та масло',
      soakMinutes: 2,
      boilMinutes: 3
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-lunch-salami-cheese',
    title: 'Бутербродний обід: галети з салямі, твердим сиром та халвою',
    category: 'main',
    mealTypes: ['lunch'],
    servingsYield: 4,
    dryWeightPerServingGrams: 115,
    kcalPerServing: 510,
    proteinPerServing: 21,
    fatPerServing: 28,
    carbsPerServing: 44,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Галети армійські або сухарі пшеничні (магазин)', amount: 160, unit: 'г', category: 'хліб' },
      { name: 'Ковбаса сирокопчена салямі (магазин)', amount: 120, unit: 'г', category: 'м\'ясо' },
      { name: 'Сир твердий Гауда / Чеддер (магазин)', amount: 100, unit: 'г', category: 'молочні' },
      { name: 'Халва соняшникова або тахінна (магазин)', amount: 80, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — класичний ходовий обід без варіння із готових магазинних продуктів.',
      'Сформувати денний обідній пакунок: пачка галет, нарізка салямі, брусок твердого сиру та халва до чаю.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Не потребує варіння — нарізати сир і салямі на галети, подавати з гарячим чаєм або кавою з термоса',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-lunch-salo-garlic',
    title: 'Український обід на привалі: житні сухарі з салом, корейкою та шоколадом',
    category: 'main',
    mealTypes: ['lunch'],
    servingsYield: 4,
    dryWeightPerServingGrams: 110,
    kcalPerServing: 540,
    proteinPerServing: 14,
    fatPerServing: 36,
    carbsPerServing: 40,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Сухарі житні або хлібці (магазин)', amount: 160, unit: 'г', category: 'хліб' },
      { name: 'Сало солоне шпик із часником (магазин)', amount: 100, unit: 'г', category: 'м\'ясо' },
      { name: 'Корейка копчена або балик (магазин)', amount: 100, unit: 'г', category: 'м\'ясо' },
      { name: 'Шоколад чорний 70% (магазин)', amount: 80, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — всі продукти готові до походу.',
      'Скласти житні сухарі, сало, копчену корейку та плитку чорного шоколаду в обідній пакунок дня.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на привалі без розпалювання пальника',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-pea-soup-lunch',
    title: 'Гороховий суп експрес із мисливськими ковбасками та сухариками',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 375,
    proteinPerServing: 18,
    fatPerServing: 14,
    carbsPerServing: 44,
    fiberPerServing: 6.5,
    rawIngredients: [
      { name: 'Суп гороховий у брикетах/пакетах швидкий (магазин)', amount: 180, unit: 'г', category: 'бобові' },
      { name: 'Ковбаски мисливські сирокопчені (магазин)', amount: 100, unit: 'г', category: 'м\'ясо' },
      { name: 'Сухарі житні або пшеничні до супу (магазин)', amount: 80, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — береться магазинний брикет горохового супу, пачка сухариків та мисливські ковбаски у вакуумній упаковці.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Розкришити брикет у киплячу воду (~350 мл/порцію), нарізати туди мисливські ковбаски, проварити 4-5 хв, подавати з сухариками',
      soakMinutes: 2,
      boilMinutes: 4
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-lunch-veg-energy',
    title: 'Похідний ланч-сет: галети з яблучною пастилою, курагою та щербетом',
    category: 'main',
    mealTypes: ['lunch'],
    servingsYield: 4,
    dryWeightPerServingGrams: 105,
    kcalPerServing: 390,
    proteinPerServing: 8,
    fatPerServing: 9,
    carbsPerServing: 70,
    fiberPerServing: 6.0,
    rawIngredients: [
      { name: 'Галети похідні або сухарі пшеничні (магазин)', amount: 160, unit: 'г', category: 'хліб' },
      { name: 'Курага та чорнослив без кісточки (магазин)', amount: 100, unit: 'г', category: 'сухофрукти' },
      { name: 'Пастила яблучна натуральна (магазин)', amount: 80, unit: 'г', category: 'солодощі' },
      { name: 'Щербет або чорний шоколад (магазин)', amount: 80, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — легкий рослинний обід без варіння із готових магазинних продуктів.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на привалі разом із гарячим чаєм',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-buckwheat-tushonka',
    title: 'Гречка по-купецьки з яловичою тушонкою',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 105,
    kcalPerServing: 430,
    proteinPerServing: 24,
    fatPerServing: 15,
    carbsPerServing: 50,
    fiberPerServing: 7.0,
    rawIngredients: [
      { name: 'Крупа гречана ядриця або пластівці (магазин)', amount: 220, unit: 'г', category: 'крупи' },
      { name: 'Тушонка яловича у м\'якій реторт-упаковці (магазин)', amount: 160, unit: 'г', category: 'м\'ясо' },
      { name: 'Олія соняшникова або смалець із тушонки (магазин)', amount: 25, unit: 'г', category: 'жири' },
      { name: 'Сушений часник, цибуля та спеції (магазин)', amount: 15, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — класична похідна вечеря з магазинних продуктів.',
      'Гречану крупу зі спеціями засипати в пакет на вечерю; тушонку краще брати в легких реторт-пакетах.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Зварити гречку у воді 1:2 (7-10 хв або запарити в казані), додати яловичу тушонку та прогріти 2 хв',
      soakMinutes: 5,
      boilMinutes: 7
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-couscous-tushonka',
    title: 'Кускус із яловичою тушонкою та лісовими грибами',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 105,
    kcalPerServing: 440,
    proteinPerServing: 23,
    fatPerServing: 15,
    carbsPerServing: 53,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Кускус швидкого приготування (магазин)', amount: 220, unit: 'г', category: 'крупи' },
      { name: 'Тушонка яловича класична (магазин)', amount: 150, unit: 'г', category: 'м\'ясо' },
      { name: 'Гриби сушені та солодка паприка (магазин)', amount: 30, unit: 'г', category: 'гриби' },
      { name: 'Олія рослинна (магазин)', amount: 20, unit: 'г', category: 'жири' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати кускус із магазинними сушеними грибами та паприкою в пакет, додати реторт-пакет тушонки.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом, прогріти тушонку з грибами 2 хв, всипати кускус і настояти під кришкою 4 хв',
      soakMinutes: 4,
      boilMinutes: 2
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-pasta-cheese-salami',
    title: 'Макарони по-похідному з твердим сиром та салямі',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 105,
    kcalPerServing: 465,
    proteinPerServing: 22,
    fatPerServing: 18,
    carbsPerServing: 53,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Макарони ріжки або спіральки твердих сортів (магазин)', amount: 220, unit: 'г', category: 'макарони' },
      { name: 'Ковбаса сирокопчена салямі (магазин)', amount: 100, unit: 'г', category: 'м\'ясо' },
      { name: 'Сир твердий Гауда / Чеддер (магазин)', amount: 80, unit: 'г', category: 'молочні' },
      { name: 'Італійські трави та сушений часник (магазин)', amount: 20, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — макарони, сир і сирокопчена салямі купуються у звичайному супермаркеті.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Відварити макарони 5-6 хв, злити зайву воду, вмішати нарізану салямі та тертий сир до розплавлення',
      soakMinutes: 1,
      boilMinutes: 6
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-mashed-potato-sausage',
    title: 'Картопляне пюре з мисливськими ковбасками та сиром',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 100,
    kcalPerServing: 435,
    proteinPerServing: 19,
    fatPerServing: 18,
    carbsPerServing: 49,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Картопляні пластівці швидкого приготування (магазин)', amount: 180, unit: 'г', category: 'крупи' },
      { name: 'Ковбаски мисливські або кабаноси (магазин)', amount: 120, unit: 'г', category: 'м\'ясо' },
      { name: 'Сир твердий або плавлений (магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Сухе молоко та сушений кріп (магазин)', amount: 40, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати картопляні пластівці з сухим молоком та сушеним кропом у пакет; ковбаски та сир додати при заварюванні.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Закип\'ятити воду з нарізаними ковбасками (2 хв), всипати картопляні пластівці та сир, перемішати',
      soakMinutes: 3,
      boilMinutes: 2
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-rice-tushonka',
    title: 'Плов похідний із пропареного рису з тушонкою',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 105,
    kcalPerServing: 445,
    proteinPerServing: 21,
    fatPerServing: 15,
    carbsPerServing: 56,
    fiberPerServing: 3.0,
    rawIngredients: [
      { name: 'Рис пропарений довгозерний (магазин)', amount: 220, unit: 'г', category: 'крупи' },
      { name: 'Тушонка яловича або куряча (магазин)', amount: 150, unit: 'г', category: 'м\'ясо' },
      { name: 'Олія соняшникова (магазин)', amount: 30, unit: 'г', category: 'жири' },
      { name: 'Приправа до плову: зіра, барбарис, часник (магазин)', amount: 20, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати пропарений рис із приправою до плову в пакет, додати реторт-пакет тушонки.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Зварити рис зі спеціями до напівготовності (7 хв), додати тушонку та укутати казан на 5-7 хв',
      soakMinutes: 6,
      boilMinutes: 7
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-lentil-veg',
    title: 'Червона сочевиця з булгуром та пряними спеціями карі',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 375,
    proteinPerServing: 18,
    fatPerServing: 8,
    carbsPerServing: 57,
    fiberPerServing: 8.5,
    rawIngredients: [
      { name: 'Сочевиця червона колота швидка (магазин)', amount: 160, unit: 'г', category: 'бобові' },
      { name: 'Булгур дрібний швидкого варіння (магазин)', amount: 140, unit: 'г', category: 'крупи' },
      { name: 'Олія соняшникова або оливкова (магазин)', amount: 35, unit: 'г', category: 'жири' },
      { name: 'Сушені томати, часник та спеції карі (магазин)', amount: 25, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати в одному пакеті червону сочевицю, дрібний булгур та готові сухі спеції з магазину.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою 1:2.5, варити 6-7 хв на слабкому вогні, заправити олією і настояти 5 хв під кришкою',
      soakMinutes: 5,
      boilMinutes: 6
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-pasta-veg-mushroom',
    title: 'Макарони з лісовими грибами, оливковою олією та травами',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 90,
    kcalPerServing: 385,
    proteinPerServing: 14,
    fatPerServing: 10,
    carbsPerServing: 60,
    fiberPerServing: 5.0,
    rawIngredients: [
      { name: 'Макарони твердих сортів спіральки (магазин)', amount: 230, unit: 'г', category: 'макарони' },
      { name: 'Гриби лісові сушені мелені/слайсами (магазин)', amount: 50, unit: 'г', category: 'гриби' },
      { name: 'В\'ялені томати та солодкий перець (магазин)', amount: 45, unit: 'г', category: 'спеції' },
      { name: 'Олія оливкова або соняшникова (магазин)', amount: 35, unit: 'г', category: 'жири' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — всі інгредієнти купуються готовими сухими у відділі бакалії та спецій.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Відварити макарони разом із грибами та томатами 5-6 хв, заправити олією',
      soakMinutes: 3,
      boilMinutes: 6
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-snack-nuts-choc',
    title: 'Енергетичний перекус: мигдаль, курага та чорний шоколад',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 305,
    proteinPerServing: 7,
    fatPerServing: 18,
    carbsPerServing: 29,
    fiberPerServing: 5.0,
    rawIngredients: [
      { name: 'Мигдаль сушений смажений (магазин)', amount: 80, unit: 'г', category: 'горіхи' },
      { name: 'Курага без кісточки (магазин)', amount: 80, unit: 'г', category: 'сухофрукти' },
      { name: 'Шоколад чорний 70%+ (магазин)', amount: 80, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — розфасувати мигдаль, курагу та чорний шоколад у денний пакет кишенькового перекусу.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готове кишенькове харчування на переході',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-snack-bar-halva',
    title: 'Солодкий привал: злаковий батончик, волоські горіхи та халва',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 310,
    proteinPerServing: 8,
    fatPerServing: 19,
    carbsPerServing: 28,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Батончик енергетичний злаковий (магазин)', amount: 100, unit: 'г', category: 'солодощі' },
      { name: 'Халва соняшникова порційна (магазин)', amount: 80, unit: 'г', category: 'солодощі' },
      { name: 'Горіхи волоські очищені (магазин)', amount: 60, unit: 'г', category: 'горіхи' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — скласти готові злакові батончики, порційну халву та горіхи в пакет перекусу.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готовий перекус під час денного переходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },
  {
    id: 'recipe-simple-snack-fruit-choc',
    title: 'Фруктово-шоколадний перекус: фініки, пастила та чорний шоколад',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 245,
    proteinPerServing: 3,
    fatPerServing: 7,
    carbsPerServing: 43,
    fiberPerServing: 5.0,
    rawIngredients: [
      { name: 'Фініки та курага без кісточки (магазин)', amount: 100, unit: 'г', category: 'сухофрукти' },
      { name: 'Пастила яблучна натуральна (магазин)', amount: 70, unit: 'г', category: 'солодощі' },
      { name: 'Шоколад чорний 70% (магазин)', amount: 70, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — готовий безгоріховий енергетичний перекус із магазинних сухофруктів, пастили та шоколаду.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на ходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Магазинна розкладка (без сушарки)'
  },

  // --- 7. Рецепти похідних страв Турклубу КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586) ---
  {
    id: 'recipe-globus-borscht-mushrooms',
    title: 'Борщ червоний пісний із сушеними грибами (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 52,
    kcalPerServing: 185,
    proteinPerServing: 8,
    fatPerServing: 2,
    carbsPerServing: 34,
    fiberPerServing: 6.5,
    rawIngredients: [
      { name: 'Картопля сушена (окремо або пластівці)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Помідори сушені (усушка 1:16)', amount: 32, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Гриби лісові сушені (замість м\'яса — 7 г/ос)', amount: 28, unit: 'г', category: 'гриби', rawToDryRatio: 9.0 },
      { name: 'Перець червоний солодкий сушений (усушка 1:17)', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 17.0 },
      { name: 'Буряк столовий сушений (4 г/ос)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 7.5 },
      { name: 'Капуста білокачанна сушена (усушка 1:11)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 11.0 },
      { name: 'Цибуля ріпчаста, морква та зелень (кріп, петрушка) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Класична норма ТК КПІ «Глобус» у розрахунку на 1 людину: картопля — 20 г, гриби сушені — 7 г, помідор — 8 г, перець червоний — 6 г, буряк — 4 г, капуста білокачанна — 4 г, морква — 1 г, цибуля — 1 г, зелень (кріп і петрушка) — 0,5 г.',
      'Всі овочі та гриби сушаться окремо в дегідраторі при 55-60°C та змішуються у спільний пакет борщового набору.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо овочі та гриби)',
      trayLining: 'Сітчасті піддони',
      drynessTest: 'Ламкі сухі скибочки грибів та овочів'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~350-400 мл на порцію), довести до кипіння, варити 10-12 хв до м\'якості сушених овочів та грибів, настояти під кришкою 5 хв',
      soakMinutes: 10,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-borscht-beans',
    title: 'Борщ червоний з м\'ясом та сушеною квасолею (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 65,
    kcalPerServing: 265,
    proteinPerServing: 18,
    fatPerServing: 6,
    carbsPerServing: 35,
    fiberPerServing: 6.8,
    rawIngredients: [
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'М\'ясо яловиче сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Помідори сушені (8 г/ос, усушка 1:16)', amount: 32, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Перець червоний сушений (6 г/ос, усушка 1:17)', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 17.0 },
      { name: 'Квасоля консервована/відварена сушена (5 г/ос)', amount: 20, unit: 'г', category: 'бобові', rawToDryRatio: 3.0 },
      { name: 'Буряк сушений (4 г/ос) та капуста білокачанна (4 г/ос)', amount: 32, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 },
      { name: 'Морква (1 г/ос), цибуля (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'За розкладкою ТК «Глобус»: до основного складу червоного борщу з м\'ясом (15 г/ос) додається сушена консервована (або попередньо відварена) квасоля з розрахунку 5 г/людину.',
      'Консервовану квасолю промити від заливки й висушити при 60°C (4-5 год) — у поході вона відновлюється за лічені хвилини.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год (окремо м\'ясо, квасоля та овочі)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Сухі шматочки м\'яса, квасолі та овочів'
    },
    campRehydration: {
      waterRatioNote: 'Всипати суміш у воду (~400 мл/порцію), варити 10 хв на слабкому вогні та настояти 5 хв під кришкою',
      soakMinutes: 10,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-rassolnik',
    title: 'Розсольник похідний з м\'ясом, рисом та солоними огірками (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 70,
    kcalPerServing: 280,
    proteinPerServing: 16,
    fatPerServing: 6,
    carbsPerServing: 40,
    fiberPerServing: 4.2,
    rawIngredients: [
      { name: 'Рис білий або пропарений (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Огірки солоні бочкові сушені (6 г/ос)', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 12.0 },
      { name: 'Помідори (2 г/ос) та перець солодкий (1,5 г/ос) сушені', amount: 14, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Капуста білокачанна (2 г/ос), морква (1 г), цибуля (1 г) та зелень (0,5 г)', amount: 18, unit: 'г', category: 'овочі', rawToDryRatio: 11.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 особу: м\'ясо шматочками — 15 г, рис — 20 г, картопля — 20 г, огірки солоні сушені — 6 г, капуста — 2 г, помідори — 2 г, перець — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Для сушіння використовують саме бочкові солоні (квашені) огірки, натерті на крупній тертці й висушені при 55°C.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо м\'ясо, солоні огірки та овочі)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Огіркова соломка суха з виразним пряно-солоним ароматом'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~350-400 мл/порцію), варити 10-12 хв до готовності рису та картоплі, настояти 5 хв',
      soakMinutes: 5,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-veg-soup',
    title: 'Овочевий суп з м\'ясом, цвітною капустою, горошком та кукурудзою (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 50,
    kcalPerServing: 210,
    proteinPerServing: 16,
    fatPerServing: 5,
    carbsPerServing: 26,
    fiberPerServing: 5.0,
    rawIngredients: [
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Кукурудза солодка (3 г/ос) та зелений горошок (2 г/ос) сушені', amount: 20, unit: 'г', category: 'овочі', rawToDryRatio: 4.5 },
      { name: 'Цвітна капуста (2 г/ос, 1:15) та білокачанна капуста (2 г/ос, 1:11)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 13.0 },
      { name: 'Помідори (2 г/ос) та перець солодкий (1,5 г/ос) сушені', amount: 14, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Морква (1 г/ос), цибуля (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 10, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: м\'ясо шматочками — 15 г, картопля — 20 г, цвітна капуста — 2 г, білокачанна капуста — 2 г, кукурудза солодка — 3 г, зелений горошок — 2 г, помідори — 2 г, перець — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Цвітну капусту перед сушінням розібрати на дрібні суцвіття та бланшувати 2-3 хв.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо овочі та м\'ясо)',
      trayLining: 'Сітчастий піддон',
      drynessTest: 'Сухі суцвіття цвітної капусти, горошок та кукурудза'
    },
    campRehydration: {
      waterRatioNote: 'Всипати у киплячу воду (~350 мл/порцію), варити 8-10 хв, дати настоятися під кришкою 5 хв',
      soakMinutes: 5,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-mushroom-buckwheat-soup',
    title: 'Грибний суп із гречкою та сушеними лісовими грибами (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 53,
    kcalPerServing: 195,
    proteinPerServing: 8,
    fatPerServing: 2,
    carbsPerServing: 36,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Гречана крупа (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Гриби лісові сушені (7 г/ос)', amount: 28, unit: 'г', category: 'гриби', rawToDryRatio: 9.0 },
      { name: 'Капуста білокачанна (2 г/ос) та перець солодкий (1,5 г/ос) сушені', amount: 14, unit: 'г', category: 'овочі', rawToDryRatio: 13.0 },
      { name: 'Цибуля ріпчаста (1 г/ос), морква (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 10, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: гречка — 20 г, картопля — 20 г, гриби — 7 г, капуста білокачанна — 2 г, перець — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Ароматний пісний обідній суп, що чудово підходить і для вегетаріанців.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '6-8 год (окремо гриби та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі ламкі пластинки грибів та овочів'
    },
    campRehydration: {
      waterRatioNote: 'Замочити гриби з овочами на 10 хв, додати гречку, довести до кипіння і варити 8-10 хв',
      soakMinutes: 10,
      boilMinutes: 9
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-buckwheat-meat-soup',
    title: 'Гречаний суп із сушеним м\'ясом та овочами (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 245,
    proteinPerServing: 16,
    fatPerServing: 6,
    carbsPerServing: 33,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Гречана крупа (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Капуста білокачанна (2 г/ос), морква (1 г), цибуля (1 г), зелень (0,5 г)', amount: 20, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: м\'ясо шматочками — 15 г, гречка — 20 г, картопля — 20 г, капуста білокачанна — 2 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Простий і ситний гарячий суп на обідній перехід.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год (окремо м\'ясо та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'М\'ясо та овочі повністю сухі'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~350 мл/порцію), варити 8-10 хв до готовності гречки та картоплі',
      soakMinutes: 5,
      boilMinutes: 9
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-ukha',
    title: 'Юшка (Уха) похідна з сушеною рибою та рисом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 59,
    kcalPerServing: 230,
    proteinPerServing: 17,
    fatPerServing: 3,
    carbsPerServing: 34,
    fiberPerServing: 2.8,
    rawIngredients: [
      { name: 'Рис білий або пропарений (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Риба варено-сушена шматочками (15 г/ос, усушка 1:9)', amount: 60, unit: 'г', category: 'риба', rawToDryRatio: 9.0 },
      { name: 'Перець солодкий (1,5 г/ос), морква (1 г), цибуля (1 г) та зелень (0,5 г)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 11.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: риба сушена — 15 г, рис — 20 г, картопля — 20 г, перець — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Морожена нежирна риба при відварюванні, чищенні від кісток та сушінні має коефіцієнт усушки 1:8–1:10.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7-9 год (окремо відварена риба без кісток та овочі)',
      trayLining: 'Пергамент або сітка',
      drynessTest: 'Ламкі сухі шматочки риби'
    },
    campRehydration: {
      waterRatioNote: 'Всипати у воду (~350-400 мл/порцію), додати лавровий лист і духмяний перець, варити 10 хв',
      soakMinutes: 5,
      boilMinutes: 10
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-funchoza-soup',
    title: 'Суп із фунчозою (рисовою вермішеллю), м\'ясом та цвітною капустою (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 83,
    kcalPerServing: 325,
    proteinPerServing: 16,
    fatPerServing: 5,
    carbsPerServing: 54,
    fiberPerServing: 3.8,
    rawIngredients: [
      { name: 'Фунчоза / рисова або звичайна вермішель (40 г/ос, магазин)', amount: 160, unit: 'г', category: 'макарони' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Цвітна капуста (2 г/ос) та білокачанна капуста (2 г/ос) сушені', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 13.0 },
      { name: 'Перець червоний (1,5 г/ос), морква (1 г), цибуля (1 г), зелень (0,5 г)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 11.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: фунчоза — 40 г (можна замінити на звичайну тонку вермішель), картопля — 20 г, м\'ясо шматочками — 15 г, цвітна капуста — 2 г, білокачанна капуста — 2 г, перець червоний — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Фунчоза додається наприкінці варіння супу, бо готується всього за 2-3 хвилини.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо м\'ясо та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі та м\'ясо'
    },
    campRehydration: {
      waterRatioNote: 'Проварити м\'ясо з картоплею та капустою 7-8 хв, додати фунчозу, проварити ще 1-2 хв і настояти 3 хв',
      soakMinutes: 5,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-potato-soup',
    title: 'Суп картопляний з м\'ясом та цвітною капустою (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 65,
    kcalPerServing: 255,
    proteinPerServing: 16,
    fatPerServing: 5,
    carbsPerServing: 36,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Картопля сушена соломкою/пластівцями (40 г/ос)', amount: 160, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Цвітна капуста (2 г/ос) та білокачанна капуста (2 г/ос) сушені', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 13.0 },
      { name: 'Помідор (2 г/ос) та перець червоний (1,5 г/ос) сушені', amount: 14, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Морква (1 г/ос), цибуля (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 10, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: картопля — 40 г, м\'ясо шматочками — 15 г, цвітна капуста — 2 г, білокачанна капуста — 2 г, помідор — 2 г, перець червоний — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Для густішого навару частину сушеної картоплі можна замінити картопляними пластівцями.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо картопля, капуста, томати та м\'ясо)',
      trayLining: 'Сітка',
      drynessTest: 'Хрустка картопляна соломка та сухі шматочки м\'яса'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~350-400 мл/порцію), варити 8-10 хв на повільному вогні та настояти 5 хв',
      soakMinutes: 5,
      boilMinutes: 9
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-kharcho',
    title: 'Суп Харчо похідний з яловичиною, рисом та томатами (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 70,
    kcalPerServing: 295,
    proteinPerServing: 20,
    fatPerServing: 7,
    carbsPerServing: 38,
    fiberPerServing: 3.8,
    rawIngredients: [
      { name: 'М\'ясо яловиче сушене шматочками (20 г/ос, усушка 1:5)', amount: 80, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Рис довгозерний або пропарений (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Перець червоний (3 г/ос) та помідори сушені (2 г/ос)', amount: 20, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Капуста (2 г), морква (1 г), цибуля (1 г), зелень, часник та хмелі-сунелі', amount: 20, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: м\'ясо шматочками — 20 г (підвищена м\'ясна норма!), рис — 20 г, картопля — 20 г, перець — 3 г, помідори — 2 г, капуста — 2 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г + спеції харчо (хмелі-сунелі, часник, червоний перець).',
      'Зібрати сухі компоненти у герметичний пакет на обід або гарячу вечерю.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год (окремо м\'ясо та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі гранули м\'яса та ламкі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Всипати у киплячу воду (~400 мл/порцію), додати ложку томатної пасти чи ткемалі, варити 10 хв і настояти 5 хв',
      soakMinutes: 5,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-solyanka',
    title: 'Солянка похідна з копченостями, солоними огірками, лимоном та маслинами (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 75,
    kcalPerServing: 310,
    proteinPerServing: 18,
    fatPerServing: 9,
    carbsPerServing: 39,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Картопля сушена (25 г/ос)', amount: 100, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Рис білий або пропарений (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'М\'ясо сушене + копчене куряче стегенце або ковбаса (15-20 г/ос)', amount: 64, unit: 'г', category: 'м\'ясо', rawToDryRatio: 4.5 },
      { name: 'Помідори сушені (4 г/ос) та перець солодкий (4 г/ос)', amount: 32, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Маслини сушені (3 г/ос) та солоні бочкові огірки сушені (2 г/ос)', amount: 20, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 },
      { name: 'Лимон сушений кружальцями (1,5 г/ос), цибуля (1 г) та морква (1 г)', amount: 14, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'Поєднання основного рецепта ТК «Глобус» та варіанту з коментарів (nata_mik): копчений курячий окорочок або сушене м\'ясо з копченостями (15-20 г/ос), картопля (20-30 г), рис (20 г), помідори, перець, сушені бочкові солоні огірки, маслини (3 г) та сушений лимон (1,5 г).',
      'Огірки обов\'язково брати солоні (бочкові), а не мариновані — саме вони разом із сушеним лимоном дають фірмову кислинку солянки.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо копчена курка, маслини, лимон та огірки)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Сухі кружальця лимона, маслин та огірків'
    },
    campRehydration: {
      waterRatioNote: 'Варити у воді (~350-400 мл/порцію) 10 хв на слабкому вогні, настояти під кришкою 5 хв',
      soakMinutes: 5,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, nata_mik, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-french-cheese-soup',
    title: 'Французький сирний суп із копченостями та спагеті (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 103,
    kcalPerServing: 415,
    proteinPerServing: 19,
    fatPerServing: 14,
    carbsPerServing: 52,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Макарони спагеті сухі (40 г/ос, магазин)', amount: 160, unit: 'г', category: 'макарони' },
      { name: 'Сир плавлений (25 г/ос — з розрахунку 0,5 сирка на 1 л казана)', amount: 100, unit: 'г', category: 'молочні' },
      { name: 'Картопля сушена (20 г/ос)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Копчена ковбаса, бастурма або балик (15 г/ос — для аромату диму)', amount: 60, unit: 'г', category: 'м\'ясо' },
      { name: 'Цибуля (1 г/ос), морква (1 г/ос), зелень (0,5 г/ос) та спеції', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Рецепт із коментарів ТК «Глобус» (avzaskalna): копчена ковбаса чи бастурма/балик — 15 г/ос, спагеті — 40 г/ос, картопля сушена — 20 г/ос, плавлений сир — об\'єм казана навпіл (напр. 5 сирків на 10-літровий казан), цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Спагеті поламати навпіл і змішати з сушеними овочами; плавлений сир та копченості пакуються окремо.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6 год (окремо сушаться лише картопля, морква, цибуля та зелень)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Зварити картоплю, спагеті та копченості до готовності, потім дрібно нарізати або натерти плавлений сирок і проварити ще 5 хв при помішуванні',
      soakMinutes: 2,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (avzaskalna, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-goulash-csipetke',
    title: 'Гуляш по-угорськи з чипетке (дрібною вермішеллю), яловичиною та паприкою (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 83,
    kcalPerServing: 320,
    proteinPerServing: 18,
    fatPerServing: 6,
    carbsPerServing: 49,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Картопля сушена (35 г/ос)', amount: 140, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Вермішель дрібна «рис» або домашні сушені чипетке (15 г/ос)', amount: 60, unit: 'г', category: 'макарони' },
      { name: 'М\'ясо яловиче сушене (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Перець солодкий сушений (5 г/ос) та помідори сушені (5 г/ос)', amount: 40, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Цибуля сушена (3 г/ос), томатний порошок (3 г/ос) та солодка паприка (2 г/ос)', amount: 32, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'Рецепт із коментарів ТК «Глобус» (nata_mik): картопля — 35 г, вермішель у вигляді крупного рису або домашні щипані галушки «чипетке» — 15 г, м\'ясо сушене — 15 г, перець солодкий — 5 г, помідори сушені — 5 г, цибуля — 3 г, томатний порошок — 3 г, паприка солодка — 2 г.',
      'Справжні угорські чипетке можна зробити вдома: замісити круте яєчне тісто, нащипати маленькі шматочки і заздалегідь висушити їх у сушарці, або взяти готову дрібну пасту орзо/різоні.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год (окремо м\'ясо, овочі та домашні чипетке)',
      trayLining: 'Сітка або пергамент',
      drynessTest: 'Сухі тверді гранули м\'яса, овочів і тіста'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~350-400 мл/порцію), варити 8-10 хв до готовності картоплі та чипетке, настояти 5 хв',
      soakMinutes: 5,
      boilMinutes: 9
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (nata_mik, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-lagman',
    title: 'Лагман похідний із локшиною, яловичиною та сушеними баклажанами (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 89,
    kcalPerServing: 345,
    proteinPerServing: 19,
    fatPerServing: 6,
    carbsPerServing: 54,
    fiberPerServing: 6.5,
    rawIngredients: [
      { name: 'Локшина або вермішель твердих сортів (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'макарони' },
      { name: 'М\'ясо яловиче сушене (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Картопля сушена (10 г/ос)', amount: 40, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Помідори сушені (10 г/ос, усушка 1:16)', amount: 40, unit: 'г', category: 'овочі', rawToDryRatio: 16.0 },
      { name: 'Баклажани сушені (5 г/ос, 1:14) та перець солодкий сушений (5 г/ос, 1:17)', amount: 40, unit: 'г', category: 'овочі', rawToDryRatio: 15.5 },
      { name: 'Морква сушена (5 г/ос) та цибуля сушена (4 г/ос)', amount: 36, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'Рецепт із коментарів ТК «Глобус» (nata_mik): вермішель/локшина — 35 г, м\'ясо сушене — 15 г, картопля — 10 г, помідори сушені — 10 г, морква — 5 г, перець солодкий — 5 г, баклажани сушені — 5 г, цибуля — 4 г.',
      'Велика кількість сушених овочів (39 г сухої овочевої підливи на людину!) робить бульйон густим, насиченим та ароматним.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо баклажани, томати, перець, морква та м\'ясо)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі ламкі скибочки баклажанів і томатів'
    },
    campRehydration: {
      waterRatioNote: 'Проварити м\'ясо з овочами та картоплею 6-7 хв, додати локшину та варити ще 4 хв, настояти під кришкою',
      soakMinutes: 5,
      boilMinutes: 9
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (nata_mik, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-green-borscht',
    title: 'Зелений борщ із сушеним щавлем, картоплею, м\'ясом та яйцем (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 80,
    kcalPerServing: 315,
    proteinPerServing: 21,
    fatPerServing: 8,
    carbsPerServing: 40,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Картопля сушена (30 г/ос)', amount: 120, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Рис або гречка (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'крупи' },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Яєчний порошок / сухий омлет (10 г/ос, або варені яйця на перші дні)', amount: 40, unit: 'г', category: 'яйця' },
      { name: 'Щавель сушений (листя без стебел!) та весняна зелень (6 г/ос)', amount: 24, unit: 'г', category: 'зелень', rawToDryRatio: 12.0 },
      { name: 'Морква та цибуля сушені (4 г/ос)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'За досвідом учасниць ТК «Глобус» (Marisha, Катерина, nata): щавель сушити потрібно ТІЛЬКИ листя без ніжок/стебел (бо стебла у поході не розварюються і лишаються «соломою»).',
      'Для виразної кислинки беріть підвищену норму сушеного листя щавлю (~5-6 г сухого щавлю з кропом і петрушкою на людину, тобто ~40 г на казан для 8 осіб).'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: '4-6 год (листя щавлю при 50°C, овочі та м\'ясо окремо)',
      trayLining: 'Сітка',
      drynessTest: 'Листя щавлю крихке та зелене'
    },
    campRehydration: {
      waterRatioNote: 'Зварити картоплю, рис та м\'ясо 8-9 хв, наприкінці ввести сушений щавель та розведений яєчний порошок, проварити 2 хв',
      soakMinutes: 5,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Marisha, Катерина, nata, tkg.org.ua/node/22586)'
  },

  // --- Другі страви та сніданки ТК КПІ «Глобус» ---
  {
    id: 'recipe-globus-kulesh',
    title: 'Куліш похідний з кукурудзяним борошном, пюре, грибами та м\'ясом (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 81,
    kcalPerServing: 310,
    proteinPerServing: 14,
    fatPerServing: 5,
    carbsPerServing: 53,
    fiberPerServing: 5.0,
    rawIngredients: [
      { name: 'Кукурудзяне борошно або дрібна крупа (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'крупи' },
      { name: 'Картопляне пюре сухе пластівцями (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Гриби лісові сушені (7 г/ос)', amount: 28, unit: 'г', category: 'гриби', rawToDryRatio: 9.0 },
      { name: 'М\'ясо сушене шматочками (7 г/ос, усушка 1:5)', amount: 28, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Цибуля ріпчаста (1 г/ос) та морква (1 г/ос) сушені', amount: 8, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: кукурудзяне борошно — 45 г, картопля-пюре — 20 г, гриби сушені — 7 г, м\'ясо шматочками — 7 г, цибуля — 1 г, морква — 1 г.',
      'Поєднання кукурудзяного борошна з картопляним пюре дозволяє зварити густий ситний куліш за лічені хвилини без довгого розварювання грубої крупи.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо сушаться гриби, м\'ясо, цибуля та морква)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі гриби та шматочки м\'яса'
    },
    campRehydration: {
      waterRatioNote: 'Проварити сушені гриби, м\'ясо й овочі 5-6 хв у воді (~300-350 мл/порцію), тонкою цівкою всипати кукурудзяне борошно з пюре, проварити 3 хв постійно помішуючи',
      soakMinutes: 5,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-banosh-brynza',
    title: 'Банош карпатський із сушеною бринзою та картопляним пюре (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 82,
    kcalPerServing: 325,
    proteinPerServing: 13,
    fatPerServing: 8,
    carbsPerServing: 51,
    fiberPerServing: 3.8,
    rawIngredients: [
      { name: 'Кукурудзяне борошно або дрібна полента (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'крупи' },
      { name: 'Картопляне пюре сухе (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'крупи' },
      { name: 'Сир тертий, бажано карпатська бринза (15 г/ос)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Цибуля ріпчаста (1 г/ос) та морква (1 г/ос) сушені', amount: 8, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: склад кулешу (кукурудзяне борошно 45 г + картопля-пюре 20 г + цибуля 1 г + морква 1 г), але м\'ясо та гриби замінюються на тертий сир (бажано бринзу) з розрахунку 15 г/людину.',
      'Кукурудзяне борошно та картопляні пластівці змішати в основний пакет, бринзу спакувати окремо.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '5-6 год (окремо сушаться цибуля та морква)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Всипати суміш у киплячу воду (~280-300 мл/порцію), варити 3-4 хв помішуючи, в кінці вмішати терту бринзу',
      soakMinutes: 2,
      boilMinutes: 4
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-buckwheat-meat-veg',
    title: 'Гречка з сушеним м\'ясом шматочками та овочами (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 83,
    kcalPerServing: 315,
    proteinPerServing: 21,
    fatPerServing: 6,
    carbsPerServing: 46,
    fiberPerServing: 7.0,
    rawIngredients: [
      { name: 'Крупа гречана ядриця (65 г/ос, магазин)', amount: 260, unit: 'г', category: 'крупи' },
      { name: 'М\'ясо яловиче сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Цибуля сушена (1 г/ос), морква (1 г/ос) та зелень (0,5 г/ос)', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: гречка — 65 г, м\'ясо сушене шматочками — 15 г, цибуля сушена — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Базова безвідмовна страва гірських походів: мінімальна вага, висока частка білка та клітковини.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7-8 год (окремо м\'ясо та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі тверді шматочки м\'яса'
    },
    campRehydration: {
      waterRatioNote: 'Залити водою (~250-300 мл/порцію), довести до кипіння, варити 5-7 хв і настояти в утепленому казані 10 хв',
      soakMinutes: 10,
      boilMinutes: 6
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-funchoza-fish',
    title: 'Фунчоза (або макарони) з сушеною рибою та овочами (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 88,
    kcalPerServing: 310,
    proteinPerServing: 14,
    fatPerServing: 3,
    carbsPerServing: 59,
    fiberPerServing: 2.5,
    rawIngredients: [
      { name: 'Фунчоза або макарони твердих сортів (70 г/ос, магазин)', amount: 280, unit: 'г', category: 'макарони' },
      { name: 'Риба варено-сушена шматочками (15 г/ос, усушка 1:9)', amount: 60, unit: 'г', category: 'риба', rawToDryRatio: 9.0 },
      { name: 'Цибуля сушена (1 г/ос), морква (1 г/ос) та зелень (0,5 г/ос)', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: макарони або фунчоза — 70 г, риба сушена шматочками — 15 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Філе нежирної морської або річкової риби відварити у підсоленій воді зі спеціями, розібрати від кісток і висушити в дегідраторі (усушка мороженої риби становить 1:8–1:10).'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '7-9 год (окремо риба та овочі)',
      trayLining: 'Пергамент або сітка',
      drynessTest: 'Ламкі сухі шматочки риби'
    },
    campRehydration: {
      waterRatioNote: 'Проварити сушену рибу з морквою та цибулею 5 хв у підсоленій воді, додати фунчозу (запарити на 3 хв) або макарони (проварити 5 хв)',
      soakMinutes: 5,
      boilMinutes: 5
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-pasta-tushonka-veg',
    title: 'Макарони (або фунчоза) з м\'ясом у салі, горошком, кукурудзою та овочами (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 114,
    kcalPerServing: 450,
    proteinPerServing: 21,
    fatPerServing: 16,
    carbsPerServing: 56,
    fiberPerServing: 4.8,
    rawIngredients: [
      { name: 'Макарони або фунчоза (70 г/ос, магазин)', amount: 280, unit: 'г', category: 'макарони' },
      { name: 'М\'ясо в салі / домашня тушонка (30 г/ос)', amount: 120, unit: 'г', category: 'м\'ясо', rawToDryRatio: 2.5 },
      { name: 'Зелений горошок (3 г/ос) та кукурудза солодка (3 г/ос) сушені', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 4.5 },
      { name: 'Цвітна капуста (2 г), помідори (2 г) та перець солодкий (1,5 г) сушені', amount: 22, unit: 'г', category: 'овочі', rawToDryRatio: 15.0 },
      { name: 'Морква (1 г/ос), цибуля (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 10, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: макарони/фунчоза — 70 г, м\'ясо в салі — 30 г, зелений горошок — 3 г, кукурудза солодка — 3 г, цвітна капуста — 2 г, помідори — 2 г, перець — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Багатий овочевий букет (горошок, кукурудза, цвітна капуста, томати) перетворює звичайні макарони з тушонкою на яскраву ресторанну страву.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо сушаться горошок, кукурудза, цвітна капуста, перець і томати)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі без вологи'
    },
    campRehydration: {
      waterRatioNote: 'Відварити сушені овочі разом із макаронами (6-7 хв), додати м\'ясо в салі, перемішати та прогріти 2 хв',
      soakMinutes: 3,
      boilMinutes: 7
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-pumpkin-porridge',
    title: 'Гарбузова каша молочна з пшоном або рисом (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 75,
    kcalPerServing: 275,
    proteinPerServing: 10,
    fatPerServing: 5,
    carbsPerServing: 49,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Пшоно або рис (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'крупи' },
      { name: 'Гарбуз сушений стружкою (20 г/ос, усушка 1:13 зі шкіркою та насінням)', amount: 80, unit: 'г', category: 'овочі', rawToDryRatio: 13.0 },
      { name: 'Сухе молоко незбиране (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Цукор або родзинки до каші (5 г/ос, магазин)', amount: 20, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: пшоно або рис — 30-35 г, гарбуз сушений — 20 г, сухе молоко — 15 г.',
      'Порада Т. Моянської: при закупці свіжого гарбуза враховуйте усушку 1:13 (разом зі шкіркою та насінням); найкраще брати гарбуз форми груші/гітари — у ньому значно більше м\'якоті й менше насіння.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (сушиться натертий або тонко нарізаний гарбуз)',
      trayLining: 'Сітка',
      drynessTest: 'Яскраво-помаранчева суха ламка стружка гарбуза'
    },
    campRehydration: {
      waterRatioNote: 'Замочити сушений гарбуз на 10 хв, додати промиту крупу і варити 10-12 хв, наприкінці ввести розведене сухе молоко та масло',
      soakMinutes: 10,
      boilMinutes: 10
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-wheat-porridge-meat',
    title: 'Пшенична каша (Артек) із м\'ясом у салі та сушеними овочами (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 98,
    kcalPerServing: 390,
    proteinPerServing: 19,
    fatPerServing: 15,
    carbsPerServing: 45,
    fiberPerServing: 3.8,
    rawIngredients: [
      { name: 'Крупа пшенична дрібна (65 г/ос, магазин)', amount: 260, unit: 'г', category: 'крупи' },
      { name: 'М\'ясо в салі / тушонка домашня (30 г/ос)', amount: 120, unit: 'г', category: 'м\'ясо', rawToDryRatio: 2.5 },
      { name: 'Цибуля сушена (1,5 г/ос) та морква сушена (1,5 г/ос)', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: пшенична крупа — 65 г (можна також чергувати з гречкою або рисом 65 г), м\'ясо в салі — 30 г, цибуля — 1 г, морква — 1 г.',
      'Дрібна пшенична крупа вариться швидко, має високу засвоюваність і чудово поєднується з м\'ясом у смальці.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6 год (окремо сушаться лише цибуля та морква)',
      trayLining: 'Сітка',
      drynessTest: 'Суха морква та цибуля'
    },
    campRehydration: {
      waterRatioNote: 'Зварити пшеничну крупу з сушеною морквою та цибулею (8-10 хв), заправити м\'ясом у салі та укутати казан на 5 хв',
      soakMinutes: 5,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-funchoza-cheese-veg',
    title: 'Фунчоза (або макарони) з твердим сиром, горошком та кукурудзою (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 114,
    kcalPerServing: 410,
    proteinPerServing: 16,
    fatPerServing: 10,
    carbsPerServing: 63,
    fiberPerServing: 4.8,
    rawIngredients: [
      { name: 'Макарони або фунчоза (70 г/ос, магазин)', amount: 280, unit: 'г', category: 'макарони' },
      { name: 'Сир твердий (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'молочні' },
      { name: 'Зелений горошок (3 г/ос) та кукурудза солодка (3 г/ос) сушені', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 4.5 },
      { name: 'Цвітна капуста (2 г), помідори (2 г) та перець (1,5 г) сушені', amount: 22, unit: 'г', category: 'овочі', rawToDryRatio: 15.0 },
      { name: 'Морква (1 г/ос), цибуля (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 10, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: макарони/фунчоза — 70 г, сир твердий (замість м\'яса) — 30 г, зелений горошок — 3 г, кукурудза солодка — 3 г, цвітна капуста — 2 г, помідори — 2 г, перець — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Чудова ситна страва для молочного ранку або вегетаріанської вечері.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо сушаться овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Відварити сушені овочі 5-6 хв, зварити макарони або запарити фунчозу, гарячу страву щедро заправити тертим сиром',
      soakMinutes: 4,
      boilMinutes: 6
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-pilaf-corn-peas',
    title: 'Плов по-глобусівськи з м\'ясом у салі, кукурудзою та зеленим горошком (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 122,
    kcalPerServing: 510,
    proteinPerServing: 24,
    fatPerServing: 21,
    carbsPerServing: 56,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Рис пропарений (65 г/ос, магазин)', amount: 260, unit: 'г', category: 'крупи' },
      { name: 'М\'ясо в салі (40-60 г/ос за розкладкою ТК «Глобус»)', amount: 160, unit: 'г', category: 'м\'ясо', rawToDryRatio: 2.8 },
      { name: 'Помідори сушені (4 г/ос) та перець солодкий сушений (3 г/ос)', amount: 28, unit: 'г', category: 'овочі', rawToDryRatio: 16.5 },
      { name: 'Зелений горошок (3 г/ос) та кукурудза солодка (3 г/ос) сушені', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 4.5 },
      { name: 'Морква сушена (2 г/ос), цибуля (1 г/ос), зелень та спеції до плову', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'Фірмова святкова вечеря ТК «Глобус»: рис — 65 г/ос, м\'ясо в салі — 40-60 г/ос, помідори сушені — 4 г, перець солодкий — 3 г, зелений горошок — 3 г, кукурудза солодка — 3 г, морква — 2 г, цибуля — 1 г, зелень — 0,5 г.',
      'Сушені овочі змішати з рисом і прянощами; м\'ясо в салі пакується окремо.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо сушаться томати, перець, горошок, кукурудза та морква)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'У казані розігріти м\'ясо в салі, додати сушені овочі й рис, залити окропом на 1,5 см вище рівня рису, варити 8-10 хв на малому вогні та укутати на 10 хв',
      soakMinutes: 10,
      boilMinutes: 9
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-potato-mushrooms-meat',
    title: 'Картопля сушена з лісовими грибами та м\'ясом (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 77,
    kcalPerServing: 270,
    proteinPerServing: 14,
    fatPerServing: 4,
    carbsPerServing: 44,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Картопля сушена кубиками/пластівцями (60 г/ос)', amount: 240, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Гриби лісові сушені (7 г/ос)', amount: 28, unit: 'г', category: 'гриби', rawToDryRatio: 9.0 },
      { name: 'М\'ясо сушене шматочками (7 г/ос, усушка 1:5)', amount: 28, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Цибуля ріпчаста (1 г/ос), морква (1 г/ос) та зелень (0,5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: картопля сушена — 60 г, гриби — 7 г, м\'ясо шматочками — 7 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Поєднання сушеної картоплі з білими грибами та м\'ясом дає смак домашньої тушкованої картоплі з лісовими грибами.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо бланшована картопля, гриби, м\'ясо та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі ламкі кубики картоплі та скибочки грибів'
    },
    campRehydration: {
      waterRatioNote: 'Замочити гриби, м\'ясо та картоплю на 10-15 хв, тушкувати на малому вогні 8-10 хв, заправити топленим маслом або олією',
      soakMinutes: 12,
      boilMinutes: 9
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-pasta-navy-style',
    title: 'Вермішель (або фунчоза) по-флотськи з сушеним фаршем (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 89,
    kcalPerServing: 335,
    proteinPerServing: 18,
    fatPerServing: 6,
    carbsPerServing: 52,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Макарони / вермішель або фунчоза (70 г/ос, магазин)', amount: 280, unit: 'г', category: 'макарони' },
      { name: 'М\'ясо фарш варено-сушений (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Перець солодкий (1,5 г/ос), цибуля (1 г), морква (1 г) та зелень (0,5 г)', amount: 16, unit: 'г', category: 'овочі', rawToDryRatio: 11.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: макарони/фунчоза — 70 г, м\'ясний фарш сушений — 15 г, перець солодкий — 1,5 г, цибуля — 1 г, морква — 1 г, зелень — 0,5 г.',
      'Фарш розварюється швидше за м\'ясо шматочками і рівномірно обволікає вермішель.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год (окремо відварений фарш та овочі)',
      trayLining: 'Пергамент або дрібна сітка',
      drynessTest: 'Сухі гранули фаршу без жиру'
    },
    campRehydration: {
      waterRatioNote: 'Всипати фарш і сушені овочі у киплячу воду (~250 мл/порцію), додати вермішель і варити 4-5 хв до вбирання води',
      soakMinutes: 3,
      boilMinutes: 5
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-veg-ragout-cheese',
    title: 'Рагу овочеве зі стручковою квасолею, кабачками, м\'ясом та сиром (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 83,
    kcalPerServing: 315,
    proteinPerServing: 21,
    fatPerServing: 9,
    carbsPerServing: 36,
    fiberPerServing: 6.8,
    rawIngredients: [
      { name: 'Картопляне пюре сухе (15 г/ос) + картопля сушена (10 г/ос)', amount: 100, unit: 'г', category: 'овочі', rawToDryRatio: 4.0 },
      { name: 'М\'ясо сушене шматочками (15 г/ос, усушка 1:5)', amount: 60, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Сир твердий (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Квасоля стручкова сушена (10 г/ос, усушка 1:10)', amount: 40, unit: 'г', category: 'овочі', rawToDryRatio: 10.0 },
      { name: 'Капуста цвітна (4 г/ос, 1:15) та кабачки сушені (3 г/ос, 1:25)', amount: 28, unit: 'г', category: 'овочі', rawToDryRatio: 19.0 },
      { name: 'Морква (3 г/ос) та цибуля ріпчаста (3 г/ос) сушені', amount: 24, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 },
      { name: 'Перець солодкий (2 г/ос), помідори (2 г/ос) та зелень (0,5 г/ос) сушені', amount: 18, unit: 'г', category: 'овочі', rawToDryRatio: 15.0 }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» на 1 людину: картопляне пюре — 15 г, картопля сушена — 10 г, м\'ясо шматочками — 15 г, сир — 15 г, квасоля стручкова — 10 г, капуста цвітна — 4 г, морква — 3 г, цибуля — 3 г, кабачки — 3 г (усушка 1:25!), перець солодкий — 2 г, помідори — 2 г, зелень — 0,5 г.',
      'Картопляне пюре додається наприкінці варіння і зв\'язує овочевий бульйон у густе кремове рагу з розплавленим сиром.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо кабачки, цвітна капуста, стручкова квасоля, томати та м\'ясо)',
      trayLining: 'Сітчасті піддони',
      drynessTest: 'Хрусткі стручки квасолі, сухі скибочки кабачків та суцвіття капусти'
    },
    campRehydration: {
      waterRatioNote: 'Проварити сушені овочі та м\'ясо у невеликій кількості води (~280 мл/порцію) 8-10 хв, всипати картопляне пюре та тертий сир, перемішати',
      soakMinutes: 10,
      boilMinutes: 9
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-savory-oatmeal-meat',
    title: 'Вівсянка солона з сушеним м\'ясом та спеціями (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 83,
    kcalPerServing: 325,
    proteinPerServing: 20,
    fatPerServing: 8,
    carbsPerServing: 43,
    fiberPerServing: 6.0,
    rawIngredients: [
      { name: 'Вівсяні пластівці Геркулес (60 г/ос, магазин)', amount: 240, unit: 'г', category: 'крупи' },
      { name: 'М\'ясо яловиче або куряче сушене (18 г/ос, усушка 1:5)', amount: 72, unit: 'г', category: 'м\'ясо', rawToDryRatio: 5.0 },
      { name: 'Цибуля сушена, морква, часник, паприка та зелень (5 г/ос)', amount: 20, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'Рецепт із коментарів ТК «Глобус» (natika): несолодка вівсянка з сушеним м\'ясом, сушеною цибулею та ароматними спеціями.',
      'Ідеальний швидкий білковий сніданок для тих, хто не любить солодкі молочні каші.'
    ],
    dehydrationParams: {
      tempCelsius: 60,
      timeHours: '6-8 год (окремо сушаться м\'ясо та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі волокна м\'яса та овочі'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~250 мл/порцію), проварити м\'ясо з пластівцями 2-3 хв і настояти під кришкою 4 хв',
      soakMinutes: 4,
      boilMinutes: 2
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (natika, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-simple-globus-semolina-condensed',
    title: 'Манна каша на згущеному молоці з цукатами, курагою та родзинками (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 115,
    kcalPerServing: 410,
    proteinPerServing: 10,
    fatPerServing: 7,
    carbsPerServing: 77,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Крупа манна (55 г/ос, магазин)', amount: 220, unit: 'г', category: 'крупи' },
      { name: 'Згущене молоко (30 г/ос, дой-пак магазин)', amount: 120, unit: 'г', category: 'молочні' },
      { name: 'Родзинки без кісточок (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'сухофрукти' },
      { name: 'Цукати (10 г/ос) та курага нарізана (5 г/ос, магазин)', amount: 60, unit: 'г', category: 'сухофрукти' }
    ],
    homePrepSteps: [
      'Рецепт із коментарів ТК «Глобус» (theWRM): крупа манна — 50-60 г, згущене молоко, цукати — 10-15 г, курага порізана — 10 г, родзинки — 15-20 г, масло — 3 г.',
      'Сушарка не потрібна — всі інгредієнти купуються готовими в магазині.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'У киплячу воду при перемішуванні влити згущене молоко, тонкою цівкою всипати манку (100 г крупи на 1 л рідини), варити 5-7 хв помішуючи, в кінці додати сухофрукти, цукати й масло',
      soakMinutes: 2,
      boilMinutes: 6
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (theWRM, tkg.org.ua/node/22586)'
  },

  // --- Узвари, компоти та гаряче какао ТК КПІ «Глобус» ---
  {
    id: 'recipe-globus-uzvar-classic',
    title: 'Узвар похідний із сушених груш, яблук та чорносливу (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['dinner', 'breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 15,
    kcalPerServing: 40,
    proteinPerServing: 0.5,
    fatPerServing: 0.1,
    carbsPerServing: 9.5,
    fiberPerServing: 1.5,
    rawIngredients: [
      { name: 'Груша сушена (5 г/ос, усушка 1:7 за ТК «Глобус»)', amount: 20, unit: 'г', category: 'фрукти', rawToDryRatio: 7.0 },
      { name: 'Яблуко сушене скибочками (5 г/ос)', amount: 20, unit: 'г', category: 'фрукти', rawToDryRatio: 6.5 },
      { name: 'Чорнослив в\'ялений без кісточки (5 г/ос)', amount: 20, unit: 'г', category: 'сухофрукти' }
    ],
    homePrepSteps: [
      'Норма ТК «Глобус» для узвару на 1 людину: груша сушена — 5 г, яблуко сушене — 5 г, чорнослив — 5 г (або варіант компоту «Яблуко 7 г + Груша 7 г»).',
      'Груші та яблука нарізати тонкими часточками та висушити в дегідраторі при 58°C (7 г свіжої груші дають 1 г сухої).'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (сушаться груші та яблука)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі еластичні скибочки груш і яблук'
    },
    campRehydration: {
      waterRatioNote: 'Всипати у казан з водою (~300-350 мл/порцію), довести до кипіння, проварити 3-5 хв та настояти під кришкою 10 хв',
      soakMinutes: 10,
      boilMinutes: 4
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-globus-berry-compote',
    title: 'Компот вітамінний із сушених ягід: вишня, смородина, полуниця, чорниця (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['dinner', 'breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 15,
    kcalPerServing: 42,
    proteinPerServing: 0.6,
    fatPerServing: 0.2,
    carbsPerServing: 10.0,
    fiberPerServing: 2.0,
    rawIngredients: [
      { name: 'Вишня без кісточки або чорниця сушена (5-7 г/ос)', amount: 20, unit: 'г', category: 'ягоди', rawToDryRatio: 6.5 },
      { name: 'Смородина чорна сушена (5 г/ос)', amount: 20, unit: 'г', category: 'ягоди', rawToDryRatio: 6.0 },
      { name: 'Полуниця, малина або яблуко сушені (5 г/ос)', amount: 20, unit: 'г', category: 'ягоди', rawToDryRatio: 7.5 }
    ],
    homePrepSteps: [
      'Класичні ягідні мікси ТК «Глобус» на 1 людину (14-15 г сухих ягід/ос): 1) Вишня 5 г + смородина 5 г + полуниця 5 г; 2) Полуниця 5 г + смородина 5 г + яблуко 5 г; 3) Чорниця 10 г + смородина 4 г; 4) Малина 7 г + яблуко 7 г.',
      'Свіжі ягоди сушити на сітчастих піддонах при 55°C до повної відсутності соку при стисканні.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '7-9 год (окремо ягоди та яблука)',
      trayLining: 'Сітка з дрібною коміркою',
      drynessTest: 'Сухі ягоди не злипаються і не пускають сік'
    },
    campRehydration: {
      waterRatioNote: 'Всипати у киплячу воду (~300 мл/порцію), проварити 2-3 хв з цукром та настояти 10 хв',
      soakMinutes: 10,
      boilMinutes: 3
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (Т. Моянська, tkg.org.ua/node/22586)'
  },
  {
    id: 'recipe-simple-globus-spiced-cocoa',
    title: 'Гаряче похідне какао зі згущеним молоком, корицею та ваніллю (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['breakfast', 'snack', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 47,
    kcalPerServing: 165,
    proteinPerServing: 7,
    fatPerServing: 6,
    carbsPerServing: 21,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Какао-порошок натуральний (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'спеції' },
      { name: 'Згущене молоко або сухе молоко з цукром (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'молочні' },
      { name: 'Кориця мелена та ванільний цукор (2 г/ос, магазин)', amount: 8, unit: 'г', category: 'спеції' }
    ],
    homePrepSteps: [
      'Рецепт із коментарів ТК «Глобус» (avzaskalna): какао-порошок — 25-30 г/ос, згущене молоко — 20 г/ос, ванільний цукор — 2 г на 1 л, кориця — 5 г на 1 л.',
      'Сушарка не потрібна — змішати какао-порошок із корицею та ванільним цукром у герметичний пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суха суміш'
    },
    campRehydration: {
      waterRatioNote: 'Розвести какао у невеликій кількості теплої води, влити в казан з окропом та згущеним молоком, довести до кипіння і додати корицю з ваніллю',
      soakMinutes: 1,
      boilMinutes: 2
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Турклуб КПІ «Глобус» (avzaskalna, tkg.org.ua/node/22586)'
  },

  // --- 8. Холодні обіди-перекуси без варіння за розкладкою ТК «Глобус» (все, що не готується) ---
  {
    id: 'recipe-globus-lunch-salami-choc',
    title: 'Похідний обід-перекус: ковбаса с/к, сухарі та шоколад (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['lunch', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 100,
    kcalPerServing: 470,
    proteinPerServing: 12,
    fatPerServing: 26,
    carbsPerServing: 47,
    fiberPerServing: 3.0,
    rawIngredients: [
      { name: 'Ковбаса сирокопчена салямі (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'м\'ясо' },
      { name: 'Шоколад чорний або молочний (40 г/ос, магазин)', amount: 160, unit: 'г', category: 'солодощі' },
      { name: 'Сухарі звичайні пшеничні (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — класичний ходовий обід-перекус ТК «Глобус», що взагалі не потребує готування.',
      'Розважити в денний обідній пакет: салямі порційно, сухарі звичайні та плитку шоколаду до чаю з термоса.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий обідній набір'
    },
    campRehydration: {
      waterRatioNote: 'Не потребує варіння та розпалювання пальника! Нарізати ковбасу на сухарі, запивати гарячим чаєм з термоса та шоколадом.',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (ходовий обід без варіння)'
  },
  {
    id: 'recipe-globus-lunch-cheese-nuts-choc',
    title: 'Похідний обід-перекус: твердий сир, горіхи, сухарі та шоколад (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['lunch', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 110,
    kcalPerServing: 510,
    proteinPerServing: 16,
    fatPerServing: 28,
    carbsPerServing: 48,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Сир твердий Гауда / Чеддер (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'молочні' },
      { name: 'Сухарі пшеничні або галети (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' },
      { name: 'Горішки кеш\'ю або мигдаль (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'горіхи' },
      { name: 'Шоколад чорний (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — ситний білковий обід без вогню.',
      'Спакувати брусочки сиру в пергамент, горіхи з сухарями та шоколадом у щільний пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий обідній набір'
    },
    campRehydration: {
      waterRatioNote: 'Не потребує варіння! Нарізати твердий сир на сухарі, подавати з горішками та шоколадом.',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (ходовий обід без варіння)'
  },
  {
    id: 'recipe-globus-lunch-salo-crackers-choc',
    title: 'Похідний обід-перекус: солоне сало, житні сухарі, часник та шоколад (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['lunch', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 105,
    kcalPerServing: 535,
    proteinPerServing: 10,
    fatPerServing: 35,
    carbsPerServing: 45,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Сало солоне шпик (30 г/ос, домашнє або магазин)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Сухарі житні домашні або армійські (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'хліб' },
      { name: 'Шоколад чорний 70%+ (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'солодощі' },
      { name: 'Часник свіжий або сушений (5 г/ос)', amount: 20, unit: 'г', category: 'овочі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — традиційний висококалорійний обід на гірському привалі.',
      'Сало загортається у пергамент або полотно з сіллю, сухарі та шоколад у zip-пакет.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Не потребує варіння! Нарізати сало тонкими скибочками на житні сухарі з зубчиком часнику, закушувати шоколадом з чаєм.',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (ходовий обід без варіння)'
  },
  {
    id: 'recipe-globus-lunch-fish-canned-crackers',
    title: 'Похідний обід-перекус: рибні консерви з сухарями та печивом (ТК «Глобус»)',
    category: 'main',
    mealTypes: ['lunch', 'snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 120,
    kcalPerServing: 430,
    proteinPerServing: 16,
    fatPerServing: 18,
    carbsPerServing: 50,
    fiberPerServing: 2.5,
    rawIngredients: [
      { name: 'Консерви рибні в олії (сардина/тунець, 60 г/ос)', amount: 240, unit: 'г', category: 'риба' },
      { name: 'Сухарі звичайні або галети (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' },
      { name: 'Печиво цукрове до чаю (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — швидкий обід із готових консервів та печива.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Не потребує варіння! Відкрити рибну консерву, вмочати сухарі, запивати гарячим чаєм із печивом.',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.08,
    sourceBook: 'Похідна розкладка ТК «Глобус» (ходовий обід без варіння)'
  },

  // --- 9. Сніданки за розкладкою ТК «Глобус» (похід 2014) ---
  {
    id: 'recipe-globus-pasta-cheese-tushonka',
    title: 'Макарони з твердим сиром, тушонкою та топленим маслом (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 185,
    kcalPerServing: 680,
    proteinPerServing: 27,
    fatPerServing: 26,
    carbsPerServing: 84,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Макарони твердих сортів (100 г/ос, магазин)', amount: 400, unit: 'г', category: 'макарони' },
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Сир твердий тертий (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'молочні' },
      { name: 'Масло топлене гхі (10 г/ос, магазин)', amount: 40, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — суперпоживний ранковий заряд для важких гірських переходів.',
      'Макарони спакувати в мішечок, тушонку та сир окремо.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Відварити макарони 6-7 хв у підсоленій воді, злити зайву воду, вмішати тушонку, топлене масло та тертий сир',
      soakMinutes: 1,
      boilMinutes: 7
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (сніданок дня 1)'
  },
  {
    id: 'recipe-globus-muesli-milk-crackers',
    title: 'Мюслі молочні з солодкими сухарями та сухим молоком (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 125,
    kcalPerServing: 465,
    proteinPerServing: 14,
    fatPerServing: 11,
    carbsPerServing: 78,
    fiberPerServing: 7.0,
    rawIngredients: [
      { name: 'Мюслі злакові з фруктами та горіхами (80 г/ос, магазин)', amount: 320, unit: 'г', category: 'крупи' },
      { name: 'Сухе молоко незбиране 25% (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Сухарі солодкі з родзинками (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати мюслі з сухим молоком у зіп-пакет на швидкий ранок.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готова суміш'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~250 мл/порцію), перемішати, настояти 2-3 хв під кришкою (варити не потрібно), подавати з солодкими сухарями',
      soakMinutes: 3,
      boilMinutes: 0
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (сніданок дня 2)'
  },
  {
    id: 'recipe-globus-arnautka-tushonka',
    title: 'Каша Арнаутка з тушонкою, кетчупом та пряниками (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 175,
    kcalPerServing: 540,
    proteinPerServing: 19,
    fatPerServing: 13,
    carbsPerServing: 87,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Крупа Арнаутка яра пшенична (80 г/ос, магазин)', amount: 320, unit: 'г', category: 'крупи' },
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Кетчуп томатний (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'спеції' },
      { name: 'Пряники медові до чаю (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — пшенична крупа арнаутка зі спеціями засипається в пакет на сніданок.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Зварити арнаутку у воді 1:2.5 (8-10 хв), вмішати тушонку з кетчупом, прогріти 2 хв, смакувати з пряниками до чаю',
      soakMinutes: 3,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (сніданок дня 5)'
  },
  {
    id: 'recipe-globus-oatmeal-dried-fruits-butter',
    title: 'Вівсянка з курагою, родзинками, топленим маслом та какао (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 175,
    kcalPerServing: 620,
    proteinPerServing: 16,
    fatPerServing: 16,
    carbsPerServing: 102,
    fiberPerServing: 10.0,
    rawIngredients: [
      { name: 'Вівсяні пластівці (80 г/ос, магазин)', amount: 320, unit: 'г', category: 'крупи' },
      { name: 'Курага без кісточки (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'сухофрукти' },
      { name: 'Родзинки темні (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'сухофрукти' },
      { name: 'Сухе молоко незбиране (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Масло топлене гхі (10 г/ос, магазин)', amount: 40, unit: 'г', category: 'молочні' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати вівсянку, сухе молоко та нарізані сухофрукти у пакет сніданку.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Залити окропом (~300 мл/порцію), проварити 2 хв, вмішати топлене масло та настояти 3 хв під кришкою',
      soakMinutes: 3,
      boilMinutes: 2
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (сніданок дня 4)'
  },
  {
    id: 'recipe-globus-sweet-rice-nuts',
    title: 'Рис солодкий молочний з горішками, топленим маслом та печивом (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast'],
    servingsYield: 4,
    dryWeightPerServingGrams: 170,
    kcalPerServing: 670,
    proteinPerServing: 15,
    fatPerServing: 26,
    carbsPerServing: 94,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Рис пропарений або круглозерний (80 г/ос, магазин)', amount: 320, unit: 'г', category: 'крупи' },
      { name: 'Горішки волоські, мигдаль або кеш\'ю (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'горіхи' },
      { name: 'Сухе молоко незбиране (15 г/ос, магазин)', amount: 60, unit: 'г', category: 'молочні' },
      { name: 'Масло топлене (10 г/ос, магазин)', amount: 40, unit: 'г', category: 'молочні' },
      { name: 'Печиво цукрове до чаю (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — змішати рис з сухим молоком та подрібненими горіхами у пакет сніданку.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Відварити рис 8-10 хв у воді 1:2.5, вмішати сухе молоко, топлене масло та горішки, настояти 5 хв під кришкою',
      soakMinutes: 5,
      boilMinutes: 8
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (сніданок дня 7)'
  },
  {
    id: 'recipe-globus-buckwheat-tushonka-ketchup',
    title: 'Гречка по-похідному з тушонкою, кетчупом та солодкими сухарями (ТК «Глобус»)',
    category: 'breakfast',
    mealTypes: ['breakfast', 'dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 175,
    kcalPerServing: 535,
    proteinPerServing: 20,
    fatPerServing: 13,
    carbsPerServing: 84,
    fiberPerServing: 9.0,
    rawIngredients: [
      { name: 'Крупа гречана ядриця (80 г/ос, магазин)', amount: 320, unit: 'г', category: 'крупи' },
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Кетчуп томатний (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'спеції' },
      { name: 'Сухарі солодкі з родзинками (30 г/ос, магазин)', amount: 120, unit: 'г', category: 'хліб' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — готова магазинна гречана основа з тушонкою та кетчупом.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий набір'
    },
    campRehydration: {
      waterRatioNote: 'Зварити гречку у воді 1:2 (7-8 хв), додати тушонку та кетчуп, укутати казан на 5 хв',
      soakMinutes: 5,
      boilMinutes: 7
    },
    packagingTareRatio: 0.04,
    sourceBook: 'Похідна розкладка ТК «Глобус» (сніданок дня 3)'
  },

  // --- 10. Вечірні похідні супи з тушонкою та салом (похід 2014) ---
  {
    id: 'recipe-globus-soup-cheese-curd-tushonka',
    title: 'Суп із плавленим сирком, вермішеллю, тушонкою та салом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 150,
    kcalPerServing: 520,
    proteinPerServing: 21,
    fatPerServing: 31,
    carbsPerServing: 38,
    fiberPerServing: 3.5,
    rawIngredients: [
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Сирок плавлений Дружба (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'молочні' },
      { name: 'Сало солоне шпик до супу (30 г/ос, магазин/дім)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Макарони або вермішель у суп (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'макарони' },
      { name: 'Картопля сушена (17 г/ос, усушка 1:6.5)', amount: 68, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Морква (1.5 г/ос) та цибуля (1.5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'У дегідраторі сушаться картопля, цибуля та морква.',
      'Макарони, плавлений сирок, тушонка та сало беруться готовими.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6 год (лише картопля, морква та цибуля)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Зварити картоплю, цибулю та макарони з тушонкою 6-7 хв (~350 мл води/порцію), наприкінці розчинити подрібнений сирок, подавати з нарізаним салом і сухарями',
      soakMinutes: 4,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (вечеря дня 1)'
  },
  {
    id: 'recipe-globus-canned-fish-ukha-tushonka',
    title: 'Юшка по-похідному з рибною консервою, крупою, тушонкою та салом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 172,
    kcalPerServing: 570,
    proteinPerServing: 27,
    fatPerServing: 35,
    carbsPerServing: 36,
    fiberPerServing: 3.0,
    rawIngredients: [
      { name: 'Консерва рибна сардина/горбуша в олії (60 г/ос, магазин)', amount: 240, unit: 'г', category: 'риба' },
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Сало солоне шпик до юшки (30 г/ос, дім/магазин)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Картопля сушена (17 г/ос, усушка 1:6.5)', amount: 68, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Крупа в суп рис або пшоно (17 г/ос, магазин)', amount: 68, unit: 'г', category: 'крупи' },
      { name: 'Морква (1.5 г/ос) та цибуля (1.5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'У дегідраторі сушаться картопля, морква та цибуля; решта інгредієнтів магазинні.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6 год (картопля, морква, цибуля)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Зварити крупу й картоплю з тушонкою 8 хв, додати рибну консерву, прогріти 2 хв, подавати з нарізаним салом і сухарями',
      soakMinutes: 5,
      boilMinutes: 8
    },
    packagingTareRatio: 0.06,
    sourceBook: 'Похідна розкладка ТК «Глобус» (вечеря дня 2)'
  },
  {
    id: 'recipe-globus-borscht-tushonka-salo',
    title: 'Борщ похідний із тушонкою, сушеним буряком, квасолею, капустою та салом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 126,
    kcalPerServing: 460,
    proteinPerServing: 16,
    fatPerServing: 30,
    carbsPerServing: 31,
    fiberPerServing: 5.5,
    rawIngredients: [
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Сало солоне шпик (30 г/ос, дім/магазин)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Картопля сушена (17 г/ос, усушка 1:6.5)', amount: 68, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Томатна паста концентрована (17 г/ос, магазин)', amount: 68, unit: 'г', category: 'спеції' },
      { name: 'Буряк (4 г/ос), капуста (5 г/ос), квасоля (5 г/ос) та морква (1.5 г/ос) сушені', amount: 62, unit: 'г', category: 'овочі', rawToDryRatio: 9.0 }
    ],
    homePrepSteps: [
      'У дегідраторі сушаться картопля, буряк, капуста, квасоля та морква.',
      'Томат-паста, тушонка та сало беруться готовими.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6-8 год (окремо сушені овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Зварити сушені овочі з тушонкою та томатом 10 хв у воді (~380 мл/порцію), настояти 5 хв, подавати з нарізаним салом та сухарями',
      soakMinutes: 5,
      boilMinutes: 10
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (вечеря дня 3)'
  },
  {
    id: 'recipe-globus-mushroom-soup-tushonka-salo',
    title: 'Грибний суп із сушеними білими грибами, тушонкою та салом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 103,
    kcalPerServing: 420,
    proteinPerServing: 15,
    fatPerServing: 29,
    carbsPerServing: 23,
    fiberPerServing: 4.0,
    rawIngredients: [
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Сало солоне шпик (30 г/ос, дім/магазин)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Картопля сушена (17 г/ос, усушка 1:6.5)', amount: 68, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Гриби лісові сушені (8 г/ос, усушка 1:9)', amount: 32, unit: 'г', category: 'гриби', rawToDryRatio: 9.0 },
      { name: 'Морква (1.5 г/ос) та цибуля (1.5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'У дегідраторі сушаться лісові гриби, картопля, морква та цибуля.'
    ],
    dehydrationParams: {
      tempCelsius: 55,
      timeHours: '7-8 год (гриби та овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі гриби та овочі'
    },
    campRehydration: {
      waterRatioNote: 'Замочити гриби з картоплею на 10 хв, варити з тушонкою 8 хв, подавати з нарізаним салом і сухарями',
      soakMinutes: 10,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (вечеря дня 4)'
  },
  {
    id: 'recipe-globus-pea-soup-briquette-tushonka',
    title: 'Гороховий суп із брикету з тушонкою, крупою та салом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 147,
    kcalPerServing: 540,
    proteinPerServing: 22,
    fatPerServing: 30,
    carbsPerServing: 46,
    fiberPerServing: 6.5,
    rawIngredients: [
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Гороховий суп у брикеті (40 г/ос, магазин)', amount: 160, unit: 'г', category: 'бобові' },
      { name: 'Сало солоне шпик (30 г/ос, дім/магазин)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Картопля сушена (17 г/ос, усушка 1:6.5)', amount: 68, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Крупа в суп (17 г/ос, магазин)', amount: 68, unit: 'г', category: 'крупи' },
      { name: 'Морква (1.5 г/ос) та цибуля (1.5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'Гороховий брикет, крупа, тушонка та сало магазинні, сушаться лише картопля, цибуля та морква.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6 год (овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Розкришити гороховий брикет, варити з картоплею, крупою та тушонкою 7-8 хв, подавати з салом і сухарями',
      soakMinutes: 3,
      boilMinutes: 8
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (вечеря дня 5)'
  },
  {
    id: 'recipe-globus-meat-noodle-soup-salo',
    title: 'М\'ясний суп із вермішеллю, картоплею, тушонкою та салом (ТК «Глобус»)',
    category: 'soup',
    mealTypes: ['dinner'],
    servingsYield: 4,
    dryWeightPerServingGrams: 115,
    kcalPerServing: 440,
    proteinPerServing: 15,
    fatPerServing: 29,
    carbsPerServing: 29,
    fiberPerServing: 3.0,
    rawIngredients: [
      { name: 'Тушонка яловича класична (45 г/ос, магазин)', amount: 180, unit: 'г', category: 'м\'ясо' },
      { name: 'Сало солоне шпик (30 г/ос, дім/магазин)', amount: 120, unit: 'г', category: 'жири' },
      { name: 'Макарони або вермішель у суп (20 г/ос, магазин)', amount: 80, unit: 'г', category: 'макарони' },
      { name: 'Картопля сушена (17 г/ос, усушка 1:6.5)', amount: 68, unit: 'г', category: 'овочі', rawToDryRatio: 6.5 },
      { name: 'Морква (1.5 г/ос) та цибуля (1.5 г/ос) сушені', amount: 12, unit: 'г', category: 'овочі', rawToDryRatio: 8.0 }
    ],
    homePrepSteps: [
      'У дегідраторі сушаться картопля, морква та цибуля.'
    ],
    dehydrationParams: {
      tempCelsius: 58,
      timeHours: '6 год (овочі)',
      trayLining: 'Сітка',
      drynessTest: 'Сухі овочі'
    },
    campRehydration: {
      waterRatioNote: 'Зварити сушені овочі з тушонкою (6 хв), всипати вермішель (варити 3 хв), подавати з салом і сухарями',
      soakMinutes: 3,
      boilMinutes: 7
    },
    packagingTareRatio: 0.05,
    sourceBook: 'Похідна розкладка ТК «Глобус» (вечеря дня 6)'
  },

  // --- 11. Ходові перекуси (карманка зі смоктальними цукерками) ---
  {
    id: 'recipe-globus-snack-apricot-raisin-candies',
    title: 'Перекус ходовий: курага, родзинки та льодяники (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 95,
    kcalPerServing: 275,
    proteinPerServing: 3,
    fatPerServing: 0.5,
    carbsPerServing: 65,
    fiberPerServing: 4.5,
    rawIngredients: [
      { name: 'Курага сушена без кісточки (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'сухофрукти' },
      { name: 'Родзинки темні без кісточки (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'сухофрукти' },
      { name: 'Цукерки смоктальні карамель/льодяники (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — розфасувати в щоденні кишенькові пакетики на ходовий перехід.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на ходу та коротких привалах',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Похідна розкладка ТК «Глобус» (перекус дня 1, 6)'
  },
  {
    id: 'recipe-globus-snack-grillage-candies',
    title: 'Перекус ходовий: грильяж горіховий та льодяники (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 220,
    proteinPerServing: 2.5,
    fatPerServing: 5,
    carbsPerServing: 42,
    fiberPerServing: 1.5,
    rawIngredients: [
      { name: 'Грильяж горіховий похідний (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'солодощі' },
      { name: 'Цукерки смоктальні карамель/льодяники (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — кишенькове харчування для переходу.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на ходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Похідна розкладка ТК «Глобус» (перекус дня 2, 7)'
  },
  {
    id: 'recipe-globus-snack-nuts-candies',
    title: 'Перекус ходовий: горіховий мікс та льодяники (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 270,
    proteinPerServing: 7,
    fatPerServing: 17,
    carbsPerServing: 26,
    fiberPerServing: 3.0,
    rawIngredients: [
      { name: 'Горішки кеш\'ю, мигдаль, арахіс (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'горіхи' },
      { name: 'Цукерки смоктальні карамель/льодяники (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — висококалорійний горіховий перекус з льодяниками.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на ходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Похідна розкладка ТК «Глобус» (перекус дня 3)'
  },
  {
    id: 'recipe-globus-snack-toffee-candies',
    title: 'Перекус ходовий: ірис вершковий та льодяники (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 240,
    proteinPerServing: 1.5,
    fatPerServing: 3,
    carbsPerServing: 52,
    fiberPerServing: 0.0,
    rawIngredients: [
      { name: 'Ірис вершковий Золотий ключик (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'солодощі' },
      { name: 'Цукерки смоктальні карамель/льодяники (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — класичні швидкі вуглеводи на крутому підйомі.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на ходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Похідна розкладка ТК «Глобус» (перекус дня 4)'
  },
  {
    id: 'recipe-globus-snack-kozinak-candies',
    title: 'Перекус ходовий: козинаки соняшникові та льодяники (ТК «Глобус»)',
    category: 'snack',
    mealTypes: ['snack'],
    servingsYield: 4,
    dryWeightPerServingGrams: 60,
    kcalPerServing: 265,
    proteinPerServing: 4.5,
    fatPerServing: 10,
    carbsPerServing: 41,
    fiberPerServing: 1.8,
    rawIngredients: [
      { name: 'Козинаки соняшникові (35 г/ос, магазин)', amount: 140, unit: 'г', category: 'солодощі' },
      { name: 'Цукерки смоктальні карамель/льодяники (25 г/ос, магазин)', amount: 100, unit: 'г', category: 'солодощі' }
    ],
    homePrepSteps: [
      'Сушарка не потрібна — натуральний соняшниковий енергетик з льодяниками.'
    ],
    dehydrationParams: {
      tempCelsius: 50,
      timeHours: 'Не потребує сушіння (готові магазинні продукти)',
      trayLining: 'Не потрібно',
      drynessTest: 'Готовий перекус'
    },
    campRehydration: {
      waterRatioNote: 'Готово до вживання на ходу',
      soakMinutes: 0,
      boilMinutes: 0
    },
    packagingTareRatio: 0.03,
    sourceBook: 'Похідна розкладка ТК «Глобус» (перекус дня 5)'
  }
];

export function getRecipeById(id: string): DehydratedRecipe | undefined {
  return DEHYDRATED_RECIPES.find(r => r.id === id);
}
