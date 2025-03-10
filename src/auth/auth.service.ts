import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, verifyPassword } from 'src/utils/hashing';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async signIn(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email }})
        if(!user) throw new NotFoundException('user not found');
        else if(!await verifyPassword(password, user.password)) throw new UnauthorizedException('Invalid credentials');

        return {
            token: this.jwtService.sign({ id: user.id, role: user.role }),
            id: user.id,
            role: user.role
        }
    }

    async signUp(name: string, email: string, password: string, role: 'USER' | 'AGENT') {
        const user = await this.prisma.user.findUnique({ where: { email }})
        if(user) throw new UnauthorizedException('Email alredy registered')

        const hashed_password = await hashPassword(password);
        const new_user = this.prisma.user.create({
            data: {
                name,
                email,
                password: hashed_password,
                role
            }
        });

        return new_user;
    }

    async forgotPassword() {
        return 'This will handle the forgot password function'
    }

    async resetPassword() {
        return 'This will handle the reset password function'
    }

    async verifyEmail() {
        return 'This will handle user email verification'
    }
}
