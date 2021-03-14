import { container } from 'tsyringe';

// importando a depedencias
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// importando onde sera injetado
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import '@modules/users/providers';
import './providers';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository_',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository_',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
