'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Astraloka</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700">
          <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
          <li><Link href="/blog" className="hover:text-green-600 transition">Blog</Link></li>
          <li><a href="/#services" className="hover:text-green-600 transition">Service</a></li>
          <li><a href="/#contact" className="hover:text-green-600 transition">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-green-600 transition text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col px-4 py-2 text-gray-700">
            <li>
              <a 
                href="/" 
                onClick={closeMenu}
                className="block py-2 hover:text-green-600 transition"
              >
                Home
              </a>
            </li>
            <li>
              <Link 
                href="/blog" 
                onClick={closeMenu}
                className="block py-2 hover:text-green-600 transition"
              >
                Blog
              </Link>
            </li>
            <li>
              <a 
                href="/#services" 
                onClick={closeMenu}
                className="block py-2 hover:text-green-600 transition"
              >
                Service
              </a>
            </li>
            <li>
              <a 
                href="/#contact" 
                onClick={closeMenu}
                className="block py-2 hover:text-green-600 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
