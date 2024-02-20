import { Injectable, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor (
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  create(
    comment: CreateCommentDto, 
    userId: number, 
    @Query('postId') postId: number) {
    return this.repository.save({
      content: comment.content,
      user: { id: userId },
      post: { id: postId },
    });
  }

  async findByPost(@Query('postId') postId: number) {
    const comments = await this.repository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .select(['comment.id', 'comment.content', 'user.name'])
      .where('comment.postId = :postId', { postId })
      .getMany();
  
    return comments;
  }   
}
