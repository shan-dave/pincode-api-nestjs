import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PincodeService {
  async getPincodeDetails(pincode: string) {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`, {
        timeout: 30000,
      });
      const data = response.data[0];
      console.log(data.Status)
      if (data.Status == 'Error') {
        throw new HttpException('Pincode not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        data: this.transformData(data),
        statusCode: HttpStatus.OK
      };
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new HttpException({
              success: false,
              message: 'Third-party API request timed out',
              statusCode: HttpStatus.GATEWAY_TIMEOUT
            }, HttpStatus.GATEWAY_TIMEOUT);
        } else {
          throw new HttpException({
            success: false,
            message: error.message || 'Error fetching pincode details',
            statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR
          }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  }

  private transformData(data: any) {
    const postOffices = data.PostOffice;
    const area = postOffices.map((office) => office.Name);
    const city = postOffices[0].Block;
    const district = postOffices[0].District;
    const state = postOffices[0].State;
    const country = postOffices[0].Country;
    const pincode = postOffices[0].Pincode;

    return {
      Area: area,
      City: city,
      District: district,
      State: state,
      Country: country,
      Pincode: pincode,
    };
  }
}
