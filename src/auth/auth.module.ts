import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthResolver } from './auth.resolver';

import { PrismaModule } from 'src/prisma/prisma.module';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './guards/jwt.strategy';

import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],

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
export class AuthModule {}
