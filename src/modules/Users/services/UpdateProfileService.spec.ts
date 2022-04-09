import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });
    it('should to able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'Johntrê@example.com',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('Johntrê@example.com');
    });

    it('should not able to change to another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'test@gmail.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'John@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should to able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'Johntrê@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'Johntrê@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password without wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'Johntrê@example.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('Shold not be able to update the profile from non-existing user', async () => {
        expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'text@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
