import {Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToMany, JoinTable} from 'typeorm';
import { Planets } from './Planets';
import { People } from './People';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

    @ManyToMany(() => Planets)
    @JoinTable()
    planets: Planets[];

    @ManyToMany(() => People)
    @JoinTable()
    peoples: People[];
}