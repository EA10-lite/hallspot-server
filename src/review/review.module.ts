import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [JwtModule.register({ secret: 'JWT_SECRET', signOptions: { expiresIn: '1h' } })],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, JwtStrategy]
})
export class ReviewModule {}
