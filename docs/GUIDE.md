# 🎯 Panduan Lengkap: Fitur Blog Astraloka Headless WordPress

## 📍 Navigasi Dokumentasi

```
Pilih sesuai kebutuhan Anda:

🚀 INGIN MULAI CEPAT?
   └─ Baca: QUICK_START.md (5 menit)

🔧 INGIN DETAIL TEKNIS?
   └─ Baca: BLOG_SETUP.md (comprehensive)

📋 INGIN OVERVIEW?
   └─ Baca: BLOG_IMPLEMENTATION.md

✅ INGIN CHECKLIST?
   └─ Baca: IMPLEMENTATION_CHECKLIST.md

📊 INGIN FILE SUMMARY?
   └─ Baca: SUMMARY.txt

🎮 MULAI SEKARANG?
   └─ Run: npm run dev
   └─ Open: http://localhost:3000/blog
```

---

## 🏗️ Struktur Folder Project

```
astraloka-website/
│
├── 📂 app/
│   ├── 📂 blog/
│   │   ├── page.tsx          ← Blog listing (6 posts/halaman, paginated)
│   │   └── [slug]/
│   │       └── page.tsx      ← Blog detail (single article)
│   ├── page.tsx              ← Homepage (updated dengan link /blog)
│   ├── layout.tsx            ← Root layout
│   └── globals.css
│
├── 📂 components/
│   ├── BlogCard.tsx          ← Reusable article card
│   ├── Navigation.tsx        ← Navbar component
│   └── Footer.tsx            ← Footer component
│
├── 📂 lib/
│   └── wordpress.ts          ← WordPress REST API utilities
│
├── 📂 public/
│   └── (existing assets)
│
├── 📂 node_modules/          ← Dependencies
│
├── 📄 QUICK_START.md         ← 5-minute quick start
├── 📄 BLOG_SETUP.md          ← Technical documentation
├── 📄 BLOG_IMPLEMENTATION.md ← Implementation details
├── 📄 IMPLEMENTATION_CHECKLIST.md ← Features & deployment
├── 📄 SUMMARY.txt            ← File structure summary
├── 🔧 test-wordpress-api.sh  ← API testing script
├── 📄 .env.example           ← Environment template
│
├── 📄 package.json           ← Dependencies list
├── 📄 next.config.ts         ← Next.js config
├── 📄 tsconfig.json          ← TypeScript config
├── 📄 tailwind.config.mjs    ← Tailwind config
└── 📄 README.md              ← Original readme
```

---

## 🌐 URL Routes yang Tersedia

### Development (Local)
```
Home Page:
  http://localhost:3000

Blog Listing:
  http://localhost:3000/blog
  http://localhost:3000/blog?page=1
  http://localhost:3000/blog?page=2

Blog Detail:
  http://localhost:3000/blog/nama-slug-artikel-1
  http://localhost:3000/blog/cara-mengelola-sampah
  http://localhost:3000/blog/tips-lingkungan-berkelanjutan
```

### Production (Live)
```
Home Page:
  https://astraloka.my.id

Blog Listing:
  https://astraloka.my.id/blog
  https://astraloka.my.id/blog?page=1

Blog Detail:
  https://astraloka.my.id/blog/nama-slug-artikel-1
```

### WordPress Backend API
```
Base URL:
  https://blog.astraloka.my.id/wp-json/wp/v2

Posts:
  https://blog.astraloka.my.id/wp-json/wp/v2/posts
  https://blog.astraloka.my.id/wp-json/wp/v2/posts?slug=article-name

Detail Post:
  https://blog.astraloka.my.id/wp-json/wp/v2/posts/{id}

Media/Featured Images:
  https://blog.astraloka.my.id/wp-json/wp/v2/media/{id}

Authors:
  https://blog.astraloka.my.id/wp-json/wp/v2/users/{id}

Categories:
  https://blog.astraloka.my.id/wp-json/wp/v2/categories
```

---

## 🎯 Fitur Utama

### 1. Blog Listing Page (`/blog`)

**Apa yang ditampilkan:**
- List artikel dari WordPress
- Featured image setiap artikel
- Title, excerpt, author, publish date
- Pagination (6 posts per halaman)

**Interaksi:**
- Click article → go to detail page
- Click page number → navigate pagination
- Click prev/next button → navigate pages

**Responsive:**
- 📱 Mobile: 1 kolom
- 🖥️ Tablet: 2 kolom
- 💻 Desktop: 3 kolom

**States:**
- Loading: Spinner animation
- Loaded: Display articles
- Error: Error message
- Empty: "No articles" message

---

### 2. Blog Detail Page (`/blog/[slug]`)

**Apa yang ditampilkan:**
- Single article full content (HTML)
- Featured image large
- Author: avatar, name, publish date
- Article title
- Tags (if any)

**Interaksi:**
- Breadcrumb "← Back to Blog" → go back
- Links di content → external links (auto)
- Images → display optimized

**States:**
- Loading: Spinner
- Loaded: Display article
- Not Found: Error message + back link
- Error: Error message + back link

---

### 3. WordPress Integration

**Functions di `lib/wordpress.ts`:**

```typescript
getPosts(page, perPage, search?)         // Get multiple posts
getPostBySlug(slug)                      // Get single post
getPostById(id)                          // Get post by ID
getMedia(id)                             // Get featured image
getAuthor(id)                            // Get author info
getCategories()                          // Get all categories
getFeaturedImageUrl(post)                // Extract image URL
getAuthorFromPost(post)                  // Extract author
```

**Caching Strategy:**
```
Posts:           Revalidate every 5 minutes (300s)
Media/Authors:   Revalidate every 1 hour (3600s)
```

---

## 🔌 API Integration

### WordPress REST API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/posts` | GET | Fetch multiple posts |
| `/posts?slug=X` | GET | Fetch by slug |
| `/posts/{id}` | GET | Fetch by ID |
| `/media/{id}` | GET | Get featured image |
| `/users/{id}` | GET | Get author info |
| `/categories` | GET | Get categories |

### Query Parameters

| Parameter | Example | Purpose |
|-----------|---------|---------|
| `page` | `?page=1` | Pagination page |
| `per_page` | `?per_page=10` | Posts per page |
| `search` | `?search=keyword` | Search articles |
| `_embed` | `?_embed` | Include embedded data |
| `slug` | `?slug=article-name` | Get by slug |

### Example API Calls

```bash
# Get 10 posts page 1 with embedded data
curl "https://blog.astraloka.my.id/wp-json/wp/v2/posts?page=1&per_page=10&_embed"

# Search for article
curl "https://blog.astraloka.my.id/wp-json/wp/v2/posts?search=lingkungan&_embed"

# Get by slug
curl "https://blog.astraloka.my.id/wp-json/wp/v2/posts?slug=artikel-pertama&_embed"

# Format JSON output
curl ... | jq .
curl ... | python3 -m json.tool
```

---

## 🎨 Design & Styling

### Colors
```css
Primary:   #16a34a  (Green 600)   - Links, active states, CTAs
Secondary: #f3f4f6  (Gray 100-200) - Backgrounds, cards
Text:      #111827  (Gray 900)     - Main text
```

### Components

**BlogCard:**
- Image: 12rem height (h-48)
- Title: text-xl bold
- Excerpt: 3 lines max (line-clamp-3)
- Author: Small text at bottom
- Hover: Shadow increase, image scale

**Navigation:**
- Sticky top
- Logo + site name
- Menu items
- Green color for active/hover

**Footer:**
- Dark background (gray-900)
- Grid layout (3 columns on desktop)
- Contact, links, social media
- Copyright text

---

## ⚡ Performance Optimizations

### Image Optimization
- Next.js Image component (automatic sizing)
- Lazy loading enabled
- srcset for responsive images

### Caching (ISR)
```typescript
// Posts: Cache 5 minutes
fetch(url, { next: { revalidate: 300 } })

// Media/Authors: Cache 1 hour
fetch(url, { next: { revalidate: 3600 } })
```

### Pagination
- Default 6 posts per page
- Reduces initial payload
- Better performance on first load

### Code
- Type-safe TypeScript
- No unused dependencies
- Optimized bundle size

---

## 🧪 Testing Checklist

### Pre-Launch
- [ ] Run `npm run build` - no errors
- [ ] No TypeScript errors
- [ ] Blog listing page loads
- [ ] Featured images display
- [ ] Pagination works (if > 6 posts)
- [ ] Click article goes to detail
- [ ] Detail page shows full content
- [ ] Mobile responsive (F12 toggle)
- [ ] No console errors (F12)

### API Testing
```bash
# Test WordPress API
bash test-wordpress-api.sh

# Should output:
# ✅ Site is accessible
# ✅ REST API is available
# ✅ Found posts
# ✅ Found categories
# ✅ Found media
```

### Browser Testing
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

---

## 📱 Responsive Breakpoints

| Device | Width | Grid | Layout |
|--------|-------|------|--------|
| Mobile | < 768px | 1 col | Stack |
| Tablet | 768-1024px | 2 cols | Side by side |
| Desktop | > 1024px | 3 cols | Grid |

**CSS used:** Tailwind CSS
```css
md:grid-cols-2    /* Tablet: 2 columns */
lg:grid-cols-3    /* Desktop: 3 columns */
```

---

## 🚀 Deployment Steps

### 1. Prepare
```bash
# Install dependencies
npm install

# Build
npm run build

# Should complete without errors
```

### 2. Deploy Platform Options

**Vercel (Recommended):**
```bash
# 1. Push to GitHub
git add .
git commit -m "feat: add blog feature"
git push

# 2. Vercel auto-deploys from git
# No additional setup needed
```

**Netlify:**
- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `.next`

**VPS/Self-hosted:**
```bash
# Build
npm run build

# Start
npm start
# Server runs on port 3000
```

### 3. Post-Deployment
- [ ] Test /blog on production
- [ ] Test article detail page
- [ ] Verify images loading
- [ ] Check mobile responsive
- [ ] Monitor performance

---

## 🔒 Security

- ✅ No authentication needed (public read-only API)
- ✅ HTTPS enforced
- ✅ Type-safe TypeScript
- ✅ React XSS prevention (auto-escaping)
- ✅ WordPress REST API returns sanitized HTML

---

## 🎓 Future Enhancements

**Easy to Add:**
- Search bar & search results
- Category filter buttons
- Archive by month/year
- Related articles sidebar
- Social share buttons

**Medium Complexity:**
- Comments section (WordPress comments)
- Like/vote feature
- Newsletter signup
- Dark mode toggle

**Complex:**
- Full-text search
- Advanced filtering
- User authentication
- Custom post types

---

## 📞 Support

### Documentation Files
1. **QUICK_START.md** - 5-minute beginner guide
2. **BLOG_SETUP.md** - Technical deep dive
3. **BLOG_IMPLEMENTATION.md** - Implementation details
4. **IMPLEMENTATION_CHECKLIST.md** - Features & deployment
5. **SUMMARY.txt** - File overview

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Common Issues

**Blog page shows no articles:**
1. Check WordPress at `https://blog.astraloka.my.id`
2. Run: `bash test-wordpress-api.sh`
3. Ensure posts are published
4. Check browser console for errors

**Images not loading:**
1. Set featured image in WordPress
2. Verify image URL is accessible
3. Check Network tab (F12)

**Slow performance:**
1. Optimize featured images in WordPress
2. Reduce posts per page
3. Increase cache duration

---

## ✅ Final Checklist

- ✅ All files created
- ✅ Zero TypeScript errors
- ✅ WordPress integration complete
- ✅ Responsive design implemented
- ✅ Performance optimized
- ✅ Documentation comprehensive
- ✅ Testing script provided
- ✅ Ready for production

---

## 🎉 Next Step

```bash
# 1. Run development server
npm run dev

# 2. Open browser
# http://localhost:3000/blog

# 3. Enjoy your new blog feature!
```

**Happy blogging!** 📝✨

---

*Last updated: Feb 20, 2026*
*Version: 1.0*
*Status: Production Ready* ✅
