import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create.user.dto";
import {getHash} from "../util/getHash";
import {generateUuid} from "../util/uuid";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getUsers(): Promise<User[]>{
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User>{
    const foundUser =  await this.userRepository.findOne(id);
    if(!foundUser) throw NotFoundException;
    return foundUser;
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<User>{
    const {id, password, displayName} = createUserDto;

    const user = new User();

    user.id = id;
    user.password = getHash(password);
    user.displayName = displayName;
    user.uuid = generateUuid();

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return user;
  }



}
