import { ExternalLink } from 'lucide-react'
import { TRUSTED_SOURCES, type TrustedSource } from '@/lib/data'

const KINDS: TrustedSource['kind'][] = ['Official – Government', 'Official – Regulator', 'Independent fact-checker', 'News organisation']

const CHECKS = [
  'Who actually published it — the original ministry, regulator or a third party?',
  'Is there an original document (notification, circular, press release) and does it match?',
  'Is the source speaking within its remit (e.g. RBI on banking, ECI on elections)?',
  'When was it published, and has it been superseded or withdrawn?',
  'Is a screenshot or forward being passed off as the official page?',
]

export function TrustedSources() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="grid gap-4 sm:grid-cols-2">
        {KINDS.map((kind) => (
          <div key={kind} className="rounded-xl border bg-card p-4">
            <p className="mb-2 text-xs font-semibold text-saffron-strong uppercase">{kind}</p>
            <ul className="flex flex-col gap-2">
              {TRUSTED_SOURCES.filter((s) => s.kind === kind).map((s) => (
                <li key={s.id} className="text-sm">
                  <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-navy hover:underline">
                    {s.name} <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                  <p className="text-xs text-muted-foreground">{s.covers}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded-xl border border-navy/20 bg-secondary p-5">
        <p className="font-semibold text-navy">Sources are evaluated, not assumed</p>
        <p className="mt-1 text-sm text-pretty text-muted-foreground">
          A familiar name does not automatically make a claim true. For every piece of evidence TruthLens asks:
        </p>
        <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-sm">
          {CHECKS.map((c) => (
            <li key={c} className="text-pretty">
              {c}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  )
}
