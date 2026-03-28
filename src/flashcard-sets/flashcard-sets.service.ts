import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { FlashCardSetsInput } from './dto/flashcard-sets.input';
import { FlashcardItemInput } from 'src/flashcards/dto/flashcard-item.input';

@Injectable()
export class FlashcardSetsService {
  constructor(private prismaService: PrismaService) {}

  async createFlashcardSet(
    flashcardSetsInput: FlashCardSetsInput,

    userId: string,
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const flashcardSets = await this.prismaService.flashcardSets.create({
      data: {
        subject: flashcardSetsInput.subject,

        userId,

        numberOfCards: 0,
      },

      include: { user: true, flashcards: true },
    });

    return flashcardSets;
  }

  async createFlashcardSetWithFlashcards(
    flashcardSetsInput: FlashCardSetsInput,
    userId: string,
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    this.validateFlashcardItems(flashcardSetsInput.flashcards);

    const flashcardSet = await this.prismaService.$transaction(async (tx) => {
      const createdFlashcardSet = await tx.flashcardSets.create({
        data: {
          subject: flashcardSetsInput.subject,
          userId,
          numberOfCards: flashcardSetsInput.flashcards!.length,
        },
      });

      await Promise.all(
        flashcardSetsInput.flashcards!.map((flashcard) =>
          tx.flashcards.create({
            data: {
              question: flashcard.question,
              answer: flashcard.answer,
              flashcardSetId: createdFlashcardSet.id,
            },
          }),
        ),
      );

      return tx.flashcardSets.findUnique({
        where: {
          id: createdFlashcardSet.id,
        },
        include: {
          user: true,
          flashcards: true,
        },
      });
    });

    return flashcardSet;
  }

  async viewFlashcardSet(subject: string, userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const flashcardSet = await this.prismaService.flashcardSets.findUnique({
      where: {
        subject: subject,
      },

      include: {
        user: true,

        flashcards: true,
      },
    });

    if (!flashcardSet || flashcardSet.userId !== userId) {
      throw new NotFoundException(
        'the flashcardSet for this id does not exist',
      );
    }

    return flashcardSet;
  }

  async viewAllFlashcardSets(userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const flashcardsets = await this.prismaService.flashcardSets.findMany({
      where: {
        userId: userId,
      },

      include: {
        user: true,

        flashcards: true,
      },
    });

    return flashcardsets;
  }

  async updateFlashcardSets(
    flashcardSetsInput: FlashCardSetsInput,

    userId: string,
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const flashcardSet = await this.prismaService.flashcardSets.findUnique({
      where: {
        subject: flashcardSetsInput.subject,
      },
    });

    if (!flashcardSet || flashcardSet.userId !== userId) {
      throw new NotFoundException('Flashcard set not found');
    }

    const flashcardsets = await this.prismaService.flashcardSets.update({
      where: {
        id: flashcardSet.id,
      },

      data: {
        subject: flashcardSetsInput.subject,
      },

      include: {
        user: true,

        flashcards: true,
      },
    });

    return flashcardsets;
  }

  async deleteFlashcardSets(subject: string, userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const flashcardSet = await this.prismaService.flashcardSets.findUnique({
      where: {
        subject,
      },
    });

    if (!flashcardSet || flashcardSet.userId !== userId) {
      throw new NotFoundException('Flashcard set not found');
    }

    const flashcardsets = await this.prismaService.flashcardSets.delete({
      where: {
        id: flashcardSet.id,
      },

      include: {
        user: true,

        flashcards: true,
      },
    });

    return flashcardsets;
  }

  private validateFlashcardItems(flashcards?: FlashcardItemInput[]) {
    if (!flashcards?.length) {
      throw new NotFoundException('At least one flashcard is required');
    }

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
