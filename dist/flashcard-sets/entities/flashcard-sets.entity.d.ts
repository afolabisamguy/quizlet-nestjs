import { User } from 'src/auth/entities/auth.entity';
import { Flashcards } from 'src/flashcards/entities/flashcards.entities';
import { Lobby } from 'src/lobby/entity/lobby.entity';
export declare class FlashCardSets {
    id: string;
    user: User;
    subject: string;
    flashcards: Flashcards;
    numberOfCards: number;
    lobby: Lobby;
}
