import { HikeProject } from '../types/domain';

export function serializeProjectToJson(project: HikeProject): string {
  return JSON.stringify(project, null, 2);
}

export function parseAndValidateProjectJson(
  jsonStr: string
): { ok: true; project: HikeProject } | { ok: false; error: string } {
  try {
    const data = JSON.parse(jsonStr);

    if (!data || typeof data !== 'object') {
      return { ok: false, error: 'Некоректний формат проєкту: вміст не є JSON-об\'єктом.' };
    }

    if (!data.id || typeof data.id !== 'string') {
      return { ok: false, error: 'Некоректний формат проєкту: відсутній обов\'язковий ідентифікатор "id".' };
    }

    if (!data.settings || typeof data.settings !== 'object') {
      return { ok: false, error: 'Некоректний формат проєкту: відсутній блок налаштувань "settings".' };
    }

    if (!Array.isArray(data.participants)) {
      return { ok: false, error: 'Некоректний формат проєкту: поле "participants" має бути масивом учасників.' };
    }

    if (!Array.isArray(data.stages)) {
      return { ok: false, error: 'Некоректний формат проєкту: поле "stages" має бути масивом етапів маршруту.' };
    }

    if (!Array.isArray(data.days)) {
      return { ok: false, error: 'Некоректний формат проєкту: поле "days" має бути масивом ходових днів.' };
    }

    // Перевірка цілісності ходових днів
    for (let i = 0; i < data.days.length; i++) {
      const day = data.days[i];
      if (typeof day.dayNumber !== 'number' || !day.meals || typeof day.meals !== 'object') {
        return {
          ok: false,
          error: `Некоректний формат проєкту: день #${i + 1} має пошкоджену структуру прийомів їжі.`,
        };
      }
    }

    return { ok: true, project: data as HikeProject };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      error: `Помилка парсингу JSON-файлу проєкту: ${msg}`,
    };
  }
}
