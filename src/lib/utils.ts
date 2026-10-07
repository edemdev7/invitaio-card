/** Concatène des classes CSS en ignorant les valeurs vides. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Formate une date ISO en français (ex. « samedi 12 juillet 2026 »). */
export function formatDateFr(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}
