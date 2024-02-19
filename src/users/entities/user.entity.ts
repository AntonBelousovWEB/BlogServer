import { CommentEntity } from "src/comments/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comment: CommentEntity[];
}
