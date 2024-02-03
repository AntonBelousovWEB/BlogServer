import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.repository.save(createPostDto);
  }

  findAll(): Promise<PostEntity[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<PostEntity[]> {
    return this.repository.find({
      where: { id: id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<PostEntity[]> {
    const post = await this.repository.find({ where: { id:id }});
    return this.repository.remove(post);
  }
}
