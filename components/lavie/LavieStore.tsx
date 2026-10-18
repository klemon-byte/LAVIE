'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import LavieNavigation from './LavieNavigation';
import SculptedHero from './SculptedHero';
import LavieProductDetail from './LavieProductDetail';
import useCatalogFilters from './useCatalogFilters';
import LavieEditorial, {editorialTitles, type EditorialPage} from './LavieEditorial';
import { useRouter } from 'next/navigation';
import { asset, categories, coats, colorGroup, money, type Coat } from '@/lib/lavie-data';

type IconName = 'arrow' | 'search' | 'bag' | 'heart' | 'close' | 'menu' | 'plus' | 'minus' | 'check' | 'leaf' | 'ruler' | 'spark' | 'instagram';
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M3 7h18M3 12h18M3 17h18" />,
    plus: <path d="M5 12h14M12 5v14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    leaf: <><path d="M20 3C8 2 2 9 5 16s17 5 15-13Z" /><path d="m4 21 11-13" /></>,
    ruler: <><path d="m3 15 12-12 6 6L9 21Z" /><path d="m12 6 3 3m-6 0 3 3m-6 0 3 3" /></>,
    spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
type CartLine = { id: string; size: string; quantity: number };
type Panel = 'search' | 'product' | 'cart' | 'wishlist' | 'checkout' | 'success' | 'guide' | null;

  function ProductCard({product, favorites, favorite, openProduct}: {product: Coat; favorites: string[]; favorite: (id: string) => void; openProduct: (product: Coat) => void}) {
    return <article className="lv-product">
      <div className={`lv-product-image ${product.id === 'chloe' ? 'lv-packshot' : ''}`}>
        <Link className="lv-image-open" href={`/products/${product.id}`} aria-label={`Xem ${product.name}`}><img src={asset(product.image)} alt={product.name} loading="lazy" width="600" height="800" /></Link>
        {product.tag && <span className="lv-tag">{product.tag}</span>}
        <button className={`lv-favorite ${favorites.includes(product.id)?'is-loved':''}`} onClick={()=>favorite(product.id)} aria-label={`${favorites.includes(product.id)?'Bỏ':'Thêm'} yêu thích ${product.name}`} aria-pressed={favorites.includes(product.id)}><Icon name="heart" size={19}/></button>
        <button className="lv-quick" onClick={()=>openProduct(product)}>Chọn kích thước <Icon name="plus" size={16}/></button>
      </div>
      <div className="lv-product-meta"><span>{categories.find(c=>c.id===product.category)?.label}</span><span className="lv-color-dot" style={{background:product.swatch}} title={product.color}/></div>
      <Link className="lv-product-name" href={`/products/${product.id}`}>{product.name}</Link>
      <p className="lv-price">{money(product.price)}</p>
    </article>;
  }

export default function LavieStore({catalog = false, initialQuery = '', page = 'home', detailProduct}: {catalog?: boolean; initialQuery?: string; page?: EditorialPage; detailProduct?: Coat}) {
  const router = useRouter();

  const {values, update, reset: resetFilters} = useCatalogFilters(catalog, initialQuery);
  const {category: filter, q: catalogSearch, price: priceFilter, color: colorFilter, sort} = values;
  const setFilter = (category: string) => update({category});
  const setCatalogSearch = (q: string) => update({q}, true);
  const setPriceFilter = (price: string) => update({price});
  const setColorFilter = (color: string) => update({color});
  const setSort = (sort: string) => update({sort});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);


  const [panel, setPanel] = useState<Panel>(null);
  const [selected, setSelected] = useState<Coat>(detailProduct || coats[0]);
  const [size, setSize] = useState('M');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const panelBody = useRef<HTMLDivElement>(null);


  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('lavie-cart-v1') || '[]');
      if (Array.isArray(saved)) setCart(saved.filter((x): x is CartLine => !!x && coats.some(p => p.id === x.id) && ['S','M','L','XL'].includes(x.size) && Number.isInteger(x.quantity) && x.quantity > 0).map(x => ({...x, quantity: Math.min(x.quantity, 10)})));
      const liked: unknown = JSON.parse(localStorage.getItem('lavie-favorites-v1') || '[]');
      if (Array.isArray(liked)) setFavorites(liked.filter((id): id is string => typeof id === 'string' && coats.some(p => p.id === id)));
    } catch { /* An unavailable browser store must not prevent shopping. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem('lavie-cart-v1', JSON.stringify(cart)); localStorage.setItem('lavie-favorites-v1', JSON.stringify(favorites)); } catch { /* Shopping remains available in memory. */ }
  }, [cart, favorites, ready]);
  useEffect(() => {
    if (panel && !dialog.current?.open) dialog.current?.showModal();
    if (!panel && dialog.current?.open) dialog.current?.close();
    if (panel) { panelBody.current?.scrollTo(0,0); }
    const old = document.body.style.overflow;
    if (panel) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; };
  }, [panel]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 3200); return () => clearTimeout(timer); }, [toast]);



  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) return;
    const nodes = root.current?.querySelectorAll('.lv-section-head, .lv-category, .lv-story-copy, .lv-look, .lv-care, .lv-newsletter');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) { entry.target.classList.remove('lv-reveal-pending'); observer.unobserve(entry.target); }
    }), {threshold: 0.08});
    nodes?.forEach(node => { if(node.getBoundingClientRect().top > window.innerHeight) node.classList.add('lv-reveal-pending'); observer.observe(node); });
    const showAll = () => nodes?.forEach(node => node.classList.remove('lv-reveal-pending'));
    media.addEventListener('change', showAll);
    return () => { observer.disconnect(); showAll(); media.removeEventListener('change', showAll); };
  }, [catalog]);

  useEffect(() => { if(filtersOpen) { const filters = document.getElementById("catalog-filters"); filters?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"}); filters?.focus({preventScroll:true}); } }, [filtersOpen]);
  const count = cart.reduce((n, line) => n + line.quantity, 0);
  const total = cart.reduce((n, line) => n + (coats.find(p => p.id === line.id)?.price || 0) * line.quantity, 0);
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
  const filtered = coats.filter(p => (filter === 'all' || p.category === filter)
    && (!catalog || normalize(p.name+' '+p.color).includes(normalize(catalogSearch)))
    && (!catalog || priceFilter==='all' || (priceFilter==='under' ? p.price<1700000 : p.price>=1700000))
    && (!catalog || colorFilter==='all' || colorGroup(p)===colorFilter)
  ).sort((a,b) => sort === 'asc' ? a.price-b.price : sort === 'desc' ? b.price-a.price : 0);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 6));
  const currentPage = Math.min(Number(values.page), pageCount);
  const startIndex = (currentPage - 1) * 6;
  const visible = catalog ? filtered.slice(startIndex, startIndex + 6) : filtered.slice(0,6);
  function changePage(nextPage: number) {
    update({page:String(nextPage)});
    document.getElementById('collection')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    document.getElementById('catalog-results-title')?.focus({preventScroll:true});
  }
  const results = coats.filter(p => normalize(p.name + ' ' + p.color).includes(normalize(query)));
  function browse(category = 'all') { setPanel(null); router.push('/products'+(category==='all'?'': '?category='+category)); }
  function openProduct(product: Coat) { setSelected(product); setSize('M'); setPanel('product'); }
  function favorite(id: string) { setFavorites(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]); }
  function add(product: Coat = selected) {
    const existing = cart.find(line => line.id === product.id && line.size === size);
    if (existing && existing.quantity >= 10) { setToast('Bạn đã chọn tối đa 10 sản phẩm cho mẫu và size này.'); return; }
    setCart(prev => existing ? prev.map(line => line === existing ? {...line,quantity:line.quantity+1} : line) : [...prev,{id:product.id,size,quantity:1}]);
    setToast(`Đã thêm ${product.name.split(' — ')[0]} · Size ${size} vào túi đồ`); setPanel('cart');
  }
  function changeQuantity(index: number, delta: number) { setCart(prev => prev.map((line,i) => i===index ? {...line,quantity:Math.min(10,line.quantity+delta)} : line).filter(line=>line.quantity>0)); }
  function newsletter(e: FormEvent<HTMLFormElement>) { e.preventDefault(); try { localStorage.setItem('lavie-newsletter-demo',email); setSubscribed(true); } catch { setToast('Trình duyệt không cho phép lưu. Vui lòng thử lại.'); } }
  function checkout(e: FormEvent<HTMLFormElement>) { e.preventDefault(); if(!cart.length)return; setOrderId(`LV-${Date.now().toString().slice(-6)}`); setCart([]); setPanel('success'); }
  return <div className={`lavie ${catalog ? 'lv-catalog-page' : 'lv-home-page'} ${!catalog && !detailProduct && page === 'home' ? 'lv-studio-home' : ''}`} ref={root}>
    <a className="lv-skip" href="#main-content">Đến nội dung chính</a>
    <div className="lv-announcement"><span>AUTUMN / WINTER 2026</span><span>Một mùa mới. Một nét duyên riêng.</span><Link href="/products">Khám phá ngay <span aria-hidden="true">↗</span></Link></div>
    <header className="lv-header">

      <Link className="lv-brand" href="/" aria-label="LAVIE — Trang chủ"><img src="/assets/lavie/logo-transparent.png" alt="LAVIE Women’s Outerwear" width="140" height="120" fetchPriority="high"/></Link>
      <LavieNavigation page={catalog||detailProduct?"products":page} category={detailProduct?.category || filter} favorites={favorites.length} onWishlist={()=>setPanel("wishlist")}/>
      <div className="lv-header-actions"><button className="lv-icon-button" aria-label="Tìm kiếm sản phẩm" onClick={()=>setPanel('search')}><Icon name="search"/></button><button className="lv-icon-button lv-desktop-heart" aria-label={`Yêu thích (${favorites.length})`} onClick={()=>setPanel('wishlist')}><Icon name="heart"/></button><button className="lv-icon-button lv-bag-button" aria-label={`Giỏ hàng (${count})`} onClick={()=>setPanel('cart')}><Icon name="bag"/><span>{count}</span></button></div>

    </header>
    <main id="main-content">
      {detailProduct && <LavieProductDetail product={detailProduct} size={size} onSize={setSize} onAdd={()=>add(detailProduct)} onGuide={()=>{setSelected(detailProduct);setPanel('guide');}} saved={favorites.includes(detailProduct.id)} onSave={()=>favorite(detailProduct.id)}/>}
      {!detailProduct && <>
      {page !== 'home' && <section className="lv-editorial-heading"><nav className="lv-breadcrumb" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>/</span><span aria-current="page">{editorialTitles[page].label}</span></nav><p className="lv-eyebrow">LAVIE JOURNAL · AUTUMN / WINTER</p><h1>{editorialTitles[page].title}</h1><p>{editorialTitles[page].intro}</p></section>}
      {!catalog && page === 'home' && <>
      <SculptedHero/>
      <div className="lv-values" aria-label="Tinh thần bộ sưu tập"><span><Icon name="spark" size={21}/> Thanh lịch trong từng chi tiết</span><i/><span><Icon name="leaf" size={21}/> Bảng màu lấy cảm hứng tự nhiên</span><i/><button onClick={()=>setPanel('guide')}><Icon name="ruler" size={21}/> Tìm phom dáng dành cho nàng <span>↗</span></button></div>
      <section className="lv-section lv-categories" id="categories"><div className="lv-section-head"><div><p className="lv-eyebrow">THE OUTERWEAR EDIT</p><h2>Một mùa, nhiều nét duyên.</h2></div><p>Từ ngày thường giản dị<br/>đến những khoảnh khắc đặc biệt.</p></div><div className="lv-category-grid">{[{id:'wool',image:'coat-cream',name:'Áo khoác dạ',sub:'Ấm áp & thanh lịch',num:'01'},{id:'trench',image:'pinterest-trench',name:'Trench coat',sub:'Cổ điển & phóng khoáng',num:'02'},{id:'tweed',image:'tweed',name:'Áo khoác tweed',sub:'Tinh tế & nữ tính',num:'03'}].map(c=><button key={c.id} className={`lv-category lv-category-${c.id}`} onClick={()=>browse(c.id)}><img src={asset(c.image)} alt={c.name} loading="lazy" width="600" height="800"/><span className="lv-category-number">{c.num} /</span><span className="lv-category-title"><span><small>{c.sub}</small><strong>{c.name}</strong></span><span className="lv-round-arrow"><Icon name="arrow"/></span></span></button>)}</div></section>
      </>}
      {catalog && <section className="lv-catalog-banner"><div className="lv-catalog-banner-inner"><div><nav aria-label="Đường dẫn" className="lv-breadcrumb"><Link href="/">Trang chủ</Link><span>/</span>{filter!=='all' && <><Link href="/products">Sản phẩm</Link><span>/</span></>}<span aria-current="page">{filter==='all'?'Tất cả sản phẩm':categories.find(c=>c.id===filter)?.label}</span></nav><p className="lv-eyebrow">THE LAVIE WARDROBE</p><h1>{filter==='all'?<>Tủ áo của <em>nàng.</em></>:categories.find(c=>c.id===filter)?.label}</h1><p>Những lớp áo ấm, những sắc màu dịu dàng.<br/>Tìm thiết kế đồng hành cùng nàng qua mùa thu đông.</p></div><div className="lv-catalog-collage"><img src={asset('tweed')} alt="Áo tweed màu kem"/><img src={asset('coat-cream')} alt="Áo khoác dạ thắt đai"/><span>THE NEW<br/>SEASON</span></div></div></section>}
      {(catalog || page === 'home') && <section className="lv-section lv-collection" id="collection">
        {!catalog && <div className="lv-section-head"><div><p className="lv-eyebrow">ĐƯỢC LAVIE TUYỂN CHỌN</p><h2>Điểm hẹn của <em>nét thanh lịch.</em></h2></div><Link className="lv-text-link" href="/products">Tất cả sản phẩm <span className="lv-count-pill">{coats.length}</span><Icon name="arrow" size={19}/></Link></div>}
        <div className={catalog?'lv-catalog-layout':''}>
          {catalog && <aside className={'lv-catalog-sidebar '+(filtersOpen?'is-open':'')} id="catalog-filters" tabIndex={-1} aria-label="Bộ lọc sản phẩm"><div className="lv-sidebar-heading"><h2>Bộ lọc</h2><button onClick={resetFilters}>Xóa tất cả</button></div><fieldset><legend>Danh mục sản phẩm</legend>{categories.map(c=><label key={c.id}><input type="radio" name="category" value={c.id} checked={filter===c.id} onChange={()=>setFilter(c.id)}/><span>{c.id==='all'?'Tất cả sản phẩm':c.label}</span><small>{coats.filter(p=>c.id==='all'||p.category===c.id).length}</small></label>)}</fieldset><fieldset><legend>Khoảng giá</legend>{[{id:'all',name:'Tất cả mức giá'},{id:'under',name:'Dưới 1.700.000 ₫'},{id:'over',name:'Từ 1.700.000 ₫'}].map(p=><label key={p.id}><input type="radio" name="price" checked={priceFilter===p.id} onChange={()=>setPriceFilter(p.id)}/><span>{p.name}</span></label>)}</fieldset><fieldset><legend>Màu sắc</legend><div className="lv-color-filters">{[{id:'all',name:'Tất cả',color:'linear-gradient(120deg,#dac9b6 50%,#68432d 50%)'},{id:'light',name:'Kem / Be',color:'#ded0bd'},{id:'brown',name:'Nâu',color:'#68432d'},{id:'other',name:'Màu khác',color:'#879089'}].map(c=><button key={c.id} className={colorFilter===c.id?'selected':''} onClick={()=>setColorFilter(c.id)} aria-pressed={colorFilter===c.id}><span style={{background:c.color}}/>{c.name}</button>)}</div></fieldset><div className="lv-sidebar-help"><Icon name="ruler" size={26}/><h3>Một chiếc áo vừa vặn.</h3><p>Tham khảo số đo để tìm size phù hợp với nàng.</p><button className="lv-text-link" onClick={()=>setPanel('guide')}>Hướng dẫn chọn size <Icon name="arrow" size={17}/></button></div><button className="lv-button lv-mobile-apply" onClick={()=>{setFiltersOpen(false);document.getElementById("collection")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});}}>Xem {filtered.length} thiết kế <Icon name="arrow" size={18}/></button></aside>}
          <div className="lv-catalog-results">
            {catalog && <div className="lv-catalog-search"><label><Icon name="search" size={20}/><input type="search" aria-label="Tìm trong tất cả sản phẩm" placeholder="Tìm kiểu áo, tên thiết kế, màu sắc…" value={catalogSearch} onChange={e=>setCatalogSearch(e.target.value)}/></label><button className="lv-filter-toggle" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={()=>setFiltersOpen(!filtersOpen)}><Icon name="menu" size={18}/> Bộ lọc</button></div>}
            <div className="lv-filter-row">{catalog?<p className="lv-result-count" id="catalog-results-title" tabIndex={-1} role="status">Hiển thị <strong>{filtered.length?startIndex+1:0}–{Math.min(startIndex+6,filtered.length)}</strong> / {filtered.length} thiết kế</p>:<div className="lv-filters" aria-label="Lọc theo kiểu áo">{categories.map(c=><button key={c.id} onClick={()=>setFilter(c.id)} className={filter===c.id?'selected':''} aria-pressed={filter===c.id}>{c.label}</button>)}</div>}<label className="lv-sort"><span className="lv-sr-only">Sắp xếp sản phẩm</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="default">LAVIE tuyển chọn</option><option value="asc">Giá thấp đến cao</option><option value="desc">Giá cao đến thấp</option></select></label></div>
            {catalog && (filter!=='all'||priceFilter!=='all'||colorFilter!=='all'||catalogSearch) && <div className="lv-active-filters">{filter!=='all'&&<button onClick={()=>setFilter('all')}>{categories.find(c=>c.id===filter)?.label}<Icon name="close" size={14}/></button>}{priceFilter!=='all'&&<button onClick={()=>setPriceFilter('all')}>{priceFilter==='under'?'Dưới 1.700.000 ₫':'Từ 1.700.000 ₫'}<Icon name="close" size={14}/></button>}{colorFilter!=='all'&&<button onClick={()=>setColorFilter('all')}>{colorFilter==='brown'?'Nâu':colorFilter==='other'?'Màu khác':'Kem / Be'}<Icon name="close" size={14}/></button>}{catalogSearch&&<button onClick={()=>setCatalogSearch('')}>“{catalogSearch}”<Icon name="close" size={14}/></button>}</div>}
            <div className="lv-product-grid" key={filter+sort+priceFilter+colorFilter+currentPage}>{visible.map(p=><ProductCard key={p.id} product={p} favorites={favorites} favorite={favorite} openProduct={openProduct}/>)}</div>
            {catalog && pageCount>1 && <nav className="lv-pagination" aria-label="Phân trang sản phẩm"><button disabled={currentPage===1} onClick={()=>changePage(currentPage-1)} aria-label="Trang trước">← <span>Trước</span></button><div>{Array.from({length:pageCount},(_,i)=>i+1).map(n=><button key={n} aria-label={`Trang ${n}`} aria-current={n===currentPage?'page':undefined} onClick={()=>changePage(n)}>{n}</button>)}</div><button disabled={currentPage===pageCount} onClick={()=>changePage(currentPage+1)} aria-label="Trang tiếp"><span>Tiếp</span> →</button><p>Trang {currentPage} / {pageCount} · 6 sản phẩm mỗi trang</p></nav>}
            {!visible.length && <div className="lv-empty lv-catalog-empty"><Icon name="search" size={40}/><h3>Chưa tìm thấy chiếc áo phù hợp.</h3><p>Nàng thử thay đổi từ khóa hoặc bỏ bớt bộ lọc nhé.</p><button className="lv-button" onClick={resetFilters}>Xem tất cả sản phẩm <Icon name="arrow" size={18}/></button></div>}
            <p className="lv-demo-note">Bộ sưu tập minh họa · Hình ảnh, tên thiết kế và giá dùng cho bản demo.</p>
            {!catalog && <div className="lv-collection-bottom"><Link className="lv-button lv-button-outline" href="/products">Ghé thăm tủ áo LAVIE <Icon name="arrow" size={19}/></Link></div>}
          </div>
        </div>
      </section>}
      {!catalog && <>
      {(page === 'home' || page === 'about') && <section className="lv-story" id="story"><div className="lv-story-image"><img src={asset('editorial')} alt="Áo dạ màu be trong ánh nắng thu dịu nhẹ" loading="lazy" width="900" height="1342"/><span>LESS, BUT LOVELIER.</span></div><div className="lv-story-copy"><p className="lv-eyebrow">THE LAVIE PHILOSOPHY</p><h2>Không chỉ là áo khoác.<br/>Là cách nàng<br/><em>yêu chính mình.</em></h2><p>LAVIE tin rằng sự thanh lịch bắt đầu từ cảm giác thoải mái khi được là chính mình. Không cần quá nhiều, chỉ cần một thiết kế khiến nàng muốn mặc lại, ngày này qua ngày khác.</p><p>Từ sắc kem nhẹ đến nâu chocolate trầm, mỗi gam màu mở ra một cách phối khác nhau. Nàng có thể chọn trench cho ngày giao mùa, áo dạ cho cảm hứng ấm áp, hoặc tweed để thêm nét chỉn chu. Hãy bắt đầu từ những món đồ đã có và tìm chiếc áo khiến chúng trở nên mới mẻ hơn.</p><Link className="lv-text-link" href="/lookbook">Bước vào thế giới LAVIE <Icon name="arrow" size={18}/></Link><div className="lv-brand-signature"><img src="/assets/lavie/logo-transparent.png" alt="Logo LAVIE Women's Outerwear do chủ thương hiệu cung cấp" width="94" height="96"/><span>Wear the warmth.<br/><em>Be yourself.</em></span></div></div></section>}
      {(page === 'home' || page === 'lookbook') && <section className="lv-section lv-lookbook" id="lookbook"><div className="lv-section-head"><div><p className="lv-eyebrow">LAVIE JOURNAL — VOL. 01</p><h2>Những ngày đẹp theo cách riêng.</h2></div><span className="lv-journal-note">Một chút cảm hứng, cho mỗi ngày của nàng.</span></div><div className="lv-lookbook-grid">{[{image:'hero',title:'Một buổi sáng nơi phố thị',sub:'THE CITY MUSE',product:1},{image:'coat-cream',title:'Dịu dàng giữa ngày se lạnh',sub:'SOFT & SLOW',product:0},{image:'tweed',title:'Thanh lịch, theo cách của nàng',sub:'EVERYDAY POETRY',product:2}].map(l=><button className="lv-look" key={l.image} onClick={()=>openProduct(coats[l.product])}><div><img src={asset(l.image)} alt={l.title} loading="lazy" width="600" height="800"/><span>Khám phá phong cách <Icon name="arrow" size={18}/></span></div><small>{l.sub}</small><h3>{l.title} <span>↗</span></h3></button>)}</div></section>}
      {(page === 'home' || page === 'about') && <section className="lv-section lv-care" id="care"><div><p className="lv-eyebrow">A LITTLE HELP, WITH LOVE</p><h2>Để nàng an tâm<br/><em>lựa chọn.</em></h2><button className="lv-text-link" onClick={()=>setPanel('guide')}>Xem hướng dẫn chọn size <Icon name="arrow" size={18}/></button></div><div className="lv-faq">{[{q:'Làm sao chọn phom áo phù hợp?',a:'Nếu yêu thích vẻ gọn gàng, nàng có thể bắt đầu với áo tweed dáng ngắn hoặc trench thắt eo. Áo dạ dáng dài và phom rộng phù hợp khi nàng muốn mặc nhiều lớp. Bảng size trong bản demo là bảng tham khảo, cần đối chiếu số đo sản phẩm thực tế.'},{q:'Chăm sóc áo khoác như thế nào?',a:'Hãy ưu tiên hướng dẫn trên nhãn áo. Dùng móc có bản vai rộng, để áo nơi khô thoáng và tránh cất áo khi còn ẩm. Với dạ và tweed, nên hỏi đơn vị giặt chuyên nghiệp trước khi giặt để giữ phom và bề mặt vải.'},{q:'Tôi có thể đặt hàng ngay không?',a:'Đây là cửa hàng demo của dự án LAVIE. Nàng có thể chọn size, thêm vào giỏ và thử quy trình đặt hàng. Demo không thu tiền, không gửi đơn đến cửa hàng. Giá, tồn kho, vận chuyển và chính sách đổi trả sẽ được cập nhật khi chính thức mở bán.'}].map(f=><details key={f.q}><summary>{f.q}<Icon name="plus" size={18}/></summary><p>{f.a}</p></details>)}</div></section>}
      <LavieEditorial page={page}/>
      <section className="lv-newsletter"><span className="lv-newsletter-flower" aria-hidden="true">✧</span><p className="lv-eyebrow">LET’S STAY CLOSE</p><h2>Một chút LAVIE, trong hộp thư nàng.</h2><p>Cảm hứng mặc đẹp và những thiết kế mới, dành cho nàng.</p><form onSubmit={newsletter}><label htmlFor="lavie-email" className="lv-sr-only">Địa chỉ email của nàng</label><input id="lavie-email" type="email" placeholder="Địa chỉ email của nàng" value={email} onChange={e=>{setEmail(e.target.value);setSubscribed(false);}} required maxLength={254}/><button type="submit" aria-label="Đăng ký nhận tin">{subscribed?<Icon name="check"/>:<Icon name="arrow"/>}</button></form><p className="lv-newsletter-note" role="status">{subscribed?'Đã lưu email trên trình duyệt này. Bản demo chưa gửi bản tin.':'Đăng ký thử nghiệm · Email chỉ được lưu trên trình duyệt của nàng.'}</p></section>
      </>}
      </>}
    </main>
    <footer className="lv-footer"><div className="lv-footer-top"><div><Link className="lv-brand" href="/"><img src="/assets/lavie/logo-transparent.png" alt="LAVIE Women’s Outerwear" width="160" height="140"/></Link><p>Thanh lịch trong từng khoảnh khắc.<br/>Ấm áp theo cách của nàng.</p></div><div><h3>KHÁM PHÁ</h3>{categories.slice(1).map(c=><button key={c.id} onClick={()=>browse(c.id)}>{c.label}</button>)}</div><div><h3>ĐỒNG HÀNH CÙNG NÀNG</h3><button onClick={()=>setPanel('guide')}>Hướng dẫn chọn size</button><Link href="/style-guide">Chăm sóc áo khoác</Link><Link href="/shopping-guide">Thông tin mua hàng</Link></div><div><h3>CẢM HỨNG LAVIE</h3><Link href="/about">Câu chuyện thương hiệu</Link><Link href="/lookbook">Lookbook thu đông</Link><a href="https://www.pinterest.com/pin/the-best-classic-trench-coats-for-women-for-a-minimal-chic-french-style-aesthetic--447474912991262778/" target="_blank" rel="noreferrer">Moodboard trên Pinterest ↗</a></div></div><div className="lv-footer-bottom"><span>© 2026 LAVIE. Made with a little warmth.</span><span>Bản demo thương mại điện tử · <Link href="/lavie-credits.txt" target="_blank">Nguồn hình ảnh</Link></span><span>VI / VND</span></div></footer>
    <button className="lv-back-top" aria-label="Về đầu trang" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><span><Icon name="arrow" size={18}/></span></button>
    {toast && <div className="lv-toast" role="status"><Icon name="check" size={18}/>{toast}</div>}
    <dialog ref={dialog} className={`lv-dialog ${panel==='product'?'lv-dialog-product':''}`} onCancel={()=>setPanel(null)} onClose={()=>setPanel(null)} onClick={e=>{if(e.target===dialog.current)setPanel(null);}} aria-label={panel==='product'?selected.name:panel==='cart'?'Túi đồ của nàng':panel==='search'?'Tìm kiếm sản phẩm':panel==='wishlist'?'Thiết kế yêu thích':'Thông tin LAVIE'}>
      <button className="lv-dialog-close lv-icon-button" onClick={()=>setPanel(null)} aria-label="Đóng cửa sổ"><Icon name="close"/></button><div className="lv-dialog-body" ref={panelBody}>
      {panel==='product' && <div className="lv-product-detail"><img src={asset(selected.image)} alt={selected.name} width="600" height="800"/><div><p className="lv-eyebrow">LAVIE — AUTUMN / WINTER</p><h2>{selected.name}</h2><p className="lv-detail-price">{money(selected.price)}</p><p>{selected.description}</p><div className="lv-detail-color"><span className="lv-color-dot" style={{background:selected.swatch}}/>{selected.color}</div><div className="lv-size-heading"><span>Kích thước: {size}</span><button onClick={()=>setPanel('guide')}>Hướng dẫn chọn size</button></div><div className="lv-sizes" aria-label="Chọn kích thước">{['S','M','L','XL'].map(s=><button key={s} className={size===s?'selected':''} aria-pressed={size===s} onClick={()=>setSize(s)}>{s}</button>)}</div><button className="lv-button lv-full" onClick={()=>add()}>Thêm vào túi đồ <Icon name="bag" size={20}/></button><button className="lv-detail-save" onClick={()=>favorite(selected.id)}><Icon name="heart" size={17}/>{favorites.includes(selected.id)?'Đã lưu vào yêu thích':'Lưu thiết kế yêu thích'}</button><p className="lv-demo-note">Sản phẩm và giá minh họa. Thông số chất liệu, số đo và tình trạng hàng sẽ được xác nhận khi mở bán.</p></div></div>}
      {panel==='search' && <div className="lv-panel"><p className="lv-eyebrow">FIND YOUR EVERYDAY FAVORITE</p><h2>Nàng đang tìm điều gì?</h2><label className="lv-search-field"><Icon name="search"/><input autoFocus type="search" placeholder="Thử “áo dạ”, “trench” hoặc “kem”…" aria-label="Từ khóa tìm kiếm" value={query} onChange={e=>setQuery(e.target.value)}/></label><p className="lv-panel-hint" role="status">{results.length} thiết kế dành cho nàng</p><div className="lv-search-results">{results.map(p=><button key={p.id} onClick={()=>openProduct(p)}><img src={asset(p.image)} alt="" width="64" height="86"/><span>{p.name}<small>{p.color} · {money(p.price)}</small></span><Icon name="arrow" size={18}/></button>)}</div>{!results.length&&<div className="lv-empty"><p>Chưa tìm thấy thiết kế phù hợp.</p><button className="lv-text-link" onClick={()=>setQuery('')}>Xem tất cả thiết kế <Icon name="arrow" size={18}/></button></div>}</div>}
      {panel==='wishlist' && <div className="lv-panel"><p className="lv-eyebrow">SAVED WITH LOVE</p><h2>Những thiết kế nàng yêu.</h2>{!favorites.length?<div className="lv-empty"><Icon name="heart" size={40}/><p>Chạm vào trái tim để lưu một thiết kế cho lần ghé sau.</p><button className="lv-button" onClick={()=>browse()}>Tìm thiết kế yêu thích <Icon name="arrow" size={18}/></button></div>:<div className="lv-product-grid lv-favorite-grid">{coats.filter(p=>favorites.includes(p.id)).map(p=><ProductCard key={p.id} product={p} favorites={favorites} favorite={favorite} openProduct={openProduct}/>)}</div>}</div>}
      {panel==='cart' && <div className="lv-panel"><p className="lv-eyebrow">A LITTLE SOMETHING FOR YOU</p><h2>Túi đồ của nàng <sup>({count})</sup></h2>{!count?<div className="lv-empty"><Icon name="bag" size={42}/><p>Túi đồ đang chờ một chút ấm áp.</p><button className="lv-button" onClick={()=>browse()}>Khám phá bộ sưu tập <Icon name="arrow" size={18}/></button></div>:<><div className="lv-cart-items">{cart.map((line,index)=>{const p=coats.find(p=>p.id===line.id)!;return <div className="lv-cart-line" key={line.id+line.size}><img src={asset(p.image)} alt={p.name} width="90" height="120"/><div><h3>{p.name}</h3><p>{p.color} · Size {line.size}</p><strong>{money(p.price)}</strong><div className="lv-quantity"><button aria-label={`Giảm số lượng ${p.name}`} onClick={()=>changeQuantity(index,-1)}><Icon name="minus" size={14}/></button><span>{line.quantity}</span><button disabled={line.quantity>=10} aria-label={`Tăng số lượng ${p.name}`} onClick={()=>changeQuantity(index,1)}><Icon name="plus" size={14}/></button></div></div><button className="lv-remove" aria-label={`Xóa ${p.name}`} onClick={()=>setCart(prev=>prev.filter((_,i)=>i!==index))}><Icon name="close" size={16}/></button></div>})}</div><div className="lv-cart-total"><span>Tạm tính</span><strong>{money(total)}</strong></div><p className="lv-demo-note">Bản demo chưa tính phí giao hàng và không thu tiền.</p><button className="lv-button lv-full" onClick={()=>setPanel('checkout')}>Tiếp tục đặt hàng thử <Icon name="arrow" size={18}/></button><button className="lv-continue" onClick={()=>browse()}>Tiếp tục khám phá</button></>}</div>}
      {panel==='checkout' && <div className="lv-panel"><p className="lv-eyebrow">ONE MORE LITTLE STEP</p><h2>Hoàn tất đơn thử nghiệm.</h2><p className="lv-panel-hint">Thông tin nhập tại đây chỉ dùng để mô phỏng, không gửi đến cửa hàng và không lưu lại.</p><form className="lv-checkout" onSubmit={checkout}><label>Họ và tên<input required name="name" autoComplete="name" maxLength={100} placeholder="Tên của nàng" pattern=".*\S.*"/></label><label>Số điện thoại<input required name="phone" type="tel" autoComplete="tel" pattern="(0[0-9]{9}|\+84[0-9]{9})" title="Nhập 10 chữ số bắt đầu bằng 0 hoặc +84 và 9 chữ số" placeholder="09xxxxxxxx"/></label><label>Địa chỉ nhận hàng<textarea required name="address" autoComplete="street-address" minLength={8} maxLength={400} placeholder="Số nhà, đường, phường/xã, tỉnh/thành phố"/></label><div className="lv-cart-total"><span>{count} sản phẩm · Tổng tạm tính</span><strong>{money(total)}</strong></div><p className="lv-demo-note">Không cần thanh toán. Đây là đơn thử nghiệm.</p><button className="lv-button lv-full" type="submit">Tạo đơn thử nghiệm <Icon name="arrow" size={18}/></button><button className="lv-continue" type="button" onClick={()=>setPanel('cart')}>Quay lại túi đồ</button></form></div>}
      {panel==='success' && <div className="lv-panel lv-success"><span className="lv-success-icon"><Icon name="check" size={34}/></span><p className="lv-eyebrow">THANK YOU, LOVELY</p><h2>Một chút ấm áp,<br/>đã được chọn.</h2><p>Đã hoàn tất mô phỏng đơn <strong>{orderId}</strong>.</p><p>Không có đơn hàng thực tế hoặc khoản thanh toán nào được tạo. Cảm ơn nàng đã trải nghiệm LAVIE.</p><button className="lv-button" onClick={()=>browse()}>Tiếp tục khám phá <Icon name="arrow" size={18}/></button></div>}
      {panel==='guide' && <div className="lv-panel"><p className="lv-eyebrow">FIND YOUR PERFECT FIT</p><h2>Vừa vặn, theo cách nàng.</h2><p className="lv-panel-hint">Bảng số đo cơ thể tham khảo cho bản demo, chưa phải thông số thành phẩm. Đơn vị: cm.</p><table className="lv-size-table"><thead><tr><th>Size</th><th>Vòng ngực</th><th>Vòng eo</th><th>Vòng hông</th></tr></thead><tbody>{[['S','80–84','62–66','86–90'],['M','85–89','67–71','91–95'],['L','90–94','72–76','96–100'],['XL','95–99','77–81','101–105']].map(row=><tr key={row[0]}>{row.map((v,i)=>i===0?<th key={i}>{v}</th>:<td key={i}>{v}</td>)}</tr>)}</tbody></table><p className="lv-panel-hint">Đo quanh phần đầy nhất của ngực và hông, giữ thước ngang và thoải mái. Khi mặc nhiều lớp bên trong, hãy đối chiếu thêm độ rộng của áo thực tế.</p><button className="lv-button" onClick={()=>setPanel('product')}>Chọn size cho {selected.name.split(' — ')[0]} <Icon name="arrow" size={18}/></button></div>}
      </div>
    </dialog>
  </div>;
}



