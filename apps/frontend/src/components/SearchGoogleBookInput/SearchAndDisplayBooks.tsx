"use client";
import { useState } from 'react';
import InsertBookImages from '../SVGs/BookStatisticsSvg/InsertBookImages';
import SearchGoogleBookInput from './SearchGoogleBookInput';
import styles from './searchAndDisplaybooks.module.css';

interface BookImage {
  id: string;  // Unique identifier for each book image
  x: number;  // X coordinate for SVG positioning
  y: number;  // Y coordinate for SVG positioning
  width: number;
  height: number;
  href: string;  // URL or local path to the book image
}

// Default set of book images with initial coordinates, dimensions, and image sources for the SVG display
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

const SearchAndDisplayBooks = () => {
  // State to manage the book images displayed in the SVG
  const [bookImages, setBookImages] = useState<BookImage[]>(initialBooks);
  
  // State to manage the display of "no results found" feedback
  const [noResults, setNoResults] = useState(false);

  const handleBookSearch = (bookCovers: string[]) => {
    if (bookCovers.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
      // Update book images with the search results, or retain the original image if no result exists for a specific position
      const updatedBooks = bookImages.map((book, index) => ({
        ...book,
        href: bookCovers[index] || book.href
      }));
      setBookImages(updatedBooks);
    }
  };

  return (
    <>
      <SearchGoogleBookInput onSearch={handleBookSearch} />
      {noResults ? (
        <div className={styles.noResults}>No se encontraron resultados</div>
      ) : (
        <InsertBookImages books={bookImages} />
      )}
    </>
  );
};

export default SearchAndDisplayBooks;