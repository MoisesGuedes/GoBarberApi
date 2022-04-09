import { Request, Response } from 'express';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';
import { classToClass } from 'class-transformer';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // eslint-disable-next-line camelcase
        const provider_id = request.user.id;
        const { day, month, year } = request.query;

        const appointmentRepository = new AppointmentsRepository();
        const redisCacheProvider = new RedisCacheProvider();
        const listProviderAppointments = new ListProviderAppointmentsService(
            appointmentRepository,
            redisCacheProvider,
        );

        const appointment = await listProviderAppointments.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(classToClass(appointment));
    }
}
