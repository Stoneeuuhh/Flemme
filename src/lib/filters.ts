import type { Recipe, Settings } from '../types';
import { getCurrentSeason } from './constants';

const norm = (s: string) =>
  s.replace(/œ/gi, 'oe').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const stem = (s: string) => norm(s).replace(/[sx]$/, ''); // "oignons" → "oignon"

export function matchesSettings(recipe: Recipe, s: Settings): boolean {
  if (!s.difficulties.includes(recipe.difficulty)) return false;
  if (s.maxTime !== null && recipe.prepTime > s.maxTime) return false;
  if (s.seasonalOnly && !recipe.seasons.includes(getCurrentSeason())) return false;

  return !s.excluded.some((term) => {
    const t = stem(term);
    if (!t) return false;
    if (norm(recipe.category) === t) return true; // "poisson", "viande"
    return recipe.ingredients.some((ing) => norm(ing.name).includes(t));
  });
}
