import { Module } from '@nestjs/common';
import { QRService } from './qr.service';
import { QRcontroller } from './qr.controller';

@Module({
  imports: [],
  controllers: [QRcontroller],
  providers: [QRService],
})
export class QrModule {}
