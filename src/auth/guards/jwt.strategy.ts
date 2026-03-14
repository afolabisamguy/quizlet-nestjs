import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // passport strategy
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // this line
      secretOrKey: 'fola_is_a_good_boy',
      logging: true,
    });
  }
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
