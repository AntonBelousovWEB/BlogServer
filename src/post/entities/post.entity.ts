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

    @Column({ nullable: true })
    photoId: number;

    @Column({ nullable: true })
    fileId: number;

    @Column({ type: 'text', array: true, nullable: true })
    tagsList: string[]; 

    @OneToOne(() => PhotoEntity, (photo) => photo.post)
    @JoinColumn({ name: 'photo_id' })
    photo: PhotoEntity;

    @OneToOne(() => PhotoEntity, (photo) => photo.file)
    @JoinColumn({ name: 'file_id' })
    file: PhotoEntity;
}
