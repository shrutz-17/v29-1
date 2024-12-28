import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MenuBar } from './MenuBar';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onHeartClick: () => void;
  favorites?: Set<string>;
}

export function Header({ searchQuery, setSearchQuery, onHeartClick, favorites }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const taglines = [
    "Browse PETITE fashion from trusted brands, all in one place!",
    "Discover & shop from small independent brands",
    "Compare and shop from different brands"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = () => {
    onHeartClick();
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      closeSearchOverlay();
      if (location.pathname !== '/shop') {
        navigate('/shop');
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  return (
    <>
      {/* Top Bar with rotating taglines */}
      <div
        className="bg-[#0c0c0a] text-[#eae0d6] text-sm flex justify-center items-center"
        style={{
          fontFamily: "Roboto, sans-serif",
          position: "relative",
          overflow: "hidden",
          height: '35px'
        }}
      >
        <div
          className="absolute whitespace-nowrap transition-all duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: "150%"
          }}
        >
          {taglines.map((tagline, index) => (
            <span
              key={index}
              className="px-4 inline-block"
              style={{
                minWidth: "100%",
                textAlign: "center",
              }}
            >
              {tagline}
            </span>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="bg-[#eae0d6] shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex-1 flex items-center justify-start">
              <Link to="/" className="text-2xl text-[#333333] hover:opacity-80 transition-opacity" style={{ fontFamily: 'Yusei Magic'}}>
                <h1 className="text-2xl" style={{ fontStyle: 'bold' }}>StoodApart</h1>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar for Large Screens */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]" />
                <input
                  type="text"
                  value={searchQuery}
                  aria-label="Search for petite clothing"
                  onChange={handleSearchChange}
                  aria-label="Search for petite clothing"
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-[#333333] sm:text-sm"
                  placeholder="Search for petite clothing..."
                />
              </div>

              {/* Search Icon (visible only on small screens) */}
              <button
                onClick={handleSearchIconClick}
                className="md:hidden p-2 text-[#333333] hover:text-[#f7e9d5]"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Heart Icon (Favorite Button) */}
              <button
                onClick={() => navigate('/favorites')}
                className="p-2 relative text-[#333333] hover:text-red-500"
              >
                <Heart className="h-6 w-6" />
                {favorites && favorites.size > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.size}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>


      {/* Full Screen Search Overlay */}
      {isSearchOpen && (
  <div
    className="fixed inset-0 bg-white bg-opacity-100 z-50 transform transition-transform duration-40000 ease-out"
    style={{
      transform: isSearchOpen ? "translateX(0)" : "translateX(100%)", // Slide in from the right
    }}
  >
    <div className="w-full max-w-lg p-4">
      {/* Top Header with Search Text and Back Arrow */}
      <div className="flex items-center mb-4">
        <button
          onClick={closeSearchOverlay}
          className="text-[#333333] text-2xl mr-2"
        >
          &lt;
        </button>
        <span className="font-bold text-md flex-1 text-center">Search</span>
      </div>

      {/* Thin Line */}
      <div className="border-t border-[#f7e9d5] my-4"></div>

      {/* Search Input */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          className="w-full p-4 pl-10 border border-gray-300 rounded-md"
          placeholder="Search for petite clothing..."
        />
      </div>
    </div>
  </div>
)}

    </>
  );
}