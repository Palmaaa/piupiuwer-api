import PiusLikesRepository from "@useCases/Piu/repositories/PiusLikesRepository";
import LikePiuService from "@useCases/Piu/services/LikePiuService";
import { Request, Response } from "express";

class PiusLikesController {
    public async create(request: Request, response: Response) {
        const { piu_id } = request.body;
        const { id: user_id } = request.user;

        const piusLikesRepository = new PiusLikesRepository();
        const likePiuService = new LikePiuService(piusLikesRepository);

        const operation = await likePiuService.execute({ piu_id, user_id });
        
        return response.json(operation);
    }
}

export default PiusLikesController;