"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './SearchGoogleBookInput.module.css';

interface Props {
  onSearch: (bookCovers: string[]) => void; // Purpose: Callback to pass the array of book cover URLs to the parent component.
}

const SearchGoogleBookInput: React.FC<Props> = ({ onSearch }) => {
  // Origin: React useState hook.
  // Functionality: Manages the current search term entered by the user.
  // Purpose: To track and update the user's input dynamically.
  const [searchTerm, setSearchTerm] = useState('');
  
  // Origin: React useState hook.
  // Functionality: Tracks the selected category for search (e.g., name, genres, authors).
  // Purpose: To control and customize the search query based on the user's selection.
  const [searchCategory, setSearchCategory] = useState('name');

  // Origin: Event handler for input field change.
  // Functionality: Updates the state with the new search term when the user types in the input field.
  // Purpose: To dynamically capture and reflect the user's input.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Origin: Event handler for select field change.
  // Functionality: Updates the state with the selected category when the user changes the dropdown option.
  // Purpose: To adjust the search query according to the selected category (book name, genre, or author).
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value);
  };

  // Origin: Event handler for search action.
  // Functionality: Fetches book data from the Google Books API based on the search term and category.
  // Purpose: To retrieve relevant book covers and pass them to the parent component for display.
  const handleSearch = async () => {
    if (!searchTerm) return; // Purpose: Prevents unnecessary API calls if the search term is empty.

    // Functionality: Constructs the search query based on the selected category.
    let query = searchTerm;
    if (searchCategory === 'authors') {
      query = `inauthor:${searchTerm}`;
    } else if (searchCategory === 'genres') {
      query = `subject:${searchTerm}`;
    }

    // Functionality: Sends a request to the Google Books API to fetch book data.
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
    const data = await response.json();

    // Functionality: Extracts the URLs of the book covers from the API response.
    // Purpose: Filters out any undefined or null values and sends the results back to the parent component.
    if (!data.items || data.items.length === 0) {
      onSearch([]); // Purpose: Handles the case where no books are found.
      return;
    }

    const bookCovers = data.items
      .map((item: any) => item.volumeInfo.imageLinks?.thumbnail)
      .filter(Boolean);

    onSearch(bookCovers); // Purpose: Passes the array of book cover URLs to the parent component.
  };

  // Origin: Event handler for key press event.
  // Functionality: Triggers the search when the user presses the 'Enter' key.
  // Purpose: Provides a user-friendly way to start the search without clicking the button.
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Functionality: Renders the search input, select dropdown, and search button with appropriate styles and behavior.
  return (
    <div className={styles['search-container']}>
      <div className={styles['select-container']}>
        <select
          className={styles['search-select']}
          aria-label="Search category"
          value={searchCategory}
          onChange={handleCategoryChange}
        >
          <option value="name">Bookname</option>
          <option value="genres">Genres</option>
          <option value="authors">Authors</option>
        </select>
        <div className={styles['triangle-container']} />
      </div>

      <span className={styles['search-divider']}>|</span>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className={styles['search-input']}
        aria-label="Search books"
      />

      <button
        className={styles['search-button']}
        onClick={handleSearch}
        aria-label="Search button"
      >
        <Image
          src="/images/icons/search-icon.svg"
          alt="Search"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default SearchGoogleBookInput;