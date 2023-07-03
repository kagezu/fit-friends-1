import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';
import { Training } from '@fit-friends-1/shared/app-types';
import { TrainingModel } from './training.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { TrainingQuery } from './query/training.query';

@Injectable()
export class TrainingRepository {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>) {
  }

  public async create(item: TrainingEntity): Promise<Training> {
    const newTraining = new this.trainingModel(item);
    const Training = await newTraining.save();
    return this.findById(Training._id);
  }

  public async findById(id: string): Promise<Training | null> {
    return this.trainingModel
      .findById(id)
      .populate('demoVideo')
      .exec();
  }

  public async update(id: string, item: TrainingEntity): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .populate('demoVideo')
      .exec();
  }

  /*
   public async index({ limit, page, category, sortDirection, location, trainingLevel, trainingTypes }: TrainingQuery): Promise<Training[]> {
     return this.TrainingModel
       .find(Object.assign(
         location ? { location } : {},
         trainingLevel ? { trainingLevel } : {},
         trainingTypes ? { trainingTypes: { $in: trainingTypes } } : {}
       ))
       .sort([[category, sortDirection]])
       .skip(page * limit)
       .limit(limit)
       .populate(['certificate', 'avatar'])
       .exec();
   }
 
   */
}
