import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/ISotorageProvider';
import User from '../infra/typeorm/entities/User';

interface Request {
    userId: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ userId, avatarFilename }: Request): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = fileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
