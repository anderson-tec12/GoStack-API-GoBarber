import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakesUsersRepository';
// import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const showProfile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showProfile.name).toBe('John Doe');
    expect(showProfile.email).toBe('johndoe@example.com');
  });

  it('should not be able show profile from non-existing', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing user_id ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
