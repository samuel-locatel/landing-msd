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
            <em className="not-italic italic text-vinho font-normal">Existe um caminho.</em>
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
