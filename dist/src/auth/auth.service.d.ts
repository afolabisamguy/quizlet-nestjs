import { SignUpInput } from './dto/sign-up.input';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signUp(signUpInput: SignUpInput): Promise<{
        user: {
            id: string;
            fullname: string;
            password: string;
            email: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            fullname: string;
            password: string;
            email: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            lobbyIds: string[];
        };
    } | undefined>;
    generateToken(user: any): string;
}
