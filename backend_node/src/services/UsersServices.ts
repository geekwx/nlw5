import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UserRepository"

class UserService {
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }


    async create(email: string){
        
        // Veirifcar se o usuario existe

        const userExists = await this.usersRepository.findOne({
            email
        })

        // Se não existir, salvar no DB
        if(userExists){
            return userExists;
        }

        const user= this.usersRepository.create({
            email,
        });
        await this.usersRepository.save(user);


        // Se existir retorna user 

        return user;
    }
}

export { UserService}