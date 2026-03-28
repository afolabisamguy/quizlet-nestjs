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
exports.LobbyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const lobby_pubsub_1 = require("./lobby.pubsub");
const lobby_code_util_1 = require("./lobby-code.util");
let LobbyService = class LobbyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLobby(createLobbyInput, userId) {
        await this.ensureUserExists(userId);
        await this.ensureFlashcardSetExists(createLobbyInput.flashCardSetId);
        const existingLobbyCodes = new Set((await this.prisma.lobby.findMany({
            select: { lobbyCode: true },
        })).map((lobby) => lobby.lobbyCode));
        const lobbyCode = await (0, lobby_code_util_1.generateLobbyCode)(existingLobbyCodes);
        const lobby = await this.prisma.$transaction(async (tx) => {
            const createdLobby = await tx.lobby.create({
                data: {
                    lobbyCode,
                    lobbyStatus: 'WAITING',
                    creatorUserId: userId,
                    flashCardSetId: createLobbyInput.flashCardSetId,
                    participantIds: [userId],
                },
            });
            const leaderboard = await tx.leaderboard.create({
                data: {
                    lobbyId: createdLobby.id,
                },
            });
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { lobbyIds: true },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    lobbyIds: Array.from(new Set([...(user?.lobbyIds ?? []), createdLobby.id])),
                },
            });
            await tx.leaderboardEntry.create({
                data: {
                    leaderboardId: leaderboard.id,
                    lobbyId: createdLobby.id,
                    playerId: userId,
                },
            });
            return this.getLobbyByCodeFromClient(tx, lobbyCode);
        });
        await this.recalculateLeaderboard(this.prisma, lobby.id, lobby.leaderboard.id);
        await this.publishLeaderboardUpdate(lobby.leaderboard);
        return lobby;
    }
    async startLobby(lobbyCode, userId) {
        const lobby = await this.prisma.lobby.findUnique({
            where: {
                lobbyCode: lobbyCode.trim().toUpperCase(),
            },
        });
        if (!lobby) {
            throw new common_1.NotFoundException('Lobby not found');
        }
        if (lobby.creatorUserId !== userId) {
            throw new common_1.ConflictException('Only the lobby creator can start the lobby');
        }
        if (lobby.lobbyStatus !== 'WAITING') {
            throw new common_1.ConflictException('Lobby has already started');
        }
        const updatedLobby = await this.prisma.lobby.update({
            where: { id: lobby.id },
            data: {
                lobbyStatus: 'ACTIVE',
            },
            include: {
                leaderboard: true,
            },
        });
        const lobbyist = await this.getLobbyByCodeFromClient(this.prisma, lobbyCode);
        await this.publishLeaderboardUpdate(lobbyist.leaderboard);
        return updatedLobby;
    }
    async joinLobby(joinLobbyInput, userId) {
        await this.ensureUserExists(userId);
        const existingLobby = await this.prisma.lobby.findUnique({
            where: {
                lobbyCode: joinLobbyInput.lobbyCode.trim().toUpperCase(),
            },
            include: {
                leaderboard: true,
            },
        });
        if (!existingLobby || !existingLobby.leaderboard) {
            throw new common_1.NotFoundException('Lobby not found');
        }
        if (existingLobby.lobbyStatus !== 'WAITING') {
            throw new common_1.ConflictException('Cannot join a lobby that has already started');
        }
        const leaderboard = existingLobby.leaderboard;
        const lobby = await this.prisma.$transaction(async (tx) => {
            const nextParticipantIds = Array.from(new Set([...existingLobby.participantIds, userId]));
            if (nextParticipantIds.length !== existingLobby.participantIds.length) {
                await tx.lobby.update({
                    where: { id: existingLobby.id },
                    data: {
                        participantIds: {
                            set: [...new Set([...existingLobby.participantIds, userId])],
                        },
                    },
                });
                const user = await tx.user.findUnique({
                    where: { id: userId },
                    select: { lobbyIds: true },
                });
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        lobbyIds: Array.from(new Set([...(user?.lobbyIds ?? []), existingLobby.id])),
                    },
                });
            }
            await tx.leaderboardEntry.upsert({
                where: {
                    leaderboardId_playerId: {
                        leaderboardId: leaderboard.id,
                        playerId: userId,
                    },
                },
                update: {},
                create: {
                    leaderboardId: leaderboard.id,
                    lobbyId: existingLobby.id,
                    playerId: userId,
                },
            });
            await this.recalculateLeaderboard(tx, existingLobby.id, leaderboard.id);
        });
        const lobbyist = await this.getLobbyByCodeFromClient(this.prisma, joinLobbyInput.lobbyCode);
        await this.publishLeaderboardUpdate(lobbyist.leaderboard);
        return lobbyist;
    }
    async updateLeaderboard(updateLeaderboardInput, userId) {
        const leaderboard = await this.prisma.$transaction(async (tx) => {
            const lobby = await this.getLobbyRecordOrThrow(tx, updateLeaderboardInput.lobbyCode);
            const activeLeaderboard = lobby.leaderboard;
            if (!lobby.participantIds.includes(userId)) {
                throw new common_1.ConflictException('Player is not part of this lobby');
            }
            await tx.leaderboardEntry.upsert({
                where: {
                    leaderboardId_playerId: {
                        leaderboardId: activeLeaderboard.id,
                        playerId: userId,
                    },
                },
                update: {
                    score: updateLeaderboardInput.score,
                    correctAnswers: updateLeaderboardInput.correctAnswers ?? 0,
                    incorrectAnswers: updateLeaderboardInput.incorrectAnswers ?? 0,
                    streak: updateLeaderboardInput.streak ?? 0,
                },
                create: {
                    leaderboardId: activeLeaderboard.id,
                    lobbyId: lobby.id,
                    playerId: userId,
                    score: updateLeaderboardInput.score,
                    correctAnswers: updateLeaderboardInput.correctAnswers ?? 0,
                    incorrectAnswers: updateLeaderboardInput.incorrectAnswers ?? 0,
                    streak: updateLeaderboardInput.streak ?? 0,
                },
            });
            await this.recalculateLeaderboard(tx, lobby.id, activeLeaderboard.id);
            return this.getLeaderboardByCodeFromClient(tx, updateLeaderboardInput.lobbyCode);
        });
        await this.publishLeaderboardUpdate(leaderboard);
        return leaderboard;
    }
    async submitAnswer(submitAnswerInput, userId) {
        const txResult = await this.prisma.$transaction(async (tx) => {
            const lobby = await this.getLobbyRecordOrThrow(tx, submitAnswerInput.lobbyCode);
            if (lobby.lobbyStatus !== 'ACTIVE') {
                throw new common_1.ConflictException('Lobby is not active');
            }
            if (!lobby.participantIds.includes(userId)) {
                throw new common_1.ConflictException('Player is not part of this lobby');
            }
            const existingEntry = await tx.leaderboardEntry.findUnique({
                where: {
                    leaderboardId_playerId: {
                        leaderboardId: lobby.leaderboard.id,
                        playerId: userId,
                    },
                },
            });
            const nextScore = Math.max(0, (existingEntry?.score ?? 0) + submitAnswerInput.scoreDelta);
            const nextCorrectAnswers = (existingEntry?.correctAnswers ?? 0) +
                (submitAnswerInput.isCorrect ? 1 : 0);
            const nextIncorrectAnswers = (existingEntry?.incorrectAnswers ?? 0) +
                (submitAnswerInput.isCorrect ? 0 : 1);
            const nextStreak = submitAnswerInput.isCorrect
                ? (existingEntry?.streak ?? 0) + 1
                : 0;
            await tx.leaderboardEntry.upsert({
                where: {
                    leaderboardId_playerId: {
                        leaderboardId: lobby.leaderboard.id,
                        playerId: userId,
                    },
                },
                update: {
                    score: nextScore,
                    correctAnswers: nextCorrectAnswers,
                    incorrectAnswers: nextIncorrectAnswers,
                    streak: nextStreak,
                },
                create: {
                    leaderboardId: lobby.leaderboard.id,
                    lobbyId: lobby.id,
                    playerId: userId,
                    score: nextScore,
                    correctAnswers: nextCorrectAnswers,
                    incorrectAnswers: nextIncorrectAnswers,
                    streak: nextStreak,
                },
            });
            return {
                lobbyId: lobby.id,
                leaderboardId: lobby.leaderboard.id,
                lobbyCode: lobby.code,
            };
        });
        await this.recalculateLeaderboard(this.prisma, txResult.lobbyId, txResult.leaderboardId);
        const leaderboard = await this.getLeaderboardByCodeFromClient(this.prisma, submitAnswerInput.lobbyCode);
        const standing = leaderboard.entries.find((entry) => entry.player.id === userId);
        if (!standing) {
            throw new common_1.NotFoundException('Leaderboard entry not found');
        }
        const result = {
            lobbyCode: leaderboard.lobbyCode,
            lobbyStatus: leaderboard.lobbyStatus,
            isCorrect: submitAnswerInput.isCorrect,
            scoreDelta: submitAnswerInput.scoreDelta,
            standing,
            leaderboard,
            answeredAt: new Date(),
        };
        await this.publishLeaderboardUpdate(leaderboard);
        return result;
    }
    async getLobbyByCode(lobbyCode) {
        return this.getLobbyByCodeFromClient(this.prisma, lobbyCode);
    }
    async getLeaderboardByCode(lobbyCode) {
        return this.getLeaderboardByCodeFromClient(this.prisma, lobbyCode);
    }
    async ensureUserExists(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async ensureFlashcardSetExists(flashCardSetId) {
        const flashCardSet = await this.prisma.flashcardSets.findUnique({
            where: { id: flashCardSetId },
        });
        if (!flashCardSet) {
            throw new common_1.NotFoundException('Flashcard set not found');
        }
    }
    async resolveLobbyCode(preferredCode) {
        const baseCode = preferredCode?.trim().toUpperCase();
        if (baseCode) {
            const existingLobby = await this.prisma.lobby.findUnique({
                where: { lobbyCode: baseCode },
            });
            if (existingLobby) {
                throw new common_1.ConflictException('Lobby code already exists');
            }
            return baseCode;
        }
        let generatedCode = '';
        do {
            generatedCode = Math.random().toString(36).slice(2, 8).toUpperCase();
        } while (await this.prisma.lobby.findUnique({
            where: { lobbyCode: generatedCode },
        }));
        return generatedCode;
    }
    async recalculateLeaderboard(client, lobbyId, leaderboardId) {
        const entries = await client.leaderboardEntry.findMany({
            where: {
                lobbyId,
                leaderboardId,
            },
            include: {
                player: {
                    select: {
                        username: true,
                        fullname: true,
                    },
                },
            },
        });
        const sortedEntries = [...entries].sort((left, right) => {
            if (right.score !== left.score) {
                return right.score - left.score;
            }
            if (right.correctAnswers !== left.correctAnswers) {
                return right.correctAnswers - left.correctAnswers;
            }
            if (right.streak !== left.streak) {
                return right.streak - left.streak;
            }
            const leftUpdatedAt = new Date(left.updatedAt).getTime();
            const rightUpdatedAt = new Date(right.updatedAt).getTime();
            if (leftUpdatedAt !== rightUpdatedAt) {
                return leftUpdatedAt - rightUpdatedAt;
            }
            return left.player.username.localeCompare(right.player.username);
        });
        await Promise.all(sortedEntries.map((entry, index) => client.leaderboardEntry.update({
            where: { id: entry.id },
            data: {
                rank: index + 1,
            },
        })));
    }
    async getLobbyRecordOrThrow(client, lobbyCode) {
        const lobby = await client.lobby.findUnique({
            where: {
                lobbyCode: lobbyCode.trim().toUpperCase(),
            },
            include: {
                leaderboard: true,
            },
        });
        if (!lobby || !lobby.leaderboard) {
            throw new common_1.NotFoundException('Lobby not found');
        }
        return lobby;
    }
    async getLobbyByCodeFromClient(client, lobbyCode) {
        const lobby = await client.lobby.findUnique({
            where: {
                lobbyCode: lobbyCode.trim().toUpperCase(),
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        fullname: true,
                    },
                },
                participatingPlayers: {
                    select: {
                        id: true,
                        username: true,
                        fullname: true,
                    },
                },
                flashCardSet: {
                    select: {
                        id: true,
                        subject: true,
                        numberOfCards: true,
                        flashcards: {
                            select: {
                                question: true,
                                answer: true,
                            },
                        },
                    },
                },
                leaderboard: {
                    include: {
                        entries: {
                            include: {
                                player: {
                                    select: {
                                        id: true,
                                        username: true,
                                        fullname: true,
                                    },
                                },
                            },
                            orderBy: {
                                rank: 'asc',
                            },
                        },
                    },
                },
            },
        });
        if (!lobby || !lobby.leaderboard) {
            throw new common_1.NotFoundException('Lobby not found');
        }
        return {
            ...lobby,
            leaderboard: {
                ...lobby.leaderboard,
                lobbyCode: lobby.lobbyCode,
                lobbyStatus: lobby.lobbyStatus,
            },
        };
    }
    async getLeaderboardByCodeFromClient(client, lobbyCode) {
        const lobby = await this.getLobbyByCodeFromClient(client, lobbyCode);
        return lobby.leaderboard;
    }
    async publishLeaderboardUpdate(leaderboard) {
        await lobby_pubsub_1.lobbyPubSub.publish('leaderboard.updated', {
            leaderboardUpdated: leaderboard,
        });
    }
};
exports.LobbyService = LobbyService;
exports.LobbyService = LobbyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LobbyService);
//# sourceMappingURL=lobby.service.js.map