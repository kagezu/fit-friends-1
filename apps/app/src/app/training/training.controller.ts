import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors, UploadedFile, Req, Patch, Param, NotFoundException, UnauthorizedException, Get } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainingService } from './training.service';
import { TrainingCreateDto } from './dto/training-create.dto';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';
import { TrainingRdo } from './rdo/training.rdo';
import { MongoidValidationPipe, VideoValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { TrainingUpdateDto } from './dto/training-update.dto';
import { TrainingEntity } from './training.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) { }

  /**  Создание новой тренировки */
  @ApiCreatedResponse({
    description: 'The new training has been successfully created.',
    type: TrainingRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async create(
    @Body() dto: TrainingCreateDto,
    @Req() req: Request,
    @UploadedFile(VideoValidationPipe) video: Express.Multer.File
  ) {
    const newTraining = await this.trainingService.create(req['user']._id, dto, video);
    return fillObject(TrainingRdo, newTraining);
  }

  /**  Редактирование тренировки */
  @ApiOkResponse({
    description: 'The new training has been successfully updated.',
    type: TrainingRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Training not exist.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async update(
    @Body() dto: TrainingUpdateDto,
    @Req() req: Request,
    @UploadedFile(VideoValidationPipe) video: Express.Multer.File,
    @Param('id', MongoidValidationPipe) id: string
  ) {
    const existTraining = await this.trainingService.show(id);
    if (!existTraining) {
      throw new NotFoundException('Training not exist');
    }
    if (existTraining.coachId.toString() !== req['user']._id.toString()) {
      throw new UnauthorizedException('Тo editing permissions');
    }
    const training = await this.trainingService.update(
      new TrainingEntity(existTraining),
      dto,
      video
    );
    return fillObject(TrainingRdo, training);
  }

  /** Информация о тренировке */
  @ApiOkResponse({
    description: 'The exist training.',
    type: TrainingRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Training not exist.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existTraining = await this.trainingService.show(id);
    if (!existTraining) {
      throw new NotFoundException('Training not exist');
    }
    return fillObject(TrainingRdo, existTraining);
  }
}
