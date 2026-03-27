import { Leaderboard } from './leaderboard.entity';
import { LobbyPlayer } from './lobby-player.entity';
export declare class Lobby {
    id: string;
    lobbyCode: string;
    lobbyStatus: string;
    flashCardSetId: string;
    createdBy: LobbyPlayer;
    participatingPlayers: LobbyPlayer[];
    leaderboard: Leaderboard;
    createdAt: Date;
    updatedAt: Date;
}
