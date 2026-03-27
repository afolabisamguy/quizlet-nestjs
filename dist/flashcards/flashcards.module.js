"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("../auth/guards/jwt.strategy");
const prisma_module_1 = require("../prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const flashcards_service_1 = require("./flashcards.service");
const flashcards_resolver_1 = require("./flashcards.resolver");
let FlashcardModule = class FlashcardModule {
};
exports.FlashcardModule = FlashcardModule;
exports.FlashcardModule = FlashcardModule = __decorate([
    (0, common_1.Module)({
        providers: [flashcards_resolver_1.FlashcardsResolver, flashcards_service_1.FlashcardsService, jwt_strategy_1.JwtStrategy],
        exports: [flashcards_service_1.FlashcardsService],
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
], FlashcardModule);
//# sourceMappingURL=flashcards.module.js.map