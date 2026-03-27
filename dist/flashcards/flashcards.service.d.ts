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
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
        question: string;
        answer: string;
    }>;
    viewFlashcard(flashcardSetsId: string, flashCardId: string): Promise<{
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
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
        question: string;
        answer: string;
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
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
        question: string;
        answer: string;
    })[]>;
    updateFlashcards(flashcardsInput: FlashCardInput, flashcardId: string): Promise<{
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
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
        question: string;
        answer: string;
    }>;
    deleteFlashcards(flashcardInput: FlashCardInput, flashcardId: string): Promise<{
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
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
        question: string;
        answer: string;
    }>;
}
