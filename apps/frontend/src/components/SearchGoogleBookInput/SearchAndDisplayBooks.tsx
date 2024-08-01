"use client";
import { useState } from 'react';
import InsertBookImages from '../SVGs/BookStatisticsSvg/InsertBookImages';
import SearchGoogleBookInput from './SearchGoogleBookInput';

interface BookImage {
  id: string;  // Origin: Unique identifier for each book image.
  x: number;  // Origin: SVG positioning; X coordinate for the book image.
  y: number;  // Origin: SVG positioning; Y coordinate for the book image.
  width: number;
  height: number;
  href: string;  // Origin: URL or local path to the book image.
}

// Origin: Static data initialization; defines the default set of book images.
// Functionality: Provides initial coordinates, dimensions, and image sources for the SVG display.
// Purpose: Ensures that there is always a set of images displayed by default.
const initialBooks: BookImage[] = [
  { id: "book1", x: 225, y: 267, width: 54, height: 81.43, href: "/images/books/tokill_a_mockingbird.svg" },
  { id: "book2", x: 33, y: 34, width: 54, height: 81.43, href: "/images/books/pride_and_prejudice.svg" },
  { id: "book3", x: 132, y: 151, width: 54, height: 81.43, href: "/images/books/1984.svg" },
  { id: "book4", x: 32, y: 377, width: 54, height: 81.43, href: "/images/books/cien_anos.svg" },
  { id: "book5", x: 129, y: 34, width: 54, height: 81.43, href: "/images/books/crime_and_punishment.svg" },
  { id: "book6", x: 225, y: 151, width: 54, height: 81.43, href: "/images/books/harry_potter.svg" },
  { id: "book7", x: 225, y: 377, width: 54, height: 81.43, href: "/images/books/senor_anillos.svg" },
  { id: "book8", x: 225, y: 34, width: 54, height: 81.43, href: "/images/books/el_principito.svg" },
  { id: "book9", x: 32, y: 267, width: 54, height: 81.43, href: "/images/books/homo_deus.svg" },
  { id: "book10", x: 132, y: 267, width: 54, height: 81.43, href: "/images/books/bird_chronicle.svg" },
  { id: "book11", x: 36, y: 151, width: 54, height: 81.43, href: "/images/books/casa_de_espiritus.svg" },
  { id: "book12", x: 132, y: 377, width: 54, height: 81.43, href: "/images/books/el_alquimista.svg" }
];

// Origin: React functional component; defines the SearchAndDisplayBooks component.
// Functionality: Manages the search functionality and updates the displayed book images based on the search results.
// Purpose: To dynamically display book covers based on user searches and update the SVG accordingly.
const SearchAndDisplayBooks = () => {
  // Origin: React useState hook; manages the state of book images.
  // Functionality: Initializes the book images with default data and updates them based on search results.
  // Purpose: To allow the component to reactively update the SVG with new book covers when a search is performed.
  const [bookImages, setBookImages] = useState<BookImage[]>(initialBooks);

  // Origin: React useState hook; manages the state to track if no search results were found.
  // Functionality: Toggles between showing the search results or a "No results" message.
  // Purpose: Enhances user experience by providing feedback when no matching books are found.
  const [noResults, setNoResults] = useState(false);

  // Origin: Internal function; handles the search results.
  // Functionality: Updates the state with new book cover URLs if search results are found, or triggers a "No results" state.
  // Purpose: To dynamically replace the default book images with those retrieved from a search query.
  const handleBookSearch = (bookCovers: string[]) => {
    if (bookCovers.length === 0) {
      setNoResults(true);  // Functionality: Sets the no results state to true if no book covers are returned.
    } else {
      setNoResults(false);  // Functionality: Resets the no results state if book covers are found.
      // Origin: Array mapping; updates each book image with the corresponding search result.
      // Functionality: Retains original images if there aren't enough search results to replace all default images.
      // Purpose: Ensures that the SVG always displays a full set of images, either default or from the search.
      const updatedBooks = bookImages.map((book, index) => ({
        ...book,
        href: bookCovers[index] || book.href
      }));
      setBookImages(updatedBooks);  // Functionality: Updates the state with the new set of book images.
    }
  };

  return (
    <>
      {/* Origin: Local component; provides the input and button for searching books. */}
      {/* Functionality: Calls the handleBookSearch function with the search results when a search is performed. */}
      {/* Purpose: Allows the user to search for books and update the displayed book covers in the SVG. */}
      <SearchGoogleBookInput onSearch={handleBookSearch} />

      {/* Origin: Conditional rendering based on noResults state. */}
      {/* Functionality: Displays a "No results" message if no books were found, otherwise inserts book images into the SVG. */}
      {/* Purpose: Provides feedback to the user or updates the SVG with the search results. */}
      {noResults ? (
        //TODO: Stylish  div
        <div>No se encontraron resultados</div>  // Origin: User feedback; displays if no search results are found.
      ) : (
        <InsertBookImages books={bookImages} />  // Origin: Local component; inserts the updated book images into the SVG.
      )}
    </>
  );
};

export default SearchAndDisplayBooks;
