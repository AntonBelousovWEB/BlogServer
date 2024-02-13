import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PhotosService } from './photos.service';
import { PostId } from 'decorators/post-id.decorator';

@Controller('photos')
@ApiTags('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  findAll() {
    return this.photosService.findAll();
  }
  
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
  create(@UploadedFile(
    new ParseFilePipe({
      validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })]
    })
  ) 
    file: Express.Multer.File,
    @PostId() postId: number,
  ) {
    return this.photosService.create(file, postId);
  }
}