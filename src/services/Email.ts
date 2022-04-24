const nodemailer = require('nodemailer');

interface SendEmail {
  bodyEmail: {
    email?: string;
    bcc?: Array<string>;
    subject: string;
    html: string;
  };
  apiKeys?: {
    USER_SMTP?: string | null;
    PASSWORD_SMTP?: string | null;
    SENDERNAME_SMTP?: string | null;
    EMAIL_SMTP?: string | null;
    HOST?: string | null;
  };
}

const initialEmail = (data: SendEmail) => ({
  bodyEmail: {
    email: data.bodyEmail.email,
    bcc: data.bodyEmail.bcc,
    subject: data.bodyEmail.subject,
    html: data.bodyEmail.html,
  },
  apiKeys: {
    USER_SMTP: data.apiKeys?.USER_SMTP || `${process.env.EMAIL_USER_SMTP}`,
    PASSWORD_SMTP:
      data.apiKeys?.PASSWORD_SMTP || `${process.env.EMAIL_PASSWORD_SMTP}`,
    SENDERNAME_SMTP:
      data.apiKeys?.SENDERNAME_SMTP || `${process.env.EMAIL_SENDERNAME_SMTP}`,
    EMAIL_SMTP: data.apiKeys?.EMAIL_SMTP || `${process.env.EMAIL_EMAIL_SMTP}`,
    HOST: data.apiKeys?.HOST || `${process.env.EMAIL_HOST}`,
  },
});

export default class EmailSMTP {
  async sendEmail(params: SendEmail) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataEmail = initialEmail(params);
        let transporter = nodemailer.createTransport({
          host: `${dataEmail.apiKeys.HOST}`,
          auth: {
            user: dataEmail.apiKeys.USER_SMTP, // generated ethereal user
            pass: dataEmail.apiKeys.PASSWORD_SMTP, // generated ethereal password
          },
        });
        // Bcc or only one recipient email
        const recipientType = dataEmail.bodyEmail.email ? { to: `${dataEmail.bodyEmail.email}` } : { bcc: dataEmail.bodyEmail.email }
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"${dataEmail.apiKeys.SENDERNAME_SMTP}" <${dataEmail.apiKeys.EMAIL_SMTP}>`, // sender address
          ...recipientType,
          subject: `${dataEmail.bodyEmail.subject}`, // Subject line
          html: `${dataEmail.bodyEmail.html}`, // html body
        });

        if (info.messageId) {
          resolve(info);
        }
      } catch (error) {
          return reject(error);
      }
    });
  }
}
