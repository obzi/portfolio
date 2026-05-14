# Portfolio — Claude Code pravidla

## Repozitář
- **GitHub repo:** `obzi/portfolio`
- **Web:** https://rapidlocalsites.eu (custom domain)

## Větve (branches)
Repozitář má právě **dvě větve**:

| Větev | Účel |
|-------|------|
| `claude/<popis>-<sessionID>` | Zdrojový kód (aktuální session) |
| `gh-pages` | Produkční build — GitHub Pages |

> Větve `main` a jiné `claude/*` z minulých sezení se mažou.

## Deploy
**Deploy je plně automatický přes GitHub Actions.**

Po každém `git push` do libovolné větve `claude/**`:
1. GitHub Actions spustí workflow `.github/workflows/deploy.yml`
2. Projekt se buildne (`npm run build`)
3. Složka `dist/` se automaticky pushne do větve `gh-pages`
4. Web je živý na https://rapidlocalsites.eu

**Nepoužívej ruční deploy skripty.** Stačí pushnout do session větve.

## Vývoj

```bash
npm run dev      # lokální dev server (port 5173)
npm run build    # produkční build do dist/
npm run lint     # ESLint kontrola
```

## Stack
- React 19 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion
- EmailJS (kontaktní formulář)
- React Router v7

## Push omezení
Session větve musí mít formát `claude/<popis>-<sessionID>`.
Push do `main` nebo `gh-pages` není ze session povolen — deploy řeší GitHub Actions.
