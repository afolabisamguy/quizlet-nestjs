import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { FlashcardsService } from './flashcards.service';

import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { FlashCardInput } from './dto/flashcard.input';
import { CreateFlashcardsInput } from './dto/create-flashcards.input';

import { Flashcards } from './entities/flashcards.entities';

@Resolver()
export class FlashcardsResolver {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Flashcards)
  createFlashCard(
    @Args('createFlashCardInput') flashcardsInput: FlashCardInput,
  ) {
    return this.flashcardsService.createFlashcard(flashcardsInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [Flashcards])
  createFlashCards(
    @Args('createFlashCardsInput') createFlashcardsInput: CreateFlashcardsInput,
  ) {
    return this.flashcardsService.createFlashcards(createFlashcardsInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Flashcards, { name: 'flashCard' })
  viewFlashCard(@Args('viewFlashCardInput') flashcardsInput: FlashCardInput) {
    return this.flashcardsService.viewFlashcard(
      flashcardsInput.flashCardSetId,

      flashcardsInput.flashCardId!,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Flashcards], { name: 'flashcards' })
  viewAllFlashcards(@Args('flashCardSetId') flashCardSetId: string) {
    return this.flashcardsService.viewAllFlashcards(flashCardSetId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Flashcards)
  updateFlashcards(
    @Args('updateFlashCardInput') flashcardsInput: FlashCardInput,
  ) {
    return this.flashcardsService.updateFlashcards(
      flashcardsInput,

      flashcardsInput.flashCardId!,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Flashcards)
  deleteFlashcards(
    @Args('deleteFlashCardInput') flashcardsInput: FlashCardInput,
  ) {
    return this.flashcardsService.deleteFlashcards(
      flashcardsInput,

      flashcardsInput.flashCardId!,
    );
  }
}
