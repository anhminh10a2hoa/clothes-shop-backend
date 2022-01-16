import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Entity() 
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToMany(() => Category)
  @JoinTable()
	categories!: Category

  @Column({ unique: true }) 
  name!: string

  @Column() 
  descrition!: string

  @Column() 
  gender!: number

  @Column() 
  image!: string

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

  @ManyToMany(() => Category)
  @JoinTable()
  size!: number
}