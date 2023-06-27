import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dbConfig, jwtConfig, uploadConfig } from '@fit-friends-1/shared/configs';

const ENV_APP_FILE_PATH = 'apps/app/.app.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, uploadConfig],
      envFilePath: ENV_APP_FILE_PATH
    }),
  ]
})
export class ConfigAppModule { }
