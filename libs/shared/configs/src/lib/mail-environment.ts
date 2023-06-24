import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum MailValidationMessage {
  MailHostRequired = 'Mail host is required',
  MailPortRequired = 'Mail port is required',
  MailUserRequired = 'Mail user is required',
  MailPasswordRequired = 'Mail password is required',
  MailBaseAuthRequired = 'from is required',
}

export class MailEnvironment {
  @IsString({
    message: MailValidationMessage.MailHostRequired
  })
  public host!: string;

  @IsNumber({}, {
    message: MailValidationMessage.MailPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port!: number;

  @IsString({
    message: MailValidationMessage.MailUserRequired
  })
  public user!: string;

  @IsString({
    message: MailValidationMessage.MailPasswordRequired
  })
  public password!: string;

  @IsString({
    message: MailValidationMessage.MailBaseAuthRequired
  })
  public from!: string;
}
