import type { Metadata } from 'next';
import LavieStore from '@/components/lavie/LavieStore';
import '../lavie.css';

export const metadata: Metadata = { title: 'Lookbook thu đông | LAVIE' };
export default function LookbookPage() { return <LavieStore page="lookbook" />; }
