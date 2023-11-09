import { HttpStatus } from '@nestjs/common';
export declare class PincodeService {
    getPincodeDetails(pincode: string): Promise<{
        success: boolean;
        data: {
            Area: any;
            City: any;
            District: any;
            State: any;
            Country: any;
            Pincode: any;
        };
        statusCode: HttpStatus;
    }>;
    private transformData;
}
