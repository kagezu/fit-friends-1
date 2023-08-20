import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { fillObject } from '@fit-friends-1/util/util-core';
import { Controller, UseGuards, HttpCode, HttpStatus, Post, Body, Req, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiConflictResponse, ApiHeader, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { ReviewCreateDto } from './dto/review-create.dto';
import { ReviewQuery } from './query/review.query';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewService } from './review.service';
import { FieldList } from '@fit-friends-1/shared/app-types';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) { }

  /**  Создание отзыва */
  @ApiCreatedResponse({
    description: 'The new Review has been successfully created.',
    type: ReviewRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'Review already exists.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() dto: ReviewCreateDto,
    @Req() req: Request
  ) {
    const newReview = await this.reviewService.create(req[FieldList.User]._id, dto);
    return fillObject(ReviewRdo, newReview);
  }

  /** Список отзывов */
  @ApiOkResponse({
    type: [ReviewRdo],
    description: 'Review found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiQuery({
    description: 'Query options',
    type: ReviewQuery
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async index(
    @Query() query: ReviewQuery,
    @Param('id', MongoidValidationPipe) id: string
  ) {
    const existReviews = await this.reviewService.index(id, query);
    return fillObject(ReviewRdo, existReviews);
  }
}
