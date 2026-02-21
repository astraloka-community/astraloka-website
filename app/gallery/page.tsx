'use client';

import { galleryItems } from '@/lib/gallery';
import { GalleryCard } from '@/components/GalleryCard';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri Aksi Kami</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Dokumentasi lengkap tentang inisiatif dan aksi-aksi nyata yang kami jalankan untuk menciptakan lingkungan yang lebih baik bagi masyarakat.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
