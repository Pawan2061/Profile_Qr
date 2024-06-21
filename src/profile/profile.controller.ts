import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/add-profile.dto';
import { diskStorage } from 'multer';

@Controller('profile')
export class ProfileController {
  constructor(
    private prisma: PrismaService,
    private profileService: ProfileService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  createProfile(
    @Body() dto: CreateProfileDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpq)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('done');

    console.log(file);

    return this.profileService.createProfile(dto, file);
  }
}
