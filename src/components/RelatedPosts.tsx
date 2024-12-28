import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../utils/types';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // Get 3 posts from the same category, excluding the current post
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.category === currentPost.category
    )
    .slice(0, 3);

  // If we don't have enough posts from the same category, add recent posts from other categories
  if (relatedPosts.length < 3) {
    const otherPosts = allPosts
      .filter(post => 
        post.slug !== currentPost.slug && 
        !relatedPosts.includes(post)
      )
      .slice(0, 3 - relatedPosts.length);
    
    relatedPosts.push(...otherPosts);
  }

  if (relatedPosts.length === 0) return null;

  return (
    <div className="bg-white text-black py-12 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group"
            >
              <div className="flex flex-col">
                <div className="relative aspect-[3/2] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm text-gray-400 mb-2">{post.category}</span>
                <h3 className="text-lg font-medium mb-2 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}