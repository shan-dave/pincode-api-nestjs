import { Controller, Get, Param, ValidationPipe, UseGuards} from '@nestjs/common';
import { PincodeService } from './pincode.service';
import { PincodeDto } from '../dto/pincode.dto'
import { RateLimiterGuard } from 'nestjs-rate-limiter';

@Controller('pincode')
export class PincodeController {
  constructor(private readonly pincodeService: PincodeService) {}

  @Get(':pincode')
  @UseGuards(RateLimiterGuard)
  async getPincodeDetails(@Param(ValidationPipe) params: PincodeDto) {
    const pincodeDetails = await this.pincodeService.getPincodeDetails(params.pincode);
    return pincodeDetails;
  }
}