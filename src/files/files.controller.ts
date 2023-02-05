import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';


@Controller('files')
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string) {
      const path = this.filesService.findProductImage(imageName);
      res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', { 
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 },
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File
  ){
    if(!file) {
      throw new BadRequestException('No file uploaded');
    }

    const secureUrl = `${file.filename}`;
    return {
      secureUrl
    };
  }
}
