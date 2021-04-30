import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "post" })
export default class Post {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint", comment: "게시글식별자" })
  public id: number;

  @Column({ name: "title", length: 50, comment: "제목" })
  public title: string;

  @Column({ name: "content", type:"text", comment: "내용" })
  public content: string;

  @CreateDateColumn({
    name: "reg_date",
    type: "datetime",
    precision: 0,
    comment: "작성일시",
  })
  public regDate: Date;

  @UpdateDateColumn({
    name: "mod_date",
    type: "datetime",
    precision: 0,
    comment: "수정일시",
  })
  public modDate: Date;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
