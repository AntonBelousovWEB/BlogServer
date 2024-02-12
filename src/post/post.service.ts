import { Injectable, Query, Logger, BadRequestException } from '@nestjs/common';
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
    if (createPostDto.title.length < 10 || createPostDto.content.length < 50) {
      throw new BadRequestException('Too few characters');
    }
    return this.repository.save(createPostDto);
  }

  async findAll(@Query('page') page: number = 1, @Query('perPage') perPage: number = 5): Promise<PostEntity[]> {
    const skip = (page - 1) * perPage;
    return this.repository.find({
      order: { CreatedAt: 'DESC' },
      take: perPage,
      skip: skip,
    });
  }

  async findMaxId(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('post')
      .select('MAX(post.id)', 'maxId')
      .getRawOne();

    return result?.maxId || 0;
  }

  async searchByTitleOrContent(searchTerm: string): Promise<PostEntity[]> {
    const searchTerms = searchTerm.split(' '); // Разбиваем строку на отдельные слова
    const posts = await this.repository.createQueryBuilder('post')
      .where('(' + searchTerms.map(term => 'post.title LIKE :term').join(' OR ') + ')', {
        term: `%${searchTerms[0]}%`
      })
      .orWhere('(' + searchTerms.map(term => 'post.content LIKE :term').join(' OR ') + ')', {
        term: `%${searchTerms[0]}%`
      })
      .getMany();
    return posts;
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
