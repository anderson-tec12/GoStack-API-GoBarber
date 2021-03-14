import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeRepository: FakeRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(
      fakeRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to authenticate ', async () => {
    const user = await createUser.execuse({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
    // expect(appointment.provider_id).toBe('27');
  });

  it('should not br able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // expect(appointment.provider_id).toBe('27');
  });

  it('should not br able to authenticate with non wrong password', async () => {
    await createUser.execuse({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);

    // expect(appointment.provider_id).toBe('27');
  });
});
