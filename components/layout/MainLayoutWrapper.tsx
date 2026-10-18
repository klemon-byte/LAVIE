'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AppProviders } from '@/context/AppProviders';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (pathname === '/' || pathname === '/products' || pathname?.startsWith('/products/') || pathname === '/about' || pathname === '/lookbook' || pathname === '/style-guide' || pathname === '/shopping-guide') return <>{children}</>;

  if (isAdmin) {
    return <AppProviders><div className="admin-layout-root" style={{ minHeight: '100vh', background: '#0f172a' }}>{children}</div></AppProviders>;
  }

  return (
    <AppProviders>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </AppProviders>
  );
}
