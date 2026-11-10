'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, type LanguageCode } from './i18n-languages'

export { LANGUAGES, type LanguageCode }

type Dictionary = {
  dashboard: string
  privacy: string
  tagline: string
  demoNotice: string
  language: string
}

const DICTIONARY: Record<LanguageCode, Dictionary> = {
  en: {
    dashboard: 'Dashboard',
    privacy: 'Privacy & Consent',
    tagline: "Your Privacy. Your Truth. India's Digital Trust.",
    demoNotice: 'Independent demonstration platform — not an official Government of India service.',
    language: 'Language',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    privacy: 'निजता और सहमति',
    tagline: 'आपकी निजता। आपका सत्य। भारत का डिजिटल विश्वास।',
    demoNotice: 'स्वतंत्र प्रदर्शन मंच — यह भारत सरकार की आधिकारिक सेवा नहीं है।',
    language: 'भाषा',
  },
  or: {
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    privacy: 'ଗୋପନୀୟତା ଓ ସମ୍ମତି',
    tagline: 'ଆପଣଙ୍କ ଗୋପନୀୟତା। ଆପଣଙ୍କ ସତ୍ୟ। ଭାରତର ଡିଜିଟାଲ ବିଶ୍ୱାସ।',
    demoNotice: 'ସ୍ୱାଧୀନ ପ୍ରଦର୍ଶନ ମଞ୍ଚ — ଏହା ଭାରତ ସରକାରଙ୍କ ସରକାରୀ ସେବା ନୁହେଁ।',
    language: 'ଭାଷା',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    privacy: 'গোপনীয়তা ও সম্মতি',
    tagline: 'আপনার গোপনীয়তা। আপনার সত্য। ভারতের ডিজিটাল আস্থা।',
    demoNotice: 'স্বাধীন প্রদর্শনী প্ল্যাটফর্ম — এটি ভারত সরকারের কোনো সরকারি পরিষেবা নয়।',
    language: 'ভাষা',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    privacy: 'தனியுரிமை & ஒப்புதல்',
    tagline: 'உங்கள் தனியுரிமை. உங்கள் உண்மை. இந்தியாவின் டிஜிட்டல் நம்பிக்கை.',
    demoNotice: 'சுயாதீன செயல்விளக்க தளம் — இது இந்திய அரசின் அதிகாரப்பூர்வ சேவை அல்ல.',
    language: 'மொழி',
  },
  te: {
    dashboard: 'డ్యాష్‌బోర్డ్',
    privacy: 'గోప్యత & సమ్మతి',
    tagline: 'మీ గోప్యత. మీ సత్యం. భారతదేశ డిజిటల్ విశ్వాసం.',
    demoNotice: 'స్వతంత్ర ప్రదర్శన వేదిక — ఇది భారత ప్రభుత్వ అధికారిక సేవ కాదు.',
    language: 'భాష',
  },
  mr: {
    dashboard: 'डॅशबोर्ड',
    privacy: 'गोपनीयता आणि संमती',
    tagline: 'तुमची गोपनीयता. तुमचे सत्य. भारताचा डिजिटल विश्वास.',
    demoNotice: 'स्वतंत्र प्रात्यक्षिक व्यासपीठ — ही भारत सरकारची अधिकृत सेवा नाही.',
    language: 'भाषा',
  },
  gu: {
    dashboard: 'ડેશબોર્ડ',
    privacy: 'ગોપનીયતા અને સંમતિ',
    tagline: 'તમારી ગોપનીયતા. તમારું સત્ય. ભારતનો ડિજિટલ વિશ્વાસ.',
    demoNotice: 'સ્વતંત્ર નિદર્શન પ્લેટફોર્મ — આ ભારત સરકારની સત્તાવાર સેવા નથી.',
    language: 'ભાષા',
  },
  pa: {
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    privacy: 'ਨਿੱਜਤਾ ਅਤੇ ਸਹਿਮਤੀ',
    tagline: 'ਤੁਹਾਡੀ ਨਿੱਜਤਾ। ਤੁਹਾਡਾ ਸੱਚ। ਭਾਰਤ ਦਾ ਡਿਜੀਟਲ ਭਰੋਸਾ।',
    demoNotice: 'ਸੁਤੰਤਰ ਪ੍ਰਦਰਸ਼ਨ ਪਲੇਟਫਾਰਮ — ਇਹ ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਅਧਿਕਾਰਤ ਸੇਵਾ ਨਹੀਂ ਹੈ।',
    language: 'ਭਾਸ਼ਾ',
  },
  ml: {
    dashboard: 'ഡാഷ്ബോർഡ്',
    privacy: 'സ്വകാര്യതയും സമ്മതവും',
    tagline: 'നിങ്ങളുടെ സ്വകാര്യത. നിങ്ങളുടെ സത്യം. ഇന്ത്യയുടെ ഡിജിറ്റൽ വിശ്വാസം.',
    demoNotice: 'സ്വതന്ത്ര പ്രദർശന പ്ലാറ്റ്ഫോം — ഇത് ഭാരത സർക്കാരിന്റെ ഔദ്യോഗിക സേവനമല്ല.',
    language: 'ഭാഷ',
  },
  kn: {
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    privacy: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಸಮ್ಮತಿ',
    tagline: 'ನಿಮ್ಮ ಗೌಪ್ಯತೆ. ನಿಮ್ಮ ಸತ್ಯ. ಭಾರತದ ಡಿಜಿಟಲ್ ನಂಬಿಕೆ.',
    demoNotice: 'ಸ್ವತಂತ್ರ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ವೇದಿಕೆ — ಇದು ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಸೇವೆಯಲ್ಲ.',
    language: 'ಭಾಷೆ',
  },
}

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: keyof Dictionary) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'veritrust-language'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    if (saved && saved in DICTIONARY) setLanguageState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
    window.localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const value = useMemo(
    () => ({ language, setLanguage, t: (key: keyof Dictionary) => DICTIONARY[language][key] }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function languageLabel(code: string) {
  return LANGUAGES.find((l) => l.code === code)?.label ?? code
}
