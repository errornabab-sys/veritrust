'use client'

import { useState } from 'react'
import { ExternalLink, Link2Off } from 'lucide-react'
import { EVOLUTION_CASES, sourceById } from '@/lib/data'
import { formatDateIN } from '@/lib/format'
import { DemoTag, StatusPill } from '@/components/page-header'
import { cn } from '@/lib/utils'

function riskTone(risk: number) {
  if (risk >= 80) return 'bg-destructive'
  if (risk >= 40) return 'bg-saffron'
  return 'bg-india-green'
}

export function EvolutionTracker() {
  const [caseId, setCaseId] = useState(EVOLUTION_CASES[0].id)
  const c = EVOLUTION_CASES.find((x) => x.id === caseId)!

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <div role="tablist" aria-label="Evolution cases" className="flex flex-wrap gap-1.5">
          {EVOLUTION_CASES.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={caseId === x.id}
              onClick={() => setCaseId(x.id)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                caseId === x.id ? 'bg-navy text-white' : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              {x.title}
            </button>
          ))}
        </div>
        <DemoTag>Illustrative demo case</DemoTag>
      </div>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusPill status="FALSE" />
            <span className="text-sm font-medium">{c.verdict}</span>
          </div>
          <ol className="relative flex flex-col gap-5 border-l-2 border-border pl-6">
            {c.stages.map((s, i) => (
              <li key={s.text} className="relative">
                <span
                  className={cn('absolute top-1 -left-[33px] flex size-4 items-center justify-center rounded-full ring-4 ring-card', riskTone(s.risk))}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-navy">{i === 0 ? 'Original' : `Modification ${i}`}</span>
                  <span>{formatDateIN(s.date)}</span>
                  <span>{s.channel}</span>
                </div>
                <blockquote className="mt-1.5 rounded-lg border bg-muted/50 p-3 text-sm font-medium text-pretty">“{s.text}”</blockquote>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{s.change}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Risk</span>
                  <span className="h-1.5 w-40 overflow-hidden rounded-full bg-muted">
                    <span className={cn('block h-full rounded-full', riskTone(s.risk))} style={{ width: `${s.risk}%` }} />
                  </span>
                  <span className="font-mono text-xs font-semibold">{s.risk}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold text-destructive uppercase">Suspicious URLs (defanged)</p>
            <ul className="flex flex-col gap-1.5 text-sm">
              {c.suspiciousUrls.map((u) => (
                <li key={u.url} className="flex items-start gap-1.5">
                  <Link2Off className="mt-0.5 size-3.5 shrink-0 text-destructive" aria-hidden="true" />
                  <span>
                    <code className="rounded bg-muted px-1 font-mono text-xs">{u.url}</code> — {u.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-navy uppercase">Evidence</p>
            <ul className="flex flex-col gap-2">
              {c.evidence.map((e) => {
                const src = sourceById(e.sourceId)!
                return (
                  <li key={e.sourceId + e.date} className="rounded-lg border p-3 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <a href={src.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-navy hover:underline">
                        {src.name} <ExternalLink className="size-3" aria-hidden="true" />
                      </a>
                      <span
                        className={cn(
                          'shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase',
                          e.stance === 'contradicts' && 'bg-destructive/10 text-destructive',
                          e.stance === 'supports' && 'bg-india-green/10 text-india-green',
                          e.stance === 'context' && 'bg-muted text-muted-foreground',
                        )}
                      >
                        {e.stance === 'context' ? 'Context' : `${e.stance} claim`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {src.url.replace('https://', '')} · {formatDateIN(e.date)} (illustrative)
                    </p>
                    <p className="mt-1 text-pretty">{e.summary}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
