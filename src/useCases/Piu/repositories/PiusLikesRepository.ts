import { DeleteResult, getRepository, Repository } from "typeorm";

import PiuLikes from "../model/PiuLikes";

import IPiusLikesRepository from "./IPiusLikesRepository";


class PiusLikesRepository implements IPiusLikesRepository {
    private ormRepository: Repository<PiuLikes>;

    constructor() {
        this.ormRepository = getRepository(PiuLikes);
    }

    public async create(data: CreatePiuLikesDTO): Promise<PiuLikes> {
        const piuLikes = this.ormRepository.create(data);

        return piuLikes;
    }

    public async save(data: PiuLikes): Promise<PiuLikes> {
        const piuLikes = await this.ormRepository.save(data);

        return piuLikes;
    }

    public async findByPiuAndUserId(user_id: string, piu_id: string): Promise<PiuLikes | undefined> {
        const piuLiked = await this.ormRepository.findOne({
            where: {
                user_id,
                piu_id,
            }
        });

        return piuLiked;
    }

    public async deleteByPiuAndUserId(user_id: string, piu_id: string): Promise<DeleteResult> {
        const deletedLike = await this.ormRepository.delete({ 
            user_id,
            piu_id
        });

        return deletedLike;
    }

}

export default PiusLikesRepository;