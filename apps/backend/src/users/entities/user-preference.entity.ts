import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Check, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_preferences')
@Check(`"preferences_key" IN ('theme', 'gender', 'author')`)
export class UserPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'varchar', length: 20 })
  preferences_key: string;

  @Column({ type: 'varchar', length: 255 })
  preferences_value: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userPreferences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
