import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'integer' })
    price: number;
} 