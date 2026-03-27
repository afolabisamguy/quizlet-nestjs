import { Module } from '@nestjs/common';

import { FlashcardSetsService } from './flashcard-sets.service';

import { FlashcardSetsResolver } from './flashcard-sets.resolver';

import { JwtStrategy } from 'src/auth/guards/jwt.strategy';

import { PrismaModule } from 'src/prisma/prisma.module';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [FlashcardSetsResolver, FlashcardSetsService, JwtStrategy],

  exports: [FlashcardSetsService],

  imports: [
    PrismaModule,

    PassportModule,

    JwtModule.register({
      secret: 'fola_is_a_good_boy',

      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class FlashcardSetsModule {}
