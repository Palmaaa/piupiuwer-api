import { DeleteResult } from "typeorm";
import PiuLikes from "../model/PiuLikes";

interface IPiusLikesRepository {
    create(data: CreatePiuLikesDTO): Promise<PiuLikes>;
    save(data: PiuLikes): Promise<PiuLikes>;
    findByPiuAndUserId(user_id: string, piu_id: string): Promise<PiuLikes | undefined>;
    deleteByPiuAndUserId(user_id: string, piu_id: string): Promise<DeleteResult>;
}

export default IPiusLikesRepository;