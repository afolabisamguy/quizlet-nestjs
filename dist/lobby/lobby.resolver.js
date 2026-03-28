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
exports.LobbyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const lobby_service_1 = require("./lobby.service");
const lobby_entity_1 = require("./entities/lobby.entity");
const leaderboard_entity_1 = require("./entities/leaderboard.entity");
const answered_question_entity_1 = require("./entities/answered-question.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_lobby_input_1 = require("./dto/create-lobby.input");
const join_lobby_input_1 = require("./dto/join-lobby.input");
const update_leaderboard_input_1 = require("./dto/update-leaderboard.input");
const submit_answer_input_1 = require("./dto/submit-answer.input");
const lobby_pubsub_1 = require("./lobby.pubsub");
let LobbyResolver = class LobbyResolver {
    lobbyService;
    constructor(lobbyService) {
        this.lobbyService = lobbyService;
    }
    createLobby(createLobbyInput, context) {
        return this.lobbyService.createLobby(createLobbyInput, context.req.user.id);
    }
    joinLobby(joinLobbyInput, context) {
        return this.lobbyService.joinLobby(joinLobbyInput, context.req.user.id);
    }
    startLobby(lobbyCode, context) {
        return this.lobbyService.startLobby(lobbyCode, context.req.user.id);
    }
    updateLeaderboard(updateLeaderboardInput, context) {
        return this.lobbyService.updateLeaderboard(updateLeaderboardInput, context.req.user.id);
    }
    submitAnswer(submitAnswerInput, context) {
        return this.lobbyService.submitAnswer(submitAnswerInput, context.req.user.id);
    }
    lobby(lobbyCode) {
        return this.lobbyService.getLobbyByCode(lobbyCode);
    }
    leaderboard(lobbyCode) {
        return this.lobbyService.getLeaderboardByCode(lobbyCode);
    }
    leaderboardUpdated(lobbyCode) {
        void lobbyCode;
        return lobby_pubsub_1.lobbyPubSub.asyncIterableIterator('leaderboard.updated');
    }
};
exports.LobbyResolver = LobbyResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => lobby_entity_1.Lobby),
    __param(0, (0, graphql_1.Args)('createLobbyInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lobby_input_1.CreateLobbyInput, Object]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "createLobby", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => lobby_entity_1.Lobby),
    __param(0, (0, graphql_1.Args)('joinLobbyInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_lobby_input_1.JoinLobbyInput, Object]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "joinLobby", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => lobby_entity_1.Lobby),
    __param(0, (0, graphql_1.Args)('lobbyCode')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "startLobby", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => leaderboard_entity_1.Leaderboard),
    __param(0, (0, graphql_1.Args)('updateLeaderboardInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_leaderboard_input_1.UpdateLeaderboardInput, Object]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "updateLeaderboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => answered_question_entity_1.AnsweredQuestion),
    __param(0, (0, graphql_1.Args)('submitAnswerInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_answer_input_1.SubmitAnswerInput, Object]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "submitAnswer", null);
__decorate([
    (0, graphql_1.Query)(() => lobby_entity_1.Lobby, { name: 'lobby' }),
    __param(0, (0, graphql_1.Args)('lobbyCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "lobby", null);
__decorate([
    (0, graphql_1.Query)(() => leaderboard_entity_1.Leaderboard, { name: 'leaderboard' }),
    __param(0, (0, graphql_1.Args)('lobbyCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "leaderboard", null);
__decorate([
    (0, graphql_1.Subscription)(() => leaderboard_entity_1.Leaderboard, {
        filter: (payload, variables) => payload.leaderboardUpdated.lobbyCode ===
            variables.lobbyCode.trim().toUpperCase(),
        resolve: (payload) => payload.leaderboardUpdated,
    }),
    __param(0, (0, graphql_1.Args)('lobbyCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LobbyResolver.prototype, "leaderboardUpdated", null);
exports.LobbyResolver = LobbyResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [lobby_service_1.LobbyService])
], LobbyResolver);
//# sourceMappingURL=lobby.resolver.js.map