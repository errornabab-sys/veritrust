'use client'

import { useState } from 'react'
import { AlertTriangle, ExternalLink, Languages, Link2Off, Loader2, ScanSearch, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StatusPill } from '@/components/page-header'
import { sourceById } from '@/lib/data'
import { formatDateTimeIN } from '@/lib/format'
import { languageLabel, useLanguage } from '@/lib/i18n'
import type { TruthLensAnalysis } from '@/app/api/truthlens/route'

const SAMPLES = [
  { lang: 'Hindi', text: 'प्रधानमंत्री योजना के तहत हर नागरिक को ₹10,000 मिलेंगे। इस लिंक पर आधार और बैंक विवरण दर्ज करें: pm-sahayata-yojana.online' },
  { lang: 'Odia', text: 'ସମସ୍ତ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ₹50,000 ବୃତ୍ତି ମିଳିବ, ସକ୍ରିୟ କରିବା ପାଇଁ ₹499 ଦିଅନ୍ତୁ।' },
  { lang: 'English', text: 'Congratulations! You won ₹5,000 cashback. Enter your UPI PIN to receive it now.' },
  { lang: 'Tamil', text: 'ரிசர்வ் வங்கி அறிவிப்பு: நாளை முதல் ₹500 நோட்டுகள் செல்லாது.' },
  { lang: 'Bengali', text: 'নির্বাচন কমিশন জানিয়েছে, এবার হোয়াটসঅ্যাপের মাধ্যমে ভোট দেওয়া যাবে।' },
]

type Result = TruthLensAnalysis & { checkedAt: string; original: string }

export function ClaimChecker() {
  const { language } = useLanguage()
  const [claim, setClaim] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function analyse(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/truthlens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim, uiLanguage: language }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Analysis failed')
      setResult({ ...data, checkedAt: new Date().toISOString(), original: claim })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <form onSubmit={analyse} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
        <label htmlFor="claim" className="text-sm font-semibold text-navy">
          Paste a claim, forward or message
        </label>
        <Textarea
          id="claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          rows={6}
          placeholder="Any of 11 Indian languages — English, हिन्दी, ଓଡ଼ିଆ, বাংলা, தமிழ், తెలుగు, मराठी, ગુજરાતી, ਪੰਜਾਬੀ, മലയാളം, ಕನ್ನಡ"
          className="resize-none"
        />
        <div>
          <p className="mb-1.5 text-xs text-muted-foreground">Try an illustrative sample:</p>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLES.map((s) => (
              <button
                key={s.lang}
                type="button"
                onClick={() => setClaim(s.text)}
                className="rounded-full border px-2.5 py-1 text-xs font-medium hover:bg-muted"
              >
                {s.lang}
              </button>
            ))}
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Languages className="size-3.5" aria-hidden="true" />
          Explanation language: <span className="font-medium text-foreground">{languageLabel(language)}</span> (change in header)
        </p>
        <Button type="submit" disabled={loading || claim.trim().length < 8} className="h-10">
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ScanSearch className="size-4" aria-hidden="true" />}
          {loading ? 'Analysing claim…' : 'Analyse with TruthLens'}
        </Button>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <p className="text-[11px] text-pretty text-muted-foreground">
          AI-assisted analysis without live web access. TruthLens points you to the official source to confirm — it does not
          fetch or quote documents in real time.
        </p>
      </form>

      <div aria-live="polite">{result ? <AnalysisResult result={result} /> : <EmptyState />}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
      <ScanSearch className="size-6 text-muted-foreground" aria-hidden="true" />
      <p className="mt-2 font-medium text-navy">Awaiting a claim</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        You will see the original text, detected language, English translation, verdict, red flags and which official
        sources to check.
      </p>
    </div>
  )
}

function AnalysisResult({ result }: { result: Result }) {
  return (
    <article className="flex flex-col rounded-xl border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <div className="flex items-center gap-3">
          <StatusPill status={result.verdict} className="text-sm" />
          <span className="text-sm text-muted-foreground">
            Confidence <span className="font-mono font-semibold text-foreground">{Math.round(result.confidence)}%</span>
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{formatDateTimeIN(result.checkedAt)}</span>
      </header>

      <dl className="grid gap-4 p-4 text-sm md:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">Original submitted claim</dt>
          <dd className="mt-0.5 text-pretty">{result.original}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">English translation · Detected: {result.detectedLanguage}</dt>
          <dd className="mt-0.5 text-pretty">{result.englishTranslation}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Category</dt>
          <dd className="mt-0.5 font-medium">{result.category}</dd>
        </div>
      </dl>

      <div className="grid gap-4 border-t p-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-navy uppercase">Explanation</p>
          <p className="mt-1 text-sm text-pretty">{result.explanationLocalized}</p>
          {result.explanationLocalized !== result.explanationEnglish && (
            <details className="mt-2 text-sm text-muted-foreground">
              <summary className="cursor-pointer text-xs">Show English explanation</summary>
              <p className="mt-1 text-pretty">{result.explanationEnglish}</p>
            </details>
          )}
        </div>
        {result.redFlags.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-destructive uppercase">Red flags</p>
            <ul className="mt-1 flex flex-col gap-1.5 text-sm">
              {result.redFlags.map((f) => (
                <li key={f.flag} className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-saffron-strong" aria-hidden="true" />
                  <span>
                    <span className="font-medium">{f.flag}:</span> {f.explanation}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {result.suspiciousUrls.length > 0 && (
        <div className="border-t p-4">
          <p className="text-xs font-semibold text-destructive uppercase">Suspicious links</p>
          <ul className="mt-1 flex flex-col gap-1 text-sm">
            {result.suspiciousUrls.map((u) => (
              <li key={u.url} className="flex items-start gap-1.5">
                <Link2Off className="mt-0.5 size-3.5 shrink-0 text-destructive" aria-hidden="true" />
                <span>
                  <code className="rounded bg-muted px-1 font-mono text-xs">{u.url}</code> — {u.reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t p-4">
        <p className="text-xs font-semibold text-navy uppercase">Evidence sources to confirm</p>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {result.sourcesToCheck.map((s) => {
            const src = sourceById(s.sourceId)
            if (!src) return null
            return (
              <li key={s.sourceId} className="rounded-lg border p-3 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <a href={src.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-navy underline-offset-2 hover:underline">
                    {src.name} <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{s.expectedStance}</span>
                </div>
                <p className="text-xs text-muted-foreground">{src.url.replace('https://', '')} · {src.kind}</p>
                <p className="mt-1 text-pretty">{s.whatToCheck}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Publication date: not retrieved live — confirm on source</p>
              </li>
            )
          })}
        </ul>
      </div>

      {result.safetyAdvice.length > 0 && (
        <div className="flex items-start gap-2 rounded-b-xl border-t bg-india-green/5 p-4 text-sm">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-india-green" aria-hidden="true" />
          <ul className="flex flex-col gap-0.5">
            {result.safetyAdvice.map((a) => (
              <li key={a}>{a}</li>
            ))}
            <li>Report fraud on 1930 or cybercrime.gov.in.</li>
          </ul>
        </div>
      )}
    </article>
  )
}
