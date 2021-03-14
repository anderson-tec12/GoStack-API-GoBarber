import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('john Tre');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to change to anther user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'John Doe2',
      email: 'johndoe2@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe2',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com',
      password: '123123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123123');
  });

  it('should not be able to update the password witout old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'john Tre',
        email: 'johntre@example.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'john Tre',
        email: 'johntre@example.com',
        password: '123123123',
        old_password: 'wrong old password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able show profile from non-existing', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing user_id ',
        email: '',
        name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
