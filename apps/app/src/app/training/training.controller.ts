import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { TrainingService } from './training.service';
import { TrainingCreateDto } from './dto/training-create.dto';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';
import { TrainingRdo } from './rdo/training.rdo';


@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) { }

  /**  Создание новой тренировки */
  @ApiCreatedResponse({ description: 'The new training has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: TrainingCreateDto })
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async create(
    @Body() dto: TrainingCreateDto,
    @Req() req: Request,
    @UploadedFile(FileValidationPipe) video: Express.Multer.File
  ) {
    const newTraining = this.trainingService.create(req['user']._id, dto, video);

    return fillObject(TrainingRdo, newTraining);
  }
}
