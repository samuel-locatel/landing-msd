# Icons & News Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace emoji icons with Lucide React components throughout the landing page and add a featured news section between Hero and SocialProofBar.

**Architecture:** Install `lucide-react`, update `config.ts` to hold icon component references instead of emoji strings, update the two components that render those icons, create a new `NewsSection` component, and wire it into `page.tsx`.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS 4, lucide-react

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `package.json` | Modify | Add `lucide-react` dependency |
| `src/lib/config.ts` | Modify | Change `PROFILES[].icon` from `string` to `LucideIcon` component reference |
| `src/components/sections/ProfilesSection.tsx` | Modify | Render `<profile.icon />` instead of emoji `<span>` |
| `src/components/sections/ContactFormSection.tsx` | Modify | Replace ✅ emoji with `<CheckCircle2 />` |
| `src/components/sections/NewsSection.tsx` | Create | Featured article card with metadata and external link |
| `src/app/page.tsx` | Modify | Import and place `<NewsSection />` between Hero and SocialProofBar |

---

### Task 1: Install lucide-react

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install lucide-react
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Verify TypeScript can find the types**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors related to `lucide-react` (there may be pre-existing errors — ignore those, note only new ones).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install lucide-react"
```

---

### Task 2: Update config.ts — replace emoji strings with Lucide icon references

**Files:**
- Modify: `src/lib/config.ts`

- [ ] **Step 1: Update the import and PROFILES type**

Replace the top of `src/lib/config.ts` with the following. Add the import at line 1 and update `PROFILES`:

```ts
import { Lock, AlertTriangle, BarChart3, Scale, TrendingUp, type LucideIcon } from 'lucide-react'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5581991644050'

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Vim pelo site da MSD Assessoria e gostaria de conversar sobre minha situação no Farmácia Popular.'
)

export const whatsappUrl = (custom?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${custom ?? WHATSAPP_MESSAGE}`

export const STATS = [
  { value: '20', label: 'Anos de atuação' },
  { value: '1.000+', label: 'Farmácias atendidas' },
  { value: '20', label: 'Estados' },
  { value: '500', label: 'Cidades' },
] as const

export type Profile = {
  icon: LucideIcon
  title: string
  desc: string
  full: boolean
}

export const PROFILES: Profile[] = [
  {
    icon: Lock,
    title: 'Farmácia já bloqueada',
    desc: 'O bloqueio chegou, o faturamento parou. Você sabe que não pode esperar — e precisa de quem já viu isso antes.',
    full: false,
  },
  {
    icon: AlertTriangle,
    title: 'Irregularidades identificadas',
    desc: 'O farmacêutico ou balconista percebeu algo errado na operação. Melhor agir antes de virar auditoria.',
    full: false,
  },
  {
    icon: BarChart3,
    title: 'Contador ou assessor preocupado',
    desc: 'Divergências entre compras e vendas, faturamento alto sem controle rigoroso. É hora de um diagnóstico especializado.',
    full: false,
  },
  {
    icon: Scale,
    title: 'Advogado precisando de suporte técnico',
    desc: 'Processos na CGU, TCU ou esfera criminal exigem mais do que conhecimento jurídico. Somos o suporte técnico especializado.',
    full: false,
  },
  {
    icon: TrendingUp,
    title: 'Empresário que quer crescer com segurança',
    desc: 'Redes com múltiplos CNPJs sabem que escala significa maior exposição. Monitoramento preventivo para todas as unidades.',
    full: true,
  },
]
```

Keep the rest of the file (`COSTS`, `STEPS`, `OBJECTIONS`) unchanged.

- [ ] **Step 2: Verify types pass**

```bash
npx tsc --noEmit 2>&1 | grep -v "node_modules"
```

Expected: errors only on files that use `profile.icon` as a string (they'll be fixed in Task 3). No errors in `config.ts` itself.

- [ ] **Step 3: Commit**

```bash
git add src/lib/config.ts
git commit -m "feat: replace emoji strings with lucide-react icon refs in config"
```

---

### Task 3: Update ProfilesSection to render Lucide icon components

**Files:**
- Modify: `src/components/sections/ProfilesSection.tsx`

- [ ] **Step 1: Update the component**

Replace the full content of `src/components/sections/ProfilesSection.tsx`:

```tsx
import { PROFILES } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function ProfilesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel>Reconhece sua situação?</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Atendemos farmácias em diferentes momentos de risco
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Cada caso é único — mas o caminho começa pelo mesmo lugar: entender o tamanho real do problema.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILES.map((profile) => {
            const Icon = profile.icon
            return (
              <div
                key={profile.title}
                className={`border border-border rounded-lg p-6 border-l-4 border-l-vinho bg-white shadow-sm hover:shadow-md transition-shadow ${
                  profile.full ? 'sm:col-span-2' : ''
                }`}
              >
                <Icon size={24} className="text-vinho mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{profile.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{profile.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types pass**

```bash
npx tsc --noEmit 2>&1 | grep -v "node_modules"
```

Expected: no errors in `ProfilesSection.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProfilesSection.tsx
git commit -m "feat: render lucide icons in ProfilesSection"
```

---

### Task 4: Update ContactFormSection — replace ✅ emoji with CheckCircle2

**Files:**
- Modify: `src/components/sections/ContactFormSection.tsx`

- [ ] **Step 1: Add the import**

At the top of `src/components/sections/ContactFormSection.tsx`, add to the existing imports:

```tsx
import { CheckCircle2 } from 'lucide-react'
```

- [ ] **Step 2: Replace the emoji**

Find this line (around line 82):

```tsx
<p className="text-2xl mb-2">✅</p>
```

Replace with:

```tsx
<CheckCircle2 size={32} className="text-green-600 mx-auto mb-2" />
```

- [ ] **Step 3: Verify types pass**

```bash
npx tsc --noEmit 2>&1 | grep -v "node_modules"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ContactFormSection.tsx
git commit -m "feat: replace success emoji with CheckCircle2 icon in ContactFormSection"
```

---

### Task 5: Create NewsSection component

**Files:**
- Create: `src/components/sections/NewsSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Newspaper, ExternalLink } from 'lucide-react'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

const ARTICLE = {
  title:
    'Bloqueio administrativo no programa Farmácia Popular: ilegalidade por omissão e direito à conclusão célere do procedimento de auditoria',
  excerpt:
    'Bloqueios administrativos sem conclusão do processo de auditoria constituem omissão ilegal, violando o direito constitucional à duração razoável do processo e o princípio da eficiência administrativa.',
  author: 'Flávio Mendes Benincasa',
  date: '27 de março de 2025',
  source: 'BESAN',
  url: 'https://besan.com.br/bloqueio-administrativo-no-programa-farmacia-popular-ilegalidade-por-omissao-e-direito-a-conclusao-celere-do-procedimento-de-auditoria/',
}

export function NewsSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel>Na mídia</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Fique por dentro do que está acontecendo
          </h2>
        </div>

        <div className="border border-border rounded-lg p-8 border-l-4 border-l-vinho bg-white shadow-sm">
          <div className="flex items-center gap-2 text-vinho mb-4">
            <Newspaper size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">{ARTICLE.source}</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-gray-900 leading-snug mb-4">
            {ARTICLE.title}
          </h3>

          <p className="text-muted leading-relaxed mb-6">{ARTICLE.excerpt}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-muted">
              {ARTICLE.author} &middot; {ARTICLE.date}
            </p>
            <a
              href={ARTICLE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-vinho hover:underline"
            >
              Leia o artigo completo
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types pass**

```bash
npx tsc --noEmit 2>&1 | grep -v "node_modules"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/NewsSection.tsx
git commit -m "feat: add NewsSection with featured article card"
```

---

### Task 6: Wire NewsSection into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add import and place component**

Replace the full content of `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { NewsSection } from "@/components/sections/NewsSection";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { ProfilesSection } from "@/components/sections/ProfilesSection";
import { InlineCta } from "@/components/sections/InlineCta";
import { CostOfInactionSection } from "@/components/sections/CostOfInactionSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { ObjectionsSection } from "@/components/sections/ObjectionsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <NewsSection />
      <SocialProofBar />
      <ProfilesSection />
      <InlineCta
        heading="Identificou sua situação? Vamos conversar."
        sub="Primeiro contato sem compromisso. Diagnóstico antes de qualquer decisão."
      />
      <CostOfInactionSection />
      <HowWeWorkSection />
      <InlineCta
        heading="Quase 20 anos. Mais de 1.000 casos. O seu pode ser o próximo."
        sub="Sem julgamento. Sem pressão. Só um diagnóstico honesto."
      />
      <ObjectionsSection />
      {/* <TestimonialsSection /> */}
      <ContactFormSection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify the full build passes**

```bash
npx tsc --noEmit 2>&1 | grep -v "node_modules"
```

Expected: no errors.

- [ ] **Step 3: Verify dev server renders correctly**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm:
- ProfilesSection shows Lucide icons (lock, triangle, chart, scale, trending-up) instead of emoji
- ContactFormSection success state shows a green CheckCircle2 icon (trigger by submitting the form or temporarily hardcoding `status = 'success'`)
- NewsSection appears between Hero and SocialProofBar with the article card and external link

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire NewsSection into page between Hero and SocialProofBar"
```
