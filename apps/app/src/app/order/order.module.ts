import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, OrderSchema } from './order.model';
import { OrderRepository } from './order.repository';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: OrderModel.name, schema: OrderSchema }
  ]),
    ConfigModule,
  ],
  providers: [
    OrderRepository,
    OrderService,
    OrderController
  ],
  controllers: [OrderController],
})
export class OrderModule { }
