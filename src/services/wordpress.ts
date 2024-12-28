// Mock data until WordPress is set up
const mockPosts = [
  {
    id: 1,
    title: {
      rendered: 'Spring 2024 Petite Fashion Trends'
    },
    excerpt: {
      rendered: 'Discover the hottest trends for petite women this spring season, from pastel colors to statement accessories.'
    },
    content: {
      rendered: 'Full article content here...'
    },
    date: '2024-03-01T12:00:00',
    _embedded: {
      'wp:featuredmedia': [{
        source_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop'
      }],
      'wp:term': [[{
        name: 'Trends',
        slug: 'trends'
      }]]
    }
  },
  {
    id: 2,
    title: {
      rendered: 'How to Style Petite Trousers'
    },
    excerpt: {
      rendered: 'Expert tips on finding and styling the perfect pair of trousers for your petite frame.'
    },
    content: {
      rendered: 'Full article content here...'
    },
    date: '2024-02-28T12:00:00',
    _embedded: {
      'wp:featuredmedia': [{
        source_url: 'https://images.unsplash.com/photo-1551048632-24e444b48a3e?q=80&w=1400&auto=format&fit=crop'
      }],
      'wp:term': [[{
        name: 'Style Guide',
        slug: 'style-guide'
      }]]
    }
  },
  {
    id: 3,
    title: {
      rendered: 'Best Petite Workwear Essentials'
    },
    excerpt: {
      rendered: 'Build your professional wardrobe with these petite-friendly workwear pieces.'
    },
    content: {
      rendered: 'Full article content here...'
    },
    date: '2024-02-25T12:00:00',
    _embedded: {
      'wp:featuredmedia': [{
        source_url: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1400&auto=format&fit=crop'
      }],
      'wp:term': [[{
        name: 'Workwear',
        slug: 'workwear'
      }]]
    }
  },
  {
    id: 4,
    title: {
      rendered: 'Sustainable Petite Fashion'
    },
    excerpt: {
      rendered: 'Your guide to eco-friendly fashion choices for petite women.'
    },
    content: {
      rendered: 'Full article content here...'
    },
    date: '2024-02-20T12:00:00',
    _embedded: {
      'wp:featuredmedia': [{
        source_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop'
      }],
      'wp:term': [[{
        name: 'Sustainability',
        slug: 'sustainability'
      }]]
    }
  }
];

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      slug: string;
    }>>;
  };
}

export async function getPosts(page = 1, perPage = 10) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedPosts = mockPosts.slice(start, end);
  
  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(mockPosts.length / perPage)
  };
}

export async function getPost(slug: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find post by matching slug from title
  const post = mockPosts.find(p => 
    p.title.rendered.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  return post;
}