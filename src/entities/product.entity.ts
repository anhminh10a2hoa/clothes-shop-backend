import { GenderType } from "../enums/gender.enum";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  description!: string;

  @Column({
    type: "enum",
    enum: GenderType,
  })
  gender!: string;

  @Column({
    default: "default-product-image.png",
  })
  imageName: string;

  @Column()
  price!: number;

  @Column()
  status!: boolean;

  @Column()
  feature!: boolean;

  @Column()
  sale: boolean;

  @Column()
  salePrice: number;

  @Column()
  size!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
