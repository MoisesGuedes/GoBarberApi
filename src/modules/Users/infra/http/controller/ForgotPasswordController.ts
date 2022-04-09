import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgetPasswordEmailService from '@modules/Users/services/SendForgetPasswordEmailService';

export default class ForgotPasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgetPasswordEmailService = container.resolve(
            SendForgetPasswordEmailService,
        );

        await sendForgetPasswordEmailService.execute({
            email,
        });

        return response.status(204).json();
    }
}
