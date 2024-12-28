import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { BrandLogos } from '../components/BrandLogos';
import { CategorySection } from '../components/CategorySection';
import { BlogSection } from '../components/BlogSection';
import { Footer } from '../components/Footer';

interface LandingPageProps {
  favorites: Set<string>;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  onFavoriteToggle: (productId: string) => void;
}

export function LandingPage({ favorites, showFavorites, setShowFavorites, onFavoriteToggle }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {
          setShowFavorites(!showFavorites);
          navigate('/shop');
        }}
        showFavorites={showFavorites}
        favorites={favorites}
      />
      <MenuBar />
      <div className="relative w-full h-[400px] sm:h-[450px] overflow-hidden">
          <img
            src="https://kaboompics.com/cache/7/e/7/8/a/7e78affef097b14b6e9b251d3db20425ba58ad8a.jpeg"
            alt="Chic minimalist fashion accessories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl sm:text-5xl mb-4 font-light">Petite Fashion for Every Style</h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">Shop from 100+ brands ALL in one place</p>
              <Link to="/shop" className="inline-block bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-sm hover:bg-gray-100 transition-colors">
                Shop All Now
              </Link>
            </div>
          </div>
        </div>
      <BrandLogos />
      <CategorySection />
      <BlogSection />
      <Footer />
    </div>
  );
}