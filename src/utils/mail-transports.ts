import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendVerificationEmail(email: string, code: string) {
    const templatePath = path.join(__dirname, 'templates', 'verify-email.html');
    let emailTemplate = fs.readFileSync(templatePath, 'utf8');
    emailTemplate = emailTemplate.replace('{{code}}', code);

    await this.transporter.sendMail({
      from: '"HallSpot" <emanuelanyigor@gmail.com>',
      to: email,
      subject: 'Verify Your Email',
      html: emailTemplate,
    });
  }


  async sendResetPassword(email: string, link: string) {
    const templatePath = path.join(__dirname, '..', 'templates', 'reset-password.html');
    let emailTemplate = fs.readFileSync(templatePath, 'utf8');
    emailTemplate = emailTemplate.replace('{{link}}', link);

    await this.transporter.sendMail({
      from: '"HallSpot" <emanuelanyigor@gmail.com>',
      to: email,
      subject: 'Reset Password',
      html: emailTemplate,
    });
  }
}
