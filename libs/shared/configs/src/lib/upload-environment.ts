import { IsString } from 'class-validator';

export enum UploadValidationMessage {
  ServeRootRequired = 'ServeRoot is required',
  UploadDirectoryRequired = 'Upload directory is required',
}

export class UploadEnvironment {

  @IsString({
    message: UploadValidationMessage.ServeRootRequired
  })
  serveRoot?: string;

  @IsString({
    message: UploadValidationMessage.UploadDirectoryRequired
  })
  uploadDirectory?: string;
}
