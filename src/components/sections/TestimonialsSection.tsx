import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#faf8f9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel>O que dizem nossos clientes</EyebrowLabel>
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
