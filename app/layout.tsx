import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Thinkly - Knowledge Management Platform",
  description: "A modern knowledge management platform built with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <nav className="w-full border-b border-b-foreground/10 h-16 fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
              <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center">
                  <Link 
                    href={user ? "/dashboard" : "/"} 
                    className="font-semibold text-lg"
                  >
                    Thinkly
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <HeaderAuth />
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>
            
            <div className="flex-1 w-full">
              {children}
            </div>

            <footer className="w-full border-t border-t-foreground/10 py-8">
              <div className="w-full max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Thinkly. All rights reserved.</p>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
