import { Newspaper, ExternalLink, AlertTriangle } from 'lucide-react'

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
    <section className="bg-dark py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-800 bg-red-950/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <AlertTriangle size={14} aria-hidden="true" />
            ATENÇÃO
          </div>
          <h2 className="font-serif text-4xl font-bold text-white leading-tight">
            Seu direito está sendo violado. Conheça a lei.
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 border-l-4 border-l-red-500 rounded-lg p-8">
          <div className="flex items-center gap-2 text-red-400 mb-4">
            <Newspaper size={20} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">{ARTICLE.source}</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white leading-snug mb-4">
            {ARTICLE.title}
          </h3>

          <p className="text-white/60 leading-relaxed mb-6">{ARTICLE.excerpt}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-white/40">
              {ARTICLE.author} &middot; {ARTICLE.date}
            </p>
            <a
              href={ARTICLE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300"
            >
              Leia o artigo completo
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
