import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
export declare class FlashcardSetsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFlashcardSet(flashcardSetsInput: FlashCardSetsInput, userId: string, id: string): Promise<{
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
    viewFlashcardSet(subject: string, userId: string): Promise<{
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
    viewAllFlashcardSets(userId: string): Promise<({
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
    updateFlashcardSets(flashcardSetsInput: FlashCardSetsInput, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteFlashcardSets(subject: string, userId: string): Promise<{
        id: string;
        subject: string;
        numberOfCards: number;
        createdAt: Date;
        updateAt: Date;
        userId: string;
    }>;
}
