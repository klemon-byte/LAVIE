import type { Metadata } from 'next';
import LavieStore from '@/components/lavie/LavieStore';
import '../lavie.css';

export const metadata: Metadata = { title: 'Về LAVIE | Tinh thần thanh lịch' };
export default function AboutPage() { return <LavieStore page="about" />; }
