import { ageInYears, formatLakh } from './format'
import type { MockCredential } from './data'

export type PredicateId =
  | 'age-18'
  | 'age-21'
  | 'age-60'
  | 'income-100000'
  | 'income-250000'
  | 'income-500000'
  | 'income-custom'
  | 'student-enrolled'
  | 'scholarship-eligible'
  | 'institution-recognised'
  | 'scheme-pm-kisan'
  | 'scheme-nsp'
  | 'scheme-pmjay'
  | 'scheme-state-postmatric'

export type Predicate = {
  id: PredicateId
  group: 'Age' | 'Income' | 'Student' | 'Government Scheme (demo)'
  label: string
  statement: string
  attributesUsed: string[]
}

export const PREDICATES: Predicate[] = [
  { id: 'age-18', group: 'Age', label: 'Above 18 years', statement: 'age ≥ 18', attributesUsed: ['date of birth'] },
  { id: 'age-21', group: 'Age', label: 'Above 21 years', statement: 'age ≥ 21', attributesUsed: ['date of birth'] },
  { id: 'age-60', group: 'Age', label: 'Senior citizen (60+)', statement: 'age ≥ 60', attributesUsed: ['date of birth'] },
  { id: 'income-100000', group: 'Income', label: 'Family income below ₹1 lakh', statement: 'annual family income < ₹1,00,000', attributesUsed: ['annual family income'] },
  { id: 'income-250000', group: 'Income', label: 'Family income below ₹2.5 lakh', statement: 'annual family income < ₹2,50,000', attributesUsed: ['annual family income'] },
  { id: 'income-500000', group: 'Income', label: 'Family income below ₹5 lakh', statement: 'annual family income < ₹5,00,000', attributesUsed: ['annual family income'] },
  { id: 'income-custom', group: 'Income', label: 'Custom income threshold', statement: 'annual family income < custom threshold', attributesUsed: ['annual family income'] },
  { id: 'student-enrolled', group: 'Student', label: 'Currently enrolled student', statement: 'enrolment status = active', attributesUsed: ['enrolment status'] },
  { id: 'scholarship-eligible', group: 'Student', label: 'Scholarship eligibility', statement: 'enrolled AND income < ₹2.5 lakh AND age ≥ 18', attributesUsed: ['enrolment status', 'annual family income', 'date of birth'] },
  { id: 'institution-recognised', group: 'Student', label: 'Institution verification', statement: 'institution ∈ recognised registry (demo AISHE-style list)', attributesUsed: ['institution code'] },
  { id: 'scheme-pm-kisan', group: 'Government Scheme (demo)', label: 'PM-KISAN style workflow', statement: 'landholding farmer family = true AND not income-tax payer (demo rule)', attributesUsed: ['landholding flag', 'tax-payer flag'] },
  { id: 'scheme-nsp', group: 'Government Scheme (demo)', label: 'National Scholarship Portal style workflow', statement: 'enrolled AND income < ₹2.5 lakh (demo rule)', attributesUsed: ['enrolment status', 'annual family income'] },
  { id: 'scheme-pmjay', group: 'Government Scheme (demo)', label: 'Ayushman Bharat PM-JAY style workflow', statement: 'listed in demo beneficiary registry OR age ≥ 70 (demo rule)', attributesUsed: ['demo registry flag', 'date of birth'] },
  { id: 'scheme-state-postmatric', group: 'Government Scheme (demo)', label: 'State post-matric scholarship workflow', statement: 'state domicile matches AND enrolled AND income < ₹2.5 lakh (demo rule)', attributesUsed: ['domicile state', 'enrolment status', 'annual family income'] },
]

export function evaluatePredicate(id: PredicateId, c: MockCredential, opts: { customIncome?: number; schemeState?: string } = {}) {
  const age = ageInYears(c.dob)
  switch (id) {
    case 'age-18':
      return age >= 18
    case 'age-21':
      return age >= 21
    case 'age-60':
      return age >= 60
    case 'income-100000':
      return c.annualFamilyIncome < 100000
    case 'income-250000':
      return c.annualFamilyIncome < 250000
    case 'income-500000':
      return c.annualFamilyIncome < 500000
    case 'income-custom':
      return c.annualFamilyIncome < (opts.customIncome ?? 300000)
    case 'student-enrolled':
      return c.enrolled
    case 'scholarship-eligible':
      return c.enrolled && c.annualFamilyIncome < 250000 && age >= 18
    case 'institution-recognised':
      return c.institutionRecognised
    case 'scheme-pm-kisan':
      return c.landholdingFarmer && !c.incomeTaxPayer
    case 'scheme-nsp':
      return c.enrolled && c.annualFamilyIncome < 250000
    case 'scheme-pmjay':
      return c.pmjayDemoListed || age >= 70
    case 'scheme-state-postmatric':
      return c.state === (opts.schemeState ?? c.state) && c.enrolled && c.annualFamilyIncome < 250000
  }
}

export function predicateStatement(p: Predicate, customIncome?: number) {
  if (p.id === 'income-custom' && customIncome) return `annual family income < ${formatLakh(customIncome)}`
  return p.statement
}

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export type EligibilityProof = {
  proofId: string
  predicateId: PredicateId
  statement: string
  result: boolean
  commitment: string
  nullifier: string
  issuer: string
  generatedAt: string
  disclosed: string[]
  withheld: string[]
}

/**
 * Simulated zero-knowledge flow for demonstration only.
 * The credential is committed with a random salt on-device; only the predicate,
 * the boolean result, and opaque commitments leave the device. This is NOT a
 * cryptographically sound ZK-SNARK — a production system would use a vetted
 * circuit (e.g. Groth16/PLONK) over issuer-signed credentials.
 */
export async function generateProof(
  credential: MockCredential,
  predicate: Predicate,
  opts: { customIncome?: number; verifierId?: string } = {},
): Promise<EligibilityProof> {
  const salt = crypto.getRandomValues(new Uint32Array(4)).join('-')
  const result = evaluatePredicate(predicate.id, credential, opts)
  const commitment = await sha256Hex(`${credential.credentialId}|${predicate.id}|${salt}`)
  const nullifier = await sha256Hex(`${credential.credentialId}|${opts.verifierId ?? 'veritrust-demo'}`)
  return {
    proofId: `VTP-${commitment.slice(0, 10).toUpperCase()}`,
    predicateId: predicate.id,
    statement: predicateStatement(predicate, opts.customIncome),
    result,
    commitment,
    nullifier,
    issuer: credential.issuer,
    generatedAt: new Date().toISOString(),
    disclosed: ['Condition checked', 'Result (true / false)', 'Issuer signature validity (demo)'],
    withheld: predicate.attributesUsed.map((a) => `Exact ${a}`).concat(['Aadhaar / PAN number (never collected)', 'Name, address and documents']),
  }
}
