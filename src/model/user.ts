import { Entity, Column, BeforeInsert, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id!: string;

    @Column()
    origin!: string;

    @Column()
    name!: string;

    @Column()
    username!: string;

    @Column()
    token!: string;

    @BeforeInsert()
    onBeforeInsert() {
        this.id = `${this.origin}:${this.username}`;
    }
}