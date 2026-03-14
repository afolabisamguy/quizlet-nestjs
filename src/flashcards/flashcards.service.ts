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
      throw new NotFoundException('User not found');
    }

    const flashcards = await this.prismaService.flashcards.create({
      data: {
        answer: flashcardsInput.answer,
        question: flashcardsInput.question,
        flashcardSetId: flashcardsInput.flashCardSetId,
      },
      include: { flashcardSet: true },
    }); /// not done with page in the slightest
    return flashcards;
  }

  async viewFlashcard(flashcardSetsId: string, flashCardId: string) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashcardSetsId,
      },
    });
    if (!flashExists) {
      throw new NotFoundException('User not found');
    }
    const flashcard = await this.prismaService.flashcards.findUnique({
      where: {
        id: flashCardId,
      },
    });
    if (!flashcard) {
      throw new NotFoundException('the flashcard for this id does not exist');
    }
    return {
      flashcard,
    };
  }

  async viewAllFlashcards(flashCardSetId: string) {
    const flashCardSetExists =
      await this.prismaService.flashcardSets.findUnique({
        where: {
          id: flashCardSetId,
        },
      });
    if (!flashCardSetExists) {
      throw new NotFoundException('User not found');
    }
    const flashcards = await this.prismaService.flashcards.findMany({
      where: {
        flashcardSetId: flashCardSetId,
      },
      include: {
        flashcardSet: true,
      },
    });
    console.log('We reached here');
    return flashcards;
  }

  async updateFlashcards(
    flashcardsInput: FlashCardInput,
    flashcardSetId: string,
  ) {
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: flashcardSetId,
      },
    });
    if (!flashExists) {
      throw new NotFoundException('User not found');
    }
    const flashcards = await this.prismaService.flashcards.updateMany({
      where: {
        flashcardSetId: flashcardSetId,
      },
      data: {
        question: flashcardsInput.question,
        answer: flashcardsInput.answer,
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
    const flashcards = await this.prismaService.flashcards.delete({
      where: {
        id: flashcardId,
      },
    });
    return flashcards;
  }
}
