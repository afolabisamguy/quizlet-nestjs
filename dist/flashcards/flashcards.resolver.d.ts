import { FlashcardsService } from './flashcards.service';
import { FlashCardInput } from './dto/flashcard.input';
export declare class FlashcardsResolver {
    private readonly flashcardsService;
    constructor(flashcardsService: FlashcardsService);
    createFlashCard(flashcardsInput: FlashCardInput): Promise<{
        flashcardSet: {
            id: string;
            subject: string;
            userId: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
        };
    } & {
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
    viewFlashCard(flashcardsInput: FlashCardInput): Promise<{
        flashcard: {
            question: string;
            answer: string;
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
        };
    }>;
    viewAllFlashcardss(context: any): Promise<({
        flashcardSet: {
            id: string;
            subject: string;
            userId: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
        };
    } & {
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    })[]>;
    updateFlashcards(flashcardsInput: FlashCardInput, context: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcards(userId: string, flashcardsInput: FlashCardInput): Promise<{
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
}
