import { PostEntity } from "src/post/entities/post.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("photos")
export class PhotoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @OneToOne(() => PostEntity, (post) => post.photo)
    post: PostEntity;

    @OneToOne(() => PostEntity, (file) => file.file)
    file: PostEntity;
}
