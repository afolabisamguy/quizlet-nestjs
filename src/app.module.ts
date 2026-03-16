import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FlashcardSetsModule } from './flashcard-sets/flashcard-sets.module';
import { FlashcardModule } from './flashcards/flashcards.module';
import { LobbyModule } from './lobby/lobby.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: 'src/schema.gql',
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          embed: true,
        }),
      ],
      playground: false,
    }),
    FlashcardSetsModule,
    FlashcardModule,
    LobbyModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
