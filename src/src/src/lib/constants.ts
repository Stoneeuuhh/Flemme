import type { Aisle, Difficulty, Settings } from '../types';

export const QUOTA = 7;
export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const AISLE_ORDER: Aisle[] = ['legumes', 'frais', 'viandes', 'epicerie'];
export const AISLE_LABEL: Record<Aisle, string> = {
  legumes: '🥕 Fruits & légumes',
  frais: '🧀 Produits frais',
  viandes: '🥩 Viandes & poissons',
  epicerie: '🥫 Épicerie',
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  facile: 'Facile',
  moyen: 'Moyen',
  avance: 'Élaboré',
};
export const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  facile: 'bg-emerald-100 text-emerald-800',
  moyen: 'bg-amber-100 text-amber-800',
  avance: 'bg-rose-100 text-rose-800',
};

export const TIME_OPTIONS: { label: string; value: number | null }[] = [
  { label: 'Moins de 20 min', value: 20 },
  { label: 'Moins de 35 min', value: 35 },
  { label: 'Sans limite', value: null },
];

export const PRESET_EXCLUSIONS = [
  'oignon', 'ail', 'poisson', 'viande', 'crème', 'champignon', 'fromage', 'œuf', 'tomate',
];

export const DEFAULT_SETTINGS: Settings = {
  excluded: [],
  difficulties: ['facile', 'moyen', 'avance'],
  maxTime: null,
};
