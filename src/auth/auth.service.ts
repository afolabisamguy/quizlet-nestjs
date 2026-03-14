import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpInput } from './dto/sign-up.input';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcyrpt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpInput: SignUpInput) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: signUpInput.email,
      },
    });
    if (userExists) {
      throw new UnauthorizedException(
        'User already exist. Please login instead',
      );
    }

    const salt = await bcyrpt.genSalt();
    const hashedPassword = await bcyrpt.hash(signUpInput.password, salt);

    const user = await this.prisma.user.create({
      data: {
        fullname: signUpInput.fullname,
        email: signUpInput.email,
        password: hashedPassword,
        username: signUpInput.username,
      },
    });
    return {
      user: user,
      token: this.generateToken(user),
    };
  }

  async login(email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      throw new UnauthorizedException(
        'User does not exist. Please signup instead.',
      );
    }

    const isPasswordValid = await bcyrpt.compare(password, userExists.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password or email.');
    }
    if (userExists && isPasswordValid) {
      return {
        token: this.generateToken(userExists),
        user: userExists,
      };
    }
  }

  generateToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
