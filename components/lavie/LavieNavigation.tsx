'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { categories } from '@/lib/lavie-data';

export default function LavieNavigation({page, category, favorites, onWishlist}: {
  page: 'home' | 'products' | 'about' | 'lookbook' | 'style-guide' | 'shopping-guide';
  category: string;
  favorites: number;
  onWishlist: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    function outside(event: PointerEvent) {
      if (!dropdown.current?.contains(event.target as Node)) setExpanded(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') { setExpanded(false); trigger.current?.focus(); }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [expanded]);

  useEffect(() => {
    if (!mobile) { drawer.current?.close(); return; }
    drawer.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 1101px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobile(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [mobile]);

  function close() { setExpanded(false); setMobile(false); drawer.current?.close(); }
  const links = categories.map(c => ({id:c.id, label:c.id==='all'?'Tất cả sản phẩm':c.label, href:'/products'+(c.id==='all'?'':'?category='+c.id)}));
  const categoryLinks = () => links.map(link => <Link key={link.id} href={link.href} onClick={close}
    aria-current={page==='products' && category===link.id?'page':undefined}>
    <span>{link.label}</span><span aria-hidden="true">↗</span>
  </Link>);
  return <>
    <button ref={mobileTrigger} className="lv-icon-button lv-menu-button lv-nav-mobile-trigger" aria-label="Mở menu" aria-expanded={mobile} aria-controls="lavie-mobile-navigation" onClick={()=>setMobile(true)}>
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
    </button>
    <nav className="lv-nav lv-nav-refined" aria-label="Điều hướng chính">
      <div className="lv-nav-dropdown" ref={dropdown} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);}}>
        <button ref={trigger} className={page==='products'?'active':''} aria-expanded={expanded} aria-controls="lavie-product-navigation" onClick={()=>setExpanded(!expanded)}>
          Sản phẩm <span className="lv-nav-chevron" aria-hidden="true">⌄</span>
        </button>
        {expanded && <div className="lv-nav-popover" id="lavie-product-navigation"><p>TỦ ÁO LAVIE</p>{categoryLinks()}<small>Chọn một kiểu áo, tìm nét riêng của nàng.</small></div>}
      </div>
      <Link href="/lookbook" aria-current={page==='lookbook'?'page':undefined} onClick={close}>Lookbook</Link>
      <Link href="/style-guide" aria-current={page==='style-guide'?'page':undefined} onClick={close}>Cẩm nang mặc đẹp</Link>
      <Link href="/shopping-guide" aria-current={page==='shopping-guide'?'page':undefined} onClick={close}>Hướng dẫn mua hàng</Link>
      <Link href="/about" aria-current={page==='about'?'page':undefined} onClick={close}>Về LAVIE</Link>
    </nav>
    <dialog ref={drawer} className="lv-navigation-drawer" id="lavie-mobile-navigation" aria-labelledby="lavie-menu-title" onCancel={()=>setMobile(false)} onClose={()=>{setMobile(false);mobileTrigger.current?.focus();}} onClick={event=>{if(event.target===drawer.current)close();}}>
      <div className="lv-navigation-sheet">
        <div className="lv-navigation-title"><span id="lavie-menu-title">Khám phá LAVIE</span><button autoFocus className="lv-icon-button" aria-label="Đóng menu" onClick={close}>✕</button></div>
        <nav aria-label="Điều hướng điện thoại">
          <Link href="/" onClick={close} aria-current={page==='home'?'page':undefined}>Trang chủ <span aria-hidden="true">↗</span></Link>
          <details open={page==='products'}><summary>Sản phẩm <span aria-hidden="true">+</span></summary><div className="lv-navigation-categories">{categoryLinks()}</div></details>
          <Link href="/lookbook" onClick={close} aria-current={page==='lookbook'?'page':undefined}>Lookbook <span aria-hidden="true">↗</span></Link>
          <Link href="/style-guide" aria-current={page==='style-guide'?'page':undefined} onClick={close}>Cẩm nang mặc đẹp</Link>
      <Link href="/shopping-guide" aria-current={page==='shopping-guide'?'page':undefined} onClick={close}>Hướng dẫn mua hàng</Link>
      <Link href="/about" onClick={close} aria-current={page==='about'?'page':undefined}>Về LAVIE <span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="lv-navigation-bottom"><button onClick={()=>{close();onWishlist();}}>Thiết kế yêu thích <span>{favorites}</span></button><p>Những lớp áo ấm.<br/>Những nét duyên riêng.</p></div>
      </div>
    </dialog>
  </>;
}
