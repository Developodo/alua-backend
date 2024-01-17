import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService],
  imports: [PrismaModule],
})
export class ChallengesModule {}
