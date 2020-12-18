import User from "../../User/model/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PiuLikes from "./PiuLikes";

@Entity('pius')
class Piu {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.pius)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => PiuLikes, piuLikes => piuLikes.piu)
    likes: PiuLikes[];

    @Column()
    user_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Piu;