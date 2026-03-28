import { FlashcardSetsService } from './flashcard-sets.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
export declare class FlashcardSetsResolver {
    private readonly flashcardSetsService;
    constructor(flashcardSetsService: FlashcardSetsService);
    createFlashCardSet(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        user: {
            id: string;
            createdAt: Date;
            fullname: string;
            password: string;
            username: string;
            email: string;
            updatedAt: Date;
            lobbyIds: string[];
        };
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            question: string;
            answer: string;
            flashcardSetId: string;
        }[];
    } & {
        id: string;
        subject: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
    createFlashCardSetWithFlashcards(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<({
        user: {
            id: string;
            createdAt: Date;
            fullname: string;
            password: string;
            username: string;
            email: string;
            updatedAt: Date;
            lobbyIds: string[];
        };
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            question: string;
            answer: string;
            flashcardSetId: string;
        }[];
    } & {
        id: string;
        subject: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }) | null>;
    viewFlashCardSet(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        user: {
            id: string;
            createdAt: Date;
            fullname: string;
            password: string;
            username: string;
            email: string;
            updatedAt: Date;
            lobbyIds: string[];
        };
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            question: string;
            answer: string;
            flashcardSetId: string;
        }[];
    } & {
        id: string;
        subject: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
    viewAllFlashcardSetss(context: any): Promise<({
        user: {
            id: string;
            createdAt: Date;
            fullname: string;
            password: string;
            username: string;
            email: string;
            updatedAt: Date;
            lobbyIds: string[];
        };
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            question: string;
            answer: string;
            flashcardSetId: string;
        }[];
    } & {
        id: string;
        subject: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    })[]>;
    updateFlashcardSets(flashcardsetsInput: FlashCardSetsInput, context: any): Promise<{
        user: {
            id: string;
            createdAt: Date;
            fullname: string;
            password: string;
            username: string;
            email: string;
            updatedAt: Date;
            lobbyIds: string[];
        };
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            question: string;
            answer: string;
            flashcardSetId: string;
        }[];
    } & {
        id: string;
        subject: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
    deleteFlashcardSets(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        user: {
            id: string;
            createdAt: Date;
            fullname: string;
            password: string;
            username: string;
            email: string;
            updatedAt: Date;
            lobbyIds: string[];
        };
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            question: string;
            answer: string;
            flashcardSetId: string;
        }[];
    } & {
        id: string;
        subject: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
}
