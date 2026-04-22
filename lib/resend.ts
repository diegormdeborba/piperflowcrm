import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInviteEmail({
  to,
  workspaceName,
  inviteUrl,
}: {
  to: string
  workspaceName: string
  inviteUrl: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@piperflow.com.br",
    to,
    subject: `Você foi convidado para ${workspaceName} no PipeFlow CRM`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 8px">Convite para ${workspaceName}</h2>
        <p style="color:#555;margin:0 0 24px">
          Você foi convidado para colaborar no workspace <strong>${workspaceName}</strong> no PipeFlow CRM.
          O convite expira em 7 dias.
        </p>
        <a href="${inviteUrl}"
           style="display:inline-block;background:#0f172a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
          Aceitar convite
        </a>
        <p style="color:#999;font-size:12px;margin:24px 0 0">
          Se você não esperava este convite, pode ignorar este e-mail.
        </p>
      </div>
    `,
  })
}
