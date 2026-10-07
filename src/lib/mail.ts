import { HOST_NAME, INVITEE_NAME, MEETING_FULL_LABEL, MEETING_LABEL } from '@/lib/invitation'
import type { Activity } from '@/lib/invitation'

const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

export const HOST_EMAIL = import.meta.env.VITE_HOST_EMAIL ?? 'ekpomachi@gmail.com'

type MailConfig = {
  serviceId: string
  publicKey: string
  templateInvitee: string
  templateHost: string
}

function readConfig(): MailConfig | null {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const templateInvitee = import.meta.env.VITE_EMAILJS_TEMPLATE_INVITEE
  const templateHost = import.meta.env.VITE_EMAILJS_TEMPLATE_HOST

  if (!serviceId || !publicKey || !templateInvitee || !templateHost) {
    return null
  }

  return { serviceId, publicKey, templateInvitee, templateHost }
}

const config = readConfig()

export const isMailConfigured = config !== null

async function sendTemplate(
  mail: MailConfig,
  templateId: string,
  params: Record<string, string>,
): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: mail.serviceId,
      template_id: templateId,
      user_id: mail.publicKey,
      template_params: params,
    }),
  })

  if (!response.ok) {
    throw new Error(`EmailJS ${response.status} : ${await response.text()}`)
  }
}

/**
 * Envoie la carte à l'invitée puis la confirmation à l'hôte.
 * Tant qu'EmailJS n'est pas configuré, l'envoi est simulé (utile en dev).
 */
export async function sendInvitationEmails(input: {
  email: string
  activity: Activity
}): Promise<void> {
  const params = {
    invitee_name: INVITEE_NAME,
    invitee_email: input.email,
    host_name: HOST_NAME,
    host_email: HOST_EMAIL,
    activity_title: input.activity.title,
    activity_detail: input.activity.detail,
    activity_emoji: input.activity.emoji,
    meeting_label: MEETING_LABEL,
    meeting_full_label: MEETING_FULL_LABEL,
    answered_at: new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date()),
  }

  if (!config) {
    console.warn('[mail] EmailJS non configuré — envoi simulé', params)
    await new Promise((resolve) => setTimeout(resolve, 900))
    return
  }

  // Les deux mails partent du Gmail connecté à EmailJS.
  await sendTemplate(config, config.templateInvitee, { ...params, to_email: input.email })
  await sendTemplate(config, config.templateHost, { ...params, to_email: HOST_EMAIL })
}
