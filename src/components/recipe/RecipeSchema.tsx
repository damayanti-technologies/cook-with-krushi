import React from 'react';
import { Recipe } from '@/types';

interface RecipeSchemaProps {
  recipe: Recipe;
}

export const RecipeSchema: React.FC<RecipeSchemaProps> = ({ recipe }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title.en,
    image: [recipe.coverImage],
    description: recipe.description.en,
    keywords: recipe.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: 'Damayanti Technologies',
      url: 'https://cookwithkrushi.damayantitechnologies.com',
    },
    datePublished: recipe.createdAt,
    prepTime: `PT${recipe.preparationTime}M`,
    cookTime: `PT${recipe.cookingTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    recipeYield: `${recipe.defaultServings} servings`,
    recipeCategory: recipe.categoryId,
    recipeCuisine: recipe.cuisine,
    nutrition: recipe.caloriesPerServing
      ? {
          '@type': 'NutritionInformation',
          calories: `${recipe.caloriesPerServing} calories`,
        }
      : undefined,
    aggregateRating: recipe.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: recipe.rating.toString(),
          reviewCount: (recipe.reviewsCount || 10).toString(),
        }
      : undefined,
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.quantity} ${ing.unit} ${typeof ing.name === 'string' ? ing.name : ing.name.en}`
    ),
    recipeInstructions: recipe.steps.map((step) => ({
      '@type': 'HowToStep',
      name: typeof step.title === 'string' ? step.title : step.title.en,
      text: step.instructions.join(' '),
      image: step.imageUrl,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
