import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  createProfile(@UploadedFile() file: Express.Multer.File) {
    console.log('done');
    console.log(file);

    return 'hello this is pawan';
  }
}
