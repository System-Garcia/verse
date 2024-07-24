import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { LowercasePipe } from '../common/pipes/lowercase.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    signIn(@Body() sigInDto: LoginDto): Promise<{ access_token: string }> {
        return this.authService.signIn(sigInDto.email, sigInDto.password)
    }   

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

    @Post('register')
    @UsePipes(new LowercasePipe(['email', 'name']))
    register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.authService.register(createUserDto)
    }
}
