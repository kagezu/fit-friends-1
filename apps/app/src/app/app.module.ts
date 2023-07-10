import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { getMongooseOptions } from '@fit-friends-1/shared/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigAppModule } from '@fit-friends-1/config/config-app';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { FileModule } from './file/file.module';
import { TrainingModule } from './training/training.module';
import { OrderModule } from './order/order.module';
import { FriendModule } from './friend/friend.module';
import { UserBalanceModule } from './user-balance/user-balance.module';
import { MailModule } from './mail/mail.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { NotifyModule } from './notify/notify.module';
import { PersonalOrderModule } from './personal-order/personal-order.module';
import { ReviewModule } from './review/review.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    FileModule,
    AuthModule,
    UserModule,
    ConfigAppModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    RefreshTokenModule,
    TrainingModule,
    OrderModule,
    FriendModule,
    UserBalanceModule,
    MailModule,
    SubscriberModule,
    NotifyModule,
    PersonalOrderModule,
    ReviewModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
