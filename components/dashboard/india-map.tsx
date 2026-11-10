'use client'

import { useMemo, useState } from 'react'
import { STATES, type StateTile } from '@/lib/data'
import { formatNumberIN } from '@/lib/format'
import { DemoTag } from '@/components/page-header'
import { cn } from '@/lib/utils'

type Metric = 'proofs' | 'claimsFlagged'

const METRICS: { id: Metric; label: string }[] = [
  { id: 'proofs', label: 'Eligibility proofs' },
  { id: 'claimsFlagged', label: 'Claims flagged' },
]

export function IndiaMap() {
  const [metric, setMetric] = useState<Metric>('proofs')
  const [selected, setSelected] = useState<StateTile>(STATES.find((s) => s.code === 'OD')!)
  const max = useMemo(() => Math.max(...STATES.map((s) => s[metric])), [metric])
  const featured = useMemo(() => STATES.filter((s) => s.featured).sort((a, b) => b[metric] - a[metric]), [metric])

  const tone = (v: number) => {
    const t = Math.sqrt(v / max)
    return metric === 'proofs'
      ? `color-mix(in oklch, var(--navy) ${Math.round(15 + t * 85)}%, white)`
      : `color-mix(in oklch, var(--saffron-strong) ${Math.round(15 + t * 85)}%, white)`
  }

  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div role="radiogroup" aria-label="Map metric" className="inline-flex rounded-lg bg-muted p-1">
            {METRICS.map((m) => (
              <button
                key={m.id}
                role="radio"
                aria-checked={metric === m.id}
                onClick={() => setMetric(m.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  metric === m.id ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <DemoTag>Illustrative state-level data</DemoTag>
        </div>

        <div className="mx-auto grid max-w-md grid-cols-8 gap-1.5" role="group" aria-label="Map of India by state">
          {STATES.map((s) => {
            const value = s[metric]
            const dark = Math.sqrt(value / max) > 0.45
            return (
              <button
                key={s.code}
                onClick={() => setSelected(s)}
                style={{ gridRow: s.row + 1, gridColumn: s.col + 1, background: tone(value) }}
                aria-pressed={selected.code === s.code}
                aria-label={`${s.name}: ${formatNumberIN(value)} ${metric === 'proofs' ? 'proofs' : 'claims flagged'}`}
                title={s.name}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-md font-mono text-[10px] font-semibold transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:text-xs',
                  dark ? 'text-white' : 'text-navy',
                  selected.code === s.code && 'ring-2 ring-saffron ring-offset-2',
                  s.featured && 'outline outline-1 outline-offset-1 outline-india-green/60',
                )}
              >
                {s.code}
              </button>
            )
          })}
        </div>

        <div className="mx-auto mt-4 flex max-w-md items-center gap-2 text-xs text-muted-foreground">
          <span>Low</span>
          <span
            className="h-2 flex-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${tone(max * 0.01)}, ${tone(max)})`,
            }}
            aria-hidden="true"
          />
          <span>High</span>
          <span className="ml-3 inline-flex items-center gap-1">
            <span className="size-2.5 rounded-sm outline outline-1 outline-india-green" aria-hidden="true" /> Featured state
          </span>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="rounded-lg border bg-secondary/60 p-4" aria-live="polite">
          <p className="text-xs font-medium text-muted-foreground uppercase">Selected state</p>
          <p className="mt-1 text-lg font-semibold text-navy">{selected.name}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <dt className="text-xs text-muted-foreground">Proofs generated</dt>
              <dd className="font-mono text-base font-semibold text-navy">{formatNumberIN(selected.proofs)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Claims flagged</dt>
              <dd className="font-mono text-base font-semibold text-saffron-strong">{formatNumberIN(selected.claimsFlagged)}</dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase">Featured states ranking</p>
          <ol className="flex flex-col gap-1.5">
            {featured.map((s, i) => (
              <li key={s.code}>
                <button
                  onClick={() => setSelected(s)}
                  className="flex w-full items-center gap-2 rounded-md px-1 py-0.5 text-left text-sm hover:bg-muted"
                >
                  <span className="w-4 font-mono text-xs text-muted-foreground">{i + 1}</span>
                  <span className="w-28 truncate">{s.name}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full" style={{ width: `${(s[metric] / featured[0][metric]) * 100}%`, background: tone(s[metric]) }} />
                  </span>
                  <span className="w-16 text-right font-mono text-xs">{formatNumberIN(s[metric])}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  )
}
