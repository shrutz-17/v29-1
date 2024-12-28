import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isInBlogPost = pathnames.length === 2 && pathnames[0] === 'blog';

  // Map paths to readable names
  const getPathName = (path: string) => {
    const pathMap: { [key: string]: string } = {
      shop: 'Shop',
      favorites: 'Favorites',
      blog: 'Blog'
    };
    return pathMap[path] || path;
  };

  const handleClick = (path: string, index: number) => {
    // If we're in a blog post and clicking the "Blog" link, always go to main blog page
    if (isInBlogPost && path === 'blog') {
      navigate('/blog', { replace: true });
      window.scrollTo(0, 0);
      return;
    }
    // Otherwise use the normal routing logic
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    navigate(routeTo, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-white border-b border-[#f7e9d5]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Home
          </button>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={name}>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-900 font-medium">
                    {getPathName(name)}
                  </span>
                ) : (
                  <button
                    onClick={() => handleClick(name, index)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {getPathName(name)}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}