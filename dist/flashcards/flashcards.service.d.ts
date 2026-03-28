import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardInput } from './dto/flashcard.input';
import { CreateFlashcardsInput } from './dto/create-flashcards.input';
export declare class FlashcardsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFlashcard(flashcardsInput: FlashCardInput): Promise<{
        flashcardSet: {
            id: string;
            subject: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updateAt: Date;
        question: string;
        answer: string;
        flashcardSetId: string;
    }>;
    createFlashcards(createFlashcardsInput: CreateFlashcardsInput): Promise<({
        flashcardSet: {
            id: string;
            subject: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updateAt: Date;
        question: string;
        answer: string;
        flashcardSetId: string;
    })[]>;
    viewFlashcard(flashcardSetsId: string, flashCardId: string): Promise<{
        flashcardSet: {
            id: string;
            subject: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updateAt: Date;
        question: string;
        answer: string;
        flashcardSetId: string;
    }>;
    viewAllFlashcards(flashCardSetId: string): Promise<({
        flashcardSet: {
            id: string;
            subject: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updateAt: Date;
        question: string;
        answer: string;
        flashcardSetId: string;
    })[]>;
    updateFlashcards(flashcardsInput: FlashCardInput, flashcardId: string): Promise<{
        flashcardSet: {
            id: string;
            subject: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updateAt: Date;
        question: string;
        answer: string;
        flashcardSetId: string;
    }>;
    deleteFlashcards(flashcardInput: FlashCardInput, flashcardId: string): Promise<{
        flashcardSet: {
            id: string;
            subject: string;
            createdAt: Date;
            updateAt: Date;
            numberOfCards: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updateAt: Date;
        question: string;
        answer: string;
        flashcardSetId: string;
    }>;
    private ensureFlashcardSetExists;
    private validateFlashcardItems;
}
