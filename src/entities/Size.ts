import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  size!: string
}