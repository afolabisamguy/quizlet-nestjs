import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardInput } from './dto/flashcard.input';
export declare class FlashcardsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFlashcard(flashcardsInput: FlashCardInput): Promise<{
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
    viewFlashcard(flashcardSetsId: string, flashCardId: string): Promise<{
        flashcard: {
            id: string;
            question: string;
            answer: string;
            createdAt: Date;
            flashcardSetId: string;
            updateAt: Date;
        };
    }>;
    viewAllFlashcards(flashCardSetId: string): Promise<({
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
    updateFlashcards(flashcardsInput: FlashCardInput, flashcardSetId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcards(flashcardInput: FlashCardInput, flashcardId: string): Promise<{
        id: string;
        question: string;
        answer: string;
        createdAt: Date;
        flashcardSetId: string;
        updateAt: Date;
    }>;
}
