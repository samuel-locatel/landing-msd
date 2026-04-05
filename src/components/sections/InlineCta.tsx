import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

interface Props {
  heading: string
  sub: string
}

export function InlineCta({ heading, sub }: Props) {
  return (
    <div className="bg-vinho py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-lg">{heading}</p>
          <p className="text-white/75 text-sm mt-1">{sub}</p>
        </div>
        <WhatsAppButton size="md" className="shrink-0">
          Falar agora no WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  )
}
