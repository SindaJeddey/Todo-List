import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../generics/timestamp.entity";
import { CvEntity } from "../../cv/entities/cv.entity";

@Entity('user')
export class UserEntity extends TimestampEntity {

  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    length:50,
    unique: true
  })
  username:string

  @Column({
    unique: true
  })
  email:string

  @OneToMany(
    type => CvEntity,
    cv => cv.user
  )
  cvs: CvEntity[]
}
