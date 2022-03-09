// import { User } from '../entities/User';
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
class CreateUserService {
  async execute({name, email, admin = false, password} : IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

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

    // Criptografar a senha
    const passwordHash = await hash (password, 8)

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);
    return user;
  }
  
}

export { CreateUserService};

