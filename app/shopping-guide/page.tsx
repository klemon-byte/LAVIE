import type { Metadata } from 'next';
import LavieStore from '@/components/lavie/LavieStore';
import '../lavie.css';
export const metadata: Metadata = {title:'Hướng dẫn mua hàng | LAVIE'};
export default function ShoppingGuidePage() { return <LavieStore page="shopping-guide"/>; }
