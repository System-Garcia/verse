import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../users/entities/user-role.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}