import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { ImageKitResponse, ImageKitService } from './imagekit.service';

@Controller('imgs')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageKitService: ImageKitService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageKitResponse> {
    return await this.imageKitService.upload(file);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ImageKitResponse[]> {
    return await this.imageKitService.uploadMultiple(files);
  }

  @Delete('/delete/:file_id')
  async deleteImage(
    @Param('file_id') file_id: string,
  ): Promise<{ message: string }> {
    await this.imageKitService.delete(file_id);
    return {
      message: `Image avec l'ID ${file_id} a été supprimée avec succès.`,
    };
  }

  @Post('create-folder')
  async createFolder(
    @Body('folderName') folderName: string,
  ): Promise<{ message: string }> {
    await this.imageKitService.createFolder(folderName);
    return {
      message: `Dossier '${folderName}' créé avec succès.`,
    };
  }
}
