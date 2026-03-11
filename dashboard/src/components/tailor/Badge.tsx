/**
 * Badge — built with @dennerrondinely/tailor
 * Showcases: variants (intent, size), compoundVariants
 */
import { craft } from '@dennerrondinely/tailor'

export const Badge = craft('span')({
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    intent: {
      default:     'border-transparent bg-primary text-primary-foreground',
      secondary:   'border-transparent bg-secondary text-secondary-foreground',
      destructive: 'border-transparent bg-destructive text-destructive-foreground',
      outline:     'text-foreground',
      success:     'border-transparent bg-green-100 text-green-800',
      warning:     'border-transparent bg-yellow-100 text-yellow-800',
      info:        'border-transparent bg-blue-100 text-blue-700',
    },
    size: {
      sm: 'text-xs px-2 py-0',
      md: 'text-xs px-2.5 py-0.5',
      lg: 'text-sm px-3 py-1',
    },
  },
  defaultVariants: {
    intent: 'default',
    size:   'md',
  },
  compoundVariants: [
    { intent: 'success', size: 'lg', className: 'font-bold' },
  ],
})
