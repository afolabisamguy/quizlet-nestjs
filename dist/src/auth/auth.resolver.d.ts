import { AuthService } from './auth.service';
import { SignUpInput } from './dto/sign-up.input';
import { LoginInput } from './dto/login.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(loginInput: LoginInput): Promise<{
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
}
