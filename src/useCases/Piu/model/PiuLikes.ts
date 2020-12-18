import User from "../../User/model/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Piu from "./Piu";

@Entity('pius_likes')
class PiuLikes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.pius)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Piu, piu => piu.likes)
    @JoinColumn({ name: 'piu_id' })
    piu: Piu;

    @Column()
    user_id: string;

    @Column()
    piu_id: string;
}

export default PiuLikes;