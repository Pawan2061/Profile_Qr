import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as BwipJs from 'bwip-js';
import { CreateProfileDto } from './dto/add-profile.dto';
import { error } from 'console';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async createProfile(dto: CreateProfileDto, file: any) {
    console.log(dto);
    console.log(file);
    const ans = await this.createQrProfile(dto.email, dto.name);
    const base64 = ans.toString('base64');
    const dataUrl = `${base64}`;

    console.log(dataUrl);

    return await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        profileImage: dataUrl,
      },
    });
  }

  private async createQrProfile(email: string, name: string): Promise<Buffer> {
    const barcodeText = `${email}|${name}`;

    return new Promise<Buffer>((resolve, reject) => {
      BwipJs.toBuffer(
        {
          bcid: 'qrcode',
          text: barcodeText,
          textxalign: 'center',
        },
        (err: any, png: Buffer) => {
          if (err) {
            console.log('error generating qrcoee', error);
            reject(err);
          } else {
            resolve(png);
          }
        },
      );
    });
  }
}
