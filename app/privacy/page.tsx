import type { Metadata } from 'next'
import { PageHeader, SectionHeading } from '@/components/page-header'
import { ConsentManager } from '@/components/privacy/consent-manager'
import { RegulatoryAwareness, DataGovernance } from '@/components/privacy/governance'

export const metadata: Metadata = {
  title: 'Privacy & Consent',
  description: 'Consent management, data minimisation, retention and regulatory awareness for VERITRUST INDIA.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & Governance"
        title="Privacy, consent and regulatory awareness"
        description="Designed with awareness of India's data protection and cyber security framework. VERITRUST does not claim legal compliance or government authorisation."
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 md:px-6">
        <section>
          <SectionHeading title="Consent manager" description="Purpose-specific, revocable consent in the spirit of the DPDP Act, 2023. Demo — choices are kept only in this browser session." />
          <ConsentManager />
        </section>
        <section>
          <SectionHeading title="Data minimisation, retention and access control" />
          <DataGovernance />
        </section>
        <section>
          <SectionHeading title="Regulatory awareness" description="Frameworks considered in the design. This is not legal advice and not a compliance certification." />
          <RegulatoryAwareness />
        </section>
      </div>
    </>
  )
}
