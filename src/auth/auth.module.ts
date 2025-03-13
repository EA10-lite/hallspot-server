import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/utils/mail-transports';

@Module({
  imports: [JwtModule.register({ secret: 'JWT_SECRET', signOptions: { expiresIn: '1h' } })],
  providers: [AuthService, PrismaService, MailService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
