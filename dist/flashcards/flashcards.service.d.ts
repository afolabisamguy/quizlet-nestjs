import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardInput } from './dto/flashcard.input';
import { CreateFlashcardsInput } from './dto/create-flashcards.input';
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
    createFlashcards(createFlashcardsInput: CreateFlashcardsInput): Promise<({
        flashcardSet: {
            subject: string;
            id: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    })[]>;
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
    private ensureFlashcardSetExists;
    private validateFlashcardItems;
}
