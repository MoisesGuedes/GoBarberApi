// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/Users/repositories/fake/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
describe('ListProviders', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviders = new ListProvidersService(
            fakeUserRepository,
            fakeCacheProvider,
        );
    });
    it('should be able to list providers', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '123456',
        });
        const user2 = await fakeUserRepository.create({
            name: 'John tre',
            email: 'Johntre@gmail.com',
            password: '123456',
        });
        const loggedUser = await fakeUserRepository.create({
            name: 'John Qua',
            email: 'Johnqua@gmail.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
