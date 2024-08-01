import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../app/users/entities/user.entity';
import { Role } from '../../app/roles/entities/role.entity';
import { UserRole } from '../../app/users/entities/user-role.entity';
import { FavoriteBook } from '../../app/users/entities/favorite-book.entity';
import { ReadingHistory } from '../../app/users/entities/reading-history.entity';
import { UserPreference } from '../../app/users/entities/user-preference.entity';
import { SeederService } from './seeder.service';
import { BcryptPasswordHasherService } from '../../app/auth/services/bcrypt-password-hasher.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([User, Role, UserRole, FavoriteBook, ReadingHistory, UserPreference]),
  ],
  providers: [SeederService, BcryptPasswordHasherService],
})
export class SeederModule {}