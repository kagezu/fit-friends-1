import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploadConfig } from '@fit-friends-1/shared/configs';
import { ConfigType } from '@nestjs/config';
import { AvatarValidationPipe } from '@fit-friends-1/shared/shared-pipes';
// import { AvatarValidationPipe } from '@fit-friends-1/shared/shared-pipes';

@ApiTags('uploader')
@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,
    @Inject(uploadConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploadConfig>,
  ) { }

  /** Загрузка файла в файловую структуру сервера */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('/avatar')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('avatar')
    // FileInterceptor('certificate')
  )
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'avatar', maxCount: 1 },
  //   { name: 'certificate', maxCount: 1 },
  //   { name: 'body', maxCount: 1 },
  // ]))
  public async uploadAvatar(
    // @Body() body,
    // @UploadedFiles() files: { avatar?: Express.Multer.File[], certificate?: Express.Multer.File[], body: any }
    @UploadedFile(AvatarValidationPipe) avatar: Express.Multer.File,
    // @UploadedFile() certificate: Express.Multer.File
  ) {

    return { avatar };

    // const newFile = await this.fileService.save(image);
    // const path = `${this.applicationConfig.serveRoot}${newFile.path}


    // await this.fileService.save(text);
    // const pathText = `${this.applicationConfig.serveRoot}${newFile.path}`;
    // return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  /** Запрос информации о файле по id */
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
