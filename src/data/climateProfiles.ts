import { ClimateProfileId, DayLoadProfileId } from '../types/domain';

export interface ClimateProfileDefinition {
  id: ClimateProfileId;
  name: string;
  bjuRatio: [number, number, number];
  description: string;
  sourceRef: string;
}

export const CLIMATE_PROFILES: Record<ClimateProfileId, ClimateProfileDefinition> = {
  temperate_1_1_4: {
    id: 'temperate_1_1_4',
    name: 'Помірний літній / Середня смуга (1 : 1 : 4)',
    bjuRatio: [1, 1, 4],
    description: 'Оптимальний баланс для піших та водних походів у теплий сезон на рівнинах та невисоких горах (1-3 к.с.). Забезпечує стабільну енергію без надмірного навантаження на печінку.',
    sourceRef: 'О. Алексєєв «Питание в туристском походе», В. Хачикян',
  },
  high_mountain_hot_1_07_4: {
    id: 'high_mountain_hot_1_07_4',
    name: 'Гірський (Кавказ / Карпати) та спекотний клімат (1 : 0.7 : 4)',
    bjuRatio: [1, 0.7, 4],
    description: 'Знижена частка важких жирів через погіршення їх окислення та фільтрації печінкою в умовах гіпоксії та спеки. Збільшена частка вуглеводів.',
    sourceRef: 'О. Алексєєв, В. Хачикян «Составление раскладки для горных спортивных походов»',
  },
  high_pamir_1_07_5: {
    id: 'high_pamir_1_07_5',
    name: 'Високогірний Памір / Тянь-Шань >4000м (1 : 0.7 : 5)',
    bjuRatio: [1, 0.7, 5],
    description: 'Максимальний акцент на легкозасвоювані вуглеводи в умовах сильного кисневого голодування. На окислення жирів не вистачає кисню.',
    sourceRef: 'О. Алексєєв «Питание в туристском походе»',
  },
  cold_winter_1_2_3: {
    id: 'cold_winter_1_2_3',
    name: 'Зимовий / Холодний сезон (1 : 2 : 3)',
    bjuRatio: [1, 2, 3],
    description: 'Підвищена частка жирів (сало, корейка, вершкове та топлене масло) для підтримки терморегуляції тіла на холоді та в лижних походах.',
    sourceRef: 'О. Алексєєв, H. Kephart «Camp Cookery»',
  },
  extreme_winter_1_3_4: {
    id: 'extreme_winter_1_3_4',
    name: 'Екстремальний зимовий / Заполяр\'я (1 : 3 : 4)',
    bjuRatio: [1, 3, 4],
    description: 'Максимальна енергетична щільність їжі для умов сильних морозів, хуртовин та вічної мерзлоти. Калорійність до 450 ккал на 100 г.',
    sourceRef: 'О. Алексєєв «Питание в туристском походе»',
  },
};

export interface DayLoadProfileDefinition {
  id: DayLoadProfileId;
  name: string;
  kcalMultiplier: number;
  recommendation: string;
}

export const DAY_LOAD_PROFILES: Record<DayLoadProfileId, DayLoadProfileDefinition> = {
  acclimatization: {
    id: 'acclimatization',
    name: 'Акліматизація / Втягування (Дні 1-3)',
    kcalMultiplier: 0.8, // 2400-2600 ккал
    recommendation: 'Знижений об\'єм їжі, легкі каші, мінімум жирів. Запобігає самоотруєнню організму, коли кров відтікає від ШКТ до м\'язів під час первинної адаптації.',
  },
  standard: {
    id: 'standard',
    name: 'Стандартний ходовий день',
    kcalMultiplier: 1.0, // Базова норма (2800-3200 ккал)
    recommendation: 'Повноцінний 3-разовий раціон + карманне харчування на денних переходах.',
  },
  assault: {
    id: 'assault',
    name: 'Штурмовий день / Перевал',
    kcalMultiplier: 1.0,
    recommendation: 'Не збільшувати загальну вагу і важку їжу: втомлений шлунок не зможе її перетравити! Максимум швидких вуглеводів, цукру, шоколаду, сухофруктів та ізотоніків.',
  },
  post_assault: {
    id: 'post_assault',
    name: 'Післяштурмовий день (Компенсація)',
    kcalMultiplier: 1.15, // до 3800-4000 ккал
    recommendation: 'Посилена калорійність, додавання ситних жирових та білкових страв (топлене масло, сало, сир) для відновлення витрачених на перевалі резервів.',
  },
  rest_day: {
    id: 'rest_day',
    name: 'Дньовка / Відпочинок',
    kcalMultiplier: 0.95,
    recommendation: 'Зменшення загальної витрати енергії, але святкове та різноманітне меню (млинці, супи, сухофрукти, какао).',
  },
};

/**
 * Розрахунок температури кипіння води в залежності від висоти над рівнем моря.
 * У горах температура кипіння падає приблизно на 1°C на кожні 300 метрів підйому.
 * На висоті 3000 м вода кипить при ~90°C, на 4500 м — при ~85°C.
 */
export function getBoilingPointCelsius(altitudeMeters: number): number {
  const safeAlt = Math.max(0, altitudeMeters);
  return Math.round((100 - safeAlt / 300) * 10) / 10;
}
