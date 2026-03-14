import { FlashcardSetsService } from './flashcard-sets.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
export declare class FlashcardSetsResolver {
    private readonly flashcardSetsService;
    constructor(flashcardSetsService: FlashcardSetsService);
    createFlashCardSet(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        user: {
            id: string;
            fullname: string;
            password: string;
            email: string;
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
    viewFlashCardSet(context: any, flashcardSetsInput: FlashCardSetsInput): Promise<{
        userId: string;
        flashcardSet: {
            subject: string;
            id: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    }>;
    viewAllFlashcardSetss(context: any): Promise<({
        user: {
            id: string;
            fullname: string;
            password: string;
            email: string;
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
    updateFlashcardSets(flashcardsetsInput: FlashCardSetsInput, context: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcardSets(userId: string, flashcardSetsInput: FlashCardSetsInput): Promise<{
        subject: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        numberOfCards: number;
        userId: string;
    }>;
}
