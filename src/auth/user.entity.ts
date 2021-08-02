import { Exclude } from 'class-transformer';
import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  tasks: Task[];
}