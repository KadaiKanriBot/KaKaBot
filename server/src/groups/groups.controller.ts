import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { Groups } from './groups.entity';
import { CreateGroupDto } from './dto/create.group.dto';
import { AddUserToGroupDto } from './dto/add-user-to-group.dto';
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Get()
  getAll(): Promise<Groups[]> {
    return this.groupsService.getGroups();
  }

  @Post()
  createGroup(@Body() createGroupsDto: CreateGroupDto): Promise<Groups> {
    const { name } = createGroupsDto;
    return this.groupsService.createGroup(name);
  }

  @Post('/:name')
  addUser(@Body() addUserDto: AddUserToGroupDto): void {
    const { userId, groupId } = addUserDto;
    this.groupsService.addUserToGroup(groupId, userId).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
