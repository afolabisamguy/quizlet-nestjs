import { FlashcardsService } from './flashcards.service';
import { FlashCardInput } from './dto/flashcard.input';
import { CreateFlashcardsInput } from './dto/create-flashcards.input';
export declare class FlashcardsResolver {
    private readonly flashcardsService;
    constructor(flashcardsService: FlashcardsService);
    createFlashCard(flashcardsInput: FlashCardInput): Promise<{
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
    createFlashCards(createFlashcardsInput: CreateFlashcardsInput): Promise<({
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
    viewFlashCard(flashcardsInput: FlashCardInput): Promise<{
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
    updateFlashcards(flashcardsInput: FlashCardInput): Promise<{
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
    deleteFlashcards(flashcardsInput: FlashCardInput): Promise<{
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
}
