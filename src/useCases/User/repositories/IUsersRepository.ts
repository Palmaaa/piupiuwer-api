import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../model/User';

interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    findByUsernameWithRelations(username: string): Promise<User | undefined>;    
    findById(id: string): Promise<User | undefined>;  
    updateEmailVerification(id: string): Promise<User>;  
    create(data: CreateUserDTO): Promise<User>;
    save(data: User): Promise<User>;
}

export default IUsersRepository;