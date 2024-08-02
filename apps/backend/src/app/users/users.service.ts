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
      where: { id: userId },
    });
    
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
}
