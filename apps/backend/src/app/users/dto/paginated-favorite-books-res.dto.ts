import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { FavoriteBook } from "../entities/favorite-book.entity";

export class PaginatedFavoriteBooksResponseDto extends PaginationResponseDto {
    favoriteBooks: FavoriteBook[];
}