import { Category, Recipe, GlossaryTerm, HomepageContent } from '@/types';

export const initialCategories: Category[] = [
  {
    id: 'cat_breakfast',
    slug: 'breakfast',
    name: { en: 'Breakfast', te: 'అల్పాహారం' },
    description: {
      en: 'Energizing morning staples from crispy dosas to fluffy idlis and warm poha.',
      te: 'రుచికరమైన ఉదయపు అల్పాహారాలు: దోశలు, ఇడ్లీలు మరియు ఉప్మా.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    recipeCount: 12,
    order: 1,
    featured: true,
    mealType: 'breakfast',
    subcategories: ['Dosa', 'Idli', 'Upma', 'Paratha', 'Puri', 'Poha'],
  },
  {
    id: 'cat_lunch',
    slug: 'lunch',
    name: { en: 'Lunch', te: 'మధ్యాహ్న భోజనం' },
    description: {
      en: 'Wholesome rice bowls, aromatic biryanis, soothing dals, and hearty curries.',
      te: 'పరిపూర్ణ మధ్యాహ్న భోజన వంటకాలు: బిర్యానీ, పప్పు, సాంబారు మరియు కూరలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    recipeCount: 18,
    order: 2,
    featured: true,
    mealType: 'lunch',
    subcategories: ['Biryani', 'Pulao', 'Curries', 'Dal & Sambar', 'Rice Specials'],
  },
  {
    id: 'cat_snacks',
    slug: 'snacks',
    name: { en: 'Snacks', te: 'సాయంత్రపు స్నాక్స్' },
    description: {
      en: 'Crunchy evening delights like onion pakodas, piping hot samosas, and punugulu.',
      te: 'సాయంత్రపు వేడివేడి చిరుతిళ్లు: పకోడీలు, సమోసాలు మరియు బజ్జీలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    recipeCount: 14,
    order: 3,
    featured: true,
    mealType: 'snacks',
    subcategories: ['Pakoda', 'Bajji', 'Samosa', 'Chaat', 'Cutlets'],
  },
  {
    id: 'cat_dinner',
    slug: 'dinner',
    name: { en: 'Dinner', te: 'రాత్రి భోజనం' },
    description: {
      en: 'Light, comforting night-time curries, soft rotis, fragrant pulao, and soups.',
      te: 'తేలికైన మరియు పోషకమైన రాత్రి భోజనాలు: చపాతీలు, పనీర్ కర్రీ మరియు రోటీలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    recipeCount: 15,
    order: 4,
    featured: true,
    mealType: 'dinner',
    subcategories: ['Roti & Chapati', 'Paneer Special', 'Light Soups', 'Fried Rice'],
  },
  {
    id: 'cat_starters',
    slug: 'starters',
    name: { en: 'Starters', te: 'స్టార్టర్స్' },
    description: {
      en: 'Tantalizing appetizers like Paneer Tikka, Gobi 65, and Crispy Corn.',
      te: 'నోరూరించే స్టార్టర్లు: పనీర్ టిక్కా, గోబీ 65 మరియు క్రిస్పీ కార్న్.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    recipeCount: 10,
    order: 5,
    featured: true,
    mealType: 'starters',
    subcategories: ['Tandoori', 'Crispy Fries', 'Indo-Chinese'],
  },
  {
    id: 'cat_desserts',
    slug: 'desserts',
    name: { en: 'Desserts', te: 'మిఠాయిలు & స్వీట్స్' },
    description: {
      en: 'Irresistible sweets: melt-in-mouth Gulab Jamun, rich Payasam, and Halwa.',
      te: 'నోరూరించే తీపి వంటకాలు: గులాబ్ జామున్, పాయసం మరియు హల్వా.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    recipeCount: 11,
    order: 6,
    featured: true,
    mealType: 'desserts',
    subcategories: ['Traditional Sweets', 'Halwa', 'Payasam & Kheer'],
  },
  {
    id: 'cat_drinks',
    slug: 'drinks',
    name: { en: 'Drinks', te: 'పానీయాలు' },
    description: {
      en: 'Refreshing South Indian Filter Coffee, spiced Masala Chai, and coolers.',
      te: 'రిఫ్రెషింగ్ ఫిల్టర్ కాఫీ, మసాలా టీ మరియు చల్లని పానీయాలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    recipeCount: 8,
    order: 7,
    mealType: 'drinks',
  },
  {
    id: 'cat_chutneys',
    slug: 'chutneys-pickles',
    name: { en: 'Chutneys & Pickles', te: 'చట్నీలు & పచ్చళ్ళు' },
    description: {
      en: 'Zesty accompaniment chutneys and traditional sun-kissed Indian pickles.',
      te: 'రుచికరమైన కొబ్బరి, పల్లీ చట్నీలు మరియు సాంప్రదాయ పచ్చళ్లు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    recipeCount: 9,
    order: 8,
    mealType: 'chutneys-pickles',
  },
  {
    id: 'cat_healthy',
    slug: 'healthy-food',
    name: { en: 'Healthy Food', te: 'ఆరోగ్యకరమైన ఆహారం' },
    description: {
      en: 'High-protein, low-oil, fiber-rich millet bowls, and vibrant salads.',
      te: 'పోషకాలు నిండిన చిరుధాన్యాలు, సలాడ్లు మరియు తక్కువ నూనె వంటకాలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    recipeCount: 7,
    order: 9,
    mealType: 'healthy',
  },
  {
    id: 'cat_occasions',
    slug: 'special-occasions',
    name: { en: 'Special Occasions', te: 'పండుగ ప్రత్యేక వంటకాలు' },
    description: {
      en: 'Festival feasts for Sankranti, Diwali, Ugadi, and special family gatherings.',
      te: 'సంక్రాంతి, దీపావళి మరియు ఉగాది పండుగల పవిత్ర సాంప్రదాయ వంటకాలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80',
    recipeCount: 6,
    order: 10,
    mealType: 'special-occasions',
  },
];

export const initialRecipes: Recipe[] = [
  {
    id: 'rec_paneer_butter_masala',
    slug: 'paneer-butter-masala',
    title: {
      en: 'Paneer Butter Masala',
      te: 'పనీర్ బటర్ మసాలా'
    },
    description: {
      en: 'Velvety, rich restaurant-style tomato butter gravy with succulent cottage cheese cubes and fragrant kasuri methi.',
      te: 'రుచికరమైన రెస్టారెంట్ స్టైల్ పనీర్ బటర్ మసాలా కర్రీ. రోటీలు మరియు నాన్‌లతో అద్భుతంగా ఉంటుంది.'
    },
    categoryId: 'cat_dinner',
    subcategoryId: 'Paneer Special',
    cuisine: 'North Indian',
    dietaryType: 'vegetarian',
    difficulty: 'medium',
    preparationTime: 15,
    cookingTime: 25,
    totalTime: 40,
    defaultServings: 2,
    coverImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 380,
    beginnerFriendly: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 142,
    published: true,
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-02-10T14:30:00.000Z',
    tags: ['paneer', 'gravy', 'restaurant-style', 'dinner', 'comfort food'],
    equipment: ['Heavy-bottom pan or Kadai', 'Blender', 'Spatula', 'Measuring spoons', 'Chef knife'],
    ingredients: [
      { id: 'ing_1', name: { en: 'Paneer (Cottage Cheese)', te: 'పనీర్' }, quantity: 200, unit: 'g', notes: 'Cut into bite-sized 1-inch cubes' },
      { id: 'ing_2', name: { en: 'Ripe Tomatoes', te: 'టమాటాలు' }, quantity: 4, unit: 'medium', notes: 'Roughly chopped for puree' },
      { id: 'ing_3', name: { en: 'Onion', te: 'ఉల్లిపాయ' }, quantity: 1, unit: 'large', notes: 'Finely sliced' },
      { id: 'ing_4', name: { en: 'Butter', te: 'వెన్న' }, quantity: 2, unit: 'tbsp', notes: 'Salted or unsalted' },
      { id: 'ing_5', name: { en: 'Cooking Oil', te: 'వంట నూనె' }, quantity: 1, unit: 'tbsp' },
      { id: 'ing_6', name: { en: 'Ginger-Garlic Paste', te: 'అల్లం-వెల్లుల్లి పేస్ట్' }, quantity: 1, unit: 'tbsp', notes: 'Freshly ground preferred' },
      { id: 'ing_7', name: { en: 'Cashews', te: 'జీడిపప్పు' }, quantity: 12, unit: 'whole', notes: 'Soaked in warm water for 10 mins' },
      { id: 'ing_8', name: { en: 'Kashmiri Red Chilli Powder', te: 'కశ్మీరీ కారం' }, quantity: 1.5, unit: 'tsp', notes: 'Gives rich red color without high heat' },
      { id: 'ing_9', name: { en: 'Garam Masala', te: 'గరం మసాలా' }, quantity: 0.5, unit: 'tsp' },
      { id: 'ing_10', name: { en: 'Kasuri Methi (Dried Fenugreek)', te: 'కసూరి మేథి' }, quantity: 1, unit: 'tsp', notes: 'Crushed between palms' },
      { id: 'ing_11', name: { en: 'Fresh Cream', te: 'ఫ్రెష్ క్రీమ్' }, quantity: 2, unit: 'tbsp' },
      { id: 'ing_12', name: { en: 'Salt', te: 'ఉప్పు' }, quantity: 1, unit: 'tsp', notes: 'Adjust to taste' },
    ],
    alternatives: [
      { original: 'Paneer', substitute: 'Firm Tofu', note: 'Makes the dish 100% vegan. Press tofu before cubing.' },
      { original: 'Cashews', substitute: 'Watermelon seeds (Magaz) or Almonds', note: 'Provides similar rich creaminess for nut-sensitive diets.' },
      { original: 'Fresh Cream', substitute: 'Coconut milk', note: 'Lends a subtle sweet undertone and dairy-free velvet finish.' }
    ],
    tips: [
      'Do not fry paneer cubes hard; soaking them in warm salted water for 5 minutes keeps them pillowy soft.',
      'Blend the tomato and cashew paste into an ultra-smooth silk puree for authentic restaurant mouthfeel.',
      'Always rub Kasuri Methi between your palms right before sprinkling to awaken its aromatic oils.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Prepare Aromatics & Puree', te: 'టమాటా మరియు జీడిపప్పు పేస్ట్ సిద్ధం చేసుకోండి' },
        instructions: [
          'Soak 12 cashews in 1/4 cup warm water for 10 minutes.',
          'In a blender jar, combine roughly chopped tomatoes and soaked cashews.',
          'Blend on high until silky smooth without any grainy bits.',
          'Cut paneer into neat 1-inch cubes and keep aside.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 5,
        timerSeconds: null,
        tips: ['If your blender is warm, wait 2 minutes before blending hot aromatics to prevent steam splatter.'],
        warnings: ['Hold down blender lid securely with a kitchen towel while operating.']
      },
      {
        order: 2,
        title: { en: 'Saute Aromatics & Onion Base', te: 'ఉల్లిపాయలు మరియు మసాలాలు వేయించండి' },
        instructions: [
          'Place your heavy-bottom pan over medium heat.',
          'Add 1 tablespoon of butter and 1 tablespoon of cooking oil (oil prevents butter from scorching).',
          'Add finely sliced onions and sauté for 4-5 minutes until golden and translucent.',
          'Add 1 tablespoon ginger-garlic paste and sauté for 1 minute until raw aroma dissipates.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 6,
        timerSeconds: 300,
        tips: ['A pinch of salt over onions draws out moisture and browns them evenly.'],
        warnings: ['Keep heat on medium. Burnt ginger-garlic paste will turn the gravy bitter.']
      },
      {
        order: 3,
        title: { en: 'Cook Tomato-Cashew Gravy', te: 'టమాటా గ్రేవీని ఉడికించండి' },
        instructions: [
          'Pour the prepared tomato-cashew puree into the pan.',
          'Stir in Kashmiri red chilli powder, turmeric powder, and 1 tsp salt.',
          'Cover with a lid and simmer over medium-low heat for 8 minutes until oil leaves the sides.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 8,
        timerSeconds: 480,
        tips: ['Covering the pan is essential as bubbling cashew gravy spatters easily.'],
        warnings: ['Hot steam will release when removing the lid; open tilting away from your face.']
      },
      {
        order: 4,
        title: { en: 'Add Paneer & Seasonings', te: 'పనీర్ మరియు మసాలా కలపండి' },
        instructions: [
          'Stir in 1/2 cup of warm water to adjust gravy consistency to your liking.',
          'Gently slide in 200g paneer cubes so they do not break.',
          'Add garam masala and 1/2 teaspoon sugar (optional, balances tomato acidity).',
          'Simmer on gentle heat for 3-4 minutes to let the paneer absorb flavours.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 4,
        timerSeconds: 240,
        tips: ['Use a gentle folding motion with your spatula rather than vigorous stirring.'],
      },
      {
        order: 5,
        title: { en: 'Finish with Cream & Kasuri Methi', te: 'క్రీమ్ మరియు కసూరి మేథితో పూర్తి చేయండి' },
        instructions: [
          'Turn off the flame.',
          'Crush 1 teaspoon Kasuri Methi between your palms and scatter over the curry.',
          'Drizzle 2 tablespoons of fresh cream and add the remaining 1 tablespoon of butter.',
          'Gently swirl through and let it rest for 2 minutes before serving.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 2,
        timerSeconds: 120,
        tips: ['Always turn off the stove before adding cream to prevent curdling.']
      }
    ]
  },
  {
    id: 'rec_crispy_masala_dosa',
    slug: 'masala-dosa',
    title: {
      en: 'Crispy Masala Dosa',
      te: 'క్రిస్పీ మసాలా దోశ'
    },
    description: {
      en: 'Golden crispy fermented rice-lentil crepes filled with spiced potato masala, served with coconut chutney and piping hot sambar.',
      te: 'రుచికరమైన మరియు క్రిస్పీ మసాలా దోశ. ఆలూ కుర్మా మరియు కొబ్బరి చట్నీతో అద్భుతమైన రుచి.'
    },
    categoryId: 'cat_breakfast',
    subcategoryId: 'Dosa',
    cuisine: 'South Indian',
    dietaryType: 'vegan',
    difficulty: 'medium',
    preparationTime: 20,
    cookingTime: 20,
    totalTime: 40,
    defaultServings: 2,
    coverImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 320,
    beginnerFriendly: true,
    featured: true,
    rating: 4.95,
    reviewsCount: 210,
    published: true,
    createdAt: '2026-01-10T08:00:00.000Z',
    updatedAt: '2026-02-12T11:00:00.000Z',
    tags: ['dosa', 'south indian', 'breakfast', 'crispy', 'potato masala'],
    equipment: ['Cast iron tawa or non-stick griddle', 'Flat ladle', 'Spatula', 'Potato masher'],
    ingredients: [
      { id: 'ing_d1', name: { en: 'Fermented Dosa Batter', te: 'దోశ పిండి' }, quantity: 3, unit: 'cups', notes: 'Well-fermented at room temperature' },
      { id: 'ing_d2', name: { en: 'Potatoes', te: 'బంగాళాదుంపలు' }, quantity: 3, unit: 'medium', notes: 'Boiled, peeled, and coarsely mashed' },
      { id: 'ing_d3', name: { en: 'Onion', te: 'ఉల్లిపాయ' }, quantity: 1, unit: 'large', notes: 'Thinly sliced' },
      { id: 'ing_d4', name: { en: 'Green Chillies', te: 'పచ్చిమిర్చి' }, quantity: 2, unit: 'pieces', notes: 'Finely slit' },
      { id: 'ing_d5', name: { en: 'Ginger', te: 'అల్లం ముక్క' }, quantity: 1, unit: 'inch', notes: 'Finely minced' },
      { id: 'ing_d6', name: { en: 'Mustard Seeds', te: 'ఆవాలు' }, quantity: 1, unit: 'tsp' },
      { id: 'ing_d7', name: { en: 'Chana Dal (Bengal gram)', te: 'శనగపప్పు' }, quantity: 1, unit: 'tsp' },
      { id: 'ing_d8', name: { en: 'Curry Leaves', te: 'కరివేపాకు' }, quantity: 1, unit: 'sprig', notes: 'Fresh' },
      { id: 'ing_d9', name: { en: 'Turmeric Powder', te: 'పసుపు' }, quantity: 0.5, unit: 'tsp' },
      { id: 'ing_d10', name: { en: 'Oil or Ghee', te: 'నూనె లేదా నెయ్యి' }, quantity: 3, unit: 'tbsp' },
      { id: 'ing_d11', name: { en: 'Salt', te: 'ఉప్పు' }, quantity: 1, unit: 'tsp' },
      { id: 'ing_d12', name: { en: 'Fresh Coriander', te: 'కొత్తిమీర' }, quantity: 2, unit: 'tbsp', notes: 'Chopped' }
    ],
    tips: [
      'Ensure the tawa is hot before pouring batter, but sprinkle cold water and wipe with a cloth right before spreading to regulate surface heat.',
      'Always spread the batter in one continuous spiral from the center outward without lifting the ladle.',
      'Drizzle ghee along the edges for that iconic golden crunch.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Prepare Potato Masala Filling', te: 'బంగాళాదుంప మసాలా తయారు చేయండి' },
        instructions: [
          'Heat 1 tablespoon oil in a pan over medium flame.',
          'Add mustard seeds; once they crackle, add chana dal, curry leaves, and green chillies.',
          'Add sliced onions and minced ginger; sauté until onions turn translucent.',
          'Add turmeric powder and salt, then stir in boiled mashed potatoes with 3 tablespoons water.',
          'Simmer for 3 minutes, garnish with coriander leaves, and keep warm.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 8,
        timerSeconds: 180,
      },
      {
        order: 2,
        title: { en: 'Heat & Temper the Tawa', te: 'పెనాన్ని సిద్ధం చేసుకోండి' },
        instructions: [
          'Heat a cast-iron tawa or heavy griddle over high flame until smoking hot.',
          'Sprinkle a few drops of water; it should sizzle and evaporate instantly.',
          'Wipe clean with a damp cotton cloth or cut onion half dipped in oil.',
          'Lower flame to medium before pouring batter.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 2,
        warnings: ['Splattering water on hot oil causes sizzling droplets; keep safe face distance.']
      },
      {
        order: 3,
        title: { en: 'Spread Batter & Crisp to Golden', te: 'దోశ వేసి ఎర్రగా కాల్చండి' },
        instructions: [
          'Pour a full ladle of dosa batter into the center of the tawa.',
          'Using the back of the ladle, spread in outward concentric circles into a thin crepe.',
          'Drizzle 1 teaspoon of ghee or oil along the outer perimeter and center.',
          'Cook on medium-high flame until the base turns deep golden brown and edges lift naturally.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 3,
        timerSeconds: 150,
      },
      {
        order: 4,
        title: { en: 'Fill Masala & Fold', te: 'మసాలా పెట్టి మడవండి' },
        instructions: [
          'Spoon 2-3 tablespoons of warm potato masala right down the center of the dosa.',
          'Using your spatula, gently fold both sides over the filling or roll into a cylinder.',
          'Slide onto a plate and serve immediately with fresh coconut chutney and hot sambar.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 1,
      }
    ]
  },
  {
    id: 'rec_hyderabadi_biryani',
    slug: 'hyderabadi-biryani',
    title: {
      en: 'Royal Hyderabadi Veg Dum Biryani',
      te: 'హైదరాబాదీ వెజ్ దమ్ బిర్యానీ'
    },
    description: {
      en: 'Fragrant long-grain basmati rice layered with spiced vegetables, saffron milk, fried onions (birista), and slow-cooked in traditional dum sealed pot.',
      te: 'సుగంధ ద్రవ్యాలు మరియు బాస్మతి బియ్యంతో తయారుచేసిన ప్రామాణిక హైదరాబాద్ వెజ్ దమ్ బిర్యానీ.'
    },
    categoryId: 'cat_lunch',
    subcategoryId: 'Biryani',
    cuisine: 'Hyderabadi',
    dietaryType: 'vegetarian',
    difficulty: 'hard',
    preparationTime: 25,
    cookingTime: 35,
    totalTime: 60,
    defaultServings: 4,
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 450,
    beginnerFriendly: false,
    featured: true,
    rating: 4.98,
    reviewsCount: 340,
    published: true,
    createdAt: '2026-01-05T12:00:00.000Z',
    updatedAt: '2026-02-14T09:00:00.000Z',
    tags: ['biryani', 'hyderabadi', 'rice', 'dum', 'celebration', 'lunch'],
    equipment: ['Heavy-bottom Biryani Handi with tight lid', 'Wide colander', 'Frying pan', 'Foil or dough seal'],
    ingredients: [
      { id: 'ing_b1', name: { en: 'Aged Basmati Rice', te: 'బాస్మతి బియ్యం' }, quantity: 2, unit: 'cups', notes: 'Washed and soaked for 30 minutes' },
      { id: 'ing_b2', name: { en: 'Mixed Vegetables (Carrot, Beans, Peas, Potato)', te: 'మిశ్రమ కూరగాయలు' }, quantity: 2.5, unit: 'cups', notes: 'Diced evenly' },
      { id: 'ing_b3', name: { en: 'Curd / Plain Yogurt', te: 'పెరుగు' }, quantity: 0.75, unit: 'cup', notes: 'Whisked smooth' },
      { id: 'ing_b4', name: { en: 'Fried Onions (Birista)', te: 'వేయించిన ఉల్లిపాయలు' }, quantity: 1, unit: 'cup', notes: 'Crispy deep brown' },
      { id: 'ing_b5', name: { en: 'Biryani Masala Powder', te: 'బిర్యానీ మసాలా' }, quantity: 1.5, unit: 'tbsp' },
      { id: 'ing_b6', name: { en: 'Whole Spices (Cardamom, Cloves, Bay leaf, Cinnamon)', te: 'బిర్యానీ దినుసులు' }, quantity: 1, unit: 'set' },
      { id: 'ing_b7', name: { en: 'Saffron strands soaked in 3 tbsp warm milk', te: 'కుంకుమపువ్వు పాలు' }, quantity: 1, unit: 'portion' },
      { id: 'ing_b8', name: { en: 'Pure Desi Ghee', te: 'నెయ్యి' }, quantity: 3, unit: 'tbsp' },
      { id: 'ing_b9', name: { en: 'Fresh Mint & Coriander leaves', te: 'పుదీనా మరియు కొత్తిమీర' }, quantity: 0.5, unit: 'cup', notes: 'Finely chopped' },
      { id: 'ing_b10', name: { en: 'Ginger Garlic Paste', te: 'అల్లం వెల్లుల్లి పేస్ట్' }, quantity: 1.5, unit: 'tbsp' },
      { id: 'ing_b11', name: { en: 'Salt', te: 'ఉప్పు' }, quantity: 2, unit: 'tsp' }
    ],
    tips: [
      'Cook the basmati rice only up to 70% in rolling boiling water before draining; it finishes cooking inside the dum steam.',
      'Place a flat tawa underneath your biryani pot during dum to distribute heat uniformly and prevent rice scorching at the bottom.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Marinate the Vegetables', te: 'కూరగాయలను మ్యారినేట్ చేయండి' },
        instructions: [
          'In a large mixing bowl, combine diced vegetables, whisked curd, ginger-garlic paste, biryani masala, red chilli powder, mint, coriander, half the fried onions, and 1 tsp salt.',
          'Mix thoroughly until every vegetable piece is coated.',
          'Rest for 20 minutes while you boil water for rice.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 20,
        timerSeconds: 1200,
      },
      {
        order: 2,
        title: { en: 'Boil Rice to 70% Doneness', te: 'బియ్యాన్ని 70% ఉడికించండి' },
        instructions: [
          'Bring 6 cups of water to a vigorous boil with bay leaf, cloves, cinnamon, and 1 tbsp salt.',
          'Add drained soaked basmati rice.',
          'Cook on high flame for exactly 5 minutes until the grain breaks into three parts when pinched between fingers.',
          'Immediately drain in a wide colander.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 6,
        timerSeconds: 300,
        warnings: ['Do not overboil rice in water or the biryani will turn mushy during dum.']
      },
      {
        order: 3,
        title: { en: 'Layer and Dum Seal', te: 'లేయరింగ్ చేసి దమ్ పెట్టండి' },
        instructions: [
          'In your heavy pot, spread the marinated vegetables evenly as the bottom foundation.',
          'Spread the 70% cooked hot rice evenly on top.',
          'Drizzle saffron milk, remaining fried onions, chopped mint, and 3 tablespoons desi ghee across the top layer.',
          'Seal the rim with aluminium foil and press the heavy lid down firmly to lock all aromatics.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 5,
      },
      {
        order: 4,
        title: { en: 'Slow Dum Cooking & Rest', te: 'తక్కువ మంటపై దమ్ ఉడికించండి' },
        instructions: [
          'Cook over high flame for 5 minutes, then transfer the pot onto a heated iron tawa.',
          'Simmer on the lowest flame for 18 minutes.',
          'Turn off flame and let it rest undisturbed for 10 minutes before gently fluffing with a flat spoon from the bottom.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 28,
        timerSeconds: 1080,
      }
    ]
  },
  {
    id: 'rec_tomato_pappu',
    slug: 'andhra-tomato-pappu',
    title: {
      en: 'Andhra Tomato Pappu (Dal)',
      te: 'ఆంధ్ర టమాటా పప్పు'
    },
    description: {
      en: 'Tangy, comforting toor dal stewed with ripe country tomatoes, flavoured with garlic cloves, cumin, and fiery ghee tadka.',
      te: 'కమ్మని ఆంధ్ర టమాటా పప్పు. వేడి అన్నం మరియు నెయ్యితో తింటే ఎంతో రుచిగా ఉంటుంది.'
    },
    categoryId: 'cat_lunch',
    subcategoryId: 'Dal & Sambar',
    cuisine: 'Andhra',
    dietaryType: 'vegan',
    difficulty: 'easy',
    preparationTime: 10,
    cookingTime: 20,
    totalTime: 30,
    defaultServings: 3,
    coverImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 210,
    beginnerFriendly: true,
    featured: true,
    rating: 4.88,
    reviewsCount: 95,
    published: true,
    createdAt: '2026-01-20T11:00:00.000Z',
    updatedAt: '2026-02-15T15:00:00.000Z',
    tags: ['dal', 'andhra', 'comfort food', 'lunch', 'pappu', 'easy'],
    equipment: ['Pressure Cooker or Pot', 'Tadka pan', 'Dal masher (Pappu gutti)'],
    ingredients: [
      { id: 'ing_p1', name: { en: 'Toor Dal (Pigeon Pea)', te: 'కందిపప్పు' }, quantity: 1, unit: 'cup', notes: 'Rinsed well' },
      { id: 'ing_p2', name: { en: 'Tomatoes', te: 'టమాటాలు' }, quantity: 3, unit: 'large', notes: 'Chopped' },
      { id: 'ing_p3', name: { en: 'Green Chillies', te: 'పచ్చిమిర్చి' }, quantity: 3, unit: 'pieces' },
      { id: 'ing_p4', name: { en: 'Garlic Cloves', te: 'వెల్లుల్లి రెబ్బలు' }, quantity: 6, unit: 'cloves', notes: 'Lightly crushed' },
      { id: 'ing_p5', name: { en: 'Mustard Seeds & Cumin', te: 'ఆవాలు మరియు జీలకర్ర' }, quantity: 1, unit: 'tsp' },
      { id: 'ing_p6', name: { en: 'Dry Red Chillies', te: 'ఎండుమిర్చి' }, quantity: 2, unit: 'pieces' },
      { id: 'ing_p7', name: { en: 'Curry Leaves', te: 'కరివేపాకు' }, quantity: 1, unit: 'sprig' },
      { id: 'ing_p8', name: { en: 'Turmeric Powder', te: 'పసుపు' }, quantity: 0.5, unit: 'tsp' },
      { id: 'ing_p9', name: { en: 'Ghee or Sesame Oil', te: 'నెయ్యి లేదా నూనె' }, quantity: 1.5, unit: 'tbsp' },
      { id: 'ing_p10', name: { en: 'Salt', te: 'ఉప్పు' }, quantity: 1, unit: 'tsp' }
    ],
    tips: [
      'Crushing garlic cloves with skins intact creates that traditional aromatic Andhra kitchen fragrance during tempering.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Pressure Cook Dal & Tomatoes', te: 'పప్పు మరియు టమాటాలను ఉడికించండి' },
        instructions: [
          'In a pressure cooker, add rinsed toor dal, 2.5 cups water, chopped tomatoes, green chillies, and turmeric powder.',
          'Pressure cook for 4 whistles over medium flame until dal is completely tender.',
          'Allow steam to release naturally, then mash smoothly with salt using a dal masher.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 15,
        timerSeconds: 900,
      },
      {
        order: 2,
        title: { en: 'Prepare Sizzling Tadka (Popu)', te: 'ఘుమఘుమలాడే తాళింపు వేయండి' },
        instructions: [
          'Heat ghee or oil in a small tempering pan.',
          'Add mustard seeds, cumin seeds, crushed garlic, dry red chillies, and curry leaves.',
          'Fry for 45 seconds until garlic turns golden brown and aroma fills the kitchen.',
          'Pour sizzling tadka into mashed dal immediately, cover with lid for 2 minutes to lock aroma, and serve.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 5,
        timerSeconds: 60,
      }
    ]
  },
  {
    id: 'rec_gulab_jamun',
    slug: 'gulab-jamun',
    title: {
      en: 'Melt-in-Mouth Gulab Jamun',
      te: 'నోరూరించే గులాబ్ జామున్'
    },
    description: {
      en: 'Traditional golden fried milk solids dumplings soaked in fragrant cardamom and rose scented warm sugar syrup.',
      te: 'నోట్లో వేస్తే కరిగిపోయే మృదువైన గులాబ్ జామున్. పండుగలకు మరియు వేడుకలకు ఎంతో ప్రత్యేకం.'
    },
    categoryId: 'cat_desserts',
    subcategoryId: 'Traditional Sweets',
    cuisine: 'Indian',
    dietaryType: 'vegetarian',
    difficulty: 'medium',
    preparationTime: 15,
    cookingTime: 20,
    totalTime: 35,
    defaultServings: 4,
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 280,
    beginnerFriendly: true,
    featured: true,
    rating: 4.96,
    reviewsCount: 180,
    published: true,
    createdAt: '2026-01-25T14:00:00.000Z',
    updatedAt: '2026-02-16T12:00:00.000Z',
    tags: ['dessert', 'sweet', 'festival', 'celebration', 'diwali special'],
    equipment: ['Deep frying kadai', 'Wide saucepan for syrup', 'Slotted spoon'],
    ingredients: [
      { id: 'ing_g1', name: { en: 'Khoya / Milk Powder Mix', te: 'కోవా లేదా మిల్క్ పౌడర్' }, quantity: 1, unit: 'cup' },
      { id: 'ing_g2', name: { en: 'All-Purpose Flour (Maida)', te: 'మైదా పిండి' }, quantity: 3, unit: 'tbsp' },
      { id: 'ing_g3', name: { en: 'Milk', te: 'పాలు' }, quantity: 4, unit: 'tbsp', notes: 'Lukewarm, as needed to form soft dough' },
      { id: 'ing_g4', name: { en: 'Sugar', te: 'పంచదార' }, quantity: 1.5, unit: 'cups' },
      { id: 'ing_g5', name: { en: 'Water', te: 'నీరు' }, quantity: 1.5, unit: 'cups' },
      { id: 'ing_g6', name: { en: 'Green Cardamom Pods', te: 'యాలకులు' }, quantity: 4, unit: 'pods', notes: 'Crushed' },
      { id: 'ing_g7', name: { en: 'Rose Water', te: 'గులాబీ నీరు' }, quantity: 1, unit: 'tsp' },
      { id: 'ing_g8', name: { en: 'Ghee or Oil for deep frying', te: 'నెయ్యి లేదా నూనె' }, quantity: 2, unit: 'cups' }
    ],
    tips: [
      'Do not knead the dough hard like chapati dough; gently bring together with finger tips to avoid rubbery jamuns.',
      'Fry on low flame. Frying on high flame darkens the exterior while keeping the center raw and dense.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Prepare Cardamom Sugar Syrup', te: 'పంచదార పాకం తయారు చేయండి' },
        instructions: [
          'In a wide saucepan, mix 1.5 cups sugar and 1.5 cups water.',
          'Bring to a boil on medium flame, stirring until sugar dissolves completely.',
          'Add crushed cardamoms and simmer for 5 minutes until syrup turns slightly sticky (half-string consistency).',
          'Turn off flame, stir in rose water, and keep syrup warm.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 8,
        timerSeconds: 300,
      },
      {
        order: 2,
        title: { en: 'Shape Crack-Free Jamuns', te: 'పగుళ్లు లేకుండా ఉండలు చేయండి' },
        instructions: [
          'In a bowl, mix milk powder and flour.',
          'Sprinkle milk tablespoon by tablespoon to make a soft, smooth, pliable dough.',
          'Divide into smooth bite-sized balls between lightly greased palms without any cracks.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 7,
      },
      {
        order: 3,
        title: { en: 'Gentle Deep Frying', te: 'సన్నని మంటపై వేయించండి' },
        instructions: [
          'Heat ghee or oil in a kadai over gentle low flame.',
          'Slide jamuns into oil; gently swirl oil with ladle without touching jamuns directly.',
          'Fry slowly for 6-8 minutes until evenly deep golden-brown all around.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 8,
        timerSeconds: 420,
        warnings: ['Hot oil splashes: use a long slotted spoon and gently slide balls in.']
      },
      {
        order: 4,
        title: { en: 'Soak in Warm Syrup', te: 'వెచ్చని పాకంలో నానబెట్టండి' },
        instructions: [
          'Drain fried jamuns on paper towel for 30 seconds, then transfer directly into warm sugar syrup.',
          'Allow them to soak for at least 30 minutes to expand and become spongy.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 30,
        timerSeconds: 1800,
      }
    ]
  },
  {
    id: 'rec_crispy_onion_pakoda',
    slug: 'crispy-onion-pakoda',
    title: {
      en: 'Crispy Street-Style Onion Pakoda',
      te: 'కరకరలాడే ఉల్లిపాయ పకోడీ'
    },
    description: {
      en: 'Crunchy golden onion fritters spiced with carom seeds (ajwain), green chillies, and fresh curry leaves. Ideal with hot chai on rainy evenings.',
      te: 'వర్షాకాలపు సాయంత్రం వేడివేడి టీతో ఆస్వాదించే కరకరలాడే ఉల్లిపాయ పకోడీ.'
    },
    categoryId: 'cat_snacks',
    subcategoryId: 'Pakoda',
    cuisine: 'Indian',
    dietaryType: 'vegan',
    difficulty: 'easy',
    preparationTime: 10,
    cookingTime: 15,
    totalTime: 25,
    defaultServings: 3,
    coverImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 240,
    beginnerFriendly: true,
    featured: true,
    rating: 4.92,
    reviewsCount: 160,
    published: true,
    createdAt: '2026-02-01T16:00:00.000Z',
    updatedAt: '2026-02-17T10:00:00.000Z',
    tags: ['pakoda', 'snacks', 'rainy day', 'tea time', 'crispy', 'vegan'],
    equipment: ['Frying Kadai', 'Mixing bowl', 'Slotted spider spoon'],
    ingredients: [
      { id: 'ing_op1', name: { en: 'Onions', te: 'ఉల్లిపాయలు' }, quantity: 3, unit: 'large', notes: 'Thinly sliced lengthwise' },
      { id: 'ing_op2', name: { en: 'Besan (Gram Flour)', te: 'శనగపిండి' }, quantity: 1, unit: 'cup' },
      { id: 'ing_op3', name: { en: 'Rice Flour', te: 'వరిపిండి' }, quantity: 2, unit: 'tbsp', notes: 'Gives unbeatable crunch' },
      { id: 'ing_op4', name: { en: 'Green Chillies', te: 'పచ్చిమిర్చి' }, quantity: 2, unit: 'pieces', notes: 'Finely chopped' },
      { id: 'ing_op5', name: { en: 'Ajwain (Carom seeds)', te: 'వాము' }, quantity: 0.5, unit: 'tsp', notes: 'Crushed between palms' },
      { id: 'ing_op6', name: { en: 'Curry Leaves', te: 'కరివేపాకు' }, quantity: 2, unit: 'sprigs' },
      { id: 'ing_op7', name: { en: 'Cooking Oil for frying', te: 'నూనె' }, quantity: 2, unit: 'cups' },
      { id: 'ing_op8', name: { en: 'Salt', te: 'ఉప్పు' }, quantity: 1, unit: 'tsp' }
    ],
    tips: [
      'Do not add extra water! The salt pulls moisture out of onions, which moistens the flour naturally for ultra-crisp results.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Toss Onions & Spices', te: 'ఉల్లిపాయ ముక్కలు మరియు మసాలా కలపండి' },
        instructions: [
          'In a mixing bowl, separate thinly sliced onions with your fingers.',
          'Add salt, green chillies, crushed ajwain, and curry leaves.',
          'Squeeze and toss vigorously with your fingers for 2 minutes until onions release their natural juices.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 4,
      },
      {
        order: 2,
        title: { en: 'Coat with Flours', te: 'పిండి కలపండి' },
        instructions: [
          'Sprinkle besan and rice flour gradually over the wet onions.',
          'Mix until onions are lightly coated in a dryish batter. Do not add water.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 3,
      },
      {
        order: 3,
        title: { en: 'Fry to Crispy Perfection', te: 'నూనెలో కరకరలాడేలా వేయించండి' },
        instructions: [
          'Heat oil in kadai on medium-high.',
          'Drop loose clusters of onion mixture into hot oil.',
          'Fry for 3-4 minutes until golden, crunchy, and bubbling settles.',
          'Drain on paper towels and enjoy with hot tea.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 5,
        timerSeconds: 240,
      }
    ]
  },
  {
    id: 'rec_filter_coffee',
    slug: 'south-indian-filter-coffee',
    title: {
      en: 'Authentic South Indian Filter Coffee',
      te: 'సాంప్రదాయ ఫిల్టర్ కాఫీ'
    },
    description: {
      en: 'Frothy, intensely aromatic filter coffee brewed with chicory blend and frothered to perfection in traditional brass davarah-tumbler.',
      te: 'ఘుమఘుమలాడే దక్షిణ భారత సాంప్రదాయ డికాక్షన్ ఫిల్టర్ కాఫీ.'
    },
    categoryId: 'cat_drinks',
    subcategoryId: 'Traditional Indian Drinks',
    cuisine: 'South Indian',
    dietaryType: 'vegetarian',
    difficulty: 'easy',
    preparationTime: 5,
    cookingTime: 5,
    totalTime: 10,
    defaultServings: 2,
    coverImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 110,
    beginnerFriendly: true,
    featured: false,
    rating: 4.97,
    reviewsCount: 190,
    published: true,
    createdAt: '2026-02-05T07:00:00.000Z',
    updatedAt: '2026-02-18T08:00:00.000Z',
    tags: ['coffee', 'filter coffee', 'morning', 'drinks', 'south indian'],
    equipment: ['Traditional brass/steel coffee filter', 'Saucepan', 'Davarah and tumbler'],
    ingredients: [
      { id: 'ing_fc1', name: { en: 'Filter Coffee Powder (80:20 Coffee:Chicory)', te: 'ఫిల్టర్ కాఫీ పొడి' }, quantity: 3, unit: 'tbsp' },
      { id: 'ing_fc2', name: { en: 'Boiling Hot Water', te: 'మరుగుతున్న నీరు' }, quantity: 0.75, unit: 'cup' },
      { id: 'ing_fc3', name: { en: 'Whole Milk', te: 'చిక్కని పాలు' }, quantity: 1.5, unit: 'cups', notes: 'Boiled hot' },
      { id: 'ing_fc4', name: { en: 'Sugar', te: 'పంచదార' }, quantity: 2, unit: 'tsp', notes: 'Adjust to taste' }
    ],
    tips: [
      'Gently press the umbrella pressing disc without packing too tightly, allowing slow gravity dripping for rich thick decoction.'
    ],
    steps: [
      {
        order: 1,
        title: { en: 'Brew the Decoction', te: 'డికాక్షన్ సిద్ధం చేయండి' },
        instructions: [
          'Add coffee powder to the top chamber of your filter and level lightly with the pressing disc.',
          'Pour freshly boiled water, cover with the lid, and let it drip for 10-15 minutes undisturbed.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 10,
        timerSeconds: 600,
      },
      {
        order: 2,
        title: { en: 'Froth and Serve (Meter Coffee)', te: 'నురుగు వచ్చేలా కలపండి' },
        instructions: [
          'Boil whole milk until steaming and creamy.',
          'Pour 2 tablespoons strong decoction into a tumbler, add sugar, and pour hot milk.',
          'Pour back and forth between davarah and tumbler from height to create a thick creamy froth and serve piping hot.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 3,
      }
    ]
  },
  {
    id: 'rec_moong_salad',
    slug: 'high-protein-sprouts-salad',
    title: {
      en: 'High-Protein Sprouted Moong Salad',
      te: 'మొలకల ఆరోగ్యకరమైన సలాడ్'
    },
    description: {
      en: 'Nutrient-packed crunchy sprouted green moong beans tossed with cucumber, pomegranate pearls, lemon juice, and chaat spices.',
      te: 'ప్రొటీన్లు మరియు విటమిన్లు నిండిన మొలకెత్తిన పెసల సలాడ్. బరువు తగ్గడానికి మరియు ఆరోగ్యానికి ఎంతో మంచిది.'
    },
    categoryId: 'cat_healthy',
    subcategoryId: 'Salad Recipes',
    cuisine: 'Healthy Fusion',
    dietaryType: 'vegan',
    difficulty: 'easy',
    preparationTime: 10,
    cookingTime: 0,
    totalTime: 10,
    defaultServings: 2,
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=80',
    caloriesPerServing: 160,
    beginnerFriendly: true,
    featured: true,
    rating: 4.85,
    reviewsCount: 78,
    published: true,
    createdAt: '2026-02-08T09:00:00.000Z',
    updatedAt: '2026-02-18T10:00:00.000Z',
    tags: ['healthy', 'salad', 'high-protein', 'weight loss', 'quick', 'raw'],
    equipment: ['Salad bowl', 'Knife and cutting board', 'Citrus squeezer'],
    ingredients: [
      { id: 'ing_ms1', name: { en: 'Sprouted Green Moong', te: 'మొలకెత్తిన పెసలు' }, quantity: 2, unit: 'cups' },
      { id: 'ing_ms2', name: { en: 'Cucumber', te: 'దోసకాయ' }, quantity: 1, unit: 'medium', notes: 'Diced' },
      { id: 'ing_ms3', name: { en: 'Pomegranate Pearls', te: 'దానిమ్మ గింజలు' }, quantity: 0.5, unit: 'cup' },
      { id: 'ing_ms4', name: { en: 'Lemon Juice', te: 'నిమ్మరసం' }, quantity: 1.5, unit: 'tbsp' },
      { id: 'ing_ms5', name: { en: 'Chaat Masala', te: 'చాట్ మసాలా' }, quantity: 0.5, unit: 'tsp' },
      { id: 'ing_ms6', name: { en: 'Pink Salt', te: 'సైంధవ లవణం' }, quantity: 0.5, unit: 'tsp' }
    ],
    tips: ['If you prefer soft sprouts, steam them over boiling water for 3 minutes before tossing.'],
    steps: [
      {
        order: 1,
        title: { en: 'Assemble & Toss Salad', te: 'సలాడ్ పదార్థాలను కలపండి' },
        instructions: [
          'In a large salad bowl, combine fresh sprouts, diced cucumber, and juicy pomegranate pearls.',
          'Drizzle lemon juice, sprinkle chaat masala and salt.',
          'Toss gently with salad tongs and serve immediately for peak crunch.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
        estimatedMinutes: 5,
      }
    ]
  }
];

export const initialGlossaryTerms: GlossaryTerm[] = [
  {
    id: 'term_saute',
    slug: 'saute',
    category: 'technique',
    term: { en: 'Sauté', te: 'సాటే (దోరగా వేయించడం)' },
    definition: {
      en: 'Cooking ingredients quickly in a small amount of hot oil or butter over medium-high heat while stirring frequently.',
      te: 'తక్కువ నూనె లేదా వెన్నలో కూరగాయలను దోరగా వేయించే పద్ధతి.'
    },
    detailedGuide: {
      en: 'Sautéing browns the exterior of foods, unlocking natural sweetness through caramelization without overcooking the inside.',
      te: 'మంటను మధ్యస్థంగా ఉంచి పదార్థాలు మాడకుండా నిరంతరం కలుపుతూ ఉండాలి.'
    },
    examples: ['Sautéing onions until translucent for gravies', 'Sautéing bell peppers for fried rice'],
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'term_simmer',
    slug: 'simmer',
    category: 'technique',
    term: { en: 'Simmer', te: 'సిమ్మర్ (సన్నని మంటపై ఉడికించడం)' },
    definition: {
      en: 'Cooking liquid gently just below boiling point with small, gentle bubbles breaking softly at the surface.',
      te: 'మరుగు స్థాయికి కొంచెం తక్కువగా సన్నని మంటపై నెమ్మదిగా ఉడికించే పద్ధతి.'
    },
    detailedGuide: {
      en: 'Simmering softens vegetables, tenderizes proteins, and melds spices into a harmonious sauce without evaporating liquids too fast.',
      te: 'కూరలు, సాంబారు మరియు పప్పులు చక్కగా ఉడికి రుచి పెరగడానికి ఈ పద్ధతి శ్రేష్ఠమైనది.'
    },
    examples: ['Simmering tomato gravy for 10 minutes', 'Simmering dal with spices'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'term_temper',
    slug: 'temper-tadka',
    category: 'technique',
    term: { en: 'Temper (Tadka / Popu)', te: 'తాళింపు / పోపు' },
    definition: {
      en: 'Frying whole spices and aromatics (like mustard seeds, cumin, garlic, and curry leaves) in hot ghee or oil to extract essential oils, then pouring over the dish.',
      te: 'నూనె లేదా నెయ్యిలో ఆవాలు, జీలకర్ర, ఎండుమిర్చి, కరివేపాకు వేయించి వంటకానికి సువాసన చేకూర్చే ముఖ్యమైన ప్రక్రియ.'
    },
    examples: ['Tadka for Sambar, Dal, or Coconut Chutney'],
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'term_dum',
    slug: 'dum-cooking',
    category: 'technique',
    term: { en: 'Dum (Steam Sealed)', te: 'దమ్ విధానం' },
    definition: {
      en: 'Slow-cooking meats, rice, or vegetables in a sealed heavy pot over gentle embers or low heat so ingredients cook entirely in their own trapped aromatic steam.',
      te: 'ఆవిరి బయటకు పోకుండా మూతను గట్టిగా మూసి సన్నని సెగపై నెమ్మదిగా వండే పురాతన రాజరిక పద్ధతి.'
    },
    examples: ['Hyderabadi Dum Biryani', 'Dum Aloo'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'term_knead',
    slug: 'knead',
    category: 'technique',
    term: { en: 'Knead', te: 'పిండి కలపడం / పిసకడం' },
    definition: {
      en: 'Working dough with the heels of your hands to develop gluten structure for soft chapatis, rotis, or bread.',
      te: 'చేతి మడమలతో పిండిని అదిమి మృదువుగా అయ్యేలా ఒత్తే విధానం.'
    },
    examples: ['Kneading wheat flour dough for fluffy chapatis'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'term_whisk',
    slug: 'whisk',
    category: 'technique',
    term: { en: 'Whisk', te: 'చిలకడం' },
    definition: {
      en: 'Beating ingredients rapidly using a wire whisk or fork to incorporate air and blend smoothly without lumps.',
      te: 'పెరుగు, గుడ్లు లేదా పిండి మిశ్రమాలను ఉండలు లేకుండా ఒకే దిశలో వేగంగా కలపడం.'
    },
    examples: ['Whisking curd for raita or lassi'],
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80'
  }
];

export const initialHomepageContent: HomepageContent = {
  heroHeading: {
    en: 'What would you love to cook today?',
    te: 'ఈరోజు మీరు ఏమి వండాలనుకుంటున్నారు?'
  },
  heroSubheading: {
    en: 'Discover delicious recipes and learn to prepare them one step at a time with interactive checklists and live timers.',
    te: 'రుచికరమైన వంటకాలను కనుగొనండి మరియు దశలవారీగా నేర్చుకోండి.'
  },
  featuredRecipeIds: ['rec_hyderabadi_biryani', 'rec_paneer_butter_masala', 'rec_gulab_jamun'],
  popularRecipeIds: ['rec_paneer_butter_masala', 'rec_crispy_masala_dosa', 'rec_crispy_onion_pakoda', 'rec_tomato_pappu'],
  beginnerFriendlyIds: ['rec_tomato_pappu', 'rec_moong_salad', 'rec_crispy_onion_pakoda', 'rec_filter_coffee'],
  seasonalBanner: {
    title: {
      en: 'Festive & Seasonal Delights',
      te: 'పండుగ ప్రత్యేక వంటకాలు'
    },
    description: {
      en: 'Explore time-honored traditional treats and banquet classics for your family celebrations.',
      te: 'మీ కుటుంబ వేడుకల కోసం అద్భుతమైన సాంప్రదాయ పిండివంటలు.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=1200&auto=format&fit=crop&q=80',
    linkUrl: '/category/special-occasions',
    active: true
  },
  cookingTips: [
    {
      id: 'tip_1',
      title: { en: 'Keep Paneer Soft', te: 'పనీర్ మృదువుగా ఉండేందుకు' },
      content: {
        en: 'Soak paneer cubes in warm water for 5 minutes before adding to gravies to keep them soft and spongy.',
        te: 'గ్రేవీలో వేసే ముందు పనీర్ ముక్కలను గోరువెచ్చని నీటిలో 5 నిమిషాలు నానబెడితే ఎంతో మృదువుగా ఉంటాయి.'
      },
      category: 'Ingredient Prep'
    },
    {
      id: 'tip_2',
      title: { en: 'Crispy Dosa Secret', te: 'క్రిస్పీ దోశ రహస్యం' },
      content: {
        en: 'Sprinkle cold water on a piping hot tawa and wipe with a cloth to regulate temperature before spreading dosa batter.',
        te: 'దోశ వేసే ముందు వేడి పెనంపై చల్లని నీళ్లు చల్లి బట్టతో తుడిస్తే దోశలు క్రిస్పీగా మరియు సమంగా వస్తాయి.'
      },
      category: 'Technique'
    },
    {
      id: 'tip_3',
      title: { en: 'Tadka Splatter Safety', te: 'తాళింపు భద్రత' },
      content: {
        en: 'Keep curry leaves dry before adding to hot oil to prevent explosive oil splattering.',
        te: 'వేడి నూనెలో వేసే ముందు కరివేపాకుపై నీటి తడి లేకుండా చూసుకుంటే నూనె తుంపర్లు పడకుండా ఉంటాయి.'
      },
      category: 'Kitchen Safety'
    }
  ],
  faqs: [
    {
      question: {
        en: 'Can I scale ingredient quantities for more people?',
        te: 'ఎక్కువ మందికి కావలసిన పరిమాణాన్ని మార్చుకోవచ్చా?'
      },
      answer: {
        en: 'Yes! Every recipe has an interactive Serving Calculator that auto-scales ingredients from 1 to 6+ people with precise measurements.',
        te: 'ఖచ్చితంగా! ప్రతి వంటకంలో సర్వింగ్ క్యాలిక్యులేటర్ ఉంది, ఇది అవసరమైన పరిమాణాలను తగినట్లుగా మారుస్తుంది.'
      }
    },
    {
      question: {
        en: 'Do cooking timers work if I change tabs or lock my screen?',
        te: 'వేరే ట్యాబ్‌కి వెళ్లినప్పుడు టైమర్లు సరిగ్గా పనిచేస్తాయా?'
      },
      answer: {
        en: 'Yes, our timers calculate the exact target completion timestamp rather than simple clock intervals, ensuring accurate alert timing even if you switch browser tabs.',
        te: 'అవును, మా టైమర్లు ఖచ్చితమైన లక్ష్య సమయాన్ని లెక్కిస్తాయి కాబట్టి సమయం లోపం లేకుండా సరిగ్గా అలారం మోగుతుంది.'
      }
    }
  ]
};
