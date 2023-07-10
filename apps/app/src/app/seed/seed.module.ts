import { ConfigAppModule } from '@fit-friends-1/config/config-app';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { FriendModule } from '../friend/friend.module';
import { MailModule } from '../mail/mail.module';
import { NotifyModule } from '../notify/notify.module';
import { OrderModule } from '../order/order.module';
import { PersonalOrderModule } from '../personal-order/personal-order.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { ReviewModule } from '../review/review.module';
import { SubscriberModule } from '../subscriber/subscriber.module';
import { TrainingModule } from '../training/training.module';
import { UserBalanceModule } from '../user-balance/user-balance.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    FileModule,
    AuthModule,
    UserModule,
    ConfigAppModule,
    RefreshTokenModule,
    TrainingModule,
    OrderModule,
    FriendModule,
    UserBalanceModule,
    MailModule,
    SubscriberModule,
    NotifyModule,
    PersonalOrderModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class SeedModule { }
