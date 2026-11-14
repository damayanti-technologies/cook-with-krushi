import { MetadataRoute } from 'next';
import { initialRecipes, initialCategories } from '@/data/seedData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cookwithkrushi.damayantitechnologies.com';

  const staticRoutes = [
    '',
    '/explore',
    '/categories',
    '/what-can-i-cook',
    '/cooking-guide',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = initialCategories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const recipeRoutes = initialRecipes.map((recipe) => ({
    url: `${baseUrl}/recipe/${recipe.slug}`,
    lastModified: new Date(recipe.updatedAt || recipe.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...recipeRoutes];
}
