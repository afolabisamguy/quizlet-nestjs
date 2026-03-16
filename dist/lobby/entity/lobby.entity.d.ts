import { User } from 'src/auth/entities/auth.entity';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
export declare class Lobby {
    id: string;
    participatingPlayers: User[];
    flashcardSets: FlashCardSets;
    lobbyStatus: string;
    lobbyCode: string;
}
