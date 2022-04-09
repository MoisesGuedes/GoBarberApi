import { container } from 'tsyringe';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UserRepository';

import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/Users/infra/typeorm/repositories/UserTokensRepository';
import '@modules/Users/providers';
import './providers';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);
