import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
  children?: React.ReactNode
}) {
  return (
    <section className="tricolor-glow text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <p className="text-xs font-semibold tracking-widest text-saffron uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-pretty text-white/80 md:text-lg">{description}</p>
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn('mb-5', className)}>
      <h2 className="text-xl font-semibold tracking-tight text-navy text-balance">{title}</h2>
      {description && <p className="mt-1 max-w-3xl text-sm text-pretty text-muted-foreground">{description}</p>}
    </div>
  )
}

export function DemoTag({ children = 'Demo data' }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-saffron/50 bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
      {children}
    </span>
  )
}

type Status = 'VERIFIED' | 'NOT MET' | 'UNVERIFIED' | 'FALSE' | 'MISLEADING' | 'LIKELY TRUE' | 'SAFE TO PROCEED' | 'CAUTION' | 'HIGH RISK' | 'NONE'

export function StatusPill({ status, className }: { status: Status | string; className?: string }) {
  const tone =
    status === 'VERIFIED' || status === 'SAFE TO PROCEED' || status === 'LIKELY TRUE' || status === 'NONE'
      ? 'bg-india-green/10 text-india-green border-india-green/30'
      : status === 'FALSE' || status === 'HIGH RISK' || status === 'NOT MET'
        ? 'bg-destructive/10 text-destructive border-destructive/30'
        : 'bg-accent text-accent-foreground border-saffron/40'
  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold', tone, className)}>
      {status}
    </span>
  )
}
