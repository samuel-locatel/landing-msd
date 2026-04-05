import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface NotificationPayload {
  name: string
  phone?: string | null
  email?: string | null
  state?: string | null
  message?: string | null
}

export async function sendNotification(contact: NotificationPayload): Promise<void> {
  const to = process.env.NOTIFICATION_EMAIL
  if (!to) return

  await resend.emails.send({
    from: 'noreply@msdassessoria.com.br',
    to,
    subject: `Novo lead: ${contact.name}`,
    html: `
      <h2>Novo contato via site</h2>
      <p><strong>Nome:</strong> ${contact.name}</p>
      ${contact.phone ? `<p><strong>Telefone:</strong> ${contact.phone}</p>` : ''}
      ${contact.email ? `<p><strong>Email:</strong> ${contact.email}</p>` : ''}
      ${contact.state ? `<p><strong>Estado:</strong> ${contact.state}</p>` : ''}
      ${contact.message ? `<p><strong>Situação:</strong> ${contact.message}</p>` : ''}
    `,
  })
}
