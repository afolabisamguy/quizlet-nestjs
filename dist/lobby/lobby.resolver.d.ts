import { LobbyService } from './lobby.service';
import { CreateLobbyInput } from './dto/create-lobby.input';
import { JoinLobbyInput } from './dto/join-lobby.input';
import { UpdateLeaderboardInput } from './dto/update-leaderboard.input';
import { SubmitAnswerInput } from './dto/submit-answer.input';
export declare class LobbyResolver {
    private readonly lobbyService;
    constructor(lobbyService: LobbyService);
    createLobby(createLobbyInput: CreateLobbyInput, context: any): Promise<any>;
    joinLobby(joinLobbyInput: JoinLobbyInput, context: any): Promise<any>;
    startLobby(lobbyCode: string, context: any): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        creatorUserId: string;
        flashCardSetId: string;
        participantIds: string[];
    }>;
    updateLeaderboard(updateLeaderboardInput: UpdateLeaderboardInput, context: any): Promise<any>;
    submitAnswer(submitAnswerInput: SubmitAnswerInput, context: any): Promise<{
        lobbyCode: any;
        lobbyStatus: any;
        isCorrect: boolean;
        scoreDelta: number;
        standing: any;
        leaderboard: any;
        answeredAt: Date;
    }>;
    lobby(lobbyCode: string): Promise<any>;
    leaderboard(lobbyCode: string): Promise<any>;
    leaderboardUpdated(lobbyCode: string): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
}
