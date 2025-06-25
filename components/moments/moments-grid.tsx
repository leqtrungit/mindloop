"use client"

import { MomentCard } from "./moment-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { type Moment } from "@/utils/supabase/supabase"

interface MomentsGridProps {
  moments: Moment[]
}

export const MomentsGrid = ({ moments }: MomentsGridProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        isDesktop
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      )}
    >
      {moments.map((moment) => (
        <div
          key={moment.id}
          className={cn(
            "break-inside-avoid",
            isDesktop && "mb-2"
          )}
        >
          <MomentCard moment={moment} />
        </div>
      ))}
    </div>
  )
} 