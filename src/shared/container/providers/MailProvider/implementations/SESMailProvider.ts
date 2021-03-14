import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProviders';
import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

// import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProviders'

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    this.client = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_DRIVER_USER,
        pass: process.env.MAIL_DRIVER_PASS, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const mailOptions = {
      from: 'anderson.barros@cognix.com.br',
      to: 'anderson.tec12@gmail.com',
      subject,
      html: '<h1>TESTE</h1>',
      // text: 'Texte',
    };

    this.client.sendMail(mailOptions, (error: Error, info: any) => {
      if (error) {
        console.log(error);
        console.log({
          user: process.env.MAIL_DRIVER_USER,
          pass: process.env.MAIL_DRIVER_PASS,
        });
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
