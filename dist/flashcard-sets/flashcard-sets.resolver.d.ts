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
        id: string;
        subject: string;
        numberOfCards: number;
        createdAt: Date;
        updateAt: Date;
        userId: string;
    }>;
    viewFlashCardSet(flashcardSetsInput: FlashCardSetsInput, context: any): Promise<{
        userId: string;
        flashcardSet: {
            id: string;
            subject: string;
            numberOfCards: number;
            createdAt: Date;
            updateAt: Date;
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
        id: string;
        subject: string;
        numberOfCards: number;
        createdAt: Date;
        updateAt: Date;
        userId: string;
    })[]>;
    updateFlashcardSets(flashcardsetsInput: FlashCardSetsInput, context: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcardSets(userId: string, flashcardSetsInput: FlashCardSetsInput): Promise<{
        id: string;
        subject: string;
        numberOfCards: number;
        createdAt: Date;
        updateAt: Date;
        userId: string;
    }>;
}
