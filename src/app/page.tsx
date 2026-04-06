import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { SocialProofBar } from '@/components/sections/SocialProofBar'
import { ProfilesSection } from '@/components/sections/ProfilesSection'
import { InlineCta } from '@/components/sections/InlineCta'
import { CostOfInactionSection } from '@/components/sections/CostOfInactionSection'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'
import { ObjectionsSection } from '@/components/sections/ObjectionsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProofBar />
      <ProfilesSection />
      <InlineCta
        heading="Identificou sua situação? Vamos conversar."
        sub="Primeiro contato sem compromisso. Diagnóstico antes de qualquer decisão."
      />
      <CostOfInactionSection />
      <HowWeWorkSection />
      <InlineCta
        heading="Quase 20 anos. Mais de 1.000 casos. O seu pode ser o próximo."
        sub="Sem julgamento. Sem pressão. Só um diagnóstico honesto."
      />
      <ObjectionsSection />
      <TestimonialsSection />
      <ContactFormSection />
      <Footer />
    </main>
  )
}
