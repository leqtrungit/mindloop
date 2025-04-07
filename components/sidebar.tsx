"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Inbox, 
  BookOpen, 
  Brain, 
  Map 
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },
  {
    name: "Knowledge",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    name: "Reflection",
    href: "/reflection",
    icon: Brain,
  },
  {
    name: "Map of Content",
    href: "/map",
    icon: Map,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-y-5 overflow-y-auto bg-background px-6 py-4">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-accent-foreground",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
} 