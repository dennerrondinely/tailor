/**
 * Card — built with @dennerrondinely/tailor
 * Showcases: variants (elevation, intent), nested stitch selectors
 */
import { craft, stitch } from '@dennerrondinely/tailor'

export const Card = craft('div')({
  base: 'rounded-xl border bg-card text-card-foreground transition-shadow',
  variants: {
    elevation: {
      flat:     'border-border shadow-none',
      raised:   'shadow-sm',
      floating: 'shadow-lg',
    },
    intent: {
      default: '',
      muted:   'bg-muted/50',
      accent:  'border-primary/30 bg-primary/5',
    },
    padding: {
      none: '',
      sm:   'p-4',
      md:   'p-6',
      lg:   'p-8',
    },
  },
  defaultVariants: {
    elevation: 'raised',
    intent:    'default',
    padding:   'md',
  },
})

export const CardHeader = craft('div')({
  base: 'flex flex-col space-y-1.5',
  nested: stitch({
    'h2': 'text-xl font-semibold leading-none tracking-tight',
    'p':  'text-sm text-muted-foreground',
  }),
})

export const CardTitle = craft('h2')({
  base: 'text-xl font-semibold leading-none tracking-tight',
})

export const CardDescription = craft('p')({
  base: 'text-sm text-muted-foreground',
})

export const CardContent = craft('div')({
  base: 'pt-0',
})

export const CardFooter = craft('div')({
  base: 'flex items-center pt-4',
})
