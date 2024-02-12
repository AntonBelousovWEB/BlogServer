import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Controller('photos')
@ApiTags('photos')
export class PhotosController {
  constructor(
    @InjectRepository(PhotoEntity)
    private repository: Repository<PhotoEntity>
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      }
    }
  })
  create(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}