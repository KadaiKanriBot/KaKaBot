import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { getHash } from '../util/getHash';

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
    if (!foundUser) throw NotFoundException;
    return foundUser;
  }

  /**
   * @function createUser
   * @description ユーザーを作成する。
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, password, displayName } = createUserDto;

    const user = new User();

    user.id = id;
    user.password = getHash(password);
    user.displayName = displayName;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return user;
  }
}
