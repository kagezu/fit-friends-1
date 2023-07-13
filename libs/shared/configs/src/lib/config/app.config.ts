import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { ApplicationEnvironment } from '../application-environment';
import { plainToInstance } from 'class-transformer';

const DEFAULT_PORT = 3333;
const RADIX = 10;

export interface ApplicationConfig {
  environment?: string;
  port: number;
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env['NODE_ENV'],
    port: parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), RADIX)
  };

  const applicationEnvironment = plainToInstance(
    ApplicationEnvironment,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    applicationEnvironment, {
    skipMissingProperties: false
  }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
