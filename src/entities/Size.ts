import { SizeType } from "../types/SizeType";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: "enum",
    enum: SizeType
  })
  size!: number
}