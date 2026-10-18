import type { Metadata } from 'next';
import LavieStore from '@/components/lavie/LavieStore';
import '../lavie.css';
export const metadata: Metadata = { title: 'Tất cả sản phẩm | LAVIE — Áo khoác nữ' };
export default async function ProductsPage({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const key of ['category', 'q', 'price', 'color', 'sort', 'page']) {
    if (typeof params[key] === 'string') query.set(key, params[key]);
  }
  return <LavieStore catalog initialQuery={query.toString()} />;
}
