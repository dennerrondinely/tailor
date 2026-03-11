/**
 * Sidebar — layout component
 * Showcases: craft + stitch nested selectors + polymorphic `as` on nav links
 */
import { craft, stitch } from '@dennerrondinely/tailor'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  ShoppingCart,
  Settings,
  Bell,
  HelpCircle,
  Scissors,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

// ── Tailor-powered sidebar primitives ───────────────────────────

const SidebarRoot = craft('aside')({
  base: 'flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground',
})

const SidebarHeader = craft('div')({
  base: 'flex h-16 items-center gap-3 border-b border-sidebar-border px-6',
  nested: stitch({
    'span': 'font-bold text-lg tracking-tight',
    'svg':  'h-6 w-6 text-primary',
  }),
})

const SidebarSection = craft('div')({
  base: 'px-3 py-2',
  nested: stitch({
    'p': 'px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
  }),
})

const SidebarNav = craft('nav')({
  base: 'flex flex-col gap-1',
})

const SidebarLink = craft('a')({
  base: [
    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'cursor-pointer select-none',
  ].join(' '),
  variants: {
    active: {
      true:  'bg-sidebar-accent text-sidebar-accent-foreground',
      false: 'text-sidebar-foreground',
    },
  },
  defaultVariants: { active: 'false' },
  nested: stitch({
    'svg': 'h-4 w-4 shrink-0',
    'span': 'truncate',
  }),
})

const SidebarFooter = craft('div')({
  base: 'mt-auto border-t border-sidebar-border p-4',
})

// ── Nav data ────────────────────────────────────────────────────

type NavItem = {
  label:  string
  icon:   typeof LayoutDashboard
  href:   string
  active?: boolean
}

const mainNav: NavItem[] = [
  { label: 'Dashboard',  icon: LayoutDashboard, href: '#',          active: true },
  { label: 'Analytics',  icon: BarChart3,        href: '#analytics' },
  { label: 'Orders',     icon: ShoppingCart,     href: '#orders' },
  { label: 'Customers',  icon: Users,            href: '#customers' },
]

const secondaryNav: NavItem[] = [
  { label: 'Notifications', icon: Bell,        href: '#notifications' },
  { label: 'Settings',      icon: Settings,    href: '#settings' },
  { label: 'Help',          icon: HelpCircle,  href: '#help' },
]

// ── Sidebar component ────────────────────────────────────────────

export function Sidebar() {
  return (
    <SidebarRoot>
      <SidebarHeader>
        <Scissors />
        <span>Tailor UI</span>
      </SidebarHeader>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        <SidebarSection>
          <p>Main</p>
          <SidebarNav>
            {mainNav.map((item) => (
              <SidebarLink
                key={item.label}
                href={item.href}
                active={item.active ? 'true' : 'false'}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarLink>
            ))}
          </SidebarNav>
        </SidebarSection>

        <Separator />

        <SidebarSection>
          <p>System</p>
          <SidebarNav>
            {secondaryNav.map((item) => (
              <SidebarLink key={item.label} href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarLink>
            ))}
          </SidebarNav>
        </SidebarSection>
      </div>

      <SidebarFooter>
        <p className="text-xs text-muted-foreground text-center">
          @dennerrondinely/tailor v0.2.0
        </p>
      </SidebarFooter>
    </SidebarRoot>
  )
}
