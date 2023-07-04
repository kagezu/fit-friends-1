import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';
import { Training } from '@fit-friends-1/shared/app-types';
import { TrainingModel } from './training.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingQuery } from './query/trainer.query';

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

  public async list(
    coachId: string,
    { limit, page, sortDirection, priceFrom, priceTo, caloriesFrom, caloriesTo, rating, interval }: TrainingQuery
  ): Promise<Training[]> {
    return this.trainingModel
      .find({
        coachId,
        price: { $gte: priceFrom, $lte: priceTo },
        calories: { $gte: caloriesFrom, $lte: caloriesTo },
        rating,
        interval: interval ? { $in: interval } : {}
      })
      .sort([['createdAt', sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate('demoVideo')
      .exec();
  }
}
