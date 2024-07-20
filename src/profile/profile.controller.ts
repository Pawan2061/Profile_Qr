import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProfileDto } from './dto/add-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  // try using minio service to upload the image
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 100);
          const filename = `${uniqueSuffix}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createProfile(
    @Body('name') name: string,
    @Body('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profileImage = file ? `/uploads/${file.filename}` : null;
    const input: CreateProfileDto = {
      email: email,

      name: name,
    };

    return this.profileService.createProfile(input, profileImage);
  }
}
