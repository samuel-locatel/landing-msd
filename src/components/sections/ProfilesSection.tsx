import { PROFILES } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

export function ProfilesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel>Reconhece sua situação?</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Atendemos farmácias em diferentes momentos de risco
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Cada caso é único — mas o caminho começa pelo mesmo lugar: entender o tamanho real do problema.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILES.map((profile) => {
            const Icon = profile.icon
            return (
              <div
                key={profile.title}
                className={`border border-border rounded-lg p-6 border-l-4 border-l-vinho bg-white shadow-sm hover:shadow-md transition-shadow ${
                  profile.full ? 'sm:col-span-2' : ''
                }`}
              >
                <Icon size={24} className="text-vinho mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{profile.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{profile.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
