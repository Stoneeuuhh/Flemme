import type { Aisle, Ingredient, Recipe } from '../types';

const i = (name: string, amount: number, unit: string, aisle: Aisle): Ingredient => ({
  name, amount, unit, aisle,
});
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const RECIPES: Recipe[] = [
  {
    id: 'pates-tomate-basilic',
    title: 'Pâtes tomate & basilic',
    prepTime: 20, difficulty: 'facile', category: 'vege',
    image: img('photo-1473093295043-cdd812d0e601'),
    ingredients: [
      i('pâtes', 200, 'g', 'epicerie'), i('tomates concassées', 400, 'g', 'epicerie'),
      i('oignon', 1, '', 'legumes'), i('ail', 2, 'gousses', 'legumes'),
      i('basilic', 1, 'bouquet', 'legumes'), i('parmesan', 40, 'g', 'frais'),
    ],
  },
  {
    id: 'pates-carbonara',
    title: 'Pâtes carbonara',
    prepTime: 20, difficulty: 'facile', category: 'viande',
    image: img('photo-1621996346565-e3dbc646d9a9'),
    ingredients: [
      i('pâtes', 200, 'g', 'epicerie'), i('lardons', 150, 'g', 'viandes'),
      i('œufs', 2, '', 'frais'), i('parmesan', 40, 'g', 'frais'),
      i('crème fraîche', 100, 'ml', 'frais'),
    ],
  },
  {
    id: 'omelette-legumes',
    title: 'Omelette aux légumes',
    prepTime: 15, difficulty: 'facile', category: 'rapide',
    image: img('photo-1498837167922-ddd27525d352'),
    ingredients: [
      i('œufs', 4, '', 'frais'), i('poivron', 1, '', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('fromage râpé', 50, 'g', 'frais'),
    ],
  },
  {
    id: 'bowl-quinoa',
    title: 'Bowl quinoa, avocat & feta',
    prepTime: 20, difficulty: 'facile', category: 'vege',
    image: img('photo-1512621776951-a57141f2eefd'),
    ingredients: [
      i('quinoa', 150, 'g', 'epicerie'), i('avocat', 1, '', 'legumes'),
      i('tomates cerises', 150, 'g', 'legumes'), i('concombre', 1, '', 'legumes'),
      i('feta', 100, 'g', 'frais'), i('citron', 1, '', 'legumes'),
    ],
  },
  {
    id: 'tacos-poulet',
    title: 'Tacos au poulet',
    prepTime: 20, difficulty: 'facile', category: 'rapide',
    image: img('photo-1555939594-58d7cb561ad1'),
    ingredients: [
      i('tortillas', 4, '', 'epicerie'), i('blanc de poulet', 250, 'g', 'viandes'),
      i('poivron', 1, '', 'legumes'), i('oignon', 1, '', 'legumes'),
      i('fromage râpé', 50, 'g', 'frais'), i('crème fraîche', 50, 'ml', 'frais'),
    ],
  },
  {
    id: 'salade-nicoise',
    title: 'Salade niçoise',
    prepTime: 20, difficulty: 'facile', category: 'poisson',
    image: img('photo-1540189549336-e6e99c3679fe'),
    ingredients: [
      i('thon en boîte', 160, 'g', 'epicerie'), i('œufs', 2, '', 'frais'),
      i('tomates', 300, 'g', 'legumes'), i('haricots verts', 150, 'g', 'legumes'),
      i('olives', 50, 'g', 'epicerie'),
    ],
  },
  {
    id: 'saumon-riz-brocoli',
    title: 'Saumon, riz & brocoli',
    prepTime: 30, difficulty: 'moyen', category: 'poisson',
    image: img('photo-1467003909585-2f8a72700288'),
    ingredients: [
      i('pavé de saumon', 2, '', 'viandes'), i('riz', 150, 'g', 'epicerie'),
      i('brocoli', 300, 'g', 'legumes'), i('sauce soja', 2, 'c. à s.', 'epicerie'),
      i('citron', 1, '', 'legumes'),
    ],
  },
  {
    id: 'poulet-champignons',
    title: 'Poulet crème & champignons',
    prepTime: 35, difficulty: 'moyen', category: 'viande',
    image: img('photo-1504674900247-0877df9cc836'),
    ingredients: [
      i('blanc de poulet', 300, 'g', 'viandes'), i('champignons', 250, 'g', 'legumes'),
      i('crème fraîche', 100, 'ml', 'frais'), i('oignon', 1, '', 'legumes'),
      i('riz', 150, 'g', 'epicerie'),
    ],
  },
  {
    id: 'curry-pois-chiches',
    title: 'Curry de pois chiches',
    prepTime: 30, difficulty: 'moyen', category: 'vege',
    image: img('photo-1476224203421-9ac39bcb3327'),
    ingredients: [
      i('pois chiches', 400, 'g', 'epicerie'), i('lait de coco', 200, 'ml', 'epicerie'),
      i('tomates concassées', 200, 'g', 'epicerie'), i('oignon', 1, '', 'legumes'),
      i('ail', 2, 'gousses', 'legumes'), i('riz', 150, 'g', 'epicerie'),
      i('curry en poudre', 2, 'c. à c.', 'epicerie'),
    ],
  },
  {
    id: 'gratin-courgettes',
    title: 'Gratin de courgettes au jambon',
    prepTime: 35, difficulty: 'moyen', category: 'viande',
    image: img('photo-1546069901-ba9599a7e63c'),
    ingredients: [
      i('courgettes', 500, 'g', 'legumes'), i('jambon blanc', 2, 'tranches', 'viandes'),
      i('crème fraîche', 100, 'ml', 'frais'), i('fromage râpé', 80, 'g', 'frais'),
    ],
  },
  {
    id: 'cabillaud-papillote',
    title: 'Cabillaud en papillote',
    prepTime: 30, difficulty: 'moyen', category: 'poisson',
    image: img('photo-1432139555190-58524dae6a55'),
    ingredients: [
      i('dos de cabillaud', 2, '', 'viandes'), i('courgettes', 300, 'g', 'legumes'),
      i('tomates cerises', 150, 'g', 'legumes'), i('citron', 1, '', 'legumes'),
      i('pommes de terre', 300, 'g', 'legumes'),
    ],
  },
  {
    id: 'risotto-champignons',
    title: 'Risotto aux champignons',
    prepTime: 45, difficulty: 'avance', category: 'vege',
    image: img('photo-1565299624946-b28f40a0ae38'),
    ingredients: [
      i('riz arborio', 180, 'g', 'epicerie'), i('champignons', 300, 'g', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('bouillon de légumes', 600, 'ml', 'epicerie'),
      i('parmesan', 50, 'g', 'frais'), i('beurre', 20, 'g', 'frais'),
    ],
  },
  {
    id: 'lasagnes-maison',
    title: 'Lasagnes maison',
    prepTime: 60, difficulty: 'avance', category: 'viande',
    image: img('photo-1473093295043-cdd812d0e601'),
    ingredients: [
      i('feuilles de lasagne', 250, 'g', 'epicerie'), i('bœuf haché', 300, 'g', 'viandes'),
      i('tomates concassées', 400, 'g', 'epicerie'), i('oignon', 1, '', 'legumes'),
      i('ail', 2, 'gousses', 'legumes'), i('lait', 500, 'ml', 'frais'),
      i('fromage râpé', 100, 'g', 'frais'), i('beurre', 40, 'g', 'frais'),
      i('farine', 40, 'g', 'epicerie'),
    ],
  },
  {
    id: 'boeuf-bourguignon',
    title: 'Bœuf bourguignon',
    prepTime: 60, difficulty: 'avance', category: 'viande',
    image: img('photo-1504674900247-0877df9cc836'),
    ingredients: [
      i('bœuf à braiser', 400, 'g', 'viandes'), i('carottes', 300, 'g', 'legumes'),
      i('oignon', 2, '', 'legumes'), i('vin rouge', 200, 'ml', 'epicerie'),
      i('pommes de terre', 400, 'g', 'legumes'), i('ail', 2, 'gousses', 'legumes'),
    ],
  },
];
