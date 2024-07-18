import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponse } from './interfaces/user-response.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    signIn(@Body() sigInDto: LoginDto): Promise<{ access_token: string }> {
        console.log(sigInDto);
        return this.authService.signIn(sigInDto.email, sigInDto.password)
    }   

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return this.authService.register(createUserDto)
    }
}
