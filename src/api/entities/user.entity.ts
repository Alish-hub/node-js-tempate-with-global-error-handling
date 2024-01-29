import { BaseEntity, Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ name: "mobile_number" })
  mobileNumber: string;

  @Column()
  password: string;
}
