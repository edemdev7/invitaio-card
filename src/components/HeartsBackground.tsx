import type { CSSProperties } from 'react'

const HEART_COUNT = 18

// Généré une seule fois au chargement du module : pas d'aléatoire pendant le render.
const hearts = Array.from({ length: HEART_COUNT }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  size: 12 + Math.random() * 26,
  duration: 12 + Math.random() * 12,
  delay: -Math.random() * 18,
  drift: `${(Math.random() - 0.5) * 12}rem`,
  opacity: 0.25 + Math.random() * 0.45,
}))

export default function HeartsBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-float absolute bottom-0 select-none"
          style={
            {
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
              '--duration': `${heart.duration}s`,
              '--delay': `${heart.delay}s`,
              '--drift': heart.drift,
            } as CSSProperties
          }
        >
          💗
        </span>
      ))}
    </div>
  )
}
