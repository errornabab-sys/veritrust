import type { Metadata } from 'next'
import { PageHeader, SectionHeading } from '@/components/page-header'
import { Verifier } from '@/components/private-verify/verifier'
import { PrivacyComparison } from '@/components/private-verify/privacy-comparison'
import { Architecture } from '@/components/private-verify/architecture'

export const metadata: Metadata = {
  title: 'PrivateVerify',
  description: "India's privacy-preserving eligibility verification using zero-knowledge proofs and mock verifiable credentials.",
}

export default function PrivateVerifyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 01 · PrivateVerify"
        title={
          <>
            PrivateVerify – <span className="text-saffron">India&apos;s Privacy-Preserving</span> Eligibility Verification
          </>
        }
        description="Prove you are above 18, below an income threshold, or an enrolled student — without revealing your date of birth, income, Aadhaar or documents."
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 md:px-6">
        <section>
          <SectionHeading
            title="Generate an eligibility proof"
            description="Select a mock citizen credential and a condition. The proof is computed on-device; the verifier only receives the condition and a yes/no result."
          />
          <Verifier />
        </section>
        <section>
          <SectionHeading title="What gets shared?" description="A side-by-side comparison of a traditional eligibility check and VERITRUST." />
          <PrivacyComparison />
        </section>
        <section>
          <SectionHeading
            title="Indian privacy & identity architecture"
            description="Integration-ready design. No connector below is live — each requires the issuer's legal authorisation before it can be enabled."
          />
          <Architecture />
        </section>
      </div>
    </>
  )
}
