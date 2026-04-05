# MSD Assessoria — Landing Page Design Spec

**Date:** 2026-04-05  
**Project:** Landing page comercial para captação de leads de farmácias bloqueadas no Programa Farmácia Popular  
**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma + Neon + Resend  
**Deploy:** Vercel

---

## 1. Objetivo

Converter visitantes (donos de farmácias, contadores, advogados e empresários do setor farmacêutico) em leads qualificados via dois canais: contato pelo WhatsApp e preenchimento de formulário. A página deve transmitir autoridade, empatia e urgência — respondendo às dúvidas e resistências antes de qualquer pedido de conversão.

---

## 2. Audiência-alvo

1. **Farmácia já bloqueada** — situação urgente, quer saber se tem solução
2. **Farmacêutico/balconista** — identificou irregularidades operacionais
3. **Contador/assessor** — detectou divergências fiscais ou de faturamento
4. **Advogado** — precisa de suporte técnico especializado em Farmácia Popular
5. **Empresário do setor** — quer crescer com segurança, múltiplos CNPJs

---

## 3. Conversão primária e secundária

- **Primária:** CTA WhatsApp (múltiplos pontos ao longo da página)
- **Secundária:** Formulário de contato (nome, telefone, email, estado, situação)
- **Backend:** POST salva lead no banco de dados + dispara email de notificação para a equipe MSD

---

## 4. Stack técnico

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| ORM | Prisma |
| Banco de dados | Neon (PostgreSQL serverless) |
| Email | Resend |
| Deploy | Vercel |

### Estrutura de diretórios

```
src/
  app/
    page.tsx                    # Landing page principal
    api/
      contacts/
        route.ts                # POST /api/contacts — salvar lead + enviar email
  components/
    sections/
      Navbar.tsx
      Hero.tsx
      SocialProofBar.tsx
      ProfilesSection.tsx
      InlineCta.tsx
      CostOfInactionSection.tsx
      HowWeWorkSection.tsx
      ObjectionsSection.tsx
      TestimonialsSection.tsx
      ContactFormSection.tsx
      Footer.tsx
    ui/
      WhatsAppButton.tsx
  lib/
    db.ts                       # Prisma client singleton
    email.ts                    # Resend helper
  prisma/
    schema.prisma               # Model: Contact
```

---

## 5. Design

### 5.1 Identidade visual

| Token | Valor |
|---|---|
| Cor primária (vinho) | `#520027` |
| Cor primária hover | `#3f001c` |
| Cor WhatsApp | `#25D366` |
| Cinza corpo | `#5e5e5e` |
| Cinza border | `#e2e2e2` |
| Background label | `#ffd9e2` |
| Texto label | `#3f001c` |
| Seção escura bg | `#0f0005` |

### 5.2 Tipografia (inspirada no Figma)

| Uso | Fonte | Peso | Tamanho |
|---|---|---|---|
| Headline H1 | Newsreader (serif) | ExtraBold + Italic mix | 48–60px desktop / 36px mobile |
| Headline H2 | Newsreader | Bold | 32–40px |
| Headline H3 | Newsreader | SemiBold | 22px |
| Corpo | Inter | Regular | 16–20px |
| Labels/eyebrow | Inter | SemiBold | 11–12px, uppercase, tracking |
| Botões | Inter | Bold | 16–18px |

### 5.3 Componentes visuais

- **Eyebrow label:** pill com fundo `#ffd9e2`, texto `#3f001c`, uppercase, tracking 1.2px
- **Botão primário:** fundo `#520027`, branco, border-radius 4px, sombra suave `rgba(82,0,39,0.1)`
- **Botão WhatsApp:** fundo `#25D366`, branco, mesma forma
- **Cards de perfil:** border-left 3px `#520027`, fundo branco, sombra leve
- **Inline CTA:** faixa full-width fundo `#520027`, texto branco, botão WhatsApp à direita
- **Seção escura:** fundo `#0f0005`, tipografia branca, cards com border `rgba(255,255,255,0.08)`
- **FAQ accordion:** border-bottom entre itens, ícone chevron animado
- **Stat card flutuante (hero):** card branco com sombra, posicionado assimetricamente sobre a foto

---

## 6. Estrutura de seções

### 6.1 Navbar
- Fixa no topo, z-index alto
- Logo MSD (imagem `/public/logo.png`) + nome
- Botão "Falar no WhatsApp" (verde) com link WhatsApp
- Mobile: hambúrguer ou navbar simplificada

### 6.2 Hero
- **Eyebrow:** "Especialistas no Programa Farmácia Popular"
- **H1 (Newsreader):** "Sua farmácia foi bloqueada pelo Farmácia Popular? Existe um caminho."
  - Variação: "Existe um" em itálico
- **Subtítulo:** texto sobre 20 anos e 1.000+ farmácias
- **CTA primário:** botão WhatsApp
- **CTA secundário:** âncora para o formulário ("ou preencha o formulário")
- **Elemento decorativo:** card flutuante com stat "1.000+" farmácias atendidas
- **Imagem de fundo:** foto profissional de farmácia ou equipe (placeholder Unsplash inicial)
- **Overlay:** gradiente vinho sobre a imagem

### 6.3 Barra de credenciais
- Fundo `#f5f0f2`
- 4 stats: **20 anos** · **1.000+ farmácias** · **20 estados** · **500 cidades**
- Tipografia: número grande em vinho, label cinza pequena

### 6.4 Perfis de cliente ("Reconhece sua situação?")
- **Eyebrow:** "Reconhece sua situação?"
- **H2:** "Atendemos farmácias em diferentes momentos de risco"
- 5 cards com ícone + título + descrição curta:
  1. 🔒 Farmácia já bloqueada
  2. ⚠️ Irregularidades identificadas
  3. 📊 Contador ou assessor preocupado
  4. ⚖️ Advogado precisando de suporte técnico
  5. 📈 Empresário que quer crescer com segurança (card full-width)

### 6.5 Inline CTA #1
- Faixa vinho full-width
- Texto: "Identificou sua situação? Vamos conversar."
- Sub: "Primeiro contato sem compromisso. Diagnóstico antes de qualquer decisão."
- Botão WhatsApp à direita (mobile: abaixo do texto)

### 6.6 "O custo de esperar"
- Seção com fundo escuro `#0f0005`
- **Eyebrow:** "O custo de esperar" (cor: `#c9a0b0`)
- **H2 branco:** "Cada dia de bloqueio tem um preço real"
- 4 cards em grid 2×2:
  1. Faturamento paralisado
  2. Multas e dívidas acumulando
  3. Risco de descredenciamento definitivo
  4. Exposição jurídica
- Cards: borda esquerda vermelha `#c0392b`, fundo semi-transparente

### 6.7 Como trabalhamos
- Fundo levemente acinzentado `#faf8f9`
- **Eyebrow:** "Como trabalhamos"
- **H2:** "Do diagnóstico à resolução — com clareza em cada etapa"
- 3 passos em linha com setas entre eles:
  1. **Diagnóstico** — análise do caso
  2. **Estratégia** — desbloqueio, defesa ou monitoramento
  3. **Execução** — acompanhamento do início ao fim

### 6.8 Inline CTA #2
- Mesmo componente InlineCta reutilizado
- Texto: "Quase 20 anos. Mais de 1.000 casos. O seu pode ser o próximo."
- Sub: "Sem julgamento. Sem pressão. Só um diagnóstico honesto."

### 6.9 Objeções respondidas (FAQ accordion)
- **Eyebrow:** "Dúvidas frequentes"
- **H2:** "Conhecemos as resistências — porque já ouvimos todas"
- 5 items de accordion (estilo `<details>` ou estado React):
  1. "Será que tem solução para o meu caso?"
  2. "Fiz coisas que sei que estão erradas. Posso pedir ajuda?"
  3. "Já tentei resolver sozinho — não funcionou."
  4. "Quanto vai custar? Não sei se consigo pagar agora."
  5. "Contratar assessoria não vai chamar mais atenção?"
- Borda-bottom entre items, chevron animado

### 6.10 Depoimentos
- Fundo `#faf8f9`
- **Eyebrow:** "O que dizem nossos clientes"
- **H2:** "Farmácias de todo o Brasil que voltaram a funcionar"
- Subtítulo com cidades do Sul: Curitiba, Florianópolis, Porto Alegre, Joinville, Blumenau, Caxias do Sul, Londrina, Maringá, Chapecó
- 2 cards placeholder (conteúdo será adicionado depois)
- Cards: border-top 3px vinho, fundo branco, sombra

### 6.11 Formulário de contato
- Âncora: `id="contato"`
- **Eyebrow:** "Entre em contato"
- **H2:** "Fale com a MSD Assessoria"
- Sub com link WhatsApp em verde
- Grid 2 colunas:
  - Nome completo
  - Telefone / WhatsApp
  - Email
  - Estado
  - Situação (textarea, full-width)
  - Botão submit "Solicitar diagnóstico gratuito →" (full-width)
  - Nota: "Seus dados são tratados com absoluta confidencialidade."
- Validação client-side simples (campos obrigatórios: nome, telefone ou email)
- Feedback de sucesso/erro inline

### 6.12 Footer
- Fundo escuro `#0f0005`
- Logo + tagline
- Links: Política de Privacidade · Contato
- Copyright

---

## 7. Backend — API Route

### `POST /api/contacts`

**Payload:**
```json
{
  "name": "string (required)",
  "phone": "string (optional)",
  "email": "string (optional)",
  "state": "string (optional)",
  "message": "string (optional)"
}
```

**Validação:** ao menos `name` + (`phone` OU `email`)

**Ações:**
1. Salvar `Contact` no Neon via Prisma
2. Disparar email de notificação via Resend para o email da MSD
3. Retornar `{ success: true }` ou erro

### Schema Prisma

```prisma
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

---

## 8. Variáveis de ambiente

```env
DATABASE_URL=          # Neon connection string
RESEND_API_KEY=        # Resend API key
NOTIFICATION_EMAIL=    # Email destino das notificações MSD
WHATSAPP_NUMBER=       # Número no formato 5561999999999 (sem + ou espaços)
```

O link de WhatsApp é gerado como `https://wa.me/${WHATSAPP_NUMBER}?text=...`.  
Em desenvolvimento, usar uma constante fallback. O arquivo `/public/logo.png` deve ser copiado manualmente antes do primeiro deploy.

---

## 9. Gatilhos mentais aplicados

| Seção | Gatilho |
|---|---|
| Hero | Dor imediata + esperança ("existe um caminho") |
| Barra de credenciais | Prova social numérica + autoridade |
| Perfis | Identificação/espelho ("você se vê aqui?") |
| Inline CTA #1 | Urgência suave |
| Custo de esperar | Aversão à perda (loss aversion) |
| Como trabalhamos | Clareza e segurança no processo |
| Inline CTA #2 | Reciprocidade implícita ("somos experientes") |
| Objeções | Antecipação e dissolução de resistências |
| Depoimentos | Prova social + similaridade |
| Formulário | Comprometimento gradual (diagnóstico gratuito) |

---

## 10. Responsividade

- Mobile-first, base 390px (mesma largura do Figma)
- Breakpoints Tailwind: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Grid 2 colunas nos cards → 1 coluna no mobile
- Inline CTAs: horizontal no desktop → vertical empilhado no mobile
- Hero: imagem abaixo do texto no mobile, lado a lado no desktop

---

## 11. Fora do escopo

- Painel admin para visualizar leads
- Integração com CRM
- Analytics (pode ser adicionado depois via Vercel Analytics)
- Blog ou conteúdo dinâmico
- Autenticação
