"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardSetsModule = void 0;
const common_1 = require("@nestjs/common");
const flashcard_sets_service_1 = require("./flashcard-sets.service");
const flashcard_sets_resolver_1 = require("./flashcard-sets.resolver");
const jwt_strategy_1 = require("../auth/guards/jwt.strategy");
const prisma_module_1 = require("../prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let FlashcardSetsModule = class FlashcardSetsModule {
};
exports.FlashcardSetsModule = FlashcardSetsModule;
exports.FlashcardSetsModule = FlashcardSetsModule = __decorate([
    (0, common_1.Module)({
        providers: [flashcard_sets_resolver_1.FlashcardSetsResolver, flashcard_sets_service_1.FlashcardSetsService, jwt_strategy_1.JwtStrategy],
        exports: [flashcard_sets_service_1.FlashcardSetsService],
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
], FlashcardSetsModule);
//# sourceMappingURL=flashcard-sets.module.js.map