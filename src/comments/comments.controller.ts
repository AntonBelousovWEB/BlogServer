import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('comments')
@ApiTags('comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBody({type: CreateCommentDto})
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto, 
    @UserId() userId: number,
    @Query('postId') postId: number) {
    return this.commentsService.create(createCommentDto, userId, postId);
  }

  @Get('commentByPost')
  findByPost(@Query('postId') postId: number) {
    return this.commentsService.findByPost(postId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(+id);
  // }
}
