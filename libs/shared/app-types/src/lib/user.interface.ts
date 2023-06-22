export interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
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
