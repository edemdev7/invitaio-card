import { Navigate } from 'react-router'

import HeartsBackground from '@/components/HeartsBackground'
import Button from '@/components/ui/Button'
import {
  getChosenActivity,
  INVITEE_NAME,
  MEETING_FULL_LABEL,
  MEETING_LABEL,
} from '@/lib/invitation'
import { isMailConfigured } from '@/lib/mail'
import { downloadInvitationPdf } from '@/lib/pdf'

export default function ConfirmationPage() {
  const activity = getChosenActivity()

  if (!activity) {
    return <Navigate to="/activite" replace />
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <HeartsBackground />

      <main className="rise-in border-love-100 relative z-10 w-full max-w-xl rounded-[2rem] border bg-white/80 px-7 py-12 text-center shadow-[0_30px_80px_-50px_rgba(74,16,48,0.55)] backdrop-blur-sm sm:px-12">
        <p className="pop-in text-5xl">💌</p>

        <h1 className="font-script text-plum-900 mt-5 text-4xl leading-tight sm:text-5xl">
          C’est noté, {INVITEE_NAME.split(' ')[0]}
        </h1>

        <div className="border-love-200 bg-love-50/80 mt-9 rounded-2xl border border-dashed px-6 py-7">
          <p className="text-love-500 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
            Notre rendez-vous
          </p>
          <p className="font-display text-plum-900 heartbeat mt-4 text-3xl sm:text-4xl">
            {MEETING_LABEL}
          </p>
          <p className="text-love-700 mt-3 text-sm first-letter:uppercase">{MEETING_FULL_LABEL}</p>

          <div className="border-love-200/70 mt-6 border-t pt-6">
            <p className="text-3xl">{activity.emoji}</p>
            <p className="font-display text-plum-900 mt-2 text-lg">{activity.title}</p>
            <p className="text-love-700/80 mt-2 text-sm leading-relaxed">{activity.detail}</p>
          </div>
        </div>

        <p className="text-love-700 mt-8 text-sm leading-relaxed sm:text-base">
          Tu vas recevoir un mail avec les détails, je suis impatient de te voir.
        </p>

        <Button
          variant="ghost"
          onClick={() => downloadInvitationPdf(activity)}
          className="mt-7 text-sm"
        >
          Télécharger ma carte en PDF
        </Button>

        {!isMailConfigured && (
          <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
            Mode démo : EmailJS n’est pas encore configuré, aucun mail n’a réellement été envoyé.
          </p>
        )}
      </main>
    </div>
  )
}
