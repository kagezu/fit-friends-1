import { Entity } from '@fit-friends-1/util/util-types';

import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';
import { User } from '@fit-friends-1/shared/app-types';

export class UserEntity implements Entity<User> {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
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


  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.role = user.role;
    this.description = user.description;
    this.location = user.location;
    this.background = user.background;

    this.trainingLevel = user.trainingLevel;
    this.trainingType = user.trainingType;

    this.interval = user.interval;
    this.caloriesToBurn = user.caloriesToBurn;
    this.caloriesPerDay = user.caloriesPerDay;
    this.readyForTraining = user.readyForTraining;

    this.certificate = user.certificate;
    this.meritsOfCoach = user.meritsOfCoach;
    this.readyForIndividualTraining = user.readyForIndividualTraining;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
