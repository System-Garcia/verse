import { Type } from 'class-transformer';
import { ValidateNested, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { UserPreferenceDto } from './create-user-preference.dto';

export class CreateUserPreferencesDto {
  @ValidateNested({ each: true })
  @Type(() => UserPreferenceDto)
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  preferences: UserPreferenceDto[];
}
