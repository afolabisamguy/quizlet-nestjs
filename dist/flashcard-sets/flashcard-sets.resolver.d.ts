import { FlashcardSetsService } from './flashcard-sets.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
export declare class FlashcardSetsResolver {
    private readonly flashcardSetsService;
    constructor(flashcardSetsService: FlashcardSetsService);
    createFlashCardSet(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
    } & {
        subject: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
    viewFlashCardSet(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
    } & {
        subject: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
    viewAllFlashcardSetss(context: any): Promise<({
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
    } & {
        subject: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    })[]>;
    updateFlashcardSets(flashcardsetsInput: FlashCardSetsInput, context: any): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
    } & {
        subject: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
    deleteFlashcardSets(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
    } & {
        subject: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
}
