import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @MinLength(10)
    title: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(50)
    content: string;
}
