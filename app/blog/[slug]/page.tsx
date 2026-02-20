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
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Astraloka</span>
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Astraloka</span>
            </Link>
          </div>
        </nav>
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
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Astraloka</span>
          </Link>
          <ul className="hidden md:flex gap-8 text-gray-700">
            <li><Link href="/" className="hover:text-green-600 transition">Home</Link></li>
            <li><Link href="/blog" className="hover:text-green-600 transition">Blog</Link></li>
            <li><a href="/#services" className="hover:text-green-600 transition">Service</a></li>
            <li><a href="/#contact" className="hover:text-green-600 transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-semibold"
        >
          ← Kembali ke Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title.rendered}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
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
                <p className="font-semibold text-gray-900">{author?.name || 'Anonymous'}</p>
                <p className="text-sm">{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 font-semibold mb-3">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {/* Note: Tag names would need to be fetched separately for display */}
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2026 Astraloka Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
