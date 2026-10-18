import type { Metadata } from 'next';
import LavieStore from '@/components/lavie/LavieStore';
import '../lavie.css';
export const metadata: Metadata = {title:'Cẩm nang mặc đẹp | LAVIE'};
export default function StyleGuidePage() { return <LavieStore page="style-guide"/>; }
