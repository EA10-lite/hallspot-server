import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { customAlphabet } from 'nanoid';


import { MailService } from '../utils/mail-transports';
import { hashPassword, verifyPassword } from '../utils/hashing';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private mailService: MailService) {}

    async signIn(signin: SignInDTO) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email: signin.email }})
            if(!user) throw new NotFoundException('No account registered with this email');
            else if(!await verifyPassword(signin.password, user.password)) throw new UnauthorizedException('Incorrect password');
    
            return {
                token: this.jwtService.sign({ id: user.id, role: user.role }),
                id: user.id,
                role: user.role
            }
        } catch (error) {

        }
    }

    async signUp(signup: SignUpDTO) {
        const user = await this.prisma.user.findUnique({ where: { email: signup.email }})
        if(user) throw new UnauthorizedException('Email alredy registered')

        const hashed_password = await hashPassword(signup.password);
        const new_user = this.prisma.user.create({
            data: {
                ...signup,
                password: hashed_password
            }
        });

        return new_user;
    }

    async forgotPassword(email: string) {
        let user = await this.prisma.user.findFirst({ where: { email }});
        if(!user) throw new NotFoundException("No user found with this email!");


        let payload = { id: user.id, email: user.email };
        let token = this.jwtService.sign(payload, { secret: 'JWT_SECRET', expiresIn: '15min'});

        let link = process.env.APP_URL+token;
        await this.mailService.sendResetPassword(user.email, link);
        return { message: "Please check your email to proceed!"};
    }

    async resetPassword(newPassword: string, token: string) {
        try {
            let payload = this.jwtService.verify(token, { secret: 'JWT_SECRET' });
            return await this.prisma.user.update({ 
                where: { id: payload.id, email: payload.email },
                data: {
                    password: await hashPassword(newPassword)
                }
            });
        } catch (error) {
            throw new UnauthorizedException("Invalid or Expired verification code!");
        }
    }

    async verifyEmail(body: ResetPasswordDTO) {
        let { email, code } = body;
        let user = await this.prisma.user.findFirst({ where: { email, code }});
        if(!user) throw new UnauthorizedException("Invalid or Expired verification code!");


        return await this.prisma.user.update({ 
            where: { email, code },
            data: {
                code: null,
                verified: true
            }
        })
    }
}
