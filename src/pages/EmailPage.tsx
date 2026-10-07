import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'

import HeartsBackground from '@/components/HeartsBackground'
import Button from '@/components/ui/Button'
import { getChosenActivity, setInviteeEmail } from '@/lib/invitation'
import { sendInvitationEmails } from '@/lib/mail'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function EmailPage() {
  const navigate = useNavigate()
  const activity = getChosenActivity()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  if (!activity) {
    return <Navigate to="/activite" replace />
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const value = email.trim()
    if (!EMAIL_PATTERN.test(value)) {
      setStatus('error')
      setError('Cette adresse ne ressemble pas à un email 🙈')
      return
    }

    setStatus('sending')
    setError(null)

    try {
      await sendInvitationEmails({ email: value, activity: activity! })
      setInviteeEmail(value)
      void navigate('/confirmation')
    } catch (sendError) {
      console.error(sendError)
      setStatus('error')
      setError("L'envoi a échoué. Réessaie dans un instant 💗")
    }
  }

  const isSending = status === 'sending'

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <HeartsBackground />

      <main className="rise-in border-love-100 relative z-10 w-full max-w-xl rounded-[2rem] border bg-white/80 px-7 py-12 text-center shadow-[0_30px_80px_-50px_rgba(74,16,48,0.55)] backdrop-blur-sm sm:px-12">
        <p className="text-love-500 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
          Dernière étape
        </p>

        <h1 className="font-display text-plum-900 mt-5 text-3xl leading-snug sm:text-4xl">
          Où est-ce que je t’envoie la carte ?
        </h1>

        <p className="text-love-700 mt-4 text-sm leading-relaxed sm:text-base">
          Laisse-moi ton adresse email : tu recevras ta carte d’invitation avec notre programme
          <span className="whitespace-nowrap"> {activity.emoji}</span>
        </p>

        <form onSubmit={(event) => void submit(event)} className="mt-8">
          <label htmlFor="email" className="sr-only">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status === 'error') {
                setStatus('idle')
                setError(null)
              }
            }}
            placeholder="ton.adresse@email.com"
            disabled={isSending}
            className="border-love-200 text-plum-900 placeholder:text-love-300 focus:border-love-400 focus:ring-love-200 w-full rounded-2xl border bg-white px-5 py-4 text-center text-base transition focus:ring-4 focus:outline-none disabled:opacity-60"
          />

          <p className="min-h-6 pt-3 text-sm text-red-500" aria-live="polite">
            {error}
          </p>

          <Button type="submit" disabled={isSending} className="mt-2 disabled:opacity-50">
            {isSending ? 'Envoi en cours…' : 'Recevoir ma carte 💌'}
          </Button>
        </form>

        <p className="text-love-400 mt-7 text-xs leading-relaxed">
          Ton adresse ne sert qu’à t’envoyer cette carte. Rien d’autre, promis.
        </p>
      </main>
    </div>
  )
}
