import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalOrderModel, PersonalOrderSchema } from './personal-order.model';
import { PersonalOrderRepository } from './personal-order.repository';
import { ConfigModule } from '@nestjs/config';
import { PersonalOrderController } from './personal-order.controller';
import { PersonalOrderService } from './personal-order.service';
import { UserModule } from '../user/user.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PersonalOrderModel.name, schema: PersonalOrderSchema }
  ]),
    ConfigModule,
    UserModule,
    NotifyModule
  ],
  providers: [
    PersonalOrderRepository,
    PersonalOrderService,
    PersonalOrderController
  ],
  controllers: [PersonalOrderController],
  exports: [
    PersonalOrderRepository
  ]
})
export class PersonalOrderModule { }
