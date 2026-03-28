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
exports.Lobby = void 0;
const graphql_1 = require("@nestjs/graphql");
const leaderboard_entity_1 = require("./leaderboard.entity");
const lobby_player_entity_1 = require("./lobby-player.entity");
const flashcard_sets_entity_1 = require("../../flashcard-sets/entities/flashcard-sets.entity");
let Lobby = class Lobby {
    id;
    lobbyCode;
    lobbyStatus;
    flashCardSet;
    createdBy;
    participatingPlayers;
    leaderboard;
    createdAt;
    updatedAt;
};
exports.Lobby = Lobby;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Lobby.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Lobby.prototype, "lobbyCode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Lobby.prototype, "lobbyStatus", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", flashcard_sets_entity_1.FlashCardSets)
], Lobby.prototype, "flashCardSet", void 0);
__decorate([
    (0, graphql_1.Field)(() => lobby_player_entity_1.LobbyPlayer),
    __metadata("design:type", lobby_player_entity_1.LobbyPlayer)
], Lobby.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => [lobby_player_entity_1.LobbyPlayer]),
    __metadata("design:type", Array)
], Lobby.prototype, "participatingPlayers", void 0);
__decorate([
    (0, graphql_1.Field)(() => leaderboard_entity_1.Leaderboard),
    __metadata("design:type", leaderboard_entity_1.Leaderboard)
], Lobby.prototype, "leaderboard", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Lobby.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Lobby.prototype, "updatedAt", void 0);
exports.Lobby = Lobby = __decorate([
    (0, graphql_1.ObjectType)()
], Lobby);
//# sourceMappingURL=lobby.entity.js.map