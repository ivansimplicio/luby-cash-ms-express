import dotenv from 'dotenv';

dotenv.config();

const mailConfig = {
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
  logger: false,
  debug: false,
  tls: { rejectUnauthorized: false },
};

export default mailConfig;
