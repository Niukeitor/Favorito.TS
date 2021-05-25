import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { People } from "./People";

@Entity()
export class Planets extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    diameter: number

    @Column()
    rotationPeriod: number

    @Column()
    gravity: string

    @Column()
    population: number

    @Column()
    climate: string

    @Column()
    terrain: string

    @Column()
    surfaceWater: number

    @Column()
    imgUrl: string

    @OneToMany(() => People, people => people.planet)
    peoples: People[];
}