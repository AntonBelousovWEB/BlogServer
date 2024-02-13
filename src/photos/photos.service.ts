import { Injectable } from '@nestjs/common';
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

  async create(file: Express.Multer.File) {
    const photo = new PhotoEntity();
    photo.filename = file.filename;
    return await this.repository.save(photo);
  }
}
