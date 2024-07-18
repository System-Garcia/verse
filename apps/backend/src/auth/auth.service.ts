import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BcryptPasswordHasherService } from './services/bcrypt-password-hasher.service';
import { UserResponse } from './interfaces/user-response.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private bcryptPasswordHasherService: BcryptPasswordHasherService,
      ) {}
    
      async signIn(
        email: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(email);
        if (!user) {
          throw new UnauthorizedException();
        }

        const isValidPassword = await this.bcryptPasswordHasherService.compare(pass, user.password);
        if (!isValidPassword) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      async register(createUserDto: CreateUserDto): Promise<UserResponse> {
        const {password, ...user } = await this.usersService.create(createUserDto);
        return user;
      }
}
