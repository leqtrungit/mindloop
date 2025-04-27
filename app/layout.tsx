import HeaderAuth from "@/components/header-auth";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Toaster } from "@/components/ui/toaster";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Inter } from "next/font/google";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MindLoop - Capture Your Moments of Insight",
  description: "An application to quick capture your thoughs built with Next.js and Supabase",
  manifest: '/manifest.json',
};

const inter = Inter({
  display: "swap",
  subsets: ["latin", "vietnamese"],
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MindLoop" />
      </head>
      <body className="bg-background text-foreground scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="min-h-screen flex flex-col">
              <nav className="w-full border-b border-b-foreground/10 h-16 fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center">
                    <Link 
                      href="/" 
                      className="flex items-center gap-2"
                    >
                      <Logo width={24} height={24} />
                      <span className="font-semibold text-lg">MindLoop</span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <HeaderAuth />
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                  </div>
                </div>
              </nav>
              
              <div className="flex-1 w-full">
                {children}
              </div>

              <footer className="w-full border-t border-t-foreground/10 py-8">
                <div className="w-full max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
                  <p>© {new Date().getFullYear()} MindLoop. All rights reserved.</p>
                </div>
              </footer>
            </main>
          </NextIntlClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
