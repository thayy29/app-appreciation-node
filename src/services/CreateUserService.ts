import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}
class CreateUserService {
  async execute({name, email, admin} : IUserRequest) {
    const usersRepository = new UsersRepositories();

    // Verificar se o email está preenchido
    if(!email) {
      throw new Error("e-mail incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    }) 

    // Verificar se o usuário já existe
    if(userAlreadyExists) {
      throw new Error("User already exists")
    }

    // Crio a instância e salvo o objeto no database
    const user = usersRepository.create({
      name,
      email,
      admin
    });

    await usersRepository.save(user);

    return user;
  }
  
}






export { CreateUserService};

