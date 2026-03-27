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
exports.Flashcards = void 0;
const graphql_1 = require("@nestjs/graphql");
const flashcard_sets_entity_1 = require("../../flashcard-sets/entities/flashcard-sets.entity");
let Flashcards = class Flashcards {
    id;
    flashcardSetId;
    flashcardSet;
    question;
    answer;
    createdAt;
    updateAt;
};
exports.Flashcards = Flashcards;
__decorate([
    (0, graphql_1.Field)({ description: 'The id of the flashcard' }),
    __metadata("design:type", String)
], Flashcards.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'The flashcard set id' }),
    __metadata("design:type", String)
], Flashcards.prototype, "flashcardSetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => flashcard_sets_entity_1.FlashCardSets, {
        description: 'The set the flashcard is in',
        nullable: true,
    }),
    __metadata("design:type", flashcard_sets_entity_1.FlashCardSets)
], Flashcards.prototype, "flashcardSet", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'The question of the flashcard.' }),
    __metadata("design:type", String)
], Flashcards.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'The answer of the flashcard.' }),
    __metadata("design:type", String)
], Flashcards.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Flashcards.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Flashcards.prototype, "updateAt", void 0);
exports.Flashcards = Flashcards = __decorate([
    (0, graphql_1.ObjectType)()
], Flashcards);
//# sourceMappingURL=flashcards.entities.js.map