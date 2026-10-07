export type ActivityId = 'manger-promenade' | 'jeux-manger'

export type Activity = {
  id: ActivityId
  emoji: string
  title: string
  detail: string
}

export const INVITEE_NAME = 'Naomie Carelle'
export const HOST_NAME = 'Edem'

/** Date du rendez-vous. À changer ici si la date bouge. */
export const MEETING_ISO = '2026-10-08T14:00:00'

export const MEETING_LABEL = 'Demain à 14h00'

export const MEETING_FULL_LABEL = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(MEETING_ISO))

export const ACTIVITIES: Activity[] = [
  {
    id: 'manger-promenade',
    emoji: '🍽️',
    title: 'Manger et se promener',
    detail: 'On mange tranquillement, puis on marche et on parle sans regarder l’heure.',
  },
  {
    id: 'jeux-manger',
    emoji: '🎮',
    title: 'Centre de jeux, manger, et rentrer',
    detail: 'On va jouer dans un centre de jeux, on mange ensuite, et je te ramène.',
  },
]

export function findActivity(id: string | null): Activity | null {
  return ACTIVITIES.find((activity) => activity.id === id) ?? null
}

/* --- Choix conservé entre les pages (survit à un rafraîchissement) --- */

const CHOICE_KEY = 'invitaio:activity'
const EMAIL_KEY = 'invitaio:email'

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // mode privé / stockage bloqué : on continue sans persistance
  }
}

export const getChosenActivity = () => findActivity(read(CHOICE_KEY))
export const setChosenActivity = (id: ActivityId) => write(CHOICE_KEY, id)
export const getInviteeEmail = () => read(EMAIL_KEY)
export const setInviteeEmail = (email: string) => write(EMAIL_KEY, email)
