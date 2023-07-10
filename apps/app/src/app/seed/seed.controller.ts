import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
  ) { }

  /** Начальное наполнение базы */
  @ApiCreatedResponse({
    description: 'Initial database'
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async generate() {
    return this.seedService.generate();
  }
}
