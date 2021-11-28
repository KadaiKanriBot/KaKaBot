import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserToGroupDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  groupId: number;
}
