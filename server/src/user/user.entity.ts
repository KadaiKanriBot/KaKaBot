import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from '../groups/groups.entity';
import { generateUuid } from '../util/uuid';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Groups, (group) => group.users)
  groups: Groups[];

  @UpdateDateColumn()
  update: Date;

  @BeforeInsert()
  addUuid() {
    this.uuid = generateUuid();
  }
}
