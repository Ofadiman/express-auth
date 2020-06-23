import sendgrid from '@sendgrid/mail'

import { APP_CONFIG } from 'app/app.config'
import { ISendPasswordResetEmailConfig } from 'email/typescript/SendPasswordResetEmailConfig.interface'
import { ISendRegistrationEmailConfig } from 'email/typescript/SendRegistrationEmailConfig.interface'

const sendRegistrationEmail = async (config: ISendRegistrationEmailConfig) => {
  const { jwt, username, to } = config

  sendgrid.setApiKey(APP_CONFIG.EMAIL_SERVICE_API_KEY)

  const emailData = {
    from: APP_CONFIG.EMAIL_FROM,
    html: `<p>Hello ${username}. Visit: </p><p>${APP_CONFIG.CLIENT_URL}/auth/activate-account/${jwt}</p>`,
    subject: 'Express utils account activation.',
    to: APP_CONFIG.EMAIL_TO || to
  }

  await sendgrid.send(emailData)
}

const sendPasswordResetEmail = async (config: ISendPasswordResetEmailConfig) => {
  const { passwordResetJwt, to } = config

  sendgrid.setApiKey(APP_CONFIG.EMAIL_SERVICE_API_KEY)

  const emailData = {
    from: APP_CONFIG.EMAIL_FROM,
    html: `<p>Hello. Visit: </p><p>${APP_CONFIG.CLIENT_URL}/auth/reset-password/${passwordResetJwt}</p>`,
    subject: 'Express utils account activation.',
    to: APP_CONFIG.EMAIL_TO || to
  }

  await sendgrid.send(emailData)
}

export const emailService = { sendRegistrationEmail, sendPasswordResetEmail }
