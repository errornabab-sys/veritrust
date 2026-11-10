import { Check, EyeOff, X } from 'lucide-react'
import type { EligibilityProof } from '@/lib/zkp'
import { formatDateTimeIN } from '@/lib/format'
import { StatusPill } from '@/components/page-header'

export function ProofCard({ proof, label }: { proof: EligibilityProof; label: string }) {
  return (
    <article className="rounded-xl border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
        <div>
          <p className="text-xs text-muted-foreground">Verifier receives</p>
          <p className="font-semibold text-navy">{label}</p>
        </div>
        <StatusPill status={proof.result ? 'VERIFIED' : 'NOT MET'} />
      </header>
      <dl className="grid gap-3 p-4 text-sm sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Condition proven</dt>
          <dd className="font-mono">{proof.statement}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Proof ID</dt>
          <dd className="font-mono">{proof.proofId}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Generated</dt>
          <dd>{formatDateTimeIN(proof.generatedAt)}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Commitment (SHA-256)</dt>
          <dd className="truncate font-mono text-xs" title={proof.commitment}>
            {proof.commitment}
          </dd>
        </div>
      </dl>
      <div className="grid gap-4 border-t p-4 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-india-green uppercase">Disclosed</p>
          <ul className="flex flex-col gap-1">
            {proof.disclosed.map((d) => (
              <li key={d} className="flex items-start gap-1.5">
                <Check className="mt-0.5 size-3.5 shrink-0 text-india-green" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-destructive uppercase">Never shared</p>
          <ul className="flex flex-col gap-1">
            {proof.withheld.map((d) => (
              <li key={d} className="flex items-start gap-1.5">
                <EyeOff className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!proof.result && (
        <p className="flex items-start gap-1.5 border-t bg-muted/60 p-3 text-xs text-muted-foreground">
          <X className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Condition not met. The verifier learns only that the condition was not satisfied — not by how much.
        </p>
      )}
    </article>
  )
}
