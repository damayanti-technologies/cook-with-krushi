export type Language = 'en' | 'te';

export interface LocalizedString {
  en: string;
  te: string;
}

export type DietaryType = 'vegetarian' | 'vegan' | 'non-vegetarian';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner' | 'starters' | 'desserts' | 'drinks' | 'chutneys-pickles' | 'healthy' | 'special-occasions';

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  recipeCount: number;
  order: number;
  featured?: boolean;
  mealType?: MealType;
  subcategories?: string[];
}

export interface IngredientItem {
  id: string;
  name: LocalizedString | string;
  quantity: number;
  unit: string;
  notes?: string;
  isOptional?: boolean;
}

export interface IngredientAlternative {
  original: string;
  substitute: string;
  note: string;
}

export interface CookingStep {
  order: number;
  title: LocalizedString | string;
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string | null;
  estimatedMinutes: number;
  timerSeconds?: number | null;
  tips?: string[];
  warnings?: string[];
}

export interface Recipe {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  categoryId: string;
  subcategoryId?: string;
  cuisine: string;
  dietaryType: DietaryType;
  difficulty: DifficultyLevel;
  preparationTime: number; // in minutes
  cookingTime: number; // in minutes
  totalTime: number; // in minutes
  defaultServings: number;
  coverImage: string;
  ingredients: IngredientItem[];
  equipment: string[];
  steps: CookingStep[];
  tips: string[];
  alternatives?: IngredientAlternative[];
  tags: string[];
  published: boolean;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt: string;
  caloriesPerServing?: number;
  beginnerFriendly?: boolean;
  featured?: boolean;
  seasonalSpecial?: boolean;
  authorName?: string;
}

export interface CookingProgress {
  recipeId: string;
  currentStep: number;
  completedSteps: number[];
  checklist: Record<string, boolean>;
  startedAt: string;
  lastActiveAt: string;
  completed: boolean;
  servings: number;
}

export interface GlossaryTerm {
  id: string;
  slug: string;
  term: LocalizedString;
  category: 'technique' | 'equipment' | 'safety' | 'ingredient' | 'measurement';
  definition: LocalizedString;
  detailedGuide?: LocalizedString;
  examples?: string[];
  imageUrl?: string;
  commonMistakes?: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  dietaryPreference?: DietaryType;
  preferredLanguage: Language;
  favorites: string[];
  history: { recipeId: string; timestamp: string }[];
  createdAt: string;
}

export interface HomepageContent {
  heroHeading: LocalizedString;
  heroSubheading: LocalizedString;
  featuredRecipeIds: string[];
  popularRecipeIds: string[];
  beginnerFriendlyIds: string[];
  seasonalBanner: {
    title: LocalizedString;
    description: LocalizedString;
    imageUrl: string;
    linkUrl: string;
    active: boolean;
  };
  cookingTips: {
    id: string;
    title: LocalizedString;
    content: LocalizedString;
    category: string;
  }[];
  faqs: {
    question: LocalizedString;
    answer: LocalizedString;
  }[];
}
