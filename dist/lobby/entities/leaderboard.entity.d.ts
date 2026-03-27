import { LeaderboardEntry } from './leaderboard-entry.entity';
export declare class Leaderboard {
    id: string;
    lobbyId: string;
    lobbyCode: string;
    lobbyStatus: string;
    entries: LeaderboardEntry[];
    updatedAt: Date;
}
