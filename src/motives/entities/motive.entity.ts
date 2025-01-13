import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Student } from "../../student/entities/student.entity";

@Entity("Motives", { schema: "seguimientos" })
export class Motives {
  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("tinyint", { name: "consumoSustancias", nullable: true, width: 1 })
  consumoSustancias: boolean | null;

  @Column("text", { name: "justConsumoSustancias", nullable: true })
  justConsumoSustancias: string | null;

  @Column("tinyint", { name: "convivencia", nullable: true, width: 1 })
  convivencia: boolean | null;

  @Column("text", { name: "justConvivencia", nullable: true })
  justConvivencia: string | null;

  @Column("tinyint", { name: "emocionalYAcademico", nullable: true, width: 1 })
  emocionalYAcademico: boolean | null;

  @Column("text", { name: "justEmocionalYAcademico", nullable: true })
  justEmocionalYAcademico: string | null;

  @Column("tinyint", { name: "emocional", nullable: true, width: 1 })
  emocional: boolean | null;

  @Column("text", { name: "justEmocional", nullable: true })
  justEmocional: string | null;

  @Column("tinyint", { name: "academico", nullable: true, width: 1 })
  academico: boolean | null;

  @Column("text", { name: "justAcademico", nullable: true })
  justAcademico: string | null;

  @Column("tinyint", { name: "uvInclusiva", nullable: true, width: 1 })
  uvInclusiva: boolean | null;

  @Column("text", { name: "justUvInclusiva", nullable: true })
  justUvInclusiva: string | null;

  @Column("tinyint", { name: "abuso", nullable: true, width: 1 })
  abuso: boolean | null;

  @Column("text", { name: "justAbuso", nullable: true })
  justAbuso: string | null;

  @Column("tinyint", {
    name: "economicoEmocionalAcademico",
    nullable: true,
    width: 1,
  })
  economicoEmocionalAcademico: boolean | null;

  @Column("text", { name: "justEconomicoEmocionalAcademico", nullable: true })
  justEconomicoEmocionalAcademico: string | null;

  @Column("tinyint", { name: "economicoEmocional", nullable: true, width: 1 })
  economicoEmocional: boolean | null;

  @Column("text", { name: "justEconomicoEmocional", nullable: true })
  justEconomicoEmocional: string | null;

  @Column("tinyint", { name: "economicoAcademico", nullable: true, width: 1 })
  economicoAcademico: boolean | null;

  @Column("text", { name: "justEconomicoAcademico", nullable: true })
  justEconomicoAcademico: string | null;

  @Column("tinyint", { name: "economico", nullable: true, width: 1 })
  economico: boolean | null;

  @Column("text", { name: "justEconomico", nullable: true })
  justEconomico: string | null;

  @OneToOne(() => Student, (student) => student.motives, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mail", referencedColumnName: "mail" }])
  mail2: Student;
}
