import { BadgeAlert, Fingerprint, GraduationCap, Globe, Lock, Users } from 'lucide-react'
import { DASHBOARD_STATS } from '@/lib/data'
import { formatNumberIN } from '@/lib/format'

const ICONS = {
  users: Users,
  proofs: Fingerprint,
  scholarship: GraduationCap,
  upi: BadgeAlert,
  websites: Globe,
  private: Lock,
} as const

export function StatGrid() {
  return (
    <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {DASHBOARD_STATS.map((s) => {
        const Icon = ICONS[s.key]
        return (
          <div key={s.key} className="rounded-xl border bg-card p-4">
            <Icon className="size-4 text-saffron-strong" aria-hidden="true" />
            <dt className="mt-3 text-xs text-muted-foreground text-pretty">{s.label}</dt>
            <dd className="mt-1 font-mono text-xl font-semibold tracking-tight text-navy">{formatNumberIN(s.value)}</dd>
            <dd className="mt-0.5 text-xs font-medium text-india-green">{s.delta} vs last month</dd>
          </div>
        )
      })}
    </dl>
  )
}
