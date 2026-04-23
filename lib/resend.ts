import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

export async function sendInviteEmail({
  to,
  workspaceName,
  inviteUrl,
}: {
  to: string
  workspaceName: string
  inviteUrl: string
}): Promise<{ error?: string }> {
  const safeName = escapeHtml(workspaceName)
  // inviteUrl é gerado internamente — validamos que é https antes de colocar no href
  const safeUrl = inviteUrl.startsWith("https://") || inviteUrl.startsWith("http://localhost")
    ? inviteUrl
    : "#"

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@piperflow.com.br",
    to,
    subject: `Você foi convidado para ${safeName} no PipeFlow CRM`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 8px">Convite para ${safeName}</h2>
        <p style="color:#555;margin:0 0 24px">
          Você foi convidado para colaborar no workspace <strong>${safeName}</strong> no PipeFlow CRM.
          O convite expira em 7 dias.
        </p>
        <a href="${safeUrl}"
           style="display:inline-block;background:#0f172a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
          Aceitar convite
        </a>
        <p style="color:#999;font-size:12px;margin:24px 0 0">
          Se você não esperava este convite, pode ignorar este e-mail.
        </p>
      </div>
    `,
  })
  if (error) return { error: error.message }
  return {}
}
