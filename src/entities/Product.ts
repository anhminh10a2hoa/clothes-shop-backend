import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Size } from "./Size";

@Entity() 
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToMany(() => Category)
  @JoinTable({ 
    name: "product_categories", 
    joinColumn: { 
      name: "product", 
      referencedColumnName: "id" 
    }, 
    inverseJoinColumn: { 
      name: "category", 
      referencedColumnName: "id"
    } 
  })
	categories!: Category[]

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

  @ManyToMany(() => Size)
  @JoinTable({ 
    name: "product_sizes", 
    joinColumn: { 
      name: "product", 
      referencedColumnName: "id" 
    }, 
    inverseJoinColumn: { 
      name: "size", 
      referencedColumnName: "id"
    } 
  })
  size: Size[]
}