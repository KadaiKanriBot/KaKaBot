import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'ユーザーの取得に成功しました' })
  getUsers() {
    const users = this.userService.getUsers();
    return plainToClass(UserDto, users);
  }

  @Post()
  @ApiCreatedResponse({ description: 'ユーザーの作成に成功しました。' })
  @ApiInternalServerErrorResponse({
    description: 'サーバー内部でのエラーです。',
  })
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  @ApiFoundResponse({ description: 'ユーザーの作成に成功しました。' })
  @ApiNotFoundResponse({ description: '存在しないユーザーです。' })
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
