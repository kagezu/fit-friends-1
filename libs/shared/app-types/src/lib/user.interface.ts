export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  gender: string;
  birthday?: Date;
  role: string;
  description?: string;
  location: string;
  background?: string;
  createdAt?: Date;

  trainingLevel?: string;
  trainingTypes?: string[];

  interval?: string;
  caloriesToBurn?: number;
  caloriesPerDay?: number;
  readyForTraining?: boolean;

  certificate?: string[];
  resume?: string;
  readyForIndividualTraining?: boolean;
}
