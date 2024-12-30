import { Column, Entity } from "typeorm";

@Entity("User", { schema: "seguimientos" })
export class User {
  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("varchar", { name: "gtoken", nullable: true, length: 255 })
  gtoken: string | null;

  @Column("varchar", { name: "sessionString", nullable: true, length: 255 })
  sessionString: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "secondName", nullable: true, length: 100 })
  secondName: string | null;

  @Column("varchar", { name: "fatherLastName", nullable: true, length: 100 })
  fatherLastName: string | null;

  @Column("varchar", { name: "motherLastName", nullable: true, length: 100 })
  motherLastName: string | null;

  @Column("enum", {
    name: "sede",
    nullable: true,
    enum: ["Valparaíso", "Santiago", "San Felipe", "all"],
  })
  sede: "Valparaíso" | "Santiago" | "San Felipe" | "all" | null;
}
