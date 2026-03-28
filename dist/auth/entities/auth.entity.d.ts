import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
export declare class User {
    id: string;
    fullname: string;
    username: string;
    email: string;
    flashcardSets: FlashCardSets[];
    createdAt?: Date;
    updatedAt?: Date;
}
