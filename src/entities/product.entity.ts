import { GenderType } from "../enums/gender.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column() 
  category!: string

  @Column({ unique: true }) 
  name!: string

  @Column() 
  description!: string

  @Column({
    type: "enum",
    enum: GenderType
  }) 
  gender!: string

  @Column() 
  imageName!: string

  @Column()
  price!: number

  @Column()
  status!: boolean

  @Column()
  feature!: boolean

  @Column()
  sale!: boolean

  @Column()
  salePrice!: number

  @Column() 
  size!: string
}