"use client"

import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  // Chỉ hiển thị footer ở trang chủ
  if (pathname !== "/") {
    return null
  }

  return (
    <footer className="w-full border-t border-t-foreground/10 py-8">
      <div className="w-full max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MindLoop. All rights reserved.</p>
      </div>
    </footer>
  )
} 