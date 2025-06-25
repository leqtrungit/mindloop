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
        "columns-1 gap-3 sm:gap-4",
        isDesktop
          ? "md:columns-2 lg:columns-3"
          : "columns-1"
      )}
    >
      {moments.map((moment) => (
        <div
          key={moment.id}
          className="break-inside-avoid mb-3 sm:mb-4"
        >
          <MomentCard moment={moment} />
        </div>
      ))}
    </div>
  )
} 