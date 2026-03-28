import { Leaderboard } from './leaderboard.entity';
import { LobbyPlayer } from './lobby-player.entity';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
export declare class Lobby {
    id: string;
    lobbyCode: string;
    lobbyStatus: string;
    flashCardSet: FlashCardSets;
    createdBy: LobbyPlayer;
    participatingPlayers: LobbyPlayer[];
    leaderboard: Leaderboard;
    createdAt: Date;
    updatedAt: Date;
}
