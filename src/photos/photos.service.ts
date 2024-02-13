import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private repository: Repository<PhotoEntity>
  ) {}

  findAll() {
    return this.repository.find();
  }

  create(createPhotoDto: CreatePhotoDto) {
    return 'This action adds a new photo';
  }
}
