import { PaginationDto } from "./pagination.dto";

export class PaginationResponseDto extends PaginationDto {
    total: number;
    next: string | null;
    prev: string | null;
}