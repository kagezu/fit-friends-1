import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';
import { Training } from '@fit-friends-1/shared/app-types';
import { TrainingModel } from './training.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingQuery } from './query/trainer.query';
import { TrainingCatalogQuery } from './query/trainer-catalog.query';

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

  public async findByCoach(coachId: string): Promise<Training[] | null> {
    return this.trainingModel
      .find({ coachId })
      .exec();
  }

  public async check(id: string): Promise<Training | null> {
    return this.trainingModel
      .findById(id)
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
    { limit, page, sortDirection, priceFrom, priceTo, caloriesFrom, caloriesTo, ratingFrom, ratingTo, interval }: TrainingQuery
  ): Promise<Training[]> {
    return this.trainingModel
      .find(Object.assign({
        coachId,
        price: { $gte: priceFrom, $lte: priceTo },
        caloriesToBurn: { $gte: caloriesFrom, $lte: caloriesTo },
        rating: { $gte: ratingFrom, $lte: ratingTo }
      },
        interval ? { $in: interval } : {}
      ))
      .sort([['createdAt', sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate('demoVideo')
      .exec();
  }

  public async index({ limit, page, sortDirection, category, priceFrom, priceTo, caloriesFrom, caloriesTo, ratingFrom, ratingTo, trainingType }: TrainingCatalogQuery
  ): Promise<Training[]> {
    return this.trainingModel
      .find(Object.assign({
        price: { $gte: priceFrom, $lte: priceTo },
        caloriesToBurn: { $gte: caloriesFrom, $lte: caloriesTo },
        rating: { $gte: ratingFrom, $lte: ratingTo }
      },
        trainingType ? { trainingType } : {}
      ))
      .sort([[category, sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate('demoVideo')
      .exec();
  }
}
