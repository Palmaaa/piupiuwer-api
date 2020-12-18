import IEmailProvider from "shared/providers/EmailProvider/IEmailProvider";
import IHashProvider from "shared/providers/HashProvider/IHashProvider";
import User from "../model/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    about: string;
    photo: string;
    password: string;
}

class CreateUserService {
    private usersRepository: IUsersRepository;
    private hashProvider: IHashProvider;
    private emailProvider: IEmailProvider;

    constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider, emailProvider: IEmailProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.emailProvider = emailProvider;
    }

    public async execute({username, first_name, last_name, email, about, photo, password}: IRequest): Promise<{ user: User, verificationToken: string}> {
        const emailUsed = await this.usersRepository.findByEmail(email);

        if (emailUsed)
            throw new Error('Email already used');

        const usernameUsed = await this.usersRepository.findByUsername(username);

        if (usernameUsed)
            throw new Error('Username already used');

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            username,
            password: hashedPassword,
            about,
            first_name,
            last_name,
            email,
            photo,
        });

        await this.usersRepository.save(user);

        const verificationToken = await this.emailProvider.sendEmail(email, user.id);

        return { user, verificationToken };
    }
}

export default CreateUserService;