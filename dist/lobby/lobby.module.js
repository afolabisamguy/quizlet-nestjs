"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyModule = void 0;
const common_1 = require("@nestjs/common");
const lobby_service_1 = require("./lobby.service");
const lobby_resolver_1 = require("./lobby.resolver");
const prisma_module_1 = require("../prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("../auth/guards/jwt.strategy");
let LobbyModule = class LobbyModule {
};
exports.LobbyModule = LobbyModule;
exports.LobbyModule = LobbyModule = __decorate([
    (0, common_1.Module)({
        providers: [lobby_resolver_1.LobbyResolver, lobby_service_1.LobbyService, jwt_strategy_1.JwtStrategy],
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'fola_is_a_good_boy',
                signOptions: {
                    expiresIn: '1h',
                },
            }),
        ],
    })
], LobbyModule);
//# sourceMappingURL=lobby.module.js.map