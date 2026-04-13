import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "منصة التدريس - أفضل المعلمين في المملكة",
  description: "منصة شاملة تربط الطلاب بأفضل المعلمين المتخصصين في جميع المواد الدراسية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
