import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoriteBook } from './entities/favorite-book.entity';
import { ReadingHistory } from './entities/reading-history.entity';
import { UserPreference } from './entities/user-preference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptPasswordHasherService } from '../auth/services/bcrypt-password-hasher.service';

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

  async create(createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(createUserDto);

    user.password = await this.bcryptPasswordHasherService.hash(user.password);
    return this.userRepository.save(user);
  };

  async findOne(email: string): Promise<User | null> {

    if (!email) {
      return null;
    }

    return await this.userRepository.findOne({
      where: { email }
    });
  }

  
}
