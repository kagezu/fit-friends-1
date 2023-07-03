import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training.model';
import { TrainingRepository } from './training.repository';
import { ConfigModule } from '@nestjs/config';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TrainingModel.name, schema: TrainingSchema }
  ]),
    ConfigModule,
    FileModule
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

