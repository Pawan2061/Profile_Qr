import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaService],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
