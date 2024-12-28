import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';
import { BlogPost as BlogPostComponent } from '../components/BlogPost';
import { getAllPosts, getPostBySlug } from '../utils/blogUtils';
import type { BlogPost as BlogPostType } from '../utils/blogPosts';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { slug } = useParams();
  const [posts] = React.useState<BlogPostType[]>(getAllPosts());
  const [currentPost, setCurrentPost] = React.useState<BlogPostType | null>(null);

  // Reset current post when navigating to main blog page
  React.useEffect(() => {
    if (!slug) {
      setCurrentPost(null);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  React.useEffect(() => {
    if (slug) {
      setCurrentPost(getPostBySlug(slug));
      window.scrollTo(0, 0);
    }
  }, [slug]);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {}}
      />
      <MenuBar />
      <Breadcrumb />
      
      {currentPost ? (
        <div className="py-12">
          <BlogPostComponent post={currentPost} allPosts={posts} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-medium mb-8 text-center">Latest Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-sm px-3 py-1 bg-[#f7e9d5] text-[#333333] rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-medium mb-3 text-[#333333] hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="text-[#333333] hover:text-gray-600 transition-colors text-sm font-medium">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}