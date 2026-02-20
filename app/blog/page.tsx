'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, WordPressPost, getFeaturedImageUrl, getAuthorFromPost } from '@/lib/wordpress';

export default function BlogPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { posts: fetchedPosts, pages } = await getPosts(currentPage, postsPerPage);
        setPosts(fetchedPosts);
        setTotalPages(pages);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Gagal memuat artikel. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const truncateText = (text: string, length: number = 150) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog & Artikel</h1>
          <p className="text-lg text-gray-700">Informasi terkini tentang lingkungan dan pengelolaan sampah</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada artikel yang dipublikasikan.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => {
                  const featuredImage = getFeaturedImageUrl(post);
                  const author = getAuthorFromPost(post);
                  const excerpt = stripHtml(post.excerpt.rendered);

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                    >
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        {featuredImage ? (
                          <Image
                            src={featuredImage}
                            alt={post.title.rendered}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                            <span className="text-green-600 text-4xl">📰</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition line-clamp-2">
                          {post.title.rendered}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {excerpt || 'Tidak ada deskripsi'}
                        </p>
                        {author && (
                          <div className="text-xs text-gray-500">
                            Oleh: {author.name}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                  >
                    ← Sebelumnya
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === page
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                  >
                    Selanjutnya →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
