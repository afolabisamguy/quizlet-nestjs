import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FlashcardsService } from './flashcards.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FlashCardInput } from './dto/flashcard.input';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
import { Flashcards } from './entities/flashcards.entities';

@Resolver()
export class FlashcardsResolver {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Flashcards)
  createFlashCard(@Args('createFlashCard') flashcardsInput: FlashCardInput) {
    return this.flashcardsService.createFlashcard(flashcardsInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Flashcards, { name: 'flashCard' })
  viewFlashCard(
    @Args('viewFlashCards')
    flashcardsInput: FlashCardInput,
  ) {
    return this.flashcardsService.viewFlashcard(
      flashcardsInput.flashCardSetId,
      flashcardsInput.flashCardId!,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Flashcards], { name: 'flashcards' })
  viewAllFlashcardss(@Context() context) {
    const userId = context.req.user.id;
    return this.flashcardsService.viewAllFlashcards(userId);
  }

  @Mutation(() => Flashcards)
  updateFlashcards(
    @Args('updateFlashcards') flashcardsInput: FlashCardInput,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return this.flashcardsService.updateFlashcards(flashcardsInput, userId);
  }

  @Mutation(() => Flashcards)
  deleteFlashcards(
    @Args('deleteFlashcards') userId: string,
    flashcardsInput: FlashCardInput,
  ) {
    return this.flashcardsService.deleteFlashcards(
      flashcardsInput,
      flashcardsInput.flashCardId!,
    );
  }
}
