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
exports.Leaderboard = void 0;
const graphql_1 = require("@nestjs/graphql");
const leaderboard_entry_entity_1 = require("./leaderboard-entry.entity");
let Leaderboard = class Leaderboard {
    id;
    lobbyId;
    lobbyCode;
    lobbyStatus;
    entries;
    updatedAt;
};
exports.Leaderboard = Leaderboard;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Leaderboard.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Leaderboard.prototype, "lobbyId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Leaderboard.prototype, "lobbyCode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Leaderboard.prototype, "lobbyStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [leaderboard_entry_entity_1.LeaderboardEntry]),
    __metadata("design:type", Array)
], Leaderboard.prototype, "entries", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Leaderboard.prototype, "updatedAt", void 0);
exports.Leaderboard = Leaderboard = __decorate([
    (0, graphql_1.ObjectType)()
], Leaderboard);
//# sourceMappingURL=leaderboard.entity.js.map