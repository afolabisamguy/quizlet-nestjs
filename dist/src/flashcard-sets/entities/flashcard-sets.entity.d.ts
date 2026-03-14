import { User } from 'src/auth/entities/auth.entity';
import { Flashcards } from 'src/flashcards/entities/flashcards.entities';
export declare class FlashCardSets {
    id: string;
    user: User;
    subject: string;
    flashcards: Flashcards;
}
