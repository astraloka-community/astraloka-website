# 🎉 Fitur Blog Astraloka - Dokumentasi Lengkap

**Status:** ✅ Production Ready  
**Last Updated:** Feb 20, 2026  
**Version:** 1.0

---

## 📖 Daftar Isi

1. [Quick Start](#quick-start)
2. [Struktur Project](#struktur-project)
3. [Fitur Utama](#fitur-utama)
4. [API Integration](#api-integration)
5. [Customization](#customization)
6. [Troubleshooting](#troubleshooting)
7. [Dokumentasi Lengkap](#dokumentasi-lengkap)

---

## 🚀 Quick Start

### Prasyarat
- Node.js 18+ 
- npm atau bun
- WordPress site di https://blog.astraloka.my.id dengan REST API enabled

### Setup (3 langkah)

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Run development server
npm run dev

# 3. Buka browser
# http://localhost:3000/blog
```

✨ **Selesai!** Blog sudah siap menampilkan artikel dari WordPress.

---

## 📁 Struktur Project

```
astraloka-website/
│
├── 📂 app/
│   ├── 📂 blog/
│   │   ├── page.tsx              ← Blog listing (6 posts/halaman)
│   │   └── [slug]/
│   │       └── page.tsx          ← Blog detail (single article)
│   ├── page.tsx                  ← Homepage (updated)
│   ├── layout.tsx                ← Root layout
│   └── globals.css               ← Global styles
│
├── 📂 components/
│   ├── BlogCard.tsx              ← Article card component
│   ├── Navigation.tsx            ← Navbar component
│   └── Footer.tsx                ← Footer component
│
├── 📂 lib/
│   └── wordpress.ts              ← WordPress REST API utilities
│
└── 📄 DOKUMENTASI:
    ├── QUICK_START.md            ← 5-minute guide
    ├── GUIDE.md                  ← Complete guide
    ├── BLOG_SETUP.md             ← Technical docs
    ├── BLOG_IMPLEMENTATION.md    ← Implementation details
    └── IMPLEMENTATION_CHECKLIST.md ← Checklist & deployment
```

---

## ✨ Fitur Utama

### 🔹 Blog Listing Page (`/blog`)

Halaman yang menampilkan list artikel:

**Features:**
- ✅ Fetch artikel dari WordPress REST API
- ✅ Display featured image setiap artikel
- ✅ Show title, excerpt, author, date
- ✅ Pagination (default 6 per halaman)
- ✅ Responsive grid (1/2/3 kolom)
- ✅ Loading spinner
- ✅ Error handling

**Responsive:**
- 📱 Mobile (< 768px): 1 kolom
- 🖥️ Tablet (768-1024px): 2 kolom
- 💻 Desktop (> 1024px): 3 kolom

---

### 🔹 Blog Detail Page (`/blog/[slug]`)

Halaman untuk membaca artikel lengkap:

**Features:**
- ✅ Full article content (HTML rendering)
- ✅ Featured image large
- ✅ Author avatar, name, publish date
- ✅ Article tags
- ✅ Breadcrumb navigation ("← Back to Blog")
- ✅ 404 error handling
- ✅ Loading & error states

---

## 🔌 API Integration

### Endpoints yang Digunakan

WordPress REST API endpoints:

```
/wp-json/wp/v2/posts              - List posts
/wp-json/wp/v2/posts?slug=X       - Get by slug
/wp-json/wp/v2/posts/{id}         - Get by ID
/wp-json/wp/v2/media/{id}         - Get featured image
/wp-json/wp/v2/users/{id}         - Get author
/wp-json/wp/v2/categories         - Get categories
```

### Functions di `lib/wordpress.ts`

```typescript
// Fetch multiple posts dengan pagination
const { posts, total, pages } = await getPosts(page, perPage, search?)

// Fetch single post by slug
const post = await getPostBySlug(slug)

// Fetch single post by ID
const post = await getPostById(id)

// Fetch featured image
const media = await getMedia(id)

// Fetch author info
const author = await getAuthor(id)

// Get featured image URL dari post
const imageUrl = getFeaturedImageUrl(post)

// Get author dari embedded post data
const author = getAuthorFromPost(post)
```

### Caching Strategy

```typescript
// Posts: Revalidate every 5 minutes
fetch(url, { next: { revalidate: 300 } })

// Media/Authors: Revalidate every 1 hour
fetch(url, { next: { revalidate: 3600 } })
```

---

## 🎨 Customization

### Ubah Posts Per Halaman

Edit `app/blog/page.tsx` (line ~17):

```typescript
const postsPerPage = 6;  // Ubah ke angka lain
```

### Ubah Cache Duration

Edit `lib/wordpress.ts` (line ~105):

```typescript
next: { revalidate: 300 }  // Ubah durasi (dalam detik)
// 300 = 5 menit
// 3600 = 1 jam
// 0 = no cache
```

### Ubah Warna & Styling

Edit file component atau CSS:

```typescript
// Di components/BlogCard.tsx:
className="... bg-green-600 ..."  // Ubah warna

// Di app/blog/page.tsx:
className="... hover:shadow-lg ..."  // Ubah hover effect
```

### Tambah Field Baru

Ubah type interfaces di `lib/wordpress.ts`:

```typescript
export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  author: number;
  date: string;
  slug: string;
  categories: number[];
  tags: number[];
  // Tambah field lain sesuai kebutuhan
}
```

---

## 🧪 Testing

### Test API Connection

```bash
# Test WordPress API
bash test-wordpress-api.sh

# Atau use curl
curl https://blog.astraloka.my.id/wp-json/wp/v2/posts?per_page=1

# Format JSON output
curl ... | jq .
```

### Test Lokally

```bash
npm run dev
# Buka http://localhost:3000/blog
# Check console (F12) untuk errors
```

### Build Production

```bash
npm run build
# Check untuk errors

npm start
# Test production build
```

---

## 🐛 Troubleshooting

### Problem: Blog page kosong / tidak ada artikel

**Solusi:**

1. Verify WordPress accessible:
   ```bash
   curl https://blog.astraloka.my.id
   ```

2. Check REST API:
   ```bash
   curl https://blog.astraloka.my.id/wp-json/wp/v2/posts
   ```

3. Ensure posts sudah published:
   - Buka WordPress admin
   - Check Posts → Status harus "Publish"

4. Check browser console (F12):
   - Buka http://localhost:3000/blog
   - F12 → Console
   - Lihat error messages

### Problem: Gambar tidak muncul

**Solusi:**

1. Set featured image di WordPress:
   - WordPress admin → Edit post
   - Set featured image

2. Verify image URL accessible:
   - Klik featured image di WordPress
   - Copy URL
   - Paste di browser
   - Harus bisa di-load

3. Check Network tab:
   - F12 → Network
   - Refresh page
   - Look untuk image requests
   - Check status code

### Problem: Pagination tidak berfungsi

**Solusi:**

1. Ensure > 6 posts di WordPress
2. Check total posts value di browser console
3. Verify page state management

### Problem: Slow performance

**Solusi:**

1. Optimize featured images di WordPress
   - Compress sebelum upload
   - Use WebP format

2. Increase cache duration:
   ```typescript
   next: { revalidate: 3600 }  // 1 hour
   ```

3. Reduce posts per page:
   ```typescript
   const postsPerPage = 3;
   ```

---

## 📝 WordPress Checklist

Pastikan setup berikut:

- ✅ WordPress site accessible: https://blog.astraloka.my.id
- ✅ REST API enabled (default di 5.0+)
- ✅ Minimal 1 published post
- ✅ Featured image sudah set untuk setiap post
- ✅ Authors sudah setup
- ✅ Categories sudah setup (optional)

---

## 📚 Dokumentasi Lengkap

Untuk informasi lebih detail:

| Dokumen | Isi | Untuk Siapa |
|---------|-----|-----------|
| **QUICK_START.md** | 5-minute setup guide | Pemula |
| **GUIDE.md** | Complete user guide | Semua user |
| **BLOG_SETUP.md** | Technical documentation | Developer |
| **BLOG_IMPLEMENTATION.md** | Implementation details | Developer |
| **IMPLEMENTATION_CHECKLIST.md** | Features & deployment | Developer |
| **SUMMARY.txt** | File structure overview | Referensi |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push ke GitHub
git add .
git commit -m "feat: add blog feature"
git push

# Vercel auto-deploys
# No additional setup needed
```

### Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`

### VPS / Self-hosted

```bash
npm run build
npm start
# Server runs on port 3000
```

---

## ✅ Status

- ✅ All features implemented
- ✅ Zero TypeScript errors
- ✅ Responsive design
- ✅ Performance optimized
- ✅ Comprehensive documentation
- ✅ Ready for production

---

## 🎓 Next Steps (Optional)

Fitur tambahan yang bisa ditambahkan:

- [ ] Search functionality
- [ ] Category filtering
- [ ] Related articles
- [ ] Comments section
- [ ] Newsletter signup
- [ ] Social sharing
- [ ] Archive by month
- [ ] Dark mode

---

## 📞 Questions?

Refer ke dokumentasi di atas atau file berikut:

- `QUICK_START.md` - Quick setup
- `GUIDE.md` - Complete guide
- `BLOG_SETUP.md` - Technical reference
- `.env.example` - Environment variables

---

## 🎉 Enjoy!

**Blog feature Astraloka sudah ready!**

Cukup run `npm run dev` dan buka `http://localhost:3000/blog` untuk melihat artikel dari WordPress.

Happy blogging! 📝✨

---

*Created: Feb 20, 2026*  
*Version: 1.0*  
*Status: ✅ Production Ready*
