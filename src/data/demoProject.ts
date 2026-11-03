import { HikeProject, HikeDay, RouteStage, Participant } from '../types/domain';

export function createDemoProject(): HikeProject {
  const stages: RouteStage[] = [
    {
      id: 'stage-1',
      name: 'Етап 1: Підхід та акліматизаційне кільце (Дні 1-4)',
      startDay: 1,
      endDay: 4,
      storageMethodNote: 'Старт із долини, ночівля біля гірського притулку',
    },
    {
      id: 'stage-2',
      name: 'Етап 2 (Заброска №1): Високогірний траверс та спуск (Дні 5-8)',
      startDay: 5,
      endDay: 8,
      storageMethodNote: 'Схованка у притулку на висоті 2400 м у герметичних мішках',
    },
  ];

  const participants: Participant[] = [
    {
      id: 'part-1',
      name: 'Олександр (Керівник)',
      gender: 'M',
      carryingCapacityCoeff: 1.0,
      role: 'Керівник',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 3200, // Намет, навігатор, рація
    },
    {
      id: 'part-2',
      name: 'Ілля (Завгосп)',
      gender: 'M',
      carryingCapacityCoeff: 1.1,
      role: 'Завгосп',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 2800, // Казани, ополоник, ваги
    },
    {
      id: 'part-3',
      name: 'Тарас (Реммайстер)',
      gender: 'M',
      carryingCapacityCoeff: 1.2,
      role: 'Реммайстер',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 3500, // Пальники, ремнабір, пилка
    },
    {
      id: 'part-4',
      name: 'Оксана (Медик)',
      gender: 'F',
      carryingCapacityCoeff: 0.75,
      role: 'Медик',
      dietaryRestrictions: 'Без лактози (сухе молоко окремо)',
      assignedSharedGearWeightGrams: 1600, // Групова аптечка
    },
    {
      id: 'part-5',
      name: 'Юлія (Фотограф)',
      gender: 'F',
      carryingCapacityCoeff: 0.75,
      role: 'Фотограф',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 1400, // Тент, гігієна
    },
    {
      id: 'part-6',
      name: 'Микола (Штурман)',
      gender: 'M',
      carryingCapacityCoeff: 1.15,
      role: 'Штурман',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 3400, // Мотузка, карабіни
    },
  ];

  const days: HikeDay[] = [
    // День 1: Втягування
    {
      dayNumber: 1,
      stageId: 'stage-1',
      dayLoadProfile: 'acclimatization',
      altitudeMeters: 1400,
      notes: 'Заїзд, вихід на маршрут уздовж річки, плавний набір висоти',
      meals: {
        breakfast: {
          title: 'Вівсянка з яблуками та корицею + чай',
          items: [
            { id: 'd1-b1', sourceType: 'recipe', sourceId: 'recipe-quick-oatmeal-plus', gramsPerPerson: 80 },
            { id: 'd1-b2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd1-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
          ],
        },
        snack: {
          title: 'Карманне харчування на переходах',
          items: [
            { id: 'd1-s1', sourceType: 'product', sourceId: 'fruit-pastila-apple', gramsPerPerson: 35 },
            { id: 'd1-s2', sourceType: 'product', sourceId: 'sweet-caramel', gramsPerPerson: 25 },
          ],
        },
        lunch: {
          title: 'Обід: Хумус швидкий із сухарями та сиром',
          items: [
            { id: 'd1-l1', sourceType: 'recipe', sourceId: 'recipe-quick-hummus', gramsPerPerson: 60 },
            { id: 'd1-l2', sourceType: 'product', sourceId: 'bread-crackers-rye', gramsPerPerson: 40 },
            { id: 'd1-l3', sourceType: 'product', sourceId: 'dairy-cheese-hard', gramsPerPerson: 35 },
            { id: 'd1-l4', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
          ],
        },
        dinner: {
          title: 'Вечеря: Суп овочевий із куркою та сухарями',
          items: [
            { id: 'd1-d1', sourceType: 'product', sourceId: 'grain-pasta-horns', gramsPerPerson: 60 },
            { id: 'd1-d2', sourceType: 'product', sourceId: 'meat-chicken-dried', gramsPerPerson: 30 },
            { id: 'd1-d3', sourceType: 'product', sourceId: 'veg-carrots-dried', gramsPerPerson: 10 },
            { id: 'd1-d4', sourceType: 'product', sourceId: 'veg-onions-dried', gramsPerPerson: 8 },
            { id: 'd1-d5', sourceType: 'product', sourceId: 'spice-salt', gramsPerPerson: 8 },
            { id: 'd1-d6', sourceType: 'product', sourceId: 'sweet-chocolate-dark', gramsPerPerson: 30 },
          ],
        },
      },
    },

    // День 2: Акліматизація
    {
      dayNumber: 2,
      stageId: 'stage-1',
      dayLoadProfile: 'acclimatization',
      altitudeMeters: 2100,
      notes: 'Підйом у зону альпійських лук, підхід під перевал',
      meals: {
        breakfast: {
          title: 'Картопляний омлет по-мисливськи з сиром',
          items: [
            { id: 'd2-b1', sourceType: 'recipe', sourceId: 'recipe-packer-potatoes-cheese', gramsPerPerson: 90 },
            { id: 'd2-b2', sourceType: 'product', sourceId: 'drink-coffee-instant', gramsPerPerson: 4 },
            { id: 'd2-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
          ],
        },
        snack: {
          title: 'Курага та волоські горіхи на привалах',
          items: [
            { id: 'd2-s1', sourceType: 'product', sourceId: 'fruit-dried-apricot', gramsPerPerson: 40 },
            { id: 'd2-s2', sourceType: 'product', sourceId: 'nut-walnut', gramsPerPerson: 25 },
          ],
        },
        lunch: {
          title: 'Сало з сухарями, часником та халвою',
          items: [
            { id: 'd2-l1', sourceType: 'product', sourceId: 'fat-salo', gramsPerPerson: 40 },
            { id: 'd2-l2', sourceType: 'product', sourceId: 'bread-crackers-rye', gramsPerPerson: 40 },
            { id: 'd2-l3', sourceType: 'product', sourceId: 'veg-garlic-fresh', gramsPerPerson: 5 },
            { id: 'd2-l4', sourceType: 'product', sourceId: 'sweet-halva', gramsPerPerson: 45 },
            { id: 'd2-l5', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
          ],
        },
        dinner: {
          title: 'Борщ український сушений із яловичиною',
          items: [
            { id: 'd2-d1', sourceType: 'recipe', sourceId: 'recipe-borscht-home-style', gramsPerPerson: 75 },
            { id: 'd2-d2', sourceType: 'product', sourceId: 'bread-crackers-rye', gramsPerPerson: 30 },
            { id: 'd2-d3', sourceType: 'product', sourceId: 'fat-salo', gramsPerPerson: 20 },
            { id: 'd2-d4', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd2-d5', sourceType: 'product', sourceId: 'bread-cookies-sugar', gramsPerPerson: 40 },
          ],
        },
      },
    },

    // День 3: Стандартний день
    {
      dayNumber: 3,
      stageId: 'stage-1',
      dayLoadProfile: 'standard',
      altitudeMeters: 2500,
      notes: 'Проходження перевалу 1А, спуск у цирк',
      meals: {
        breakfast: {
          title: 'Гранола альпійська з ягодами',
          items: [
            { id: 'd3-b1', sourceType: 'recipe', sourceId: 'recipe-granola-alpine', gramsPerPerson: 90 },
            { id: 'd3-b2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd3-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
          ],
        },
        snack: {
          title: 'Батончики «Пума» та джерки яловичі',
          items: [
            { id: 'd3-s1', sourceType: 'recipe', sourceId: 'recipe-puma-bars', gramsPerPerson: 50 },
            { id: 'd3-s2', sourceType: 'recipe', sourceId: 'recipe-trail-jerky-beef', gramsPerPerson: 35 },
          ],
        },
        lunch: {
          title: 'Паштет із білої квасолі, ковбаса салямі та галети',
          items: [
            { id: 'd3-l1', sourceType: 'recipe', sourceId: 'recipe-white-bean-pate', gramsPerPerson: 60 },
            { id: 'd3-l2', sourceType: 'product', sourceId: 'meat-sausage-salami', gramsPerPerson: 40 },
            { id: 'd3-l3', sourceType: 'product', sourceId: 'bread-galette-army', gramsPerPerson: 40 },
            { id: 'd3-l4', sourceType: 'product', sourceId: 'sweet-sherbet', gramsPerPerson: 45 },
          ],
        },
        dinner: {
          title: 'Чілі Кон Карне по-каньйонськи',
          items: [
            { id: 'd3-d1', sourceType: 'recipe', sourceId: 'recipe-canyon-chili', gramsPerPerson: 90 },
            { id: 'd3-d2', sourceType: 'product', sourceId: 'bread-crackers-wheat', gramsPerPerson: 30 },
            { id: 'd3-d3', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd3-d4', sourceType: 'product', sourceId: 'sweet-chocolate-dark', gramsPerPerson: 35 },
          ],
        },
      },
    },

    // День 4: Стандартний день (вихід до заброски)
    {
      dayNumber: 4,
      stageId: 'stage-1',
      dayLoadProfile: 'standard',
      altitudeMeters: 2400,
      notes: 'Спуск до гірського притулку, забір Заброски №1',
      meals: {
        breakfast: {
          title: 'Святковий сніданок з шинкою та яйцем',
          items: [
            { id: 'd4-b1', sourceType: 'recipe', sourceId: 'recipe-celebration-brunch', gramsPerPerson: 85 },
            { id: 'd4-b2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd4-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
          ],
        },
        snack: {
          title: 'Пряні горіхи та фініки',
          items: [
            { id: 'd4-s1', sourceType: 'recipe', sourceId: 'recipe-spiced-mixed-nuts', gramsPerPerson: 45 },
            { id: 'd4-s2', sourceType: 'product', sourceId: 'fruit-dried-dates', gramsPerPerson: 35 },
          ],
        },
        lunch: {
          title: 'Паштет із тунця, сир та бублики',
          items: [
            { id: 'd4-l1', sourceType: 'recipe', sourceId: 'recipe-creamy-tuna-spread', gramsPerPerson: 55 },
            { id: 'd4-l2', sourceType: 'product', sourceId: 'dairy-cheese-hard', gramsPerPerson: 40 },
            { id: 'd4-l3', sourceType: 'product', sourceId: 'bread-sushki', gramsPerPerson: 40 },
            { id: 'd4-l4', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
          ],
        },
        dinner: {
          title: 'Спагеті Сьєрра з м\'ясним соусом',
          items: [
            { id: 'd4-d1', sourceType: 'recipe', sourceId: 'recipe-sierra-spaghetti', gramsPerPerson: 95 },
            { id: 'd4-d2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd4-d3', sourceType: 'product', sourceId: 'sweet-halva', gramsPerPerson: 40 },
          ],
        },
      },
    },

    // День 5: Штурмовий день (Ключовий перевал)
    {
      dayNumber: 5,
      stageId: 'stage-2',
      dayLoadProfile: 'assault',
      altitudeMeters: 3100,
      notes: 'Штурм перевалу 1Б, льодовик, ранній вихід о 5:00',
      meals: {
        breakfast: {
          title: 'Манна каша з родзинками та згущеним молоком',
          items: [
            { id: 'd5-b1', sourceType: 'product', sourceId: 'grain-semolina', gramsPerPerson: 60 },
            { id: 'd5-b2', sourceType: 'product', sourceId: 'fruit-dried-raisins', gramsPerPerson: 30 },
            { id: 'd5-b3', sourceType: 'product', sourceId: 'dairy-condensed-milk', gramsPerPerson: 45 },
            { id: 'd5-b4', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
          ],
        },
        snack: {
          title: 'Швидкі вуглеводи на штурмі (ізотонік, шоколад, карамель)',
          items: [
            { id: 'd5-s1', sourceType: 'product', sourceId: 'sup-isotonic-powder', gramsPerPerson: 30 },
            { id: 'd5-s2', sourceType: 'product', sourceId: 'sweet-chocolate-milk', gramsPerPerson: 45 },
            { id: 'd5-s3', sourceType: 'product', sourceId: 'sweet-caramel', gramsPerPerson: 30 },
            { id: 'd5-s4', sourceType: 'product', sourceId: 'fruit-dried-dates', gramsPerPerson: 35 },
          ],
        },
        lunch: {
          title: 'Швидкий перекус на сідловині: кускус без варіння + салямі',
          items: [
            { id: 'd5-l1', sourceType: 'recipe', sourceId: 'recipe-feta-couscous-mediterranean', gramsPerPerson: 85 },
            { id: 'd5-l2', sourceType: 'product', sourceId: 'meat-sausage-salami', gramsPerPerson: 40 },
            { id: 'd5-l3', sourceType: 'product', sourceId: 'bread-galette-army', gramsPerPerson: 30 },
          ],
        },
        dinner: {
          title: 'Плов східний сушений із куркою та барбарисом',
          items: [
            { id: 'd5-d1', sourceType: 'recipe', sourceId: 'recipe-chicken-pilaf-oriental', gramsPerPerson: 90 },
            { id: 'd5-d2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd5-d3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 25 },
            { id: 'd5-d4', sourceType: 'product', sourceId: 'bread-waffles', gramsPerPerson: 45 },
          ],
        },
      },
    },

    // День 6: Післяштурмовий день (Компенсація)
    {
      dayNumber: 6,
      stageId: 'stage-2',
      dayLoadProfile: 'post_assault',
      altitudeMeters: 2600,
      notes: 'Спуск у долину, відновлення сил після перевалу',
      meals: {
        breakfast: {
          title: 'Вівсянка з висівками та топленим маслом',
          items: [
            { id: 'd6-b1', sourceType: 'recipe', sourceId: 'recipe-quick-oatmeal-plus', gramsPerPerson: 80 },
            { id: 'd6-b2', sourceType: 'product', sourceId: 'fat-ghee-butter', gramsPerPerson: 25 },
            { id: 'd6-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
            { id: 'd6-b4', sourceType: 'product', sourceId: 'drink-coffee-instant', gramsPerPerson: 4 },
          ],
        },
        snack: {
          title: 'Сирокопчена корейка, сало та сухарі',
          items: [
            { id: 'd6-s1', sourceType: 'product', sourceId: 'meat-koreika', gramsPerPerson: 45 },
            { id: 'd6-s2', sourceType: 'product', sourceId: 'bread-crackers-rye', gramsPerPerson: 40 },
          ],
        },
        lunch: {
          title: 'Кукурудзяний чаудер з куркою та беконом',
          items: [
            { id: 'd6-l1', sourceType: 'recipe', sourceId: 'recipe-corn-chowder', gramsPerPerson: 80 },
            { id: 'd6-l2', sourceType: 'product', sourceId: 'dairy-cheese-hard', gramsPerPerson: 40 },
            { id: 'd6-l3', sourceType: 'product', sourceId: 'sweet-halva', gramsPerPerson: 45 },
          ],
        },
        dinner: {
          title: 'Лазанья лінива з сиром та яловичиною',
          items: [
            { id: 'd6-d1', sourceType: 'recipe', sourceId: 'recipe-lazy-lasagna', gramsPerPerson: 95 },
            { id: 'd6-d2', sourceType: 'product', sourceId: 'fat-salo', gramsPerPerson: 25 },
            { id: 'd6-d3', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd6-d4', sourceType: 'product', sourceId: 'sweet-chocolate-dark', gramsPerPerson: 35 },
          ],
        },
      },
    },

    // День 7: Дньовка / Відпочинок
    {
      dayNumber: 7,
      stageId: 'stage-2',
      dayLoadProfile: 'rest_day',
      altitudeMeters: 2200,
      notes: 'Дньовка біля озера, лазня, радіальний вихід без рюкзаків',
      meals: {
        breakfast: {
          title: 'Гранола з сухим молоком та медом',
          items: [
            { id: 'd7-b1', sourceType: 'recipe', sourceId: 'recipe-granola-alpine', gramsPerPerson: 90 },
            { id: 'd7-b2', sourceType: 'product', sourceId: 'drink-cocoa-powder', gramsPerPerson: 15 },
            { id: 'd7-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
          ],
        },
        snack: {
          title: 'Пастила та солоний арахіс',
          items: [
            { id: 'd7-s1', sourceType: 'recipe', sourceId: 'recipe-fruit-leather-strawberry', gramsPerPerson: 35 },
            { id: 'd7-s2', sourceType: 'product', sourceId: 'nut-peanut', gramsPerPerson: 35 },
          ],
        },
        lunch: {
          title: 'Рагу з батату та червоної сочевиці',
          items: [
            { id: 'd7-l1', sourceType: 'recipe', sourceId: 'recipe-sweet-potato-lentil-stew', gramsPerPerson: 85 },
            { id: 'd7-l2', sourceType: 'product', sourceId: 'bread-cookies-sugar', gramsPerPerson: 40 },
          ],
        },
        dinner: {
          title: 'Тайська локшина з кунжутом та куркою',
          items: [
            { id: 'd7-d1', sourceType: 'recipe', sourceId: 'recipe-sesame-noodles-thai', gramsPerPerson: 85 },
            { id: 'd7-d2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd7-d3', sourceType: 'product', sourceId: 'sweet-sherbet', gramsPerPerson: 45 },
          ],
        },
      },
    },

    // День 8: Завершення маршруту
    {
      dayNumber: 8,
      stageId: 'stage-2',
      dayLoadProfile: 'standard',
      altitudeMeters: 1100,
      notes: 'Спуск у селище, від\'їзд групи додому',
      meals: {
        breakfast: {
          title: 'Картопляний омлет по-мисливськи',
          items: [
            { id: 'd8-b1', sourceType: 'recipe', sourceId: 'recipe-packer-potatoes-cheese', gramsPerPerson: 90 },
            { id: 'd8-b2', sourceType: 'product', sourceId: 'drink-tea-black', gramsPerPerson: 5 },
            { id: 'd8-b3', sourceType: 'product', sourceId: 'sweet-sugar', gramsPerPerson: 20 },
          ],
        },
        snack: {
          title: 'Останній перекус на стежці',
          items: [
            { id: 'd8-s1', sourceType: 'product', sourceId: 'sweet-energy-bar', gramsPerPerson: 50 },
          ],
        },
        lunch: {
          title: 'Обід перед автобусом: салямі з галетами та сиром',
          items: [
            { id: 'd8-l1', sourceType: 'product', sourceId: 'meat-sausage-salami', gramsPerPerson: 50 },
            { id: 'd8-l2', sourceType: 'product', sourceId: 'dairy-cheese-hard', gramsPerPerson: 40 },
            { id: 'd8-l3', sourceType: 'product', sourceId: 'bread-galette-army', gramsPerPerson: 40 },
          ],
        },
        dinner: {
          title: 'Вечеря у селищі (в кафе / поїзді)',
          items: [],
        },
      },
    },
  ];

  return {
    id: 'demo-carpathian-highlands',
    settings: {
      name: 'Гірський похід 2 к.с. «Чорногора та Мармароси» (8 днів)',
      hikeType: 'mountain',
      difficultyCategory: 2,
      climateProfile: 'high_mountain_hot_1_07_4',
      maxAltitudeMeters: 3100,
      targetDailyWeightNetGrams: 620,
      targetDailyKcal: 2900,
      fuelType: 'gas',
      meltsSnowForWater: false,
    },
    stages,
    participants,
    days,
    createdAt: '2026-11-03T10:00:00.000Z',
    updatedAt: '2026-11-03T12:00:00.000Z',
  };
}
