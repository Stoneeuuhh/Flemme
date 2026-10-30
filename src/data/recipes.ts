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
      'Préchauffer le four à 200°C. Cuire les pommes de terre pelées et coupées en morceaux dans l’eau bouillante pendant 15 minutes.',
      'Détailler la courgette en tagliatelles fines (à l’économe) et couper les tomates cerises en deux.',
      'Sur deux grandes feuilles de papier cuisson, déposer un lit de courgettes et quelques tomates cerises.',
      'Poser un dos de cabillaud au centre de chaque lit, saler, poivrer, ajouter une rondelle de citron et un filet d’huile d’olive.',
      'Fermer hermétiquement les papillotes en rabattant les bords et enfourner 15 minutes. Servir directement dans la papillote avec les pommes de terre.'
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
      'Dans la même sauteuse, faire suer l’oignon finement émincé, puis ajouter le riz arborio sec. Mélanger 2 minutes jusqu’à ce que les grains deviennent translucides.',
      'Verser une louche de bouillon chaud. Attendre l’absorption complète en remuant régulièrement avant d’ajouter la louche suivante. Répéter l’opération pendant environ 18 minutes.',
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
      'Préparer la béchamel : faire fondre le beurre dans une casserole, ajouter la farine en fouettant pendant 1 minute, puis verser le lait petit à petit en fouettant continuellement à feu moyen jusqu’à épaississement.',
      'Préchauffer le four à 180°C.',
      'Dans un plat à gratin, napper le fond d’une fine couche de béchamel, disposer une couche de pâte, de la bolognaise, de la béchamel et un peu de fromage. Répéter sur 3 étages.',
      'Terminer par une généreuse couche de béchamel et le restant de fromage râpé. Enfourner 30 minutes jusqu’à ce que le dessus soit gratiné.'
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
      'Couper la viande de bœuf en cubes réguliers de taille moyenne. Émincer les oignons et couper les carottes en rondelles épaisses.',
      'Dans une cocotte avec un peu d’huile, saisir les morceaux de viande à feu très vif pour bien les dorer sur toutes les faces. Saler et poivrer.',
      'Ajouter les oignons et les gousses d’ail écrasées, laisser suer 3 minutes, puis saupoudrer d’une cuillère à soupe de farine et bien mélanger.',
      'Mouiller avec le vin rouge et ajouter un demi-verre d’eau pour couvrir la viande. Ajouter les rondelles de carottes.',
      'Couvrir et laisser mijoter à feu très doux au moins 45 minutes (ou plus si possible). Cuire les pommes de terre à l’eau à part et servir en accompagnement.'
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
      'Laver soigneusement le potimarron (inutile de l’éplucher, sa peau s’adoucit à la cuisson), retirer les graines et le couper en cubes. Peler et couper les pommes de terre en morceaux.',
      'Dans une grande marmite, faire revenir l’oignon émincé dans un peu de matière grasse pendant 3 minutes.',
      'Ajouter les cubes de potimarron et de pommes de terre, puis verser le bouillon de légumes chaud jusqu’à hauteur des légumes.',
      'Porter à ébullition, couvrir et laisser cuire 20 minutes à feu moyen jusqu’à ce que la chair soit très tendre sous la pointe d’un couteau.',
      'Mixer finement à l’aide d’un mixeur plongeant en incorporant la crème fraîche. Rectifier l’assaisonnement en sel et poivre.'
    ],
    tip: 'Inutile d’éplucher le potimarron : sa peau cuit très bien et donne une couleur orange encore plus intense.'
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
      'Cuire les pommes de terre entières avec la peau dans une grande casserole d’eau bouillante salée pendant 20 minutes. Les laisser tiédir, les peler et les couper en rondelles.',
      'Préchauffer le four à 200°C.',
      'Dans une poêle, faire dorer les lardons avec l’oignon émincé pendant environ 6 minutes. Égoutter le trop-plein de matière grasse.',
      'Dans un plat à gratin, mélanger les rondelles de pommes de terre, les oignons, les lardons et la crème fraîche. Poivrer (le sel des lardons suffit généralement).',
      'Couper le reblochon en deux dans l’épaisseur et le déposer sur le dessus du plat, croûte vers le haut. Enfourner pour 20 minutes jusqu’à ce que le fromage soit totalement fondu et gratiné.'
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
      'Nettoyer soigneusement les poireaux pour ôter toute trace de terre et les émincer en rondelles. Éplucher les pommes de terre et les couper en dés.',
      'Faire fondre une noisette de beurre ou d’huile dans un faitout et y faire suer les blancs et verts de poireaux pendant 5 minutes sans coloration.',
      'Ajouter les dés de pommes de terre et mouiller avec le bouillon de légumes chaud.',
      'Couvrir et laisser mijoter à petits bouillons pendant 20 minutes.',
      'Mixer jusqu’à obtention d’une texture lisse et veloutée. Incorporer la crème fraîche, assaisonner de poivre et servir bien chaud.'
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
      'Laver les légumes. Couper les tomates en gros morceaux. Peler le concombre et le tronçonner. Épépiner le poivron et le tailler grossièrement.',
      'Déposer tous les légumes dans le bol d’un blender avec la gousse d’ail dégermée.',
      'Ajouter l’huile d’olive, une pincée de sel, un tour de moulin à poivre (et un trait de vinaigre de xérès si disponible).',
      'Mixer à puissance maximale pendant 2 minutes jusqu’à l’obtention d’un liquide parfaitement homogène.',
      'Placer au réfrigérateur pendant au moins 1 heure pour servir très frais.'
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
      'Couper tous les légumes (courgettes, aubergine, poivron, tomates) en dés de taille régulière. Émincer l’oignon et hacher l’ail.',
      'Dans une grande sauteuse avec de l’huile d’olive, faire revenir d’abord les aubergines et les poivrons pendant 7 à 8 minutes.',
      'Ajouter les courgettes, l’oignon et l’ail. Poursuivre la cuisson 5 minutes.',
      'Ajouter enfin les tomates, saler, poivrer et laisser compoter à feu doux et à couvert pendant 25 minutes en remuant régulièrement.',
      'Pendant ce temps, cuire le riz dans l’eau bouillante salée et le servir en lit sous la ratatouille fondante.'
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
      'Cuire les pâtes dans l’eau bouillante salée en les gardant bien fermes. Les égoutter puis les passer sous l’eau très froide pour stopper la cuisson et les refroidir.',
      'Couper les tomates cerises en deux et égoutter la boule de mozzarella avant de la découper en petits dés.',
      'Dans un grand saladier, réunir les pâtes refroidies, les dés de mozzarella, les tomates cerises et les olives.',
      'Ciseler généreusement le basilic frais sur le dessus.',
      'Arroser d’un bon filet d’huile d’olive, saler, poivrer et mélanger délicatement avant de réserver au frais.'
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
      'Casser le bout fibreux des asperges vertes. Les faire cuire dans une eau bouillante salée pendant 6 à 8 minutes (la pointe d’un couteau doit s’enfoncer facilement tout en gardant une légère tenue).',
      'Plonger les 4 œufs dans l’eau bouillante pendant 6 minutes précises pour obtenir des œufs mollets au cœur coulant, puis les plonger aussitôt dans de l’eau très froide avant de les écaler avec précaution.',
      'Égoutter les asperges et les disposer tièdes sur les assiettes.',
      'Poser délicatement deux œufs mollets par assiette et les fendre légèrement au couteau.',
      'Saupoudrer de copeaux de parmesan, assaisonner de fleur de sel, de poivre du moulin et d’un filet de jus de citron.'
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
      'Dans une sauteuse, faire dorer les lardons à sec avec l’oignon émincé pendant 5 minutes.',
      'Ajouter les petits pois (frais ou surgelés) et mélanger.',
      'Verser un demi-verre d’eau, couvrir et laisser mijoter à feu doux pendant 10 à 12 minutes jusqu’à ce que les petits pois soient fondants.',
      'Égoutter le riz et le mélanger directement dans la sauteuse avec les petits pois et les lardons, rectifier le poivre et servir chaud.'
    ]
  },
];
