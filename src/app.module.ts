import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HallModule } from './hall/hall.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HallModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
