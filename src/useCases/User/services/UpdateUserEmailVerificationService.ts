import auth from "config/auth";
import { verify } from "jsonwebtoken";
import User from "../model/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    token: string;
}

interface ITokenPayload {
    sub: string;
    exp: number;
}

class UpdateUserEmailVerification {
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({ token }: IRequest): Promise<User> {
        try {
            const decoded = verify(token, auth.verificationJwt.secret);

            const { sub } = decoded as ITokenPayload;

            const user = await this.usersRepository.findById(sub);
            
            if (!user)
                throw new Error();

            if (user.email_verified)
                throw new Error('Email already verified');

            const userUpdated = await this.usersRepository.updateEmailVerification(sub);

            return userUpdated;
        } catch(error) {
            throw new Error('Invalid verification token');
        }
    }
}

export default UpdateUserEmailVerification;