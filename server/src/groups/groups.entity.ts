import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Groups {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @CreateDateColumn()
  readonly createdAt: Date;

  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  @JoinTable()
  users?: User[];

  public static create(name: string): Omit<Groups, 'id' | 'update'> {
    const newGroup = new Groups();

    newGroup.name = name;
    newGroup.users = [];

    return newGroup;
  }
}
