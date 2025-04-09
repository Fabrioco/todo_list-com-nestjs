import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
