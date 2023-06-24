export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  passwordHash: string;
  gender: string;
  birthday: string;
  role: string;
  description: string;
  location: string;
  background: string;

  trainingLevel: string;
  trainingType: string[];

  interval: string;
  caloriesToBurn: number;
  caloriesPerDay: number;
  readyForTraining: boolean;

  certificate: string;
  meritsOfCoach: string;
  readyForIndividualTraining: boolean;
}
