import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
    private transporter;
    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: true,
            auth: {
              user: this.configService.get<string>('MAIL_USER'),
              pass: this.configService.get<string>('MAIL_PASS'),
            },
          });
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        const mailOptions = {
            from: this.configService.get<string>('MAIL_NICKNAME'),
            to,
            subject,
            text,
            html,
        };
        return this.transporter.sendMail(mailOptions);
    }

}