import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { IsString,  IsAlpha, IsInt, Min, Max,  } from "class-validator"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    @IsAlpha()
    firstName: string

    @Column()
    @IsString()
    @IsAlpha()
    lastName: string

    @Column()
    @IsInt()
    @Min(20)
    @Max(90)
    age: number
}
