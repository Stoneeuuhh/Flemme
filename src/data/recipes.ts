import type { Aisle, Ingredient, Recipe, Season } from '../types';
import { convertMealDb, type RawMeal } from '../lib/mealdb';

// Import de vos données TheMealDB (ex: la soupe jamaïcaine ou autres)
import rawMealDb from './recettes_traduites_completes_1_a_291.json';

// Import de vos 200 recettes scrapées depuis Marmiton
import rawMarmiton from './toutes_les_200_recettes_marmiton.json';

// Conversion et fusion des deux listes dans un seul tableau de recettes
export const MEALDB_RECIPES: Recipe[] = [
  ...convertMealDb(rawMealDb as unknown as RawMeal[]),
  ...convertMealDb(rawMarmiton as unknown as RawMeal[])
];

const i = (name: string, amount: number, unit: string, aisle: Aisle): Ingredient => ({
  name, amount, unit, aisle,
});
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;
const ALL: Season[] = ['printemps', 'ete', 'automne', 'hiver'];

const BASE_RECIPES: Recipe[] = [
  {
    id: 'pates-tomate-basilic',
    title: 'Pâtes tomate & basilic',
    prepTime: 20, difficulty: 'facile', category: 'vege',
    seasons: ['ete', 'automne'],
    image: img('photo-1473093295043-cdd812d0e601'),
    ingredients: [
      i('pâtes', 200, 'g', 'epicerie'), i('tomates concassées', 400, 'g', 'epicerie'),
      i('oignon', 1, '', 'legumes'), i('ail', 2, 'gousses', 'legumes'),
      i('basilic', 1, 'bouquet', 'legumes'), i('parmesan', 40, 'g', 'frais'),
    ],
    steps: [
      'Porter un grand volume d’eau salée à ébullition et cuire les pâtes al dente selon les instructions du paquet.',
      'Émincer finement l’oignon et hacher les gousses d’ail.',
      'Faire revenir l’oignon et l’ail dans une sauteuse avec 2 cuillères d’huile d’olive pendant 3 à 4 minutes sans colorer.',
      'Verser les tomates concassées, saler, poivrer et laisser mijoter à feu doux pendant 10 à 12 minutes.',
      'Égoutter les pâtes, les verser directement dans la sauce avec le basilic ciselé, mélanger et servir saupoudré de parmesan râpé.'
    ],
    tip: 'Ajouter une demi-cuillère à café de sucre dans la sauce pour adoucir l’acidité des tomates.'
  },
  {
    id: 'omelette-legumes',
    title: 'Omelette aux légumes',
    prepTime: 15, difficulty: 'facile', category: 'rapide',
    seasons: ['ete', 'automne'],
    image: 'https://www.lesfruitsetlegumesfrais.com/app/uploads/2025/09/annelysechardon-jte-omelette-hd-300dpi.jpg',
    ingredients: [
      i('œufs', 4, '', 'frais'), i('poivron', 1, '', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('fromage râpé', 50, 'g', 'frais'),
    ],
    steps: [
      'Épépiner le poivron et le couper en tout petits dés. Émincer l’oignon.',
      'Faire suer l’oignon et le poivron dans une poêle avec un filet d’huile d’olive pendant 6 à 7 minutes à feu moyen jusqu’à ce qu’ils soient tendres.',
      'Dans un saladier, battre les 4 œufs en omelette avec du sel et du poivre.',
      'Verser les œufs battus directement sur les légumes dans la poêle bien chaude.',
      'Laisser cuire 3 minutes en ramenant doucement les bords vers le centre, parsemer de fromage râpé, plier en deux et retirer du feu selon la cuisson souhaitée.'
    ]
  },
  {
    id: 'bowl-quinoa',
    title: 'Bowl quinoa, avocat & feta',
    prepTime: 20, difficulty: 'facile', category: 'vege',
    seasons: ['printemps', 'ete'],
    image: img('photo-1512621776951-a57141f2eefd'),
    ingredients: [
      i('quinoa', 150, 'g', 'epicerie'), i('avocat', 1, '', 'legumes'),
      i('tomates cerises', 150, 'g', 'legumes'), i('concombre', 1, '', 'legumes'),
      i('feta', 100, 'g', 'frais'), i('citron', 1, '', 'legumes'),
    ],
    steps: [
      'Rincer le quinoa abondamment à l’eau claire dans une passoire fine.',
      'Cuire le quinoa dans deux fois son volume d’eau bouillante salée pendant 12 à 15 minutes, puis égoutter et laisser tiédir.',
      'Couper le concombre en dés, les tomates cerises en deux et trancher l’avocat.',
      'Arroser immédiatement la chair de l’avocat avec la moitié du jus de citron pour éviter qu’elle ne noircisse.',
      'Dresser le quinoa au fond de deux bols, disposer les légumes, émietter la feta par-dessus et assaisonner d’un filet d’huile d’olive, du reste de jus de citron, de sel et de poivre.'
    ]
  },
  {
    id: 'tacos-poulet',
    title: 'Tacos au poulet',
    prepTime: 20, difficulty: 'facile', category: 'rapide',
    seasons: ALL,
    image: img('photo-1555939594-58d7cb561ad1'),
    ingredients: [
      i('tortillas', 4, '', 'epicerie'), i('blanc de poulet', 250, 'g', 'viandes'),
      i('poivron', 1, '', 'legumes'), i('oignon', 1, '', 'legumes'),
      i('fromage râpé', 50, 'g', 'frais'), i('crème fraîche', 50, 'ml', 'frais'),
    ],
    steps: [
      'Couper les blancs de poulet en fines lamelles. Émincer l’oignon et le poivron en fines lanières.',
      'Dans une poêle chaude huilée, faire sauter le poulet 5 minutes à feu vif, puis ajouter les poivrons et l’oignon. Saler et poivrer.',
      'Poursuivre la cuisson 5 minutes jusqu’à ce que le poulet soit doré et les légumes fondants. Ajouter la crème fraîche en fin de cuisson.',
      'Passer les tortillas 20 secondes au micro-ondes ou dans une poêle sèche pour les assouplir.',
      'Garnir le centre des tortillas avec la préparation au poulet, saupoudrer de fromage râpé, replier les côtés puis rouler serré.'
    ]
  },
  {
    id: 'salade-nicoise',
    title: 'Salade niçoise',
    prepTime: 20, difficulty: 'facile', category: 'poisson',
    seasons: ['printemps', 'ete'],
    image: img('photo-1540189549336-e6e99c3679fe'),
    ingredients: [
      i('thon en boîte', 160, 'g', 'epicerie'), i('œufs', 2, '', 'frais'),
      i('tomates', 300, 'g', 'legumes'), i('haricots verts', 150, 'g', 'legumes'),
      i('olives', 50, 'g', 'epicerie'),
    ],
    steps: [
      'Cuire les œufs dans l’eau bouillante pendant 9 minutes pour obtenir des œufs durs, puis les refroidir à l’eau froide et les écaler.',
      'Équeuter et cuire les haricots verts à l’eau bouillante salée pendant 8 à 10 minutes, puis les passer sous l’eau glacée pour préserver leur couleur.',
      'Laver et couper les tomates en quartiers.',
      'Égoutter le thon et l’émietter grossièrement à la fourchette.',
      'Disposer les haricots, les tomates, le thon, les olives et les œufs coupés en deux dans un plat. Arroser d’une vinaigrette à l’huile d’olive.'
    ]
  },
  {
    id: 'saumon-riz-brocoli',
    title: 'Saumon, riz & brocoli',
    prepTime: 30, difficulty: 'moyen', category: 'poisson',
    seasons: ['automne', 'hiver'],
    image: img('photo-1467003909585-2f8a72700288'),
    ingredients: [
      i('pavé de saumon', 2, '', 'viandes'), i('riz', 150, 'g', 'epicerie'),
      i('brocoli', 300, 'g', 'legumes'), i('sauce soja', 2, 'c. à s.', 'epicerie'),
      i('citron', 1, '', 'legumes'),
    ],
    steps: [
      'Cuire le riz dans une casserole d’eau bouillante salée selon le temps indiqué sur l’emballage.',
      'Détailler le brocoli en petits fleuretons et les cuire à la vapeur ou à l’eau bouillante salée pendant 8 minutes.',
      'Dans une poêle chaude légèrement huilée, déposer les pavés de saumon côté peau. Cuire 4 à 5 minutes sans y toucher pour dorer la peau.',
      'Retourner délicatement les pavés, arroser avec la sauce soja et un trait de jus de citron, puis prolonger la cuisson de 3 minutes à feu modéré.',
      'Servir le saumon chaud nappé de sauce, accompagné du riz égoutté et des fleuretons de brocoli.'
    ]
  },
  {
    id: 'poulet-champignons',
    title: 'Poulet crème & champignons',
    prepTime: 35, difficulty: 'moyen', category: 'viande',
    seasons: ['automne', 'hiver'],
    image: img('photo-1504674900247-0877df9cc836'),
    ingredients: [
      i('blanc de poulet', 300, 'g', 'viandes'), i('champignons', 250, 'g', 'legumes'),
      i('crème fraîche', 100, 'ml', 'frais'), i('oignon', 1, '', 'legumes'),
      i('riz', 150, 'g', 'epicerie'),
    ],
    steps: [
      'Lancer la cuisson du riz dans de l’eau bouillante salée.',
      'Nettoyer les champignons et les couper en lamelles. Émincer l’oignon. Couper le poulet en morceaux réguliers.',
      'Faire dorer le poulet dans une poêle chaude avec un peu d’huile pendant 5 à 6 minutes. Réserver dans une assiette.',
      'Dans la même poêle, faire suer l’oignon puis ajouter les champignons à feu vif jusqu’à évaporation de leur eau.',
      'Remettre le poulet, verser la crème fraîche, assaisonner de sel et de poivre, et laisser mijoter à feu doux pendant 6 à 8 minutes. Servir avec le riz.'
    ]
  },
  {
    id: 'curry-pois-chiches',
    title: 'Curry de pois chiches',
    prepTime: 30, difficulty: 'moyen', category: 'vege',
    seasons: ALL,
    image: img('photo-1476224203421-9ac39bcb3327'),
    ingredients: [
      i('pois chiches', 400, 'g', 'epicerie'), i('lait de coco', 200, 'ml', 'epicerie'),
      i('tomates concassées', 200, 'g', 'epicerie'), i('oignon', 1, '', 'legumes'),
      i('ail', 2, 'gousses', 'legumes'), i('riz', 150, 'g', 'epicerie'),
      i('curry en poudre', 2, 'c. à c.', 'epicerie'),
    ],
    steps: [
      'Faire cuire le riz d’accompagnement dans de l’eau bouillante salée.',
      'Émincer l’oignon et hacher les gousses d’ail.',
      'Faire revenir l’oignon dans une sauteuse huilée pendant 3 minutes, ajouter l’ail et le curry en poudre, remuer 30 secondes pour libérer les arômes.',
      'Rincer et égoutter les pois chiches en boîte, puis les ajouter dans la sauteuse.',
      'Verser les tomates concassées et le lait de coco, saler, poivrer et laisser mijoter à feu doux pendant 15 minutes. Servir sur le riz.'
    ]
  },
  {
    id: 'gratin-courgettes',
    title: 'Gratin de courgettes au jambon',
    prepTime: 35, difficulty: 'moyen', category: 'viande',
    seasons: ['ete', 'automne'],
    image: img('photo-1546069901-ba9599a7e63c'),
    ingredients: [
      i('courgettes', 500, 'g', 'legumes'), i('jambon blanc', 2, 'tranches', 'viandes'),
      i('crème fraîche', 100, 'ml', 'frais'), i('fromage râpé', 80, 'g', 'frais'),
    ],
    steps: [
      'Préchauffer le four à 190°C (thermostat 6-7).',
      'Laver les courgettes et les couper en rondelles moyennes.',
      'Faire précuire les rondelles de courgettes à la poêle avec un filet d’huile pendant 7 à 8 minutes pour leur faire rendre l’eau.',
      'Dans un plat à gratin, alterner une couche de courgettes, des lanières de jambon blanc et un peu de crème fraîche salée et poivrée.',
      'Recouvrir généreusement de fromage râpé et enfourner pour 20 à 25 minutes jusqu’à ce que le gratin soit bien doré.'
    ]
  },
  {
    id: 'cabillaud-papillote',
    title: 'Cabillaud en papillote',
    prepTime: 30, difficulty: 'moyen', category: 'poisson',
    seasons: ['ete'],
    image: img('photo-1432139555190-58524dae6a55'),
    ingredients: [
      i('dos de cabillaud', 2, '', 'viandes'), i('courgettes', 300, 'g', 'legumes'),
      i('tomates cerises', 150, 'g', 'legumes'), i('citron', 1, '', 'legumes'),
      i('pommes de terre', 300, 'g', 'legumes'),
    ],
    steps: [
      'Préchauffer le four à 200°C. Cuire les pommes de terre coupées en morceaux dans l’eau bouillante pendant 15 minutes.',
      'Détailler la courgette en tagliatelles fines (à l’économe) et couper les tomates cerises en deux.',
      'Sur deux grandes feuilles de papier cuisson, déposer un lit de courgettes et quelques tomates cerises.',
      'Poser un dos de cabillaud au centre de chaque lit, saler, poivrer, ajouter une rondelle de citron et un filet d’huile d’olive.',
      'Fermer hermétiquement les papillotes et enfourner 15 minutes. Servir chaud avec les pommes de terre.'
    ]
  },
  {
    id: 'risotto-champignons',
    title: 'Risotto aux champignons',
    prepTime: 45, difficulty: 'avance', category: 'vege',
    seasons: ['automne', 'hiver'],
    image: img('photo-1565299624946-b28f40a0ae38'),
    ingredients: [
      i('riz arborio', 180, 'g', 'epicerie'), i('champignons', 300, 'g', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('bouillon de légumes', 600, 'ml', 'epicerie'),
      i('parmesan', 50, 'g', 'frais'), i('beurre', 20, 'g', 'frais'),
    ],
    steps: [
      'Dissoudre un cube de bouillon de légumes dans 600 ml d’eau très chaude et maintenir au chaud sur feu doux.',
      'Dans une sauteuse avec la moitié du beurre, faire dorer les champignons émincés pendant 5 minutes. Les retirer et réserver.',
      'Dans la même sauteuse, faire suer l’oignon émincé, puis ajouter le riz arborio sec. Remuer 2 minutes jusqu’à ce qu’il devienne translucide.',
      'Verser une louche de bouillon chaud. Laisser absorber en remuant avant d’ajouter la louche suivante. Répéter l’opération pendant 18 minutes.',
      'Quand le riz est cuit et crémeux, incorporer les champignons, le reste du beurre et le parmesan râpé hors du feu. Couvrir 2 minutes avant de servir.'
    ]
  },
  {
    id: 'lasagnes-maison',
    title: 'Lasagnes maison',
    prepTime: 60, difficulty: 'avance', category: 'viande',
    seasons: ALL,
    image: img('photo-1473093295043-cdd812d0e601'),
    ingredients: [
      i('feuilles de lasagne', 250, 'g', 'epicerie'), i('bœuf haché', 300, 'g', 'viandes'),
      i('tomates concassées', 400, 'g', 'epicerie'), i('oignon', 1, '', 'legumes'),
      i('ail', 2, 'gousses', 'legumes'), i('lait', 500, 'ml', 'frais'),
      i('fromage râpé', 100, 'g', 'frais'), i('beurre', 40, 'g', 'frais'),
      i('farine', 40, 'g', 'epicerie'),
    ],
    steps: [
      'Préparer la bolognaise : faire revenir l’oignon et l’ail hachés, ajouter le bœuf haché et cuire 5 minutes. Verser les tomates concassées, saler, poivrer et laisser mijoter 15 minutes.',
      'Préparer la béchamel : faire fondre le beurre dans une casserole, ajouter la farine en remuant pendant 1 minute, puis verser le lait petit à petit en fouettant à feu moyen jusqu’à épaississement.',
      'Préchauffer le four à 180°C.',
      'Dans un plat à gratin, napper le fond de béchamel, déposer des plaques de pâte, de la bolognaise, de la béchamel et un peu de fromage. Répéter sur 3 étages.',
      'Terminer par une couche de béchamel et le fromage râpé. Enfourner 30 minutes jusqu’à ce que le dessus soit gratiné.'
    ]
  },
  {
    id: 'boeuf-bourguignon',
    title: 'Bœuf bourguignon',
    prepTime: 60, difficulty: 'avance', category: 'viande',
    seasons: ['automne', 'hiver'],
    image: img('photo-1504674900247-0877df9cc836'),
    ingredients: [
      i('bœuf à braiser', 400, 'g', 'viandes'), i('carottes', 300, 'g', 'legumes'),
      i('oignon', 2, '', 'legumes'), i('vin rouge', 200, 'ml', 'epicerie'),
      i('pommes de terre', 400, 'g', 'legumes'), i('ail', 2, 'gousses', 'legumes'),
    ],
    steps: [
      'Couper la viande de bœuf en cubes moyens. Émincer les oignons et couper les carottes en rondelles.',
      'Dans une cocotte avec un peu d’huile, saisir les morceaux de viande à feu très vif pour bien les dorer. Saler et poivrer.',
      'Ajouter les oignons et les gousses d’ail écrasées, laisser suer 3 minutes, puis saupoudrer d’une cuillère à soupe de farine et mélanger.',
      'Mouiller avec le vin rouge et un demi-verre d’eau pour couvrir la viande. Ajouter les rondelles de carottes.',
      'Couvrir et laisser mijoter à feu doux au moins 45 minutes. Cuire les pommes de terre à l’eau à part pour accompagner.'
    ]
  },
  {
    id: 'veloute-potimarron',
    title: 'Velouté de potimarron',
    prepTime: 30, difficulty: 'moyen', category: 'vege',
    seasons: ['automne', 'hiver'],
    image: img('photo-1476224203421-9ac39bcb3327'),
    ingredients: [
      i('potimarron', 600, 'g', 'legumes'), i('pommes de terre', 200, 'g', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('bouillon de légumes', 500, 'ml', 'epicerie'),
      i('crème fraîche', 100, 'ml', 'frais'),
    ],
    steps: [
      'Laver le potimarron (la peau se mange), retirer les graines et le couper en cubes. Peler et couper les pommes de terre en morceaux.',
      'Dans une marmite, faire revenir l’oignon émincé dans un peu d’huile pendant 3 minutes.',
      'Ajouter les cubes de potimarron et de pommes de terre, puis verser le bouillon de légumes chaud jusqu’à hauteur.',
      'Porter à ébullition, couvrir et laisser cuire 20 minutes à feu moyen jusqu’à ce que les légumes soient tendres.',
      'Mixer finement au mixeur plongeant en incorporant la crème fraîche. Assaisonner de sel et de poivre.'
    ],
    tip: 'Inutile d’éplucher le potimarron : sa peau devient très tendre après cuisson.'
  },
  {
    id: 'tartiflette',
    title: 'Tartiflette',
    prepTime: 50, difficulty: 'moyen', category: 'viande',
    seasons: ['automne', 'hiver'],
    image: img('photo-1546069901-ba9599a7e63c'),
    ingredients: [
      i('pommes de terre', 600, 'g', 'legumes'), i('reblochon', 250, 'g', 'frais'),
      i('lardons', 150, 'g', 'viandes'), i('oignon', 1, '', 'legumes'),
      i('crème fraîche', 100, 'ml', 'frais'),
    ],
    steps: [
      'Cuire les pommes de terre entières avec la peau à l’eau bouillante salée pendant 20 minutes. Les peler et les couper en rondelles.',
      'Préchauffer le four à 200°C.',
      'Dans une poêle, faire dorer les lardons avec l’oignon émincé pendant 6 minutes. Égoutter l’excédent de graisse.',
      'Dans un plat à gratin, mélanger les pommes de terre, les oignons, les lardons et la crème fraîche. Poivrer.',
      'Couper le reblochon en deux dans l’épaisseur et le déposer sur le dessus, croûte vers le haut. Enfourner 20 minutes jusqu’à ce qu’il soit fondu et doré.'
    ]
  },
  {
    id: 'soupe-poireaux',
    title: 'Soupe poireaux & pommes de terre',
    prepTime: 30, difficulty: 'facile', category: 'vege',
    seasons: ['automne', 'hiver'],
    image: img('photo-1476224203421-9ac39bcb3327'),
    ingredients: [
      i('poireaux', 400, 'g', 'legumes'), i('pommes de terre', 300, 'g', 'legumes'),
      i('bouillon de légumes', 600, 'ml', 'epicerie'), i('crème fraîche', 50, 'ml', 'frais'),
    ],
    steps: [
      'Nettoyer les poireaux et les émincer en rondelles. Éplucher les pommes de terre et les couper en dés.',
      'Faire fondre une noisette de matière grasse dans un faitout et faire suer les poireaux pendant 5 minutes sans coloration.',
      'Ajouter les dés de pommes de terre et mouiller avec le bouillon de légumes chaud.',
      'Couvrir et laisser mijoter pendant 20 minutes à feu moyen.',
      'Mixer jusqu’à obtenir une texture lisse. Incorporer la crème fraîche, assaisonner de poivre et servir bien chaud.'
    ]
  },
  {
    id: 'gaspacho',
    title: 'Gaspacho tomate & concombre',
    prepTime: 15, difficulty: 'facile', category: 'vege',
    seasons: ['ete'],
    image: img('photo-1540189549336-e6e99c3679fe'),
    ingredients: [
      i('tomates', 600, 'g', 'legumes'), i('concombre', 1, '', 'legumes'),
      i('poivron', 1, '', 'legumes'), i('ail', 1, 'gousses', 'legumes'),
      i('huile d\'olive', 3, 'c. à s.', 'epicerie'),
    ],
    steps: [
      'Laver les légumes. Couper les tomates en morceaux. Peler le concombre et le tronçonner. Épépiner le poivron et le couper grossièrement.',
      'Déposer tous les légumes dans le bol d’un blender avec la gousse d’ail.',
      'Ajouter l’huile d’olive, du sel et un tour de moulin à poivre.',
      'Mixer à pleine vitesse pendant 2 minutes jusqu’à obtenir un mélange fluide et homogène.',
      'Placer au frais au moins 1 heure avant de déguster bien frais.'
    ]
  },
  {
    id: 'ratatouille',
    title: 'Ratatouille & riz',
    prepTime: 45, difficulty: 'moyen', category: 'vege',
    seasons: ['ete'],
    image: img('photo-1512621776951-a57141f2eefd'),
    ingredients: [
      i('courgettes', 300, 'g', 'legumes'), i('aubergine', 1, '', 'legumes'),
      i('poivron', 1, '', 'legumes'), i('tomates', 400, 'g', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('ail', 2, 'gousses', 'legumes'),
      i('riz', 150, 'g', 'epicerie'),
    ],
    steps: [
      'Couper tous les légumes en dés réguliers. Émincer l’oignon et hacher l’ail.',
      'Dans une sauteuse avec de l’huile d’olive, faire revenir les aubergines et les poivrons pendant 7 à 8 minutes.',
      'Ajouter les courgettes, l’oignon et l’ail. Poursuivre la cuisson 5 minutes.',
      'Ajouter les tomates, saler, poivrer et laisser mijoter à couvert à feu doux pendant 25 minutes en remuant régulièrement.',
      'Cuire le riz à l’eau bouillante salée et le servir en accompagnement de la ratatouille.'
    ]
  },
  {
    id: 'salade-pates-mozza',
    title: 'Salade de pâtes tomates & mozzarella',
    prepTime: 20, difficulty: 'facile', category: 'vege',
    seasons: ['ete'],
    image: img('photo-1473093295043-cdd812d0e601'),
    ingredients: [
      i('pâtes', 200, 'g', 'epicerie'), i('tomates cerises', 150, 'g', 'legumes'),
      i('mozzarella', 125, 'g', 'frais'), i('basilic', 1, 'bouquet', 'legumes'),
      i('olives', 50, 'g', 'epicerie'),
    ],
    steps: [
      'Cuire les pâtes al dente. Les égoutter puis les rincer abondamment à l’eau froide pour stopper la cuisson.',
      'Couper les tomates cerises en deux et couper la mozzarella en petits dés.',
      'Dans un saladier, mélanger les pâtes froides, la mozzarella, les tomates cerises et les olives.',
      'Ajouter le basilic frais ciselé.',
      'Arroser d’un filet d’huile d’olive, saler, poivrer et réserver au frais avant de servir.'
    ]
  },
  {
    id: 'asperges-oeufs',
    title: 'Asperges vertes, œufs & parmesan',
    prepTime: 20, difficulty: 'facile', category: 'vege',
    seasons: ['printemps'],
    image: img('photo-1498837167922-ddd27525d352'),
    ingredients: [
      i('asperges vertes', 400, 'g', 'legumes'), i('œufs', 4, '', 'frais'),
      i('parmesan', 30, 'g', 'frais'), i('citron', 1, '', 'legumes'),
    ],
    steps: [
      'Casser le bout dur des asperges vertes. Les cuire dans une eau bouillante salée pendant 6 à 8 minutes jusqu’à ce qu’elles soient tendres mais encore fermes.',
      'Plonger les œufs dans l’eau bouillante pendant 6 minutes précises pour un résultat mollet, puis les plonger aussitôt dans de l’eau glacée avant de les écaler.',
      'Égoutter les asperges et les dresser sur les assiettes.',
      'Déposer délicatement les œufs mollets et les ouvrir en deux.',
      'Parsemer de copeaux de parmesan, ajouter un tour de moulin à poivre, un peu de fleur de sel et un trait de jus de citron.'
    ]
  },
  {
    id: 'petits-pois-lardons',
    title: 'Petits pois, lardons & riz',
    prepTime: 25, difficulty: 'facile', category: 'viande',
    seasons: ['printemps'],
    image: img('photo-1504674900247-0877df9cc836'),
    ingredients: [
      i('petits pois', 300, 'g', 'legumes'), i('lardons', 150, 'g', 'viandes'),
      i('riz', 150, 'g', 'epicerie'), i('oignon', 1, '', 'legumes'),
    ],
    steps: [
      'Cuire le riz dans une casserole d’eau bouillante salée selon le temps indiqué.',
      'Dans une sauteuse sans matière grasse, faire dorer les lardons avec l’oignon émincé pendant 5 minutes.',
      'Ajouter les petits pois et mélanger.',
      'Verser un demi-verre d’eau, couvrir et laisser mijoter à feu doux pendant 10 à 12 minutes.',
      'Égoutter le riz et l’incorporer directement dans la sauteuse, poivrer et servir bien chaud.'
    ]
  },
];

export const RECIPES: Recipe[] = [
  ...BASE_RECIPES,
  ...MEALDB_RECIPES,
];
