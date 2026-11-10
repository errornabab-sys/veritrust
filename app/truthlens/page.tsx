import type { Metadata } from 'next'
import { PageHeader, SectionHeading } from '@/components/page-header'
import { ClaimChecker } from '@/components/truthlens/claim-checker'
import { EvolutionTracker } from '@/components/truthlens/evolution-tracker'
import { TrustedSources } from '@/components/truthlens/trusted-sources'
import { MISINFO_CATEGORIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'TruthLens',
  description: "India's AI-powered misinformation intelligence system with multilingual fact checking across 11 Indian languages.",
}

export default function TruthLensPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 02 · TruthLens"
        title={
          <>
            TruthLens – <span className="text-saffron">India&apos;s AI-Powered</span> Misinformation Intelligence System
          </>
        }
        description="Check viral forwards, scheme announcements and payment messages in your language — with the official Indian sources you should confirm them against."
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 md:px-6">
        <section>
          <SectionHeading title="Multilingual claim analysis" description="Language detection, English translation and an explanation in your selected language." />
          <ClaimChecker />
        </section>

        <section>
          <SectionHeading title="Misinformation evolution tracker" description="How a harmless-looking message mutates into fraud — one modification at a time." />
          <EvolutionTracker />
        </section>

        <section>
          <SectionHeading title="Indian misinformation categories" description="The patterns TruthLens is tuned to recognise." />
          <ul className="flex flex-wrap gap-2">
            {MISINFO_CATEGORIES.map((c) => (
              <li key={c.id} className="rounded-full border bg-card px-3 py-1.5 text-sm">
                {c.label}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading title="Indian evidence-source framework" description="Curated official portals, regulators, fact-checkers and news organisations." />
          <TrustedSources />
        </section>
      </div>
    </>
  )
}
