import { Injectable } from '@nestjs/common';
import { Groups } from './groups.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupsRepository: Repository<Groups>,
    private readonly userService: UserService,
  ) {}

  /**
   * @function getGroups
   * @description 全てのグループを取得する。
   */
  async getGroups(): Promise<Groups[]> {
    return this.groupsRepository.find({ relations: ['users'] });
  }

  /**
   * @function getGroupById
   * @description id からグループを取得する。
   * @param id
   */
  async getGroupById(id: number): Promise<Groups> {
    return this.groupsRepository.findOne(id, { relations: ['users'] });
  }

  /**
   * @function createGroup
   * @description 新しいグループを作成する。
   */
  async createGroup(name: string): Promise<Groups> {
    const group = Groups.create(name);

    return this.groupsRepository.save(group);
  }

  /**
   * @function addUserToGroup
   * @description グループにユーザーを追加する。
   */

  async addUserToGroup(groupId: number, userId: number): Promise<Groups> {
    const user = await this.userService.getUserById(userId);
    const group = await this.getGroupById(groupId);

    if (!group.users) group.users = [user];
    else group.users.push(user);

    return this.groupsRepository.save(group);
  }
}
