import { IsNumberString, Length } from 'class-validator';

export class PincodeDto {
  @IsNumberString({ no_symbols: true }, { message: 'PIN code should be a number' })
  @Length(6, 6, { message: 'PIN code should be 6 digits long' })
  pincode: string;
}