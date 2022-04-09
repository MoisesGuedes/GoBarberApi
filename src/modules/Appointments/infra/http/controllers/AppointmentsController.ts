/* eslint-disable camelcase */
import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;

        const appointmentRepository = new AppointmentsRepository();
        const notificationsRepository = new NotificationsRepository();
        const redisCacheProvider = new RedisCacheProvider();
        const createAppointment = new CreateAppointmentService(
            appointmentRepository,
            notificationsRepository,
            redisCacheProvider,
        );

        const appointment = await createAppointment.execute({
            date,
            provider_id,
            user_id,
        });

        return response.json(appointment);
    }
}
