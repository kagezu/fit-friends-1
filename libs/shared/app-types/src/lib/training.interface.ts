export interface Training {
  _id?: string;
  title: string;
  background: string;
  trainingLevel: string;
  trainingType: string;
  interval: string;
  price?: number;
  caloriesToBurn: number;
  description: string;
  usersGender: string;
  demoVideo: string;
  rating?: number;
  coachId: string;
  specialOffer?: boolean;
  totalSale: number;
  totalAmount: number;
}
