import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
export declare class FlashcardSetsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFlashcardSet(flashcardSetsInput: FlashCardSetsInput, userId: string): Promise<{
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
    createFlashcardSetWithFlashcards(flashcardSetsInput: FlashCardSetsInput, userId: string): Promise<({
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
    viewFlashcardSet(subject: string, userId: string): Promise<{
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
    viewAllFlashcardSets(userId: string): Promise<({
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
    updateFlashcardSets(flashcardSetsInput: FlashCardSetsInput, userId: string): Promise<{
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
    deleteFlashcardSets(subject: string, userId: string): Promise<{
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
    private validateFlashcardItems;
}
