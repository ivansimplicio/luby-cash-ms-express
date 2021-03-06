import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'nodemailer-express-handlebars';
import mailConfig from '../../config/mail';
import handlebarsConfig from '../../config/handlebars';
import dotenv from 'dotenv';

dotenv.config();

class Mailer {
  private transporter: Transporter;
  private handlebarsConfig: any;

  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig);
    this.handlebarsConfig = handlebarsConfig;
  }

  async sendEmail(template: string, subject: string, user: any, content: any) {
    this.transporter.use('compile', handlebars(this.handlebarsConfig));
    const mailer = {
      from: process.env.SMTP_EMAIL_SENDER,
      to: user.email,
      subject: subject.toString(),
      template: template.toString(),
      context: { user, content },
    };
    await this.transporter.sendMail(mailer);
  }
}

export default new Mailer();
