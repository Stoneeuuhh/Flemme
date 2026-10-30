export type Difficulty = 'facile' | 'moyen' | 'avance';
export type Season = 'printemps' | 'ete' | 'automne' | 'hiver';
export type Aisle = 'frais' | 'legumes' | 'epicerie' | 'viandes';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string; // '' pour les pièces
  aisle: Aisle;
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: number; // en minutes
  difficulty: Difficulty;
  category: 'viande' | 'poisson' | 'vege' | 'rapide';
  seasons: Season[]; // les 4 saisons = recette valable toute l'année
  image: string;
  ingredients: Ingredient[];
  steps: string[]; // <-- NOUVEAU : étapes de la recette
  tip?: string;    // <-- NOUVEAU : astuce de cuisine (optionnel)
}

export interface Settings {
  excluded: string[];
  difficulties: Difficulty[];
  maxTime: number | null;
  seasonalOnly: boolean;
}
