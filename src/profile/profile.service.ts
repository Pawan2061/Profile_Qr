import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/add-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async createProfile(dto: CreateProfileDto, file: any) {
    console.log(dto);

    return await this.prisma.user.create({
      data: {
        id: dto.id,
        email: dto.email,
        name: dto.name,
        profileImage: file,
      },
    });
  }
}
