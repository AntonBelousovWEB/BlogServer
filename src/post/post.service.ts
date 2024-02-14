import { Injectable, Query, BadRequestException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PhotoEntity } from 'src/photos/entities/photo.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.repository.save(createPostDto);
  }

  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 5,
  ): Promise<PostEntity[]> {
    const skip = (page - 1) * perPage;
    const posts = await this.repository.find({
      order: { CreatedAt: 'DESC' },
      take: perPage,
      skip: skip,
    });

    for (const post of posts) {
      if (post.photoId !== null) {
        const photo = await this.photoRepository.findOne({ where: { id: post.photoId } });
        if (photo) {
          post.photo = photo;
        }
      }
    }

    return posts;
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
  

  async findOne(id: number): Promise<PostEntity[]> {
    const post = await this.repository.find({
      where: { id: id },
    });
    if (post[0].photoId !== null) {
      const photo = await this.photoRepository.findOne({ where: { id: post[0].photoId } });
      if (photo) {
        post[0].photo = photo;
      }
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const existingPost = await this.repository.find({
      where: { id: id },
    });
    if (existingPost.length <= 0) {
      throw new BadRequestException('Post not found.');
    }
    return this.repository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<PostEntity[]> {
    const post = await this.repository.find({ where: { id:id }});
    if (post.length <= 0) {
      throw new BadRequestException('Post not found.');
    }
    return this.repository.remove(post);
  }
}