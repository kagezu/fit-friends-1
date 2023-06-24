import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum ApplicationValidationMessage {
  AppPortRequired = 'App port is required',
  AppEnvironmentRequired = 'MongoDB user is required'
}

export class ApplicationEnvironment {

  @IsString({
    message: ApplicationValidationMessage.AppEnvironmentRequired
  })
  public environment!: string;

  @IsNumber({}, {
    message: ApplicationValidationMessage.AppPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port!: number;
}
