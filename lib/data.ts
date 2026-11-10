export type MockCredential = {
  credentialId: string
  name: string
  city: string
  state: string
  phone: string
  dob: string
  annualFamilyIncome: number
  enrolled: boolean
  institution: string
  institutionRecognised: boolean
  landholdingFarmer: boolean
  incomeTaxPayer: boolean
  pmjayDemoListed: boolean
  issuer: string
}

export const PROFILES: MockCredential[] = [
  {
    credentialId: 'vc-demo-rs-2041',
    name: 'Rahul Sharma',
    city: 'New Delhi',
    state: 'Delhi',
    phone: '+91 98XXX XX214',
    dob: '2003-03-14',
    annualFamilyIncome: 210000,
    enrolled: true,
    institution: 'University of Delhi (B.Com, 3rd year)',
    institutionRecognised: true,
    landholdingFarmer: false,
    incomeTaxPayer: false,
    pmjayDemoListed: false,
    issuer: 'Demo Credential Issuer (DigiLocker-style VC, mock)',
  },
  {
    credentialId: 'vc-demo-pd-7713',
    name: 'Priya Das',
    city: 'Bhubaneswar',
    state: 'Odisha',
    phone: '+91 94XXX XX087',
    dob: '2005-08-22',
    annualFamilyIncome: 85000,
    enrolled: true,
    institution: 'Utkal University (B.Sc Physics, 2nd year)',
    institutionRecognised: true,
    landholdingFarmer: true,
    incomeTaxPayer: false,
    pmjayDemoListed: true,
    issuer: 'Demo Credential Issuer (DigiLocker-style VC, mock)',
  },
  {
    credentialId: 'vc-demo-ap-3390',
    name: 'Arjun Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    phone: '+91 97XXX XX552',
    dob: '1998-01-05',
    annualFamilyIncome: 640000,
    enrolled: false,
    institution: 'Gujarat University (alumnus, 2019)',
    institutionRecognised: true,
    landholdingFarmer: false,
    incomeTaxPayer: true,
    pmjayDemoListed: false,
    issuer: 'Demo Credential Issuer (DigiLocker-style VC, mock)',
  },
  {
    credentialId: 'vc-demo-ai-5126',
    name: 'Ananya Iyer',
    city: 'Chennai',
    state: 'Tamil Nadu',
    phone: '+91 90XXX XX639',
    dob: '2008-11-30',
    annualFamilyIncome: 420000,
    enrolled: true,
    institution: 'Kendriya Vidyalaya, Chennai (Class XII)',
    institutionRecognised: true,
    landholdingFarmer: false,
    incomeTaxPayer: false,
    pmjayDemoListed: false,
    issuer: 'Demo Credential Issuer (DigiLocker-style VC, mock)',
  },
  {
    credentialId: 'vc-demo-sv-8807',
    name: 'Sneha Verma',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    phone: '+91 99XXX XX401',
    dob: '1955-06-10',
    annualFamilyIncome: 180000,
    enrolled: false,
    institution: '—',
    institutionRecognised: false,
    landholdingFarmer: true,
    incomeTaxPayer: false,
    pmjayDemoListed: false,
    issuer: 'Demo Credential Issuer (DigiLocker-style VC, mock)',
  },
]

export type StateTile = {
  code: string
  name: string
  row: number
  col: number
  proofs: number
  claimsFlagged: number
  featured?: boolean
}

/** Tile-grid cartogram of India. All figures are illustrative demo data. */
export const STATES: StateTile[] = [
  { code: 'JK', name: 'Jammu & Kashmir', row: 0, col: 2, proofs: 41200, claimsFlagged: 1820 },
  { code: 'PB', name: 'Punjab', row: 1, col: 2, proofs: 88400, claimsFlagged: 2410 },
  { code: 'HP', name: 'Himachal Pradesh', row: 1, col: 3, proofs: 29600, claimsFlagged: 690 },
  { code: 'HR', name: 'Haryana', row: 2, col: 2, proofs: 97300, claimsFlagged: 2980 },
  { code: 'UK', name: 'Uttarakhand', row: 2, col: 3, proofs: 38100, claimsFlagged: 1040 },
  { code: 'SK', name: 'Sikkim', row: 2, col: 5, proofs: 6200, claimsFlagged: 140 },
  { code: 'AR', name: 'Arunachal Pradesh', row: 2, col: 7, proofs: 7900, claimsFlagged: 210 },
  { code: 'RJ', name: 'Rajasthan', row: 3, col: 1, proofs: 241800, claimsFlagged: 8920, featured: true },
  { code: 'DL', name: 'Delhi', row: 3, col: 2, proofs: 312500, claimsFlagged: 11240, featured: true },
  { code: 'UP', name: 'Uttar Pradesh', row: 3, col: 3, proofs: 486900, claimsFlagged: 19870, featured: true },
  { code: 'BR', name: 'Bihar', row: 3, col: 4, proofs: 203400, claimsFlagged: 9130 },
  { code: 'AS', name: 'Assam', row: 3, col: 6, proofs: 71200, claimsFlagged: 2760 },
  { code: 'NL', name: 'Nagaland', row: 3, col: 7, proofs: 5400, claimsFlagged: 160 },
  { code: 'GJ', name: 'Gujarat', row: 4, col: 1, proofs: 276300, claimsFlagged: 9480, featured: true },
  { code: 'MP', name: 'Madhya Pradesh', row: 4, col: 2, proofs: 198700, claimsFlagged: 7020 },
  { code: 'CG', name: 'Chhattisgarh', row: 4, col: 3, proofs: 84600, claimsFlagged: 2390 },
  { code: 'JH', name: 'Jharkhand', row: 4, col: 4, proofs: 79800, claimsFlagged: 3150 },
  { code: 'WB', name: 'West Bengal', row: 4, col: 5, proofs: 268400, claimsFlagged: 10620, featured: true },
  { code: 'ML', name: 'Meghalaya', row: 4, col: 6, proofs: 8800, claimsFlagged: 230 },
  { code: 'MN', name: 'Manipur', row: 4, col: 7, proofs: 9300, claimsFlagged: 410 },
  { code: 'MH', name: 'Maharashtra', row: 5, col: 1, proofs: 452100, claimsFlagged: 15340, featured: true },
  { code: 'TG', name: 'Telangana', row: 5, col: 2, proofs: 221600, claimsFlagged: 8410, featured: true },
  { code: 'OD', name: 'Odisha', row: 5, col: 3, proofs: 187300, claimsFlagged: 6780, featured: true },
  { code: 'TR', name: 'Tripura', row: 5, col: 6, proofs: 11200, claimsFlagged: 330 },
  { code: 'MZ', name: 'Mizoram', row: 5, col: 7, proofs: 4700, claimsFlagged: 120 },
  { code: 'GA', name: 'Goa', row: 6, col: 1, proofs: 18900, claimsFlagged: 520 },
  { code: 'KA', name: 'Karnataka', row: 6, col: 2, proofs: 334800, claimsFlagged: 11920, featured: true },
  { code: 'AP', name: 'Andhra Pradesh', row: 6, col: 3, proofs: 192500, claimsFlagged: 7360 },
  { code: 'KL', name: 'Kerala', row: 7, col: 2, proofs: 158200, claimsFlagged: 6410, featured: true },
  { code: 'TN', name: 'Tamil Nadu', row: 7, col: 3, proofs: 349600, claimsFlagged: 12780, featured: true },
]

export const DASHBOARD_STATS = [
  { key: 'users', label: 'Total Indian users', value: 1248350, delta: '+8.4%' },
  { key: 'proofs', label: 'Eligibility proofs generated', value: 3892410, delta: '+12.1%' },
  { key: 'scholarship', label: 'Fake scholarship claims detected', value: 18472, delta: '+5.7%' },
  { key: 'upi', label: 'UPI scam claims analysed', value: 52906, delta: '+14.9%' },
  { key: 'websites', label: 'Fake scheme websites flagged', value: 3214, delta: '+3.2%' },
  { key: 'private', label: 'Privacy-preserving transactions', value: 4107880, delta: '+11.6%' },
] as const

export const MONTHLY_TREND = [
  { month: 'Jun 26', proofs: 412000, claims: 9100 },
  { month: 'Jul 26', proofs: 468000, claims: 10400 },
  { month: 'Aug 26', proofs: 521000, claims: 12900 },
  { month: 'Sep 26', proofs: 603000, claims: 15200 },
  { month: 'Oct 26', proofs: 688000, claims: 16800 },
  { month: 'Nov 26', proofs: 731000, claims: 18300 },
]

export const CLAIMS_BY_LANGUAGE = [
  { language: 'Hindi', claims: 48210 },
  { language: 'English', claims: 36480 },
  { language: 'Bengali', claims: 14920 },
  { language: 'Marathi', claims: 12310 },
  { language: 'Tamil', claims: 11870 },
  { language: 'Telugu', claims: 10940 },
  { language: 'Gujarati', claims: 8120 },
  { language: 'Kannada', claims: 7480 },
  { language: 'Odia', claims: 6230 },
  { language: 'Malayalam', claims: 5960 },
  { language: 'Punjabi', claims: 4410 },
]

export const MISINFO_CATEGORIES = [
  { id: 'fake-scheme', label: 'Fake government schemes', share: 17 },
  { id: 'pm-kisan', label: 'Fake PM-KISAN registration websites', share: 6 },
  { id: 'scholarship', label: 'Fake scholarship announcements', share: 9 },
  { id: 'upi', label: 'UPI and digital payment scams', share: 19 },
  { id: 'rbi', label: 'Fake banking and RBI announcements', share: 8 },
  { id: 'jobs', label: 'Fake job recruitment advertisements', share: 10 },
  { id: 'exam', label: 'Fake exam notifications', share: 5 },
  { id: 'admission', label: 'Fake university admission notices', share: 3 },
  { id: 'election', label: 'Election-related misinformation', share: 6 },
  { id: 'health', label: 'Fake health and medical claims', share: 7 },
  { id: 'rumour', label: 'Communal and social media rumours', share: 4 },
  { id: 'disaster', label: 'Fake disaster and emergency alerts', share: 3 },
  { id: 'deepfake', label: 'Deepfake videos and manipulated images', share: 3 },
] as const

export type TrustedSource = {
  id: string
  name: string
  url: string
  kind: 'Official – Government' | 'Official – Regulator' | 'Independent fact-checker' | 'News organisation'
  covers: string
}

export const TRUSTED_SOURCES: TrustedSource[] = [
  { id: 'pib-factcheck', name: 'PIB Fact Check', url: 'https://factcheck.pib.gov.in', kind: 'Official – Government', covers: 'Claims about Central Government schemes, ministries and notices' },
  { id: 'pib', name: 'Press Information Bureau', url: 'https://pib.gov.in', kind: 'Official – Government', covers: 'Official press releases from the Government of India' },
  { id: 'india-gov', name: 'National Portal of India', url: 'https://www.india.gov.in', kind: 'Official – Government', covers: 'Directory of official government services and schemes' },
  { id: 'mygov', name: 'MyGov', url: 'https://www.mygov.in', kind: 'Official – Government', covers: 'Citizen engagement and official campaign information' },
  { id: 'rbi', name: 'Reserve Bank of India', url: 'https://www.rbi.org.in', kind: 'Official – Regulator', covers: 'Banking, currency and payment-system announcements' },
  { id: 'npci', name: 'NPCI (UPI)', url: 'https://www.npci.org.in', kind: 'Official – Regulator', covers: 'UPI rules, safety advisories and payment features' },
  { id: 'eci', name: 'Election Commission of India', url: 'https://www.eci.gov.in', kind: 'Official – Government', covers: 'Election schedules, voter services and poll-related claims' },
  { id: 'uidai', name: 'UIDAI', url: 'https://uidai.gov.in', kind: 'Official – Government', covers: 'Aadhaar enrolment, updates and authorised usage' },
  { id: 'cert-in', name: 'CERT-In', url: 'https://www.cert-in.org.in', kind: 'Official – Government', covers: 'Cyber security advisories, phishing and malware alerts' },
  { id: 'cybercrime', name: 'National Cyber Crime Reporting Portal', url: 'https://cybercrime.gov.in', kind: 'Official – Government', covers: 'Reporting cyber fraud (helpline 1930)' },
  { id: 'moe', name: 'Ministry of Education', url: 'https://www.education.gov.in', kind: 'Official – Government', covers: 'Education policy, exams and institution notices' },
  { id: 'nsp', name: 'National Scholarship Portal', url: 'https://scholarships.gov.in', kind: 'Official – Government', covers: 'Central and state scholarship schemes and deadlines' },
  { id: 'pm-kisan', name: 'PM-KISAN Portal', url: 'https://pmkisan.gov.in', kind: 'Official – Government', covers: 'PM-KISAN registration and beneficiary status' },
  { id: 'pmjay', name: 'Ayushman Bharat PM-JAY', url: 'https://pmjay.gov.in', kind: 'Official – Government', covers: 'Health insurance scheme eligibility and empanelled hospitals' },
  { id: 'odisha-gov', name: 'Government of Odisha', url: 'https://odisha.gov.in', kind: 'Official – Government', covers: 'Example official state government portal' },
  { id: 'altnews', name: 'Alt News', url: 'https://www.altnews.in', kind: 'Independent fact-checker', covers: 'Social media rumours, manipulated media' },
  { id: 'boom', name: 'BOOM', url: 'https://www.boomlive.in', kind: 'Independent fact-checker', covers: 'Viral claims, deepfakes, scams' },
  { id: 'factly', name: 'Factly', url: 'https://factly.in', kind: 'Independent fact-checker', covers: 'Government data and scheme claims' },
  { id: 'vishvas', name: 'Vishvas News', url: 'https://www.vishvasnews.com', kind: 'Independent fact-checker', covers: 'Multilingual fact checks' },
  { id: 'thehindu', name: 'The Hindu', url: 'https://www.thehindu.com', kind: 'News organisation', covers: 'National news reporting' },
  { id: 'indianexpress', name: 'The Indian Express', url: 'https://indianexpress.com', kind: 'News organisation', covers: 'National news and explainers' },
  { id: 'pti', name: 'Press Trust of India', url: 'https://www.ptinews.com', kind: 'News organisation', covers: 'Wire news agency' },
]

export type EvolutionStage = {
  text: string
  date: string
  channel: string
  change: string
  risk: number
}

export type EvidenceItem = {
  sourceId: string
  date: string
  summary: string
  stance: 'supports' | 'contradicts' | 'context'
}

export type EvolutionCase = {
  id: string
  title: string
  category: string
  stages: EvolutionStage[]
  suspiciousUrls: { url: string; reason: string }[]
  evidence: EvidenceItem[]
  verdict: string
}

export const EVOLUTION_CASES: EvolutionCase[] = [
  {
    id: 'scholarship',
    title: 'Fake Scholarship Scheme',
    category: 'Fake scholarship announcements',
    verdict: 'FALSE — evolved into an advance-fee fraud',
    stages: [
      { text: 'A new government scholarship has been announced for eligible students.', date: '2026-09-02', channel: 'News aggregator', change: 'Baseline: generic, plausible statement. Eligibility conditions are not stated.', risk: 15 },
      { text: 'Every student will receive ₹50,000.', date: '2026-09-05', channel: 'Facebook post', change: 'Universal eligibility and a fixed large amount were added. Real scholarships are means-tested and vary by scheme.', risk: 45 },
      { text: 'Registration is available only through this WhatsApp link.', date: '2026-09-08', channel: 'WhatsApp forward', change: 'Registration moved off official channels. Official schemes register via scholarships.gov.in or state portals.', risk: 75 },
      { text: 'Pay ₹499 to activate your scholarship.', date: '2026-09-11', channel: 'WhatsApp / SMS', change: 'An upfront fee was demanded. Government scholarships never charge an activation fee — a classic advance-fee scam.', risk: 96 },
    ],
    suspiciousUrls: [
      { url: 'nsp-scholarship-apply[.]xyz', reason: 'Imitates NSP; not a gov.in domain' },
      { url: 'wa[.]me/91XXXXXXXXXX', reason: 'Registration through a personal WhatsApp number' },
    ],
    evidence: [
      { sourceId: 'nsp', date: '2026-09-01', summary: 'Official portal lists open schemes with income criteria; no universal ₹50,000 award and no activation fee.', stance: 'contradicts' },
      { sourceId: 'pib-factcheck', date: '2026-09-10', summary: 'Illustrative: advisory warning students against scholarship messages asking for payment.', stance: 'contradicts' },
      { sourceId: 'moe', date: '2026-08-28', summary: 'Scholarship schemes are notified through official channels only.', stance: 'context' },
    ],
  },
  {
    id: 'upi',
    title: 'UPI Cashback Scam',
    category: 'UPI and digital payment scams',
    verdict: 'FALSE — requesting a UPI PIN to receive money is fraud',
    stages: [
      { text: 'UPI users can receive cashback.', date: '2026-10-03', channel: 'Instagram ad', change: 'Baseline: cashback offers do exist from some apps and banks.', risk: 20 },
      { text: 'Enter your UPI PIN to receive cashback.', date: '2026-10-04', channel: 'SMS with collect request', change: 'A UPI PIN is only ever needed to SEND money or check balance. Entering it on a "collect" request debits your account.', risk: 97 },
    ],
    suspiciousUrls: [{ url: 'upi-cashback-reward[.]top', reason: 'Unofficial domain collecting PIN / collect approvals' }],
    evidence: [
      { sourceId: 'npci', date: '2026-07-15', summary: 'UPI safety guidance: you never need to enter your PIN to receive money.', stance: 'contradicts' },
      { sourceId: 'rbi', date: '2026-06-20', summary: 'Illustrative: RBI public-awareness messaging on never sharing PIN or OTP.', stance: 'contradicts' },
      { sourceId: 'cybercrime', date: '2026-10-05', summary: 'Report UPI fraud immediately on helpline 1930 or cybercrime.gov.in.', stance: 'context' },
    ],
  },
  {
    id: 'scheme',
    title: 'Fake Government Financial Assistance Scheme',
    category: 'Fake government schemes',
    verdict: 'FALSE — phishing for Aadhaar and bank details',
    stages: [
      { text: 'Government announces a new financial assistance scheme.', date: '2026-08-12', channel: 'YouTube video', change: 'Baseline: vague; no ministry, scheme name or notification number.', risk: 20 },
      { text: 'Every Indian citizen is eligible for ₹10,000.', date: '2026-08-14', channel: 'Telegram channel', change: 'Universal cash transfer added without any official notification.', risk: 55 },
      { text: 'Register using your Aadhaar and bank details through this unofficial website.', date: '2026-08-16', channel: 'WhatsApp forward', change: 'Collects Aadhaar + bank details on a non-government site — identity theft and account takeover risk.', risk: 95 },
    ],
    suspiciousUrls: [
      { url: 'pm-sahayata-yojana[.]online', reason: 'Not a gov.in / nic.in domain; asks for Aadhaar and bank details' },
      { url: 'bit[.]ly/sahayata-10k', reason: 'Shortened link hiding the real destination' },
    ],
    evidence: [
      { sourceId: 'pib-factcheck', date: '2026-08-17', summary: 'Illustrative: no such scheme has been announced by the Government of India.', stance: 'contradicts' },
      { sourceId: 'india-gov', date: '2026-08-15', summary: 'Scheme directory contains no matching universal ₹10,000 transfer.', stance: 'contradicts' },
      { sourceId: 'uidai', date: '2026-05-02', summary: 'Advises sharing Aadhaar only with trusted entities and using masked Aadhaar.', stance: 'context' },
    ],
  },
]

export type Announcement = {
  id: string
  title: string
  text: string
  channel: string
  link: string
  status: 'VERIFIED' | 'UNVERIFIED' | 'FALSE'
  officialSourceId: string
  officialNotification: string
  findings: { label: string; ok: boolean }[]
  incomeThreshold: number
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'official',
    title: 'Post-Matric Scholarship 2026-27 (demo notice)',
    text: 'Applications open on the National Scholarship Portal for students with annual family income below ₹2.5 lakh. Apply only at scholarships.gov.in before 31/12/2026.',
    channel: 'University notice board',
    link: 'scholarships.gov.in',
    status: 'VERIFIED',
    officialSourceId: 'nsp',
    officialNotification: 'Matches scheme listing on National Scholarship Portal (illustrative reference)',
    findings: [
      { label: 'Link points to an official gov.in domain', ok: true },
      { label: 'Income criteria match official scheme listing', ok: true },
      { label: 'No application or activation fee requested', ok: true },
      { label: 'No contradictory fact-check found', ok: true },
    ],
    incomeThreshold: 250000,
  },
  {
    id: 'modified',
    title: '“Every student gets ₹50,000” forward',
    text: 'Big news! Government scholarship: every college student will receive ₹50,000. Forward to all groups.',
    channel: 'Facebook / WhatsApp forward',
    link: 'No link provided',
    status: 'UNVERIFIED',
    officialSourceId: 'nsp',
    officialNotification: 'No matching official notification found',
    findings: [
      { label: 'No official source or notification number cited', ok: false },
      { label: 'Universal amount contradicts means-tested schemes', ok: false },
      { label: 'No fee requested (yet)', ok: true },
      { label: 'Mutation of an earlier legitimate announcement detected', ok: false },
    ],
    incomeThreshold: 250000,
  },
  {
    id: 'scam',
    title: '“Pay ₹499 to activate” WhatsApp message',
    text: 'Your ₹50,000 scholarship is approved! Pay ₹499 activation fee via UPI at nsp-scholarship-apply[.]xyz within 24 hours.',
    channel: 'WhatsApp / SMS',
    link: 'nsp-scholarship-apply[.]xyz',
    status: 'FALSE',
    officialSourceId: 'pib-factcheck',
    officialNotification: 'Contradicted by official guidance: scholarships never charge activation fees',
    findings: [
      { label: 'Lookalike domain — not gov.in', ok: false },
      { label: 'Upfront payment demanded', ok: false },
      { label: 'Artificial urgency (24 hours)', ok: false },
      { label: 'Matches known fraud pattern in TruthLens evolution tracker', ok: false },
    ],
    incomeThreshold: 250000,
  },
]

export function sourceById(id: string) {
  return TRUSTED_SOURCES.find((s) => s.id === id)
}
