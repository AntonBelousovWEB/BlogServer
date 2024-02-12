import { PostEntity } from "src/post/entities/post.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("photos")
export class PhotoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => PostEntity, (post) => post.photo)
    post: PostEntity;
}
