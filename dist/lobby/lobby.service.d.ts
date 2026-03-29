import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLobbyInput } from './dto/create-lobby.input';
import { JoinLobbyInput } from './dto/join-lobby.input';
import { UpdateLeaderboardInput } from './dto/update-leaderboard.input';
import { SubmitAnswerInput } from './dto/submit-answer.input';
export declare class LobbyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createLobby(createLobbyInput: CreateLobbyInput, userId: string): Promise<any>;
    startLobby(lobbyCode: string, userId: string): Promise<{
        leaderboard: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyId: string;
        } | null;
    } & {
        id: string;
        lobbyCode: string;
        lobbyStatus: string;
        creatorUserId: string;
        flashCardSetId: string;
        participantIds: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    joinLobby(joinLobbyInput: JoinLobbyInput, userId: string): Promise<any>;
    updateLeaderboard(updateLeaderboardInput: UpdateLeaderboardInput, userId: string): Promise<any>;
    submitAnswer(submitAnswerInput: SubmitAnswerInput, userId: string): Promise<{
        lobbyCode: any;
        lobbyStatus: any;
        isCorrect: boolean;
        scoreDelta: number;
        standing: any;
        leaderboard: any;
        answeredAt: Date;
    }>;
    getLobbyByCode(lobbyCode: string): Promise<any>;
    getLeaderboardByCode(lobbyCode: string): Promise<any>;
    private ensureUserExists;
    private ensureFlashcardSetExists;
    private resolveLobbyCode;
    private recalculateLeaderboard;
    private getLobbyRecordOrThrow;
    private getLobbyByCodeFromClient;
    private getLeaderboardByCodeFromClient;
    private publishLeaderboardUpdate;
    private withWriteConflictRetry;
    private isWriteConflictError;
    private delay;
}
