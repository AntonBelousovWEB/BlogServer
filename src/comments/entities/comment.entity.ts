import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    userId: number;

    @Column()
    postId: number;

    @ManyToOne(() => UserEntity, (user) => user.comment)
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comment)
    post: PostEntity;
}
