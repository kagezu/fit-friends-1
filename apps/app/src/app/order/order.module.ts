import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, OrderSchema } from './order.model';
import { OrderRepository } from './order.repository';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TrainingModule } from '../training/training.module';
import { UserBalanceModule } from '../user-balance/user-balance.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: OrderModel.name, schema: OrderSchema }
  ]),
    ConfigModule,
    TrainingModule,
    UserBalanceModule
  ],
  providers: [
    OrderRepository,
    OrderService,
    OrderController
  ],
  controllers: [OrderController],
  exports: [
    OrderRepository,
    OrderService
  ]
})
export class OrderModule { }
