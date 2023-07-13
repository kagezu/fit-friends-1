import { IsNumber, IsString, Max, Min } from 'class-validator';

enum RangeOfPort {
  MinPort = 0,
  MaxPort = 65535
}

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
  @Min(RangeOfPort.MinPort)
  @Max(RangeOfPort.MaxPort)
  public port!: number;
}
