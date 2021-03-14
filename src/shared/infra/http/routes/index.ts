import { Router } from 'express';
// import appointmentsRouter from './appointments.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordsRoutes from '@modules/users/infra/http/routes/passwords.routes';
import ProfileRoutes from '@modules/users/infra/http/routes/profile.routes';
import testeRouter from './teste.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/teste', testeRouter);
routes.use('/password', PasswordsRoutes);
routes.use('/profile', ProfileRoutes);
routes.use('/providers', providersRouter);
export default routes;
