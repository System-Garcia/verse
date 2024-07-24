import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { FavoriteBook } from './favorite-book.entity';
import { ReadingHistory } from './reading-history.entity';
import { UserPreference } from './user-preference.entity';
import { UserRole } from './user-role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => FavoriteBook, (favoriteBook) => favoriteBook.user)
  favoriteBooks: FavoriteBook[];

  @OneToMany(() => ReadingHistory, (readingHistory) => readingHistory.user)
  readingHistories: ReadingHistory[];

  @OneToMany(() => UserPreference, (userPreference) => userPreference.user)
  userPreferences: UserPreference[];

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];
}
