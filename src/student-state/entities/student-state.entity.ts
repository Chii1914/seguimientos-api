import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Student } from "../../student/entities/student.entity";

@Entity("StudentState", { schema: "seguimientos" })
export class StudentState {
  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("enum", {
    name: "state",
    nullable: true,
    enum: ["seguimiento", "pendiente", "cerrado", "procesado"],
  })
  state: "seguimiento" | "pendiente" | "cerrado" | "procesado" | null;

  @Column("text", { name: "observation", nullable: true })
  observation: string | null;

  @OneToOne(() => Student, (student) => student.studentState, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mail", referencedColumnName: "mail" }])
  mail2: Student;
}
