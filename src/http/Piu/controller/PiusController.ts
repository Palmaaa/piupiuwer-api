import PiusRepository from "@useCases/Piu/repositories/PiusRepository";
import CreatePiuService from "@useCases/Piu/services/CreatePiuService";
import ListPiusService from "@useCases/Piu/services/ListPiusService";
import UsersRepository from "@useCases/User/repositories/UsersRepository";
import { Request, Response } from "express";


class PiuController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { text } = request.body;
        const user_id = request.user.id;

        const piusRepository = new PiusRepository();
        const usersRepository = new UsersRepository();

        const createPiuService = new CreatePiuService(piusRepository, usersRepository);

        const piu = await createPiuService.execute({ text, user_id });

        return response.status(201).json({ piu });
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const piusRepository = new PiusRepository();
        
        const listPiusService = new ListPiusService(piusRepository);

        const pius = await listPiusService.execute();

        return response.json(pius);
    }
}

export default PiuController;