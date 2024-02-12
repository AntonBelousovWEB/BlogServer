import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty()
    @IsString()
    @MinLength(10)
    title?: string;

    @ApiProperty()
    @IsString()
    @MinLength(50)
    content?: string;
}
