import { Response, response } from "express";
import { DeleteResult } from "typeorm";
import PiuLikes from "../model/PiuLikes";
import IPiusLikesRepository from "../repositories/IPiusLikesRepository";

interface IRequest {
    user_id: string;
    piu_id: string;
}

interface IResponse {
    operation: string;
}

class CreatePiuLikesService {
    private piusLikesRepository: IPiusLikesRepository;

    constructor(piusLikesRepository: IPiusLikesRepository) {
        this.piusLikesRepository = piusLikesRepository;
    }

    public async execute({ user_id, piu_id }: IRequest): Promise<IResponse> {
        const piuLiked = await this.piusLikesRepository.findByPiuAndUserId(user_id, piu_id);

        if (piuLiked) {
            await this.piusLikesRepository.deleteByPiuAndUserId(user_id, piu_id);

            return { operation: 'unlike' };
        } else {
            const createdLike = await this.piusLikesRepository.create({ user_id, piu_id });

            await this.piusLikesRepository.save(createdLike);

            return { operation: 'like' };
        }
    }
}

export default CreatePiuLikesService;