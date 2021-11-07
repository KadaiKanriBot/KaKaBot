import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  id: string;

  @Column()
  displayName: string;

  @Column()
  password: string;

  @BeforeInsert()
  addId() {
    this.uuid = v4();
  }
}
