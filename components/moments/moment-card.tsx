"use client"

import { formatDistanceToNow } from "date-fns"
import { useLocale, useTranslations } from "next-intl"
import { vi, enUS } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Clock, Book, MessageSquare, Newspaper, Brain, Link, Tag, GraduationCap, Hammer, RefreshCw, Users } from "lucide-react"
import { type Moment } from "@/lib/schema"

interface MomentCardProps {
  moment: Moment
}

export const MomentCard = ({ moment }: MomentCardProps) => {
  const locale = useLocale()
  const t = useTranslations('form')
  const dateFnsLocale = locale === "vi" ? vi : enUS
  
  const impactColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
  }

  const sourceIcons = {
    book: Book,
    conversation: MessageSquare,
    article: Newspaper,
    thinking: Brain,
    other: Link
  }

  const typeIcons = {
    learned: GraduationCap,
    applied: Hammer,
    reframed: RefreshCw,
    connected: Users
  }

  const SourceIcon = moment.source ? sourceIcons[moment.source] : null
  const TypeIcon = moment.type ? typeIcons[moment.type] : null

  return (
    <Card className="group relative h-full transition-all hover:shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-2 text-lg font-semibold">
            {moment.title}
          </CardTitle>
          <Badge
            className={cn(
              "ml-2 whitespace-nowrap",
              impactColors[moment.impact]
            )}
          >
            {moment.impact}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tooltip>
            <TooltipTrigger>
              <Clock className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{moment.time_of_day || "Không xác định"}</p>
            </TooltipContent>
          </Tooltip>
          <span>{formatDistanceToNow(new Date(moment.created_at), { addSuffix: true, locale: dateFnsLocale })}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {moment.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {moment.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {SourceIcon && (
            <div className="flex items-center gap-1">
              <SourceIcon className="h-3 w-3" />
              <span>{(t.raw('sources') as Record<string, string>)[moment.source]}</span>
            </div>
          )}
          {TypeIcon && (
            <div className="flex items-center gap-1">
              <TypeIcon className="h-3 w-3" />
              <span>{(t.raw('types') as Record<string, string>)[moment.type]}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 