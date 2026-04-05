import { STEPS } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function HowWeWorkSection() {
  return (
    <section className="py-24 bg-[#faf8f9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel>Como trabalhamos</EyebrowLabel>
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
              {i < STEPS.length - 1 && (
                <span className="hidden sm:block absolute top-5 right-0 translate-x-1/2 text-gray-300 text-2xl z-10">
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
