import referenceAssets from './lavie-reference-assets.json';
export type Coat = {
  id: string; name: string; category: 'wool' | 'trench' | 'tweed';
  price: number; image: string; color: string; swatch: string; tag?: string; description: string;
};
const signatureCoats: Coat[] = [
  { id: 'celine', name: 'Céline — Áo dạ thắt đai', category: 'wool', price: 1890000, image: 'studio-wool', color: 'Nâu camel', swatch: '#b28b68', tag: 'THE SIGNATURE', description: 'Phom áo rộng vừa phải cùng đai eo mềm mại. Sắc camel ấm áp để kết hợp với áo cổ lọ, quần suông và những ngày trời trở lạnh.' },
  { id: 'camille', name: 'Camille — Trench coat', category: 'trench', price: 1590000, image: 'studio-trench', color: 'Be sáng', swatch: '#d4c4ab', tag: 'NEW SEASON', description: 'Dáng trench hai hàng khuy, cổ ve cổ điển và đai thắt eo. Lựa chọn thanh lịch cho những ngày giao mùa, từ văn phòng đến buổi hẹn cuối tuần.' },
  { id: 'amelie', name: 'Amélie — Áo khoác tweed', category: 'tweed', price: 1290000, image: 'studio-tweed', color: 'Trắng ngà', swatch: '#e9e2d5', tag: 'NEW SEASON', description: 'Phom ngắn gọn gàng, cổ tròn cùng những chiếc khuy ánh vàng. Diện cùng chân váy hoặc denim để tạo nên nét thanh lịch rất riêng.' },
  { id: 'chloe', name: 'Chloé — Áo dạ chocolate', category: 'wool', price: 2090000, image: 'coat-brown', color: 'Nâu chocolate', swatch: '#623b29', description: 'Áo khoác dáng dài với cổ ve và hàng khuy tối giản. Tông chocolate trầm ấm là điểm nhấn cho một tủ đồ thu đông dễ kết hợp.' },
  { id: 'solene', name: 'Solène — Áo dạ dáng dài', category: 'wool', price: 2290000, image: 'lookbook', color: 'Kem sữa', swatch: '#dfd2bf', description: 'Đường nét thoải mái, chiều dài nổi bật cùng gam kem sữa. Gợi ý phối cùng sơ mi và quần âu cho những bước chân đầy tự tin.' },
  { id: 'elise', name: 'Élise — Trench cổ điển', category: 'trench', price: 1690000, image: 'pinterest-trench', color: 'Be cát', swatch: '#c8ad8c', description: 'Thiết kế trench coat lấy cảm hứng từ phong cách Pháp. Cầu vai, khuy đôi và đai eo tạo nên một tổng thể tinh tế, dễ mặc mỗi ngày.' },
];
// Concept catalogue for the demo, with individual reference photography;
// names, prices and descriptions must be replaced with verified stock before launch.
const concepts: [string, string, Coat['category'], string, number, string][] = [
  ['audrey','Audrey — Dạ cổ ve thanh lịch','wool','coat-cream',1790000,'Phối cùng sơ mi trắng và quần âu để giữ tổng thể gọn gàng khi đến văn phòng.'],
  ['claire','Claire — Dạ kem ngày đông','wool','lookbook',2190000,'Lớp áo ngoài sáng màu dành cho bản phối cổ lọ, chân váy midi và boots thấp cổ.'],
  ['margot','Margot — Dạ nâu trầm','wool','coat-brown',1990000,'Tạo chiều sâu cho trang phục bằng sắc nâu, áo len màu ngà và phụ kiện da tối màu.'],
  ['louise','Louise — Dạ buộc eo mềm','wool','coat-cream',2390000,'Đai eo là điểm nhấn cho bản phối nhiều lớp; có thể buộc lỏng để tạo cảm giác thoải mái.'],
  ['juliette','Juliette — Dạ phố thu','wool','editorial',1890000,'Gợi ý một lớp áo dài bên ngoài váy liền, phù hợp với những buổi dạo phố cuối tuần.'],
  ['alice','Alice — Dạ kem tối giản','wool','lookbook',1690000,'Một bản phối ít chi tiết, tập trung vào đường cổ áo và sự hài hòa của các sắc độ kem.'],
  ['rose','Rose — Dạ chocolate cổ điển','wool','coat-brown',2490000,'Kết hợp cùng denim sẫm và giày loafer cho phong cách cổ điển nhưng dễ ứng dụng.'],
  ['ines','Inès — Dạ thắt eo mùa lạnh','wool','coat-cream',2290000,'Gợi ý phối áo len mỏng bên trong và khăn quàng trơn để làm nổi bật đường thắt eo.'],
  ['adele','Adèle — Dạ dạo phố','wool','editorial',2090000,'Tông be mềm phù hợp với trang phục trắng ngà, tạo tổng thể nhẹ nhàng cho ngày se lạnh.'],
  ['lucie','Lucie — Dạ dài thanh thoát','wool','lookbook',2590000,'Dành cho ý tưởng phối áo dài với quần suông; giữ lớp áo bên trong gọn để cân bằng tỷ lệ.'],
  ['manon','Manon — Dạ nâu công sở','wool','coat-brown',2190000,'Bản phối công sở với áo cổ lọ, quần âu và túi có phom, sử dụng sắc nâu làm trọng tâm.'],
  ['vivienne','Vivienne — Dạ be dịu êm','wool','coat-cream',2690000,'Sắc be kết nối áo len ngà và phụ kiện nâu nhạt, thích hợp với phong cách đồng điệu màu sắc.'],
  ['charlotte','Charlotte — Trench giao mùa','trench','trench',1490000,'Gợi ý lớp áo ngoài cho sơ mi và quần jeans, dễ điều chỉnh giữa buổi sáng se lạnh và trưa ấm.'],
  ['gabrielle','Gabrielle — Trench phố Pháp','trench','pinterest-trench',1790000,'Kết hợp áo sọc ngang và giày bệt để tạo bản phối mang cảm hứng cổ điển.'],
  ['lea','Léa — Trench ngày thường','trench','hero',1390000,'Giữ trang phục bên trong đơn giản với áo thun trắng và denim xanh để chiếc trench làm điểm nhấn.'],
  ['sophie','Sophie — Trench thắt đai','trench','trench',1890000,'Buộc đai nhẹ ở eo hoặc để mở khi mặc cùng quần suông và áo dệt kim mỏng.'],
  ['capucine','Capucine — Trench be cát','trench','pinterest-trench',1590000,'Gam be cát là gợi ý trung tính cho bản phối với trắng, xanh navy và các phụ kiện nâu.'],
  ['diane','Diane — Trench cuối tuần','trench','hero',1690000,'Phối cùng sneakers gọn và túi đeo vai để chuyển từ buổi cà phê sang chuyến dạo phố.'],
  ['eva','Eva — Trench công sở','trench','trench',1990000,'Ý tưởng phối sơ mi xanh nhạt và quần âu, giữ phần cổ áo mở để tổng thể bớt cứng.'],
  ['flora','Flora — Trench cổ điển nhẹ','trench','pinterest-trench',1290000,'Tạo điểm nhấn bằng khăn lụa nhỏ trong một bản phối chủ đạo là kem và be.'],
  ['jade','Jade — Trench nhịp phố','trench','hero',1790000,'Phối trench với váy midi trơn và giày bệt cho những ngày cần di chuyển nhiều.'],
  ['lena','Léna — Trench sắc thu','trench','trench',2090000,'Một gợi ý cho tủ đồ giao mùa: áo ngoài màu sáng, lớp áo trong tối hơn và phụ kiện tiết chế.'],
  ['maelle','Maëlle — Trench thanh lịch','trench','pinterest-trench',1890000,'Bản phối hai tông màu với quần trắng ngà và giày nâu, nhấn ở đai eo và cổ ve.'],
  ['nina','Nina — Trench hành trình','trench','hero',1590000,'Ý tưởng phối linh hoạt cho ngày đi chơi với áo thun, quần đứng dáng và túi đeo chéo.'],
  ['colette','Colette — Tweed kem cổ tròn','tweed','tweed',1190000,'Phối cùng quần suông tối màu để cân bằng nét mềm mại của áo khoác sáng màu.'],
  ['estelle','Estelle — Tweed buổi hẹn','tweed','tweed',1490000,'Gợi ý kết hợp chân váy midi trơn và một đôi giày mũi nhọn cho buổi hẹn tối giản.'],
  ['fleur','Fleur — Tweed trắng ngà','tweed','tweed',1390000,'Một bản phối đồng sắc với áo trong màu ngà và quần kem, điểm thêm phụ kiện nâu nhạt.'],
  ['giselle','Giselle — Tweed công sở','tweed','tweed',1690000,'Kết hợp sơ mi mỏng và quần âu để tạo trang phục chỉn chu mà không cần nhiều phụ kiện.'],
  ['heloise','Héloïse — Tweed cuối tuần','tweed','tweed',1290000,'Đổi chân váy thành denim xanh để chiếc áo tweed gần gũi hơn trong sinh hoạt hằng ngày.'],
  ['iris','Iris — Tweed nét duyên','tweed','tweed',1790000,'Phối cùng váy liền trơn; chọn lớp bên trong ít chi tiết để giữ trọng tâm ở chiếc áo khoác.'],
  ['jeanne','Jeanne — Tweed cổ điển','tweed','tweed',1590000,'Gợi ý cho nàng yêu sự gọn gàng: quần đứng dáng, giày loafer và một chiếc túi nhỏ.'],
  ['lise','Lise — Tweed ngày mới','tweed','tweed',1090000,'Bản phối nhẹ nhàng với áo thun cổ tròn và chân váy chữ A cho những ngày giao mùa.'],
  ['noemie','Noémie — Tweed thanh nhã','tweed','tweed',1890000,'Dùng áo khoác sáng màu làm điểm nhấn trên nền trang phục đen, giữ phụ kiện cùng một tông.'],
  ['odette','Odette — Tweed ánh ngà','tweed','tweed',1990000,'Một gợi ý phối cùng quần ống rộng màu be, tạo sự nối tiếp giữa các sắc độ ấm.'],
  ['pauline','Pauline — Tweed dạo phố','tweed','tweed',1390000,'Diện cùng jeans đứng dáng và giày bệt, thích hợp cho cảm hứng thanh lịch hằng ngày.'],
  ['romane','Romane — Tweed mùa dịu','tweed','tweed',1590000,'Kết hợp lớp áo trong mỏng và một chiếc khăn nhỏ để hoàn thiện bản phối ngày se lạnh.'],
];
export const coats: Coat[] = [...signatureCoats, ...concepts.map(([id,name,category,image,price,description]) => {
  const reference = (referenceAssets as Record<string,{image:string;label:string;color:string;swatch:string;category?:Coat['category']}>)[id];
  return {id, name:reference?name.split(' — ')[0]+' — '+reference.label:name, category:reference?.category||category, price,
    image:reference?.image||image,
    description:reference?`Gợi ý ${reference.label.toLowerCase()} trong sắc ${reference.color.toLowerCase()}. Phối cùng lớp áo trong trơn, quần đứng dáng và phụ kiện tiết chế để giữ tổng thể hài hòa. Thiết kế và giá là dữ liệu mẫu; hình ảnh dùng để tham khảo phong cách.`:description,
    color:reference?.color||(category==='tweed'?'Trắng ngà':'Be / Kem'),
    swatch:reference?.swatch||(category==='tweed'?'#e9e2d5':'#c8b8a0'), tag:'STYLING EDIT'};
})];
export const colorGroup = (coat: Coat) => coat.color.includes('Nâu')?'brown': /Be|Kem|Trắng/.test(coat.color)?'light':'other';
export const categories = [{id:'all', label:'Tất cả thiết kế'}, {id:'wool',label:'Áo khoác dạ'}, {id:'trench',label:'Trench coat'}, {id:'tweed',label:'Áo khoác tweed'}];
export const money = (value: number) => new Intl.NumberFormat('vi-VN').format(value) + ' ₫';
export const asset = (name: string) => `/assets/lavie/${name}.webp`;
