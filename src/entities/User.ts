import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import Post from "./Post";
import {generateAccessToken} from "../middlewares/AuthMiddleware";
import {TokenData} from "../interfaces/TokenData";

@Entity({ name: "user" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint", comment: "회원식별자" })
  public id: number;

  @Column({ name: "email", length: 50, comment: "이메일" })
  public email: string;

  @Column({ name: "password", length: 255, comment: "비밀번호", select: false })
  public password: string;

  @Column({ name: "name", length: 30, comment: "이름" })
  public name: string;

  @CreateDateColumn({
    name: "reg_date",
    type: "datetime",
    precision: 0,
    comment: "등록일시",
  })
  public regDate: Date;

  @UpdateDateColumn({
    name: "mod_date",
    type: "datetime",
    precision: 0,
    comment: "수정일시",
  })
  public modDate: Date;

  @OneToMany((type) => Post, (post) => post.user)
  public postList: Post[];

  public async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, bcrypt.genSaltSync(10));
  }

  @BeforeInsert()
  public async encryptPassword() {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  }

  public isPasswordMatch(password: string) {
    // console.log(await bcrypt.hash(password, bcrypt.genSaltSync(10)));
    return bcrypt.compareSync(password, this.password);
  }

  public createToken(): TokenData {
    return generateAccessToken(this);
  }
}
