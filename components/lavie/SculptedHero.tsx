'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

const looks = [
  {id:'wool', name:'Dạ', title:'Một lớp ấm.', accent:'Vạn nét duyên.', label:'THE SCULPTED COAT', description:'Sắc camel ấm áp, đường cổ ve mềm và đai eo gọn gàng. Một lớp áo dành cho nét thanh lịch của riêng nàng.', notes:[['Cổ ve bản rộng','Đường nét mềm, tạo điểm nhấn ở vai.'],['Đai eo linh hoạt','Thắt nhẹ để định hình tỷ lệ trang phục.'],['Phom dài thanh lịch','Gợi ý phối cùng quần suông và cổ lọ.']]},
  {id:'trench', name:'Trench', title:'Nhẹ bước phố.', accent:'Đậm nét riêng.', label:'THE TIMELESS TRENCH', description:'Trench màu be, hàng khuy đôi và đai thắt cổ điển. Đồng hành cùng nàng từ ngày đi làm đến cuộc hẹn cuối tuần.', notes:[['Cầu vai cổ điển','Chi tiết tạo nét chỉn chu cho phần vai.'],['Đai khóa & khuy đôi','Điểm nhấn đặc trưng của trench coat.'],['Dáng áo giao mùa','Kết hợp sơ mi, denim hoặc quần âu.']]},
  {id:'tweed', name:'Tweed', title:'Một nét mềm.', accent:'Một dấu ấn.', label:'THE MODERN TWEED', description:'Tweed màu ngà với phom ngắn và hàng khuy nhỏ. Giữ sự tinh tế trong những bản phối đời thường của nàng.', notes:[['Cổ tròn tinh gọn','Dễ kết hợp với lớp áo trong tối giản.'],['Khuy & túi điểm nhấn','Chi tiết nhỏ trên nền vải dệt sáng màu.'],['Phom ngắn cân đối','Phối cùng quần cạp cao hoặc chân váy.']]},
];

export default function SculptedHero() {
  const [index,setIndex]=useState(0);
  const [hovered,setHovered]=useState(false);
  const [focused,setFocused]=useState(false);
  const [pinned,setPinned]=useState(false);
  const [mounted,setMounted]=useState(false);
  const root=useRef<HTMLElement>(null);
  const garment=useRef<HTMLAnchorElement>(null);
  const look=looks[index];
  const productId=['celine','camille','amelie'][index];
  const active=hovered||focused||pinned;
  useEffect(()=>{setMounted(true);},[]);
  useEffect(()=>{
    const dismiss=()=>{setHovered(false);setFocused(false);setPinned(false);};
    const keyboard=(event:KeyboardEvent)=>{if(event.key==='Escape'){dismiss();garment.current?.blur();}};
    const observer=new IntersectionObserver(entries=>{if(entries[0].intersectionRatio<.18)dismiss();},{threshold:.18});
    if(root.current)observer.observe(root.current);
    document.addEventListener('keydown',keyboard);
    window.addEventListener('blur',dismiss);
    return()=>{observer.disconnect();document.removeEventListener('keydown',keyboard);window.removeEventListener('blur',dismiss);};
  },[]);
  function select(next:number){setIndex((next+looks.length)%looks.length);setPinned(false);setHovered(false);setFocused(false);}
  function dismiss(){setHovered(false);setFocused(false);setPinned(false);garment.current?.blur();}
  return <>
    {mounted&&createPortal(<div className={'lv-screen-dimmer '+(active?'is-on':'')} aria-hidden="true"/>,document.body)}
    <section ref={root} className={'lv-sculpted '+(active?'is-inspecting':'')} aria-labelledby="sculpted-title" data-look={look.id}>
      <aside className="lv-sculpted-rail" aria-hidden="true"><span>LAVIE / AUTUMN WINTER 2026</span><i/></aside>
      <div className="lv-sculpted-stage">
        <div className="lv-studio-scene">
          {looks.map((item,i)=><img key={item.id} className={'lv-studio-photo '+(i===index?'is-current':'')} src={`/assets/lavie/studio-${item.id}.webp`} alt={i===index?`Người mẫu mặc áo ${look.name} trong studio LAVIE`:''} aria-hidden={i!==index} width="1860" height="846" fetchPriority={i===0?'high':'auto'}/>)}
          <div className="lv-studio-shade" aria-hidden="true"/>
          <div className="lv-studio-beam" aria-hidden="true"/>
          <div className="lv-studio-mist" aria-hidden="true"><span/><span/></div>
          <Link ref={garment} href={`/products/${productId}`} className="lv-garment-target" aria-label={`Xem sản phẩm áo ${look.name}`} aria-describedby={active?'lv-studio-annotations':undefined}
            onPointerEnter={e=>{if(e.pointerType==='mouse')setHovered(true);}} onPointerLeave={()=>setHovered(false)}
            onFocus={e=>{if(e.currentTarget.matches(':focus-visible'))setFocused(true);}} onBlur={()=>setFocused(false)}
            onClick={dismiss}/>
          <button className="lv-studio-preview" aria-expanded={active} aria-controls="lv-studio-annotations" onClick={()=>setPinned(value=>!value)}>Chi tiết thiết kế <span aria-hidden="true">↗</span></button>
          <div id="lv-studio-annotations" className="lv-studio-annotations" aria-hidden={!active}>
            <svg className="lv-studio-lines-desktop" viewBox="0 0 1000 455" preserveAspectRatio="none" aria-hidden="true">
              <path d="M681 115 L615 68 L520 68"/><circle cx="681" cy="115" r="3"/>
              <path d={look.id==='tweed'?'M719 132 L790 157 L841 157':'M723 178 L790 157 L841 157'}/><circle cx={look.id==='tweed'?719:723} cy={look.id==='tweed'?132:178} r="3"/>
              <path d={look.id==='tweed'?'M671 174 L594 294 L511 294':'M638 297 L594 294 L511 294'}/><circle cx={look.id==='tweed'?671:638} cy={look.id==='tweed'?174:297} r="3"/>
            </svg>
            <svg className="lv-studio-lines-mobile" viewBox="0 0 390 440" preserveAspectRatio="none" aria-hidden="true"><path d="M203 98 L152 70 L35 70"/><circle cx="203" cy="98" r="3"/><path d="M245 177 L290 211 L358 211"/><circle cx="245" cy="177" r="3"/><path d={look.id==='tweed'?'M196 183 L144 315 L32 315':'M176 298 L144 315 L32 315'}/><circle cx={look.id==='tweed'?196:176} cy={look.id==='tweed'?183:298} r="3"/></svg>
            {look.notes.map(([title,text],i)=><div className={`lv-studio-note note-${i+1}`} key={title}><small>0{i+1}</small><strong>{title}</strong><p>{text}</p></div>)}
          </div>
          <p className="lv-studio-label">{look.label}</p>
          {active&&<button className="lv-studio-dismiss" onClick={dismiss} aria-label="Tắt spotlight">Đóng chi tiết <span aria-hidden="true">×</span></button>}
        </div>
        <div className="lv-sculpted-copy" key={look.id}>
          <p className="lv-eyebrow">LAVIE · THU ĐÔNG 2026</p>
          <h1 id="sculpted-title">{look.title}<br/><em>{look.accent}</em></h1>
          <p className="lv-sculpted-description">{look.description}</p>
          <div className="lv-sculpted-cta"><Link className="lv-button" href={`/products?category=${look.id}`}>Khám phá sản phẩm <span aria-hidden="true">→</span></Link><Link className="lv-text-link" href="/lookbook">Xem lookbook <span aria-hidden="true">↗</span></Link></div>
          <p className="lv-sculpted-instruction"><span aria-hidden="true">✧</span> Chọn chiếc áo để xem sản phẩm.</p>
        </div>
      </div>
      <div className="lv-studio-selector">
        <div className="lv-studio-looks" role="group" aria-label="Chọn áo trưng bày">{looks.map((item,i)=><button key={item.id} onClick={()=>select(i)} aria-pressed={index===i} aria-label={`Trưng bày áo ${item.name}`}><span className="lv-studio-thumb" style={{backgroundImage:`url(/assets/lavie/studio-${item.id}.webp)`}}/><span>{item.name}</span></button>)}</div>
        <div className="lv-studio-controls"><span aria-live="polite">0{index+1} <small>/ 03</small></span><button onClick={()=>select(index-1)} aria-label="Thiết kế trước">←</button><button onClick={()=>select(index+1)} aria-label="Thiết kế tiếp theo">→</button></div>
      </div>
      <p className="lv-studio-mobile-caption">{look.label} · Hình ảnh concept LAVIE</p>
    </section>
  </>;
}
