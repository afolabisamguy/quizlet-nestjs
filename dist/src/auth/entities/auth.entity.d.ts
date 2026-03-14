import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
export declare class User {
    id: string;
    fullname: string;
    password: string;
    email: string;
    flashcardSets: FlashCardSets[];
}
