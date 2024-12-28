import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../utils/blogPosts';

export function BlogSection() {
  // Get the 4 most recent blog posts
  const recentPosts = blogPosts.slice(0, 4);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-medium text-center mb-8">
          Latest Petite Fashion Trends & Releases
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentPosts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`} 
              onClick={() => window.scrollTo(0, 0)}
              className="group"
            >
              <div className="flex flex-col">
                <div className="relative group overflow-hidden aspect-[3/4] mb-4 rounded-lg">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{post.date}</span>
                  <span className="text-xs px-2 py-1 bg-[#f7e9d5] text-[#333333] rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#333333] group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/blog"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center text-[#333333] hover:text-gray-600 transition-colors"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}