# 🌿 Mini Shop Decor — Dự Án Mẫu Vibe Coding (Chương 1 - 8)

Dự án thương mại điện tử chuyên đồ thủ công mỹ nghệ, gốm sứ độc bản và nội thất trang trí nhà cửa mộc mạc, được xây dựng hoàn chỉnh theo giáo trình **"Vibe Coding với Antigravity" (Khóa AI-03)** của **Trung tâm Đào tạo AI Sao Việt**.

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) với trình biên dịch siêu tốc **Turbopack**.
- **Thư viện UI**: React 19, TypeScript strictly-typed, Tailwind CSS v4.
- **Cơ sở dữ liệu**: [Supabase](https://supabase.com/) (PostgreSQL đám mây) với bảo mật **Row Level Security (RLS)**.
- **Xác thực & Phân quyền**: Supabase Auth + Dual-layer Fallback (Session + Local Storage).
- **Hạ tầng triển khai**: [Vercel](https://vercel.com/) (CI/CD tự động nối với GitHub).
- **Thiết kế & Trải nghiệm**: Phong cách Japandi / Mộc mạc ấm áp, chuẩn hóa 100% không ảnh vỡ, hỗ trợ toàn diện trên thiết bị di động.

---

## 📖 Hành Trình 8 Chương Theo Giáo Trình

| Chương | Nội dung | Trạng thái |
| :--- | :--- | :---: |
| **Chương 1** | Làm quen Vibe Coding, dựng Game mini 30 giây (`game-30s/`) | ✅ Hoàn thành |
| **Chương 2** | Dựng cửa hàng Mini Shop bằng HTML/CSS/JS (11 màn hình tĩnh) | ✅ Hoàn thành |
| **Chương 3** | Chuyển dịch toàn bộ sang Next.js App Router (Turbopack) | ✅ Hoàn thành |
| **Chương 4** | Quản lý mã nguồn với Git, cài đặt Skill Antigravity chuyên sâu | ✅ Hoàn thành |
| **Chương 5** | Dựng kho dữ liệu Supabase PostgreSQL (`schema.sql`), CRUD sản phẩm | ✅ Hoàn thành |
| **Chương 6** | Vận hành thực tế: Giỏ hàng, Đặt hàng, Auth & Phân quyền Admin | ✅ Hoàn thành |
| **Chương 7** | Khám tổng quát (10 bước Người mua, 6 bước Người bán, Thử người lạ) | ✅ Đạt 4 chữ "RỒI" |
| **Chương 8** | Bật khóa an toàn RLS, sẵn sàng phát hành toàn cầu lên Vercel | ✅ Sẵn sàng 100% |

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local)

### 1. Cài đặt thư viện
```bash
cd mini-shop-next
npm install
```

### 2. Cấu hình biến môi trường
Sao chép `.env.example` thành `.env.local`:
```bash
cp .env.example .env.local
```
Điền URL và Anon Key lấy từ Supabase Dashboard (`Project Settings` -> `API`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Nếu chưa có tài khoản Supabase, ứng dụng tự động kích hoạt chế độ Dual-Layer Fallback lưu trữ cục bộ mượt mà 100% không lo gián đoạn).*

### 3. Dựng Database Supabase
1. Đăng nhập Supabase Dashboard -> Tạo New Project.
2. Mở mục **SQL Editor**.
3. Mở file `schema.sql`, sao chép toàn bộ nội dung, dán vào và nhấn **Run**.
4. Toàn bộ bảng (`categories`, `products`, `orders`, `order_items`, `profiles`) và chính sách bảo mật **RLS** sẽ được thiết lập tự động.

### 4. Khởi chạy máy chủ phát triển
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Tài Khoản Kiểm Thử Nghiệm Thu

| Vai trò | Email / Username | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@minishop.com` hoặc `admin` | `admin` | Toàn quyền quản lý kho, thêm/sửa/xóa sản phẩm, duyệt đơn hàng |
| **Khách mua hàng (Customer)** | Đăng ký trực tiếp tại `/login` | Tùy chọn (>= 6 ký tự) | Mua hàng, thả tim, giỏ hàng, xem đơn hàng cá nhân |
| **Người lạ (Stranger)** | Chưa đăng nhập | Không có | Bị chặn truy cập trang `/admin` ngay lập tức |

---

## 🌐 Triển Khai Lên Mạng Qua Vercel (Chương 8)

1. **Đẩy mã nguồn lên GitHub**:
   ```bash
   git add .
   git commit -m "feat: Chuan bi phat hanh Vercel"
   git remote add origin https://github.com/<tai-khoan>/mini-shop.git
   git push -u origin main
   ```
2. **Import vào Vercel**:
   - Truy cập [vercel.com](https://vercel.com) -> Đăng nhập bằng tài khoản GitHub.
   - Chọn **Add New...** -> **Project** -> Chọn kho lưu trữ `mini-shop`.
   - Nếu kho có thư mục con, chọn **Root Directory** là `mini-shop-next`.
3. **Cài đặt Biến Môi Trường (Environment Variables)**:
   - Thêm `NEXT_PUBLIC_SUPABASE_URL`
   - Thêm `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Bấm Deploy**:
   - Vercel sẽ tự động build và cấp phát đường dẫn tên miền công khai dạng `https://mini-shop-xxx.vercel.app`.

---

## 🎯 4 Thói Quen Vàng Của Vibe Coding

1. **Yêu cầu 4 phần rõ ràng**: Nêu rõ Việc - Nguồn - Kết quả - Lưu ý.
2. **Lên kế hoạch trước khi làm lớn**: Tạo file kế hoạch, chốt giải pháp mới bắt tay vào code.
3. **Git là trí nhớ của dự án**: Làm xong tính năng nào lưu mốc ngay tính năng đó, không gộp bừa bãi.
4. **Tự tay nghiệm thu trước khi chốt**: Đóng vai người mua, người bán, người lạ trước khi bàn giao cho người khác.

## LAVIE storefront (2026-10-18)

The `/` homepage and `/products` catalogue form a Vietnamese women's autumn/winter outerwear boutique built with the existing Next.js / React architecture. Legacy demo routes remain in source. LAVIE uses an isolated local shopping demo and does not connect to the demo's Supabase inventory.

Run from `mini-shop-next`: `npm run dev`. Open http://localhost:3000 and http://localhost:3000/products. Production check: `npm run build`.

### Design and content

Seven homepage sections: campaign hero, coat categories, featured collection, brand story, lookbook, fit/care FAQ, newsletter. The hero has three manually controlled campaigns, bounded portrait photography and direct shopping actions. Cream, dusty rose and warm brown follow the supplied logo. The actual illustrated brand mark is used in the header, story and footer; `logo-transparent.png` is the ImageGen background-removal output, with genuine PNG alpha. The original remains at `logo.png`.

Typography uses locally served Be Vietnam Pro and Playfair Display with Vietnamese glyphs. Responsive sizes, spacing and touch targets are defined in `app/lavie.css`. Effects include section reveals, campaign image transitions, product hovers, favorite feedback and animated dialogs. Reduced-motion preferences are respected.

Research references: Max Mara (https://gb.maxmara.com/ and https://us.maxmara.com/coats-and-jackets/womens-coats), Sézane (https://www.sezane.com/us-en/collection/coats), and Pinterest styling boards. These informed fashion editorial photography, silhouette categories and shopping controls. This is an original layout.

### Editing

- `components/lavie/LavieStore.tsx`: homepage, catalogue, dialogs and shopping interactions.
- `app/products/page.tsx`: catalogue route and initial category query.
- `app/lavie.css`: responsive layout and scoped component styling.
- `app/lavie-fonts.css`, `public/fonts/`: locally served fonts.
- `lib/lavie-data.ts`: six illustrative products, categories, prices and images.
- `public/lavie-credits.txt`: image and design sources.
- `artifacts/logo-edit.txt`: built-in ImageGen edit prompt and output.

The catalogue displays all six current designs with category, price and color filters, unaccented Vietnamese search, price sorting, result counts, clear-filter controls and empty states. Mobile filters expand with an apply button. Favorites and size-specific cart items persist locally between pages and reloads; quantity changes update totals. Checkout is explicitly simulated and neither sends orders nor charges money. Newsletter signup stores the submitted email only in the current browser.

Product photos are reference assets from retailers and Pinterest, stored locally with source credits. Names, prices and sizing are illustrative. Commercial launch needs owned/licensed images, verified inventory and policies, and connected order/payment/newsletter services.

### Verification

Production compilation and TypeScript pass. Browser checks cover hero navigation, catalogue search/filter combinations, empty states, reset, price ordering, quick size selection and cart persistence between routes. Mobile filtering and apply behavior were exercised at 390px. Layout checks at 320px and 1920px found no horizontal overflow or failed images. The transparent logo has alpha values from 0 through 255. Screenshots are saved in `artifacts/lavie-v2-*.png`.
### Navigation refinement

Desktop navigation is now Products (a click/keyboard disclosure with all three categories), Lookbook and About. The logo links home. Mobile uses a native modal drawer with a collapsible product group, focus containment, Escape/backdrop dismissal and scroll lock. Category links are consistent across both layouts and the active page/category is indicated.

`/about` and `/lookbook` have dedicated content, titles and breadcrumbs, and internal links use Next Link. Catalogue filters, search and sorting are reflected in the URL; refresh and Back/Forward restore those selections. Search replaces the current history entry to avoid one history entry per keystroke. `LavieNavigation.tsx` owns menu interaction; `useCatalogFilters.ts` owns URL filter state.

Verification: production build and TypeScript pass; desktop dropdown selection, dedicated editorial routes, mobile expansion/navigation/Escape, reload with filters and sorting, and Back restoring the preceding sort state were exercised in-browser. Menu screenshots are in `artifacts/lavie-menu-*.png`.

### Expanded content and catalogue

The catalogue now contains 42 illustrative entries, split into 7 pages of 6 products. Pagination runs after search, category/color/price filtering and price sorting. Every filter/sort change resets page 1; `page` is in the URL and restores on reload/Back. Out-of-range pages are clamped to the last available page. The homepage displays six selected products.

The menu adds `/style-guide` (fit, colors, layering, care) and `/shopping-guide` (browse, size, cart and demo limitations). About now covers brand philosophy, palette and shopping principles; Lookbook adds three detailed image-and-text outfit stories, day-to-evening ideas and shopping links. Homepage includes occasion-based shopping advice and wardrobe planning. Editorial content is in `components/lavie/LavieEditorial.tsx`.

36 additional reference images from Sumarokova Atelier are stored as optimized local WebP files, mapped in `lib/lavie-reference-assets.json`; source pages and image URLs are in `public/lavie-credits.txt`. Each catalogue entry has a separate image asset. Names/prices are demo data, not actual stock. No commercial image-use rights are implied.

Browser checks: all-products page 1 displays 1–6 / 42, page 7 displays 37–42 / 42. Category pagination and searching Romane from a later page were tested; searching resets to page 1 with one result. Reload preserves page 2. Desktop and mobile content layouts are visually reviewed.

### Sculpted studio hero

SculptedHero.tsx replaces the homepage hero with three coordinated local WebP studio scenes (Dạ, Trench, Tweed). Hover or keyboard focus on the garment activates a viewport dimmer, warm spotlight, and three SVG-linked garment notes. Click/tap pins details; the close control, Escape, window blur, or leaving the hero dismisses them. Thumbnails and arrows change the scene, copy, category CTA, and annotations together. Mobile uses a portrait crop and separate leader-line layout; reduced-motion preferences remove transitions. Styles are scoped in app/sculpted-hero.css. Generated scene credits are in public/lavie-credits.txt.

Studio verification: production compilation and TypeScript pass. Browser checks cover pointer entry/exit, pinned details, Escape, keyboard focus, all three scene selectors, cyclic next navigation, and the category CTA (wool: 1–6 / 27). Responsive iframe checks at 1440, 390 and 320 pixels found no horizontal overflow or failed images; mobile-size click selection and detail annotations were visually reviewed. Screenshots: artifacts/lavie-studio-default.png and artifacts/lavie-studio-spotlight.png.

Soft-light refinement: removed the garment plus/hint overlay. Replaced the clipped cone with feathered radial light; added two slow procedural SVG mist layers masked away from the garment center. Fog runs only while inspecting and respects reduced-motion preferences. Build/TypeScript pass; browser checks confirm removed controls, close behavior and switching to Tweed. Preview: artifacts/lavie-soft-light-mist.png.

Directional light update: studio-overhead-light.svg uses overlapping curved light volumes with Gaussian-feathered edges and downward intensity falloff, replacing the surrounding radial glow. Its mobile crop follows the photo at 78% position. Existing mist and garment interactions remain. Production build passes; visual preview: artifacts/lavie-overhead-soft-light.png.

### Product navigation and spotlight interaction
The overhead cone is restored with blurred edges, a downward light falloff and the existing haze. Hover/focus previews garment notes; the garment itself is a Next Link to /products/celine, /products/camille or /products/amelie. Small screens provide a separate detail-preview button; tapping the garment navigates directly. Product image/name links in the catalogue also navigate, while quick size selection remains available.

The old decor /products/[id] route is replaced by LAVIE product details for catalogue IDs, with notFound for unknown IDs. Shared LavieStore cart, favorites, size guide and demo checkout are reused. Hero products share studio imagery with the catalogue and details; Céline uses camel color. Browser checks passed for all three hero destinations, mobile preview-to-product navigation, and Céline size L added to the cart (test item removed afterward). Production compilation/TypeScript passed. Screenshots: artifacts/lavie-cone-soft-edge.png and artifacts/lavie-product-page.png.

Outfit light tuning: overhead source offset slightly left with reduced light opacity and soft protection masks over the face/fabric to retain contrast. Fog is concentrated near the base rather than over the upper body; a faint floor light pool retains visible shoe shadows. Desktop and mobile haze masks updated. Build and TypeScript pass. Screenshot: artifacts/lavie-outfit-light-final.png.

### Dify chatbot

`components/chat/DifyChatbot.tsx` configures the public Dify embed token and loads the vendor script through `next/script` with `lazyOnload` and `dynamicScript: true`. It is mounted once in the root layout, so client-side navigation preserves the conversation. The widget is hidden on admin routes. No customer identity or cart data is passed to Dify.

`app/dify-chatbot.css` keeps the requested blue launcher and 24rem by 40rem desktop window, constrains the frame to small viewports, and separates the back-to-top button from chat. The launcher supports keyboard activation and accessible Vietnamese labels. A direct chatbot link appears if the embed script fails to load.

Verification (2026-10-19): production build and TypeScript passed; the real Dify iframe loads and accepts a message. The conversation persists after navigating from home to `/products/celine`, with one launcher and one iframe. Frame bounds verified at 390x844 and 320x640. Screenshots are in `artifacts/lavie-dify-desktop.png` and `artifacts/lavie-dify-mobile.png`.

External blocker: the published bot currently returns `Model Currently Not Support` after sending a message, so successful AI replies could not be verified. Check the failing model node and model-provider configuration in Dify, test it there, then publish again. The embedded app currently displays `Knowledge: Chat with Your Documents` and an English document-assistant greeting; configure the bot name, opening message, instructions and product knowledge in Dify if it should act as the LAVIE shopping assistant. The embed alone does not synchronize the site's catalogue into Dify.
