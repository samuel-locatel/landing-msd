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
