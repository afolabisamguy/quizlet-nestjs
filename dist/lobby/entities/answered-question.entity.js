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
exports.AnsweredQuestion = void 0;
const graphql_1 = require("@nestjs/graphql");
const leaderboard_entity_1 = require("./leaderboard.entity");
const leaderboard_entry_entity_1 = require("./leaderboard-entry.entity");
let AnsweredQuestion = class AnsweredQuestion {
    lobbyCode;
    lobbyStatus;
    flashcardId;
    question;
    answer;
    isCorrect;
    scoreDelta;
    standing;
    leaderboard;
    answeredAt;
};
exports.AnsweredQuestion = AnsweredQuestion;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AnsweredQuestion.prototype, "lobbyCode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AnsweredQuestion.prototype, "lobbyStatus", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AnsweredQuestion.prototype, "flashcardId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AnsweredQuestion.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AnsweredQuestion.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AnsweredQuestion.prototype, "isCorrect", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], AnsweredQuestion.prototype, "scoreDelta", void 0);
__decorate([
    (0, graphql_1.Field)(() => leaderboard_entry_entity_1.LeaderboardEntry),
    __metadata("design:type", leaderboard_entry_entity_1.LeaderboardEntry)
], AnsweredQuestion.prototype, "standing", void 0);
__decorate([
    (0, graphql_1.Field)(() => leaderboard_entity_1.Leaderboard),
    __metadata("design:type", leaderboard_entity_1.Leaderboard)
], AnsweredQuestion.prototype, "leaderboard", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], AnsweredQuestion.prototype, "answeredAt", void 0);
exports.AnsweredQuestion = AnsweredQuestion = __decorate([
    (0, graphql_1.ObjectType)()
], AnsweredQuestion);
//# sourceMappingURL=answered-question.entity.js.map