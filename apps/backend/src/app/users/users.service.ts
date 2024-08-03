import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoriteBook } from './entities/favorite-book.entity';
import { ReadingHistory } from './entities/reading-history.entity';
import { UserPreference } from './entities/user-preference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptPasswordHasherService } from '../auth/services/bcrypt-password-hasher.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-user-res.dto';
import { ConfigService } from '@nestjs/config';
import { UserRole } from './entities/user-role.entity';
import { Role } from '../roles/entities/role.entity';
import { FindUserOptions } from './interfaces/find-user-options.interface';
import { CreateFavoriteBookDto } from './dto/create-favorite-book.dto';
import { PaginatedFavoriteBooksResponseDto } from './dto/paginated-favorite-books-res.dto';
import { CreateReadingHistoryDto } from './dto/create-reading-history.dto';
import { PaginatedUserPreferenceResDto } from './dto/paginated-user-preference-res.dto';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';

@Injectable()
export class UsersService {
  private baseUrl: string = this.configService.get('BASE_URL');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FavoriteBook)
    private favoriteBookRepository: Repository<FavoriteBook>,
    @InjectRepository(ReadingHistory)
    private readingHistoryRepository: Repository<ReadingHistory>,
    @InjectRepository(UserPreference)
    private userPreferenceRepository: Repository<UserPreference>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private bcryptPasswordHasherService: BcryptPasswordHasherService,
    private readonly configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(createUserDto);

    const defaultRole = await this.roleRepository.findOne({
      where: { name: 'user' },
    });

    user.password = await this.bcryptPasswordHasherService.hash(user.password);
    const savedUser = await this.userRepository.save(user);

    if (!defaultRole) {
      throw new InternalServerErrorException(
        'An error occurred while creating user'
      );
    }

    const userRole = this.userRoleRepository.create({
      user: savedUser,
      role: defaultRole,
    });

    await this.userRoleRepository.save(userRole);

    return savedUser;
  }

  async findOne(
    id: number,
    findUserOptions?: FindUserOptions
  ): Promise<User | null> {
    if (!id) {
      return null;
    }

    const {
      includeRoles = false,
      includeReadingHistory = false,
      includeFavoriteBooks = false,
      includePreferences = false,
    } = findUserOptions || {};


    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        userRoles: includeRoles ? {role: true} : false,
        readingHistories: includeReadingHistory,
        favoriteBooks: includeFavoriteBooks,
        userPreferences: includePreferences,
      },

    });

    return user;
  }

  async findByEmail(
    email: string,
    findUserOptions?: FindUserOptions
  ): Promise<User | null> {
    if (!email) {
      return null;
    }

    const { includeRoles = false } = findUserOptions || {};

    return await this.userRepository.findOne({
      where: { email },
      relations: {
        userRoles: includeRoles,
      },
    });
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<PaginatedUsersResponseDto> {
    const { page, limit } = paginationDto;

    const skippedItems = (page - 1) * limit;
    const totalCount = await this.userRepository.count();

    const nextPage =
      page * limit < totalCount
        ? this.baseUrl + `?page=${page + 1}&limit=${limit}`
        : null;
    const previousPage =
      page > 1 ? this.baseUrl + `?page=${page - 1}&limit=${limit}` : null;

    if (totalCount < skippedItems) {
      return {
        total: totalCount,
        page,
        limit,
        next: nextPage,
        prev: previousPage,
        users: [],
      };
    }

    const users = await this.userRepository.find({
      skip: skippedItems,
      take: limit,
    });

    return {
      total: totalCount,
      page,
      limit,
      next: nextPage,
      prev: previousPage,
      users: users.map((user) => {
        const { password, ...result } = user;
        return result;
      }),
    };
  }

  // Favorite Books Methods
  async getFavoriteBooks(userId: number, paginationDto: PaginationDto): Promise<PaginatedFavoriteBooksResponseDto> {
    const { page = 1, limit = 10 } = paginationDto;

    const skippedItems = (page - 1) * limit;
    const totalCount = await this.favoriteBookRepository.count({
      where: { user_id: userId },
    });
    
    const nextPage =
      page * limit < totalCount
        ? this.baseUrl + `/users/${userId}/favorite-books?page=${page + 1}&limit=${limit}`
        : null;
    const previousPage =
      page > 1 ? this.baseUrl + `/users/${userId}/favorite-books?page=${page - 1}&limit=${limit}` : null;

    if (totalCount < skippedItems) {
      return {
        total: totalCount,
        page,
        limit,
        next: nextPage,
        prev: previousPage,
        favoriteBooks: [],
      };
    }
    const favoriteBooks = await this.favoriteBookRepository.find({
      where: { user_id: userId },
      skip: skippedItems,
      take: limit,
    });

    return {
      total: totalCount,
      page,
      limit,
      next: nextPage,
      prev: previousPage,
      favoriteBooks,
    };
  }
  
  async addFavoriteBook(userId: number, createFavoriteBookDto: CreateFavoriteBookDto): Promise<FavoriteBook> {
    
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingFavoriteBook = await this.favoriteBookRepository.findOne({
      where: { user_id: userId, book_id: createFavoriteBookDto.bookId },
    });

    if (existingFavoriteBook) {
      throw new ConflictException('Book already exists in favorite list');
    }

    const favoriteBook = this.favoriteBookRepository.create({
      ...createFavoriteBookDto,
      book_id: createFavoriteBookDto.bookId,
      user_id: userId,
    });

    const savedFavoriteBook = await this.favoriteBookRepository.save(favoriteBook);
    
    return savedFavoriteBook;
  }

  async removeFavoriteBook(userId: number, bookId: string): Promise<void> {
    const favoriteBook = await this.favoriteBookRepository.findOne({
      where: { user_id: userId, book_id: bookId },
    });

    if (!favoriteBook) {
      throw new NotFoundException('Favorite book not found');
    }

    await this.favoriteBookRepository.delete(favoriteBook.id);
  }

  // Reading History Methods
  async getReadingHistory(userId: number, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const skippedItems = (page - 1) * limit;
    const totalCount = await this.readingHistoryRepository.count({
      where: { user_id: userId },
    });

    const nextPage =
      page * limit < totalCount
        ? this.baseUrl + `/users/${userId}/reading-history?page=${page + 1}&limit=${limit}`
        : null;
    const previousPage =
      page > 1 ? this.baseUrl + `/users/${userId}/reading-history?page=${page - 1}&limit=${limit}` : null;
      
    if (totalCount < skippedItems) {
      return {
        total: totalCount,
        page,
        limit,
        next: nextPage,
        prev: previousPage,
        readingHistory: [],
      };
    }

    const readingHistory = await this.readingHistoryRepository.find({
      where: { user_id: userId },
      skip: skippedItems,
      take: limit,
    });

    return {
      total: totalCount,
      page,
      limit,
      next: nextPage,
      prev: previousPage,
      readingHistory,
    };
  }

  async addReadingHistory(userId, createReadingHistoryDto: CreateReadingHistoryDto): Promise<ReadingHistory> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingReadingHistory = await this.readingHistoryRepository.findOne({
      where: {user_id: userId, book_id: createReadingHistoryDto.bookId},
    });

    if (existingReadingHistory) {
      throw new ConflictException('Book already exists in reading history');
    }

    const readingHistory = this.readingHistoryRepository.create({
      ...createReadingHistoryDto,
      user_id: userId,
      book_id: createReadingHistoryDto.bookId,
      read_date: createReadingHistoryDto.readDate,
    });

    const savedReadingHistory = await this.readingHistoryRepository.save(readingHistory);

    return savedReadingHistory;
  }

  async removeReadingHistory(userId: number, bookId: string): Promise<void> {
    const readingHistory = await this.readingHistoryRepository.findOne({
      where: { user_id: userId, book_id: bookId },
    });

    if (!readingHistory) {
      throw new NotFoundException('Reading history not found');
    }

    await this.readingHistoryRepository.delete(readingHistory.id);
  }

  // User Preferences Methods
  async getPreferences(userId: number, paginationDto: PaginationDto): Promise<PaginatedUserPreferenceResDto> {

    const user = await this.findOne(userId, { includePreferences: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { page = 1, limit = 10 } = paginationDto;

    const skippedItems = (page - 1) * limit;
    const totalCount = await this.userPreferenceRepository.count({
      where: { user_id: userId },
    });

    const nextPage =
      page * limit < totalCount
        ? this.baseUrl + `/users/${userId}/preferences?page=${page + 1}&limit=${limit}`
        : null;
    const previousPage =
      page > 1 ? this.baseUrl + `/users/${userId}/preferences?page=${page - 1}&limit=${limit}` : null;

    if (totalCount < skippedItems) {
      return {
        total: totalCount,
        page,
        limit,
        next: nextPage,
        prev: previousPage,
        preferences: [],
      };
    }

    return {
      total: totalCount,
      page,
      limit,
      next: nextPage,
      prev: previousPage,
      preferences: user.userPreferences,
    }
  }

  async setPreferences(userId, createUserPreferenceDto: CreateUserPreferencesDto) {
    const { preferences } = createUserPreferenceDto;

    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    for (const preference of preferences) {

      const { preferencesKey, preferencesValue } = preference;

      const existingPreference = await this.userPreferenceRepository.findOne({
        where: { user_id: userId, preferences_key: preferencesKey, preferences_value: preferencesValue },
      });
  
      if (existingPreference) {
        throw new ConflictException(`Preference with key ${ preferencesKey } and value ${preferencesValue} already exists`);
      }
    };

    const userPreferences = preferences.map(preference => ({
      user_id: userId,
      preferences_key: preference.preferencesKey,
      preferences_value: preference.preferencesValue,
    }));

    const savedUserPreferences = await this.userPreferenceRepository.save(userPreferences);

    const userPreference = this.userPreferenceRepository.create(savedUserPreferences);

    return userPreference;
  }

  async removePreference(userId: number, preferencesId: number) {
    const userPreference = await this.userPreferenceRepository.findOne({
      where: { user_id: userId, id: preferencesId },
    });

    if (!userPreference) {
      throw new NotFoundException('Preference not found');
    };

    await this.userPreferenceRepository.delete(userPreference.id);
  }

  async resetPreferences(userId: number) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userPreferenceRepository.delete({ user_id: userId });
  }
}
