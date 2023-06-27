import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploadConfig } from '@fit-friends-1/shared/configs';
import { ConfigType } from '@nestjs/config';

@ApiTags('uploader')
@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(uploadConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploadConfig>,
  ) { }

  /* Загрузка файла в файловую структуру сервера */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('/upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.save(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  /* Запрос информации о файле по id */
  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: 'File found'
  })
  @Get(':fileId')
  public async show(@Param('fileId') fileId: string) {
    const existFile = await this.fileService.get(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
