/**
 * StatCard — metric card for the dashboard
 * Showcases: craft + variants + stitch nested selectors
 */
import { craft, stitch } from '@dennerrondinely/tailor'
import type { LucideIcon } from 'lucide-react'

const StatCardRoot = craft('div')({
  base: 'rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-2',
  variants: {
    trend: {
      up:      '',
      down:    '',
      neutral: '',
    },
  },
  defaultVariants: { trend: 'neutral' },
})

const StatCardLabel = craft('p')({
  base: 'text-sm font-medium text-muted-foreground',
})

const StatCardValue = craft('h3')({
  base: 'text-3xl font-bold tracking-tight',
})

const StatCardDelta = craft('p')({
  base: 'text-xs flex items-center gap-1',
  variants: {
    direction: {
      up:      'text-green-600',
      down:    'text-red-500',
      neutral: 'text-muted-foreground',
    },
  },
  defaultVariants: { direction: 'neutral' },
})

const StatCardFooter = craft('div')({
  base: 'flex items-center justify-between mt-auto pt-2',
  nested: stitch({
    'p': 'text-xs text-muted-foreground',
  }),
})

// ----------------------------------------------------------------

interface StatCardProps {
  label:       string
  value:       string
  delta?:      string
  deltaDir?:   'up' | 'down' | 'neutral'
  description?: string
  icon:        LucideIcon
  iconColor?:  string
}

export function StatCard({
  label,
  value,
  delta,
  deltaDir = 'neutral',
  description,
  icon: Icon,
  iconColor = 'text-primary',
}: StatCardProps) {
  return (
    <StatCardRoot>
      <div className="flex items-center justify-between">
        <StatCardLabel>{label}</StatCardLabel>
        <div className={`rounded-md p-2 bg-muted ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <StatCardValue>{value}</StatCardValue>

      {delta && (
        <StatCardDelta direction={deltaDir}>
          <span>{deltaDir === 'up' ? '↑' : deltaDir === 'down' ? '↓' : '→'}</span>
          <span>{delta}</span>
        </StatCardDelta>
      )}

      {description && (
        <StatCardFooter>
          <p>{description}</p>
        </StatCardFooter>
      )}
    </StatCardRoot>
  )
}
