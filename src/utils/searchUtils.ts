import Fuse from 'fuse.js';
import { Product } from '../types';

const fuseOptions = {
  keys: [
    { name: 'name', weight: 3 },
    { name: 'brand', weight: 2 },
    { name: 'category', weight: 2 },
    { name: 'colour', weight: 2 },
    { 
      name: 'searchableText',
      weight: 3,
      getFn: (product) => {
        return `${product.colour} ${product.category} ${product.name} ${product.brand}`.toLowerCase();
      }
    }
  ],
  threshold: 0.4,
  distance: 100,
  includeScore: true
};

export function searchProducts(products: Product[], searchQuery: string): Product[] {
  if (!searchQuery.trim()) {
    return products;
  }
  
  // Pre-process search terms
  const searchTerms = searchQuery.toLowerCase().split(' ');
  
  // Helper function to normalize and split colors
  const getProductColors = (colour?: string) => {
    if (!colour) return [];
    const colors = colour.split(',').map(c => c.trim().toLowerCase());
    // Map metallic/gold variations to 'gold'
    return colors.map(c => {
      if (c.includes('gold') || c.includes('metallic gold')) {
        return 'gold';
      }
      return c;
    });
  };

  // Direct match for color + category combinations
  const directMatches = products.filter(product => {
    const productColors = getProductColors(product.colour);
    const productText = `${productColors.join(' ')} ${product.category}`.toLowerCase();
    return searchTerms.every(term => productText.includes(term));
  });
  
  // If we have direct matches, prioritize them
  if (directMatches.length > 0) {
    return directMatches;
  }

  const fuse = new Fuse(products, fuseOptions);
  const results = fuse.search(searchQuery);
  
  return results.map(result => result.item);
}