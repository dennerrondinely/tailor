import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { craft } from '@dennerrondinely/tailor'

const ChartWrapper = craft('div')({
  base: 'rounded-xl border bg-card shadow-sm p-6',
})

const data = [
  { month: 'Sep', revenue: 4200, users: 140 },
  { month: 'Oct', revenue: 5800, users: 183 },
  { month: 'Nov', revenue: 5200, users: 172 },
  { month: 'Dec', revenue: 7100, users: 218 },
  { month: 'Jan', revenue: 6400, users: 201 },
  { month: 'Feb', revenue: 8300, users: 257 },
  { month: 'Mar', revenue: 9600, users: 294 },
]

export function RevenueChart() {
  return (
    <ChartWrapper>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold">Revenue over time</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 7 months</p>
        </div>
        <span className="text-2xl font-bold">$9,600</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="hsl(221.2 83.2% 53.3%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(221.2 83.2% 53.3%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214.3 31.8% 91.4%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214.3 31.8% 91.4%)', fontSize: 12 }}
            formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(221.2 83.2% 53.3%)"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}
