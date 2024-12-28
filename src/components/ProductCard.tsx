import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onFavorite: (productId: string) => void; // Function to handle favorite toggling
  isFavorite: boolean; // Whether the product is a favorite or not
}

export function ProductCard({ product, onFavorite, isFavorite }: ProductCardProps) {
  const hasDiscount = product.discount && product.originalPrice;

  return (
    <div className="group relative">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
        <div className="relative">
          <a
            href={product.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full w-full block"
            aria-label={`View ${product.name} at ${product.brand}`}
            title={product.name}
            title={product.name}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              loading="lazy"
              title={product.name}
            />
          </a>
        </div>
        <button
          onClick={() => onFavorite(product.id)} // Call onFavorite when heart button is clicked
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          title={product.name}
         >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        {hasDiscount && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            {product.discount}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <a
              href={product.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-900 line-clamp-1"
            >
              {product.name}
            </a>
            <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-900">
            {product.currentPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        {(product.swatchImage1 || product.swatchImage2 || product.swatchImage3 || product.swatchImage4 || product.swatchImage5) && (
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((num) => {
              const swatchImage = product[`swatchImage${num}` as keyof Product];
              const swatchAlt = product[`swatchAlt${num}` as keyof Product];
              
              return swatchImage ? (
                <a
                  key={num}
                  href={product.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${product.name} - ${swatchAlt}`}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={swatchImage as string}
                    alt={swatchAlt as string}
                    className="w-6 h-6 rounded-full border border-gray-200"
                  />
                </a>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
