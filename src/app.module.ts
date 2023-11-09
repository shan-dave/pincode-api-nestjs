import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PincodeController } from './pincode/pincode.controller';
import { PincodeService } from './pincode/pincode.service';
import { RateLimiterModule } from 'nestjs-rate-limiter'

@Module({
  imports: [
    RateLimiterModule.register({
      points: 5,
      duration: 60,
    }),
  ],
  controllers: [AppController, PincodeController],
  providers: [AppService, PincodeService],
})

export class AppModule {}
