import { Injectable, Logger } from '@nestjs/common';
import { FileRepository } from '../file/file.repository';
import { mockData } from '@fit-friends-1/shared/mock-data';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { generateRandomValue, getRandomItem, getRandomItems } from '@fit-friends-1/util/util-core';
import { OrderStatus, Training, User, UserRole } from '@fit-friends-1/shared/app-types';
import { UserValidate } from '../auth/auth.constant';
import { File } from '@fit-friends-1/shared/app-types';
import { TrainingRepository } from '../training/training.repository';
import { TrainingEntity } from '../training/training.entity';
import { ReviewValidate } from '../review/review.const';
import { ReviewService } from '../review/review.service'
import { OrderRepository } from '../order/order.repository';
import { OrderEntity } from '../order/order.entity';
import { PersonalOrderRepository } from '../personal-order/personal-order.repository';
import { PersonalOrderEntity } from '../personal-order/personal-order.entity';
import { NotifyRepository } from '../notify/notify.repository';
import { NotifyEntity } from '../notify/notify.entity';
import { UserBalanceRepository } from '../user-balance/user-balance.repository';

const COUNT_ITEM = 10;
const MAX_PRICE = 10;
const STEP_PRICE = 200;
const MAX_COUNT_ORDER = 10;

@Injectable()
export class SeedService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly userRepository: UserRepository,
    private readonly trainingRepository: TrainingRepository,
    private readonly reviewService: ReviewService,
    private readonly orderRepository: OrderRepository,
    private readonly personalOrderRepository: PersonalOrderRepository,
    private readonly notifyRepository: NotifyRepository,
    private readonly userBalanceRepository: UserBalanceRepository,
  ) { }

  /** Начальное наполнение базы */
  public async generate() {
    const avatars = await this.generateAvatars();
    const certificates = await this.generateCertificates();
    const video = await this.generateVideo();
    Logger.log('Created files');

    const users = await this.generateUsers(avatars);
    const coachs = await this.generateCoach(avatars, certificates);
    Logger.log('Created users');

    const trainings = await this.generateTrainings(coachs, video);
    Logger.log('Created trainings');

    await this.generateReviews(users, trainings);
    Logger.log('Created reviews');

    await this.generateOrders(trainings);
    Logger.log('Created orders');

    await this.generatePersonalOrders(users, coachs);
    Logger.log('Created personal orders');

    await this.generateNotify([...users, ...coachs]);
    Logger.log('Created notify');

    await this.generateBalance(users, trainings);
    Logger.log('Created balance');
  }

  private async generateBalance(users: User[], trainings: Training[]) {
    return Promise.all(users.map(
      (user) => this.userBalanceRepository.create({
        userId: user._id,
        training: getRandomItem(trainings)._id,
        count: generateRandomValue(0, MAX_COUNT_ORDER)
      })));
  }

  private async generateNotify(users: User[]) {
    return Promise.all(users.map(
      (user) => this.notifyRepository.create(
        new NotifyEntity({
          user: user._id,
          message: getRandomItem(mockData.messages)
        }))));
  }

  private async generatePersonalOrders(users: User[], coachs: User[]) {
    return Promise.all(users.map(
      (user) => this.personalOrderRepository.create(
        new PersonalOrderEntity({
          initiator: user._id,
          user: getRandomItem([...users, ...coachs])._id,
          orderStatus: OrderStatus.Pending
        }))));
  }

  private async generateOrders(trainings: Training[]) {
    return Promise.all(trainings.map(
      (training) => {
        const orders = [];
        for (let i = 0; i < COUNT_ITEM; i++) {
          const count = generateRandomValue(0, MAX_COUNT_ORDER);
          orders[i] = this.orderRepository.create(
            new OrderEntity({
              purchaseType: getRandomItem(mockData.purchaseTypes),
              training: training._id,
              price: training.price,
              count,
              orderPrice: training.price * count,
              paymentMethod: getRandomItem(mockData.paymentMethods)
            }));
        }
        return Promise.all(orders);
      }));
  }

  private async generateReviews(users: User[], trainings: Training[]) {
    Promise.all(trainings.map(
      (training) => Promise.all(users.map(
        (user) => this.reviewService.create(
          user._id,
          {
            training: training._id,
            evaluation: generateRandomValue(ReviewValidate.MinEvaluation, ReviewValidate.MaxEvaluation),
            textReview: getRandomItem(mockData.textFeedbacks)
          })))));
  }

  private async generateTrainings(coachs: User[], video: File) {
    const trainings = [];
    for (let i = 0; i < COUNT_ITEM; i++) {
      trainings[i] = await this.trainingRepository.create(
        new TrainingEntity({
          title: getRandomItem(mockData.titles),
          background: getRandomItem(mockData.backgrounds),
          trainingLevel: getRandomItem(mockData.trainingLevels),
          trainingTypes: getRandomItem(mockData.trainingTypes),
          interval: getRandomItem(mockData.intervals),
          price: generateRandomValue(0, MAX_PRICE) * STEP_PRICE,
          caloriesToBurn: generateRandomValue(UserValidate.minCaloriesToBurn, UserValidate.maxCaloriesToBurn),
          description: getRandomItem(mockData.descriptions),
          usersGender: getRandomItem(mockData.genders),
          demoVideo: video._id,
          rating: 0,
          coachId: getRandomItem(coachs)._id,
          specialOffer: true,
          totalSale: 0,
          totalAmount: 0
        }));
    }
    return trainings;
  }

  private async generateUsers(avatars: File[]) {
    return Promise.all(mockData.emails.map(async (email) => {
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
    }));
  }

  private async generateCoach(avatars: File[], certificates: File[]) {
    return Promise.all(mockData.emails.map(async (email) => {
      const userEntity = new UserEntity({
        name: getRandomItem(mockData.names),
        email: `c-${email}`,
        avatar: getRandomItem(avatars)._id,
        passwordHash: '',
        gender: getRandomItem(mockData.genders),
        birthday: new Date(),
        role: UserRole.Coach,
        description: getRandomItem(mockData.userDescriptions),
        location: getRandomItem(mockData.locations),
        background: getRandomItem(mockData.backgrounds),

        trainingLevel: getRandomItem(mockData.trainingLevels),
        trainingTypes: getRandomItems(mockData.trainingTypes),

        certificate: getRandomItem(certificates)._id,
        resume: getRandomItem(mockData.resumes),
        readyForIndividualTraining: false
      });
      userEntity.setPassword(mockData.password);
      return this.userRepository.create(userEntity);
    }));
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

  private async generateVideo() {
    const video = getRandomItem(mockData.demoVideos);
    return this.fileRepository.create(
      new FileEntity({
        originalName: video,
        size: 0,
        mimetype: 'video/mkv',
        hashName: video,
        path: video
      }));
  }
}
