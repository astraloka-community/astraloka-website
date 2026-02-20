// WordPress REST API Configuration
const WORDPRESS_URL = 'https://blog.astraloka.my.id';
const WP_API_BASE = `${WORDPRESS_URL}/wp-json/wp/v2`;

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: unknown;
  categories: number[];
  tags: number[];
  _links: unknown;
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  media_type: string;
  mime_type: string;
  media_details: unknown;
  post: number;
  source_url: string;
  _links: unknown;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<string, string>;
}

/**
 * Fetch posts from WordPress REST API
 */
export async function getPosts(
  page: number = 1,
  perPage: number = 10,
  search?: string
): Promise<{ posts: WordPressPost[]; total: number; pages: number }> {
  try {
    let url = `${WP_API_BASE}/posts?page=${page}&per_page=${perPage}&_embed`;
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const posts = await response.json();
    const total = parseInt(response.headers.get('X-WP-Total') || '0');
    const pages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    return { posts, total, pages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(`${WP_API_BASE}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const posts = await response.json();

    if (posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

/**
 * Fetch post by ID
 */
export async function getPostById(id: number): Promise<WordPressPost | null> {
  try {
    const response = await fetch(`${WP_API_BASE}/posts/${id}?_embed`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}

/**
 * Fetch media by ID
 */
export async function getMedia(id: number): Promise<WordPressMedia | null> {
  try {
    const response = await fetch(`${WP_API_BASE}/media/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const media = await response.json();
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
}

/**
 * Fetch author by ID
 */
export async function getAuthor(id: number): Promise<WordPressAuthor | null> {
  try {
    const response = await fetch(`${WP_API_BASE}/users/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch author: ${response.statusText}`);
    }

    const author = await response.json();
    return author;
  } catch (error) {
    console.error('Error fetching author:', error);
    throw error;
  }
}

/**
 * Fetch categories
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(`${WP_API_BASE}/categories?per_page=100`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get featured image URL from post with embedded media
 */
export function getFeaturedImageUrl(post: WordPressPost): string | null {
  if (!post.featured_media) {
    return null;
  }

  // Check if media is embedded in the response
  const embedded = (post as any)._embedded;
  if (embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return embedded['wp:featuredmedia'][0].source_url;
  }

  return null;
}

/**
 * Get author data from post with embedded data
 */
export function getAuthorFromPost(post: WordPressPost): WordPressAuthor | null {
  const embedded = (post as any)._embedded;
  if (embedded?.author?.[0]) {
    return embedded.author[0];
  }

  return null;
}

/**
 * Extract plain text from HTML content
 */
export function stripHtmlTags(html: string): string {
  const div = new DOMParser().parseFromString(html, 'text/html');
  return div.body.textContent || '';
}

/**
 * Truncate text
 */
export function truncateText(text: string, length: number = 150): string {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
}
