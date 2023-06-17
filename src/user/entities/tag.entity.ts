import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Tag{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id:number

    @Column()
    key: string;

    @Column()
    label: string

    @ManyToOne(()=> User)
    userId: User
}