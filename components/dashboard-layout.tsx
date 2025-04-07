"use client"

import { Sidebar } from "@/components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen pt-16">
      <div className="hidden w-64 flex-col border-r md:flex fixed left-0 top-16 h-[calc(100vh-4rem)]">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto md:ml-64">
        <div className="h-full p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 