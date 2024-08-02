import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteBookDto {
  @IsString()
  @IsNotEmpty()
  readonly bookId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;
}
