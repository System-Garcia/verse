import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";


export class CreateReadingHistoryDto {
    @IsString()
    @IsNotEmpty()
    readonly bookId: string;
  
    @IsString()
    @IsNotEmpty()
    readonly title: string;
  
    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @Type(() => Date)
    @IsDate()
    readonly readDate: Date;
  
    @IsString()
    @IsNotEmpty()
    readonly thumbnail: string;
}