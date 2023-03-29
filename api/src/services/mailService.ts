import nodemailer from 'nodemailer';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '../constants';

class MailService {
	SMTP_HOST: string;
	SMTP_PORT: string;
	SMTP_USER: string;
	SMTP_PASSWORD: string;

	transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: SMTP_PORT,
		// // secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASSWORD,
		},
	});
	sendActivationEmail = async (to: string, link: string) => {
		await this.transporter.sendMail({
			// from: process.env.SMTP_USER,
			to,
			subject: `Активация аккаунта на ${process.env.API_URL}`,
			text: '',
			html: `
					<div>
						<h1>для активации перейдите по ссылке</h1>
						<a href="${link}">${link}</a>
					</div>
				`,
		});
	};
}

export default new MailService();
