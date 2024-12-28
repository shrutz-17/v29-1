import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BrandLogos() {
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    navigate(`/shop`, { state: { selectedBrand: brandName } });
  };

  const brands = [
    {
      name: 'Seasalt Cornwall',
      logo: 'https://www.shopsilverburn.com/wp-content/uploads/2024/06/NEW-Seasalt-Cornwall_Stacked_RGB_Maritime-scaled.jpg',
    },
    {
      name: 'Whistles',
      logo: 'https://www.theindustry.fashion/wp-content/uploads/2021/07/whistles.jpg',
    },
    {
      name: 'Boden',
      logo: 'https://cdn.rt.emap.com/wp-content/uploads/sites/2/2022/09/05165400/Boden-new-logo-.jpg',
    },
    {
      name: 'Pixie Girl',
      logo: 'https://cdn.codes.co.uk/img/merchants/143993/360-logo/v1/pixie-girl-discount-codes.png',
    },
    {
      name: 'Never Fully Dressed',
      logo: 'https://sfycdn.speedsize.com/0dc5bf78-b39b-46d9-a247-2ffe3bfdc6ca/www.neverfullydressed.com/cdn/shop/files/NFD_-_Logo_3_780x140_2322641f-fe5e-4ac5-8389-790969bb3aae.png?crop=center&height=105&v=1614359142&width=660',
    },
    {
      name: 'Boohoo',
      logo: 'https://1000logos.net/wp-content/uploads/2021/04/Boohoo-Logo.png',
    },
  ];

  return (
    <div className="bg-white py-8 border-t border-[#f7e9d5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="hidden md:grid grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <button
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="flex justify-center items-center hover:opacity-75 transition-opacity"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                width="120"
                height="48"
                loading="lazy"
                width="120"
                height="48"
              />
            </button>
          ))}
        </div>
        <div className="md:hidden flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
          {brands.slice(0, 3).map((brand) => (
            <button 
              key={brand.name} 
              onClick={() => handleBrandClick(brand.name)}
              className="flex-shrink-0 w-1/3 flex justify-center items-center hover:opacity-75 transition-opacity"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}