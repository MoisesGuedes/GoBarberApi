import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUserRepository);
    });
    it('should be able show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('John@gmail.com');
    });
    it('should not be able show the profile from non-existing user', async () => {
        await expect(
            showProfile.execute({
                user_id: 'non-existing-user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
