import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface MenuBarProps {
  setSelectedBrands?: (brands: string[]) => void;
  setSelectedCategories?: (categories: string[]) => void;
  setSelectedColours?: (colours: string[]) => void;
  setSelectedPriceRange?: (range: [number, number]) => void;
}

export function MenuBar({ 
  setSelectedBrands,
  setSelectedCategories,
  setSelectedColours,
  setSelectedPriceRange
}: MenuBarProps) {
  const navigate = useNavigate();

  const handleMenuClick = (href: string) => {
    // Reset all filters when clicking menu items
    if (setSelectedBrands) setSelectedBrands([]);
    if (setSelectedCategories) setSelectedCategories([]);
    if (setSelectedColours) setSelectedColours([]);
    if (setSelectedPriceRange) setSelectedPriceRange([0, 1000]);
    
    // Special handling for blog navigation
    if (href === '/blog') {
      navigate('/blog', { replace: true });
      window.scrollTo(0, 0);
      return;
    }
    
    // Set specific filters based on menu item
    if (href.includes('category=')) {
      const category = decodeURIComponent(href.split('=')[1]);
      if (setSelectedCategories) setSelectedCategories([category]);
    } else if (href.includes('price=')) {
      const [min, max] = href.split('=')[1].split('-').map(Number);
      if (setSelectedPriceRange) setSelectedPriceRange([min, max]);
    }
    
    navigate(href);
    window.scrollTo(0, 0);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/shop' },
    { label: 'Under £50', href: '/shop?price=0-50' },
    { label: 'Trousers', href: '/shop?category=Trousers' },
    { label: 'Dresses', href: '/shop?category=Dresses' },
    { label: 'Blog', href: '/blog' },
    { label: 'Size Guide', href: '/about#sizing' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <nav className="bg-white border-b border-[#f7e9d5]">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="relative">
          {/* Desktop Menu */}
          <div className="hidden sm:flex justify-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.href)}
                className="py-4 text-sm font-medium text-[#333333] hover:text-gray-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu */}
          <div className="sm:hidden flex items-center">
            {/* Fixed Home Button */}
            <button
              onClick={() => handleMenuClick('/')}
              className="flex-shrink-0 py-4 px-4 text-sm font-medium text-[#333333] bg-white"
            >
              Home
            </button>
            
            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-8 px-4">
                {menuItems.slice(1).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleMenuClick(item.href)}
                    className="py-4 text-sm font-medium text-[#333333] whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Gradient Fade Effect */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white pointer-events-none" />
          </div>
        </div>
      </div>
    </nav>
  );
}