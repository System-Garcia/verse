import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { UserResponseDto } from "./user-response.dto";

export class PaginatedUsersResponseDto extends PaginationResponseDto {
  users: UserResponseDto[];
}