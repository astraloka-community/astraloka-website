# 🚀 Panduan Cepat - Blog Astraloka

**Waktu setup:** 5 menit | **Kesulitan:** Mudah

## Apa yang sudah dilakukan?

✅ Fitur blog dengan integrasi WordPress REST API  
✅ Halaman `/blog` untuk listing artikel  
✅ Halaman `/blog/[slug]` untuk detail artikel  
✅ Responsive design  
✅ Type-safe dengan TypeScript  

## 🎯 Mulai Sekarang

### Step 1: Install & Run (2 menit)

```bash
# Di folder project
npm install

# Run development server
npm run dev
```

Buka browser: **http://localhost:3000/blog**

### Step 2: WordPress Checklist

Pastikan di WordPress admin:

- [ ] Site accessible di `https://blog.astraloka.my.id`
- [ ] REST API enabled (default di WordPress 5.0+)
- [ ] Punya minimal 1 published post
- [ ] Recommended: Set featured image untuk setiap post

### Step 3: Test

```bash
# Test API connection
curl https://blog.astraloka.my.id/wp-json/wp/v2/posts?per_page=1

# Seharusnya keluar JSON dengan posts
```

✅ **Selesai!** Blog sudah siap digunakan.

## 📍 URL Penting

| URL | Deskripsi |
|-----|-----------|
| `http://localhost:3000` | Homepage |
| `http://localhost:3000/blog` | Blog listing |
| `http://localhost:3000/blog/nama-artikel` | Single post |
| `https://blog.astraloka.my.id` | WordPress site |

## 🎨 Customize (Optional)

### Ubah posts per halaman

Edit `app/blog/page.tsx` line ~17:
```typescript
const postsPerPage = 6; // Ubah ke 12 untuk 12 per halaman
```

### Ubah cache duration

Edit `lib/wordpress.ts` line ~105:
```typescript
next: { revalidate: 300 } // 300 detik = 5 menit
// Ubah ke 3600 untuk 1 jam
// Ubah ke 0 untuk tidak cache
```

## 🔍 Debug Checklist

**Blog page kosong?**
- [ ] WordPress site accessible
- [ ] REST API working: `curl https://blog.astraloka.my.id/wp-json/wp/v2/posts`
- [ ] Posts sudah published (status: publish)
- [ ] Check browser console (F12) untuk error

**Gambar tidak muncul?**
- [ ] Set featured image di WordPress post
- [ ] Image URL accessible
- [ ] Check Network tab (F12) di browser

## 📁 File Structure

```
Buat 3 folder utama:
1. app/blog/           ← Blog pages
2. lib/                ← WordPress API utils
3. components/         ← Reusable components
```

Semua file sudah auto-generated, jadi tidak perlu buat manual.

## 💾 Git Commit (Optional)

```bash
git add .
git commit -m "feat: Add blog feature with WordPress REST API integration"
git push
```

## 🚀 Deploy

Ketika ready di-deploy:

1. Build terlebih dahulu:
```bash
npm run build
```

2. Deploy seperti biasa (Vercel, Netlify, dll)

3. Update environment variables di deployment platform jika ada

## 📞 Support

**Error?** Check dokumentasi:
- `BLOG_SETUP.md` - Technical documentation
- `BLOG_IMPLEMENTATION.md` - Implementation details

**API Docs:**
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Next.js Documentation](https://nextjs.org/docs)

## ✨ Features Overview

| Feature | Status |
|---------|--------|
| Blog listing | ✅ Done |
| Single post | ✅ Done |
| Pagination | ✅ Done |
| Featured images | ✅ Done |
| Author info | ✅ Done |
| Search | 🔵 Ready (tinggal enable) |
| Categories | 🔵 Ready (tinggal enable) |
| Comments | ⭕ Not yet |
| Newsletter | ⭕ Not yet |

## ⚡ Performance Tips

- Render time: < 2s (dengan good connection)
- Images: Auto-optimized by Next.js
- Caching: ISR 5 menit untuk posts

## 🎓 Next Level (Future)

Bisa ditambahkan:
- Search bar & filter
- Category pages
- Archives (by month/year)
- Related posts
- Share buttons
- Analytics tracking

---

**Sudah ready?** Coba akses `/blog` dan lihat artikel dari WordPress Anda! 🎉

Pertanyaan? Refer ke `BLOG_SETUP.md` untuk dokumentasi lengkap.

---

*Last updated: Feb 20, 2026*
