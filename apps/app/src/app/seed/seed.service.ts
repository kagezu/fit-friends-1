import { Injectable } from '@nestjs/common';
import { FileRepository } from '../file/file.repository';
import { mockData } from '@fit-friends-1/shared/mock-data';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { generateRandomValue, getRandomItem, getRandomItems } from '@fit-friends-1/util/util-core';
import { UserRole } from '@fit-friends-1/shared/app-types';
import { UserValidate } from '../auth/auth.constant';
import { File } from '@fit-friends-1/shared/app-types';

@Injectable()
export class ReviewService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly userRepository: UserRepository,
  ) { }

  /** Начальное наполнение базы */
  public async generate() {
    const avatars = await this.generateAvatars();
    const certificates = await this.generateCertificates();
    const users = await this.generateUsers(avatars);
    // const users = await this.generateUsers(avatars, certificates);
  }

  private async generateUsers(avatars: File[]) {
    return mockData.emails.map(async (email) => {
      const userEntity = new UserEntity({
        name: getRandomItem(mockData.names),
        email,
        avatar: getRandomItem(avatars)._id,
        passwordHash: '',
        gender: getRandomItem(mockData.genders),
        birthday: new Date(),
        role: UserRole.User,
        description: getRandomItem(mockData.userDescriptions),
        location: getRandomItem(mockData.locations),
        background: getRandomItem(mockData.backgrounds),

        trainingLevel: getRandomItem(mockData.trainingLevels),
        trainingTypes: getRandomItems(mockData.trainingTypes),

        interval: getRandomItem(mockData.intervals),
        caloriesToBurn: generateRandomValue(UserValidate.minCaloriesToBurn, UserValidate.maxCaloriesToBurn),
        caloriesPerDay: generateRandomValue(UserValidate.minCaloriesPerDay, UserValidate.maxCaloriesPerDay),
        readyForTraining: true
      });
      userEntity.setPassword(mockData.password);
      return this.userRepository.create(userEntity);
    })
  }

  private async generateCoach(avatars: File[], certificates: File[]) {
    return mockData.emails.map(async (email) => {
      const userEntity = new UserEntity({
        name: getRandomItem(mockData.names),
        email,
        avatar: getRandomItem(avatars)._id,
        passwordHash: '',
        gender: getRandomItem(mockData.genders),
        birthday: new Date(),
        role: UserRole.User,
        description: getRandomItem(mockData.userDescriptions),
        location: getRandomItem(mockData.locations),
        background: getRandomItem(mockData.backgrounds),

        trainingLevel: getRandomItem(mockData.trainingLevels),
        trainingTypes: getRandomItems(mockData.trainingTypes),

        certificate: getRandomItem(certificates)._id,
        resume: getRandomItem(mockData.userDescriptions),
        readyForIndividualTraining: false
      });
      userEntity.setPassword(mockData.password);
      return this.userRepository.create(userEntity);
    })
  }

  private async generateAvatars() {
    return Promise.all(
      mockData.avatars.map(
        async (avatar) => await this.fileRepository.create(
          new FileEntity({
            originalName: avatar,
            size: 0,
            mimetype: 'image/png',
            hashName: avatar,
            path: avatar
          }))));
  }

  private async generateCertificates() {
    return Promise.all(
      mockData.certificates.map(
        async (file) => await this.fileRepository.create(
          new FileEntity({
            originalName: file,
            size: 0,
            mimetype: 'application/pdf',
            hashName: file,
            path: file
          }))));
  }

}
