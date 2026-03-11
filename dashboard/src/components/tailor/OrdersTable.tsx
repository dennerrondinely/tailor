/**
 * DataTable — activity feed table
 * Showcases: craft + stitch on table elements + Badge variants
 */
import { craft, stitch } from '@dennerrondinely/tailor'
import { Badge } from './Badge'

const Table = craft('table')({
  base: 'w-full text-sm',
  nested: stitch({
    'thead tr': 'border-b',
    'th':       'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
    'tbody tr': 'border-b transition-colors hover:bg-muted/50',
    'td':       'p-4 align-middle',
  }),
})

// ── Data ────────────────────────────────────────────────────────

type Status = 'completed' | 'pending' | 'failed' | 'processing'

interface OrderRow {
  id:       string
  customer: string
  product:  string
  amount:   string
  status:   Status
  date:     string
}

const STATUS_INTENT: Record<Status, 'success' | 'warning' | 'destructive' | 'info'> = {
  completed:  'success',
  pending:    'warning',
  failed:     'destructive',
  processing: 'info',
}

const rows: OrderRow[] = [
  { id: '#1042', customer: 'Alice Johnson',  product: 'Pro Plan',      amount: '$49.00',  status: 'completed',  date: 'Mar 11, 2026' },
  { id: '#1041', customer: 'Bob Martinez',   product: 'Starter Plan',  amount: '$12.00',  status: 'processing', date: 'Mar 11, 2026' },
  { id: '#1040', customer: 'Clara Schmidt',  product: 'Enterprise',    amount: '$299.00', status: 'pending',    date: 'Mar 10, 2026' },
  { id: '#1039', customer: 'David Park',     product: 'Pro Plan',      amount: '$49.00',  status: 'completed',  date: 'Mar 10, 2026' },
  { id: '#1038', customer: 'Emma Wilson',    product: 'Add-on: API',   amount: '$19.00',  status: 'failed',     date: 'Mar 9, 2026'  },
  { id: '#1037', customer: 'Frank Oliveira', product: 'Starter Plan',  amount: '$12.00',  status: 'completed',  date: 'Mar 9, 2026'  },
]

// ── Component ────────────────────────────────────────────────────

export function OrdersTable() {
  return (
    <div className="rounded-xl border overflow-hidden bg-card">
      <Table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="font-mono text-xs text-muted-foreground">{row.id}</td>
              <td className="font-medium">{row.customer}</td>
              <td className="text-muted-foreground">{row.product}</td>
              <td className="font-semibold">{row.amount}</td>
              <td>
                <Badge intent={STATUS_INTENT[row.status]}>
                  {row.status}
                </Badge>
              </td>
              <td className="text-muted-foreground">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
