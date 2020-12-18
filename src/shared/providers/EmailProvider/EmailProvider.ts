import nodemailer from 'nodemailer';

import IEmailProvider from "./IEmailProvider";

import auth from '../../../config/auth';
import { sign } from "jsonwebtoken";

class EmailProvider implements IEmailProvider {
    public async sendEmail(email: string, id: string): Promise<string> {
        const { secret, expiresIn } = auth.verificationJwt;

        const verificationToken = sign({}, secret, {
            subject: id,
            expiresIn,
        });

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'shirley.keebler37@ethereal.email',
                pass: 'dkNcq2S4bpSJDDpxzd'
            }
        });

        const info = await transporter.sendMail({
            from: 'shirley.keebler37@ethereal.email', // sender address
            to: email, // list of receivers
            subject: "Verifique seu email", // Subject line
            html: `<a href="localhost:3333/verification/${verificationToken}">Clique aqui para verificar</a>`, // html body
        });

        console.log(info);

        return verificationToken;
    }   
}

export default EmailProvider;