'use client';

import Link from 'next/link';
import {asset, categories, coats, money, type Coat} from '@/lib/lavie-data';

type Props={product:Coat;size:string;onSize:(size:string)=>void;onAdd:()=>void;onGuide:()=>void;saved:boolean;onSave:()=>void};
export default function LavieProductDetail({product,size,onSize,onAdd,onGuide,saved,onSave}:Props){
  const category=categories.find(item=>item.id===product.category)!;
  return <div className="lv-detail-page">
    <nav className="lv-breadcrumb" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>/</span><Link href="/products">Sản phẩm</Link><span>/</span><span aria-current="page">{product.name.split(' — ')[0]}</span></nav>
    <div className="lv-detail-layout">
      <div className="lv-detail-gallery"><div className="lv-detail-photo"><img src={asset(product.image)} alt={product.name} width="800" height="1000" fetchPriority="high"/><span>LAVIE · AUTUMN / WINTER</span></div><p>Hình ảnh minh họa thiết kế · Bộ sưu tập LAVIE</p></div>
      <section className="lv-detail-info" aria-labelledby="product-title">
        <Link href={`/products?category=${product.category}`} className="lv-eyebrow">{category.label} ↗</Link>
        <h1 id="product-title">{product.name.split(' — ')[0]}<span>{product.name.split(' — ')[1]}</span></h1>
        <p className="lv-detail-amount">{money(product.price)}</p><p className="lv-detail-description">{product.description}</p>
        <div className="lv-detail-color"><span className="lv-color-dot" style={{background:product.swatch}}/>Màu sắc: {product.color}</div>
        <div className="lv-size-heading"><span>Kích thước: <strong>{size}</strong></span><button onClick={onGuide}>Hướng dẫn chọn size ↗</button></div>
        <div className="lv-sizes" role="group" aria-label="Chọn kích thước">{['S','M','L','XL'].map(item=><button key={item} onClick={()=>onSize(item)} aria-pressed={size===item} className={size===item?'selected':''}>{item}</button>)}</div>
        <p className="lv-detail-fit">Nàng dự định mặc nhiều lớp? Hãy tham khảo bảng số đo trước khi chọn size.</p>
        <button className="lv-button lv-full" onClick={onAdd}>Thêm vào túi đồ <span aria-hidden="true">→</span></button>
        <button className="lv-detail-save" onClick={onSave} aria-pressed={saved}>{saved?'♥ Đã lưu thiết kế':'♡ Lưu thiết kế yêu thích'}</button>
        <p className="lv-demo-note">Sản phẩm và giá minh họa cho bản demo. Chưa phát sinh đơn hàng hoặc thanh toán thực tế.</p>
        <div className="lv-detail-accordions">
          <details open><summary>Gợi ý mặc đẹp <span>+</span></summary><p>{product.category==='tweed'?'Kết hợp áo phom ngắn với quần cạp cao hoặc chân váy trơn. Giữ lớp áo trong ít chi tiết để làm nổi bật bề mặt dệt.':product.category==='trench'?'Phối cùng sơ mi, quần âu hoặc denim. Thắt nhẹ đai eo khi muốn tạo tỷ lệ gọn gàng, hoặc mở áo để di chuyển thoải mái.':'Phối cùng áo cổ lọ và quần suông. Chọn phụ kiện cùng tông nâu, kem hoặc đen để giữ tổng thể hài hòa.'}</p></details>
          <details><summary>Chất liệu & chăm sóc <span>+</span></summary><p>Thành phần chất liệu, độ dày và số đo thành phẩm sẽ được xác nhận khi mở bán. Ưu tiên hướng dẫn trên nhãn áo, treo bằng móc bản rộng và giữ áo ở nơi khô thoáng.</p></details>
          <details><summary>Mua hàng & đổi trả <span>+</span></summary><p>Bản demo cho phép chọn size và thử giỏ hàng. Phí giao hàng, tồn kho và chính sách đổi trả chưa được áp dụng. <Link href="/shopping-guide">Xem hướng dẫn mua hàng ↗</Link></p></details>
        </div>
      </section>
    </div>
    <section className="lv-detail-related"><div><p className="lv-eyebrow">THÊM MỘT CHÚT CẢM HỨNG</p><h2>Nàng có thể thích.</h2></div><div className="lv-detail-related-grid">{coats.filter(item=>item.id!==product.id).slice(0,3).map(item=><Link href={`/products/${item.id}`} key={item.id}><img src={asset(item.image)} alt={item.name} loading="lazy" width="400" height="500"/><h3>{item.name}</h3><p>{money(item.price)}</p></Link>)}</div></section>
  </div>;
}
