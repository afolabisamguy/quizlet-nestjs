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
    @Args('createFlashCardSet') flashcardSetsInput: FlashCardSetsInput,
    @Context() context,
  ) {
    const userId = context.req.user.Id;
    const id = context.req.flashcardSetId;
    return this.flashcardSetsService.createFlashcardSet(
      flashcardSetsInput,
      userId,
      id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => FlashCardSets, { name: 'flashCardSet' })
  viewFlashCardSet(
    @Args('viewFlashCardSets')
    @Context()
    context,
    flashcardSetsInput: FlashCardSetsInput,
  ) {
    const userId = context.req.user.Id;
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

  @Mutation(() => FlashCardSets)
  updateFlashcardSets(
    @Args('updateFlashcardSets') flashcardsetsInput: FlashCardSetsInput,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return this.flashcardSetsService.updateFlashcardSets(
      flashcardsetsInput,
      userId,
    );
  }

  @Mutation(() => FlashCardSets)
  deleteFlashcardSets(
    @Args('deleteFlashcardSets') userId: string,
    flashcardSetsInput: FlashCardSetsInput,
  ) {
    return this.flashcardSetsService.deleteFlashcardSets(
      flashcardSetsInput.subject,
      userId,
    );
  }
}
