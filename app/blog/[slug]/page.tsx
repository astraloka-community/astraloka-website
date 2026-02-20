'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, WordPressPost, getFeaturedImageUrl, getAuthorFromPost } from '@/lib/wordpress';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPost = await getPostBySlug(slug);
        
        if (!fetchedPost) {
          setError('Artikel tidak ditemukan');
          setPost(null);
          return;
        }

        setPost(fetchedPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Gagal memuat artikel. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            <p className="mb-4">{error || 'Artikel tidak ditemukan'}</p>
            <Link href="/blog" className="text-red-600 hover:text-red-800 font-semibold">
              ← Kembali ke Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featuredImage = getFeaturedImageUrl(post);
  const author = getAuthorFromPost(post);

  return (
    <div className="bg-white">
      {/* Article Container */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumb */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 font-medium text-sm"
        >
          ← Kembali ke Blog
        </Link>

        {/* Article Header */}
        <header className="mb-10 md:mb-12">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title.rendered}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-6 md:pb-8 border-b border-gray-200">
            {author?.avatar_urls && (
              <Image
                src={author.avatar_urls['48']}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900 text-base">
                {author?.name || 'Anonymous'}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {formatDate(post.date)}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-80 sm:h-96 md:h-[28rem] mb-10 md:mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-10 md:mb-12">
          <style jsx>{`
            :global(.article-content) {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
              font-size: 1.0625rem;
              line-height: 1.75;
              color: #374151;
            }

            :global(.article-content p) {
              margin: 0;
              margin-bottom: 1.5rem;
              text-align: justify;
            }

            :global(.article-content h2) {
              font-size: 1.875rem;
              font-weight: 700;
              margin-top: 2.5rem;
              margin-bottom: 1.25rem;
              color: #111827;
              line-height: 1.3;
            }

            :global(.article-content h3) {
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #1f2937;
              line-height: 1.4;
            }

            :global(.article-content h4) {
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1.75rem;
              margin-bottom: 0.875rem;
              color: #374151;
            }

            :global(.article-content strong) {
              font-weight: 700;
              color: #111827;
            }

            :global(.article-content em) {
              font-style: italic;
              color: #4b5563;
            }

            :global(.article-content a) {
              color: #16a34a;
              text-decoration: underline;
              transition: color 0.2s ease;
            }

            :global(.article-content a:hover) {
              color: #15803d;
              text-decoration-color: #15803d;
            }

            :global(.article-content ul),
            :global(.article-content ol) {
              margin: 1.5rem 0;
              padding-left: 2rem;
            }

            :global(.article-content li) {
              margin-bottom: 0.75rem;
              line-height: 1.75;
            }

            :global(.article-content blockquote) {
              border-left: 4px solid #16a34a;
              padding-left: 1.5rem;
              margin-left: 0;
              margin-right: 0;
              margin-top: 1.5rem;
              margin-bottom: 1.5rem;
              font-style: italic;
              color: #6b7280;
              background-color: #f9fafb;
              padding: 1rem;
              padding-left: 1.5rem;
              border-radius: 0.375rem;
            }

            :global(.article-content img) {
              max-width: 100%;
              height: auto;
              margin: 1.5rem 0;
              border-radius: 0.5rem;
            }

            :global(.article-content table) {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5rem 0;
            }

            :global(.article-content th),
            :global(.article-content td) {
              border: 1px solid #e5e7eb;
              padding: 0.75rem;
              text-align: left;
            }

            :global(.article-content th) {
              background-color: #f3f4f6;
              font-weight: 600;
              color: #111827;
            }

            :global(.article-content code) {
              background-color: #f3f4f6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-family: 'Courier New', monospace;
              color: #dc2626;
              font-size: 0.9em;
            }

            :global(.article-content pre) {
              background-color: #1f2937;
              color: #f3f4f6;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1.5rem 0;
              font-family: 'Courier New', monospace;
              font-size: 0.875rem;
              line-height: 1.5;
            }
          `}</style>
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="border-t border-gray-200 pt-8 md:pt-10">
            <p className="text-gray-600 font-semibold mb-4 text-sm uppercase tracking-wide">Tags</p>
            <div className="flex flex-wrap gap-3">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-100 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 md:mt-12 pt-10 md:pt-12">
          <Link 
            href="/blog" 
            className="inline-block text-green-600 hover:text-green-700 font-semibold transition"
          >
            ← Kembali ke Blog Listing
          </Link>
        </div>
      </article>
    </div>
  );
}
