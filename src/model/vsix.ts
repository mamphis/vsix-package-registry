import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { VsixVersion } from "./vsixversion";

@Entity()
export class Vsix {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, { eager: true })
    owner!: User;

    @Column()
    publisher!: string;

    @Column()
    name!: string;

    @ManyToOne(() => VsixVersion, version => version.vsix, { eager: true })
    versions!: VsixVersion[];
}