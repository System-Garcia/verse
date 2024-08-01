import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { LowercasePipe } from '../common/pipes/lowercase.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('roles')
@UseGuards(AuthGuard, AdminGuard)
export class RolesController {

    constructor(
        private readonly roleService: RolesService,
    ) {}

    @Get()
    findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(id: number): Promise<Role> {
        return this.roleService.findOne(id);
    }

    @Post()
    @UsePipes(new LowercasePipe())
    create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.roleService.create(createRoleDto);
    }

    @Put(':id')
    @UsePipes(new LowercasePipe())
    update(@Body() updateRoleDto: UpdateRoleDto, @Param('id', ParseIntPipe) id: number): Promise<Role> {
        return this.roleService.update(id, updateRoleDto);
    }

}
