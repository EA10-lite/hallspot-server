import { IsEmail, IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateHallDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    location: string;

    @IsNumber()
    capacity: number;
}