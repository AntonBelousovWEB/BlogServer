import { PhotoEntity } from "src/photos/entities/photo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("post")
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    content: string;

    @CreateDateColumn()
    CreatedAt: Date; 

    @Column()
    photoId: number;

    @OneToOne(() => PhotoEntity, (photo) => photo.post)
    @JoinColumn({ name: 'photo_id' })
    photo: PhotoEntity;
}
