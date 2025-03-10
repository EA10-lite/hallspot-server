import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipe.pipe';
import { signinSchema } from './schema/signin.schema';
import { signupSchema } from './schema/signup.schema';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('signin')
    @UsePipes(new ZodValidationPipe(signinSchema))
    async signIn(@Body() signin: SignInDTO){
        return this.authService.signIn(signin.email, signin.password);
    }

    @Post('signup-user')
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signUpUser(@Body() signup: SignUpDTO) {
        return this.authService.signUp(signup.name, signup.email, signup.password, 'USER');
    }

    @Post('signup-agent')
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signUpAgent(@Body() signup: SignUpDTO) {
        return this.authService.signUp(signup.name, signup.email, signup.password, 'AGENT');
    }
}
