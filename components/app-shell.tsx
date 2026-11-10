'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Info, Languages, Menu, ShieldCheck, X } from 'lucide-react'
import { LANGUAGES, useLanguage, type LanguageCode } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav = [
    { href: '/', label: t('dashboard') },
    { href: '/private-verify', label: 'PrivateVerify' },
    { href: '/truthlens', label: 'TruthLens' },
    { href: '/trustbridge', label: 'TrustBridge' },
    { href: '/privacy', label: t('privacy') },
  ]

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="tricolor-bar h-1 w-full" aria-hidden="true" />
      <div className="bg-navy text-primary-foreground">
        <p className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-1.5 text-xs text-white/80 md:px-6">
          <Info className="size-3.5 shrink-0 text-saffron" aria-hidden="true" />
          {t('demoNotice')}
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="VERITRUST INDIA home">
            <span className="tricolor-glow flex size-9 items-center justify-center rounded-lg text-white">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-navy">
                VERITRUST <span className="text-saffron-strong">INDIA</span>
              </span>
              <span className="mt-1 hidden text-[11px] text-muted-foreground sm:block">{t('tagline')}</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink key={item.href} {...item} active={isActive(pathname, item.href)} />
            ))}
          </nav>

          <label className="ml-auto flex items-center gap-1.5 lg:ml-2">
            <Languages className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">{t('language')}</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="h-8 rounded-md border bg-card px-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native}
                  {l.code !== 'en' ? ` · ${l.label}` : ''}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col gap-1 border-t px-4 py-3 lg:hidden">
            {nav.map((item) => (
              <NavLink key={item.href} {...item} active={isActive(pathname, item.href)} onClick={() => setOpen(false)} />
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-muted-foreground md:grid-cols-3 md:px-6">
          <div>
            <p className="font-semibold text-navy">VERITRUST INDIA</p>
            <p className="mt-1 text-pretty">
              An India-first digital trust ecosystem combining privacy-preserving eligibility verification, AI-powered fact
              checking and misinformation intelligence.
            </p>
          </div>
          <p className="text-pretty">
            Independent demonstration platform. Not affiliated with, endorsed by, or an authorised verification provider for
            UIDAI, DigiLocker, the Income Tax Department, NSP, or any Government of India or State Government body. All
            credentials, statistics and cases are illustrative.
          </p>
          <p className="text-pretty">
            Report cyber fraud: call <span className="font-semibold text-foreground">1930</span> or visit{' '}
            <a className="font-medium text-navy underline underline-offset-2" href="https://cybercrime.gov.in" target="_blank" rel="noreferrer">
              cybercrime.gov.in
            </a>
            . All times shown in IST (UTC+05:30).
          </p>
        </div>
        <div className="tricolor-bar h-1 w-full" aria-hidden="true" />
      </footer>
    </div>
  )
}

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

function NavLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-md px-3 py-2 text-sm font-medium transition-colors',
        active ? 'bg-secondary text-navy' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      {label}
    </Link>
  )
}
