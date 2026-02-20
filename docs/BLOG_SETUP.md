# Fitur Blog - Astraloka Website

Dokumentasi lengkap untuk fitur blog yang terintegrasi dengan WordPress Headless REST API.

## Configurasi

### URL Configuration

- **Next.js URL:** https://astraloka.my.id
- **WordPress URL:** https://blog.astraloka.my.id
- **WordPress REST API Base:** https://blog.astraloka.my.id/wp-json/wp/v2

### Environment Setup

Tidak ada environment variables yang diperlukan karena URL WordPress sudah di-hardcode di `lib/wordpress.ts`. Jika ingin membuat fleksibel, Anda bisa menambahkan ke `.env.local`:

```
NEXT_PUBLIC_WORDPRESS_URL=https://blog.astraloka.my.id
```

Kemudian update `lib/wordpress.ts`:

```typescript
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://blog.astraloka.my.id';
```

## Struktur Folder

```
app/
├── blog/
│   ├── page.tsx           # Halaman listing artikel
│   └── [slug]/
│       └── page.tsx       # Halaman detail artikel
├── page.tsx               # Halaman utama (updated dengan link blog)
└── layout.tsx

components/
├── BlogCard.tsx           # Komponen card untuk artikel
├── Navigation.tsx         # Komponen navbar
└── Footer.tsx             # Komponen footer

lib/
└── wordpress.ts           # Utility untuk komunikasi dengan WordPress REST API
```

## Fitur-Fitur

### 1. **Halaman Listing Blog** (`/blog`)

- Menampilkan daftar artikel dari WordPress
- Pagination (default 6 artikel per halaman)
- Featured image setiap artikel
- Author info dan publish date
- Link ke detail artikel
- Loading state dan error handling

**File:** [app/blog/page.tsx](../app/blog/page.tsx)

**Features:**
- Fetch articles dari WordPress REST API
- Display featured image, title, excerpt, dan author
- Pagination dengan tombol prev/next
- Responsive grid layout (1, 2, atau 3 kolom)

### 2. **Halaman Detail Artikel** (`/blog/[slug]`)

- Menampilkan artikel lengkap
- Featured image besar
- Author avatar, nama, dan publish date
- Full content dari WordPress (dengan HTML)
- Tags display
- Breadcrumb navigation
- Error handling untuk artikel yang tidak ditemukan

**File:** [app/blog/[slug]/page.tsx](../app/blog/[slug]/page.tsx)

### 3. **WordPress REST API Integration** (`lib/wordpress.ts`)

Utility functions untuk komunikasi dengan WordPress REST API:

#### Fungsi yang tersedia:

- **`getPosts(page, perPage, search)`**
  - Fetch multiple posts dengan pagination
  - Return: `{ posts, total, pages }`

- **`getPostBySlug(slug)`**
  - Fetch single post berdasarkan slug
  - Return: `WordPressPost | null`

- **`getPostById(id)`**
  - Fetch single post berdasarkan ID
  - Return: `WordPressPost | null`

- **`getMedia(id)`**
  - Fetch media/featured image info
  - Return: `WordPressMedia | null`

- **`getAuthor(id)`**
  - Fetch author information
  - Return: `WordPressAuthor | null`

- **`getCategories()`**
  - Fetch semua categories
  - Return: `WordPressCategory[]`

- **`getFeaturedImageUrl(post)`**
  - Extract featured image URL dari post
  - Return: `string | null`

- **`getAuthorFromPost(post)`**
  - Extract author dari embedded post data
  - Return: `WordPressAuthor | null`

### 4. **Komponen Reusable**

- **`BlogCard.tsx`** - Card component untuk menampilkan article preview
- **`Navigation.tsx`** - Navbar component dengan link ke blog
- **`Footer.tsx`** - Footer component yang improved

## Caching Strategy

Semua fetch requests menggunakan Next.js built-in caching:

```typescript
fetch(url, {
  next: { revalidate: 300 } // Cache untuk 5 menit
})
```

Anda bisa mengubah `revalidate` value:
- `0` - No cache, fetch setiap request
- `3600` - Cache 1 jam (cocok untuk media/author)
- `300` - Cache 5 menit (cocok untuk posts)

## WordPress REST API Endpoints

Endpoints yang digunakan:

```
GET /wp-json/wp/v2/posts              # List posts
GET /wp-json/wp/v2/posts?slug=name    # Get post by slug
GET /wp-json/wp/v2/posts/{id}         # Get post by ID
GET /wp-json/wp/v2/media/{id}         # Get featured image
GET /wp-json/wp/v2/users/{id}         # Get author info
GET /wp-json/wp/v2/categories         # Get categories
```

### Query Parameters

```
?page={n}              # Pagination page
?per_page={n}          # Posts per page
?search={query}        # Search query
?_embed                # Include embedded data (media, author)
```

## Type Definitions

Semua type definitions sudah tersedia di `lib/wordpress.ts`:

```typescript
interface WordPressPost { ... }
interface WordPressMedia { ... }
interface WordPressCategory { ... }
interface WordPressAuthor { ... }
```

## Usage Examples

### Fetch posts dalam component

```typescript
import { getPosts } from '@/lib/wordpress';

async function MyComponent() {
  const { posts, total, pages } = await getPosts(1, 10);
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title.rendered}</div>
      ))}
    </div>
  );
}
```

### Get featured image

```typescript
import { getFeaturedImageUrl } from '@/lib/wordpress';

const imageUrl = getFeaturedImageUrl(post);
if (imageUrl) {
  // Display image
}
```

## SEO Considerations

### Metadata untuk Blog Pages

Update metadata di layout atau page file:

```typescript
export const metadata: Metadata = {
  title: "Blog - Astraloka",
  description: "Artikel dan informasi tentang lingkungan...",
  openGraph: {
    title: "Blog - Astraloka",
    description: "...",
    type: "website",
  },
};
```

### Per-Article Metadata

Untuk halaman detail artikel, bisa generate metadata dinamis:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  return {
    title: post?.title.rendered,
    description: stripHtml(post?.excerpt.rendered || ''),
  };
}
```

## Error Handling

Semua API calls sudah include error handling:

- Network errors di-catch dan di-log
- 404 responses return `null` (untuk single items)
- Error messages ditampilkan ke user di UI

## Performance Tips

1. **Use Image Optimization**
   - Next.js Image component sudah digunakan untuk featured images
   - Ensure WordPress `srcset` attributes digunakan

2. **Pagination**
   - Default 6 items per page, bisa diatur
   - Reduce initial load dengan pagination

3. **Caching**
   - ISR (Incremental Static Regeneration) dengan `revalidate`
   - Adjust cache duration sesuai kebutuhan

4. **Search Functionality**
   - Bisa diimplementasikan dengan search parameter di WordPress
   - Currently implemented di `getPosts(search)` function

## Troubleshooting

### WordPress API returns 404

- Verify WordPress site accessible: https://blog.astraloka.my.id
- Check REST API endpoints: https://blog.astraloka.my.id/wp-json/wp/v2/posts
- Ensure posts are published (status: 'publish')

### Images not loading

- Check featured media is set in WordPress
- Verify image URL is accessible
- Check image privacy settings

### Slow page load

- Increase cache duration with `revalidate`
- Reduce posts per page
- Optimize WordPress featured images

## Future Enhancements

- [ ] Search functionality with filters
- [ ] Related posts
- [ ] Comments section
- [ ] Categories/Tags filtering
- [ ] Reading time estimate
- [ ] Social share buttons
- [ ] Newsletter subscription
- [ ] Archives by month/year

## Testing

### Test API connection

```bash
curl https://blog.astraloka.my.id/wp-json/wp/v2/posts?per_page=1
```

### Test with Next.js dev server

```bash
npm run dev
# Visit http://localhost:3000/blog
```

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
