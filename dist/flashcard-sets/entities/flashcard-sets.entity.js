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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashCardSets = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_entity_1 = require("../../auth/entities/auth.entity");
const flashcards_entities_1 = require("../../flashcards/entities/flashcards.entities");
const lobby_entity_1 = require("../../lobby/entity/lobby.entity");
let FlashCardSets = class FlashCardSets {
    id;
    user;
    subject;
    flashcards;
    numberOfCards;
    lobby;
};
exports.FlashCardSets = FlashCardSets;
__decorate([
    (0, graphql_1.Field)({ description: 'The id of the flashcard set' }),
    __metadata("design:type", String)
], FlashCardSets.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => auth_entity_1.User, { description: "The flashcard set's creator" }),
    __metadata("design:type", auth_entity_1.User)
], FlashCardSets.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'The subject for the flashcard set.' }),
    __metadata("design:type", String)
], FlashCardSets.prototype, "subject", void 0);
__decorate([
    (0, graphql_1.Field)(() => flashcards_entities_1.Flashcards, {
        description: 'The flashcards in the flashcard set',
    }),
    __metadata("design:type", flashcards_entities_1.Flashcards)
], FlashCardSets.prototype, "flashcards", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'The number of flashcards in the flashcard set',
    }),
    __metadata("design:type", Number)
], FlashCardSets.prototype, "numberOfCards", void 0);
__decorate([
    (0, graphql_1.Field)(() => lobby_entity_1.Lobby, {
        description: 'The lobby that the flashcard set is being used in',
    }),
    __metadata("design:type", typeof (_a = typeof lobby_entity_1.Lobby !== "undefined" && lobby_entity_1.Lobby) === "function" ? _a : Object)
], FlashCardSets.prototype, "lobby", void 0);
exports.FlashCardSets = FlashCardSets = __decorate([
    (0, graphql_1.ObjectType)()
], FlashCardSets);
//# sourceMappingURL=flashcard-sets.entity.js.map