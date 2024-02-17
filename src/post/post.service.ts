import { Injectable, Query, BadRequestException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PhotoEntity } from 'src/photos/entities/photo.entity';

interface RelatedEntity {
  propertyName: string;
  id: string;
  repository: Repository<any>;
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async attachRelatedObjects<T extends PostEntity>(
    postOrPosts: T | T[],
    relatedEntities: RelatedEntity[],
  ): Promise<T[]> {
    const posts = Array.isArray(postOrPosts) ? postOrPosts : [postOrPosts];
    for (const post of posts) {
      for (const relatedEntity of relatedEntities) {
        if (post[relatedEntity.id] !== null) {
          const relatedObject = await relatedEntity.repository.findOne({
            where: { id: post[relatedEntity.id] },
          });
          if (relatedObject) {
            post[relatedEntity.propertyName] = relatedObject;
          }
        }
      }
    }
  
    return posts;
  }  

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

    const relatedEntities: RelatedEntity[] = [
      {
        id: 'photoId',
        propertyName: 'photo',
        repository: this.photoRepository,
      },
      {
        id: 'fileId',
        propertyName: 'file',
        repository: this.photoRepository,
      },
    ];    

    return await this.attachRelatedObjects(posts, relatedEntities);
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

    const relatedEntities: RelatedEntity[] = [
      {
        id: 'photoId',
        propertyName: 'photo',
        repository: this.photoRepository,
      },
      {
        id: 'fileId',
        propertyName: 'file',
        repository: this.photoRepository,
      },
    ];    

    return await this.attachRelatedObjects(post, relatedEntities);
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