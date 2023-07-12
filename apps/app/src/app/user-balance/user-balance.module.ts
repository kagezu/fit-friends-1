import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBalanceModel, UserBalanceSchema } from './user-balance.model';
import { UserBalanceRepository } from './user-balance.repository';
import { ConfigModule } from '@nestjs/config';
import { UserBalanceController } from './user-balance.controller';
import { UserBalanceService } from './user-balance.service';
import { TrainingModule } from '../training/training.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserBalanceModel.name, schema: UserBalanceSchema }
  ]),
    ConfigModule,
    TrainingModule,
    UserModule
  ],
  providers: [
    UserBalanceRepository,
    UserBalanceService,
    UserBalanceController
  ],
  controllers: [UserBalanceController],
  exports: [
    UserBalanceRepository,
    UserBalanceService
  ]
})
export class UserBalanceModule { }
