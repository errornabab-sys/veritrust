'use client'

import { useState } from 'react'
import { History } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { formatDateTimeIN } from '@/lib/format'

const PURPOSES = [
  { id: 'proofs', title: 'Eligibility proof generation', body: 'Compute zero-knowledge proofs on your device for conditions you choose.', required: true },
  { id: 'claims', title: 'Claim analysis', body: 'Send the text you submit to TruthLens for AI-assisted analysis. Not linked to your identity.', required: false },
  { id: 'analytics', title: 'Anonymous aggregate statistics', body: 'Count verifications by state and language, without identifiers.', required: false },
  { id: 'notices', title: 'Fraud alerts', body: 'Receive alerts about scams trending in your state.', required: false },
] as const

type Log = { at: string; text: string }

export function ConsentManager() {
  const [consent, setConsent] = useState<Record<string, boolean>>({ proofs: true, claims: true, analytics: false, notices: false })
  const [log, setLog] = useState<Log[]>([])

  function toggle(id: string, value: boolean, title: string) {
    setConsent((c) => ({ ...c, [id]: value }))
    setLog((l) => [{ at: new Date().toISOString(), text: `${value ? 'Granted' : 'Withdrew'} consent: ${title}` }, ...l].slice(0, 6))
  }

  function withdrawAll() {
    setConsent({ proofs: false, claims: false, analytics: false, notices: false })
    setLog((l) => [{ at: new Date().toISOString(), text: 'Withdrew all consents' }, ...l].slice(0, 6))
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <ul className="flex flex-col divide-y rounded-xl border bg-card">
        {PURPOSES.map((p) => (
          <li key={p.id} className="flex items-start justify-between gap-4 p-4">
            <div>
              <label htmlFor={`consent-${p.id}`} className="font-medium">
                {p.title}
                {p.required && <span className="ml-2 text-xs font-normal text-muted-foreground">(needed for PrivateVerify)</span>}
              </label>
              <p className="text-sm text-pretty text-muted-foreground">{p.body}</p>
            </div>
            <Switch id={`consent-${p.id}`} checked={consent[p.id]} onCheckedChange={(v) => toggle(p.id, v, p.title)} />
          </li>
        ))}
        <li className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-sm text-muted-foreground">Withdrawing consent is as easy as giving it.</p>
          <Button variant="outline" onClick={withdrawAll}>
            Withdraw all consent
          </Button>
        </li>
      </ul>
      <aside className="h-fit rounded-xl border bg-card p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-navy">
          <History className="size-4" aria-hidden="true" /> Consent record
        </p>
        {log.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No changes yet in this session.</p>
        ) : (
          <ol className="mt-2 flex flex-col gap-2 text-sm" aria-live="polite">
            {log.map((l) => (
              <li key={l.at + l.text}>
                <p>{l.text}</p>
                <p className="text-xs text-muted-foreground">{formatDateTimeIN(l.at)}</p>
              </li>
            ))}
          </ol>
        )}
      </aside>
    </div>
  )
}
