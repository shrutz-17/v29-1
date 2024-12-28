import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { BlogPost } from './types';

const postsDirectory = join(process.cwd(), 'src/content/blog');

export function getPostSlugs() {
  return readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    date: format(new Date(data.date), 'MMMM dd, yyyy'),
    author: data.author,
    category: data.category,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
  return posts;
}

export function generateBlogPostsFile() {
  const posts = getAllPosts();
  const blogPostsContent = `import { BlogPost } from './types';

// This file is auto-generated. Do not edit directly.
export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};`;

  const outputPath = join(process.cwd(), 'src/utils/blogPosts.ts');
  try {
    writeFileSync(outputPath, blogPostsContent);
    console.log('Successfully updated blogPosts.ts');
  } catch (error) {
    console.error('Error updating blogPosts.ts:', error);
  }
}