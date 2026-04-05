'use client'

import { useState } from 'react'
import { OBJECTIONS } from '@/lib/config'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { cn } from '@/lib/utils'

export function ObjectionsSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <EyebrowLabel>Dúvidas frequentes</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Conhecemos as resistências —{' '}
            <em className="italic font-normal text-vinho">porque já ouvimos todas</em>
          </h2>
        </div>

        <div className="divide-y divide-border max-w-3xl">
          {OBJECTIONS.map((obj, i) => (
            <div key={i}>
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="flex gap-3 items-start">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-vinho text-white text-xs font-extrabold flex items-center justify-center">
                    ?
                  </span>
                  <span className="font-bold text-gray-900">{obj.q}</span>
                </span>
                <span
                  className={cn(
                    'flex-shrink-0 text-vinho transition-transform duration-200',
                    open === i && 'rotate-180'
                  )}
                >
                  ▾
                </span>
              </button>
              {open === i && (
                <p className="pb-5 pl-9 text-sm text-muted leading-relaxed">{obj.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
