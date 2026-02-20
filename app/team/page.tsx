'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Team() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-green-600 hover:text-green-700 mb-6 inline-block">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Temui Tim Kami
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Kami adalah tim yang berdedikasi untuk membangun kesadaran lingkungan dan menciptakan perubahan positif bagi masa depan yang lebih hijau.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Member 1 */}
            <div className="text-center">
              <div className="relative w-64 h-96 mx-auto mb-8">
                <Image
                  src="/team/syafik.jpeg"
                  alt="Muhammad Syafik"
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Muhammad Syafik</h2>
              <p className="text-xl text-green-600 font-semibold mb-4">Pengelola Komunitas</p>
              <p className="text-gray-700 max-w-sm mx-auto">
                Dengan semangat tinggi, Muhammad Syafik memimpin upaya komunitas kami dalam membangun kesadaran lingkungan dan menciptakan dampak nyata bagi masyarakat.
              </p>
            </div>

            {/* Member 2 */}
            <div className="text-center">
              <div className="relative w-64 h-96 mx-auto mb-8">
                <Image
                  src="/team/ahla.jpg"
                  alt="Muhammad Ahlat Thoba'i"
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Muhammad Ahlat Thoba'i</h2>
              <p className="text-xl text-green-600 font-semibold mb-4">Pengawas Komunitas</p>
              <p className="text-gray-700 max-w-sm mx-auto">
                Sebagai pengawas, Muhammad Ahlat Thoba'i memastikan setiap program berjalan dengan baik dan memberikan dampak maksimal untuk lingkungan dan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h2>
          <p className="text-lg text-gray-700 mb-8">
            Tim kami berkomitmen untuk mendorong perubahan positif melalui edukasi, inovasi, dan aksi nyata dalam melindungi lingkungan untuk generasi mendatang.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Edukasi</h3>
              <p className="text-gray-700">Memberikan pengetahuan dan kesadaran tentang pentingnya pelestarian lingkungan.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inovasi</h3>
              <p className="text-gray-700">Mengembangkan solusi kreatif untuk tantangan lingkungan modern.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aksi Nyata</h3>
              <p className="text-gray-700">Melakukan tindakan konkret yang memberikan dampak positif untuk lingkungan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
