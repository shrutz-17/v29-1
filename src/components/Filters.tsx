import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BrandFilter, SortOption } from '../types';

interface FiltersProps {
  selectedBrands: BrandFilter[];
  setSelectedBrands: (brands: BrandFilter[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPriceRange: [number, number];
  setSelectedPriceRange: (range: [number, number]) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  minPrice: number;
  maxPrice: number;
  selectedColours: string[];
  setSelectedColours: (colours: string[]) => void;
  uniqueColours: string[];
  products: Product[];
  onApplyFilters?: () => void;
}

export function Filters({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
  minPrice,
  maxPrice,
  selectedColours,
  setSelectedColours,
  uniqueColours,
  products = [],
  onApplyFilters,
}: FiltersProps) {
  // Calculate brand counts based on selected filters
  const getBrandCount = (brand: string) => {
    return products.filter(product => {
      const matchesBrand = product.brand === brand;
      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesColours = selectedColours.length === 0 || (product.colour && selectedColours.some(color => 
        product.colour?.toLowerCase().includes(color.toLowerCase())
      ));
      const price = parseFloat(product.currentPrice.replace('£', ''));
      const matchesPrice = price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
      
      return matchesBrand && matchesCategories && matchesColours && matchesPrice;
    }).length;
  };

  // Calculate category counts based on selected filters
  const getCategoryCount = (category: string) => {
    return products.filter(product => {
      const matchesCategory = product.category === category;
      const matchesBrands = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesColours = selectedColours.length === 0 || (product.colour && selectedColours.some(color => 
        product.colour?.toLowerCase().includes(color.toLowerCase())
      ));
      const price = parseFloat(product.currentPrice.replace('£', ''));
      const matchesPrice = price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
      
      return matchesCategory && matchesBrands && matchesColours && matchesPrice;
    }).length;
  };
  const brands: BrandFilter[] = [
    'Dorothy Perkins',
    'Oasis',
    'Pixie Girl',
    'River Island',
    'Roman',
    'Papaya',
    'Boden',
    'Lovall',
    'Phase Eight',
    'Whistles',
    'White Stuff',
    'RELR',
    'Never Fully Dressed',
    'BOOHOO',
    'M&Co',
    'Alie Street',
    "Chi Chi London",
    "Nobody's Child",
    "Hot Squash",
    "Jolie Moi",
    "Mint Velvet",
    "Sosander",
    "Forever New",
    "Live Unlimited",
    "Gina Bacconi",
    "Seasalt Cornwall",
    "Barneys Originals",
    "Coast",
    "Joe Browns",
    "Principles",
    "Wallis",
    "Warehouse",
  ].sort((a, b) => a.localeCompare(b)); // Sorts the brands alphabetically
  ;

  const categories: string[] = [
    'Tops',
    'Knitwear',
    'Cardigans',
    'Dresses',
    'Skirts',
    'Jumpsuits & Playsuits',
    'Dungarees',
    'Hoodies',
    'Shorts',
    'Skorts',
    'Trousers',
    'Jeans',
    'Leggings & Jeggings',
    'Blazers',
    'Coats & Jackets',
    'Swimwear',
    'Nightwear & Loungewear',
    'Lingerie',
  ];

  const colorMap: { [key: string]: string } = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Gray': '#808080',
    'Cream': '#F5F5DC',
    'Camel': '#c19a6b',
    'Khaki': '#BDB76B',
    'Brown': '#594235',
    'Burgundy': '#800020',
    'Blue': '#0000FF',
    'Red': '#FF0000',
    'Green': '#008000',
    'Pink': '#FFC0CB',
    'Yellow': '#FFFF00',
    'Purple': '#800080',
    'Orange': '#FFA500',
    'Gold': 'https://images.unsplash.com/photo-1518636693090-8407756ab88b?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Multicolour': 'https://images.unsplash.com/photo-1650469426485-7b129e80c976',
  };

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedColours([]);
    setSelectedPriceRange([minPrice, maxPrice]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'show-all') {
      setSelectedPriceRange([minPrice, maxPrice]);
    } else {
      const [min, max] = value.split('-').map(Number);
      setSelectedPriceRange([min, max]);
    }
  };

  const toggleBrandSelection = (brand: BrandFilter) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const toggleCategorySelection = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const toggleColourSelection = (colour: string) => {
    setSelectedColours((prevSelectedColours) =>
      prevSelectedColours.includes(colour)
        ? prevSelectedColours.filter((c) => c !== colour)
        : [...prevSelectedColours, colour]
    );
  };

  const processedColors = Object.entries(colorMap).map(([name, colorCode]) => ({
    name,
    colorCode,
  }));

  // Split comma-separated colors into an array
  const normalizeColor = (color: string) => color.trim().toLowerCase();
  const hasSelectedColor = (productColor?: string) => {
    if (!productColor) return false;
    const productColors = productColor.split(',').map(normalizeColor);
    return selectedColours.some(selectedColor => 
      productColors.includes(normalizeColor(selectedColor))
    );
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters();
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-lg font-medium text-gray-900 mb-6 hidden sm:block">Filter By</h2>
        <div className="flex flex-col gap-4">
          <div className="flex-1 overflow-y-auto sm:overflow-visible max-h-[80vh]">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Brands:</span>
              </div>
              <button
                onClick={() => setSelectedBrands([])}
                className="text-sm font-medium text-black hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="block sm:hidden mb-4">
              <div className="grid grid-cols-2 gap-2">
                {brands.slice(0, showAllBrands ? brands.length : 10).map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrandSelection(brand)}
                      className="mr-2 accent-black"
                    />
                    <label htmlFor={brand} className="text-sm flex items-center">
                      {brand}
                      <span className="ml-1 text-gray-500">({getBrandCount(brand)})</span>
                    </label>
                  </div>
                ))}
              </div>
              {brands.length > 10 && (
                <button
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="flex items-center text-[#333333] text-sm font-bold mt-2"
                >
                  {showAllBrands ? (
                    <ChevronUp className="mr-2" size={16} />
                  ) : (
                    <ChevronDown className="mr-2" size={16} />
                  )}
                  {showAllBrands ? "Show Less" : "See More"}
                </button>
              )}
            </div>

            <div className="hidden sm:block">
              <div className="flex flex-col gap-2">
                {brands.slice(0, showAllBrands ? brands.length : 10).map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`desktop-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrandSelection(brand)}
                      className="mr-2 accent-black"
                    />
                    <label htmlFor={`desktop-${brand}`} className="text-sm flex items-center">
                      {brand}
                      <span className="ml-1 text-gray-500">({getBrandCount(brand)})</span>
                    </label>
                  </div>
                ))}
              </div>
              {brands.length > 10 && (
                <button
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="flex items-center text-[#333333] text-sm font-bold mt-2"
                >
                  {showAllBrands ? (
                    <ChevronUp className="mr-2" size={16} />
                  ) : (
                    <ChevronDown className="mr-2" size={16} />
                  )}
                  {showAllBrands ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Categories:</span>
              </div>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm font-medium text-black hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="block sm:hidden mb-4">
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, showAllCategories ? categories.length : 10).map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategorySelection(category)}
                      className="mr-2 accent-black"
                    />
                    <label htmlFor={category} className="text-sm flex items-center">
                      {category}
                      <span className="ml-1 text-gray-500">({getCategoryCount(category)})</span>
                    </label>
                  </div>
                ))}
              </div>
              {categories.length > 10 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="flex items-center text-[#333333] text-sm font-bold mt-2"
                >
                  {showAllCategories ? (
                    <ChevronUp className="mr-2" size={16} />
                  ) : (
                    <ChevronDown className="mr-2" size={16} />
                  )}
                  {showAllCategories ? "Show Less" : "See More"}
                </button>
              )}
            </div>

            <div className="hidden sm:block">
              <div className="flex flex-col gap-2">
                {categories.slice(0, showAllCategories ? categories.length : 10).map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`desktop-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategorySelection(category)}
                      className="mr-2 accent-black"
                    />
                    <label htmlFor={`desktop-${category}`} className="text-sm flex items-center">
                      {category}
                      <span className="ml-1 text-gray-500">({getCategoryCount(category)})</span>
                    </label>
                  </div>
                ))}
              </div>
              {categories.length > 10 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="flex items-center text-[#333333] text-sm font-bold mt-2"
                >
                  {showAllCategories ? (
                    <ChevronUp className="mr-2" size={16} />
                  ) : (
                    <ChevronDown className="mr-2" size={16} />
                  )}
                  {showAllCategories ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Colours:</span>
              </div>
              <button
                onClick={() => setSelectedColours([])}
                className="text-sm font-medium text-black hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              {processedColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleColourSelection(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors relative ${
                    selectedColours.includes(color.name)
                      ? 'border-black'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={
                    color.name === 'Gold' || color.name === 'Multicolour'
                      ? {
                          backgroundImage: `url(${color.colorCode})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : { backgroundColor: color.colorCode }
                  }
                  title={color.name}
                >
                  {selectedColours.includes(color.name) && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Price Range:</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <select
                value={`${selectedPriceRange[0]}-${selectedPriceRange[1]}`}
                onChange={handlePriceChange}
                className="w-full px-5 py-3 text-sm rounded-md border border-gray-300"
              >
                <option value="show-all">Show All</option>
                <option value="0-50">Under £50</option>
                <option value="50-100">£50 - £100</option>
                <option value="100-200">£100 - £200</option>
                <option value="200-500">£200 - £500</option>
                <option value="500-1000">£500 - £1000</option>
                <option value="1000-999999">Over £1000</option>
              </select>
            </div>

            <div className="hidden sm:flex justify-between gap-4 mt-6">
            <button 
  onClick={resetFilters} 
  className="w-full px-4 py-2 bg-[#0c0c0a] text-[#eae0d6] text-sm rounded-md hover:bg-gray-300"
>
  Reset All Filters
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
