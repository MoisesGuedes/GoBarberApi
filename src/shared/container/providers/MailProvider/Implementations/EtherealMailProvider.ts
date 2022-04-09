import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../Models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private MailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(accout => {
            const transporter = nodemailer.createTransport({
                host: accout.smtp.host,
                port: accout.smtp.port,
                secure: accout.smtp.secure,
                auth: {
                    user: accout.user,
                    pass: accout.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendEmail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.name || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.MailTemplateProvider.parse(templateData),
        });

        console.log('Message send: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
