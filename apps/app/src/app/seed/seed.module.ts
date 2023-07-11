import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { FriendModule } from '../friend/friend.module';
import { OrderModule } from '../order/order.module';
import { PersonalOrderModule } from '../personal-order/personal-order.module';
import { ReviewModule } from '../review/review.module';
import { SubscriberModule } from '../subscriber/subscriber.module';
import { TrainingModule } from '../training/training.module';
import { UserBalanceModule } from '../user-balance/user-balance.module';
import { UserModule } from '../user/user.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    FileModule,
    AuthModule,
    UserModule,
    TrainingModule,
    OrderModule,
    FriendModule,
    UserBalanceModule,
    SubscriberModule,
    PersonalOrderModule,
    ReviewModule,
    MailModule
  ],
  controllers: [SeedController],
  providers: [
    SeedController,
    SeedService
  ],
})
export class SeedModule { }
