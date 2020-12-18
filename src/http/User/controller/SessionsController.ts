import { Request, Response } from "express";

import HashProvider from '../../../shared/providers/HashProvider/HashProvider';
import UsersRepository from '@useCases/User/repositories/UsersRepository';
import AuthenticateUserService from "@useCases/User/services/AuthenticateUserService";
import UpdateUserEmailVerificationService from "@useCases/User/services/UpdateUserEmailVerificationService";

class SessionsController {
    public async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const hashProvider = new HashProvider();
        const usersRepository = new UsersRepository();
    
        const authenticateUserService = new AuthenticateUserService(usersRepository, hashProvider);

        const { user, token } = await authenticateUserService.execute({ email, password });

        return response.json({ user, token });
    }

    public async update(request: Request, response: Response) {
        const token = request.params.token;

        const usersRepository = new UsersRepository();

        const updateEmailVerification = new UpdateUserEmailVerificationService(usersRepository);

        const user = await updateEmailVerification.execute({ token });
        
        console.log(user);

        return response.json(user);
    }
}

export default SessionsController;