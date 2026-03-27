import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { FlashcardSetsService } from './flashcard-sets.service';

import { FlashCardSets } from './entities/flashcard-sets.entity';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UseGuards } from '@nestjs/common';

import { FlashCardSetsInput } from './dto/flashcard-sets.input';

@Resolver()
export class FlashcardSetsResolver {
  constructor(private readonly flashcardSetsService: FlashcardSetsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FlashCardSets)
  createFlashCardSet(
    @Args('createFlashCardSetInput') flashcardSetsInput: FlashCardSetsInput,
    @Context() context,
  ) {
    const userId = context.req.user.id;

    return this.flashcardSetsService.createFlashcardSet(
      flashcardSetsInput,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => FlashCardSets, { name: 'flashCardSet' })
  viewFlashCardSet(
    @Args('viewFlashCardSetInput') flashcardSetsInput: FlashCardSetsInput,

    @Context() context,
  ) {
    const userId = context.req.user.id;

    return this.flashcardSetsService.viewFlashcardSet(
      flashcardSetsInput.subject,

      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [FlashCardSets], { name: 'flashcardsets' })
  viewAllFlashcardSetss(@Context() context) {
    const userId = context.req.user.id;

    return this.flashcardSetsService.viewAllFlashcardSets(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FlashCardSets)
  updateFlashcardSets(
    @Args('updateFlashCardSetInput') flashcardsetsInput: FlashCardSetsInput,

    @Context() context,
  ) {
    const userId = context.req.user.id;

    return this.flashcardSetsService.updateFlashcardSets(
      flashcardsetsInput,

      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FlashCardSets)
  deleteFlashcardSets(
    @Args('deleteFlashCardSetInput') flashcardSetsInput: FlashCardSetsInput,
    @Context() context,
  ) {
    return this.flashcardSetsService.deleteFlashcardSets(
      flashcardSetsInput.subject,

      context.req.user.id,
    );
  }
}
