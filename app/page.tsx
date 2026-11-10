import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader, SectionHeading, DemoTag } from '@/components/page-header'
import { StatGrid } from '@/components/dashboard/stat-grid'
import { IndiaMap } from '@/components/dashboard/india-map'
import { DashboardCharts } from '@/components/dashboard/dashboard-charts'
import { ModuleCards } from '@/components/dashboard/module-cards'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="VERITRUST INDIA · Digital Trust Command Centre"
        title={
          <>
            Your Privacy. Your Truth. <span className="text-saffron">India&apos;s Digital Trust.</span>
          </>
        }
        description="An India-first digital trust ecosystem that combines privacy-preserving eligibility verification, AI-powered fact checking, and misinformation intelligence to make digital India safer, more transparent, and trustworthy."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/trustbridge"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-saffron px-4 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
          >
            Try the TrustBridge scholarship scenario <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/truthlens"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Check a viral claim
          </Link>
        </div>
      </PageHeader>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 md:px-6">
        <section aria-labelledby="modules">
          <h2 id="modules" className="sr-only">
            Modules
          </h2>
          <ModuleCards />
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <SectionHeading className="mb-0" title="National trust overview" description="Illustrative platform-wide figures. These are not real national statistics." />
            <DemoTag>Demo data · Not official statistics</DemoTag>
          </div>
          <StatGrid />
        </section>

        <section>
          <SectionHeading
            title="State-wise verification distribution"
            description="Interactive tile map of India. Select a state to see illustrative proofs generated and misinformation claims flagged."
          />
          <IndiaMap />
        </section>

        <section>
          <SectionHeading title="Trends and languages" description="Monthly activity, claims analysed by language and misinformation categories (demo data)." />
          <DashboardCharts />
        </section>
      </div>
    </>
  )
}
