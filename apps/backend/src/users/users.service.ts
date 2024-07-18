import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoriteBook } from './entities/favorite-book.entity';
import { ReadingHistory } from './entities/reading-history.entity';
import { UserPreference } from './entities/user-preference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BcryptPasswordHasherService } from '../auth/services/bcrypt-password-hasher.service';

// This should be a real class/interface representing a user entity
export type User1 = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FavoriteBook)
    private favoriteBookRepository: Repository<FavoriteBook>,
    @InjectRepository(ReadingHistory)
    private readingHistoryRepository: Repository<ReadingHistory>,
    @InjectRepository(UserPreference)
    private userPreferenceRepository: Repository<UserPreference>,
    private bcryptPasswordHasherService: BcryptPasswordHasherService,
  ){}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    user.password = await this.bcryptPasswordHasherService.hash(user.password);
    return this.userRepository.save(user);
  };

  async findOne(name: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { name }
    });
  }

  
}
