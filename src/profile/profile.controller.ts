import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class ProfileController {
  constructor(
    private prisma: PrismaService,
    private profileService: ProfileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createProfile() {}
}
