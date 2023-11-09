"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const pincode_controller_1 = require("./pincode/pincode.controller");
const pincode_service_1 = require("./pincode/pincode.service");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rate_limiter_1.RateLimiterModule.register({
                points: 5,
                duration: 60,
            }),
        ],
        controllers: [app_controller_1.AppController, pincode_controller_1.PincodeController],
        providers: [app_service_1.AppService, pincode_service_1.PincodeService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map