import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { FlashCardInput } from './dto/flashcard.input';

@Injectable()
export class FlashcardsService {
  constructor(private prismaService: PrismaService) {}

  async createFlashcard(flashcardsInput: FlashCardInput) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashcardsInput.flashCardSetId,
      },
    });

    if (!flashExists) {
      throw new NotFoundException('Flashcard set not found');
    }

    if (!flashcardsInput.question || !flashcardsInput.answer) {
      throw new NotFoundException('Question and answer are required');
    }

    const flashcards = await this.prismaService.$transaction(async (tx) => {
      const createdFlashcard = await tx.flashcards.create({
        data: {
          answer: flashcardsInput.answer,

          question: flashcardsInput.question,

          flashcardSetId: flashcardsInput.flashCardSetId,
        },

        include: { flashcardSet: true },
      });

      await tx.flashcardSets.update({
        where: {
          id: flashcardsInput.flashCardSetId,
        },

        data: {
          numberOfCards: {
            increment: 1,
          },
        },
      });

      return createdFlashcard;
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
}
