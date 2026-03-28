import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { FlashCardInput } from './dto/flashcard.input';
import { CreateFlashcardsInput } from './dto/create-flashcards.input';
import { FlashcardItemInput } from './dto/flashcard-item.input';

@Injectable()
export class FlashcardsService {
  constructor(private prismaService: PrismaService) {}

  async createFlashcard(flashcardsInput: FlashCardInput) {
    if (!flashcardsInput.question || !flashcardsInput.answer) {
      throw new NotFoundException('Question and answer are required');
    }

    const [flashcard] = await this.createFlashcards({
      flashCardSetId: flashcardsInput.flashCardSetId,
      flashcards: [
        {
          question: flashcardsInput.question,
          answer: flashcardsInput.answer,
        },
      ],
    });

    return flashcard;
  }

  async createFlashcards(createFlashcardsInput: CreateFlashcardsInput) {
    await this.ensureFlashcardSetExists(createFlashcardsInput.flashCardSetId);
    this.validateFlashcardItems(createFlashcardsInput.flashcards);

    const flashcards = await this.prismaService.$transaction(async (tx) => {
      const createdFlashcards = await Promise.all(
        createFlashcardsInput.flashcards.map((flashcard) =>
          tx.flashcards.create({
            data: {
              answer: flashcard.answer,
              question: flashcard.question,
              flashcardSetId: createFlashcardsInput.flashCardSetId,
            },
            include: { flashcardSet: true },
          }),
        ),
      );

      await tx.flashcardSets.update({
        where: {
          id: createFlashcardsInput.flashCardSetId,
        },
        data: {
          numberOfCards: {
            increment: createFlashcardsInput.flashcards.length,
          },
        },
      });

      return createdFlashcards;
    });

    return flashcards;
  }

  async viewFlashcard(flashcardSetsId: string, flashCardId: string) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashcardSetsId,
      },
    });

    if (!flashExists) {
      throw new NotFoundException('Flashcard set not found');
    }

    const flashcard = await this.prismaService.flashcards.findUnique({
      where: {
        id: flashCardId,
      },

      include: {
        flashcardSet: true,
      },
    });

    if (!flashcard || flashcard.flashcardSetId !== flashcardSetsId) {
      throw new NotFoundException('the flashcard for this id does not exist');
    }

    return flashcard;
  }

  async viewAllFlashcards(flashCardSetId: string) {
    const flashCardSetExists =
      await this.prismaService.flashcardSets.findUnique({
        where: {
          id: flashCardSetId,
        },
      });

    if (!flashCardSetExists) {
      throw new NotFoundException('Flashcard set not found');
    }

    const flashcards = await this.prismaService.flashcards.findMany({
      where: {
        flashcardSetId: flashCardSetId,
      },

      include: {
        flashcardSet: true,
      },
    });

    return flashcards;
  }

  async updateFlashcards(
    flashcardsInput: FlashCardInput,

    flashcardId: string,
  ) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashcardsInput.flashCardSetId,
      },
    });

    if (!flashExists) {
      throw new NotFoundException('Flashcard set not found');
    }

    const flashcard = await this.prismaService.flashcards.findUnique({
      where: {
        id: flashcardId,
      },
    });

    if (
      !flashcard ||
      flashcard.flashcardSetId !== flashcardsInput.flashCardSetId
    ) {
      throw new NotFoundException('Flashcard not found');
    }

    const flashcards = await this.prismaService.flashcards.update({
      where: {
        id: flashcardId,
      },

      data: {
        question: flashcardsInput.question ?? flashcard.question,

        answer: flashcardsInput.answer ?? flashcard.answer,
      },

      include: {
        flashcardSet: true,
      },
    });

    return flashcards;
  }

  async deleteFlashcards(flashcardInput: FlashCardInput, flashcardId: string) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashcardInput.flashCardSetId,
      },
    });

    if (!flashExists) {
      throw new NotFoundException('Flashcard set not found');
    }

    const flashcard = await this.prismaService.flashcards.findUnique({
      where: {
        id: flashcardId,
      },
    });

    if (
      !flashcard ||
      flashcard.flashcardSetId !== flashcardInput.flashCardSetId
    ) {
      throw new NotFoundException('Flashcard not found');
    }

    const flashcards = await this.prismaService.$transaction(async (tx) => {
      const deletedFlashcard = await tx.flashcards.delete({
        where: {
          id: flashcardId,
        },

        include: {
          flashcardSet: true,
        },
      });

      await tx.flashcardSets.update({
        where: {
          id: flashcardInput.flashCardSetId,
        },

        data: {
          numberOfCards: {
            decrement: 1,
          },
        },
      });

      return deletedFlashcard;
    });

    return flashcards;
  }

  private async ensureFlashcardSetExists(flashCardSetId: string) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashCardSetId,
      },
    });

    if (!flashExists) {
      throw new NotFoundException('Flashcard set not found');
    }
  }

  private validateFlashcardItems(flashcards: FlashcardItemInput[]) {
    const hasInvalidFlashcard = flashcards.some(
      (flashcard) => !flashcard.question || !flashcard.answer,
    );

    if (hasInvalidFlashcard) {
      throw new NotFoundException(
        'Each flashcard requires a question and answer',
      );
    }
  }
}
