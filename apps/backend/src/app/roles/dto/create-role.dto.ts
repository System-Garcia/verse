import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
}