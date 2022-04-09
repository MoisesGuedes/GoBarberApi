import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { inject, injectable } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from '../Models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private MailTemplateProvider: IMailTemplateProvider,
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-2',
            }),
        });

        const SESConfig = {
            apiVersion: '2010-12-01',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
            region: 'us-east-2',
        };

        aws.config.update(SESConfig);
    }

    public async sendEmail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;

        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.name || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.MailTemplateProvider.parse(templateData),
        });
    }
}
