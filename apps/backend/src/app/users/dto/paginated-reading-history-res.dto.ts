import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { ReadingHistory } from "../entities/reading-history.entity";


export class PaginatedReadingHistoryResponseDto extends PaginationResponseDto {
    readingHistory: ReadingHistory[];
}
