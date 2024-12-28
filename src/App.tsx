import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/ProductsPage';
import { BlogPage } from './pages/BlogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { fetchAndMergeCSV } from './utils/csvUtils';
import { Analytics } from './components/Analytics';
import { Product } from './types';

function App() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const MEASUREMENT_ID = 'MEASUREMENT_ID'; // Replace with actual ID

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }

    // Load products
    fetchAndMergeCSV([
      "/pixiegirl-2024-12-01-black.csv",
      "/whitestuff-2024-11-26.csv",
      "/neverfullydressed-2024-11-26.csv",
      "/aliestreet-2024-12-10.csv",
      "/chichiclothing-2024-12-11.csv",
      "/nobodyschild-2024-12-11.csv",
      "/hotsquash-2024-12-11.csv",
      "/joliemoi-2024-12-11.csv",
      "/boden-2024-11-24.csv",
      "/mintvelvet-2024-12-12.csv",
      "/sosandar-2024-12-12.csv",
      "/forevernew-2024-12-12.csv",
      "/ginabacconi-2024-12-13.csv",
      "/liveunlimitedlondon-2024-12-13.csv",  
    ])
      .then(setProducts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    } else {
      localStorage.removeItem('favorites');
    }
  }, [favorites]);

  const handleFavoriteToggle = (productId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(productId)) {
        updatedFavorites.delete(productId);
      } else {
        updatedFavorites.add(productId);
      }
      return updatedFavorites;
    });
  };

  return (
    <Router>
      <Analytics measurementId={MEASUREMENT_ID} />
      <Routes>
        <Route path="/" element={
          <LandingPage
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
        } />
        <Route path="/shop" element={
          <ProductsPage
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            products={products}
          />
        } />
        <Route path="/favorites" element={
          <FavoritesPage
            favorites={favorites}
            products={products}
            onFavoriteToggle={handleFavoriteToggle}
          />
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Router>
  );
}

export default App;