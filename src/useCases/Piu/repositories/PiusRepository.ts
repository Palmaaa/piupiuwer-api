import { getRepository, Repository } from "typeorm";
import CreatePiuDTO from "../dtos/CreatePiuDTO";
import Piu from "../model/Piu";
import IPiusRepository from "./IPiusRepository";


class PiusRepository implements IPiusRepository {
    private ormRepository: Repository<Piu>;

    constructor() {
        this.ormRepository = getRepository(Piu);
    }

    public async create(data: CreatePiuDTO): Promise<Piu> {
        const piu = this.ormRepository.create(data);

        return piu;
    }
    
    public async save(data: Piu): Promise<Piu> {
        const piu = await this.ormRepository.save(data);

        return piu;
    }

    public async find(): Promise<Piu[]> {
        const pius = await this.ormRepository.find({
            relations: ['user', 'likes', 'likes.user']
        });

        return pius;
    }
}

export default PiusRepository;