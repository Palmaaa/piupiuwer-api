import { Request, Response } from 'express';

import HashProvider from '../../../shared/providers/HashProvider/HashProvider';
import UsersRepository from '@useCases/User/repositories/UsersRepository';

import CreateUsersService from '@useCases/User/services/CreateUserService';
import ShowUserService from '@useCases/User/services/ShowUserService';
import EmailProvider from 'shared/providers/EmailProvider/EmailProvider';

class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {first_name, last_name, email, photo, about, password, username} = request.body;
        
        const hashProvider = new HashProvider();
        const usersRepository = new UsersRepository();
        const emailProvider = new EmailProvider();

        const createUsersService = new CreateUsersService(usersRepository, hashProvider, emailProvider);

        return response.status(201).json(
            await createUsersService.execute({
                about,
                email,
                first_name,
                last_name,
                password,
                photo,
                username,
        }));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const username = request.query.username as string;

        const usersRepository = new UsersRepository();

        const showUserService = new ShowUserService(usersRepository);
        
        const user = await showUserService.execute({ username });

        return response.json(user);
    }

}

export default UsersController;