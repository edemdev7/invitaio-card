import { Link, Outlet } from 'react-router'

const currentYear = new Date().getFullYear()

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-ink-200/70 border-b">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-ink-900 text-xl tracking-tight">
            Invitaio
          </Link>
          <span className="text-ink-500 text-sm">Cartes d’invitation</span>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-ink-200/70 text-ink-500 border-t px-6 py-6 text-center text-sm">
        © {currentYear} Invitaio
      </footer>
    </div>
  )
}
