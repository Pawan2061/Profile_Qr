import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/add-profile.dto';
import { imageFileFilter } from 'src/utils/fileImageFIlter';

@Controller('profile')
export class ProfileController {
  constructor(
    private prisma: PrismaService,
    private profileService: ProfileService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  createProfile(
    @Body() dto: CreateProfileDto,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.profileService.createProfile(dto, file);
  }
}
