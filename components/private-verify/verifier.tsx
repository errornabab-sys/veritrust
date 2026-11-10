'use client'

import { useState } from 'react'
import { Cpu, Loader2, Lock, ShieldAlert, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { PROFILES } from '@/lib/data'
import { formatINR, formatLakh } from '@/lib/format'
import { PREDICATES, generateProof, type EligibilityProof, type PredicateId } from '@/lib/zkp'
import { ProofCard } from './proof-card'
import { cn } from '@/lib/utils'

const GROUPS = ['Age', 'Income', 'Student', 'Government Scheme (demo)'] as const

export function Verifier() {
  const [profileId, setProfileId] = useState(PROFILES[1].credentialId)
  const [predicateId, setPredicateId] = useState<PredicateId>('age-18')
  const [customIncome, setCustomIncome] = useState(300000)
  const [proof, setProof] = useState<EligibilityProof | null>(null)
  const [busy, setBusy] = useState(false)

  const profile = PROFILES.find((p) => p.credentialId === profileId)!
  const predicate = PREDICATES.find((p) => p.id === predicateId)!

  async function run() {
    setBusy(true)
    await new Promise((r) => setTimeout(r, 700))
    setProof(await generateProof(profile, predicate, { customIncome }))
    setBusy(false)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)]">
      <fieldset className="rounded-xl border bg-card p-4">
        <legend className="sr-only">Mock citizen credential</legend>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
          <UserRound className="size-4" aria-hidden="true" /> 1 · Choose a mock credential
        </p>
        <div className="flex flex-col gap-2">
          {PROFILES.map((p) => (
            <label
              key={p.credentialId}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 transition-colors',
                profileId === p.credentialId ? 'border-navy bg-secondary' : 'hover:bg-muted',
              )}
            >
              <input
                type="radio"
                name="profile"
                value={p.credentialId}
                checked={profileId === p.credentialId}
                onChange={() => {
                  setProfileId(p.credentialId)
                  setProof(null)
                }}
                className="sr-only"
              />
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                {p.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{p.name}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {p.city}, {p.state}
                </span>
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-dashed bg-muted/50 p-3 text-xs">
          <p className="flex items-center gap-1.5 font-semibold text-navy">
            <Lock className="size-3.5" aria-hidden="true" /> Held privately on device
          </p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-muted-foreground">
            <dt>Income</dt>
            <dd className="text-foreground">{formatINR(profile.annualFamilyIncome)} / yr</dd>
            <dt>Institution</dt>
            <dd className="text-foreground">{profile.institution}</dd>
            <dt>Mobile</dt>
            <dd className="text-foreground">{profile.phone}</dd>
            <dt>Aadhaar</dt>
            <dd className="text-foreground">Not collected</dd>
          </dl>
          <p className="mt-2 text-[11px] text-muted-foreground">{profile.issuer}</p>
        </div>
      </fieldset>

      <fieldset className="rounded-xl border bg-card p-4">
        <legend className="sr-only">Eligibility condition</legend>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
          <Cpu className="size-4" aria-hidden="true" /> 2 · Choose the condition to prove
        </p>
        <div className="flex flex-col gap-4">
          {GROUPS.map((g) => (
            <div key={g}>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground uppercase">{g}</p>
              <div className="flex flex-wrap gap-1.5">
                {PREDICATES.filter((p) => p.group === g).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={predicateId === p.id}
                    onClick={() => {
                      setPredicateId(p.id)
                      setProof(null)
                    }}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      predicateId === p.id ? 'border-navy bg-navy text-white' : 'hover:bg-muted',
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {predicateId === 'income-custom' && (
            <div className="rounded-lg bg-muted p-3">
              <div className="mb-2 flex justify-between text-sm">
                <span id="custom-income-label">Custom threshold</span>
                <span className="font-mono font-semibold">{formatLakh(customIncome)}</span>
              </div>
              <Slider
                aria-labelledby="custom-income-label"
                min={50000}
                max={1000000}
                step={50000}
                value={[customIncome]}
                onValueChange={(v) => {
                  setCustomIncome(Array.isArray(v) ? v[0] : v)
                  setProof(null)
                }}
              />
            </div>
          )}
          {predicate.group === 'Government Scheme (demo)' && (
            <p className="flex items-start gap-1.5 rounded-lg border border-saffron/40 bg-accent p-2.5 text-xs text-accent-foreground">
              <ShieldAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              Demonstration workflow inspired by the scheme. Simplified criteria — not the official eligibility rules, and not an
              official government verification.
            </p>
          )}
          <Button onClick={run} disabled={busy} className="h-10">
            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Lock className="size-4" aria-hidden="true" />}
            {busy ? 'Generating proof on device…' : 'Generate zero-knowledge proof'}
          </Button>
        </div>
      </fieldset>

      <div aria-live="polite">
        {proof ? (
          <ProofCard proof={proof} label={predicate.label} />
        ) : (
          <div className="flex h-full min-h-60 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
            <Lock className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="mt-2 font-medium text-navy">No proof yet</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Generate a proof to see exactly what the verifier receives — and what stays private.
            </p>
          </div>
        )}
        <p className="mt-2 text-[11px] text-muted-foreground">
          Simulated ZKP for demonstration: commitments are real SHA-256 hashes, but this is not a production zk-SNARK circuit.
        </p>
      </div>
    </div>
  )
}
