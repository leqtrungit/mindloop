"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"

export const SearchInput = () => {
  const t = useTranslations("moments")
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Lấy search query từ URL
  const currentSearch = searchParams.get("search") || ""
  
  // Local state cho input value để có debounce
  const [inputValue, setInputValue] = useState(currentSearch)
  
  // Detect OS for hotkey display
  const [isMac, setIsMac] = useState(false)
  
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  // Hotkey listener - Ctrl+K hoặc Cmd+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Debounce effect - trigger navigation sau khi user ngừng gõ 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (inputValue.trim()) {
        params.set("search", inputValue.trim())
      } else {
        params.delete("search")
      }
      
      // Trigger navigation để server component re-render
      const newUrl = params.toString() ? `?${params.toString()}` : ""
      const fullUrl = `/moments${newUrl}`
      
      router.push(fullUrl)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue, router, searchParams])

  // Sync input value với URL search param khi URL thay đổi
  useEffect(() => {
    setInputValue(currentSearch)
  }, [currentSearch])

  const clearSearch = () => {
    setInputValue("")
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder={t("searchPlaceholder")}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        className="pl-9 pr-9 h-11 sm:h-10"
      />
      
      {/* Hotkey hint - chỉ hiển thị khi không có text */}
      {!inputValue && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground/60">
            {isMac ? (
              <>
                <span className="text-[10px]">⌘</span>K
              </>
            ) : (
              <>Ctrl+K</>
            )}
          </kbd>
        </div>
      )}
      
      {inputValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 h-8 w-8 sm:h-7 sm:w-7 -translate-y-1/2 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 