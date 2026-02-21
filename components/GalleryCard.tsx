'use client';

import Link from 'next/link';
import { GalleryItem } from '@/lib/gallery';

export function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <Link href={`/gallery/${item.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer h-full">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-48 flex items-center justify-center text-5xl">
          {item.icon}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
          <div className="mt-4 text-green-600 font-semibold text-sm">
            Lihat Detail →
          </div>
        </div>
      </div>
    </Link>
  );
}
