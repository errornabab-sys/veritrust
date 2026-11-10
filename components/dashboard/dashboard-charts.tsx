'use client'

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CLAIMS_BY_LANGUAGE, MISINFO_CATEGORIES, MONTHLY_TREND } from '@/lib/data'
import { formatNumberIN } from '@/lib/format'

const compact = (n: number) => (n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${Math.round(n / 1000)}K` : String(n))

const tooltipStyle = {
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  fontSize: 12,
}

export function DashboardCharts() {
  const categories = [...MISINFO_CATEGORIES].sort((a, b) => b.share - a.share).slice(0, 8)
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Proofs vs claims flagged" subtitle="Last 6 months · L = lakh">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MONTHLY_TREND} margin={{ left: -8, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="proofFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--navy)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--navy)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
            <YAxis yAxisId="l" tickFormatter={compact} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
            <YAxis yAxisId="r" orientation="right" tickFormatter={compact} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatNumberIN(Number(v))} />
            <Area yAxisId="l" type="monotone" dataKey="proofs" name="Proofs" stroke="var(--navy)" strokeWidth={2} fill="url(#proofFill)" />
            <Area yAxisId="r" type="monotone" dataKey="claims" name="Claims flagged" stroke="var(--saffron-strong)" strokeWidth={2} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Claims analysed by language" subtitle="Submitted in 11 Indian languages">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={CLAIMS_BY_LANGUAGE} margin={{ left: -8, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="language" tickLine={false} axisLine={false} fontSize={11} interval={0} angle={-35} textAnchor="end" height={52} stroke="var(--muted-foreground)" />
            <YAxis tickFormatter={compact} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--muted)' }} formatter={(v) => formatNumberIN(Number(v))} />
            <Bar dataKey="claims" name="Claims" fill="var(--india-green)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top misinformation categories" subtitle="Share of flagged claims (%)" className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categories} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} unit="%" stroke="var(--muted-foreground)" />
            <YAxis type="category" dataKey="label" width={230} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--muted)' }} formatter={(v) => `${v}%`} />
            <Bar dataKey="share" name="Share" fill="var(--saffron)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function ChartCard({ title, subtitle, children, className }: { title: string; subtitle: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`rounded-xl border bg-card p-4 md:p-5 ${className ?? ''}`}>
      <figcaption className="mb-3">
        <p className="font-semibold text-navy">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle} · Demo data</p>
      </figcaption>
      {children}
    </figure>
  )
}
