import User from "../model/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    username: string;
}

class ShowUserService {
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({ username }: IRequest): Promise<User | undefined> {
        if (!username) {
            throw new Error('Missing username parameter');
        }
        
        const user = await this.usersRepository.findByUsernameWithRelations(username);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}

export default ShowUserService;