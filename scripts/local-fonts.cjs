const fs=require('fs');
(async()=>{
 const families=[['sans','https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap'],['serif','https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap']];
 let all='';
 for(const [name,url] of families){const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});if(!response.ok)throw Error(response.status);let css=await response.text();const urls=[...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];for(let i=0;i<urls.length;i++){const r=await fetch(urls[i]);if(!r.ok)throw Error(r.status);const ext=urls[i].split('.').pop().split('?')[0];const path=`/fonts/lavie-${name}-${i}.${ext}`;fs.writeFileSync(`public${path}`,Buffer.from(await r.arrayBuffer()));css=css.split(urls[i]).join(path)}all+=css+'\n';console.log(name,urls.length,'local font files');}
 fs.writeFileSync('app/lavie-fonts.css',all);
})();
