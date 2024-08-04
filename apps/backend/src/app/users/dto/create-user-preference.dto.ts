import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export class UserPreferenceDto {
  @IsString()
  @IsIn(['gender', 'theme', 'author'], {
    message: 'preferencesKey must be one of the following values: gender, theme, author',
  })
  preferencesKey: string;

  @IsString()
  @IsNotEmpty()
  preferencesValue: string;
}
