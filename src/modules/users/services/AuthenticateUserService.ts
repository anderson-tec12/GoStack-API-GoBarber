// import { getRepository } from 'typeorm';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvaider';
// import User from '../model/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository_')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // const usersRepository = getRepository(User);

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      // throw new Error('Incorrect email/password combination.');
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password - Senha criptografia
    // password - senha não criptografada
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      // throw new Error('Incorrect email/password combination.');
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // usuario autenticado
    // hash gobarber
    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
