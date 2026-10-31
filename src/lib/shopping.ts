import type { Aisle, Recipe } from '../types';

export interface ShoppingItem {
  key: string;
  name: string;
  amount: number;
  unit: string;
  aisle: Aisle;
}

const normalize = (s: string) =>
  s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Ramène les unités équivalentes à une unité de base (kg → g, l → ml...)
function toBaseUnit(amount: number, unit: string): { amount: number; unit: string } {
  const u = unit.trim().toLowerCase();
  if (u === 'kg') return { amount: amount * 1000, unit: 'g' };
  if (u === 'l') return { amount: amount * 1000, unit: 'ml' };
  if (u === 'cl') return { amount: amount * 10, unit: 'ml' };
  if (u === 'dl') return { amount: amount * 100, unit: 'ml' };
  return { amount, unit: u };
}

export function buildShoppingList(recipes: Recipe[]): ShoppingItem[] {
  // 1. Regrouper par rayon + nom normalisé
  const groups = new Map<
    string,
    { name: string; aisle: Aisle; lines: { amount: number; unit: string }[] }
  >();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const groupKey = `${ing.aisle}|${normalize(ing.name)}`;
      let group = groups.get(groupKey);
      if (!group) {
        group = { name: ing.name.trim(), aisle: ing.aisle, lines: [] };
        groups.set(groupKey, group);
      }
      group.lines.push(toBaseUnit(ing.amount, ing.unit));
    }
  }

  // 2. Dans chaque groupe, additionner par unité
  const result: ShoppingItem[] = [];

  for (const [groupKey, group] of groups) {
    const totals = new Map<string, number>();
    for (const line of group.lines) {
      totals.set(line.unit, (totals.get(line.unit) ?? 0) + line.amount);
    }

    // Une seule vraie unité (ex: "gousse") → les quantités sans unité s'y ajoutent
    const realUnits = [...totals.keys()].filter((u) => u !== '');
    if (realUnits.length === 1 && totals.has('')) {
      totals.set(realUnits[0], totals.get(realUnits[0])! + totals.get('')!);
      totals.delete('');
    }

    for (const [unit, amount] of totals) {
      result.push({
        key: `${groupKey}|${unit}`,
        name: group.name,
        amount,
        unit,
        aisle: group.aisle,
      });
    }
  }

  return result.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

export function formatQuantity(amount: number, unit: string): string {
  if (unit === 'g' && amount >= 1000) return `${+(amount / 1000).toFixed(2)} kg`;
  if (unit === 'ml' && amount >= 1000) return `${+(amount / 1000).toFixed(2)} l`;
  return `${+amount.toFixed(2)}${unit ? ` ${unit}` : ''}`;
}
