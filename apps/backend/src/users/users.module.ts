import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReadingHistory } from './entities/reading-history.entity';
import { FavoriteBook } from './entities/favorite-book.entity';
import { UserPreference } from './entities/user-preference.entity';
import { AuthModule } from '../auth/auth.module';

//! RESOVLVE CIRCULAR DEPENDENCY BETWEEN USERS AND AUTH MODULES
@Module({
  imports: [TypeOrmModule.forFeature([User, ReadingHistory, FavoriteBook, UserPreference]), AuthModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
