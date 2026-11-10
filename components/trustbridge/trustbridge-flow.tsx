'use client'

import { useState } from 'react'
import { Check, ExternalLink, FileText, GraduationCap, Loader2, Megaphone, RotateCcw, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/page-header'
import { ANNOUNCEMENTS, PROFILES, sourceById, type Announcement } from '@/lib/data'
import { formatDateTimeIN, formatLakh } from '@/lib/format'
import { PREDICATES, generateProof, type EligibilityProof } from '@/lib/zkp'
import { cn } from '@/lib/utils'

type Report = {
  proofs: { label: string; proof: EligibilityProof }[]
  announcement: Announcement
  generatedAt: string
}

const REQUIRED = [
  { id: 'age-18', label: 'Applicant Age Eligibility' },
  { id: 'income-250000', label: 'Income Eligibility' },
  { id: 'student-enrolled', label: 'Student Status' },
] as const

function recommendation(report: Report) {
  const applicantOk = report.proofs.every((p) => p.proof.result)
  const status = report.announcement.status
  if (status === 'FALSE') return { level: 'HIGH RISK', text: 'Do not proceed. The announcement is fraudulent, regardless of the applicant’s eligibility. Never pay or share details.' }
  if (status === 'UNVERIFIED') return { level: 'CAUTION', text: 'The applicant may be eligible, but this announcement could not be matched to an official notification. Apply only via the official portal.' }
  if (!applicantOk) return { level: 'CAUTION', text: 'The scholarship is genuine, but the applicant does not meet every condition. Check the official criteria before applying.' }
  return { level: 'SAFE TO PROCEED', text: 'Applicant meets the conditions and the announcement matches an official source. Apply on the official portal only.' }
}

export function TrustBridgeFlow() {
  const [profileId, setProfileId] = useState(PROFILES[1].credentialId)
  const [announcementId, setAnnouncementId] = useState(ANNOUNCEMENTS[2].id)
  const [report, setReport] = useState<Report | null>(null)
  const [busy, setBusy] = useState(false)

  const profile = PROFILES.find((p) => p.credentialId === profileId)!
  const announcement = ANNOUNCEMENTS.find((a) => a.id === announcementId)!

  async function run() {
    setBusy(true)
    setReport(null)
    await new Promise((r) => setTimeout(r, 900))
    const proofs = await Promise.all(
      REQUIRED.map(async (r) => ({
        label: r.label,
        proof: await generateProof(profile, PREDICATES.find((p) => p.id === r.id)!, { verifierId: 'scholarship-platform-demo' }),
      })),
    )
    setReport({ proofs, announcement, generatedAt: new Date().toISOString() })
    setBusy(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <StepCard step="Step 1" icon={GraduationCap} title="Verify the applicant (PrivateVerify)" subtitle={`Prove age ≥ 18, family income < ${formatLakh(250000)}, and student status — nothing more.`}>
          <div className="grid gap-2 sm:grid-cols-2">
            {PROFILES.map((p) => (
              <ChoiceButton key={p.credentialId} active={p.credentialId === profileId} onClick={() => { setProfileId(p.credentialId); setReport(null) }}>
                <span className="block font-medium">{p.name}</span>
                <span className="block text-xs text-muted-foreground">{p.city}, {p.state}</span>
              </ChoiceButton>
            ))}
          </div>
        </StepCard>

        <StepCard step="Step 2" icon={Megaphone} title="Verify the announcement (TruthLens)" subtitle="Compare the scholarship message against official notifications and known fraud patterns.">
          <div className="flex flex-col gap-2">
            {ANNOUNCEMENTS.map((a) => (
              <ChoiceButton key={a.id} active={a.id === announcementId} onClick={() => { setAnnouncementId(a.id); setReport(null) }}>
                <span className="block font-medium">{a.title}</span>
                <span className="block text-xs text-pretty text-muted-foreground">{a.text}</span>
                <span className="mt-1 block text-[11px] text-muted-foreground">Seen on: {a.channel}</span>
              </ChoiceButton>
            ))}
          </div>
        </StepCard>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={run} disabled={busy} className="h-11 px-5">
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ShieldCheck className="size-4" aria-hidden="true" />}
          {busy ? 'Generating proofs and checking sources…' : 'Step 3 · Generate combined trust report'}
        </Button>
        {report && (
          <Button variant="outline" onClick={() => setReport(null)} className="h-11">
            <RotateCcw className="size-4" aria-hidden="true" /> Reset
          </Button>
        )}
      </div>

      <div aria-live="polite">{report && <TrustReport report={report} />}</div>
    </div>
  )
}

function TrustReport({ report }: { report: Report }) {
  const rec = recommendation(report)
  const src = sourceById(report.announcement.officialSourceId)!
  return (
    <article className="overflow-hidden rounded-xl border bg-card">
      <div className="tricolor-bar h-1" aria-hidden="true" />
      <header className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-navy" aria-hidden="true" />
          <div>
            <p className="font-semibold text-navy">Combined Trust Report</p>
            <p className="text-xs text-muted-foreground">Generated {formatDateTimeIN(report.generatedAt)}</p>
          </div>
        </div>
        <StatusPill status={rec.level} className="px-3 py-1 text-sm" />
      </header>

      <div className="grid md:grid-cols-2">
        <section className="border-b p-5 md:border-r md:border-b-0" aria-labelledby="applicant-results">
          <h3 id="applicant-results" className="text-xs font-semibold text-muted-foreground uppercase">
            A · Personal eligibility
          </h3>
          <dl className="mt-3 flex flex-col gap-2.5">
            {report.proofs.map((p) => (
              <div key={p.label} className="flex items-center justify-between gap-3">
                <dt className="text-sm">{p.label}</dt>
                <dd>
                  <StatusPill status={p.proof.result ? 'VERIFIED' : 'NOT MET'} />
                </dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 border-t pt-2.5">
              <dt className="text-sm font-medium">Personal Data Exposed</dt>
              <dd>
                <StatusPill status="NONE" />
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            Exact birth date, family income and documents were not shared with the scholarship platform (ZKP demonstration).
          </p>
        </section>

        <section className="p-5" aria-labelledby="announcement-results">
          <h3 id="announcement-results" className="text-xs font-semibold text-muted-foreground uppercase">
            B · Announcement authenticity
          </h3>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm">Scholarship Announcement</span>
            <StatusPill status={report.announcement.status} />
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            {report.announcement.findings.map((f) => (
              <li key={f.label} className="flex items-start gap-1.5">
                {f.ok ? (
                  <Check className="mt-0.5 size-3.5 shrink-0 text-india-green" aria-label="Pass" />
                ) : (
                  <X className="mt-0.5 size-3.5 shrink-0 text-destructive" aria-label="Fail" />
                )}
                {f.label}
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
            <p className="text-xs text-muted-foreground">Official source</p>
            <a href={src.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-navy hover:underline">
              {src.name} <ExternalLink className="size-3" aria-hidden="true" />
            </a>
            <p className="text-xs text-pretty text-muted-foreground">{report.announcement.officialNotification}</p>
          </div>
        </section>
      </div>

      <footer
        className={cn(
          'border-t p-5',
          rec.level === 'HIGH RISK' && 'bg-destructive/5',
          rec.level === 'CAUTION' && 'bg-accent/60',
          rec.level === 'SAFE TO PROCEED' && 'bg-india-green/5',
        )}
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase">Final Recommendation</p>
        <p className="mt-1 text-lg font-semibold text-navy">{rec.level}</p>
        <p className="mt-1 text-sm text-pretty">{rec.text}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Personal eligibility and announcement authenticity are evaluated independently. A verified applicant never makes an
          unverified scholarship legitimate.
        </p>
      </footer>
    </article>
  )
}

function StepCard({
  step,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  step: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border bg-card p-4 md:p-5">
      <p className="font-mono text-xs font-semibold text-saffron-strong uppercase">{step}</p>
      <h2 className="mt-1 flex items-center gap-2 font-semibold text-navy">
        <Icon className="size-4" aria-hidden="true" /> {title}
      </h2>
      <p className="mt-1 mb-4 text-sm text-pretty text-muted-foreground">{subtitle}</p>
      {children}
    </section>
  )
}

function ChoiceButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-lg border p-3 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        active ? 'border-navy bg-secondary' : 'hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}
