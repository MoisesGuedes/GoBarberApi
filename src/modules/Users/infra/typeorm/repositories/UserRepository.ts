/* eslint-disable camelcase */
import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/Users/dtos/ICreateUserDTO';
import User from '../entities/User';
import IFindAllProvidersDTO from '../../../dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findAllProvider({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });

        return user;
    }

    save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async create(userData: ICreateUsersDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);
        return user;
    }
}

export default UsersRepository;
