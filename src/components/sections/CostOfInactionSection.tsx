import { COSTS } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function CostOfInactionSection() {
  return (
    <section className="bg-dark py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel variant="light">O custo de esperar</EyebrowLabel>
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
