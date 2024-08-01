import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReadingHistory } from './entities/reading-history.entity';
import { FavoriteBook } from './entities/favorite-book.entity';
import { UserPreference } from './entities/user-preference.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UserRole } from './entities/user-role.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ReadingHistory, FavoriteBook, UserPreference, UserRole, Role]), forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
