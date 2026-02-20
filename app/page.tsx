'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Astraloka</span>
          </div>
          <ul className="hidden md:flex gap-8 text-gray-700">
            <li><a href="#home" className="hover:text-green-600 transition">Home</a></li>
            <li><Link href="/blog" className="hover:text-green-600 transition">Blog</Link></li>
            <li><a href="#services" className="hover:text-green-600 transition">Service</a></li>
            <li><a href="#contact" className="hover:text-green-600 transition">Contact</a></li>
          </ul>
          <button className="md:hidden text-gray-700">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-green-50 to-green-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-sm font-semibold text-green-600 mb-4">Membangun Kesadaran Lingkungan Bersama</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Komunitas Astraloka: Mendorong Perubahan untuk Lingkungan yang Lebih Baik
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

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Temui Tim Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/team/syafik.jpeg"
                  alt="Muhammad Syafik"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Muhammad Syafik</h3>
              <p className="text-green-600 font-semibold">Pengelola Komunitas</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-700">
                👤
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Muhammad Ahlat Thoba'i</h3>
              <p className="text-green-600 font-semibold">Pengawas Komunitas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Astraloka</h3>
              <p className="text-gray-400">Komunitas Astraloka adalah organisasi yang berfokus pada pendidikan lingkungan dan pengelolaan sampah.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Tautan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><a href="#services" className="hover:text-white transition">Service</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Ikuti Kami</h3>
              <div className="flex gap-4">
                <a href="https://www.tiktok.com/@astraloka.community.id" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="TikTok">🎵</a>
                <a href="https://www.youtube.com/@Astralokacommunity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="YouTube">📺</a>
                <a href="https://www.facebook.com/ham.cupayy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="Facebook">f</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Astraloka Community. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
