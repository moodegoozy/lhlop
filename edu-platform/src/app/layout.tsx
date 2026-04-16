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
    default: "لهلوب - منصتك الأولى للتميز",
    template: "%s | لهلوب",
  },
  description:
    "لهلوب - منصة سعودية متخصصة في ربط الطلاب بأفضل المعلمين والمعلمات. احجز دروسك الخصوصية أونلاين أو حضورياً بسهولة.",
  keywords: [
    "لهلوب",
    "معلم خصوصي",
    "دروس خصوصية",
    "تعليم",
    "السعودية",
    "معلمين",
    "حجز معلم",
    "دروس أونلاين",
  ],
  authors: [{ name: "لهلوب" }],
  creator: "لهلوب",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://lhlop.com",
    siteName: "لهلوب",
    title: "لهلوب - منصتك الأولى للتميز",
    description:
      "لهلوب - منصة سعودية متخصصة في ربط الطلاب بأفضل المعلمين والمعلمات. احجز دروسك الخصوصية أونلاين أو حضورياً.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "لهلوب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "لهلوب - منصتك الأولى للتميز",
    description: "منصتك الأولى للتميز - احجز دروسك الخصوصية بسهولة",
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
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f23" },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        {children}
      </body>
    </html>
  );
}
