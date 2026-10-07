import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-4xl">💔</p>
      <h1 className="font-display text-plum-900 mt-6 text-2xl">Cette page n’existe pas</h1>
      <Link to="/" className="text-love-500 mt-6 inline-block text-sm underline underline-offset-4">
        Retour au début
      </Link>
    </section>
  )
}
