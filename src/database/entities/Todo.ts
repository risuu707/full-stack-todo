import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Todo {
@PrimaryGeneratedColumn()
    id: number;

@Column({
    default: () => false
})
    isCompleted: boolean;

@Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
})
    createdAt: Date;

@Column()
    task: string;
}
