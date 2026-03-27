import { Module } from '@nestjs/common';

import { LobbyService } from './lobby.service';

import { LobbyResolver } from './lobby.resolver';

import { PrismaModule } from 'src/prisma/prisma.module';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from 'src/auth/guards/jwt.strategy';

@Module({
  providers: [LobbyResolver, LobbyService, JwtStrategy],

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
export class LobbyModule {}
