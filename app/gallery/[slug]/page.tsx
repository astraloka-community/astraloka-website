import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGalleryItem, galleryItems } from '@/lib/gallery';

export function generateStaticParams() {
  return galleryItems.map((item) => ({
    slug: item.id,
  }));
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getGalleryItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/gallery" className="text-green-600 hover:text-green-700 font-semibold text-sm">
            ← Kembali ke Galeri
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6">{item.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
          <p className="text-lg text-green-100">{item.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tentang Aksi Ini</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{item.content}</p>
          </div>

          {/* YouTube Videos Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Video YouTube</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {item.youtubeVideos.map((video, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="bg-black aspect-video flex items-center justify-center">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TikTok Links Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Konten TikTok</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {item.tiktokLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-black to-gray-800 text-white p-6 rounded-lg hover:shadow-lg transition transform hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.54-.05z" />
                    </svg>
                    <span className="font-semibold">TikTok</span>
                  </div>
                  <p className="text-sm text-gray-200">{link.title}</p>
                  <p className="text-xs text-gray-400 mt-2">Tonton di TikTok →</p>
                </a>
              ))}
            </div>
          </div>

          {/* Related Actions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lihat Aksi Lainnya</h3>
            <p className="text-gray-700 mb-6">
              Kami memiliki berbagai aksi dan inisiatif lainnya. Kunjungi halaman galeri untuk melihat semua proyek kami.
            </p>
            <Link href="/gallery" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Kembali ke Galeri
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
