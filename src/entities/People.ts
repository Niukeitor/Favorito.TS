import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Planets } from "./Planets";

@Entity()
export class People extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    height: number

    @Column()
    mass: number

    @Column()
    hairColor: string

    @Column()
    skinColor: string

    @Column()
    eyeColor: string

    @Column()
    birthYear: string

    @Column()
    gender: string

    @Column()
    homeworld: string

    @Column()
    imgUrl: string

    @ManyToOne(() => Planets, planets => planets.peoples)
    planet: Planets;
}