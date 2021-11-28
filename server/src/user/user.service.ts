import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @function getUsers
   * @description 全てのユーザーを取得する。
   * @return User[]
   */
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * @function getUsersById
   * @description id からユーザーを取得する。
   * @param id
   */
  async getUserById(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  /**
   * @function createUser
   * @description ユーザーを作成する。
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, displayName } = createUserDto;

    const user = User.create(password, displayName, email);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
