import { Link, useNavigate } from 'react-router'

import Button from '@/components/ui/Button'

import HeartsBackground from '@/components/HeartsBackground'

export default function YesPage() {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <HeartsBackground />

      <main className="rise-in border-love-100 relative z-10 w-full max-w-xl rounded-[2rem] border bg-white/80 px-7 py-12 text-center shadow-[0_30px_80px_-50px_rgba(74,16,48,0.55)] backdrop-blur-sm sm:px-12">
        <p className="pop-in text-6xl">😲</p>

        <h1 className="font-display text-love-600 pop-in mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
          WOUAH !
        </h1>

        <p className="text-love-500 mt-4 text-sm font-semibold tracking-[0.25em] uppercase">
          Tu as dit oui
        </p>

        <p className="heartbeat mt-8 text-5xl">💗</p>

        <p className="font-display text-plum-900 mt-8 text-xl leading-relaxed sm:text-2xl">
          Je ne m’attendais pas à ça, et tu viens de rendre ma journée bien plus belle —
          probablement toute ma semaine aussi.
        </p>


        <Button onClick={() => void navigate('/activite')} className="mt-9">
          Choisir notre programme →
        </Button>

        <Link
          to="/"
          className="text-love-500 mt-10 inline-block text-xs underline underline-offset-4"
        >
          revenir en arrière (mais pourquoi ?)
        </Link>
      </main>
    </div>
  )
}
