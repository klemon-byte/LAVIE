import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LavieStore from '@/components/lavie/LavieStore';
import { coats } from '@/lib/lavie-data';
import '../../lavie.css';
import '../../lavie-product.css';
type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {id}=await params;
  const product=coats.find(item=>item.id===id);
  return {title:product?`${product.name} | LAVIE`:'Không tìm thấy sản phẩm | LAVIE'};
}
export default async function ProductPage({params}:Props){
  const {id}=await params;
  const product=coats.find(item=>item.id===id);
  if(!product)notFound();
  return <LavieStore key={product.id} detailProduct={product}/>;
}