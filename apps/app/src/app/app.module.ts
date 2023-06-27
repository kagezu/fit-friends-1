import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { getMongooseOptions } from '@fit-friends-1/shared/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigAppModule } from '@fit-friends-1/config/config-app';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    AuthModule,
    UserModule,
    ConfigAppModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
