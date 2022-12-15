import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsAlpha, IsNumber, Min, Max, IsInt } from 'class-validator';

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
    @IsString()
    @IsAlpha()
    first_name: string

    @Column()
    @IsString()
    @IsAlpha()
    last_name: string

    @Column()
    @IsNumber()
    @IsInt()
    @Min(20)
    @Max(100)
    age: number
}
