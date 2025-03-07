import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageKitService } from './imagekit.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ImageKitService],
})
export class AppModule {}
