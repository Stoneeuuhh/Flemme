import type { Aisle, Difficulty, Ingredient, Recipe, Season } from '../types';

/** Une recette telle qu'elle est dans mealdbRecipes200.json */
export interface RawMeal {
  idMeal: string;
  strMeal: string;
  strCategory?: string | null;
  strInstructions?: string | null;
  strMealThumb?: string | null;
  [key: string]: unknown;
}

/** Catégories MealDB qui ne sont pas des repas complets (à modifier si besoin) */
const EXCLUDED_CATEGORIES = new Set([
  'dessert', 'petit-dejeuner', 'accompagnement', 'entree',
  'breakfast', 'side', 'starter',
]);

const ALL_SEASONS: Season[] = ['printemps', 'ete', 'automne', 'hiver'];

/* ------------------------- Utilitaires ------------------------- */

const norm = (s: string) =>
  s
    .replace(/[’‘]/g, "'")
    .replace(/œ/gi, 'oe')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const round = (n: number) => Math.round(n * 100) / 100;

/** Regex "mot entier" avec pluriel optionnel (s ou x) */
const words = (list: string[]) => new RegExp(`\\b(?:${list.join('|')})(?:s|x)?\\b`);

/* ------------------------- Quantités ------------------------- */

const FRACTIONS: Record<string, number> = {
  '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125,
};
const NUM =
  '(?:\\d+\\s*[½¼¾⅓⅔⅛]|\\d+\\s+\\d+/\\d+|\\d+[.,]\\d+|\\d+/\\d+|\\d+|[½¼¾⅓⅔⅛])';
const QTY_RE = new RegExp(`^(${NUM})(?:\\s*(?:-|–|à|ou)\\s*(${NUM}))?`);

function toNumber(raw: string): number {
  const s = raw.trim();
  let m = s.match(/^(\d+)\s*([½¼¾⅓⅔⅛])$/);
  if (m) return Number(m[1]) + FRACTIONS[m[2]];
  m = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
  m = s.match(/^(\d+)\/(\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  if (s in FRACTIONS) return FRACTIONS[s];
  return parseFloat(s.replace(',', '.'));
}

// [détection (sur texte sans accents), unité finale, facteur de conversion]
const UNITS: [RegExp, string, number][] = [
  [/^(?:kg|kilos?|kilogrammes?)\b/, 'g', 1000],
  [/^(?:g|gr|grammes?)\b/, 'g', 1],
  [/^(?:ml|millilitres?)\b/, 'ml', 1],
  [/^(?:cl|centilitres?)\b/, 'ml', 10],
  [/^(?:dl|decilitres?)\b/, 'ml', 100],
  [/^(?:l|litres?)\b/, 'ml', 1000],
  [/^(?:lbs?|pounds?)\b/, 'g', 453.6],
  [/^(?:oz|onces?)\b/, 'g', 28.35],
  [/^(?:c|cuill?(?:eres?)?)\.?\s*a\.?\s*(?:soupe|s)\b\.?/, 'c. à s.', 1],
  [/^(?:c|cuill?(?:eres?)?)\.?\s*a\.?\s*(?:cafe|c)\b\.?/, 'c. à c.', 1],
  [/^(?:tbsp|tbs|tablespoons?)\b/, 'c. à s.', 1],
  [/^(?:tsp|teaspoons?)\b/, 'c. à c.', 1],
  [/^(?:tasses?|cups?)\b/, 'tasse', 1],
  [/^gousses?\b/, 'gousses', 1],
  [/^tranches?\b/, 'tranches', 1],
  [/^(?:bouquets?|bottes?)\b/, 'bouquet', 1],
  [/^pincees?\b/, 'pincée', 1],
  [/^(?:boites?|conserves?)\b/, 'boîte', 1],
  [/^feuilles?\b/, 'feuilles', 1],
  [/^brins?\b/, 'brins', 1],
  [/^branches?\b/, 'branches', 1],
  [/^morceaux?\b/, 'morceaux', 1],
  [/^cubes?\b/, 'cubes', 1],
  [/^sachets?\b/, 'sachets', 1],
  [/^paquets?\b/, 'paquet', 1],
  [/^poignees?\b/, 'poignée', 1],
  [/^verres?\b/, 'verre', 1],
  [/^tetes?\b/, 'têtes', 1],
  [/^pots?\b/, 'pot', 1],
];

/** "4 gousses hachées" → 4 gousses · "1 c. à soupe" → 1 c. à s. · "Au goût" → 1 */
function parseMeasure(measure: string): { amount: number; unit: string } {
  const m = measure.replace(/\u00a0/g, ' ').trim().replace(/^une?\s+(?!peu\b)/i, '1 ');
  const match = m.match(QTY_RE);
  if (!match) return { amount: 1, unit: '' };

  let amount = toNumber(match[2] ?? match[1]);
  if (!Number.isFinite(amount) || amount <= 0) amount = 1;

  const rest = norm(m.slice(match[0].length));
  for (const [re, unit, factor] of UNITS) {
    if (re.test(rest)) return { amount: round(amount * factor), unit };
  }
  return { amount: round(amount), unit: '' };
}

/* ------------------------- Rayons ------------------------- */

// Cas "piège" qui doivent aller à l'épicerie même s'ils contiennent un mot de viande/légume/laitage
const EPICERIE_FIRST_RE = new RegExp(
  [
    'en boite', 'en conserve', 'conserve', 'bouillon', 'fond de', 'fumet', 'sauce', 'coulis', 'concentre',
    'puree de tomate', 'pate de tomate', 'tomates? (?:pelee|concassee|sechee)s?',
    'lait de coco', 'creme de coco', "lait d(?:'|e )(?:amande|soja|avoine|riz|noix)",
    'beurre de (?:cacahuete|amande|cajou|noix)', 'haricots? (?:rouge|blanc|noir|sec)s?',
    '\\b(?:sec|secs|seche|seches|sechee|sechees)\\b',
    'poudre', 'moulu', 'huile', 'vinaigre', 'farine', 'sucre', 'levure', 'chapelure',
    'cacao', 'chocolat', 'confiture', 'extrait', 'essence', 'arome',
    'cayenne', 'paprika', 'espelette', 'curry', 'cumin', 'curcuma', 'cannelle', 'muscade', 'girofle',
    'ras el', 'garam', 'epices?', 'herbes de',
  ].join('|'),
);

const FRESH_DOUGH_RE = /pate (?:brisee|feuilletee|sablee|a pizza|a tarte|filo)/;

const MEAT_RE = words([
  'boeuf', 'veau', 'porc', 'agneau', 'mouton', 'poulet', 'dinde', 'canard', 'lapin', 'jambon', 'jambonneau',
  'lardon', 'bacon', 'poitrine', 'saucisse', 'saucisson', 'chorizo', 'merguez', 'steak', 'escalope', 'gigot',
  'boudin', 'andouille', 'rillette', 'magret', 'pintade', 'viande', 'cotelette', 'cuisse', 'aile', 'paleron',
  'joue', 'jarret', 'travers', 'filet mignon', 'foie', 'salami', 'pancetta', 'prosciutto', 'mortadelle',
  'gesier', 'bavette', 'entrecote', 'rumsteck', 'rosbif', 'roti', 'chair a saucisse',
]);

const FISH_RE = words([
  'poisson', 'saumon', 'thon', 'cabillaud', 'morue', 'merlu', 'colin', 'lieu jaune', 'lieu noir', 'dorade',
  'loup de mer', 'truite', 'sole', 'raie', 'sardine', 'maquereau', 'anchois', 'hareng', 'haddock', 'aiglefin',
  'eglefin', 'crevette', 'gambas?', 'langoustine', 'homard', 'crabe', 'moule', 'huitre', 'calmar', 'calamar',
  'encornet', 'poulpe', 'seiche', 'saint[- ]jacques', 'fruits? de mer', 'surimi', 'tilapia', 'fletan',
  'espadon', 'lotte', 'rouget', 'anguille', 'tarama', 'caviar', 'bonite',
]);

const FRESH_RE = words([
  'oeuf', 'lait', 'creme', 'beurre', 'fromage', 'parmesan', 'mozzarella', 'feta', 'gruyere', 'emmental',
  'cheddar', 'comte', 'reblochon', 'chevre', 'ricotta', 'mascarpone', 'yaourt', 'yogourt', 'camembert', 'brie',
  'roquefort', 'pecorino', 'halloumi', 'margarine', 'gouda', 'mimolette', 'raclette', 'cottage', 'paneer',
  'skyr', 'burrata', 'maroilles', 'munster', 'petits? suisses?', 'tofu',
]);

const VEG_RE = words([
  'tomate', 'oignon', 'ail', 'echalote', 'poivron', 'carotte', 'pommes? de terre', 'pomme(?!s? de terre)',
  'poire', 'patate', 'patates? douces?', 'courgette', 'aubergine', 'champignon', 'epinard', 'salade', 'laitue',
  'concombre', 'brocoli', 'chou', 'chou-fleur', 'poireau', 'celeri', 'navet', 'radis', 'betterave', 'courge',
  'butternut', 'potiron', 'potimarron', 'citrouille', 'haricots? verts?', 'petits? pois', 'mais', 'avocat',
  'citron', 'lime', 'orange', 'pamplemousse', 'banane', 'fraise', 'framboise', 'myrtille', 'raisin', 'mangue',
  'ananas', 'peche', 'abricot', 'prune', 'cerise', 'figue', 'gingembre', 'persil', 'coriandre', 'basilic',
  'menthe', 'thym', 'romarin', 'ciboulette', 'aneth', 'laurier', 'sauge', 'estragon', 'piment', 'jalapeno',
  'cebette', 'fenouil', 'asperge', 'artichaut', 'endive', 'mache', 'roquette', 'oseille', 'cresson', 'rhubarbe',
  'kiwi', 'clementine', 'mandarine', 'melon', 'pasteque', 'nectarine', 'cassis', 'groseille', 'mure',
  'topinambour', 'panais', 'rutabaga', 'blette', 'gombo', 'manioc', 'plantain', 'mange-tout', 'feve',
  'oignons? verts?', 'ciboule', 'citronnelle', 'mesclun', 'cepe', 'girolle', 'shiitake', 'morille', 'pleurote',
  'coing', 'chataigne', 'marron',
]);

function detectAisle(name: string): Aisle {
  const n = norm(name);
  if (EPICERIE_FIRST_RE.test(n)) return 'epicerie';
  if (FRESH_DOUGH_RE.test(n)) return 'frais';
  if (MEAT_RE.test(n) || FISH_RE.test(n)) return 'viandes';
  if (FRESH_RE.test(n)) return 'frais';
  if (VEG_RE.test(n)) return 'legumes';
  return 'epicerie';
}

/* ------------------------- Ingrédients ------------------------- */

// Produits de base qu'on ne met pas sur une liste de courses
const SKIP_RE =
  /^(?:(?:gros |fin |fleur de )?sel(?: fin| de mer)?|poivre(?: noir| blanc| moulu| du moulin)?|sel et poivre|eau(?: froide| chaude| tiede| bouillante)?|glacons?)$/;

function parseIngredients(raw: RawMeal): Ingredient[] {
  const merged = new Map<string, Ingredient>();
  for (let n = 1; n <= 20; n++) {
    const rawName = String(raw[`strIngredient${n}`] ?? '').trim();
    if (!rawName || SKIP_RE.test(norm(rawName))) continue;

    const name = rawName.toLowerCase();
    const { amount, unit } = parseMeasure(String(raw[`strMeasure${n}`] ?? ''));
    const key = `${name}|${unit}`;
    const existing = merged.get(key);
    if (existing) existing.amount = round(existing.amount + amount);
    else merged.set(key, { name, amount, unit, aisle: detectAisle(rawName) });
  }
  return [...merged.values()];
}

/* ------------------------- Étapes ------------------------- */

function parseSteps(instructions: string): string[] {
  let chunks = instructions.split(/\r?\n+/).map((s) => s.trim()).filter(Boolean);

  // Texte en un seul bloc : on découpe par phrases
  if (chunks.length <= 2) {
    chunks = chunks.flatMap((c) => {
      const parts = c.split(/\.\s+(?=[A-ZÀ-ÖØ-Ý])/);
      return parts.map((p, i) => (i < parts.length - 1 ? `${p}.` : p));
    });
  }

  return chunks
    .map((c) => c.replace(/^(?:étape\s*\d+\s*[:.\-–]?\s*|\d+\s*[.)]\s+)/i, '').trim())
    .filter((c) => c.length > 2 && !/^(?:step|étape|etape)\s*\d+[:.]?$/i.test(c));
}

/* ------------------------- Estimations ------------------------- */

function estimateTime(instructions: string, ingredientCount: number): number {
  const re = /(\d+)(?:\s*(?:à|-|–)\s*(\d+))?\s*(minutes?|mins?|heures?)\b/gi;
  let total = 0;
  for (const m of instructions.matchAll(re)) {
    const value = Number(m[2] ?? m[1]);
    total += /^h/i.test(m[3]) ? value * 60 : value;
  }
  const raw = total > 0 ? 10 + total : 15 + ingredientCount * 3;
  return Math.min(180, Math.max(10, Math.round(raw / 5) * 5));
}

function detectDifficulty(time: number, ingredientCount: number, stepCount: number): Difficulty {
  if (time >= 60 || ingredientCount >= 14 || stepCount >= 10) return 'avance';
  if (time <= 25 && ingredientCount <= 8 && stepCount <= 6) return 'facile';
  return 'moyen';
}

function detectCategory(category: string, ingredients: Ingredient[]): Recipe['category'] {
  if (/vegetarien|vegetalien|vegan/.test(category)) return 'vege';
  if (/poisson|fruits de mer|seafood/.test(category)) return 'poisson';
  if (/boeuf|poulet|agneau|porc|chevre|veau|viande|mouton/.test(category)) return 'viande';

  const names = ingredients.map((i) => norm(i.name)).filter((n) => !EPICERIE_FIRST_RE.test(n));
  if (names.some((n) => FISH_RE.test(n))) return 'poisson';
  if (names.some((n) => MEAT_RE.test(n))) return 'viande';
  return 'vege';
}

// Produits frais de saison (on ne regarde que le rayon "legumes")
const SEASONAL: [RegExp, Season[]][] = [
  [words(['asperge', 'radis', 'rhubarbe', 'artichaut', 'feve', 'petits? pois', 'oseille', 'cresson']), ['printemps']],
  [words(['fraise', 'salade', 'laitue', 'concombre']), ['printemps', 'ete']],
  [words(['melon', 'pasteque', 'peche', 'abricot', 'nectarine', 'framboise', 'cerise', 'basilic', 'myrtille']), ['ete']],
  [words(['tomate', 'courgette', 'aubergine', 'poivron', 'haricots? verts?', 'mais', 'figue', 'prune', 'mure', 'raisin']), ['ete', 'automne']],
  [words(['epinard']), ['printemps', 'automne', 'hiver']],
  [
    words([
      'champignon', 'cepe', 'girolle', 'courge', 'potiron', 'potimarron', 'butternut', 'citrouille', 'chou',
      'poireau', 'navet', 'panais', 'topinambour', 'celeri', 'betterave', 'brocoli', 'chataigne', 'marron',
      'pomme(?!s? de terre)', 'poire', 'coing', 'endive', 'mache', 'orange', 'clementine', 'mandarine', 'kiwi',
    ]),
    ['automne', 'hiver'],
  ],
];

function detectSeasons(ingredients: Ingredient[]): Season[] {
  const found = ingredients
    .filter((i) => i.aisle === 'legumes')
    .map((i) => SEASONAL.find(([re]) => re.test(norm(i.name)))?.[1])
    .filter((s): s is Season[] => !!s);

  if (found.length === 0) return ALL_SEASONS; // aucun produit de saison : toute l'année

  const score = ALL_SEASONS.map((s) => found.filter((list) => list.includes(s)).length);
  const max = Math.max(...score);
  return ALL_SEASONS.filter((_, idx) => score[idx] === max);
}

/* ------------------------- Conversion ------------------------- */

export function convertMealDb(raws: RawMeal[]): Recipe[] {
  const out: Recipe[] = [];

  for (const raw of raws) {
    const category = norm(String(raw.strCategory ?? ''));
    if (EXCLUDED_CATEGORIES.has(category)) continue;
    if (!raw.idMeal || !raw.strMeal || !raw.strMealThumb) continue;

    const instructions = String(raw.strInstructions ?? '');
    const ingredients = parseIngredients(raw);
    const steps = parseSteps(instructions);
    if (ingredients.length < 2 || steps.length === 0) continue;

    const prepTime = estimateTime(instructions, ingredients.length);
    out.push({
      id: `mealdb-${raw.idMeal}`,
      title: raw.strMeal.trim(),
      prepTime,
      difficulty: detectDifficulty(prepTime, ingredients.length, steps.length),
      category: detectCategory(category, ingredients),
      seasons: detectSeasons(ingredients),
      image: raw.strMealThumb,
      ingredients,
      steps,
    });
  }

  return out;
}
