import type { Aisle, Ingredient, Recipe, Season } from '../types';

const i = (name: string, amount: number, unit: string, aisle: Aisle): Ingredient => ({
  name, amount, unit, aisle,
});
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;
const ALL: Season[] = ['printemps', 'ete', 'automne', 'hiver'];

export const RECIPES: Recipe[] = [
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
    id: 'pates-carbonara',
    title: 'Pâtes carbonara',
    prepTime: 20, difficulty: 'facile', category: 'viande',
    seasons: ALL,
    image: img('photo-1621996346565-e3dbc646d9a9'),
    ingredients: [
      i('pâtes', 200, 'g', 'epicerie'), i('lardons', 150, 'g', 'viandes'),
      i('œufs', 2, '', 'frais'), i('parmesan', 40, 'g', 'frais'),
      i('crème fraîche', 100, 'ml', 'frais'),
    ],
    steps: [
      'Lancer la cuisson des pâtes dans un grand volume d’eau bouillante bien salée.',
      'Dans un bol, battre les 2 œufs entiers avec la crème fraîche, le parmesan râpé, une pincée de sel et du poivre moulu.',
      'Dans une grande poêle sans matière grasse, faire dorer les lardons à feu vif pendant 5 à 6 minutes jusqu’à ce qu’ils soient croustillants. Égoutter l’excédent de graisse si besoin.',
      'Égoutter les pâtes en gardant 2 cuillères à soupe d’eau de cuisson.',
      'Hors du feu, verser immédiatement les pâtes chaudes et l’eau de cuisson sur les lardons, puis ajouter la préparation crème/œufs en remuant vivement pour obtenir une sauce onctueuse sans cuire les œufs.'
    ]
  },
  {
    id: 'omelette-legumes',
    title: 'Omelette aux légumes',
    prepTime: 15, difficulty: 'facile', category: 'rapide',
    seasons: ['ete', 'automne'],
    image: img('photo-1498837167922-ddd27525d352'),
    ingredients: [
      i('œufs', 4, '', 'frais'), i('poivron', 1, '', 'legumes'),
      i('oignon', 1, '', 'legumes'), i('fromage râpé', 50, 'g', 'frais'),
    ],
    steps: [
      'Épépiner le poivron et le couper en tout petits dés. Émincer l’oignon.',
      'Faire suer l’oignon et le poivron dans une poêle avec un filet d’huile d’olive pendant 6 à 7 minutes à feu moyen jusqu’à ce qu’ils soient tendres.',
      'Dans un saladier, battre les 4 œufs en omelette avec du sel et du poivre.',
      'Verser les œufs battus directement sur les légumes dans la poêle bien chaude.',
      'Laisser cuire 3 minutes en ramenant doucement les bords vers le centre, parsemer de fromage râpé, plier en deux et retirer du feu selon la cuisson souhaitée (baveuse ou bien cuite).'
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
      'Dresser le quinoa au fond de deux bols, disposer harmonieusement les légumes, émietter la feta par-dessus et assaisonner d’un filet d’huile d’olive, du reste de jus de citron, de sel et de poivre.'
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
      'Dans une poêle bien chaude huilée, faire sauter le poulet 5 minutes à feu vif, puis ajouter les poivrons et l’oignon. Saler et poivrer (ajouter des épices au choix : paprika ou cumin).',
      'Poursuivre la cuisson 5 minutes jusqu’à ce que le poulet soit doré et les légumes fondants. Ajouter la crème fraîche en fin de cuisson.',
      'Passer les galettes de tortillas 20 secondes au micro-ondes ou dans une poêle sèche pour les assouplir.',
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
      'Cuire les œufs dans l’eau bouillante pendant 9 minutes pour obtenir des œufs durs, puis les refroidir sous l’eau froide et les écaler.',
      'Équeuter et cuire les haricots verts à l’eau bouillante salée pendant 8 à 10 minutes (ils doivent rester croquants), puis les passer à l’eau glacée pour préserver leur couleur verte.',
      'Laver et couper les tomates en quartiers.',
      'Égoutter le thon et l’émietter grossièrement à la fourchette.',
      'Disposer les haricots, les quartiers de tomates, le thon, les olives et les œufs coupés en deux dans un plat. Arroser d’une vinaigrette à l’huile d’olive.'
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
      'Dans une poêle chaude légèrement huilée, déposer les pavés de saumon côté peau. Cuire 4 à 5 minutes sans y toucher pour rendre la peau croustillante.',
      'Retourner délicatement les pavés, arroser avec la sauce soja et un trait de jus de citron, puis prolonger la cuisson de 3 minutes à feu modéré.',
      'Servir le saumon chaud nappé de son jus réduit, accompagné du riz égoutté et des fleuretons de brocoli.'
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
      'Nettoyer les champignons et les couper en lamelles. Émincer l’oignon. Couper le poulet en gros morceaux réguliers.',
      'Faire dorer le poulet dans une poêle chaude avec un peu de matière grasse pendant 5 à 6 minutes. Réserver dans une assiette.',
      'Dans la même poêle, faire suer l’oignon puis ajouter les champignons à feu vif jusqu’à évaporation de leur eau.',
      'Remettre le poulet, verser la crème fraîche, assaisonner de sel et de poivre, et laisser mijoter à feu doux pendant 6 à 8 minutes jusqu’à ce que la sauce nappe la cuillère. Servir avec le riz.'
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
      'Émincer l’oignon et râper les gousses d’ail.',
      'Faire revenir l’oignon dans une sauteuse huilée pendant 3 minutes, ajouter l’ail et le curry en poudre, remuer 30 secondes pour libérer les arômes.',
      'Rincer et égoutter les pois chiches en boîte, puis les ajouter dans la sauteuse.',
      'Verser les tomates concassées et le lait de coco, saler, poivrer et laisser mijoter à feu doux pendant 15 minutes. Servir bien chaud sur le riz.'
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
      'Faire précuire les rondelles de courgettes à la poêle avec un filet d’huile pendant 7 à 8 minutes pour leur faire rendre un maximum d’eau.',
      'Dans un plat à gratin, alterner une couche de courgettes, des lanières de jambon blanc et un peu de crème fraîche salée et poivrée.',
      'Recouvrir généreusement de fromage râpé et enfourner pour 20 à 25 minutes jusqu’à ce que le gratin soit bien doré et bouillonnant.'
    ],
