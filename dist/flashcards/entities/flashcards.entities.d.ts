import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
export declare class Flashcards {
    id: string;
    flashcardSetId: string;
    flashcardSet?: FlashCardSets;
    question: string;
    answer: string;
    createdAt?: Date;
    updateAt?: Date;
}
