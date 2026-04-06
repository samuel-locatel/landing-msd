'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  phone: string
  email: string
  state: string
  cnpj: string
  message: string
}

const INITIAL: FormState = { name: '', phone: '', email: '', state: '', cnpj: '', message: '' }

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

export function ContactFormSection() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Erro ao enviar. Tente novamente.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(INITIAL)
    } catch {
      setErrorMsg('Erro de rede. Verifique sua conexão e tente novamente.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-border rounded px-4 py-3 text-sm text-gray-900 bg-[#faf8f9] focus:outline-none focus:border-vinho transition-colors'

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <EyebrowLabel>Entre em contato</EyebrowLabel>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Fale com a MSD Assessoria
          </h2>
          <p className="text-muted mt-4 flex flex-wrap items-center gap-2">
            Prefere o WhatsApp?{' '}
            <WhatsAppButton size="sm">Clique aqui</WhatsAppButton>
            <span>ou preencha o formulário abaixo.</span>
          </p>
        </div>

        {status === 'success' ? (
          <div className="max-w-2xl bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle2 size={32} className="text-green-600 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900 mb-2">Mensagem recebida!</h3>
            <p className="text-sm text-muted">
              Nossa equipe entrará em contato em breve. Você também pode nos chamar diretamente no WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="Seu nome"
                className={inputClass}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="(00) 00000-0000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                E-mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="seu@email.com"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Estado
              </label>
              <select value={form.state} onChange={update('state')} className={inputClass}>
                <option value="">Selecione...</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                CNPJ
              </label>
              <input
                type="text"
                value={form.cnpj}
                onChange={update('cnpj')}
                placeholder="00.000.000/0000-00"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-bold text-muted uppercase tracking-wide">
                Descreva brevemente sua situação
              </label>
              <textarea
                value={form.message}
                onChange={update('message')}
                placeholder="Conte o que está acontecendo..."
                rows={4}
                className={cn(inputClass, 'resize-none')}
              />
            </div>

            {status === 'error' && (
              <div className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'sm:col-span-2 bg-vinho text-white font-bold py-4 rounded text-sm tracking-wide',
                'hover:bg-vinho-dark transition-colors',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {status === 'loading' ? 'Enviando...' : 'Solicitar diagnóstico gratuito →'}
            </button>

            <p className="sm:col-span-2 text-xs text-muted text-center">
              Seus dados são tratados com absoluta confidencialidade.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
