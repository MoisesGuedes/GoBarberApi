// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgetPasswordEmailService from './SendForgetPasswordEmailService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgetPasswordEmail: SendForgetPasswordEmailService;

describe('SendForgetPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgetPasswordEmail = new SendForgetPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        await sendForgetPasswordEmail.execute({
            email: 'John@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });
    it('should be able to recover a non-existing user password', async () => {
        await expect(
            sendForgetPasswordEmail.execute({
                email: 'John@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should generate forget password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456',
        });

        await sendForgetPasswordEmail.execute({
            email: 'John@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
