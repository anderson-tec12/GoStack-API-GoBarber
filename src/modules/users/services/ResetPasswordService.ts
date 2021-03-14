import {isAfter, addHours} from 'date-fns'
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository_')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if(!userToken){
      throw new AppError('User token does not existin')
    }

    const user = await this.usersRepository.findById(userToken?.user_id)

    if(!user){
      throw new AppError('User does not existin')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2)

    if(isAfter(Date.now(),compareDate )){
      throw new AppError('Token expired')
    }


    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService;
