export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  productLink: string;
  imageUrl: string;
  imageAlt: string;
  description?: string;
  colour?: string;
  // Add support for up to 5 swatches
  swatchImage1?: string;
  swatchAlt1?: string;
  swatchImage2?: string;
  swatchAlt2?: string;
  swatchImage3?: string;
  swatchAlt3?: string;
  swatchImage4?: string;
  swatchAlt4?: string;
  swatchImage5?: string;
  swatchAlt5?: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'discount' | 'newest';
export type BrandFilter = string;