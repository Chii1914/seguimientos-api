
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { FollowUp } from "../../follow-up/entities/follow-up.entity";
import { Motives } from "../../motives/entities/motive.entity";
import { StudentState } from "../../student-state/entities/student-state.entity";

@Entity("Student", { schema: "seguimientos" })
export class Student {
  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("varchar", { name: "sessionString", nullable: true, length: 255 })
  sessionString: string | null;

  @Column("int", { name: "rut", nullable: true })
  rut: number | null;

  @Column("enum", {
    name: "df",
    nullable: true,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "K"],
  })
  df: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "K" | null;

  @Column("enum", {
    name: "semester",
    nullable: true,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  })
  semester: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | null;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("int", { name: "phone", nullable: true })
  phone: number | null;

  @Column("varchar", { name: "secondName", nullable: true, length: 100 })
  secondName: string | null;

  @Column("varchar", { name: "fatherLastName", nullable: true, length: 100 })
  fatherLastName: string | null;

  @Column("varchar", { name: "motherLastName", nullable: true, length: 100 })
  motherLastName: string | null;

  @Column("enum", {
    name: "sede",
    nullable: true,
    enum: ["Valparaíso", "Santiago", "San Felipe"],
  })
  sede: "Valparaíso" | "Santiago" | "San Felipe" | null;

  @OneToMany(() => FollowUp, (followUp) => followUp.mail2)
  followUps: FollowUp[];

  @OneToOne(() => Motives, (motives) => motives.mail2)
  motives: Motives;

  @OneToOne(() => StudentState, (studentState) => studentState.mail2)
  studentState: StudentState;
}
