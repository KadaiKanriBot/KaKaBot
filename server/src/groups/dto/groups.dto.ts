import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupsDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
