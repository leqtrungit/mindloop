"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className, width = 32, height = 32 }: LogoProps) {
  const { theme } = useTheme()
  
  return (
    <Image
      src={`/web-app-manifest-512x512.png`}
      alt="MindLoop Logo"
      width={width}
      height={height}
      priority
      className={cn("rounded-full", className)}
    />
  )
} 