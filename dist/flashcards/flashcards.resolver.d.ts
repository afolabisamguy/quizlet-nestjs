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
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
        question: string;
        answer: string;
    }>;
    viewFlashCard(flashcardsInput: FlashCardInput): Promise<{
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
    updateFlashcards(flashcardsInput: FlashCardInput): Promise<{
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
    deleteFlashcards(flashcardsInput: FlashCardInput): Promise<{
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
