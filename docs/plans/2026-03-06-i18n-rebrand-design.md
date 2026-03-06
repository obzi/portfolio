# Design: RapidLocalSites Rebrand + CZ/EN Localization

**Date:** 2026-03-06
**Status:** Approved

---

## Overview

Rebrand the portfolio website from a personal ("Tomáš Obzina") identity to the **RapidLocalSites** brand, and add full Czech/English localization with geolocation-based language detection.

---

## 1. Brand Changes

- Replace all occurrences of "Tomáš Obzina" with generic first-person language or the brand name **RapidLocalSites**
- Logo/wordmark in Navbar: `RapidLocalSites` (Playfair Display, gold gradient)
- Footer copyright: `© 2026 RapidLocalSites`
- `index.html` title: `RapidLocalSites — Modern Web Development`
- Meta description updated for the brand

---

## 2. Locale Architecture

### Files

```
src/
  locales/
    cs.ts      — Czech text + CZK prices
    en.ts      — English text + EUR prices
  context/
    LanguageContext.tsx  — Context, hook, geo detection
```

### Locale Shape

Each locale file exports a flat `translations` object typed with a shared `Translations` interface:

```ts
export interface Translations {
  nav: { home, about, services, pricing, contact, cta }
  home: { badge, title, subtitle, stat1, stat2, stat3, cta1, cta2, ... }
  about: { label, title, subtitle, bio1, bio2, stat1, stat2, stat3, techLabel, timelineLabel, ... }
  services: { label, title, subtitle, cta, cards: [...] }
  pricing: { label, title, subtitle, cards: [...], currency }
  contact: { label, title, subtitle, ... }
  footer: { copyright, nav: [...] }
  common: { readMore, send, sending, success, error, ... }
}
```

No external i18n library — zero extra dependencies, full TypeScript type safety.

### Pricing by Language

| Package | Czech (CZK) | English (EUR) |
|---------|-------------|---------------|
| Starter | 15 000–30 000 Kč | €600–€1 200 |
| Pro | 30 000–70 000 Kč | €1 200–€2 800 |
| Enterprise | od 70 000 Kč | from €2 800 |

---

## 3. Language Detection Logic

Priority order (highest wins):

1. **localStorage** key `rls-lang` (`'cs'` or `'en'`) — manual user override, persists indefinitely
2. **Geolocation** via `ip-api.com/json` — `countryCode === 'CZ'` → Czech, all others → English; result cached in `sessionStorage` key `rls-geo` to avoid repeat API calls
3. **Fallback** → English

### Flow

```
localStorage['rls-lang'] exists? → use it
  ↓ no
sessionStorage['rls-geo'] exists? → use cached geo result
  ↓ no
fetch ip-api.com/json → save to sessionStorage → use result
  ↓ fetch error
fallback to 'en'
```

---

## 4. Language Context

```tsx
// src/context/LanguageContext.tsx

type Lang = 'cs' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations         // active locale object
}

export const LanguageContext = createContext<LanguageContextValue>(...)
export function LanguageProvider({ children })  // wraps App
export function useLanguage(): LanguageContextValue  // consumer hook
```

`LanguageProvider` runs geo detection on mount. While detecting, renders children with the fallback (`'en'`) — no loading screen needed since geo resolves quickly (<200 ms typical).

---

## 5. Navbar Language Switcher

Position: right side, before/after the "Contact" CTA button.

```
[Domů] [O nás] [Služby] [Ceník] [Kontakt]  [Kontaktujte nás]  CZ | EN
```

- `CZ` and `EN` are text buttons separated by `|`
- Active language: gold (`text-gold`), semi-bold
- Inactive: muted (`text-white/40`), regular weight
- Clicking inactive language calls `setLang()` → saves to `localStorage['rls-lang']`
- On mobile: language switcher appears at bottom of the mobile menu

---

## 6. Pages to Update

| Page | Changes |
|------|---------|
| `Home` | Replace "Tomáš Obzina" hero title with `t.home.title`; translate all copy; typing animation roles from `t.home.roles[]` |
| `About` | Remove name from section header; translate bio, tech labels, timeline entries |
| `Services` | Translate all service cards, CTA |
| `Pricing` | Translate package names, features; use `t.pricing.currency` for price display |
| `Contact` | Translate labels, form fields, availability text |
| `Navbar` | Translate nav links, CTA button; add lang switcher |
| `Footer` | Translate nav links, copyright |
| `ContactForm` | Translate field labels, placeholders, button, status messages |

---

## 7. index.html Metadata

```html
<title>RapidLocalSites — Moderní webový vývoj</title>
<meta name="description" content="Profesionální tvorba webových aplikací na míru. React, Node.js, full-stack řešení pro váš byznys." />
```

(Static CZ default — acceptable for SEO; dynamic meta via React Helmet is out of scope.)

---

## 8. Out of Scope

- URL-based locale (`/cs/`, `/en/`) — overkill for single-person site
- SEO `hreflang` tags — out of scope for MVP
- RTL language support
- More than 2 languages
