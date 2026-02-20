'use client';

import Link from 'next/link';

export function Navigation() {
  return (
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
        <button className="md:hidden text-gray-700">☰</button>
      </div>
    </nav>
  );
}

export default Navigation;
