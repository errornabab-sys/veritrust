import { Gavel, KeyRound, Landmark, ScrollText, ShieldAlert } from 'lucide-react'

const FRAMEWORKS = [
  { icon: ScrollText, name: 'Digital Personal Data Protection Act, 2023', note: 'Notice, purpose-specific consent, data minimisation, right to withdraw and grievance redressal inform the consent and retention design.' },
  { icon: Gavel, name: 'Information Technology Act, 2000', note: 'Reasonable security practices and intermediary obligations considered for claim submission and reporting flows.' },
  { icon: ShieldAlert, name: 'CERT-In Directions (2022)', note: 'Incident-reporting timelines and log-retention expectations considered for security operations.' },
  { icon: KeyRound, name: 'Aadhaar Act, 2016 & UIDAI regulations', note: 'No Aadhaar numbers or OTPs are collected; any future integration only through UIDAI-permitted offline mechanisms.' },
  { icon: Landmark, name: 'RBI requirements', note: 'Any financial or payment integration would follow applicable RBI directions via regulated partners.' },
]

const RETENTION = [
  { data: 'Mock credential attributes', where: 'Citizen device only', retention: 'Never uploaded' },
  { data: 'Eligibility proof result', where: 'Verifier', retention: 'Until purpose fulfilled (demo: 30 days)' },
  { data: 'Submitted claim text', where: 'TruthLens', retention: 'Not stored in this demo' },
  { data: 'Consent records', where: 'Platform', retention: 'Duration of consent + audit period' },
  { data: 'Aadhaar / PAN numbers', where: '—', retention: 'Never collected or stored' },
]

const ROLES = [
  { role: 'Citizen', access: 'Own credentials, proofs and consent history' },
  { role: 'Verifier (e.g. scholarship platform)', access: 'Proof result for the condition requested only' },
  { role: 'Analyst', access: 'Aggregated, de-identified statistics' },
  { role: 'Administrator', access: 'Configuration and audit logs; no access to raw credentials' },
]

export function RegulatoryAwareness() {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {FRAMEWORKS.map((f) => (
        <div key={f.name} className="rounded-xl border bg-card p-4">
          <f.icon className="size-5 text-navy" aria-hidden="true" />
          <p className="mt-2 font-medium">{f.name}</p>
          <p className="mt-1 text-sm text-pretty text-muted-foreground">{f.note}</p>
        </div>
      ))}
      <div className="rounded-xl border border-saffron/40 bg-accent p-4 text-sm text-pretty text-accent-foreground">
        VERITRUST INDIA is an independent demonstration. It does not claim compliance with any law, certification by any
        authority, or authorisation from UIDAI, DigiLocker, the Income Tax Department, RBI, NPCI or any government body.
      </div>
    </div>
  )
}

export function DataGovernance() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-left text-sm">
          <caption className="p-4 pb-2 text-left font-semibold text-navy">Retention policy</caption>
          <thead className="border-y bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2 font-medium">Data</th>
              <th scope="col" className="px-4 py-2 font-medium">Held by</th>
              <th scope="col" className="px-4 py-2 font-medium">Retention</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {RETENTION.map((r) => (
              <tr key={r.data}>
                <td className="px-4 py-2.5 font-medium">{r.data}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.where}</td>
                <td className="px-4 py-2.5">{r.retention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-left text-sm">
          <caption className="p-4 pb-2 text-left font-semibold text-navy">Access control</caption>
          <thead className="border-y bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2 font-medium">Role</th>
              <th scope="col" className="px-4 py-2 font-medium">Can access</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ROLES.map((r) => (
              <tr key={r.role}>
                <td className="px-4 py-2.5 font-medium">{r.role}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border bg-card p-4 text-sm lg:col-span-2">
        <p className="font-semibold text-navy">Privacy notice (summary)</p>
        <p className="mt-1 text-pretty text-muted-foreground">
          We process only what is necessary for the purpose you consent to. Eligibility proofs are computed on your device and
          reveal only the condition and result. You may withdraw consent at any time from this page. For grievances in a
          production deployment, a designated grievance officer would be listed here with a response timeline.
        </p>
      </div>
    </div>
  )
}
