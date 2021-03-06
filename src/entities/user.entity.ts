import { EntityRepository } from "typeorm";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { UserRole } from "../enums/userRole.enum";

@EntityRepository()
@Entity()
@Unique(["username"])
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 100 })
  username: String;

  @Column()
  password: String;

  @Column()
  name: String;

  @Column({ nullable: true })
  email: String;

  @Column({
    type: "enum",
    default: UserRole.USER,
    enum: UserRole,
  })
  role: String;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password + "", 12);
  }
  unencrypted_password_is_valid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password + "");
  }
}
