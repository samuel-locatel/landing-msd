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
