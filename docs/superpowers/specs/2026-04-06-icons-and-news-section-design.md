# Design Spec: Icon Replacement & News Section

**Date:** 2026-04-06  
**Status:** Approved

---

## 1. Icon Replacement

### Problem
The landing page uses emoji characters (`🔒`, `⚠️`, `📊`, `⚖️`, `📈`, `✅`) in `ProfilesSection` and `ContactFormSection`. These render inconsistently across platforms and lack the polished look of a professional B2B landing page.

### Solution
Install `lucide-react` and replace all emoji with Lucide icon components.

### Changes

**`package.json`**
- Add `lucide-react` as a dependency.

**`src/lib/config.ts`**
- Change `icon` field in `PROFILES` from an emoji `string` to a `React.ComponentType<LucideProps>` reference.
- Mapping:
  - `🔒` → `Lock`
  - `⚠️` → `AlertTriangle`
  - `📊` → `BarChart3`
  - `⚖️` → `Scale`
  - `📈` → `TrendingUp`

**`src/components/sections/ProfilesSection.tsx`**
- Render `<profile.icon size={24} className="text-vinho mb-3" />` instead of `<span>{profile.icon}</span>`.

**`src/components/sections/ContactFormSection.tsx`**
- Replace `<p className="text-2xl mb-2">✅</p>` with `<CheckCircle2 size={32} className="text-green-600 mx-auto mb-2" />`.

---

## 2. News Section

### Purpose
Surface a relevant external article that reinforces MSD's authority and educates prospects on their legal rights — placed early in the page to build credibility immediately after the Hero.

### Placement
Between `<Hero />` and `<SocialProofBar />` in `src/app/page.tsx`.

### Article Source
- **Title:** Bloqueio administrativo no programa Farmácia Popular: ilegalidade por omissão e direito à conclusão célere do procedimento de auditoria
- **Author:** Flávio Mendes Benincasa
- **Date:** 27 de março de 2025
- **URL:** https://besan.com.br/bloqueio-administrativo-no-programa-farmacia-popular-ilegalidade-por-omissao-e-direito-a-conclusao-celere-do-procedimento-de-auditoria/

### Component: `src/components/sections/NewsSection.tsx`

**Layout:**
- Background: `bg-gray-50`, padding `py-24`
- `EyebrowLabel` text: `"Na mídia"`
- Section heading: `"Fique por dentro do que está acontecendo"`

**Featured card:**
- Follows existing border + shadow pattern (`border border-border rounded-lg p-6 border-l-4 border-l-vinho bg-white shadow-sm`)
- `Newspaper` Lucide icon (accent, `text-vinho`, `size={20}`) inline with article source label
- Article title in large serif bold
- 2-line excerpt: "Bloqueios administrativos sem conclusão do processo de auditoria constituem omissão ilegal, violando o direito constitucional à duração razoável do processo e o princípio da eficiência administrativa."
- Author + date in small muted text
- External link button: `"Leia o artigo completo"` with `ExternalLink` icon, opens in new tab

---

## Out of Scope
- No image/thumbnail (no suitable asset available)
- No multi-article grid (single featured article only)
- No CMS or dynamic data fetching — article data hardcoded in the component
