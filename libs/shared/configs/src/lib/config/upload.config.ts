import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { UploadEnvironment } from '../upload-environment';
import { plainToInstance } from 'class-transformer';

export interface UploadConfig {
  serveRoot?: string;
  uploadDirectory?: string;
}

export default registerAs('upload', (): UploadConfig => {
  const config: UploadConfig = {
    serveRoot: process.env['SERVE_ROOT'],
    uploadDirectory: process.env['UPLOAD_DIRECTORY_PATH'],
  };

  const uploadEnvironment = plainToInstance(
    UploadEnvironment,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    uploadEnvironment, {
    skipMissingProperties: false
  }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
