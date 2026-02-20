'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WordPressPost, getFeaturedImageUrl, getAuthorFromPost } from '@/lib/wordpress';

interface BlogCardProps {
  post: WordPressPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const featuredImage = getFeaturedImageUrl(post);
  const author = getAuthorFromPost(post);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const excerpt = stripHtml(post.excerpt.rendered);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 block h-full"
    >
      {/* Image */}
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

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(post.date)}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition line-clamp-2">
            {post.title.rendered}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {excerpt || 'Tidak ada deskripsi'}
          </p>
        </div>

        {/* Author */}
        {author && (
          <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
            Oleh: <span className="font-semibold">{author.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default BlogCard;
