import { Check, FileWarning, ShieldCheck, X } from 'lucide-react'

const TRADITIONAL = [
  'Full Aadhaar number and photocopy',
  'Exact date of birth',
  'Income certificate showing exact family income',
  'PAN card copy',
  'Home address and phone number',
  'Documents stored indefinitely by the verifier',
]

const VERITRUST = [
  'Only the condition requested (e.g. “age ≥ 18”)',
  'A yes / no verification result',
  'Proof that a trusted issuer signed the credential',
  'An opaque, unlinkable proof ID',
  'No Aadhaar, PAN, OTP or documents — ever',
  'Nothing to store beyond the result and consent record',
]

export function PrivacyComparison() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-destructive/25 bg-card p-5">
        <p className="flex items-center gap-2 font-semibold text-destructive">
          <FileWarning className="size-5" aria-hidden="true" /> Traditional verification
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Full Aadhaar details, date of birth, income documents and other sensitive information may be requested.
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {TRADITIONAL.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-india-green/30 bg-card p-5">
        <p className="flex items-center gap-2 font-semibold text-india-green">
          <ShieldCheck className="size-5" aria-hidden="true" /> VERITRUST
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Only the required condition and verification result are shared.</p>
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {VERITRUST.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-india-green" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
