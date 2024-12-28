import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost as BlogPostType } from '../utils/markdownUtils';
import { RelatedPosts } from './RelatedPosts';
import remarkGfm from 'remark-gfm';

interface BlogPostProps {
  post: BlogPostType;
  allPosts: BlogPostType[];
}

export function BlogPost({ post, allPosts }: BlogPostProps) {
  return (
    <>
      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
        <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.author.picture}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-medium mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600">{post.excerpt}</p>
      </header>

      <div className="prose prose-lg max-w-none prose-headings:font-medium prose-h2:text-2xl prose-h3:text-xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="blog-content"
          components={{
            h1: ({node, ...props}) => <h1 style={{fontSize: '2.25rem', fontWeight: 500, marginBottom: '1.5rem'}} {...props} />,
            h2: ({node, ...props}) => <h2 style={{fontSize: '1.875rem', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem'}} {...props} />,
            h3: ({node, ...props}) => <h3 style={{fontSize: '1.5rem', fontWeight: 500, marginTop: '1.5rem', marginBottom: '0.75rem'}} {...props} />,
            p: ({node, ...props}) => <p style={{marginBottom: '1rem'}} {...props} />,
            ul: ({node, ...props}) => <ul style={{listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem'}} {...props} />,
            ol: ({node, ...props}) => <ol style={{listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem'}} {...props} />,
            li: ({node, ...props}) => <li style={{marginBottom: '0.5rem'}} {...props} />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <hr className="my-12 border-t border-gray-200" />
      </article>
      <RelatedPosts currentPost={post} allPosts={allPosts} />
    </>
  );
}