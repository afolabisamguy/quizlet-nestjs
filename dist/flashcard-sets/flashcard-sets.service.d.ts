import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
export declare class FlashcardSetsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFlashcardSet(flashcardSetsInput: FlashCardSetsInput, userId: string): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
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
    viewFlashcardSet(subject: string, userId: string): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
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
    viewAllFlashcardSets(userId: string): Promise<({
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
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
    updateFlashcardSets(flashcardSetsInput: FlashCardSetsInput, userId: string): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
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
    deleteFlashcardSets(subject: string, userId: string): Promise<{
        flashcards: {
            id: string;
            createdAt: Date;
            updateAt: Date;
            flashcardSetId: string;
            question: string;
            answer: string;
        }[];
        user: {
            id: string;
            email: string;
            fullname: string;
            password: string;
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
}
