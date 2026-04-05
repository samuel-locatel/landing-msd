import { STATS } from '@/lib/config'

export function SocialProofBar() {
  return (
    <div className="bg-[#f5f0f2] border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-3xl font-extrabold text-vinho">{stat.value}</p>
            <p className="text-xs text-muted uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
