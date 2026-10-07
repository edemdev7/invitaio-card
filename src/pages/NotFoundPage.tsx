import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="text-gold-700 text-xs font-medium tracking-[0.2em] uppercase">Erreur 404</p>
      <h1 className="font-display text-ink-900 mt-4 text-3xl">Cette page n’existe pas</h1>
      <p className="text-ink-500 mt-4 text-sm">
        Le lien est peut-être expiré ou la carte a été supprimée.
      </p>
      <Link to="/" className="text-ink-900 mt-8 inline-block text-sm underline underline-offset-4">
        Retour à l’accueil
      </Link>
    </section>
  )
}
