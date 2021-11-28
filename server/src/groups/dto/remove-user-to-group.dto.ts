import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserToGroupDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  groupId: number;
}
