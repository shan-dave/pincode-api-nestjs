"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PincodeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let PincodeService = class PincodeService {
    async getPincodeDetails(pincode) {
        try {
            const response = await axios_1.default.get(`https://api.postalpincode.in/pincode/${pincode}`, {
                timeout: 30000,
            });
            const data = response.data[0];
            console.log(data.Status);
            if (data.Status == 'Error') {
                throw new common_1.HttpException('Pincode not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                data: this.transformData(data),
                statusCode: common_1.HttpStatus.OK
            };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.code === 'ECONNABORTED') {
                throw new common_1.HttpException({
                    success: false,
                    message: 'Third-party API request timed out',
                    statusCode: common_1.HttpStatus.GATEWAY_TIMEOUT
                }, common_1.HttpStatus.GATEWAY_TIMEOUT);
            }
            else {
                throw new common_1.HttpException({
                    success: false,
                    message: error.message || 'Error fetching pincode details',
                    statusCode: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR
                }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    transformData(data) {
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
};
exports.PincodeService = PincodeService;
exports.PincodeService = PincodeService = __decorate([
    (0, common_1.Injectable)()
], PincodeService);
//# sourceMappingURL=pincode.service.js.map