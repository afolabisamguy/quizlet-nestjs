import { Leaderboard } from './leaderboard.entity';
import { LeaderboardEntry } from './leaderboard-entry.entity';
export declare class AnsweredQuestion {
    lobbyCode: string;
    lobbyStatus: string;
    flashcardId: string;
    question: string;
    answer: string;
    isCorrect: boolean;
    scoreDelta: number;
    standing: LeaderboardEntry;
    leaderboard: Leaderboard;
    answeredAt: Date;
}
