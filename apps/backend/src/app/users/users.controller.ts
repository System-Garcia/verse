import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    @UseGuards(AdminGuard)
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.usersService.findAll(paginationDto);
    }
}
