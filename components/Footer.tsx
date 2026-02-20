'use client';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-bold text-lg">Astraloka</span>
            </div>
            <p className="text-gray-400">Membangun kesadaran lingkungan untuk masa depan yang berkelanjutan.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/#services" className="hover:text-white transition">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: info@astraloka.my.id</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Astraloka Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
