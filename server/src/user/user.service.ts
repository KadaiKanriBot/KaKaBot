import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { getHash } from '../util/getHash';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @description 全てのユーザーを取得する。
   * @return User[]
   */
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * @description id からユーザーを取得する。
   * @param id
   */
  async getUserById(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  /**
   * @description email からユーザーを取得する。
   * @param email
   */
  async getUserByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({email});
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  /**
   * @description パスワードが正しいか判定する。
   * @param id
   * @param password
   */
  async checkPassword(id: number, password: string): Promise<boolean> {
    const user = await this.getUserById(id);

    return user.password === password;
  }

  /**
   * @description ユーザーを作成する。
   * @param email
   * @param password
   * @param displayName
   */
  async createUser(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const user = User.create(password, displayName, email);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * @description ユーザーの displayName を変更する。
   * @param id
   * @param newDisplayName
   */
  async changeUserDisplayName(
    id: number,
    newDisplayName: string,
  ): Promise<User> {
    const user = await this.getUserById(id);
    user.displayName = newDisplayName;

    return this.userRepository.save(user);
  }

  /**
   * @description ユーザーの email を変更する。
   * @param id
   * @param newEmail
   */
  async changeUserEmail(id: number, newEmail: string): Promise<User> {
    const user = await this.getUserById(id);
    user.email = newEmail;

    return this.userRepository.save(user);
  }

  /**
   * @description ユーザーの password を変更する。
   * @param id
   * @param newPassword
   */
  async changeUserPassword(id: number, newPassword: string): Promise<User> {
    const user = await this.getUserById(id);
    user.password = getHash(newPassword);

    return this.userRepository.save(user);
  }

  /**
   * @description ユーザーを削除する。
   * @param id
   */
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
