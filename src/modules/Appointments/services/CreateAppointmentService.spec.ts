import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });
    it('should to able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123123123',
            user_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        const appointmentDate = new Date(2020, 4, 10, 13);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
            user_id: '123123',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123123',
                user_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an apppointments on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: '123123123',
                user_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an apppointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: '123123123',
                user_id: '123123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to create an apppointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
