/* eslint-disable camelcase */
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/Users/dtos/ICreateUserDTO';
import User from '@modules/Users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '../../dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async findAllProvider({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

    public async create(userData: ICreateUsersDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    save(user: User): Promise<User> | User {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;
