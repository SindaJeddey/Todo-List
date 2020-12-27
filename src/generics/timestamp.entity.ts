import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntity {
  @CreateDateColumn({
    update: false //On ne peut plus modifier ce champ
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}