import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength, IsArray, ArrayMinSize, ArrayNotEmpty } from "class-validator";

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @MinLength(10)
    title: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(50)
    content: string;

    @ApiProperty({ required: false, default: null })
    @ApiPropertyOptional()
    @IsOptional() 
    photoId?: number;

    @ApiProperty({ required: false, default: null })
    @ApiPropertyOptional()
    @IsOptional() 
    fileId?: number;

    @ApiProperty({ required: false, type: [String], default: ["hello", "hi", "post"] })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayNotEmpty()
    @IsString({ each: true }) 
    tagsList?: string[];
}