#!/bin/bash

# Test script untuk WordPress REST API
# Usage: bash test-wordpress-api.sh

WORDPRESS_URL="https://blog.astraloka.my.id"
API_BASE="$WORDPRESS_URL/wp-json/wp/v2"

echo "🔍 Testing WordPress REST API"
echo "URL: $WORDPRESS_URL"
echo "================================"

# Test 1: Check if site is accessible
echo -e "\n📡 Test 1: Check if site is accessible..."
if curl -s -o /dev/null -w "%{http_code}" "$WORDPRESS_URL" | grep -q "200\|301\|302"; then
  echo "✅ Site is accessible"
else
  echo "❌ Site is NOT accessible"
  exit 1
fi

# Test 2: Check REST API availability
echo -e "\n🔌 Test 2: Check REST API availability..."
if curl -s "$API_BASE" > /dev/null; then
  echo "✅ REST API is available"
else
  echo "❌ REST API is NOT available"
fi

# Test 3: Fetch posts
echo -e "\n📰 Test 3: Fetch posts..."
POSTS=$(curl -s "$API_BASE/posts?per_page=1")
POST_COUNT=$(echo "$POSTS" | grep -o '"id"' | wc -l)

if [ "$POST_COUNT" -gt 0 ]; then
  echo "✅ Found posts"
  echo "$POSTS" | head -c 200
  echo -e "\n..."
else
  echo "⚠️  No posts found (API working but no posts)"
fi

# Test 4: Fetch categories
echo -e "\n\n📂 Test 4: Fetch categories..."
CATEGORIES=$(curl -s "$API_BASE/categories?per_page=1")
CAT_COUNT=$(echo "$CATEGORIES" | grep -o '"id"' | wc -l)

if [ "$CAT_COUNT" -gt 0 ]; then
  echo "✅ Found categories"
else
  echo "⚠️  No categories found"
fi

# Test 5: Fetch media
echo -e "\n\n🖼️  Test 5: Check featured images..."
MEDIA=$(curl -s "$API_BASE/media?per_page=1")
MEDIA_COUNT=$(echo "$MEDIA" | grep -o '"id"' | wc -l)

if [ "$MEDIA_COUNT" -gt 0 ]; then
  echo "✅ Found media"
else
  echo "⚠️  No media found"
fi

# Test 6: Full endpoint test
echo -e "\n\n🧪 Test 6: Full posts endpoint with embedded data..."
FULL=$(curl -s "$API_BASE/posts?per_page=1&_embed")
echo "$FULL" | python3 -m json.tool 2>/dev/null || echo "$FULL" | jq . 2>/dev/null || echo "$FULL" | head -c 500

echo -e "\n\n================================"
echo "✅ All tests completed!"
echo "================================"

echo -e "\n💡 Tips:"
echo "- Use 'curl' to test individual endpoints"
echo "- Use 'python3 -m json.tool' or 'jq' to format JSON"
echo "- Add '?_embed' to include featured images and authors"
echo "- Add '?per_page=X' to change pagination"

# Example curl commands
echo -e "\n📝 Example curl commands:"
echo "# Get 5 posts with embedded data"
echo "curl '$API_BASE/posts?per_page=5&_embed' | jq ."
echo ""
echo "# Search for specific article"
echo "curl '$API_BASE/posts?search=keyword&_embed' | jq ."
echo ""
echo "# Get post by slug"
echo "curl '$API_BASE/posts?slug=article-name&_embed' | jq ."
