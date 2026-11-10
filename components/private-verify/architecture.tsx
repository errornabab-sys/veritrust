import { ArrowRight, BadgeCheck, Building2, FileBadge, GraduationCap, IdCard, Landmark, Smartphone } from 'lucide-react'

const CONNECTORS = [
  { icon: IdCard, name: 'Aadhaar offline verification', note: 'Only via legally permitted mechanisms (e.g. resident-initiated offline XML / QR). No OTP or full number collected.' },
  { icon: FileBadge, name: 'DigiLocker-issued documents', note: 'Verifiable credentials issued to the citizen; requires approved partner onboarding.' },
  { icon: Landmark, name: 'PAN-related eligibility', note: 'Through authorised integrations only; raw PAN never stored.' },
  { icon: GraduationCap, name: 'Academic credentials', note: 'Institution-signed enrolment and marksheet credentials.' },
  { icon: Building2, name: 'Income certificates', note: 'State revenue-department issued certificates as signed credentials.' },
  { icon: BadgeCheck, name: 'Government-issued VCs', note: 'W3C-style verifiable credentials from authorised issuers.' },
]

const FLOW = [
  { title: 'Issuer', body: 'Authorised body signs a credential' },
  { title: 'Citizen wallet', body: 'Credential stays on the citizen’s device' },
  { title: 'ZK prover', body: 'Computes proof of one condition locally' },
  { title: 'Verifier', body: 'Checks proof + issuer signature only' },
]

export function Architecture() {
  return (
    <div className="flex flex-col gap-6">
      <ol className="grid gap-3 md:grid-cols-4">
        {FLOW.map((f, i) => (
          <li key={f.title} className="relative rounded-xl border bg-card p-4">
            <span className="font-mono text-xs text-saffron-strong">0{i + 1}</span>
            <p className="mt-1 font-semibold text-navy">{f.title}</p>
            <p className="text-sm text-muted-foreground">{f.body}</p>
            {i < FLOW.length - 1 && (
              <ArrowRight className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 rounded-full bg-background text-muted-foreground md:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CONNECTORS.map((c) => (
          <div key={c.name} className="flex gap-3 rounded-xl border bg-card p-4">
            <c.icon className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{c.name}</p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase">
                  Not connected · Mock only
                </span>
              </div>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">{c.note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 rounded-xl border border-navy/20 bg-secondary p-4 text-sm">
        <Smartphone className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
        <p className="text-pretty">
          <span className="font-semibold text-navy">Hard rules:</span> VERITRUST never requests Aadhaar OTPs or full Aadhaar
          numbers, never stores raw Aadhaar or PAN data, and does not claim access to UIDAI, DigiLocker, PAN or any government
          database. Every demonstration on this site uses mock credentials.
        </p>
      </div>
    </div>
  )
}
