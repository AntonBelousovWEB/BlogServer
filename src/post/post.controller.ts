import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBody({type: CreatePostDto})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    return this.postService.findAll(page, perPage);
  }

  @Get('maxId')
  async getMaxId(): Promise<{ maxId: number }> {
    const maxId = await this.postService.findMaxId();
    return { maxId };
  }

  @Get('searh')
  async searchPosts(@Query('searchTerm') searchTerm: string) {
    return this.postService.searchByTitleOrContent(searchTerm);
  }

  @Get('searchTags')
  async searchByTags(@Query('tagArray') tagArray: string | string[]) {
      return this.postService.searchByTag(tagArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
