import type { Metadata } from 'next';
import './globals.css';
import { MainLayoutWrapper } from '@/components/layout/MainLayoutWrapper';

export const metadata: Metadata = {
  title: 'LAVIE | Áo khoác nữ — Chạm vào mùa dịu êm',
  description: 'Khám phá thế giới áo khoác thu đông nữ LAVIE. Áo dạ, trench coat và tweed trong bảng màu thanh lịch, dành cho những ngày se lạnh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
      </body>
    </html>
  );
}
