import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { UserPreference } from "../entities/user-preference.entity";


export class PaginatedUserPreferenceResDto extends PaginationResponseDto {
    preferences: UserPreference[];
}