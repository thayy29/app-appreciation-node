import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verificar se o email existe
    const user = await usersRepositories.findOne({
      email,
    });
    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    //Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //Gerar o token
    const token = sign(
      {
        email: user.email,
      },
      "073ff814-c326-4610-b432-f6867bb8be38",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export { AuthenticateUserService };
