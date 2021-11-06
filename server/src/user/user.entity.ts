import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  displayName: string;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column('text', { array: true })
  groups: string[];
}
