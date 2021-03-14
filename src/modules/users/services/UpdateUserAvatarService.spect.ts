import AppError from '@shared/errors/AppError';
import FakeStorageProviders from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeRepository from '../repositories/fakes/FakesUsersRepository';
import UpdateUserAvatarService from './UpdateUserServiceAvatar';
// criando uma categoria de teste
describe('UpdateUserAvatar', () => {
  it('should be able to create a new avatar', async () => {
    const fakeRepository = new FakeRepository();
    const fakeStorageProviders = new FakeStorageProviders();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProviders,
    );

    const user = await fakeRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
    // expect(appointment.provider_id).toBe('27');
  });

  it('should not be able to avatar from non existing', async () => {
    const fakeRepository = new FakeRepository();
    const fakeStorageProviders = new FakeStorageProviders();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProviders,
    );

    // await updateUserAvatar.execute({
    //   user_id: 'non-existin-user',
    //   avatarFileName: 'avatar.jpg',
    // });

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existin-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // expect(appointment.provider_id).toBe('27');
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeRepository = new FakeRepository();
    const fakeStorageProviders = new FakeStorageProviders();

    const deleteFIle = jest.spyOn(fakeStorageProviders, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProviders,
    );

    const user = await fakeRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFIle).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
    // expect(appointment.provider_id).toBe('27');
  });
});
