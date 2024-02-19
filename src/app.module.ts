import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post/entities/post.entity';
import { PhotosModule } from './photos/photos.module';
import { PhotoEntity } from './photos/entities/photo.entity';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kesavan.db.elephantsql.com',
      port: 5432,
      username: 'psuffzwt',
      password: 'VLOQxqYtclKGDw4eeM1yAq_JvD0jYB9k',
      database: 'psuffzwt',
      entities: [PostEntity, PhotoEntity, UserEntity, CommentEntity],
      synchronize: true,
    }),
    PostModule,
    PhotosModule,
    UsersModule,
    CommentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
