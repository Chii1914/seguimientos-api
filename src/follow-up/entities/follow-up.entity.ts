import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Student } from "../../student/entities/student.entity";

@Index("mail", ["mail"], {})
@Entity("FollowUp", { schema: "seguimientos" })
export class FollowUp {
  @Column("timestamp", { primary: true, name: "timestamp" })
  timestamp: Date;

  @Column("varchar", { name: "mail", nullable: true, length: 255 })
  mail: string | null;

  @Column("text", { name: "notes", nullable: true })
  notes: string | null;

  @Column("tinyint", { name: "asistentaSocial", nullable: true, width: 1 })
  asistentaSocial: boolean | null;

  @Column("text", { name: "justAsistentaSocial", nullable: true })
  justAsistentaSocial: string | null;

  @Column("tinyint", { name: "ajusteAcademico", nullable: true, width: 1 })
  ajusteAcademico: boolean | null;

  @Column("text", { name: "justAjusteAcademico", nullable: true })
  justAjusteAcademico: string | null;

  @Column("tinyint", { name: "documentosRespaldo", nullable: true, width: 1 })
  documentosRespaldo: boolean | null;

  @Column("text", { name: "justDocumentosRespaldo", nullable: true })
  justDocumentosRespaldo: string | null;

  @Column("tinyint", { name: "noAceptaIndicaciones", nullable: true, width: 1 })
  noAceptaIndicaciones: boolean | null;

  @Column("text", { name: "justNoAceptaIndicaciones", nullable: true })
  justNoAceptaIndicaciones: string | null;

  @Column("text", { name: "otro", nullable: true })
  otro: string | null;

  @ManyToOne(() => Student, (student) => student.followUps, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mail", referencedColumnName: "mail" }])
  mail2: Student;
}