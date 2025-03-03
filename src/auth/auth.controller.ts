import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    @Post('/login')
    login(@Body() user: {}){
        return user;
    }

    @Post('register')
    register(@Body() user: {}) {
        return user;
    }

    @Post('forgot-password')
    forgotPassword(@Body() user: {}) {
        return user;
    }

    @Patch('reset-password') 
    resetPassword() {
        return 'Password successfully updated';
    }

    @Patch('verify-email')
    verifyEmail() {
        return 'This user email has been verified';
    }
}
