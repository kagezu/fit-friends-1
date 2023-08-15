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
import { PersonalOrderRepository } from '../personal-order/personal-order.repository';
import { PersonalOrderEntity } from '../personal-order/personal-order.entity';
import { FriendService } from '../friend/friend.service';
import { SubscriberRepository } from '../subscriber/subscriber.repository';
import { SubscriberEntity } from '../subscriber/subscriber.entity';
import { MailService } from '../mail/mail.service';
import { OrderService } from '../order/order.service';
import { UserBalanceService } from '../user-balance/user-balance.service';

const COUNT_ITEM = 100;
const COUNT_ITEM_ORDER = 10;
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
    private readonly mailService: MailService,
    private readonly orderService: OrderService,
    private readonly personalOrderRepository: PersonalOrderRepository,
    private readonly userBalanceService: UserBalanceService,
    private readonly friendService: FriendService,
    private readonly subscriberRepository: SubscriberRepository
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

    await this.generateSubscriptions(users, coachs);
    Logger.log('Created subscriptions');

    const trainings = await this.generateTrainings(coachs, video);
    Logger.log('Created trainings');

    await this.generateReviews(users, trainings);
    Logger.log('Created reviews');

    await this.generateOrders(users, trainings);
    Logger.log('Created orders');

    await this.generatePersonalOrders(users, coachs);
    Logger.log('Created personal orders');

    await this.generateFriend([...users, ...coachs]);
    Logger.log('Created friends');

    await this.generateBalance(users, trainings);
    Logger.log('Created orders');
  }

  private async generateBalance(users: User[], trainings: Training[]) {
    return Promise.all(users.map(
      (user) => this.userBalanceService.increase(
        user._id,
        {
          training: getRandomItem(trainings)._id,
          count: generateRandomValue(0, MAX_COUNT_ORDER)
        })));
  }

  private async generateSubscriptions(users: User[], coachs: User[]) {
    return Promise.all(users.map(
      (user) => this.subscriberRepository.create(
        new SubscriberEntity({
          email: user.email,
          coach: getRandomItem(coachs)._id
        }))));
  }

  private async generateFriend(users: User[]) {
    return Promise.all(users.map(
      (user) => {
        const friendId = getRandomItem(users)._id.toString();
        if (friendId !== user._id.toString()) {
          return this.friendService.create(user, friendId);
        }
      }));
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

  private async generateOrders(users: User[], trainings: Training[]) {
    return Promise.all(trainings.map(
      (training) => {
        const orders = [];
        for (let i = 0; i < COUNT_ITEM_ORDER; i++) {
          const count = generateRandomValue(0, MAX_COUNT_ORDER);
          orders[i] = this.orderService.create(
            getRandomItem(users)._id,
            {
              training: training._id,
              count,
              paymentMethod: getRandomItem(mockData.paymentMethods)
            });
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
      const coachId = getRandomItem(coachs)._id;
      trainings[i] = await this.trainingRepository.create(
        new TrainingEntity({
          title: getRandomItem(mockData.titles),
          background: getRandomItem(mockData.backgrounds),
          trainingLevel: getRandomItem(mockData.trainingLevels),
          trainingType: getRandomItem(mockData.trainingTypes),
          interval: getRandomItem(mockData.intervals),
          price: generateRandomValue(0, MAX_PRICE) * STEP_PRICE,
          caloriesToBurn: generateRandomValue(UserValidate.minCaloriesToBurn, UserValidate.maxCaloriesToBurn),
          description: getRandomItem(mockData.descriptions),
          usersGender: getRandomItem(mockData.genders),
          demoVideo: video._id,
          rating: 0,
          coachId,
          specialOffer: true,
          totalSale: 0,
          totalAmount: 0
        }));
      await this.mailService.addNotify(coachId, trainings[i]._id.toString());
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
      await userEntity.setPassword(mockData.password);
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

        certificate: getRandomItems(certificates).map((value) => value._id),
        resume: getRandomItem(mockData.resumes),
        readyForIndividualTraining: false
      });
      await userEntity.setPassword(mockData.password);
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
