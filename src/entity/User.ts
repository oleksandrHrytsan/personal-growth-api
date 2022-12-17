import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  constructor (firstName, lastName, age) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.age = age;
  }
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    age: number
}
