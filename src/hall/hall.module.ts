import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'JWT_SECRET', signOptions: { expiresIn: '1h' } })],
  providers: [HallService, PrismaService, JwtStrategy],
  controllers: [HallController]
})
export class HallModule {}
