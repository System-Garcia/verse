import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity('user_roles')
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Role, role => role.userRoles)
    @JoinColumn({ name: 'role_id' })
    role: Role;
}