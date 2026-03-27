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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashCardSets = void 0;
const graphql_1 = require("@nestjs/graphql");
const flashcards_entities_1 = require("../../flashcards/entities/flashcards.entities");
let FlashCardSets = class FlashCardSets {
    id;
    userId;
    subject;
    numberOfCards;
    flashcards;
    createdAt;
};
exports.FlashCardSets = FlashCardSets;
__decorate([
    (0, graphql_1.Field)({ description: 'The id of the flashcard set' }),
    __metadata("design:type", String)
], FlashCardSets.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'The user id of the flashcard set creator' }),
    __metadata("design:type", String)
], FlashCardSets.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'The subject for the flashcard set.' }),
    __metadata("design:type", String)
], FlashCardSets.prototype, "subject", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'The total number of cards in the flashcard set',
    }),
    __metadata("design:type", Number)
], FlashCardSets.prototype, "numberOfCards", void 0);
__decorate([
    (0, graphql_1.Field)(() => [flashcards_entities_1.Flashcards], {
        description: 'The flashcards in the flashcard set',
        nullable: true,
    }),
    __metadata("design:type", Array)
], FlashCardSets.prototype, "flashcards", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], FlashCardSets.prototype, "createdAt", void 0);
exports.FlashCardSets = FlashCardSets = __decorate([
    (0, graphql_1.ObjectType)()
], FlashCardSets);
//# sourceMappingURL=flashcard-sets.entity.js.map