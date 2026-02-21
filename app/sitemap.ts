import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://astraloka.my.id';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  try {
    // Fetch all blog posts (get all pages)
    const allPosts: MetadataRoute.Sitemap = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { posts, pages } = await getPosts(page, 100);

      posts.forEach((post) => {
        allPosts.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });

      if (page >= pages) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return [...staticPages, ...allPosts];
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    // Return only static pages if fetch fails
    return staticPages;
  }
}
