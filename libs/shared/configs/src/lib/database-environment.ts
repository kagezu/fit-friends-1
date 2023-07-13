import { IsNumber, IsString, Max, Min } from 'class-validator';

enum RangeOfPort {
  MinPort = 0,
  MaxPort = 65535
}

export enum DatabaseValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
}

export class DatabaseEnvironment {
  @IsString({
    message: DatabaseValidationMessage.DBNameRequired
  })
  public name!: string;

  @IsString({
    message: DatabaseValidationMessage.DBHostRequired
  })
  public host!: string;

  @IsNumber({}, {
    message: DatabaseValidationMessage.DBPortRequired
  })
  @Min(RangeOfPort.MinPort)
  @Max(RangeOfPort.MaxPort)
  public port!: number;

  @IsString({
    message: DatabaseValidationMessage.DBUserRequired
  })
  public user!: string;

  @IsString({
    message: DatabaseValidationMessage.DBPasswordRequired
  })
  public password!: string;

  @IsString({
    message: DatabaseValidationMessage.DBBaseAuthRequired
  })
  public authBase!: string;
}
