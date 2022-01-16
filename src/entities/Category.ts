import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  category!: string
}