import IUsersRepository from "@useCases/User/repositories/IUsersRepository";
import Piu from "../model/Piu";
import IPiusRepository from "../repositories/IPiusRepository";

interface IRequest {
    text: string;
    user_id: string;
}

class CreatePiuService {
    private usersRepository: IUsersRepository;
    private piusRepository: IPiusRepository;
    
    constructor(piusRepository: IPiusRepository, usersRepository: IUsersRepository) {
        this.piusRepository = piusRepository;
        this.usersRepository = usersRepository;
    }

    public async execute({ text, user_id }: IRequest): Promise<Piu> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new Error('User not found');
        }

        if (text === '' || text.length > 140) {
            throw new Error('Invalid piu');
        }

        const piu = await this.piusRepository.create({ text, user_id });

        await this.piusRepository.save(piu);

        return piu;
    }
}

export default CreatePiuService;