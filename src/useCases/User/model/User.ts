import Piu from "../../Piu/model/Piu";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PiuLikes from "../../Piu/model/PiuLikes";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Piu, piu => piu.user)
    pius: Piu[];

    @OneToMany(() => PiuLikes, piuLikes => piuLikes.user)
    likes: PiuLikes[];

    @Column()
    username: string;

    @Column()
    email_verified: boolean;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    about: string;

    @Column()
    photo: string;

    @Column()
    password: string;
    
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default User;