import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('reading_history')
@Unique(['user_id', 'book_id'])
export class ReadingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 255 })
  book_id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  author: string;

  @Column('date')
  read_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.readingHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
