const fs = require('node:fs/promises');
const sharp = require('sharp');
const selections = [
 ['colette','black-wool-belted-coat','Dạ đen thắt đai','Đen','#272526'],
 ['estelle','long-navy-wool-coat','Dạ xanh navy dáng dài','Xanh navy','#303947'],
 ['fleur','light-blue-coat','Dạ xanh dịu','Xanh nhạt','#a9c4d1'],
 ['giselle','wool-hooded-coat','Dạ có mũ','Be sáng','#c4bba8'],
 ['heloise','black-winter-coat','Dạ đen mùa đông','Đen','#272526'],
 ['iris','burgundy-wool-coat','Dạ đỏ burgundy','Đỏ burgundy','#713b42'],
 ['jeanne','green-wool-coat','Dạ xanh lá cổ điển','Xanh lá','#4c6351'],
 ['lise','belted-wrap-coat','Dạ hồng nâu thắt đai','Nâu hồng','#b28b83'],
 ['noemie','black-fitted-coat','Dạ đen dáng ôm','Đen','#272526'],
 ['odette','wool-cocoon-coat','Dạ phom cocoon','Đen','#272526'],
 ['pauline','mustard-yellow-coat','Dạ vàng mustard','Vàng mustard','#b9993d'],
 ['romane','double-breasted-camel-coat','Dạ camel khuy đôi','Nâu camel','#b48b60'],
 ['audrey','tailored-overcoat','Dạ ngà thanh lịch','Kem ngà','#e8dfd0'],
 ['claire','ivory-long-coat','Dạ ngà dáng dài','Kem ngà','#e8dfd0'],
 ['margot','brown-oversized-coat','Dạ nâu phom rộng','Nâu trầm','#79533f'],
 ['louise','camel-wrap-coat','Dạ camel buộc eo','Nâu camel','#b48b60'],
 ['juliette','full-length-winter-coat','Dạ be xám dáng dài','Be xám','#b3aa9d'],
 ['alice','oversized-long-wool-coat','Dạ yến mạch phom rộng','Be yến mạch','#c7bca9'],
 ['rose','wool-robe-coat','Dạ nâu dáng choàng','Nâu ấm','#896349'],
 ['ines','camel-wool-wrap-coat','Dạ camel thắt eo','Nâu camel','#b48b60'],
 ['adele','single-breasted-camel-coat','Dạ camel một hàng khuy','Nâu camel','#b48b60'],
 ['lucie','long-wool-overcoat','Dạ dài cổ điển','Nâu camel','#b48b60'],
 ['manon','caramel-brown-cashmere-coat','Dạ nâu caramel','Nâu caramel','#9e724c'],
 ['vivienne','cashmere-wrap-coat','Dạ choàng thanh lịch','Be ấm','#c7b69d'],
 ['charlotte','lightweight-beige-trench-coat','Trench be giao mùa','Be sáng','#d1c1a9'],
 ['gabrielle','silk-trench-coat','Trench dáng dài','Be ngà','#d9cebb'],
 ['lea','summer-trench-coat','Trench ngày nắng nhẹ','Be sáng','#d1c1a9'],
 ['sophie','cotton-trench-coat','Trench cổ điển thắt đai','Be cát','#bdaa88'],
 ['capucine','cashmere-wool-trench-coat','Trench yến mạch','Be yến mạch','#c7bca9'],
 ['diane','ivory-trench-coat','Trench ngà cuối tuần','Kem ngà','#e8dfd0'],
 ['eva','camel-wool-trench-coat','Trench camel công sở','Nâu camel','#b48b60'],
 ['flora','double-breasted-wool-long-coat','Trench hai hàng khuy','Be yến mạch','#c7bca9'],
 ['jade','wool-coat-maxi','Trench maxi thanh lịch','Be ấm','#c7b69d'],
 ['lena','belted-wool-trench-coat','Trench xám rêu thắt đai','Xám rêu','#777a68'],
 ['maelle','khaki-trench-coat','Trench khaki','Khaki','#8b8c6b'],
 ['nina','autumn-trench-coat','Trench xám xanh mùa thu','Xám xanh','#879089'],
];
(async()=>{
 const response=await fetch('https://sumarokova.shop/products.json?limit=250');
 if(!response.ok)throw Error(response.status);
 const {products}=await response.json();
 const output={}; const credits=[];
 for(let i=0;i<selections.length;i+=4){
  await Promise.all(selections.slice(i,i+4).map(async([id,handle,name,color,swatch])=>{
   const product=products.find(p=>p.handle===handle);
   if(!product?.images[0]?.src)throw Error('Missing '+handle);
   const url=new URL(product.images[0].src);url.searchParams.set('width','800');
   const image=await fetch(url);if(!image.ok)throw Error('Image '+handle);
   const filename='catalog-'+id;
   await sharp(Buffer.from(await image.arrayBuffer())).resize({width:720,withoutEnlargement:true}).webp({quality:82}).toFile('public/assets/lavie/'+filename+'.webp');
   output[id]={image:filename,label:name,color,swatch,...(['colette','estelle','fleur','giselle','heloise','iris','jeanne','lise','noemie','odette','pauline','romane'].includes(id)?{category:'wool'}:{})};
   credits.push(`${filename}.webp — Sumarokova Atelier\nhttps://sumarokova.shop/products/${handle}\n${product.images[0].src}`);
  }));
 }
 await fs.writeFile('lib/lavie-reference-assets.json',JSON.stringify(output,null,2));
 await fs.appendFile('public/lavie-credits.txt','\n\nExpanded catalogue reference photography (demo only):\n'+credits.join('\n\n')+'\n');
 console.log('Saved '+Object.keys(output).length+' reference images with credits.');
})().catch(e=>{console.error(e);process.exitCode=1});
