import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) {}

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }

    async findOne(id: number): Promise<Role | null> {
        return this.rolesRepository.findOne({
            where: { id },
        });
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {

        const { name } = createRoleDto;

        const existingRole = await this.findByName(name);

        if (existingRole) {
            throw new ConflictException('Role already exists');
        }

        const role = this.rolesRepository.create(createRoleDto);

        return this.rolesRepository.save(role);
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {

        if (Object.keys(updateRoleDto).length === 0) {
            throw new BadRequestException('No data to update');
        }

        const existingRole = await this.findOne(id);
        if (!existingRole) {
            throw new NotFoundException('Role does not exist');
        }
   
        const nameExists = await this.findByName(updateRoleDto.name);
    
        if (nameExists && nameExists.id !== id) {  
            throw new ConflictException('Role already exists');
        }

        const role = this.rolesRepository.create(updateRoleDto);

        await this.rolesRepository.update(id, role);
        return this.findOne(id);
    }

    async remove(id: number): Promise<Role> {

        const existingRole = await this.findOne(id);
        if (!existingRole) {
            throw new NotFoundException('Role does not exist');
        }

        await this.rolesRepository.delete(id);
        return null;
    }

    async findByName(name: string): Promise<Role | null> {
        if (!name) {
            return null;
        }
        return this.rolesRepository.findOne({ where: { name } });
    }


}
