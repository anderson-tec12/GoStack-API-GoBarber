// import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository_')
    private usersRepository: IUsersRepository,

    @inject('StorageProviders')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    // const userRepository = getRepository(User);

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
      // //apagar avatar anterior
      // const userAvatarFilePath = path.join(uploadConfig.tmpFolder, user.avatar);
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // //verificando se exite
      // if (userAvatarFileExists) {
      //   await fs.promises.unlink(userAvatarFilePath);
      // }
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    // user.avatar = avatarFileName;
    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
