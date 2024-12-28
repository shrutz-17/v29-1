import React from 'react';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { Product } from '../types';

interface FavoritesPageProps {
  favorites: Set<string>;
  products: Product[];
  onFavoriteToggle: (productId: string) => void;
}

export function FavoritesPage({ favorites, products, onFavoriteToggle }: FavoritesPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const favoriteProducts = products.filter((product) => favorites.has(product.id));

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {}}
        favorites={favorites}
      />
      <MenuBar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-6">My Favorites</h1>
        
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600 mb-4">
              You haven't saved any favorites yet
            </h2>
            <p className="text-gray-500">
              Click the heart icon on any product to save it to your favorites
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavorite={onFavoriteToggle}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}