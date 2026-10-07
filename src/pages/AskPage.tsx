import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router'

import HeartsBackground from '@/components/HeartsBackground'
import Button from '@/components/ui/Button'

const INVITEE = 'Naomie Carelle'

const PLEAS = [
  'Attends… tu veux vraiment dire non ? 🥺',
  'Réfléchis encore un tout petit peu, stp 🙏',
  'Ce bouton est timide, il n’aime pas être cliqué 😅',
  'Sérieusement ? C’est juste un date… 💔',
  'Et si tu essayais le bouton rose plutôt ? 💗',
  'Je peux insister très, très longtemps 😌',
  'Naomie… stp 🥹',
  'Bon, le « Non » commence à fatiguer 😩',
  'Tu vois bien qu’il ne veut pas 🫠',
  'Allez, dis oui et on n’en parle plus 💞',
]

const MARGIN = 16

type Position = { top: number; left: number }

function randomSpot(width: number, height: number): Position {
  const maxLeft = Math.max(MARGIN, window.innerWidth - width - MARGIN)
  const maxTop = Math.max(MARGIN, window.innerHeight - height - MARGIN)

  return {
    left: MARGIN + Math.random() * (maxLeft - MARGIN),
    top: MARGIN + Math.random() * (maxTop - MARGIN),
  }
}

export default function AskPage() {
  const navigate = useNavigate()
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const [dodges, setDodges] = useState(0)
  const [position, setPosition] = useState<Position | null>(null)

  // Si la fenêtre change de taille, on remet le bouton dans l'écran.
  useEffect(() => {
    if (!position) return

    function clamp() {
      const element = noButtonRef.current
      if (!element) return

      const { width, height } = element.getBoundingClientRect()
      setPosition((current) => {
        if (!current) return current
        return {
          left: Math.min(current.left, Math.max(MARGIN, window.innerWidth - width - MARGIN)),
          top: Math.min(current.top, Math.max(MARGIN, window.innerHeight - height - MARGIN)),
        }
      })
    }

    window.addEventListener('resize', clamp)
    return () => window.removeEventListener('resize', clamp)
  }, [position])

  const yesScale = 1 + Math.min(dodges, 8) * 0.085
  const noScale = Math.max(0.72, 1 - dodges * 0.03)

  function dodge() {
    const element = noButtonRef.current
    const rect = element?.getBoundingClientRect()

    setPosition(randomSpot(rect?.width ?? 110, rect?.height ?? 52))
    setDodges((count) => count + 1)

    if ('vibrate' in navigator) {
      navigator.vibrate(25)
    }
  }

  const noButton = (
    <Button
      ref={noButtonRef}
      variant="ghost"
      onClick={dodge}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') dodge()
      }}
      className={position ? 'fixed z-50 transition-all duration-300 ease-out' : undefined}
      style={
        position
          ? { top: position.top, left: position.left, transform: `scale(${noScale})` }
          : { transform: `scale(${noScale})` }
      }
    >
      Non
    </Button>
  )

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <HeartsBackground />

      <main className="rise-in border-love-100 relative z-10 w-full max-w-xl rounded-[2rem] border bg-white/80 px-7 py-12 text-center shadow-[0_30px_80px_-50px_rgba(74,16,48,0.55)] backdrop-blur-sm sm:px-12">
        <p className="text-love-500 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
          Pour toi, et seulement toi
        </p>

        <h1 className="font-script text-plum-900 mt-5 text-5xl leading-tight sm:text-6xl">
          {INVITEE}
        </h1>

        <p className="heartbeat mt-6 text-4xl">💗</p>

        <h2 className="font-display text-plum-900 mt-6 text-2xl leading-snug sm:text-3xl">
          Est-ce que tu accepterais d’aller à un date avec moi ?
        </h2>

        <p
          key={dodges}
          className="rise-in text-love-700 mt-5 min-h-12 text-sm sm:text-base"
          aria-live="polite"
        >
          {dodges === 0
            ? 'Prends ton temps… mais pas trop 😊'
            : PLEAS[(dodges - 1) % PLEAS.length]}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={() => void navigate('/oui')}
            className="transition-transform duration-300"
            style={{ transform: `scale(${yesScale})` }}
          >
            Oui 💗
          </Button>

          {/* Tant qu'il n'a pas bougé, le bouton reste dans la carte. Dès qu'il fuit,
              il passe par un portal sur <body> : sinon le backdrop-blur de la carte
              servirait de référentiel au position:fixed et le bouton serait rogné. */}
          {!position && noButton}
        </div>
      </main>

      {position && createPortal(noButton, document.body)}
    </div>
  )
}
