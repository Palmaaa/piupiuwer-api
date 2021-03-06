import { getRepository, Repository } from 'typeorm';
import CreateUserDTO from '../dtos/CreateUserDTO';

import User from "../model/User";
import IUsersRepository from "./IUsersRepository";


class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {email},
        });

        return user;
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {username},
        });

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {id},
        });

        return user;
    }

    public async findByUsernameWithRelations(username: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { username },
            relations: ['pius', 'likes'],
        });

        return user;
    }
    
    public async create(data: CreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        return user;
    }

    public async save(data: User): Promise<User> {
        const user = await this.ormRepository.save(data);

        return user;
    }

    public async updateEmailVerification(id: string): Promise<User> {
        const updatedUser = await this.ormRepository.save({
            id,
            email_verified: true,
        });

        return updatedUser;
    }
}

export default UsersRepository;