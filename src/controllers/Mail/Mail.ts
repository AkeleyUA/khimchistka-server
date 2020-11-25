import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { google } from "googleapis";
import dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_ULR
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export class MailController {
  public async mailer(message: object) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const smtpConfig = {
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.USER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken,
        },
      } as SMTPTransport;
      const transport = createTransport(smtpConfig);
      await transport.sendMail(message, (err: Error) => {
        if (err) {
          return console.error(err);
        }
        console.log("Email sent");
      });
    } catch (e) {
      console.error(e);
    }
  }
}
