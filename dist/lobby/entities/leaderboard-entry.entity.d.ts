import { LobbyPlayer } from './lobby-player.entity';
export declare class LeaderboardEntry {
    id: string;
    lobbyId: string;
    player: LobbyPlayer;
    rank: number;
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
    streak: number;
    updatedAt: Date;
}
