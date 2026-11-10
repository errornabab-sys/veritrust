import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { TrustBridgeFlow } from '@/components/trustbridge/trustbridge-flow'

export const metadata: Metadata = {
  title: 'TrustBridge',
  description: 'Verify People. Verify Information. Protect India. A combined scholarship trust report using PrivateVerify and TruthLens.',
}

export default function TrustBridgePage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 03 · TrustBridge"
        title={
          <>
            TrustBridge – Verify People. Verify Information. <span className="text-saffron">Protect India.</span>
          </>
        }
        description="Scenario: a student wants to apply for a scholarship advertised online. TrustBridge proves the student is eligible without exposing personal data — and separately checks whether the scholarship is real."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <TrustBridgeFlow />
      </div>
    </>
  )
}
