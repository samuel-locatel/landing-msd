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
