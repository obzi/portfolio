import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { cs } from '@/locales/cs'
import { en } from '@/locales/en'
import type { Translations } from '@/locales/types'

export type Lang = 'cs' | 'en'

const STORAGE_KEY = 'rls-lang'
const GEO_CACHE_KEY = 'rls-geo'

function getStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'cs' || v === 'en') return v
  } catch {
    /* ignore – localStorage may be blocked */
  }
  return null
}

function getCachedGeo(): Lang | null {
  try {
    const v = sessionStorage.getItem(GEO_CACHE_KEY)
    if (v === 'cs' || v === 'en') return v
  } catch {
    /* ignore */
  }
  return null
}

async function detectLang(): Promise<Lang> {
  const stored = getStoredLang()
  if (stored) return stored

  const cached = getCachedGeo()
  if (cached) return cached

  try {
    const res = await fetch('https://ip-api.com/json?fields=countryCode')
    const data = await res.json()
    const lang: Lang = data.countryCode === 'CZ' ? 'cs' : 'en'
    try {
      sessionStorage.setItem(GEO_CACHE_KEY, lang)
    } catch {
      /* ignore */
    }
    return lang
  } catch {
    return 'en'
  }
}

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    detectLang().then(setLangState)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  const t = lang === 'cs' ? cs : en

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
