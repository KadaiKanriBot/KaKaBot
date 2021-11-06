import { UserDto } from './user.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  displayName: string;
}
