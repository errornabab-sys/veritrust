import { generateText, Output } from 'ai'
import { z } from 'zod'
import { MISINFO_CATEGORIES, TRUSTED_SOURCES } from '@/lib/data'
import { LANGUAGES } from '@/lib/i18n-languages'

export const maxDuration = 60

const requestSchema = z.object({
  claim: z.string().trim().min(8, 'Please enter a longer claim').max(2000),
  uiLanguage: z.enum(LANGUAGES.map((l) => l.code) as [string, ...string[]]).default('en'),
})

const sourceIds = TRUSTED_SOURCES.map((s) => s.id) as [string, ...string[]]
const categoryLabels = MISINFO_CATEGORIES.map((c) => c.label) as [string, ...string[]]

const analysisSchema = z.object({
  detectedLanguage: z.string().describe('English name of the language the claim was written in, e.g. "Hindi"'),
  englishTranslation: z.string().describe('Faithful English translation of the claim (or the claim itself if already English)'),
  verdict: z.enum(['FALSE', 'MISLEADING', 'UNVERIFIED', 'LIKELY TRUE']),
  confidence: z.number().min(0).max(100),
  category: z.enum([...categoryLabels, 'Other']),
  redFlags: z.array(z.object({ flag: z.string(), explanation: z.string() })).max(6),
  suspiciousUrls: z.array(z.object({ url: z.string(), reason: z.string() })).max(5),
  sourcesToCheck: z
    .array(
      z.object({
        sourceId: z.enum(sourceIds),
        whatToCheck: z.string(),
        expectedStance: z.enum(['likely contradicts', 'likely supports', 'unknown']),
      }),
    )
    .min(1)
    .max(5),
  explanationEnglish: z.string(),
  explanationLocalized: z.string().describe('The same explanation written in the requested UI language'),
  safetyAdvice: z.array(z.string()).max(4),
})

export type TruthLensAnalysis = z.infer<typeof analysisSchema>

export async function POST(req: Request) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, { status: 400 })
  }
  const { claim, uiLanguage } = parsed.data
  const uiLanguageName = LANGUAGES.find((l) => l.code === uiLanguage)?.label ?? 'English'

  const sourceList = TRUSTED_SOURCES.map((s) => `- ${s.id}: ${s.name} (${s.url}) — ${s.kind}; ${s.covers}`).join('\n')

  try {
    const { output } = await generateText({
      model: 'google/gemini-3.8-flash',
      output: Output.object({ schema: analysisSchema }),
      system: `You are TruthLens, a misinformation analyst for Indian citizens.
You do NOT have live internet access. Never invent articles, publication dates, notification numbers or URLs on official sites.
Assess the claim using well-known patterns of Indian misinformation and fraud (fake schemes, PM-KISAN lookalike sites, fake scholarships, UPI PIN/collect-request scams, fake RBI notices, fake job/exam notices, election rumours, health hoaxes, deepfakes, communal rumours, fake disaster alerts).
Key facts: a UPI PIN is never needed to receive money; government schemes never charge activation fees; official sites use gov.in or nic.in domains; Aadhaar OTPs should never be shared.
Choose sourcesToCheck only from this curated list and explain what the user should look for there. Do not assume a source is trustworthy for topics outside its remit:
${sourceList}
Only list suspiciousUrls that actually appear in the claim, written in defanged form (replace "." with "[.]").
Use "UNVERIFIED" when you cannot assess the claim without live evidence. Be calm and non-partisan; never amplify communal content.
Write explanationLocalized in ${uiLanguageName}.`,
      prompt: `Claim submitted by a user:\n"""${claim}"""`,
    })
    return Response.json(output)
  } catch (error) {
    console.error('[v0] TruthLens analysis failed:', error)
    return Response.json({ error: 'Analysis is temporarily unavailable. Please try again.' }, { status: 502 })
  }
}
