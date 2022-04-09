import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMounthAvailabilityService from '../../../services/ListProviderMounthAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // eslint-disable-next-line camelcase
        const { provider_id } = request.params;
        const { month, year } = request.query;

        const listProviderMonthAvailability = container.resolve(
            ListProviderMounthAvailabilityService,
        );

        const availability = await listProviderMonthAvailability.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}
