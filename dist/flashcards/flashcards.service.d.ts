import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardInput } from './dto/flashcard.input';
export declare class FlashcardsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFlashcard(flashcardsInput: FlashCardInput): Promise<{
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
    viewFlashcard(flashcardSetsId: string, flashCardId: string): Promise<{
        flashcard: {
            question: string;
            answer: string;
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
        };
    }>;
    viewAllFlashcards(flashCardSetId: string): Promise<({
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
    updateFlashcards(flashcardsInput: FlashCardInput, flashcardSetId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcards(flashcardInput: FlashCardInput, flashcardId: string): Promise<{
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
}
