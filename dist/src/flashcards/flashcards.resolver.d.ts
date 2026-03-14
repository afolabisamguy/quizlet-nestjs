import { FlashcardsService } from './flashcards.service';
import { FlashCardInput } from './dto/flashcard.input';
export declare class FlashcardsResolver {
    private readonly flashcardsService;
    constructor(flashcardsService: FlashcardsService);
    createFlashCard(flashcardsInput: FlashCardInput): Promise<{
        flashcardSet: {
            subject: string;
            id: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        question: string;
        answer: string;
        createdAt: Date;
        flashcardSetId: string;
        updateAt: Date;
    }>;
    viewFlashCard(flashcardsInput: FlashCardInput): Promise<{
        flashcard: {
            id: string;
            question: string;
            answer: string;
            createdAt: Date;
            flashcardSetId: string;
            updateAt: Date;
        };
    }>;
    viewAllFlashcardss(context: any): Promise<({
        flashcardSet: {
            subject: string;
            id: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        question: string;
        answer: string;
        createdAt: Date;
        flashcardSetId: string;
        updateAt: Date;
    })[]>;
    updateFlashcards(flashcardsInput: FlashCardInput, context: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcards(userId: string, flashcardsInput: FlashCardInput): Promise<{
        id: string;
        question: string;
        answer: string;
        createdAt: Date;
        flashcardSetId: string;
        updateAt: Date;
    }>;
}
