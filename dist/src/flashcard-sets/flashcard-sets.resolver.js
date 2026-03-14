"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardSetsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const flashcard_sets_service_1 = require("./flashcard-sets.service");
const flashcard_sets_entity_1 = require("./entities/flashcard-sets.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const flashcard_sets_input_1 = require("./dto/flashcard-sets.input");
let FlashcardSetsResolver = class FlashcardSetsResolver {
    flashcardSetsService;
    constructor(flashcardSetsService) {
        this.flashcardSetsService = flashcardSetsService;
    }
    createFlashCardSet(flashcardSetsInput, context) {
        const userId = context.req.user.Id;
        const id = context.req.flashcardSetId;
        return this.flashcardSetsService.createFlashcardSet(flashcardSetsInput, userId, id);
    }
    viewFlashCardSet(context, flashcardSetsInput) {
        const userId = context.req.user.Id;
        return this.flashcardSetsService.viewFlashcardSet(flashcardSetsInput.subject, userId);
    }
    viewAllFlashcardSetss(context) {
        const userId = context.req.user.id;
        return this.flashcardSetsService.viewAllFlashcardSets(userId);
    }
    updateFlashcardSets(flashcardsetsInput, context) {
        const userId = context.req.user.id;
        return this.flashcardSetsService.updateFlashcardSets(flashcardsetsInput, userId);
    }
    deleteFlashcardSets(userId, flashcardSetsInput) {
        return this.flashcardSetsService.deleteFlashcardSets(flashcardSetsInput.subject, userId);
    }
};
exports.FlashcardSetsResolver = FlashcardSetsResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => flashcard_sets_entity_1.FlashCardSets),
    __param(0, (0, graphql_1.Args)('createFlashCardSet')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashcard_sets_input_1.FlashCardSetsInput, Object]),
    __metadata("design:returntype", void 0)
], FlashcardSetsResolver.prototype, "createFlashCardSet", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => flashcard_sets_entity_1.FlashCardSets, { name: 'flashCardSet' }),
    __param(0, (0, graphql_1.Args)('viewFlashCardSets')),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, flashcard_sets_input_1.FlashCardSetsInput]),
    __metadata("design:returntype", void 0)
], FlashcardSetsResolver.prototype, "viewFlashCardSet", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [flashcard_sets_entity_1.FlashCardSets], { name: 'flashcardsets' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FlashcardSetsResolver.prototype, "viewAllFlashcardSetss", null);
__decorate([
    (0, graphql_1.Mutation)(() => flashcard_sets_entity_1.FlashCardSets),
    __param(0, (0, graphql_1.Args)('updateFlashcardSets')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashcard_sets_input_1.FlashCardSetsInput, Object]),
    __metadata("design:returntype", void 0)
], FlashcardSetsResolver.prototype, "updateFlashcardSets", null);
__decorate([
    (0, graphql_1.Mutation)(() => flashcard_sets_entity_1.FlashCardSets),
    __param(0, (0, graphql_1.Args)('deleteFlashcardSets')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, flashcard_sets_input_1.FlashCardSetsInput]),
    __metadata("design:returntype", void 0)
], FlashcardSetsResolver.prototype, "deleteFlashcardSets", null);
exports.FlashcardSetsResolver = FlashcardSetsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [flashcard_sets_service_1.FlashcardSetsService])
], FlashcardSetsResolver);
//# sourceMappingURL=flashcard-sets.resolver.js.map