import { Entity } from '@fit-friends-1/util/util-types';
import { Training } from '@fit-friends-1/shared/app-types';

export class TrainingEntity implements Entity<TrainingEntity>, Training {
  public _id?: string;
  public title: string;
  public background: string;
  public trainingLevel: string;
  public trainingType: string;
  public interval: string;
  public price?: number;
  public caloriesToBurn: number;
  public description: string;
  public usersGender: string;
  public demoVideo: string;
  public rating?: number;
  public coachId: string;
  public specialOffer?: boolean;
  public totalSale: number;
  public totalAmount: number;

  constructor(entity: Training) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Training) {
    this._id = entity._id;
    this.title = entity.title;
    this.background = entity.background;
    this.trainingLevel = entity.trainingLevel;
    this.trainingType = entity.trainingType;
    this.interval = entity.interval;
    this.price = entity.price;
    this.caloriesToBurn = entity.caloriesToBurn;
    this.description = entity.description;
    this.usersGender = entity.usersGender;
    this.demoVideo = entity.demoVideo;
    this.rating = entity.rating;
    this.coachId = entity.coachId;
    this.specialOffer = entity.specialOffer || false;
    this.totalSale = entity.totalSale;
    this.totalAmount = entity.totalAmount;
  }

  public toObject(): TrainingEntity {
    return {
      ...this,
    }
  }
}
