import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post/entities/post.entity';
import { PhotosModule } from './photos/photos.module';
import { PhotoEntity } from './photos/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kesavan.db.elephantsql.com',
      port: 5432,
      username: 'psuffzwt',
      password: 'VLOQxqYtclKGDw4eeM1yAq_JvD0jYB9k',
      database: 'psuffzwt',
      entities: [PostEntity, PhotoEntity],
      synchronize: true,
    }),
    PostModule,
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
