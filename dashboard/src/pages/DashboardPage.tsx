import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/tailor/StatCard'
import { OrdersTable } from '@/components/tailor/OrdersTable'
import { RevenueChart } from '@/components/tailor/RevenueChart'
import { TailorShowcase } from '@/components/tailor/TailorShowcase'

const stats = [
  {
    label:       'Total Revenue',
    value:       '$48,295',
    delta:       '+12.5% vs last month',
    deltaDir:    'up' as const,
    description: 'Based on all paid orders',
    icon:        DollarSign,
    iconColor:   'text-blue-600',
  },
  {
    label:       'Active Users',
    value:       '2,847',
    delta:       '+8.2% vs last month',
    deltaDir:    'up' as const,
    description: 'Unique logins in 30 days',
    icon:        Users,
    iconColor:   'text-violet-600',
  },
  {
    label:       'New Orders',
    value:       '1,043',
    delta:       '-3.1% vs last month',
    deltaDir:    'down' as const,
    description: 'Across all products',
    icon:        ShoppingCart,
    iconColor:   'text-orange-600',
  },
  {
    label:       'Growth Rate',
    value:       '+18.4%',
    delta:       'Steady',
    deltaDir:    'neutral' as const,
    description: 'Month-over-month avg',
    icon:        TrendingUp,
    iconColor:   'text-green-600',
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Chart + Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <OrdersTable />
      </div>

      {/* Tailor showcase */}
      <TailorShowcase />
    </div>
  )
}
