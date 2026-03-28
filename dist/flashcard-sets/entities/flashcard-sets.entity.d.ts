import { Flashcards } from 'src/flashcards/entities/flashcards.entities';
export declare class FlashCardSets {
    id: string;
    userId: string;
    subject: string;
    numberOfCards: number;
    flashcards?: Flashcards[];
    createdAt?: Date;
}
