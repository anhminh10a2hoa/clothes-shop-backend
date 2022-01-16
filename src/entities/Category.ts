import { CategoryType } from "../types/CategoryType";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: "enum",
    enum: CategoryType
  })
  category!: number
}