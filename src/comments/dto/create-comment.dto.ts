import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class CreateCommentDto {
    @ApiProperty()
    @MinLength(10)
    content: string;
}
