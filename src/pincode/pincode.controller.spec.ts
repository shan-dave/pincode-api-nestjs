import { Test, TestingModule } from '@nestjs/testing';
import { PincodeController } from './pincode.controller';
import { PincodeService } from './pincode.service';
import { PincodeDto } from '../dto/pincode.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RateLimiterGuard } from 'nestjs-rate-limiter';

describe('PincodeController', () => {
  let pincodeController: PincodeController;
  let pincodeService: PincodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PincodeController],
      providers: [PincodeService],
    })
    .overrideGuard(RateLimiterGuard)
    .useValue({ canActivate: () => true })
    .compile();

    pincodeController = module.get<PincodeController>(PincodeController);
    pincodeService = module.get<PincodeService>(PincodeService);
  });

  describe('getPincodeDetails', () => {
    it('Shoud return pincode detail', async () => {
      const mockResponse = {
        success: true,
        data: {
          Area: ['Abd'],
          City: 'Abd',
          District: 'Abd',
          State: 'Guj',
          Country: 'Ind',
          Pincode: '000000',
        },
        statusCode: HttpStatus.OK,
      };
      jest.spyOn(pincodeService, 'getPincodeDetails').mockImplementation(async () => {
        return mockResponse;
      });

      const mockPincodeDto: PincodeDto = { pincode: '123456' };
      const result = await pincodeController.getPincodeDetails(mockPincodeDto);
      expect(result).toEqual(mockResponse);
    });

    it('should handle error response', async () => {
      const errorResponse = new HttpException('Pincode not found', HttpStatus.NOT_FOUND);
      jest.spyOn(pincodeService, 'getPincodeDetails').mockRejectedValue(errorResponse);

      const mockPincodeDto: PincodeDto = { pincode: '123456' };

      try {
        await pincodeController.getPincodeDetails(mockPincodeDto);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe(errorResponse);
      }
    });

    it('should handle a third-party timeout', async () => {
        const errorResponse = new HttpException('Third-party API request timed out', HttpStatus.GATEWAY_TIMEOUT);
        jest.spyOn(pincodeService, 'getPincodeDetails').mockRejectedValue(errorResponse);
      
        const mockPincodeDto: PincodeDto = { pincode: '123456' };
      
        try {
          await pincodeController.getPincodeDetails(mockPincodeDto);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBe(errorResponse);
        }
      });
  });
});
