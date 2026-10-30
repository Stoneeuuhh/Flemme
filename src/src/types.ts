export type Difficulty = 'facile' | 'moyen' | 'avance';
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
  image: string;
  ingredients: Ingredient[];
}

export interface Settings {
  excluded: string[];
  difficulties: Difficulty[];
  maxTime: number | null;
}
