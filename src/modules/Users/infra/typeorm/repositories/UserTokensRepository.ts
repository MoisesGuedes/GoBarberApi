/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async generate(userId: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id: userId,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }
}

export default UserTokensRepository;
