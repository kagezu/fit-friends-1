import { Types } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: Types.ObjectId;
  passwordHash: string;
  gender: string;
  birthday?: Date;
  role: string;
  description?: string;
  location: string;
  background: string;
  createdAt?: Date;

  trainingLevel: string;
  trainingTypes: string[];

  interval?: string;
  caloriesToBurn?: number;
  caloriesPerDay?: number;
  readyForTraining?: boolean;

  certificate?: Types.ObjectId;
  resume?: string;
  readyForIndividualTraining?: boolean;
}
