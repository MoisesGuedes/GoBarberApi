import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordEmailService from '@modules/Users/services/resetPasswordService';

export default class ResetPasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;

        const resetPasswordService = container.resolve(
            ResetPasswordEmailService,
        );

        await resetPasswordService.execute({
            token,
            password,
        });

        return response.status(204).json();
    }
}
