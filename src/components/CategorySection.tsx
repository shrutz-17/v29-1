import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryLink {
  name: string;
  image: string;
  category: string;
}

export function CategorySection() {
  const categories: CategoryLink[] = [
    {
      name: 'KNITWEAR',
      image: 'https://kaboompics.com/cache/d/f/d/e/b/dfdeb7a0130430675b7e3d2fd0cf32d6d1661299.jpeg',
      category: 'Knitwear',
    },
    {
      name: 'DRESSES',
      image: 'https://kaboompics.com/cache/b/2/b/e/3/b2be399cee2958e5dfc1c326302790a1b116bb4d.jpeg',
      category: 'Dresses',
    },
    {
      name: 'TROUSERS',
      image: 'https://kaboompics.com/cache/9/1/5/9/7/91597199bacac88c0e6bae301ac6cb39ea44d807.jpeg',
      category: 'Trousers',
    },
    {
      name: 'COATS & JACKETS',
      image: 'https://kaboompics.com/cache/c/c/d/e/e/ccdee992f56d21d08f9b8919237951d92fb58c88.jpeg',
      category: 'Coats & Jackets',
    },
  ];

  return (
    <div className="bg-white pt-1 pb-3">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-medium text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/shop?category=${encodeURIComponent(category.category)}`}
              className="relative group overflow-hidden aspect-[3/4] rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                <span className="text-white text-xl font-bold">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}