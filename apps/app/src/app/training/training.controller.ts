import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainingService } from './training.service';
import { TrainingCreateDto } from './dto/training-create.dto';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';
import { TrainingRdo } from './rdo/training.rdo';
import { VideoValidationPipe } from '@fit-friends-1/shared/shared-pipes';

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
    const newTraining = this.trainingService.create(req['user']._id, dto, video);
    // return newTraining;
    return fillObject(TrainingRdo, newTraining);
  }
}
