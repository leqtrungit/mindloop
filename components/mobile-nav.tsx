"use client"

import { cn } from "@/lib/utils"
import { Plus, List } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

export function MobileNav() {
  const t = useTranslations()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        // Hiện nav khi scroll lên (scrollY giảm)
        // Ẩn nav khi scroll xuống (scrollY tăng)
        if (window.scrollY > lastScrollY) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)

      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const items = [
    {
      href: "/moments",
      icon: List,
      label: t("moments.title"),
      active: pathname === "/moments",
    },
    {
      href: "/moments/new",
      icon: Plus,
      label: t("moments.createButton"),
      active: pathname === "/moments/new",
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 h-16 border-t bg-background/80 backdrop-blur-sm transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <nav className="flex h-full items-center justify-around">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-1 text-xs transition-colors",
              item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 