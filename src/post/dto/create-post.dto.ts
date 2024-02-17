import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

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
}
