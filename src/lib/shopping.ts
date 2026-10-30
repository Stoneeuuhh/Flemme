import type { Aisle, Recipe } from '../types';

export interface ShoppingItem {
  key: string;
  name: string;
  amount: number;
  unit: string;
  aisle: Aisle;
}

export function buildShoppingList(recipes: Recipe[]): ShoppingItem[] {
  const map = new Map<string, ShoppingItem>();
  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const key = `${ing.aisle}|${ing.name}|${ing.unit}`;
      const existing = map.get(key);
      if (existing) existing.amount += ing.amount;
      else map.set(key, { key, ...ing });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

export function formatQuantity(amount: number, unit: string): string {
  if (unit === 'g' && amount >= 1000) return `${+(amount / 1000).toFixed(2)} kg`;
  if (unit === 'ml' && amount >= 1000) return `${+(amount / 1000).toFixed(2)} l`;
  return `${+amount.toFixed(2)}${unit ? ` ${unit}` : ''}`;
}
