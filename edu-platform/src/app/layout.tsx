import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

// Arabic Font
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// English Font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "منصة المعلمين - احجز معلمك الخاص",
    template: "%s | منصة المعلمين",
  },
  description:
    "منصة سعودية متخصصة في ربط الطلاب بأفضل المعلمين والمعلمات. احجز دروسك الخصوصية أونلاين أو حضورياً بسهولة.",
  keywords: [
    "معلم خصوصي",
    "دروس خصوصية",
    "تعليم",
    "السعودية",
    "معلمين",
    "حجز معلم",
    "دروس أونلاين",
  ],
  authors: [{ name: "منصة المعلمين" }],
  creator: "منصة المعلمين",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://lhlop.com",
    siteName: "منصة المعلمين",
    title: "منصة المعلمين - احجز معلمك الخاص",
    description:
      "منصة سعودية متخصصة في ربط الطلاب بأفضل المعلمين والمعلمات. احجز دروسك الخصوصية أونلاين أو حضورياً.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "منصة المعلمين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة المعلمين - احجز معلمك الخاص",
    description: "احجز دروسك الخصوصية أونلاين أو حضورياً",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
