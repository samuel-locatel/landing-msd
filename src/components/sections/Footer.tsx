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
