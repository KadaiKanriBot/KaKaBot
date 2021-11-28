import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from '../groups/groups.entity';
import { generateUuid } from '../util/uuid';
import { getHash } from '../util/getHash';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  uuid: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Groups, (group) => group.users)
  @JoinTable()
  groups: Groups[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  public static create(
    password: string,
    displayName: string,
    email: string,
  ): Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
    const newUser = new User();

    newUser.uuid = generateUuid();
    newUser.password = getHash(password);
    newUser.displayName = displayName;
    newUser.email = email;
    newUser.groups = [];

    return newUser;
  }
}
