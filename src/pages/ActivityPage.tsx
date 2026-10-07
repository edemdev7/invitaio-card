import { useState } from 'react'
import { useNavigate } from 'react-router'

import HeartsBackground from '@/components/HeartsBackground'
import Button from '@/components/ui/Button'
import { ACTIVITIES, setChosenActivity } from '@/lib/invitation'
import type { ActivityId } from '@/lib/invitation'
import { cn } from '@/lib/utils'

export default function ActivityPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<ActivityId | null>(null)

  function confirm() {
    if (!selected) return
    setChosenActivity(selected)
    void navigate('/carte')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <HeartsBackground />

      <main className="rise-in border-love-100 relative z-10 w-full max-w-2xl rounded-[2rem] border bg-white/80 px-7 py-12 text-center shadow-[0_30px_80px_-50px_rgba(74,16,48,0.55)] backdrop-blur-sm sm:px-12">
        <p className="text-love-500 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
          Étape 2
        </p>

        <h1 className="font-display text-plum-900 mt-5 text-3xl leading-snug sm:text-4xl">
          À toi de choisir notre programme
        </h1>

        <p className="text-love-700 mt-4 text-sm sm:text-base">
          Les deux me vont très bien. C’est toi qui décides 💗
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {ACTIVITIES.map((activity) => {
            const isSelected = selected === activity.id

            return (
              <button
                key={activity.id}
                type="button"
                onClick={() => setSelected(activity.id)}
                aria-pressed={isSelected}
                className={cn(
                  'focus-visible:ring-love-400 flex h-full flex-col items-center rounded-2xl border-2 px-6 py-7 text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  isSelected
                    ? 'border-love-500 bg-love-50 scale-[1.02] shadow-[0_18px_40px_-24px_rgba(222,60,103,0.7)]'
                    : 'border-love-100 hover:border-love-300 bg-white/70 hover:bg-white',
                )}
              >
                <span className="text-4xl">{activity.emoji}</span>
                <span className="font-display text-plum-900 mt-4 text-lg leading-snug">
                  {activity.title}
                </span>
                <span className="text-love-700/80 mt-3 text-sm leading-relaxed">
                  {activity.detail}
                </span>
                <span
                  className={cn(
                    'mt-5 text-xs font-semibold tracking-wide uppercase transition',
                    isSelected ? 'text-love-600' : 'text-love-300',
                  )}
                >
                  {isSelected ? '✓ Choisi' : 'Choisir'}
                </span>
              </button>
            )
          })}
        </div>

        <Button onClick={confirm} disabled={!selected} className="mt-10 disabled:opacity-40">
          {selected ? 'Continuer 💗' : 'Choisis une option'}
        </Button>
      </main>
    </div>
  )
}
