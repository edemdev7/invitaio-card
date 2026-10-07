import Button from '@/components/ui/Button'
import { formatDateFr } from '@/lib/utils'
import type { InvitationCard } from '@/types'

const demoCard: InvitationCard = {
  id: 'demo',
  title: 'Mariage de Ama & Koffi',
  eventDate: '2026-12-19',
  location: 'Lomé, Togo',
  hostName: 'Les familles Mensah et Adjo',
}

export default function HomePage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <p className="text-gold-700 text-xs font-medium tracking-[0.2em] uppercase">
          Projet initialisé
        </p>
        <h1 className="font-display text-ink-900 mt-4 text-4xl leading-tight md:text-5xl">
          Créez des cartes d’invitation que l’on garde.
        </h1>
        <p className="text-ink-500 mt-5 text-base leading-relaxed">
          Le squelette front-end est en place : React, TypeScript, Vite, Tailwind et le routeur.
          Remplacez cette page par le premier écran réel de l’application.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Créer une carte</Button>
          <Button variant="ghost">Voir un exemple</Button>
        </div>
      </div>

      <article className="border-ink-200 rounded-2xl border bg-white p-8 shadow-[0_18px_50px_-30px_rgba(28,25,23,0.5)]">
        <div className="border-gold-300 rounded-xl border border-dashed p-8 text-center">
          <p className="text-gold-700 text-xs tracking-[0.25em] uppercase">Vous êtes invité</p>
          <h2 className="font-display text-ink-900 mt-4 text-2xl">{demoCard.title}</h2>
          <p className="text-ink-500 mt-3 text-sm">{formatDateFr(demoCard.eventDate)}</p>
          <p className="text-ink-500 text-sm">{demoCard.location}</p>
          <p className="text-ink-700 mt-6 text-sm italic">{demoCard.hostName}</p>
        </div>
      </article>
    </section>
  )
}
