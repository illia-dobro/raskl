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
    expect(DAY_LOAD_PROFILES.standard.kcalMultiplier).toBe(1.0);
    expect(DAY_LOAD_PROFILES.assault.kcalMultiplier).toBe(1.0);
    expect(DAY_LOAD_PROFILES.rest_day.kcalMultiplier).toBe(0.95);
  });

  it('calculates water boiling point drop with altitude (~1C per 300m)', () => {
    expect(getBoilingPointCelsius(0)).toBe(100);
    expect(getBoilingPointCelsius(3000)).toBeCloseTo(90, 0);
    expect(getBoilingPointCelsius(4500)).toBeCloseTo(85, 0);
    expect(getBoilingPointCelsius(-100)).toBe(100);
  });
});
