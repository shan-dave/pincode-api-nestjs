import { PincodeService } from './pincode.service';
import { PincodeDto } from '../dto/pincode.dto';
export declare class PincodeController {
    private readonly pincodeService;
    constructor(pincodeService: PincodeService);
    getPincodeDetails(params: PincodeDto): Promise<{
        success: boolean;
        data: {
            Area: any;
            City: any;
            District: any;
            State: any;
            Country: any;
            Pincode: any;
        };
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
