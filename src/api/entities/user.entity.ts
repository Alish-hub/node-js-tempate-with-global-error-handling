import { BaseEntity, Column, Entity, Index } from "typeorm";
import { Base } from "./base.entity";

@Entity("user")
export class User extends Base {
  @Column()
  name: string;

  @Column({ unique: true, name: "email" })
  email: string;

  @Column({ name: "mobile_number" })
  mobileNumber: string;

  @Column()
  password: string;
}
