import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('tag')
export class Tag{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id:number

    @Column()
    key: string;

    @Column()
    label: string

    @ManyToOne(()=> User)
    user: User
}