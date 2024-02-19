import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.comment)
    user: UserEntity;
}
