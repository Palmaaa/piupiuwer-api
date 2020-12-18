import { sign } from 'jsonwebtoken';

import auth from '../../../config/auth';

import IHashProvider from "shared/providers/HashProvider/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import User from '../model/User';

interface IRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    private usersRepository: IUsersRepository;
    private hashProvider: IHashProvider;

    constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({ email, password }: IRequest): Promise<{ user: User, token: string }> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new Error('User email not found');

        if (!user.email_verified)
            throw new Error('Verify your email');

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) 
            throw new Error('Wrong email or password');

        const { secret, expiresIn } = auth.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user, 
            token,
        }
    }
}


export default AuthenticateUserService;