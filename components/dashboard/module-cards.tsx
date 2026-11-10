import Link from 'next/link'
import { ArrowUpRight, Fingerprint, Link2, ScanSearch } from 'lucide-react'

const MODULES = [
  {
    href: '/private-verify',
    icon: Fingerprint,
    name: 'PrivateVerify',
    subtitle: "India's Privacy-Preserving Eligibility Verification",
    body: 'Prove age, income band or student status with zero-knowledge proofs — without sharing Aadhaar, PAN or documents.',
    accent: 'bg-saffron',
  },
  {
    href: '/truthlens',
    icon: ScanSearch,
    name: 'TruthLens',
    subtitle: "India's AI-Powered Misinformation Intelligence System",
    body: 'Check claims in 11 Indian languages against official sources like PIB Fact Check, RBI, ECI and NSP.',
    accent: 'bg-navy',
  },
  {
    href: '/trustbridge',
    icon: Link2,
    name: 'TrustBridge',
    subtitle: 'Verify People. Verify Information. Protect India.',
    body: 'Combine applicant eligibility and announcement authenticity into one trust report — kept as separate results.',
    accent: 'bg-india-green',
  },
]

export function ModuleCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {MODULES.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          className="group relative flex flex-col overflow-hidden rounded-xl border bg-card p-5 transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span className={`absolute inset-x-0 top-0 h-1 ${m.accent}`} aria-hidden="true" />
          <div className="flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-navy">
              <m.icon className="size-5" aria-hidden="true" />
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-navy">{m.name}</h3>
          <p className="text-sm font-medium text-saffron-strong">{m.subtitle}</p>
          <p className="mt-2 text-sm text-pretty text-muted-foreground">{m.body}</p>
        </Link>
      ))}
    </div>
  )
}
