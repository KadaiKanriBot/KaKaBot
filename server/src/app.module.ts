import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeorm-config/typeorm-config.service';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    UserModule,
    GroupsModule,
    ConfigModule.forRoot({
      envFilePath: [`.env/${process.env.NODE_ENV}.env`, '.env/default.env'],
      isGlobal: true,
    }),
    // TypeORMの設定を非同期取得に変更
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
  ],
})
export class AppModule {}
