import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 追加
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
