import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../app/users/entities/user.entity';
import { FavoriteBook } from '../../app/users/entities/favorite-book.entity';
import { ReadingHistory } from '../../app/users/entities/reading-history.entity';
import { UserPreference } from '../../app/users/entities/user-preference.entity';
import { Role } from '../../app/roles/entities/role.entity';
import { UserRole } from '../../app/users/entities/user-role.entity';
import { BcryptPasswordHasherService } from '../../app/auth/services/bcrypt-password-hasher.service';
import { seedData } from '../seeds/data';

@Injectable()
export class SeederService {
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
    private dataSource: DataSource,
  ) {}

  async seed() {
    await this.resetDatabase();
    await this.seedUsers();
    await this.seedRoles();
    await this.seedUserRoles();
    await this.seedFavoriteBooks();
    await this.seedReadingHistory();
    await this.seedUserPreferences();
  }

  private async seedUsers() {
    for (const user of seedData.users) {
      const hashedPassword  = await this.bcryptPasswordHasherService.hash(user.password);
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword
      });

      await this.userRepository.save(newUser);
    }
  } 

  private async resetDatabase() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Delete records with cascading relationships
      await queryRunner.query(`DELETE FROM user_roles`);
      await queryRunner.query(`DELETE FROM favorite_books`);
      await queryRunner.query(`DELETE FROM reading_history`);
      await queryRunner.query(`DELETE FROM user_preferences`);
      await queryRunner.query(`DELETE FROM users`);
      await queryRunner.query(`DELETE FROM roles`);

      // Reset primary key sequences
      await queryRunner.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
      await queryRunner.query(`ALTER SEQUENCE roles_id_seq RESTART WITH 1`);
      await queryRunner.query(`ALTER SEQUENCE favorite_books_id_seq RESTART WITH 1`);
      await queryRunner.query(`ALTER SEQUENCE reading_history_id_seq RESTART WITH 1`);
      await queryRunner.query(`ALTER SEQUENCE user_preferences_id_seq RESTART WITH 1`);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async seedRoles() {
    for (const role of seedData.roles) {
      const newRole = this.roleRepository.create(role);
      await this.roleRepository.save(newRole);
    }
  }

  private async seedUserRoles() {
    for (const userRole of seedData.user_roles) {
      const newUserRole = this.userRoleRepository.create(userRole);
      await this.userRoleRepository.save(newUserRole);
    }
  }

  private async seedFavoriteBooks() {
    for (const favoriteBook of seedData.favorite_books) {
      const newFavoriteBook = this.favoriteBookRepository.create(favoriteBook);
      await this.favoriteBookRepository.save(newFavoriteBook);
    }
  }

  private async seedReadingHistory() {
    for (const readingHistory of seedData.reading_history) {
      const newReadingHistory = this.readingHistoryRepository.create(readingHistory);
      await this.readingHistoryRepository.save(newReadingHistory);
    }
  }

  private async seedUserPreferences() {
    for (const userPreference of seedData.user_preferences) {
      const newUserPreference = this.userPreferenceRepository.create(userPreference);
      await this.userPreferenceRepository.save(newUserPreference);
    }
  }
}
