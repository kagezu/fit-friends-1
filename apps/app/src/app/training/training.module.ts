import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training.model';
import { TrainingRepository } from './training.repository';
import { ConfigModule } from '@nestjs/config';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TrainingModel.name, schema: TrainingSchema }
  ]),
    ConfigModule,
    FileModule,
    MailModule
  ],
  providers: [
    TrainingRepository,
    TrainingService,
    TrainingController
  ],
  exports: [
    TrainingRepository,
    TrainingService
  ],
  controllers: [TrainingController],
})
export class TrainingModule { }

