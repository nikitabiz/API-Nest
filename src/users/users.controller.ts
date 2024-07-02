import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getAll()
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: UsersDto) {
    return this.usersService.create(dto)
  }

  @Get('/get/:id')
  async get(@Param('id') id: string) {
    return this.usersService.getById(id)
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }

  @Patch('/patch/:id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id') id: string, @Body() data: UsersDto) {
    return this.usersService.update({ id, data })
  }
}
