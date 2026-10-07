import { jsPDF } from 'jspdf'

import { HOST_NAME, INVITEE_NAME, MEETING_FULL_LABEL, MEETING_LABEL } from '@/lib/invitation'
import type { Activity } from '@/lib/invitation'

const CREAM: [number, number, number] = [255, 245, 248]
const PINK: [number, number, number] = [242, 86, 127]
const PINK_SOFT: [number, number, number] = [255, 201, 217]
const DEEP: [number, number, number] = [179, 36, 80]
const PLUM: [number, number, number] = [74, 16, 48]

const WIDTH = 148 // A5 portrait, en mm
const CENTER = WIDTH / 2

/** Un coeur plein : deux disques et un triangle. */
function drawHeart(doc: jsPDF, cx: number, cy: number, radius: number) {
  doc.setFillColor(...PINK)
  doc.circle(cx - radius, cy, radius, 'F')
  doc.circle(cx + radius, cy, radius, 'F')
  doc.triangle(cx - 2 * radius, cy, cx + 2 * radius, cy, cx, cy + 2.2 * radius, 'F')
}

function spaced(text: string): string {
  return text.split('').join(' ')
}

/** Génère la carte en PDF et déclenche son téléchargement. */
export function downloadInvitationPdf(activity: Activity): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a5', orientation: 'portrait' })

  // Fond
  doc.setFillColor(...CREAM)
  doc.rect(0, 0, WIDTH, 210, 'F')

  // Carte blanche
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(...PINK_SOFT)
  doc.setLineWidth(0.3)
  doc.roundedRect(11, 13, WIDTH - 22, 184, 5, 5, 'FD')

  // Sur-titre
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(...PINK)
  doc.text(spaced("CARTE D'INVITATION"), CENTER, 31, { align: 'center' })

  // Nom
  doc.setFont('times', 'italic')
  doc.setFontSize(26)
  doc.setTextColor(...PLUM)
  doc.text(INVITEE_NAME, CENTER, 46, { align: 'center' })

  drawHeart(doc, CENTER, 54, 2.1)

  // Intro
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(...PLUM)
  doc.text("Voici un aperçu de ce qui nous attend demain.", CENTER, 70, { align: 'center' })

  // Encadré du rendez-vous
  doc.setFillColor(...CREAM)
  doc.setDrawColor(...PINK_SOFT)
  doc.setLineDashPattern([1, 1], 0)
  doc.roundedRect(22, 80, WIDTH - 44, 82, 4, 4, 'FD')
  doc.setLineDashPattern([], 0)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.5)
  doc.setTextColor(...PINK)
  doc.text(spaced('RENDEZ-VOUS'), CENTER, 92, { align: 'center' })

  doc.setFont('times', 'normal')
  doc.setFontSize(19)
  doc.setTextColor(...PLUM)
  doc.text(MEETING_LABEL, CENTER, 104, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...DEEP)
  doc.text(MEETING_FULL_LABEL, CENTER, 111, { align: 'center' })

  // Séparateur
  doc.setDrawColor(...PINK_SOFT)
  doc.setLineWidth(0.25)
  doc.line(34, 120, WIDTH - 34, 120)

  // Programme
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.5)
  doc.setTextColor(...PINK)
  doc.text(spaced('NOTRE PROGRAMME'), CENTER, 130, { align: 'center' })

  doc.setFont('times', 'normal')
  doc.setFontSize(14)
  doc.setTextColor(...PLUM)
  doc.text(activity.title, CENTER, 140, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...DEEP)
  const detail = doc.splitTextToSize(activity.detail, WIDTH - 60) as string[]
  doc.text(detail, CENTER, 148, { align: 'center' })

  // Signature
  doc.setFont('times', 'italic')
  doc.setFontSize(15)
  doc.setTextColor(...PLUM)
  doc.text(`— ${HOST_NAME}`, CENTER, 180, { align: 'center' })

  doc.save('invitation-naomie.pdf')
}
