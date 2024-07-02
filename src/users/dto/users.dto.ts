import { IsNumber, IsString } from "class-validator"

export class UsersDto {
    @IsString()
    name: string
    
    @IsNumber()
    age: number
}