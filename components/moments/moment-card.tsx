"use client"

import { formatDistanceToNow } from "date-fns"
import { useLocale, useTranslations } from "next-intl"
import { vi, enUS } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Clock, Book, MessageSquare, Newspaper, Brain, Link as LinkIcon, Tag, GraduationCap, Hammer, RefreshCw, Users, LucideIcon, Edit } from "lucide-react"
import { type Moment } from "@/utils/supabase/supabase"
import { MomentType, SourceType, isValidMomentType, isValidSourceType } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MomentCardProps {
  moment: Moment
}

export const MomentCard = ({ moment }: MomentCardProps) => {
  const locale = useLocale()
  const t = useTranslations('form')
  const momentT = useTranslations('moments')
  const dateFnsLocale = locale === "vi" ? vi : enUS
  
  const impactColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
  }

  const sourceIcons: Record<SourceType, LucideIcon> = {
    book: Book,
    conversation: MessageSquare,
    article: Newspaper,
    thinking: Brain,
    other: LinkIcon
  }

  const typeIcons: Record<MomentType, LucideIcon> = {
    learned: GraduationCap,
    applied: Hammer,
    reframed: RefreshCw,
    connected: Users
  }

  let SourceIcon: LucideIcon | null = null;
  if (moment.source && isValidSourceType(moment.source)) {
    SourceIcon = sourceIcons[moment.source];
  }

  let TypeIcon: LucideIcon | null = null;
  if (moment.type && isValidMomentType(moment.type)) {
    TypeIcon = typeIcons[moment.type];
  }

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
        <div className="flex items-center justify-between">
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
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            <Link href={`/moments/edit/${moment.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              <span>{momentT('editButton')}</span>
            </Link>
          </Button>
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
          {SourceIcon && moment.source && isValidSourceType(moment.source) && (
            <div className="flex items-center gap-1">
              <SourceIcon className="h-3 w-3" />
              <span>{(t.raw('sources') as Record<string, string>)[moment.source]}</span>
            </div>
          )}
          {TypeIcon && moment.type && isValidMomentType(moment.type) && (
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