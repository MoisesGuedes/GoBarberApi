import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });
    it('should to able to athenticate', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'John@gmail.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'John@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not to be able to authenticate with wrong password', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'John@gmail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
