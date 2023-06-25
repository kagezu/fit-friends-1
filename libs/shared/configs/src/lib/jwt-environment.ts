import { IsString } from 'class-validator';

export enum JwtValidationMessage {
  TokenSecretRequired = 'Token secret is required',
  TokenExpiresInRequired = 'Token expires is required'
}

export class JwtEnvironment {

  @IsString({
    message: JwtValidationMessage.TokenSecretRequired
  })
  accessTokenSecret!: string;

  @IsString({
    message: JwtValidationMessage.TokenSecretRequired
  })
  accessTokenExpiresIn!: string;

  @IsString({
    message: JwtValidationMessage.TokenSecretRequired
  })
  refreshTokenSecret!: string;

  @IsString({
    message: JwtValidationMessage.TokenSecretRequired
  })
  refreshTokenExpiresIn!: string;
}
