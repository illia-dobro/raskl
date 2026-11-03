# Веб-додаток «Похідний Завгосп» — План Розробки (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Побудувати автономний веб-додаток (SPA/PWA) для туристичного завгоспа, що об'єднує стислий теоретичний довідник з 4 книг та інтерактивний калькулятор похідної розкладки з каталогом сушених страв, перерахунком сирої ваги для закупки, обліком забросок, розподілом ваги по рюкзаках учасників та експортом у `.xlsx` і друкований PDF.

**Architecture:** Модульний клієнтський SPA на React 18 + TypeScript + Vite із чітким розділенням на 4 шари: (1) статичні бази даних теорії, продуктів і рецептів сушених страв (`src/data`), (2) чисті функції доменних розрахунків і валідації (`src/domain`), (3) персистентний стор проєкту на Zustand + LocalStorage/IndexedDB (`src/store`), та (4) 6-вкладковий UI на Tailwind CSS із генераторами `.xlsx` (SheetJS) та друкованого звіту (`src/components`, `src/export`).

**Tech Stack:** React 18, TypeScript 5 (strict), Vite 5, Tailwind CSS 3, Zustand 5, Lucide React, SheetJS (`xlsx`), Vitest + React Testing Library.

**Spec:** [`docs/superpowers/specs/2026-11-03-hiking-ration-planner-design.md`](file:///f:/raskl/docs/superpowers/specs/2026-11-03-hiking-ration-planner-design.md)

## Global Constraints

- Мова всього інтерфейсу, теоретичного довідника, бази продуктів, рецептів сушених страв та експортованих файлів — виключно українська.
- Повна автономність у браузері (offline-first SPA без бекенду); автозбереження поточного проєкту в `localStorage` та імпорт/експорт проєкту у файл `.json`.
- Чотири файли першоджерел у корені `f:\raskl` (`NU22 Pitanie. Hachikyan V.pdf`, `avidreaders.ru__pitanie-v-turistskom-pohode.epub`, `Backpack_Gourmet.pdf`, `campcookery01keph.pdf`) залишаються недоторканими.
- Усі формули розрахунку (БЖВ, ккал, клітковина, вага нетто/брутто, сира вага через `rawToDryRatio`, норми води й палива, квоти ваги учасників з урахуванням спорядження) покриваються модульними тестами Vitest.

## Review Focus

1. **Масштабування порції сушеного рецепта (`gramsPerPerson !== dryWeightPerServingGrams`):** Коли завгосп змінює грамовку сушеної страви в меню (наприклад, ставить 120 г замість базових 90 г), калорійність, БЖВ, клітковина та всі сирі інгредієнти в списку покупок мають масштабуватися точно за коефіцієнтом `gramsPerPerson / dryWeightPerServingGrams`.
2. **Ділення на нуль при порожньому списку учасників або нульовій сумі коефіцієнтів вантажопідйомності:** Калькулятори розподілу ваги та групової маси не повинні повертати `NaN` чи `Infinity`, коли `participants.length === 0` або `sum(carryingCapacityCoeff) === 0`.
3. **Учасник із великою вагою громадського спорядження (`assignedSharedGearWeightGrams > T_i`):** Коли учасник вже несе намет і мотузку вагою більше своєї загальної квоти $T_i$, його квота їжі $F_i$ має ставати `0` (а не від'ємною!), а залишок їжі має пропорційно перерозподілятися між іншими учасниками так, щоб $\sum F_i = W_{\text{food}}$.
4. **Перерахунок сухої ваги у сиру для комбінації окремих сушених продуктів та сушених рецептів:** Якщо в одному поході використовується і окремий продукт «М'ясо яловиче сушене (фарш)» (`rawToDryRatio: 3.3`), і рецепт, що містить сиру яловичину, список покупок та чек-лист сушіння повинні коректно показувати обидві потреби без втрати коефіцієнта усушки.
5. **Імпорт некоректного або пошкодженого `.json` файлу проєкту:** Функція імпорту проєкту повинна валідувати наявність обов'язкових полів (`id`, `settings`, `participants`, `stages`, `days`) і повертати зрозумілу помилку українською мовою без падіння React-додатку.

---

## Структура Файлів Проєкту

```text
f:\raskl\
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── domain.ts                      # Усі інтерфейси доменної моделі
│   ├── data/
│   │   ├── climateProfiles.ts             # Профілі БЖВ, коефіцієнти днів, норми висоти
│   │   ├── productsCatalog.ts             # 80+ продуктів (БЖВ, ккал, клітковина, засвоєння, тара, усушка)
│   │   ├── dehydratedRecipes.ts           # 30+ рецептів сушених страв (Backpack Gourmet + Хачикян)
│   │   ├── theoryChapters.ts              # 8 розділів стислої теорії з 4 книг з таблицями і формулами
│   │   └── demoProject.ts                 # Демонстраційний 8-денний гірський похід з 1 заброскою
│   ├── domain/
│   │   ├── nutritionCalculator.ts         # Розрахунок ккал, БЖВ, клітковини, ваги нетто/брутто
│   │   ├── rationValidator.ts             # Валідація норм, повторів страв, алергій учасників
│   │   ├── shoppingAndDryingCalculator.ts # Агрегація закупки (суха -> сира вага) та чек-лист сушарки
│   │   ├── loadDistributor.ts             # Квоти учасників по етапах/забросках та авторозподіл пакетів
│   │   ├── waterAndFuelCalculator.ts      # Розрахунок води, газу (балони 230/450г) та бензину, точка кипіння
│   │   └── projectSerializer.ts           # Валідація та імпорт/експорт проєкту в JSON
│   ├── store/
│   │   └── useProjectStore.ts             # Zustand-стор з persist у localStorage та діями редагування
│   ├── export/
│   │   ├── excelExporter.ts               # Генерація 5-аркушевої книги .xlsx (SheetJS)
│   │   └── packingLabelsGenerator.ts      # Генерація карток пакування та опису забросок для друку
│   ├── components/
│   │   ├── TopSummaryBar.tsx              # Верхня панель ключових метрик походу та перемикач вкладок
│   │   ├── TheoryHandbookTab.tsx          # Вкладка 1: Інтерактивний довідник теорії + калькулятор висоти/палива
│   │   ├── RouteAndTeamTab.tsx            # Вкладка 2: Налаштування маршруту, забросок та учасників
│   │   ├── MenuMatrixTab.tsx              # Вкладка 3: Матриця розкладки (Дні × Прийоми їжі) + попередження
│   │   ├── CatalogAndRecipesTab.tsx       # Вкладка 4: Каталог продуктів і рецептів сушених страв + конструктор
│   │   ├── ShoppingAndDryingTab.tsx       # Вкладка 5: Список покупок (сира/суха вага) та план для сушарки
│   │   └── LoadAndExportTab.tsx           # Вкладка 6: Розподіл по рюкзаках, заброски, етикетки, експорт .xlsx/PDF
│   └── __tests__/
│       ├── nutritionAndValidator.test.ts
│       ├── shoppingAndDrying.test.ts
│       ├── loadAndFuel.test.ts
│       └── storeAndExport.test.ts
```

---

### Task 1: Ініціалізація проєкту (Vite + React + TypeScript + Tailwind + Vitest) та Доменні Типи

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/types/domain.ts`
- Create: `src/data/climateProfiles.ts`
- Test: `src/__tests__/climateProfiles.test.ts`

**Interfaces:**
- Produces:
  - `src/types/domain.ts`:
    - `ProductCategory`, `WaterContentClass`, `DryingInfo`, `Product`
    - `MealType` (`'breakfast' | 'snack' | 'lunch' | 'dinner'`)
    - `RawIngredient`, `DehydratedRecipe`
    - `HikeType`, `ClimateProfileId`, `DayLoadProfileId`, `FuelType`
    - `Participant`, `RouteStage`, `MealItem`, `MealPlan`, `HikeDay`, `HikeSettings`, `HikeProject`
    - `DailyNutritionSummary`, `ValidationWarning`, `ShoppingListItem`, `DryingTaskItem`, `ParticipantStageQuota`, `AssignedPackage`
  - `src/data/climateProfiles.ts`:
    - `CLIMATE_PROFILES: Record<ClimateProfileId, { id: ClimateProfileId; name: string; bjuRatio: [number, number, number]; description: string; sourceRef: string }>`
    - `DAY_LOAD_PROFILES: Record<DayLoadProfileId, { id: DayLoadProfileId; name: string; kcalMultiplier: number; recommendation: string }>`
    - `getBoilingPointCelsius(altitudeMeters: number): number`

- [ ] **Step 1: Ініціалізувати конфігураційні файли (`package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/index.css`) та встановити залежності**

У `package.json` підключити `react`, `react-dom`, `zustand`, `lucide-react`, `xlsx` та devDependencies `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.

- [ ] **Step 2: Написати тест для кліматичних профілів, коефіцієнтів днів та фізики кипіння води на висоті (`src/__tests__/climateProfiles.test.ts`)**

```typescript
import { describe, it, expect } from 'vitest';
import { CLIMATE_PROFILES, DAY_LOAD_PROFILES, getBoilingPointCelsius } from '../data/climateProfiles';

describe('climateProfiles & boiling point physics', () => {
  it('defines all 5 climate BJU profiles from Alekseev & Hachikyan', () => {
    expect(CLIMATE_PROFILES.temperate_1_1_4.bjuRatio).toEqual([1, 1, 4]);
    expect(CLIMATE_PROFILES.high_mountain_hot_1_07_4.bjuRatio).toEqual([1, 0.7, 4]);
    expect(CLIMATE_PROFILES.high_pamir_1_07_5.bjuRatio).toEqual([1, 0.7, 5]);
    expect(CLIMATE_PROFILES.cold_winter_1_2_3.bjuRatio).toEqual([1, 2, 3]);
    expect(CLIMATE_PROFILES.extreme_winter_1_3_4.bjuRatio).toEqual([1, 3, 4]);
  });

  it('defines floating ration multipliers per day load profile', () => {
    expect(DAY_LOAD_PROFILES.acclimatization.kcalMultiplier).toBe(0.8);
    expect(DAY_LOAD_PROFILES.post_assault.kcalMultiplier).toBe(1.15);
  });

  it('calculates water boiling point drop with altitude (~1C per 300m)', () => {
    expect(getBoilingPointCelsius(0)).toBe(100);
    expect(getBoilingPointCelsius(3000)).toBeCloseTo(90, 0);
    expect(getBoilingPointCelsius(4500)).toBeCloseTo(85, 0);
  });
});
```

- [ ] **Step 3: Запустити Vitest, переконатися, що тест падає до створення файлів**

Run: `npx vitest run src/__tests__/climateProfiles.test.ts`
Expected: FAIL (`Cannot find module '../data/climateProfiles'`)

- [ ] **Step 4: Реалізувати `src/types/domain.ts` та `src/data/climateProfiles.ts`**

Формула точки кипіння у `getBoilingPointCelsius(altitudeMeters: number): number`: `Math.round((100 - Math.max(0, altitudeMeters) / 300) * 10) / 10`.

- [ ] **Step 5: Запустити тест і переконатися, що він проходить**

Run: `npx vitest run src/__tests__/climateProfiles.test.ts`
Expected: PASS (3 passed)

- [ ] **Step 6: Ініціалізувати git-репозиторій (якщо відсутній), додати `.gitignore` та зробити коміт**

```bash
git init
git add .gitignore package.json package-lock.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js index.html src/index.css src/types/domain.ts src/data/climateProfiles.ts src/__tests__/climateProfiles.test.ts
git commit -m "feat: initialize Vite React TS project and core domain types"
```

---

### Task 2: Наповнення бази знань — Продукти, Рецепти сушених страв, Стисла Теорія та Демо-проєкт

**Files:**
- Create: `src/data/productsCatalog.ts`
- Create: `src/data/dehydratedRecipes.ts`
- Create: `src/data/theoryChapters.ts`
- Create: `src/data/demoProject.ts`
- Test: `src/__tests__/catalogAndTheory.test.ts`

**Interfaces:**
- Consumes: `Product`, `DehydratedRecipe`, `HikeProject` з `src/types/domain.ts`
- Produces:
  - `src/data/productsCatalog.ts`: `PRODUCTS_CATALOG: Product[]`, `getProductById(id: string): Product | undefined`
  - `src/data/dehydratedRecipes.ts`: `DEHYDRATED_RECIPES: DehydratedRecipe[]`, `getRecipeById(id: string): DehydratedRecipe | undefined`
  - `src/data/theoryChapters.ts`: `THEORY_CHAPTERS: TheoryChapter[]` (8 структурованих розділів з таблицями, формулами, порадами та посиланнями на 4 першоджерела)
  - `src/data/demoProject.ts`: `createDemoProject(): HikeProject`

- [ ] **Step 1: Написати тест повноти бази даних (`src/__tests__/catalogAndTheory.test.ts`)**

```typescript
import { describe, it, expect } from 'vitest';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import { THEORY_CHAPTERS } from '../data/theoryChapters';
import { createDemoProject } from '../data/demoProject';

describe('Knowledge Base & Catalogs from 4 Books', () => {
  it('contains at least 60 hiking products across all 11 categories with valid macros and digestibility', () => {
    expect(PRODUCTS_CATALOG.length).toBeGreaterThanOrEqual(60);
    const driedBeef = PRODUCTS_CATALOG.find(p => p.id === 'meat-beef-dried');
    expect(driedBeef).toBeDefined();
    expect(driedBeef?.dryingInfo?.rawToDryRatio).toBeCloseTo(3.3, 1);
    const oatBran = PRODUCTS_CATALOG.find(p => p.id === 'sup-oat-bran');
    expect(oatBran?.fiberPer100g).toBeGreaterThanOrEqual(40);
  });

  it('contains at least 25 dehydrated one-pot meals & trail recipes across breakfast, lunch, dinner, snack', () => {
    expect(DEHYDRATED_RECIPES.length).toBeGreaterThanOrEqual(25);
    const mealTypesCovered = new Set(DEHYDRATED_RECIPES.flatMap(r => r.mealTypes));
    expect(mealTypesCovered.has('breakfast')).toBe(true);
    expect(mealTypesCovered.has('lunch')).toBe(true);
    expect(mealTypesCovered.has('dinner')).toBe(true);
    expect(mealTypesCovered.has('snack')).toBe(true);
    for (const r of DEHYDRATED_RECIPES) {
      expect(r.dryWeightPerServingGrams).toBeGreaterThan(0);
      expect(r.rawIngredients.length).toBeGreaterThan(0);
      expect(r.dehydrationParams.tempCelsius).toBeGreaterThanOrEqual(50);
    }
  });

  it('contains all 8 theory chapters covering Alekseev, Hachikyan, Yaffe, and Kephart', () => {
    expect(THEORY_CHAPTERS.length).toBe(8);
  });

  it('creates a valid 8-day mountain demo project with 6 participants and 2 route stages (1 resupply drop)', () => {
    const demo = createDemoProject();
    expect(demo.participants.length).toBe(6);
    expect(demo.stages.length).toBe(2);
    expect(demo.days.length).toBe(8);
  });
});
```

- [ ] **Step 2: Запустити тест і переконатися, що він падає**

Run: `npx vitest run src/__tests__/catalogAndTheory.test.ts`
Expected: FAIL (`Cannot find module '../data/productsCatalog'`)

- [ ] **Step 3: Реалізувати `src/data/productsCatalog.ts`, `src/data/dehydratedRecipes.ts`, `src/data/theoryChapters.ts` та `src/data/demoProject.ts`**

Включити всі продукти з Додатку 1 О. Алексєєва та презентації В. Хачикяна (крупи, макарони, сухарі, галети, м'ясо сушене/сублімоване/тушонка/ковбаса/сало/корейка, сир, сухе молоко, яєчний порошок, топлене масло, горіхи, сухофрукти, солодощі, сушені овочі та гриби, висівки, льон, ізотоніки) та мінімум 25 детальних рецептів із *Backpack Gourmet* і практики гірських походів (сніданки, хумус/паштети, супи/борщ/чаудери, чілі, рагу, пасти, запіканки, пастила та енергетичні батончики).

- [ ] **Step 4: Запустити тест і переконатися, що він проходить**

Run: `npx vitest run src/__tests__/catalogAndTheory.test.ts`
Expected: PASS (4 passed)

- [ ] **Step 5: Зробити коміт**

```bash
git add src/data/ src/__tests__/catalogAndTheory.test.ts
git commit -m "feat: add product catalog, dehydrated recipes, 8 theory chapters, and demo project"
```

---

### Task 3: Доменне ядро розрахунків — Нутрієнти, Валідатор, Закупка/Сушіння, Вода/Паливо та Розподіл Ваги

**Files:**
- Create: `src/domain/nutritionCalculator.ts`
- Create: `src/domain/rationValidator.ts`
- Create: `src/domain/shoppingAndDryingCalculator.ts`
- Create: `src/domain/waterAndFuelCalculator.ts`
- Create: `src/domain/loadDistributor.ts`
- Create: `src/domain/projectSerializer.ts`
- Test: `src/__tests__/domainCalculators.test.ts`

**Interfaces:**
- Consumes: Типи з `src/types/domain.ts`, каталоги з `src/data/`
- Produces:
  - `src/domain/nutritionCalculator.ts`:
    - `calculateMealItemMetrics(item: MealItem, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): { netGrams: number; grossGrams: number; kcal: number; protein: number; fat: number; carbs: number; fiber: number; effectiveKcal: number; title: string }`
    - `calculateDaySummary(day: HikeDay, settings: HikeSettings, participantCount: number, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): DailyNutritionSummary`
    - `calculateProjectSummary(project: HikeProject, customProducts?: Product[], customRecipes?: DehydratedRecipe[])`
  - `src/domain/rationValidator.ts`:
    - `validateProjectRation(project: HikeProject, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): ValidationWarning[]`
  - `src/domain/shoppingAndDryingCalculator.ts`:
    - `calculateShoppingAndDryingPlan(project: HikeProject, stageFilterId?: string, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): { shoppingItems: ShoppingListItem[]; dryingTasks: DryingTaskItem[] }`
  - `src/domain/waterAndFuelCalculator.ts`:
    - `calculateWaterAndFuelNeeds(project: HikeProject): { boilingPointAtMaxAltCelsius: number; requiresAutoclaveSuggestion: boolean; dailyGasPerPersonGrams: number; totalGasGrams: number; canisters230gCount: number; canisters450gCount: number; totalLiquidFuelMilliliters: number; dailyDrinkingWaterLitersPerPerson: number }`
  - `src/domain/loadDistributor.ts`:
    - `calculateStageParticipantQuotas(project: HikeProject, stageId: string, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): ParticipantStageQuota[]`
    - `autoAssignStagePackages(project: HikeProject, stageId: string, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): HikeProject`
  - `src/domain/projectSerializer.ts`:
    - `serializeProjectToJson(project: HikeProject): string`
    - `parseAndValidateProjectJson(jsonStr: string): { ok: true; project: HikeProject } | { ok: false; error: string }`

- [ ] **Step 1: Написати комплексні тести для всіх 6 модулів ядра, включаючи 5 кейсів із `Review Focus` (`src/__tests__/domainCalculators.test.ts`)**

```typescript
import { describe, it, expect } from 'vitest';
import { createDemoProject } from '../data/demoProject';
import { calculateMealItemMetrics, calculateDaySummary } from '../domain/nutritionCalculator';
import { validateProjectRation } from '../domain/rationValidator';
import { calculateShoppingAndDryingPlan } from '../domain/shoppingAndDryingCalculator';
import { calculateWaterAndFuelNeeds } from '../domain/waterAndFuelCalculator';
import { calculateStageParticipantQuotas, autoAssignStagePackages } from '../domain/loadDistributor';
import { parseAndValidateProjectJson, serializeProjectToJson } from '../domain/projectSerializer';

describe('Domain Calculators & Review Focus Edge Cases', () => {
  it('Review Focus #1: scales dehydrated recipe macros and raw ingredients when gramsPerPerson != dryWeightPerServingGrams', () => {
    const demo = createDemoProject();
    const recipeItem = { id: 'item-1', sourceType: 'recipe' as const, sourceId: 'recipe-canyon-chili', gramsPerPerson: 180 };
    const baseItem = { id: 'item-2', sourceType: 'recipe' as const, sourceId: 'recipe-canyon-chili', gramsPerPerson: 90 };
    const m180 = calculateMealItemMetrics(recipeItem);
    const m90 = calculateMealItemMetrics(baseItem);
    expect(m180.kcal).toBeCloseTo(m90.kcal * 2, 1);
    expect(m180.protein).toBeCloseTo(m90.protein * 2, 1);
  });

  it('Review Focus #2: handles empty participants list or zero total capacity coeff without NaN/Infinity', () => {
    const demo = createDemoProject();
    demo.participants = [];
    const quotas = calculateStageParticipantQuotas(demo, demo.stages[0].id);
    expect(quotas).toEqual([]);
    const daySum = calculateDaySummary(demo.days[0], demo.settings, 0);
    expect(Number.isFinite(daySum.totalGroupGrossWeightKg)).toBe(true);
    expect(daySum.totalGroupGrossWeightKg).toBe(0);
  });

  it('Review Focus #3: clamps participant food quota to 0 when assignedSharedGearWeightGrams > total quota and redistributes food', () => {
    const demo = createDemoProject();
    // Make participant 0 carry huge shared gear (15 kg) so their food quota must clamp to 0
    demo.participants[0].assignedSharedGearWeightGrams = 15000;
    const quotas = calculateStageParticipantQuotas(demo, demo.stages[0].id);
    expect(quotas[0].targetFoodWeightGrams).toBe(0);
    const totalFoodTarget = quotas.reduce((acc, q) => acc + q.targetFoodWeightGrams, 0);
    const totalStageFood = quotas[0].stageTotalFoodGrossGrams;
    expect(totalFoodTarget).toBeCloseTo(totalStageFood, 0);
  });

  it('Review Focus #4: converts dry weights to raw weights for both standalone dried products and recipes', () => {
    const demo = createDemoProject();
    const { shoppingItems, dryingTasks } = calculateShoppingAndDryingPlan(demo);
    expect(shoppingItems.length).toBeGreaterThan(0);
    expect(dryingTasks.length).toBeGreaterThan(0);
    const driedMeatTask = dryingTasks.find(t => t.sourceId === 'meat-beef-dried' || t.sourceType === 'recipe');
    expect(driedMeatTask).toBeDefined();
    expect(driedMeatTask!.rawWeightTotalGrams).toBeGreaterThan(driedMeatTask!.dryWeightTotalGrams);
  });

  it('Review Focus #5: validates imported JSON and returns Ukrainian error message on malformed input', () => {
    const badRes = parseAndValidateProjectJson('{"invalid": true}');
    expect(badRes.ok).toBe(false);
    if (!badRes.ok) {
      expect(badRes.error).toMatch(/Некоректний формат проєкту/i);
    }
    const demo = createDemoProject();
    const goodRes = parseAndValidateProjectJson(serializeProjectToJson(demo));
    expect(goodRes.ok).toBe(true);
  });

  it('calculates fuel canisters, boiling point, and auto-assigns stage packages across participants', () => {
    const demo = createDemoProject();
    const fuel = calculateWaterAndFuelNeeds(demo);
    expect(fuel.canisters450gCount).toBeGreaterThan(0);
    const assigned = autoAssignStagePackages(demo, demo.stages[0].id);
    const stage1Days = assigned.days.filter(d => d.stageId === demo.stages[0].id);
    const allItems = stage1Days.flatMap(d => Object.values(d.meals).flatMap(m => m.items));
    expect(allItems.every(i => Boolean(i.assignedParticipantId))).toBe(true);
    const warnings = validateProjectRation(demo);
    expect(Array.isArray(warnings)).toBe(true);
  });
});
```

- [ ] **Step 2: Запустити тести і переконатися, що вони падають**

Run: `npx vitest run src/__tests__/domainCalculators.test.ts`
Expected: FAIL (`Cannot find module '../domain/nutritionCalculator'`)

- [ ] **Step 3: Реалізувати всі 6 файлів у `src/domain/`**

Реалізувати:
- `src/domain/nutritionCalculator.ts`
- `src/domain/rationValidator.ts`
- `src/domain/shoppingAndDryingCalculator.ts`
- `src/domain/waterAndFuelCalculator.ts`
- `src/domain/loadDistributor.ts`
- `src/domain/projectSerializer.ts`

- [ ] **Step 4: Запустити тести і переконатися, що всі проходять**

Run: `npx vitest run src/__tests__/domainCalculators.test.ts`
Expected: PASS (6 passed)

- [ ] **Step 5: Зробити коміт**

```bash
git add src/domain/ src/__tests__/domainCalculators.test.ts
git commit -m "feat: implement nutrition, shopping/drying, load distribution, and validation calculators"
```

---

### Task 4: Zustand Store з локальною персистентністю та Генератори Експорту (`.xlsx`, Етикетки Пакування)

**Files:**
- Create: `src/store/useProjectStore.ts`
- Create: `src/export/excelExporter.ts`
- Create: `src/export/packingLabelsGenerator.ts`
- Test: `src/__tests__/storeAndExport.test.ts`

**Interfaces:**
- Consumes: `src/types/domain.ts`, `src/data/*`, `src/domain/*`
- Produces:
  - `src/store/useProjectStore.ts`:
    - `useProjectStore`: стан `project: HikeProject`, `activeTab: AppTabId`, `customProducts: Product[]`, `customRecipes: DehydratedRecipe[]`, `checkedShoppingIds: Record<string, boolean>`, `checkedDryingIds: Record<string, boolean>` та екшени для редагування налаштувань, етапів, учасників, днів, елементів меню, авторозподілу ваги, створення власних продуктів/рецептів, скидання до демо-проєкту та імпорту JSON.
  - `src/export/excelExporter.ts`:
    - `buildProjectWorkbook(project: HikeProject, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): XLSX.WorkBook`
    - `downloadProjectExcel(project: HikeProject, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): void`
  - `src/export/packingLabelsGenerator.ts`:
    - `generatePackingLabels(project: HikeProject, stageFilterId?: string, customProducts?: Product[], customRecipes?: DehydratedRecipe[]): PackingLabelCard[]`

- [ ] **Step 1: Написати тести для Zustand-стору, генерації 5 аркушів `.xlsx` книги та карток етикеток пакування (`src/__tests__/storeAndExport.test.ts`)**

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '../store/useProjectStore';
import { buildProjectWorkbook } from '../export/excelExporter';
import { generatePackingLabels } from '../export/packingLabelsGenerator';

describe('Project Store & Excel/Packing Exporters', () => {
  beforeEach(() => {
    useProjectStore.getState().resetToDemoProject();
  });

  it('updates meal item weight, adds/removes participants, and adds custom product in store', () => {
    const store = useProjectStore.getState();
    const initialCount = store.project.participants.length;
    store.addParticipant({
      name: 'Тарас',
      gender: 'M',
      carryingCapacityCoeff: 1.1,
      role: 'Фотограф',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 2500,
    });
    expect(useProjectStore.getState().project.participants.length).toBe(initialCount + 1);
  });

  it('builds a 5-sheet Excel workbook with Ukrainian sheet names', () => {
    const project = useProjectStore.getState().project;
    const wb = buildProjectWorkbook(project);
    expect(wb.SheetNames).toEqual([
      'Зведення та Учасники',
      'Меню по днях',
      'Закупка та Сушіння',
      'Розподіл по рюкзаках',
      'Етикетки та Заброски',
    ]);
  });

  it('generates packing labels with cooking/rehydration instructions and carrier names', () => {
    useProjectStore.getState().runAutoAssignAllStages();
    const project = useProjectStore.getState().project;
    const labels = generatePackingLabels(project);
    expect(labels.length).toBeGreaterThan(10);
    expect(labels[0].dayNumber).toBe(1);
    expect(labels[0].totalNetGrams).toBeGreaterThan(0);
    expect(labels[0].carrierName).toBeTruthy();
  });
});
```

- [ ] **Step 2: Запустити тест і переконатися, що він падає**

Run: `npx vitest run src/__tests__/storeAndExport.test.ts`
Expected: FAIL (`Cannot find module '../store/useProjectStore'`)

- [ ] **Step 3: Реалізувати `src/store/useProjectStore.ts`, `src/export/excelExporter.ts` та `src/export/packingLabelsGenerator.ts`**

У `excelExporter.ts` використати `XLSX.utils.json_to_sheet` та `XLSX.utils.book_append_sheet` для формування 5 деталізованих аркушів книги `.xlsx`.

- [ ] **Step 4: Запустити тести і переконатися, що вони проходять**

Run: `npx vitest run src/__tests__/storeAndExport.test.ts`
Expected: PASS (3 passed)

- [ ] **Step 5: Зробити коміт**

```bash
git add src/store/ src/export/ src/__tests__/storeAndExport.test.ts
git commit -m "feat: add Zustand persistent store, 5-sheet Excel exporter, and packing label generator"
```

---

### Task 5: Інтерфейс Користувача — Шапка Аналітики, Вкладка Теорії, Вкладка Маршруту/Учасників та Вкладка Каталогу Рецептів

**Files:**
- Create: `src/components/TopSummaryBar.tsx`
- Create: `src/components/TheoryHandbookTab.tsx`
- Create: `src/components/RouteAndTeamTab.tsx`
- Create: `src/components/CatalogAndRecipesTab.tsx`
- Test: `src/__tests__/uiTabsPart1.test.tsx`

**Interfaces:**
- Consumes: `useProjectStore`, `THEORY_CHAPTERS`, `CLIMATE_PROFILES`, `PRODUCTS_CATALOG`, `DEHYDRATED_RECIPES`, `calculateProjectSummary`, `calculateWaterAndFuelNeeds`
- Produces:
  - `TopSummaryBar`: показує середню вагу нетто/брутто на людино-день, середню калорійність, фактичне співвідношення Б:Ж:В проти цільового, середню клітковину, загальну вагу їжі на групу, кількість попереджень, кнопки швидкого експорту/імпорту `.json` та навігацію по 6 вкладках.
  - `TheoryHandbookTab`: інтерактивний довідник по 8 розділах з пошуком, вбудованим калькулятором кипіння води/автоклава/палива та кнопками «Застосувати цей кліматичний профіль у проєкт».
  - `RouteAndTeamTab`: редактор параметрів походу, етапів (кілець/забросок) та таблиці учасників із візуальною шкалою їхніх часток вантажу.
  - `CatalogAndRecipesTab`: каталог 60+ продуктів та 25+ рецептів сушених страв із фільтрами за прийомом їжі/категорією, повними картками технології сушіння й відновлення, швидким додаванням у вибраний день походу та формою створення власного продукту/рецепта.

- [ ] **Step 1: Написати компонентні тести для першої групи вкладок (`src/__tests__/uiTabsPart1.test.tsx`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopSummaryBar } from '../components/TopSummaryBar';
import { TheoryHandbookTab } from '../components/TheoryHandbookTab';
import { RouteAndTeamTab } from '../components/RouteAndTeamTab';
import { CatalogAndRecipesTab } from '../components/CatalogAndRecipesTab';

describe('UI Tabs Part 1: Summary Bar, Theory, Route/Team, Catalog/Recipes', () => {
  it('renders TopSummaryBar with key ration metrics and 6 navigation tabs', () => {
    render(<TopSummaryBar />);
    expect(screen.getByText(/Похідний Завгосп/i)).toBeDefined();
    expect(screen.getByText(/Стисла теорія/i)).toBeDefined();
    expect(screen.getByText(/Матриця меню/i)).toBeDefined();
  });

  it('renders TheoryHandbookTab with all 8 chapters and interactive altitude boiling calculator', () => {
    render(<TheoryHandbookTab />);
    expect(screen.getByText(/Плаваюча розкладка/i)).toBeDefined();
    expect(screen.getByText(/Технологія домашнього сушіння/i)).toBeDefined();
  });

  it('renders RouteAndTeamTab allowing participant and stage management', () => {
    render(<RouteAndTeamTab />);
    expect(screen.getByText(/Учасники групи та коефіцієнти/i)).toBeDefined();
    expect(screen.getByText(/Етапи маршруту та Заброски/i)).toBeDefined();
  });

  it('renders CatalogAndRecipesTab with dehydrated recipes and search filter', () => {
    render(<CatalogAndRecipesTab />);
    expect(screen.getByText(/Рецепти сушених страв/i)).toBeDefined();
    const searchInput = screen.getByPlaceholderText(/Пошук страви або продукту/i);
    fireEvent.change(searchInput, { target: { value: 'Чілі' } });
    expect(screen.getByText(/Чілі/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Запустити тест і переконатися, що він падає**

Run: `npx vitest run src/__tests__/uiTabsPart1.test.tsx`
Expected: FAIL (`Cannot find module '../components/TopSummaryBar'`)

- [ ] **Step 3: Реалізувати `TopSummaryBar.tsx`, `TheoryHandbookTab.tsx`, `RouteAndTeamTab.tsx` та `CatalogAndRecipesTab.tsx`**

Забезпечити чистий, інформативний та зручний інтерфейс українською мовою без зайвих модальних вікон.

- [ ] **Step 4: Запустити тест і переконатися, що він проходить**

Run: `npx vitest run src/__tests__/uiTabsPart1.test.tsx`
Expected: PASS (4 passed)

- [ ] **Step 5: Зробити коміт**

```bash
git add src/components/TopSummaryBar.tsx src/components/TheoryHandbookTab.tsx src/components/RouteAndTeamTab.tsx src/components/CatalogAndRecipesTab.tsx src/__tests__/uiTabsPart1.test.tsx
git commit -m "feat: build TopSummaryBar, TheoryHandbookTab, RouteAndTeamTab, and CatalogAndRecipesTab"
```

---

### Task 6: Інтерфейс Користувача — Матриця Розкладки, Закупка/Сушіння, Розподіл по Рюкзаках та Головний `App.tsx`

**Files:**
- Create: `src/components/MenuMatrixTab.tsx`
- Create: `src/components/ShoppingAndDryingTab.tsx`
- Create: `src/components/LoadAndExportTab.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Test: `src/__tests__/uiTabsPart2.test.tsx`

**Interfaces:**
- Consumes: Усі компоненти з Task 5, `useProjectStore`, `src/domain/*`, `src/export/*`
- Produces:
  - `MenuMatrixTab`: інтерактивна таблиця «Дні × Прийоми їжі» з фільтром за етапами (забросками), вибором типу навантаження дня, інлайн-редагуванням порцій (г/ос.), швидким додаванням продуктів та сушених рецептів, копіюванням/обміном днів та блоком попереджень валідатора.
  - `ShoppingAndDryingTab`: агрегований список покупок (похідна суха вага проти сирої ваги для магазину) з фільтром по забросках, чек-лист для дегідратора (температура, час, критерій сухості) та розрахунок палива.
  - `LoadAndExportTab`: таблиця квот учасників по кожному етапу (спорядження + їжа = загальний рюкзак за коефіцієнтом $k_i$), кнопка «Авторозподіл пакетів по учасниках», графік щоденного розвантаження рюкзаків, картки етикеток для пакування та кнопки експорту у `.xlsx`, друкований PDF (`window.print()`) і `.json`.
  - `App.tsx`: кореневий компонент, що з'єднує `TopSummaryBar`, 6 вкладок та друковане представлення (`@media print`).

- [ ] **Step 1: Написати інтеграційні тести для `MenuMatrixTab`, `ShoppingAndDryingTab`, `LoadAndExportTab` та `App` (`src/__tests__/uiTabsPart2.test.tsx`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';

describe('Full App & Quartermaster Tabs Integration', () => {
  it('renders App and switches across all 6 tabs cleanly', () => {
    render(<App />);
    // Default tab or switch to Menu Matrix
    fireEvent.click(screen.getByRole('button', { name: /Матриця меню/i }));
    expect(screen.getByText(/День 1/i)).toBeDefined();

    // Switch to Shopping & Drying
    fireEvent.click(screen.getByRole('button', { name: /Закупка і сушіння/i }));
    expect(screen.getByText(/Сира вага для закупки/i)).toBeDefined();
    expect(screen.getByText(/План сушіння в дегідраторі/i)).toBeDefined();

    // Switch to Load Distribution & Export
    fireEvent.click(screen.getByRole('button', { name: /Рюкзаки та Експорт/i }));
    expect(screen.getByText(/Авторозподіл по рюкзаках/i)).toBeDefined();
    expect(screen.getByText(/Завантажити Excel \(\.xlsx\)/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Запустити тест і переконатися, що він падає**

Run: `npx vitest run src/__tests__/uiTabsPart2.test.tsx`
Expected: FAIL (`Cannot find module '../App'`)

- [ ] **Step 3: Реалізувати `MenuMatrixTab.tsx`, `ShoppingAndDryingTab.tsx`, `LoadAndExportTab.tsx`, `App.tsx` та `main.tsx`**

Додати в `src/index.css` чисті правила `@media print`, щоб при натисканні «Друк / Зберегти в PDF» приховувалися кнопки навігації й друкувалися охайні таблиці меню, закупки, розподілу по учасниках та розрізні картки-етикетки для пакетів і забросок.

- [ ] **Step 4: Запустити всі тести Vitest та перевірити, що production-збірка (`npm run build`) завершується без помилок TypeScript**

Run: `npx vitest run && npm run build`
Expected: PASS (усі тести зелені, `dist/` успішно згенеровано без помилок компіляції)

- [ ] **Step 5: Зробити фінальний коміт**

```bash
git add src/components/MenuMatrixTab.tsx src/components/ShoppingAndDryingTab.tsx src/components/LoadAndExportTab.tsx src/App.tsx src/main.tsx src/index.css src/__tests__/uiTabsPart2.test.tsx
git commit -m "feat: complete MenuMatrixTab, ShoppingAndDryingTab, LoadAndExportTab, and printable report"
```
