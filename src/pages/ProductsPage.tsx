import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { Filters } from '../components/Filters';
import { ProductCard } from '../components/ProductCard';
import { fetchAndMergeCSV } from '../utils/csvUtils';
import { parsePrice } from '../utils/productData';
import { searchProducts } from '../utils/searchUtils';
import { shuffleArray } from '../utils/productUtils';
import { Product, SortOption } from '../types';

interface ProductsPageProps {
  favorites: Set<string>;
  onFavoriteToggle: (productId: string) => void;
  products: Product[];
}

export function ProductsPage({ 
  favorites, 
  onFavoriteToggle,
  products: initialProducts
}: ProductsPageProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const locationState = location.state as { selectedBrand?: string };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set selected brand from navigation state if present
    if (locationState?.selectedBrand) {
      setSelectedBrands([locationState.selectedBrand]);
      // Clear the state to avoid persisting the filter
      window.history.replaceState({}, document.title);
    }
  }, []);

  // Initialize products and create shuffled version once on mount
  useEffect(() => {
    setProducts(initialProducts);
    // Only shuffle if sorting by newest
    if (sortOption === 'newest') {
      setShuffledProducts(shuffleArray(initialProducts));
    } else {
      setShuffledProducts(initialProducts);
    }
  }, [initialProducts, sortOption]);

  // Parse URL parameters for initial category filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const priceParam = params.get('price');
    
    if (categoryParam) {
      setSelectedCategories([decodeURIComponent(categoryParam)]);
    }
    
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      setSelectedPriceRange([min, max]);
    }
  }, [location]);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);


  const minPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.min(...products.map((product) => parsePrice(product.currentPrice) || 0));
  }, [products]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.max(...products.map((product) => parsePrice(product.currentPrice) || 0));
  }, [products]);
  
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedColours([]);
    setSelectedPriceRange([minPrice, maxPrice]);
  };

  const uniqueColours = useMemo(() => {
    const colours = new Set<string>();
    products.forEach(product => {
      if (product.colour) {
        colours.add(product.colour.trim());
      }
    });
    return Array.from(colours).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter using Fuse.js
    if (searchQuery) {
      result = searchProducts(result, searchQuery);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedColours.length > 0) {
      result = result.filter((product) => {
        if (!product.colour) return false;
        const productColors = product.colour.split(',').map(c => c.trim().toLowerCase());
        return selectedColours.some(selectedColor => 
          productColors.includes(selectedColor.toLowerCase())
        );
      });
    }

    result = result.filter((product) => {
      const price = parsePrice(product.currentPrice);
      return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    });

    if (sortOption === 'price-asc') {
      result.sort((a, b) => parsePrice(a.currentPrice) - parsePrice(b.currentPrice));
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => parsePrice(b.currentPrice) - parsePrice(a.currentPrice));
    } else if (sortOption === 'discount') {
      result.sort((a, b) => {
        const discountA = a.originalPrice ? parsePrice(a.originalPrice) - parsePrice(a.currentPrice) : 0;
        const discountB = b.originalPrice ? parsePrice(b.originalPrice) - parsePrice(b.currentPrice) : 0;
        return discountB - discountA;
      });
    }

    return result;
  }, [products, selectedBrands, selectedCategories, selectedColours, selectedPriceRange, sortOption, searchQuery]);

  const itemsPerPage = 40;
  const totalProductCount = filteredAndSortedProducts.length;

  const loadMoreProducts = () => {
    if (page < Math.ceil(totalProductCount / itemsPerPage) && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const paginatedProducts = useMemo(() => {
    const start = 0;
    const end = page * itemsPerPage;
    // Use shuffled products for 'newest' sort, otherwise use filtered products
    const productsToDisplay = sortOption === 'newest'
      ? shuffledProducts.filter(product => {
          // Apply all filters to shuffled products
          if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
          if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
          if (selectedColours.length > 0) {
            if (!product.colour) return false;
            const productColors = product.colour.split(',').map(c => c.trim().toLowerCase());
            if (!selectedColours.some(selectedColor => 
              productColors.includes(selectedColor.toLowerCase())
            )) return false;
          }
          const price = parsePrice(product.currentPrice);
          if (price < selectedPriceRange[0] || price > selectedPriceRange[1]) return false;
          if (searchQuery && !searchProducts([product], searchQuery).length) return false;
          return true;
        })
      : filteredAndSortedProducts;
    return productsToDisplay.slice(start, end);
  }, [
    shuffledProducts,
    filteredAndSortedProducts,
    page,
    itemsPerPage,
    sortOption,
    selectedBrands,
    selectedCategories,
    selectedColours,
    selectedPriceRange,
    searchQuery
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1000) {
        loadMoreProducts();
      }
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalProductCount, loadMoreProducts]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {}}
        favorites={favorites}
      />
      <MenuBar
        setSelectedBrands={setSelectedBrands}
        setSelectedCategories={setSelectedCategories}
        setSelectedColours={setSelectedColours}
        setSelectedPriceRange={setSelectedPriceRange}
      />
      <Breadcrumb />
      
      <div className="block sm:hidden flex justify-between items-center bg-white py-4 px-4 border-b border-[#f7e9d5]">
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center justify-center bg-white text-[#333333] py-3 px-4 rounded-sm w-[170px] text-sm border border-[#333333]"
          >
            <Filter className="mr-2" size={16} />
            Filter by
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setIsSortOpen(true)}
            className="flex items-center justify-center bg-white text-[#333333] py-3 px-4 rounded-sm w-[170px] text-sm border border-[#333333]"
          >
            <ChevronDown className="mr-2" size={16} />
            Sort by
          </button>
        </div>
      </div>

      <div className="container mx-auto sm:px-4 py-4 sm:py-6 flex">
        <div className="hidden sm:block w-1/4">
          <Filters
            aria-label="Product filters"
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedColours={selectedColours}
            setSelectedColours={setSelectedColours}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
            minPrice={minPrice}
            maxPrice={maxPrice}
            uniqueColours={uniqueColours}
            products={products}
          />
        </div>
        
        <div className="w-full sm:w-3/4 px-4 sm:pl-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              {`${totalProductCount} products found`}
            </div>
            <div className="hidden sm:block">
              <select
                value={sortOption}
                aria-label="Sort products"
                onChange={(e) => setSortOption(e.target.value)}
                className="border px-2 py-1"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
          
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            ref={gridContainerRef}
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavorite={() => onFavoriteToggle(product.id)}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </div>
          {loading && <div>Loading more products...</div>}
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#333333] text-[#f7e9d5] rounded-full p-4 hover:bg-gray-800 transition duration-300"
          style={{
            fontSize: '20px',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          ↑
        </button>
      )}

      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFilterOpen(false);
            }
          }}
        >
          <div 
            className="relative bg-white w-full h-[90vh] rounded-t-3xl p-4 transform transition-transform duration-500 ease-out"
            style={{
              transform: isFilterOpen ? 'translateY(0)' : 'translateY(100%)',
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-md font-bold">Filter by</div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="border-t border-[#f7e9d5] my-4"></div>
            <div className="overflow-y-auto h-[calc(90vh-180px)]">
              <Filters
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedColours={selectedColours}
              setSelectedColours={setSelectedColours}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              sortOption={sortOption}
              setSortOption={setSortOption}
              minPrice={minPrice}
              maxPrice={maxPrice}
              uniqueColours={uniqueColours}
              products={products}
              products={products}
              onApplyFilters={() => setIsFilterOpen(false)}
              />
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-4">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-3 bg-[#eae0d6] text-[#0c0c0a] rounded-md hover:bg-gray-200 transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                }}
                className="flex-1 px-4 py-3 bg-[#0c0c0a] text-[#eae0d6] rounded-md hover:bg-gray-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {isSortOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSortOpen(false);
            }
          }}
        >
          <div className="relative bg-white w-full h-[50vh] rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Sort By</h3>
              <button
                onClick={() => setIsSortOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="border-t border-gray-200 -mx-4" />
            
            <div className="mt-4 space-y-4">
              {[
                { value: 'newest', label: 'Newest' },
                { value: 'price-asc', label: 'Price (Low to High)' },
                { value: 'price-desc', label: 'Price (High to Low)' },
                { value: 'discount', label: 'Discount' }
              ].map((option) => (
                <div 
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSortOption(option.value as SortOption);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${sortOption === option.value ? 'text-[#333333] font-medium' : 'text-gray-600'}`}>
                      {option.label}
                    </span>
                    {sortOption === option.value && (
                      <span className="text-[#333333]">✓</span>
                    )}
                  </div>
                  <div className="border-t border-gray-200 mt-2" />
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => {
                setIsSortOpen(false);
              }}
              className="absolute bottom-6 left-4 right-4 bg-[#333333] text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Apply Sorting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}