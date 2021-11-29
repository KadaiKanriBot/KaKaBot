import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Groups } from './groups.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [UserModule, TypeOrmModule.forFeature([Groups])],
})
export class GroupsModule {}
