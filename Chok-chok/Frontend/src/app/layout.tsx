import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Chok-Chok | AI-Powered Skincare Analysis",
  description: "Discover your perfect skincare routine with AI-powered analysis. Get personalized recommendations based on your unique skin needs. Korean beauty meets cutting-edge technology.",
  keywords: ["skincare", "AI analysis", "Korean beauty", "personalized routine", "skin analysis", "K-beauty"],
  authors: [{ name: "Chok-Chok Team" }],
  creator: "Chok-Chok",
  publisher: "Chok-Chok",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://chok-chok.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Chok-Chok | AI-Powered Skincare Analysis",
    description: "Discover your perfect skincare routine with AI-powered analysis. Get personalized recommendations based on your unique skin needs.",
    url: 'https://chok-chok.com',
    siteName: 'Chok-Chok',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chok-Chok - AI-Powered Skincare Analysis',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chok-Chok | AI-Powered Skincare Analysis",
    description: "Discover your perfect skincare routine with AI-powered analysis.",
    images: ['/og-image.jpg'],
    creator: '@chokchok_beauty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ec4899" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
      </head>
      <body 
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          min-h-screen 
          bg-white 
          text-gray-900
          dark:bg-slate-900 
          dark:text-slate-100
          transition-colors 
          duration-300
        `}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 font-medium"
        >
          Skip to main content
        </a>
        
        {/* Main app container */}
        <div id="main-content" className="relative text-foreground">
          {children}
        </div>
        
        {/* Loading indicator for better UX */}
        <div 
          id="loading-indicator" 
          className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-x-full transition-transform duration-300 ease-out z-50"
        ></div>
        
        {/* Service worker registration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}