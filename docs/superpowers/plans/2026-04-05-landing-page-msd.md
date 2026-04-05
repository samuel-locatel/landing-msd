# MSD Assessoria Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a commercial landing page for MSD Assessoria that captures leads via WhatsApp CTA and contact form, persisting submissions to Neon (PostgreSQL) and sending email notifications via Resend.

**Architecture:** Next.js 15 App Router monolith on Vercel. Single-page landing assembled from 12 section components (Server Components except the form). One API route (`POST /api/contacts`) handles lead persistence + notification. No admin panel — just a notification email per submission.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Prisma, Neon (PostgreSQL serverless), Resend, Vercel

---

## File Map

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx                         # Root layout: fonts, metadata, globals
│   │   ├── page.tsx                           # Landing page: assembles all sections
│   │   ├── globals.css                        # CSS reset + custom properties
│   │   └── api/
│   │       └── contacts/
│   │           ├── route.ts                   # POST handler: validate → save → email
│   │           └── __tests__/
│   │               └── route.test.ts          # Unit tests for the API route
│   ├── components/
│   │   ├── ui/
│   │   │   ├── WhatsAppButton.tsx             # Reusable WhatsApp CTA link
│   │   │   └── EyebrowLabel.tsx               # Pill label above section headings
│   │   └── sections/
│   │       ├── Navbar.tsx                     # Sticky top nav
│   │       ├── Hero.tsx                       # Headline + image + floating stat card
│   │       ├── SocialProofBar.tsx             # 4 credential stats
│   │       ├── ProfilesSection.tsx            # 5 audience profile cards
│   │       ├── InlineCta.tsx                  # Reusable burgundy CTA strip
│   │       ├── CostOfInactionSection.tsx      # Dark section — 4 consequences
│   │       ├── HowWeWorkSection.tsx           # 3-step process
│   │       ├── ObjectionsSection.tsx          # FAQ accordion (Client Component)
│   │       ├── TestimonialsSection.tsx        # Testimonial placeholder cards
│   │       ├── ContactFormSection.tsx         # Form with submission logic (Client)
│   │       └── Footer.tsx                     # Dark footer
│   └── lib/
│       ├── config.ts                          # WhatsApp URL, brand constants
│       ├── db.ts                              # Prisma client singleton
│       ├── email.ts                           # Resend sendNotification helper
│       └── utils.ts                           # cn() class merge helper
├── prisma/
│   └── schema.prisma                          # Contact model
├── public/
│   └── logo.png                              # MSD logo (copy from Downloads)
├── .env.local                                # Local secrets (gitignored)
├── .env.example                              # Committed template
└── jest.config.ts                            # Jest configuration
```

---

## Task 1: Scaffold Next.js project + install dependencies

**Files:**
- Create: project root (scaffolded by create-next-app)
- Create: `jest.config.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Run create-next-app in the existing directory**

```bash
cd /Users/samuellocatel/Documents/landing-msd
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When prompted "Would you like to proceed? (y)", answer `y`. Accept all other defaults.

- [ ] **Step 2: Install production dependencies**

```bash
npm install @prisma/client resend clsx tailwind-merge
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install --save-dev prisma jest jest-environment-node @types/jest ts-jest
```

- [ ] **Step 4: Create Jest config**

```typescript
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'node',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  testMatch: ['**/__tests__/**/*.test.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 5: Create cn() utility**

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on http://localhost:3000 with default Next.js page.

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind and testing"
```

---

## Task 2: Configure fonts and Tailwind tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update tailwind.config.ts with brand tokens**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vinho: {
          DEFAULT: '#520027',
          dark: '#3f001c',
          light: '#ffd9e2',
        },
        muted: '#5e5e5e',
        border: '#e2e2e2',
        dark: '#0f0005',
        whatsapp: '#25D366',
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-sans text-muted antialiased;
  }
}
```

- [ ] **Step 3: Update layout.tsx with fonts and metadata**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: 'MSD Assessoria — Especialistas no Programa Farmácia Popular',
  description:
    'Em quase 20 anos, ajudamos mais de 1.000 farmácias a regularizar sua situação no Farmácia Popular. Desbloqueio, defesa administrativa e monitoramento preventivo.',
  openGraph: {
    title: 'MSD Assessoria — Especialistas no Programa Farmácia Popular',
    description:
      'Farmácia bloqueada? Em quase 20 anos, ajudamos mais de 1.000 farmácias a regularizar sua situação.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify fonts load**

```bash
npm run dev
```

Open http://localhost:3000. No errors in console.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: configure Tailwind brand tokens and Newsreader + Inter fonts"
```

---

## Task 3: Config constants and environment variables

**Files:**
- Create: `src/lib/config.ts`
- Create: `.env.local`
- Create: `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Create config.ts with all brand constants**

```typescript
// src/lib/config.ts
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

export const PROFILES = [
  {
    icon: '🔒',
    title: 'Farmácia já bloqueada',
    desc: 'O bloqueio chegou, o faturamento parou. Você sabe que não pode esperar — e precisa de quem já viu isso antes.',
    full: false,
  },
  {
    icon: '⚠️',
    title: 'Irregularidades identificadas',
    desc: 'O farmacêutico ou balconista percebeu algo errado na operação. Melhor agir antes de virar auditoria.',
    full: false,
  },
  {
    icon: '📊',
    title: 'Contador ou assessor preocupado',
    desc: 'Divergências entre compras e vendas, faturamento alto sem controle rigoroso. É hora de um diagnóstico especializado.',
    full: false,
  },
  {
    icon: '⚖️',
    title: 'Advogado precisando de suporte técnico',
    desc: 'Processos na CGU, TCU ou esfera criminal exigem mais do que conhecimento jurídico. Somos o suporte técnico especializado.',
    full: false,
  },
  {
    icon: '📈',
    title: 'Empresário que quer crescer com segurança',
    desc: 'Redes com múltiplos CNPJs sabem que escala significa maior exposição. Monitoramento preventivo para todas as unidades.',
    full: true,
  },
] as const

export const COSTS = [
  {
    title: 'Faturamento paralisado',
    desc: 'O programa pode representar 30–60% da receita mensal. Cada dia bloqueado é receita que não volta.',
  },
  {
    title: 'Multas e dívidas acumulando',
    desc: 'Sem regularização, penalidades administrativas e tributárias continuam crescendo.',
  },
  {
    title: 'Risco de descredenciamento definitivo',
    desc: 'Bloqueios não resolvidos podem evoluir para processos que inviabilizam a participação futura no programa.',
  },
  {
    title: 'Exposição jurídica',
    desc: 'Em casos mais graves, a omissão pode ser interpretada como agravante em processos administrativos e criminais.',
  },
] as const

export const STEPS = [
  {
    num: 1,
    title: 'Diagnóstico',
    desc: 'Analisamos o histórico da farmácia, o tipo de bloqueio e o risco real envolvido.',
  },
  {
    num: 2,
    title: 'Estratégia',
    desc: 'Definimos o melhor caminho: desbloqueio, defesa administrativa, negociação ou monitoramento.',
  },
  {
    num: 3,
    title: 'Execução',
    desc: 'Acompanhamos o processo do início ao fim — com comunicação clara e relatórios periódicos.',
  },
] as const

export const OBJECTIONS = [
  {
    q: 'Será que tem solução para o meu caso?',
    a: 'Em quase 20 anos, a grande maioria chegou até nós achando que o caso era sem solução. Sempre existe um caminho técnico e jurídico a ser explorado. O diagnóstico revela muito mais do que o cliente imagina.',
  },
  {
    q: 'Fiz coisas que sei que estão erradas. Posso pedir ajuda?',
    a: 'Sim. Existe uma diferença técnica e jurídica significativa entre irregularidade operacional e fraude. Nossa função não é julgar — é entender, analisar e construir a melhor defesa dentro da realidade do seu caso.',
  },
  {
    q: 'Já tentei resolver sozinho — não funcionou.',
    a: 'O Farmácia Popular tem fluxos administrativos e linguagem técnica muito particulares. Uma defesa genérica raramente funciona. O que diferencia nossa atuação é o conhecimento profundo e exclusivo desse universo, acumulado em quase duas décadas.',
  },
  {
    q: 'Quanto vai custar? Não sei se consigo pagar agora.',
    a: 'Começamos com um diagnóstico que permite entender o problema antes de qualquer comprometimento financeiro maior. Sabemos que farmácia bloqueada é farmácia sem receita — e trabalhamos dentro dessa realidade.',
  },
  {
    q: 'Contratar assessoria não vai chamar mais atenção para o meu caso?',
    a: 'Na prática, ocorre o inverso. Uma farmácia que identifica e corrige inconsistências antes de ser auditada está em posição muito mais favorável do que aquela pega de surpresa. Proatividade, bem conduzida, é argumento técnico.',
  },
] as const
```

- [ ] **Step 2: Create .env.local**

```bash
# .env.local
DATABASE_URL="postgresql://..."
RESEND_API_KEY="re_..."
NOTIFICATION_EMAIL="contato@msdassessoria.com.br"
NEXT_PUBLIC_WHATSAPP_NUMBER="5581991644050"
```

Replace values with real credentials when available.

- [ ] **Step 3: Create .env.example**

```bash
# .env.example
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
RESEND_API_KEY="re_your_key_here"
NOTIFICATION_EMAIL="your@email.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="5581991644050"
```

- [ ] **Step 4: Ensure .gitignore covers secrets**

Confirm `.env.local` is already in `.gitignore` (create-next-app adds it). If not:

```bash
echo ".env.local" >> .gitignore
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/config.ts .env.example .gitignore
git commit -m "chore: add brand constants, config, and env template"
```

---

## Task 4: Prisma schema and Neon database setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/db.ts`

- [ ] **Step 1: Initialize Prisma**

```bash
npx prisma init --datasource-provider postgresql
```

This creates `prisma/schema.prisma` and adds `DATABASE_URL` to `.env` (Prisma's default). We use `.env.local` for Next.js, so copy `DATABASE_URL` there.

- [ ] **Step 2: Write schema.prisma**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL")
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  phone     String?
  email     String?
  state     String?
  message   String?
  createdAt DateTime @default(now())
}
```

- [ ] **Step 3: Create Prisma singleton**

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error'] : [] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 4: Create Neon account and project**

Go to https://neon.tech, create a free project called `msd-landing`. Copy the connection string (postgres://...) into `.env.local` as `DATABASE_URL`.

- [ ] **Step 5: Run migration**

```bash
npx prisma db push
```

Expected output: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 6: Generate Prisma client**

```bash
npx prisma generate
```

- [ ] **Step 7: Commit**

```bash
git add prisma/ src/lib/db.ts
git commit -m "feat: add Prisma schema and Neon database connection"
```

---

## Task 5: Email helper, API route, and tests

**Files:**
- Create: `src/lib/email.ts`
- Create: `src/app/api/contacts/route.ts`
- Create: `src/app/api/contacts/__tests__/route.test.ts`

- [ ] **Step 1: Write failing tests first**

```typescript
// src/app/api/contacts/__tests__/route.test.ts
import { POST } from '../route'

const mockCreate = jest.fn()
const mockSend = jest.fn()

jest.mock('@/lib/db', () => ({
  prisma: { contact: { create: (...args: unknown[]) => mockCreate(...args) } },
}))

jest.mock('@/lib/email', () => ({
  sendNotification: (...args: unknown[]) => mockSend(...args),
}))

function req(body: object) {
  return new Request('http://localhost/api/contacts', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

beforeEach(() => {
  mockCreate.mockResolvedValue({ id: 'cuid123' })
  mockSend.mockResolvedValue(undefined)
})

describe('POST /api/contacts', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(req({ phone: '5581991644050' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toMatch(/nome/i)
  })

  it('returns 400 when both phone and email are missing', async () => {
    const res = await POST(req({ name: 'Maria' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toMatch(/telefone|e-mail/i)
  })

  it('saves contact and sends notification on valid payload', async () => {
    const res = await POST(req({ name: 'Maria', phone: '5581991644050' }))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: 'Maria', phone: '5581991644050' }),
    })
    expect(mockSend).toHaveBeenCalled()
  })

  it('accepts email instead of phone', async () => {
    const res = await POST(req({ name: 'João', email: 'joao@farm.com' }))
    expect(res.status).toBe(200)
  })

  it('returns 500 if db throws', async () => {
    mockCreate.mockRejectedValueOnce(new Error('DB error'))
    const res = await POST(req({ name: 'Maria', phone: '123' }))
    expect(res.status).toBe(500)
  })
})
```

- [ ] **Step 2: Run tests — expect all to FAIL**

```bash
npx jest
```

Expected: 5 failures (`Cannot find module '../route'`).

- [ ] **Step 3: Create Resend email helper**

```typescript
// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface NotificationPayload {
  name: string
  phone?: string | null
  email?: string | null
  state?: string | null
  message?: string | null
}

export async function sendNotification(contact: NotificationPayload): Promise<void> {
  const to = process.env.NOTIFICATION_EMAIL
  if (!to) return

  await resend.emails.send({
    from: 'noreply@msdassessoria.com.br',
    to,
    subject: `Novo lead: ${contact.name}`,
    html: `
      <h2>Novo contato via site</h2>
      <p><strong>Nome:</strong> ${contact.name}</p>
      ${contact.phone ? `<p><strong>Telefone:</strong> ${contact.phone}</p>` : ''}
      ${contact.email ? `<p><strong>Email:</strong> ${contact.email}</p>` : ''}
      ${contact.state ? `<p><strong>Estado:</strong> ${contact.state}</p>` : ''}
      ${contact.message ? `<p><strong>Situação:</strong> ${contact.message}</p>` : ''}
    `,
  })
}
```

- [ ] **Step 4: Create API route**

```typescript
// src/app/api/contacts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, state, message } = body

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'O nome é obrigatório.' }, { status: 400 })
    }

    if (!phone && !email) {
      return NextResponse.json(
        { error: 'Informe um telefone ou e-mail para contato.' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        state: state?.trim() || null,
        message: message?.trim() || null,
      },
    })

    await sendNotification(contact)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contacts/route]', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
```

- [ ] **Step 5: Run tests — expect all to PASS**

```bash
npx jest
```

Expected: 5 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/email.ts src/app/api/ jest.config.ts
git commit -m "feat: add contacts API route with validation, db save, and email notification"
```

---

## Task 6: Shared UI components

**Files:**
- Create: `src/components/ui/WhatsAppButton.tsx`
- Create: `src/components/ui/EyebrowLabel.tsx`

- [ ] **Step 1: Create WhatsAppButton**

```tsx
// src/components/ui/WhatsAppButton.tsx
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { whatsappUrl } from '@/lib/config'

interface Props {
  children: ReactNode
  className?: string
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function WhatsAppButton({ children, className, message, size = 'md' }: Props) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded font-bold',
        'bg-whatsapp text-white hover:bg-[#1da851] transition-colors',
        sizes[size],
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {children}
    </a>
  )
}
```

- [ ] **Step 2: Create EyebrowLabel**

```tsx
// src/components/ui/EyebrowLabel.tsx
import { cn } from '@/lib/utils'

interface Props {
  children: string
  className?: string
  variant?: 'default' | 'light'
}

export function EyebrowLabel({ children, className, variant = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-widest',
        variant === 'default' && 'bg-vinho-light text-vinho-dark',
        variant === 'light' && 'bg-white/10 text-white/80',
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add WhatsAppButton and EyebrowLabel shared UI components"
```

---

## Task 7: Navbar

**Files:**
- Create: `src/components/sections/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
// src/components/sections/Navbar.tsx
import Image from 'next/image'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="MSD Assessoria"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-xs font-semibold text-vinho uppercase tracking-widest hidden sm:block">
            Assessoria Empresarial e Financeira
          </span>
        </div>
        <WhatsAppButton size="sm">
          Falar no WhatsApp
        </WhatsAppButton>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Copy logo to public/**

```bash
cp "/Users/samuellocatel/Downloads/MSD Transparente1.png" /Users/samuellocatel/Documents/landing-msd/public/logo.png
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Navbar.tsx public/logo.png
git commit -m "feat: add sticky Navbar with logo and WhatsApp CTA"
```

---

## Task 8: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero**

```tsx
// src/components/sections/Hero.tsx
import Image from 'next/image'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function Hero() {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <EyebrowLabel>Especialistas no Programa Farmácia Popular</EyebrowLabel>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Sua farmácia foi bloqueada
            <br />
            pelo{' '}
            <span className="text-vinho">Farmácia Popular</span>?
            <br />
            <em className="font-normal not-italic italic text-vinho">Existe um caminho.</em>
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-lg">
            Em quase 20 anos de atuação, ajudamos mais de 1.000 farmácias a regularizar
            sua situação, retomar o credenciamento e proteger sua operação — em 20 estados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <WhatsAppButton size="lg">
              Falar agora no WhatsApp
            </WhatsAppButton>
            <a
              href="#contato"
              className="inline-flex items-center justify-center px-8 py-4 rounded font-bold text-vinho border-2 border-vinho hover:bg-vinho hover:text-white transition-colors"
            >
              Preencher formulário
            </a>
          </div>
        </div>

        {/* Image + floating stat card */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
              alt="Farmácia parceira da MSD Assessoria"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vinho/40 to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-6 flex flex-col gap-1">
            <span className="font-serif text-4xl font-extrabold text-vinho">1.000+</span>
            <span className="text-xs text-muted uppercase tracking-widest">
              farmácias atendidas
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add next.config.ts image domain for Unsplash**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx next.config.ts
git commit -m "feat: add Hero section with headline, CTAs, image, and floating stat card"
```

---

## Task 9: SocialProofBar and ProfilesSection

**Files:**
- Create: `src/components/sections/SocialProofBar.tsx`
- Create: `src/components/sections/ProfilesSection.tsx`

- [ ] **Step 1: Create SocialProofBar**

```tsx
// src/components/sections/SocialProofBar.tsx
import { STATS } from '@/lib/config'

export function SocialProofBar() {
  return (
    <div className="bg-[#f5f0f2] border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-3xl font-extrabold text-vinho">{stat.value}</p>
            <p className="text-xs text-muted uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create ProfilesSection**

```tsx
// src/components/sections/ProfilesSection.tsx
import { PROFILES } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function ProfilesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel className="mb-4">Reconhece sua situação?</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Atendemos farmácias em diferentes momentos de risco
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Cada caso é único — mas o caminho começa pelo mesmo lugar: entender o tamanho real do problema.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILES.map((profile) => (
            <div
              key={profile.title}
              className={`border border-border rounded-lg p-6 border-l-4 border-l-vinho bg-white shadow-sm hover:shadow-md transition-shadow ${
                profile.full ? 'sm:col-span-2' : ''
              }`}
            >
              <span className="text-2xl mb-3 block">{profile.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{profile.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{profile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/SocialProofBar.tsx src/components/sections/ProfilesSection.tsx
git commit -m "feat: add SocialProofBar and ProfilesSection"
```

---

## Task 10: InlineCta component

**Files:**
- Create: `src/components/sections/InlineCta.tsx`

- [ ] **Step 1: Create InlineCta**

```tsx
// src/components/sections/InlineCta.tsx
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

interface Props {
  heading: string
  sub: string
}

export function InlineCta({ heading, sub }: Props) {
  return (
    <div className="bg-vinho py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-lg">{heading}</p>
          <p className="text-white/75 text-sm mt-1">{sub}</p>
        </div>
        <WhatsAppButton
          size="md"
          className="shrink-0 bg-whatsapp hover:bg-[#1da851]"
        >
          Falar agora no WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/InlineCta.tsx
git commit -m "feat: add reusable InlineCta strip component"
```

---

## Task 11: CostOfInactionSection

**Files:**
- Create: `src/components/sections/CostOfInactionSection.tsx`

- [ ] **Step 1: Create CostOfInactionSection**

```tsx
// src/components/sections/CostOfInactionSection.tsx
import { COSTS } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function CostOfInactionSection() {
  return (
    <section className="bg-dark py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel variant="light" className="mb-4">O custo de esperar</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-white mt-4 leading-tight">
            Cada dia de bloqueio tem um preço real
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl">
            Farmácia bloqueada é farmácia sem receita. Mas os custos vão além do faturamento perdido.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COSTS.map((cost) => (
            <div
              key={cost.title}
              className="border border-white/10 rounded-lg p-6 border-l-4 border-l-red-600 bg-white/5"
            >
              <h3 className="font-bold text-red-300 mb-2">{cost.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{cost.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CostOfInactionSection.tsx
git commit -m "feat: add CostOfInactionSection — dark urgency section"
```

---

## Task 12: HowWeWorkSection

**Files:**
- Create: `src/components/sections/HowWeWorkSection.tsx`

- [ ] **Step 1: Create HowWeWorkSection**

```tsx
// src/components/sections/HowWeWorkSection.tsx
import { STEPS } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function HowWeWorkSection() {
  return (
    <section className="py-24 bg-[#faf8f9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel className="mb-4">Como trabalhamos</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Do diagnóstico à resolução —{' '}
            <em className="italic font-normal text-vinho">com clareza em cada etapa</em>
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Não vendemos falsas esperanças. Entendemos o caso, traçamos o caminho, executamos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Arrow connector (desktop only) */}
              {i < STEPS.length - 1 && (
                <span className="hidden sm:block absolute top-5 right-0 translate-x-1/2 text-border text-2xl z-10">
                  →
                </span>
              )}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-vinho text-white font-extrabold text-lg mb-4">
                {step.num}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HowWeWorkSection.tsx
git commit -m "feat: add HowWeWorkSection — 3-step process"
```

---

## Task 13: ObjectionsSection (FAQ accordion)

**Files:**
- Create: `src/components/sections/ObjectionsSection.tsx`

This is a Client Component because it has interactive accordion state.

- [ ] **Step 1: Create ObjectionsSection**

```tsx
// src/components/sections/ObjectionsSection.tsx
'use client'

import { useState } from 'react'
import { OBJECTIONS } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { cn } from '@/lib/utils'

export function ObjectionsSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel className="mb-4">Dúvidas frequentes</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Conhecemos as resistências —{' '}
            <em className="italic font-normal text-vinho">porque já ouvimos todas</em>
          </h2>
        </div>

        <div className="divide-y divide-border max-w-3xl">
          {OBJECTIONS.map((obj, i) => (
            <div key={i}>
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="flex gap-3 items-start">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-vinho text-white text-xs font-extrabold flex items-center justify-center">
                    ?
                  </span>
                  <span className="font-bold text-gray-900">{obj.q}</span>
                </span>
                <span
                  className={cn(
                    'flex-shrink-0 text-vinho transition-transform duration-200',
                    open === i && 'rotate-180'
                  )}
                >
                  ▾
                </span>
              </button>
              {open === i && (
                <p className="pb-5 pl-9 text-sm text-muted leading-relaxed">{obj.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ObjectionsSection.tsx
git commit -m "feat: add ObjectionsSection FAQ accordion (client component)"
```

---

## Task 14: TestimonialsSection

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Create TestimonialsSection**

```tsx
// src/components/sections/TestimonialsSection.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#faf8f9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel className="mb-4">O que dizem nossos clientes</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Farmácias de todo o Brasil que voltaram a funcionar
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Atendemos em mais de 500 cidades, com forte presença no Sul:{' '}
            Curitiba, Florianópolis, Porto Alegre, Joinville, Blumenau, Caxias do Sul,
            Londrina, Maringá e Chapecó, entre outras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-border border-t-4 border-t-vinho p-6 shadow-sm"
            >
              <p className="text-sm text-muted italic leading-relaxed min-h-[80px] flex items-center justify-center text-center">
                Depoimento em breve
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx
git commit -m "feat: add TestimonialsSection with placeholder cards"
```

---

## Task 15: ContactFormSection

**Files:**
- Create: `src/components/sections/ContactFormSection.tsx`

This is a Client Component for form state + submission.

- [ ] **Step 1: Create ContactFormSection**

```tsx
// src/components/sections/ContactFormSection.tsx
'use client'

import { useState, FormEvent } from 'react'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  phone: string
  email: string
  state: string
  message: string
}

const INITIAL: FormState = { name: '', phone: '', email: '', state: '', message: '' }

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

export function ContactFormSection() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Erro ao enviar. Tente novamente.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(INITIAL)
    } catch {
      setErrorMsg('Erro de rede. Verifique sua conexão e tente novamente.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-border rounded px-4 py-3 text-sm text-gray-900 bg-[#faf8f9] focus:outline-none focus:border-vinho transition-colors'

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <EyebrowLabel className="mb-4">Entre em contato</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Fale com a MSD Assessoria
          </h2>
          <p className="text-muted mt-4">
            Prefere o WhatsApp?{' '}
            <WhatsAppButton size="sm" className="inline-flex ml-1">
              Clique aqui
            </WhatsAppButton>{' '}
            <span className="ml-1">ou preencha o formulário abaixo.</span>
          </p>
        </div>

        {status === 'success' ? (
          <div className="max-w-2xl bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <p className="text-2xl mb-2">✅</p>
            <h3 className="font-bold text-gray-900 mb-2">Mensagem recebida!</h3>
            <p className="text-sm text-muted">
              Nossa equipe entrará em contato em breve. Você também pode nos chamar diretamente no WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="Seu nome"
                className={inputClass}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="(00) 00000-0000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                E-mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="seu@email.com"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Estado
              </label>
              <select value={form.state} onChange={update('state')} className={inputClass}>
                <option value="">Selecione...</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Descreva brevemente sua situação
              </label>
              <textarea
                value={form.message}
                onChange={update('message')}
                placeholder="Conte o que está acontecendo..."
                rows={4}
                className={cn(inputClass, 'resize-none')}
              />
            </div>

            {status === 'error' && (
              <div className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'sm:col-span-2 bg-vinho text-white font-bold py-4 rounded text-sm tracking-wide',
                'hover:bg-vinho-dark transition-colors',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {status === 'loading' ? 'Enviando...' : 'Solicitar diagnóstico gratuito →'}
            </button>

            <p className="sm:col-span-2 text-xs text-muted text-center">
              Seus dados são tratados com absoluta confidencialidade.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ContactFormSection.tsx
git commit -m "feat: add ContactFormSection with form state and API submission"
```

---

## Task 16: Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// src/components/sections/Footer.tsx
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-dark text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/logo.png" alt="MSD" width={32} height={32} className="object-contain" />
              <span className="text-white font-bold text-sm">MSD Assessoria</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              Assessoria Empresarial e Financeira especializada no Programa Farmácia Popular.
              Quase 20 anos. Mais de 1.000 farmácias atendidas.
            </p>
          </div>

          <div className="flex gap-12 text-xs">
            <div className="flex flex-col gap-3">
              <span className="text-white/30 uppercase tracking-widest text-[10px] font-semibold">Legal</span>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#contato" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/30 pt-6 text-center">
          © {new Date().getFullYear()} MSD Assessoria Empresarial e Financeira. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Footer.tsx
git commit -m "feat: add dark Footer"
```

---

## Task 17: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace default page.tsx with landing page assembly**

```tsx
// src/app/page.tsx
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { SocialProofBar } from '@/components/sections/SocialProofBar'
import { ProfilesSection } from '@/components/sections/ProfilesSection'
import { InlineCta } from '@/components/sections/InlineCta'
import { CostOfInactionSection } from '@/components/sections/CostOfInactionSection'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'
import { ObjectionsSection } from '@/components/sections/ObjectionsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
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
      <TestimonialsSection />
      <ContactFormSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Run dev server and inspect full page**

```bash
npm run dev
```

Open http://localhost:3000. Scroll through all sections. No console errors.

- [ ] **Step 3: Run full test suite**

```bash
npx jest
```

Expected: 5 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble landing page with all 12 sections"
```

---

## Task 18: Vercel deploy

**Files:**
- No new files. Configuration via Vercel dashboard.

- [ ] **Step 1: Push to GitHub**

Create a new repo at github.com. Then:

```bash
git remote add origin https://github.com/<username>/landing-msd.git
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to vercel.com → New Project → Import from GitHub → select `landing-msd`
2. Framework: Next.js (auto-detected)
3. Add environment variables (from `.env.local`):
   - `DATABASE_URL`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `5581991644050`
4. Click Deploy

- [ ] **Step 3: Run Prisma migration on Neon**

After deploy, the database already has the schema (pushed in Task 4 with `prisma db push`). Nothing extra needed for Neon.

- [ ] **Step 4: Test production form submission**

Fill the form on the live URL. Verify:
- Response: "Mensagem recebida!"
- Email notification received at `NOTIFICATION_EMAIL`
- Row visible in Neon console: `SELECT * FROM "Contact";`

- [ ] **Step 5: Commit .env.example to confirm it's present**

```bash
git add .env.example
git commit -m "chore: confirm env example is committed for deploy reference"
git push
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Next.js 15 App Router | Task 1 |
| Tailwind + Newsreader + Inter fonts | Tasks 1–2 |
| WhatsApp CTA (multiple points) | Tasks 6, 7, 10 (InlineCta × 2), 15 |
| Social proof bar | Task 9 |
| 5 audience profile cards | Task 9 |
| Urgency / cost of inaction section | Task 11 |
| 3-step process section | Task 12 |
| FAQ accordion | Task 13 |
| Testimonial placeholders | Task 14 |
| Contact form | Task 15 |
| API route POST /api/contacts | Task 5 |
| Prisma + Neon save | Tasks 4–5 |
| Resend email notification | Tasks 4–5 |
| Tests for API route | Task 5 |
| Logo in /public | Task 7 |
| WhatsApp number 5581991644050 | Task 3 |
| .env.example | Task 3 |
| Vercel deploy | Task 18 |
| Responsive / mobile-first | All section tasks (Tailwind grid) |
| Footer | Task 16 |
| Navbar fixed | Task 7 |

All requirements covered. No gaps found.

**Placeholder scan:** No TBD or TODO present. All code blocks are complete.

**Type consistency:** `PROFILES`, `COSTS`, `STEPS`, `OBJECTIONS`, `STATS` — all defined in `config.ts` (Task 3) and consumed in section components (Tasks 9–14). `ContactFormState` interface defined and used within `ContactFormSection`. `POST` handler in `route.ts` matches mock in `route.test.ts`.
