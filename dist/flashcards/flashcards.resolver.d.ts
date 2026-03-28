import { FlashcardsService } from './flashcards.service';
import { FlashCardInput } from './dto/flashcard.input';
import { CreateFlashcardsInput } from './dto/create-flashcards.input';
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
    createFlashCards(createFlashcardsInput: CreateFlashcardsInput): Promise<({
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
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
        question: string;
        answer: string;
        id: string;
        createdAt: Date;
        updateAt: Date;
        flashcardSetId: string;
    }>;
}
