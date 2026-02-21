'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-green-50 to-green-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-sm font-semibold text-green-600 mb-4">Membangun Kesadaran Lingkungan Bersama</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mendorong Perubahan untuk Lingkungan yang Lebih Baik
          </h1>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Edukasi Lingkungan</h3>
              <p className="text-gray-700">Program edukasi yang mengajarkan masyarakat tentang dampak limbah dan cara-cara efektif untuk mengelolanya melalui konten digital.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bergabunglah Dengan Kami</h3>
              <p className="text-gray-700">Komunitas baru yang bersemangat membangun kesadaran lingkungan. Mari berkontribusi bersama dalam perjalanan menuju masa depan yang lebih hijau.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inisiatif Pribadi</h3>
              <p className="text-gray-700">Tindakan nyata dari tim kami untuk memulai gerakan lingkungan dan memberikan contoh nyata kepada masyarakat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Mengapa Memilih Kami?</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12">Komitmen kami untuk pendidikan dan masyarakat adalah landasan dari setiap program yang kami jalankan.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inisiatif Pribadi</h3>
              <p className="text-gray-700">Semangat tinggi dari setiap anggota tim untuk menciptakan perubahan nyata dan menginspirasi masyarakat luas.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Program Inovatif</h3>
              <p className="text-gray-700">Solusi kreatif dan berbasis riset untuk tantangan lingkungan yang kompleks.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dampak Nyata</h3>
              <p className="text-gray-700">Hasil nyata walau sedikit yang memberikan perubahan positif bagi lingkungan dan masyarakat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Astraloka adalah komunitas yang berdedikasi untuk meningkatkan kesadaran lingkungan dan mendorong tindakan nyata dalam pengelolaan lingkungan yang berkelanjutan.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Kami percaya bahwa perubahan dimulai dari kesadaran individu. Melalui program edukasi dan inisiatif komunitas, kami bekerja untuk menciptakan dampak positif bagi lingkungan.
              </p>
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Program edukasi berbasis digital</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Komunitas aktif dan peduli lingkungan</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Inisiatif nyata dengan transparansi penuh</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <p className="text-sm text-gray-700">Komitmen terhadap<br/>Lingkungan</p>
                </div>
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
                  <p className="text-sm text-gray-700">Potensi Dampak<br/>Positif</p>
                </div>
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1</div>
                  <p className="text-sm text-gray-700">Misi Bersama:<br/>Bumi yang Lebih Hijau</p>
                </div>
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Anda</div>
                  <p className="text-sm text-gray-700">Bagian Penting dari<br/>Gerakan Kami</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Temui Tim Kami</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Tim yang berdedikasi untuk membangun kesadaran lingkungan dan menciptakan perubahan positif.
          </p>
          <a 
            href="/team"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Lihat Tim Lengkap →
          </a>
        </div>
      </section>
    </div>
  );
}
