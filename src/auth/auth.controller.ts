import { Body, Controller, Post, Patch, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipe.pipe';
import { signinSchema } from './schema/signin.schema';
import { signupSchema } from './schema/signup.schema';
import { resetPasswordSchema } from './schema/reset-password.schema';
import { forgotPasswordSchema } from './schema/forgot-password.schema';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { verifyEmailSchema } from './schema/verify-email.schema';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('signin')
    @UsePipes(new ZodValidationPipe(signinSchema))
    async signIn(@Body() signin: SignInDTO){
        return this.authService.signIn(signin) ;
    }

    @Post('signup-user')
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signUpUser(@Body() signup: SignUpDTO) {
        return this.authService.signUp(signup);
    }

    @Post('signup-agent')
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signUpAgent(@Body() signup: SignUpDTO) {
        return this.authService.signUp(signup);
    }

    @Post("forgot-password")
    @UsePipes(new ZodValidationPipe(forgotPasswordSchema))
    async forgotPassword(@Body () body: { email: string }) {
        return this.authService.forgotPassword(body.email);
    }

    @Patch("reset-password")
    @UsePipes(new ZodValidationPipe(resetPasswordSchema))
    async resetPassword(@Body() body: { password: string, token: string}) {
        return this.authService.resetPassword(body.password, body.token);
    }


    @Patch("verify-email")
    @UsePipes(new ZodValidationPipe(verifyEmailSchema))
    async verifyEmail(@Body() body: ResetPasswordDTO){
        return this.authService.verifyEmail(body);
    }
}
