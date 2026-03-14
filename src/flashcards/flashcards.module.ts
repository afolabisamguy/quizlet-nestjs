import { Module } from '@nestjs/common';

import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsResolver } from './flashcards.resolver';

@Module({
  providers: [FlashcardsResolver, FlashcardsService, JwtStrategy],
  exports: [FlashcardsService],
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
export class FlashcardModule {}
