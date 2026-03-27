import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { FlashCardSetsInput } from './dto/flashcard-sets.input';

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
}
