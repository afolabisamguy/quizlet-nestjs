import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FlashCardSetsInput } from './dto/flashcard-sets.input';
import { FlashCardSets } from './entities/flashcard-sets.entity';

@Injectable()
export class FlashcardSetsService {
  constructor(private prismaService: PrismaService) {}
  async createFlashcardSet(
    flashcardSetsInput: FlashCardSetsInput,
    userId: string,
    id: string,
  ) {
    console.log(`user: ${userId}`);
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const cards = await this.prismaService.flashcards.findMany({
      where: {
        id: id,
      },
    });
    const numberOfCards = cards.length;

    const flashcardSets = await this.prismaService.flashcardSets.create({
      data: {
        subject: flashcardSetsInput.subject,
        userId,
        numberOfCards: numberOfCards,
      },
      include: { user: true },
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
    });
    if (!flashcardSet) {
      throw new NotFoundException(
        'the flashcardSet for this id does not exist',
      );
    }
    return {
      userId: userId,
      flashcardSet,
    };
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
      },
    });
    console.log('We reached here');
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
    const flashcardsets = await this.prismaService.flashcardSets.updateMany({
      where: {
        userId: userId,
      },
      data: {
        subject: flashcardSetsInput.subject,
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
    const flashcardsets = await this.prismaService.flashcardSets.delete({
      where: {
        subject,
      },
    });
    return flashcardsets;
  }
}
