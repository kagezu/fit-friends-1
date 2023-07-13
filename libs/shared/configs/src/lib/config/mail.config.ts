import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { MailEnvironment } from '../mail-environment';
import { plainToInstance } from 'class-transformer';

const DEFAULT_SMTP_PORT = 25;
const RADIX = 10;

export interface MailConfig {
  host?: string;
  port: number;
  user?: string;
  password?: string;
  from?: string;
}

export default registerAs('mail', (): MailConfig => {
  const config: MailConfig = {
    host: process.env['MAIL_SMTP_HOST'],
    port: parseInt(process.env['MAIL_SMTP_PORT'] ?? DEFAULT_SMTP_PORT.toString(), RADIX),
    user: process.env['MAIL_USER_NAME'],
    password: process.env['MAIL_USER_PASSWORD'],
    from: process.env['MAIL_FROM'],
  };

  const mailEnvironment = plainToInstance(
    MailEnvironment,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    mailEnvironment, {
    skipMissingProperties: false
  }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
