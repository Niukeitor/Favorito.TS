import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinColumn } from "typeorm";


@Entity()
export class infoPl extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Column()
    Nombre: string
    @Column()
    Rotacion: number
    @Column()
    Orbita: number
    @Column()
    Diametro: number
    @Column()
    Clima: string
    @Column()
    Gravedad: number
    @Column()
    Terreno: string
    @Column()
    Superficie: number
    @Column()
    Popularidad: number




}